import React from 'react';
import SocketIcon from "@/src/socket/SocketIcon";

export default function SocketStatus() {
    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: '10px'}}>
            <h3 style={{fontSize: 'inherit'}}>Status</h3>
            <SocketIcon className="ms-3"/>
        </div>
    )
}
