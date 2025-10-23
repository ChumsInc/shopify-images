import {type ShopifyMessage, useShopifySocket} from "@/src/socket/SocketContext";
import SocketMessage, {type SocketMessageProps} from "@/src/socket/SocketMessage";
import {Stack, type StackProps} from "react-bootstrap";

export interface SocketMessagesProps extends StackProps {
    filter?: (msg: ShopifyMessage) => boolean;
    start?: number;
    limit?: number;
    messageProps?: SocketMessageProps;
}

export default function SocketMessages({filter, start, limit, messageProps, ...rest}: SocketMessagesProps) {
    const socket = useShopifySocket();
    if (!filter) {
        filter = () => true;
    }
    if (!start) {
        start = 0;
    }
    if (!limit) {
        limit = 25;
    }
    return (
        <Stack direction="vertical" gap={1} {...rest} style={{fontSize: '13px'}}>
            {socket?.messages
                .filter(message => filter(message))
                .slice(start, start + limit)
                .map((message) => (
                    <SocketMessage key={message.id} message={message} {...messageProps}/>
                ))}
        </Stack>
    )
}
