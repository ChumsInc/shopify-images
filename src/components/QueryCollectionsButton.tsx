import {useCallback, useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {useShopifySocket} from "@/src/socket/SocketContext";
import {ErrorBoundary} from "react-error-boundary";
import ErrorBoundaryFallbackAlert from "@/components/ErrorBoundaryFallbackAlert";
import SocketMessages from "@/src/socket/SocketMessages";
import {useAppDispatch} from "@/app/configureStore";
import {loadCollections} from "@/ducks/collections/actions";

export interface QueryCollectionsButtonProps {
    showMessages?: boolean;
}
export default function QueryCollectionsButton({showMessages}:QueryCollectionsButtonProps) {
    const dispatch = useAppDispatch();
    const [busy, setBusy] = useState<boolean>(false);
    const {messages} = useShopifySocket();

    useEffect(() => {
        const [msg] = messages.filter(msg => msg?.data?.action?.startsWith('queryCollections'));
        switch (msg?.data?.result) {
            case 'starting':
                setBusy(true);
                return;
            case 'done':
                setBusy(false);
                dispatch(loadCollections())
        }
    }, [busy, messages]);

    const onClick = useCallback(async () => {
        await fetch('/api/shopify/graphql/query/products/collections.json', {credentials: "same-origin"});
    }, []);

    return (
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackAlert}>
            <div className="d-grid">
                <Button type="button" size="sm" onClick={onClick} disabled={busy}>
                    Collections
                    <span className="bi-cloud-download ms-1"/>
                </Button>
                {showMessages && (
                    <SocketMessages filter={(msg) => msg?.data?.action?.startsWith('queryCollections')} limit={1} className="mt-1"/>
                )}
            </div>
        </ErrorBoundary>
)
}
