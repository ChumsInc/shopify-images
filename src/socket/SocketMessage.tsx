import type {ShopifyMessage} from "@/src/socket/SocketContext";
import {Badge, type BadgeProps} from "react-bootstrap";

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
        <Badge bg="secondary" title={timestamp} {...rest} style={{maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis'}}>
            {result}
            {showAction && <span title={action}>:{action}</span>}
        </Badge>
    )
}
