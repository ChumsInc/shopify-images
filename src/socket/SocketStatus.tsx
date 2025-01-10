import React from 'react';
import {useShopifySocket} from "_src/socket/SocketContext";
import SocketIcon from "_src/socket/SocketIcon";
import SocketMessage from "_src/socket/SocketMessage";

export default function SocketStatus() {
    const socket = useShopifySocket();
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 25;

    return (
        <div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <h3>Status</h3>
                <SocketIcon className="ms-3"/>
            </div>
            <div>
                {socket.messages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((message) => (
                        <SocketMessage key={message.id} message={message}/>
                    ))}
            </div>
        </div>
    )
}
