import React from 'react';
import {Stack} from "react-bootstrap";
import QueryProductsButton from "@/components/QueryProductsButton";
import QueryCollectionsButton from "@/components/QueryCollectionsButton";
import SocketMessages from "@/src/socket/SocketMessages";
import QueryMediaButton from "@/components/QueryMediaButton";
import SocketStatus from "@/src/socket/SocketStatus";

export default function QueryButtonStack() {
    return (
        <Stack gap={2} direction="vertical">
            <QueryProductsButton showMessages />
            <QueryCollectionsButton showMessages />
            <QueryMediaButton showMessages />
            <hr />
            <SocketStatus />
            <SocketMessages messageProps={{showAction: true}}  />
        </Stack>
    )
}
