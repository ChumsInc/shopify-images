import React from 'react';
import {ShopifyMessage} from "_src/socket/SocketContext";
import {Badge, BadgeProps} from "react-bootstrap";

export interface SocketMessageProps extends BadgeProps {
    message?: ShopifyMessage;
    showAction?: boolean;
}
export default function SocketMessage({message, showAction, ...rest}: SocketMessageProps) {
    if (!message?.data) {
        return null;
    }
    const {action, result, timestamp} = message.data;

    return (
        <Badge bg="secondary" title={timestamp} {...rest}>
            {showAction && <span>{action}:</span>}
            {result}
        </Badge>
    )
}
