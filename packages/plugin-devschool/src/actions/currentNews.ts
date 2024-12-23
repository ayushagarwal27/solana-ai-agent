import {
    ActionExample,
    Content,
    generateText,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    ModelClass,
    State,
    type Action,
} from "@ai16z/eliza";

export const currentNewsAction: Action = {
    name: "CURRENT_NEWS",
    similes: ["NEWS", "HEADLINES", "WHATS_NEW"],
    validate: async (_runtime: IAgentRuntime, _message: Memory) => {
        return true;
    },
    description: "Fetch and display current news headlines",
    handler: async (
        runtime: IAgentRuntime,
        _message: Memory,
        _state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ): Promise<boolean> => {
        try {
            const context = `Extract the search term from the user's message. The message is: ${_message.content.text}
                Only respond with the search term, do not include any other text
            `;

            const searchTerm = await generateText({
                runtime,
                context,
                modelClass: ModelClass.SMALL,
                stop: ["\n"],
            });


            const response = await fetch(
                `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=` +
                    process.env.NEWS_API_KEY
            );
            const data = await response.json();

            if (data.articles && data.articles.length > 0) {
                const headlines = data.articles
                    .slice(0, 5)
                    .map(
                        (article: { title: string }, index: number) =>
                            `${index + 1}. ${article.title}`
                    )
                    .join("\n");

                const newMemory: Memory = {
                    userId: _message.agentId,
                    agentId: _message.agentId,
                    roomId: _message.roomId,
                    content: {
                        text: `📰 News:\n\n${headlines}`,
                        action: "CURRENT_NEWS_RESPONSE",
                        source: _message.content?.source,
                    } as Content,
                };

                await runtime.messageManager.createMemory(newMemory);

                await callback(newMemory.content);
            } else {
                await callback({
                    text: "Sorry, I couldn't fetch the latest news at the moment.",
                });
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_error) {
            await callback({
                text: "Sorry, there was an error fetching the news.",
            });
        }

        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: { text: "what's in the news today?" },
            },
            {
                user: "{{user2}}",
                content: { text: "", action: "CURRENT_NEWS" },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "show me the latest headlines" },
            },
            {
                user: "{{user2}}",
                content: { text: "", action: "CURRENT_NEWS" },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "what's happening in the world?" },
            },
            {
                user: "{{user2}}",
                content: { text: "", action: "CURRENT_NEWS" },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "current news please" },
            },
            {
                user: "{{user2}}",
                content: { text: "", action: "CURRENT_NEWS" },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "tell me the news" },
            },
            {
                user: "{{user2}}",
                content: { text: "", action: "CURRENT_NEWS" },
            },
        ],
    ] as ActionExample[][],
} as Action;
