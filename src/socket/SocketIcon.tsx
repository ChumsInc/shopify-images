import React, {HTMLAttributes, useEffect, useState} from 'react';
import {SocketContext, useShopifySocket} from "_src/socket/SocketContext";
import classNames from "classnames";

function socketClassName(socket:SocketContext) {
    return classNames({
        'bi-hdd-network-fill': socket.connected,
        'bi-hdd-network': !socket.connected,
        [`text-${socket.color}`]: !!socket.color,
    })
}


export default function SocketIcon({className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
    const shopifySocket = useShopifySocket();
    const [_className, setClassName] = useState<string>(socketClassName(shopifySocket));

    useEffect(() => {
        setClassName(socketClassName(shopifySocket));
    }, [shopifySocket]);

    return (
        <span className={classNames(_className, className)} {...rest} />
    )
}
