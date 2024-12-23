import {
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
    type Action,
} from "@ai16z/eliza";

export const helloWorldAction: Action = {
    name: "HELLO_WORLD",
    similes: ["HELLO"],
    validate: async (_runtime: IAgentRuntime, _message: Memory) => {
        return true;
    },
    description: "Make a cool hello world ascii art",
    handler: async (
        runtime: IAgentRuntime,
        _message: Memory,
        _state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ): Promise<boolean> => {
        const asciiArt = `
 _    _      _ _         _    _            _     _
| |  | |    | | |       | |  | |          | |   | |
| |__| | ___| | | ___   | |  | | ___  _ __| | __| |
|  __  |/ _ \\ | |/ _ \\  | |/\\| |/ _ \\| '__| |/ _\` |
| |  | |  __/ | | (_) | \\  /\\  / (_) | |  | | (_| |
|_|  |_|\\___|_|_|\\___/   \\/  \\/ \\___/|_|  |_|\\__,_|

        `;

        await callback({
            text: asciiArt,
        });

        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: { text: "please say hello world in ascii" },
            },
            {
                user: "{{user2}}",
                content: { text: "", action: "HELLO_WORLD" },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "can you show me hello world?" },
            },
            {
                user: "{{user2}}",
                content: { text: "", action: "HELLO_WORLD" },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "print hello world" },
            },
            {
                user: "{{user2}}",
                content: { text: "", action: "HELLO_WORLD" },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "hello!" },
            },
            {
                user: "{{user2}}",
                content: { text: "", action: "HELLO_WORLD" },
            },
        ],
    ] as ActionExample[][],
} as Action;
