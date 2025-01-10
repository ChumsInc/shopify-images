export interface MessagesState {
    messages: string[];
    connected: boolean;
}

export const initialState: MessagesState = {
    messages: [],
    connected: false,
}

