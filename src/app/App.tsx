import React from 'react';
// import "./App.css";
import AlertList from "../ducks/alerts/AlertList";
import {useAppSelector} from "./configureStore";
import {Col, Row} from "react-bootstrap";
import ImagesFilterBar from "_components/ImagesFilterBar";
import ProductsTable from "_ducks/products/components/ProductsTable";
import ProductImageList from "_ducks/images/components/ProductImageList";
import {ErrorBoundary} from "react-error-boundary";
import ErrorBoundaryFallbackAlert from "_components/ErrorBoundaryFallbackAlert";
import QueryButtonStack from "_components/QueryButtonStack";
import ProductInfo from "_ducks/products/components/ProductInfo";
import {selectShowProducts} from "_ducks/products/selectors";

function App() {
    const showProducts = useAppSelector(selectShowProducts);

    return (
        <ErrorBoundary fallback={undefined} FallbackComponent={ErrorBoundaryFallbackAlert}>
            <AlertList/>
            <ImagesFilterBar/>
            <Row gap={2} className="mt-3">
                <Col sm="auto" style={{maxWidth: '200px'}}>
                    <QueryButtonStack/>
                </Col>
                {showProducts && (
                    <Col xs={4} sm={3}>
                        <h2>Products</h2>
                        <ProductsTable/>
                    </Col>
                )}
                <Col xs={4} sm={3}>
                    <ProductInfo/>
                </Col>
                <Col>
                    <ProductImageList/>
                </Col>
            </Row>
        </ErrorBoundary>
    );
}

export default App;
