import React from 'react';
import {Stack} from "react-bootstrap";
import QueryProductsButton from "_components/QueryProductsButton";
import QueryCollectionsButton from "_components/QueryCollectionsButton";
import SocketMessages from "_src/socket/SocketMessages";
import QueryMediaButton from "_components/QueryMediaButton";

export default function QueryButtonStack() {
    return (
        <Stack gap={2} direction="vertical">
            <QueryProductsButton showMessages />
            <QueryCollectionsButton showMessages />
            <QueryMediaButton showMessages />
            <hr />
            <SocketMessages messageProps={{showAction: true}}  />
        </Stack>
    )
}
