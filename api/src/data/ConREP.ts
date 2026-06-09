// Implementation detail
// Storing data in Memory.
const conversations: Map<string, string> = new Map();

// Export the Public Interface for Module.
export const conRepo = {
    getLastResID(convId: string) {
        return conversations.get(convId);
    },

    setLastResID(convId: string, respId: string) {
        conversations.set(convId, respId);
    }
};



