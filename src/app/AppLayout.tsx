import {useEffect} from 'react';
import ErrorBoundaryFallbackAlert from "@/components/ErrorBoundaryFallbackAlert";
import AlertList from "@/ducks/alerts/AlertList";
import {Col, Row} from "react-bootstrap";
import QueryButtonStack from "@/components/QueryButtonStack";
import {ErrorBoundary} from "react-error-boundary";
import AppNav from "@/app/AppNav";
import {Outlet, useParams} from "react-router";
import {setCurrentCollectionHandle} from "@/ducks/collections";
import {setCurrentProductHandle} from "@/ducks/products";
import {useAppDispatch} from "@/app/configureStore";
import {loadCollections} from "@/ducks/collections/actions";
import {loadProducts} from "@/ducks/products/actions";
import {loadMedia} from "@/ducks/media/actions";

export default function AppLayout() {
    const dispatch = useAppDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(loadCollections());
        dispatch(loadProducts());
        dispatch(loadMedia());
        console.debug("App.useEffect[params]", params.collection, params.product);
        if (params.collection) {
            dispatch(setCurrentCollectionHandle(params.collection));
        }
        if (params.product) {
            dispatch(setCurrentProductHandle(params.product));
        }
    }, []);

    return (
        <ErrorBoundary fallback={undefined} FallbackComponent={ErrorBoundaryFallbackAlert}>
            <AlertList/>
            <AppNav/>
            <Row gap={2} className="mt-3">
                <Col sm="auto" style={{maxWidth: '200px'}}>
                    <QueryButtonStack/>
                </Col>
                <Col>
                    <Outlet/>
                </Col>
            </Row>
        </ErrorBoundary>
    )
}
