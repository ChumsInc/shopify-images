import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import {Variant} from "react-bootstrap/types";
import {nanoid} from "@reduxjs/toolkit";
import useWebSocket from "react-use-websocket";

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
}

export const defaultSocketContext: SocketContext = {
    messages: [],
    connected: false,
    color: "secondary",
}

const ShopifySocketContext = createContext<SocketContext>(defaultSocketContext);


const buildSocketUrl = ():string => {
    if (window.location.host === 'localhost' || window.location.host.startsWith('localhost:')) {
        return 'ws://localhost:8086';
    }
    return 'wss://intranet.chums.com/api/shopify/';
}

export function ShopifySocketProvider({children}: { children: React.ReactNode }) {
    const [messages, setMessages] = useState<ShopifyMessage[]>([]);
    const [connected, setConnected] = useState(false);
    const [color, setColor] = useState<Variant>('secondary');
    const [attempts, setAttempts] = useState<number>(0);
    const [shouldReconnect, setShouldReconnect] = useState(true);
    const socket = useRef<WebSocket | null>(null);
    const heartbeatHandle = useRef(0);
    const reconnectHandle = useRef(0);
    const {sendJsonMessage, lastJsonMessage, readyState, getWebSocket} = useWebSocket(buildSocketUrl(), {
        onOpen,
        onClose,
        onMessage,
        onError,
        shouldReconnect: () => shouldReconnect,
    });

    useEffect(() => {
        console.log(lastJsonMessage);
    }, [lastJsonMessage]);

    function onOpen() {
        setConnected(true);
        setColor('primary');
    }

    function onClose() {
        setConnected(false);
        setColor('secondary');
    }

    function onMessage(ev: MessageEvent) {
        setAttempts(0);
        setColor('info');
        try {
            const message = JSON.parse(ev?.data ?? {}) as ShopifyMessage;
            message.id = nanoid(8);
            setMessages(() => [message, ...messages]);
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.debug("onMessage()", err.message);
                return Promise.reject(err);
            }
            console.debug("onMessage()", err);
            return Promise.reject(new Error('Error in onMessage()'));
        }

        heartbeatHandle.current = window.setTimeout(() => {
            setColor(connected ? 'primary' : 'secondary');
        }, 1000)
    }

    function onError(ev: Event) {
        setColor('danger');
        setAttempts(() => attempts + 1);
        console.error('ShopifySocketProvider.onError()', ev);
    }

    // function connect() {
    //     socket.current = new WebSocket('wss://intranet.chums.com/api/shopify/');
    //     socket.current.addEventListener('open', onOpen);
    //     socket.current.addEventListener('close', onClose);
    //     socket.current.addEventListener('message', onMessage);
    //     socket.current.addEventListener('error', onError);
    // }

    useEffect(() => {
        setShouldReconnect(true);

        return () => {
            setShouldReconnect(false);
            window.clearTimeout(heartbeatHandle.current);
            socket.current?.close();
        }
    }, [])

    useEffect(() => {
        if (attempts > 3) {
            setShouldReconnect(false);
        }
    }, [attempts]);

    return (
        <ShopifySocketContext.Provider value={{connected, messages, color}}>
            {children}
        </ShopifySocketContext.Provider>
    )
}

export function useShopifySocket() {
    const context = useContext(ShopifySocketContext);
    if (context === undefined) {
        throw new Error('useSocket must be used within a ShopifySocketProvider');
    }
    return context;
}
