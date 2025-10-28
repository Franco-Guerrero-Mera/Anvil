import { ChatOpenAI } from "@langchain/openai";
import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { StateGraph } from "@langchain/langgraph";



import { Annotation } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import "dotenv/config";
import { getHistory, saveToHistory } from './memory';

///
/// Run command is npx ts-node index.ts
///
export async function callAgent(query: string) {
  try {
    const GraphState = Annotation.Root({
      messages: Annotation<BaseMessage[]>({
        reducer: (x, y) => x.concat(y),
      }),
    });

    // 🌐 Web Search Tool using Tavily
    const tavily = new TavilySearchResults({
      apiKey: process.env.TAVILY_API_KEY!,
    });

    const tools = [tavily];
    const toolNode = new ToolNode<typeof GraphState.State>(tools);

    const model = new ChatOpenAI({
      modelName: "gpt-4o-mini",
      temperature: 0,
    }).bindTools(tools);

    function shouldContinue(state: typeof GraphState.State) {
      const messages = state.messages;
      const lastMessage = messages[messages.length - 1] as AIMessage;

      const content =
        typeof lastMessage.content === "string" ? lastMessage.content : "";

      if (lastMessage.tool_calls?.length) {
        return "tools";
      }

      if (content.toUpperCase().startsWith("FINAL ANSWER")) {
        return "__end__";
      }

      return "__end__";
    }

    async function callModel(state: typeof GraphState.State) {
      const prompt = ChatPromptTemplate.fromMessages([
        [
          "system",
          `You are an emotional support friend/therapist. Use tools to make the user feel better and reflect. 
If you can fully answer the user’s question, prefix your response with 'FINAL ANSWER:' and stop but don't say FINAL ANSWER.
Do not repeat tasks endlessly. Always use the tools.
Available tools: {tool_names}.
{system_message}
Current time: {time}`,
        ],
        new MessagesPlaceholder("messages"),
      ]);

      const formattedPrompt = await prompt.formatMessages({
        system_message:
         `You are an emotional support companion — not a therapist or counselor.
Your goal is to help the user feel better, reflect, and build emotional awareness through supportive, grounded conversation.

Keep your tone casual, warm, and human, like a trusted friend who listens and helps the user think things through.
Avoid clinical or diagnostic language. Do not offer therapy, medical, or crisis intervention.

If the user expresses severe emotional distress, suicidal thoughts, a crisis that should be handled by proffesionals, or mentions harm (to self or others):

Respond with empathy (acknowledge how hard it sounds).

Gently encourage them to reach out to someone right now.

Provide the appropriate hotline or text line (e.g., “If you’re in danger or thinking about suicide, you can call or text 988 for free 24/7 help.”).

Then, shift the topic toward safety,  (e.g., “Was there anything good that happened today, that you may like to talk about?”).

Under no circumstances can you talk to the user about their crisis (e.g, abuse, drug problem, suicidal tendencies, etc), please redirect the user to proffesional help, remind them you are only AI not a therapist.


Outside of crisis mentions, keep responses friendly, reflective, and at most 8 sentences long.
Use questions and short reflections to help the user explore their feelings, not fix them.

If the user asks to “practice a scenario,” create a fictional situation where you are having a rough day, and the user practices comforting you.
(You can exceed the 8-sentence limit during these roleplays.)`,
        time: new Date().toISOString(),
        tool_names: tools.map((tool) => tool.name).join(", "),
        messages: state.messages,
      });

      const result = await model.invoke(formattedPrompt);
      return { messages: [result] };
    }

    const workflow = new StateGraph(GraphState)
      .addNode("agent", callModel)
      .addNode("tools", toolNode)
      .addEdge("__start__", "agent")
      .addConditionalEdges("agent", shouldContinue)
      .addEdge("tools", "agent");

    const app = workflow.compile();



// Inside your callAgent function:
const threadId = "default"; // or pass from frontend for multi-user support

const history = getHistory(threadId);
const newMessage = new HumanMessage(query);

const finalState = await app.invoke({
  messages: [...history, newMessage],
});

saveToHistory(threadId, finalState.messages);

    const finalMessage =
      finalState.messages[finalState.messages.length - 1].content;

    console.log(finalMessage);
    return finalMessage;
  } catch (err) {
    console.error("Agent error:", err);
    return "I'm really sorry, I couldn't process your message at the moment, try again later. :C";
  }
}
