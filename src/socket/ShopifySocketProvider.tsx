import React, {useEffect, useRef, useState} from "react";
import type {Variant} from "react-bootstrap/esm/types";
import useWebSocketModule from "react-use-websocket";
import {nanoid} from "@reduxjs/toolkit";
import type {ShopifyMessage} from "@/socket/types";
import ShopifySocketContext from "@/socket/ShopifySocketContext.tsx";
import {buildSocketUrl} from "@/socket/utils.ts";

const useWebSocket = (useWebSocketModule as unknown as { default: typeof useWebSocketModule }).default;

export function ShopifySocketProvider({children}: { children: React.ReactNode }) {
    const [messages, setMessages] = useState<ShopifyMessage[]>([]);
    const [connected, setConnected] = useState(false);
    const [color, setColor] = useState<Variant>('secondary');
    const [attempts, setAttempts] = useState<number>(0);
    const [shouldReconnect, setShouldReconnect] = useState(true);
    const socket = useRef<WebSocket | null>(null);
    const heartbeatHandle = useRef(0);
    const url = buildSocketUrl();

    const {lastJsonMessage} = useWebSocket(url, {
        onOpen,
        onClose,
        onMessage,
        onError,
        shouldReconnect: () => shouldReconnect,
    });


    useEffect(() => {
        if (url) {
            Promise.resolve().then(() => {
                setShouldReconnect(true);
            })
        }

        return () => {
            setShouldReconnect(false);
            window.clearTimeout(heartbeatHandle.current);
            socket.current?.close();
        }
    }, [socket, url])

    useEffect(() => {
        console.log(lastJsonMessage);
    }, [lastJsonMessage]);

    useEffect(() => {
        if (shouldReconnect && attempts > 2) {
            Promise.resolve().then(() => {
                setShouldReconnect(false);
            })
        }
    }, [shouldReconnect, attempts]);

    return (
        <ShopifySocketContext value={{connected, messages, color, shouldReconnect, setShouldReconnect}}>
            {children}
        </ShopifySocketContext>
    )


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
        setShouldReconnect(true);
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

}
