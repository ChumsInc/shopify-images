import {type HTMLAttributes, useEffect, useState} from 'react';
import type {SocketContext} from "@/socket/types";
import classNames from "classnames";
import {useShopifySocket} from "@/socket/hooks.ts";

function socketClassName(socket: SocketContext|null) {
    return classNames({
        'bi-hdd-network-fill': socket?.connected,
        'bi-hdd-network': !socket?.connected,
        [`text-${socket?.color}`]: !!socket?.color,
    })
}


export default function SocketIcon({className, ...rest}: HTMLAttributes<HTMLSpanElement>) {
    const shopifySocket = useShopifySocket();
    const [_className, setClassName] = useState<string>(socketClassName(shopifySocket));

    useEffect(() => {
        Promise.resolve().then(() => {
            setClassName(socketClassName(shopifySocket));
        });
    }, [shopifySocket]);

    return (
        <span className={classNames(_className, className)} {...rest} />
    )
}
