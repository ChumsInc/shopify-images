import React from 'react';
import {ShopifyMessage} from "@/src/socket/SocketContext";
import {Badge, BadgeProps} from "react-bootstrap";
import styled from "@emotion/styled";

const ActionSpan = styled.span`
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
`

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
            {result}
            {showAction && <ActionSpan title={action}>:{action}</ActionSpan>}
        </Badge>
    )
}
