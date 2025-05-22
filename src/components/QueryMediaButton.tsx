import React, {useCallback, useEffect} from 'react';
import {Button} from "react-bootstrap";
import {useShopifySocket} from "@/src/socket/SocketContext";
import {ErrorBoundary} from "react-error-boundary";
import ErrorBoundaryFallbackAlert from "@/components/ErrorBoundaryFallbackAlert";
import SocketMessages from "@/src/socket/SocketMessages";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {loadMedia, loadProductMedia} from "@/ducks/media/actions";
import {Product} from "chums-types/src/shopify";
import {selectImagesStatus} from "@/ducks/media";

export interface QueryMediaButtonProps {
    product?: Product;
    showMessages?: boolean;
}

export default function QueryMediaButton({product, showMessages}: QueryMediaButtonProps) {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectImagesStatus);
    const {messages} = useShopifySocket();

    useEffect(() => {
        const [msg] = messages.filter(msg => msg?.data?.action?.startsWith('queryProductMedia'));
        switch (msg?.data?.result) {
            case 'done':
                dispatch(loadMedia());
        }
    }, [messages]);

    const onClick = useCallback(async () => {
        if (product) {
            dispatch(loadProductMedia(product))
        } else {
            dispatch(loadMedia());
        }
    }, [product]);

    return (
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackAlert}>
            <div className="d-grid">
                <Button type="button" size="sm" onClick={onClick} disabled={status !== 'idle'}>
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
