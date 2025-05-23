// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as dotenv from "dotenv";
import { openai } from "@ai-sdk/openai";
import { createAgent } from "spinai";
import {
  addExclamation,
  capitalizeWord,
  randomizeVowels,
  reverseWord,
} from "./actions";

dotenv.config();

const wordScramblerAgent = createAgent({
  instructions: `You are an agent that takes in a word and performs a series of actions on it. Each action depends on the result from the action before it. Run them one at a time please and start with randomize.`,
  actions: [addExclamation, capitalizeWord, randomizeVowels, reverseWord],
  model: openai("gpt-4o-mini"),
  // debug: "all",
  spinApiKey: process.env.SPINAI_API_KEY,
  agentId: "word-scrambler",
});

async function main() {
  const { response } = await wordScramblerAgent({
    input: "Choose only 3 random actions to apply to 'Piacere'",
  });

  console.log(response);
}

main().catch(console.error);
