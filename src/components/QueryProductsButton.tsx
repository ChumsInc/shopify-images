import {useCallback, useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {useShopifySocket} from "@/src/socket/SocketContext";
import {ErrorBoundary} from "react-error-boundary";
import ErrorBoundaryFallbackAlert from "@/components/ErrorBoundaryFallbackAlert";
import SocketMessages from "@/src/socket/SocketMessages";
import {useAppDispatch} from "@/app/configureStore";
import {loadProducts} from "@/ducks/products/actions";

export interface QueryProductsButtonProps {
    handle?: string;
    showMessages?: boolean;
}
export default function QueryProductsButton({handle, showMessages}: QueryProductsButtonProps) {
    const dispatch = useAppDispatch();
    const [busy, setBusy] = useState<boolean>(false);
    const {messages} = useShopifySocket();

    useEffect(() => {
        const [msg] = messages.filter(msg => msg?.data?.action?.startsWith('queryProducts('));
        switch (msg?.data?.result) {
            case 'starting':
                setBusy(true);
                return;
            case 'done':
                setBusy(false);
                dispatch(loadProducts())
        }
    }, [busy, messages]);

    const onClick = useCallback(async () => {
        const params = new URLSearchParams();
        if (handle) {
            params.set("handle", handle);
        }
        await fetch(`/api/shopify/graphql/query/products.json?${params.toString()}`, {credentials: "same-origin"});
    }, [handle]);

    return (
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackAlert}>
            <div className="d-grid">
                <Button type="button" size="sm" onClick={onClick} disabled={busy} >
                    Products
                    <span className="bi-cloud-download ms-1"/>
                </Button>
                {showMessages && (
                    <SocketMessages filter={(msg) => msg?.data?.action?.startsWith('queryProducts')} limit={1} className="mt-1" />
                )}
            </div>
        </ErrorBoundary>
    )
}
