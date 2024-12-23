import { Plugin } from "@ai16z/eliza";
import { helloWorldAction, currentNewsAction, jupSwapInfo } from "./actions";
import { randomEmotionProvider } from "./providers/time.ts";

export * as actions from "./actions/index.ts";
export * as evaluators from "./evaluators/index.ts";
export * as providers from "./providers/index.ts";

export const devschoolPlugin: Plugin = {
    name: "devschool",
    description: "Agent devschool with basic actions and evaluators",
    actions: [helloWorldAction,currentNewsAction, jupSwapInfo],
    providers:[randomEmotionProvider]
};
