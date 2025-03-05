// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as dotenv from "dotenv";
import { openai } from "@ai-sdk/openai";
import { sum } from "./actions/sum";
import { minus } from "./actions/minus";
import { divide } from "./actions/divide";
import { multiply } from "./actions/multiply";
import { createAgent } from "spinai";
import { z } from "zod";

dotenv.config();

const responseSchema = z.object({
  finalNumber: z.number(),
});

const calculatorAgent = createAgent({
  instructions: `You are a calculator agent that helps users perform mathematical calculations.
ONLY PLAN ONE ACTION AT A TIME..`,
  actions: [sum, minus, multiply, divide],
  model: openai("gpt-4o"),
  customLoggingEndpoint: "http://localhost:8000/log",
  // debug: "all",
  spinApiKey: process.env.SPINAI_API_KEY,
  agentId: "spin-2.0-calc-test",
});

async function main() {
  const { response, messages } = await calculatorAgent({
    input: "What is 5 plus 3?",
    responseFormat: responseSchema,
  });
  console.log({ response });
  const { response: response2, messages: messages2 } = await calculatorAgent({
    actions: [sum],
    input: "Now minus it by 1",
    responseFormat: responseSchema,
    messages,
  });
  // console.log("Final messages:", JSON.stringify(messages, null, 2));
  // console.log(response);
}

main().catch(console.error);
