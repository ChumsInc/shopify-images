import React, {useCallback, useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {useShopifySocket} from "_src/socket/SocketContext";
import {ErrorBoundary} from "react-error-boundary";
import ErrorBoundaryFallbackAlert from "_components/ErrorBoundaryFallbackAlert";
import SocketMessages from "_src/socket/SocketMessages";
import {useAppDispatch} from "_app/configureStore";
import {loadMedia} from "_ducks/images/actions";

export interface QueryMediaButtonProps {
    handle?: string;
    showMessages?: boolean;
}

export default function QueryMediaButton({handle, showMessages}: QueryMediaButtonProps) {
    const dispatch = useAppDispatch();
    const [busy, setBusy] = useState<boolean>(false);
    const {messages} = useShopifySocket();

    useEffect(() => {
        const [msg] = messages.filter(msg => msg?.data?.action?.startsWith('queryProductMedia'));
        switch (msg?.data?.result) {
            case 'starting':
                setBusy(true);
                return;
            case 'done':
                setBusy(false);
                dispatch(loadMedia());
        }
    }, [busy, messages]);

    const onClick = useCallback(async () => {
        const params = new URLSearchParams();
        if (handle) {
            params.set('handle', handle);
        }
        await fetch(`/api/shopify/graphql/query/products/media.json?${params.toString()}`, {credentials: "same-origin"});
    }, [handle]);

    return (
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackAlert}>
            <div className="d-grid">
                <Button type="button" size="sm" onClick={onClick} disabled={busy}>
                    Media
                    <span className="bi-cloud-download ms-1"/>
                </Button>
                {showMessages && (
                    <SocketMessages filter={(msg) => msg?.data?.action?.startsWith('queryProductMedia')}
                                    limit={1} className="mt-1"/>
                )}
            </div>
        </ErrorBoundary>
    )
}
