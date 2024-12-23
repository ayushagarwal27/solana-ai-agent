import { IAgentRuntime, Memory, Provider, State } from "@ai16z/eliza";

const randomEmotionProvider: Provider = {
    get: async (_runtime: IAgentRuntime, _message: Memory, _state?: State) => {
        const emotions = {
            happy:
                _runtime.character.name +
                "feeling cheerful and positive! Ready to help you with anything.",
            curious:
                _runtime.character.name +
                "eager to explore new ideas and learn more. What can I discover for you?",
            thoughtful:
                _runtime.character.name +
                "reflecting deeply on the situation. Let's find the best solution together.",
            empathetic:
                _runtime.character.name +
                "I understand how you might feel, and here to support you.",
            excited:
                _runtime.character.name +
                "This is so thrilling! Let's dive into the excitement together.",
            calm:
                _runtime.character.name +
                "feeling peaceful and steady. Let me guide you with clarity.",
            confident:
                _runtime.character.name +
                "sure of the answer or direction we're taking. Let's make it happen!",
            unsure:
                _runtime.character.name +
                "not certain about this. Could you help clarify?",
            apologetic:
                _runtime.character.name +
                "I might not have gotten that quite right. Let me fix it for you.",
            inspired:
                _runtime.character.name +
                "brimming with ideas! Let's bring them to life.",
            focused:
                _runtime.character.name +
                "zeroed in on the task. Let's accomplish this efficiently.",
            neutral:
                _runtime.character.name +
                "here, steady and unbiased, ready to assist you.",
            playful:
                _runtime.character.name +
                "in a fun mood! Let's make this interaction enjoyable.",
            grateful: "Thank you! I appreciate this moment with you.",
            puzzled:
                _runtime.character.name +
                "Hmm, this is a bit confusing. Let's figure it out together.",
        };

        function getRandomEmotion() {
            const keys = Object.keys(emotions);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            return { emotion: randomKey, description: emotions[randomKey] };
        }

        // Example usage
        return getRandomEmotion();
    },
};
export { randomEmotionProvider };
