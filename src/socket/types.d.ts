import type {Variant} from "react-bootstrap/esm/types";

export interface WebSocketActionResponse {
    action: string;
    result: string;
    timestamp?: string;
}

export interface WebSocketMessage<T = unknown> {
    app: string;
    data: T;
    id: string;
}

export type ShopifyMessage = WebSocketMessage<WebSocketActionResponse>

export interface SocketContext {
    messages: ShopifyMessage[];
    connected: boolean;
    color: Variant;
    shouldReconnect: boolean;
    setShouldReconnect: (value: boolean) => void;
}
