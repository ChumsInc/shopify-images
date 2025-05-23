import React from 'react';
import VariantsTable from "@/ducks/products/components/VariantsTable";
import {Card, Col, Row, Stack} from "react-bootstrap";
import {useAppSelector} from "@/app/configureStore";
import {selectCurrentProduct} from "@/ducks/products";
import ProductLink from "@/ducks/products/components/ProductLink";
import QueryProductsButton from "@/components/QueryProductsButton";
import QueryMediaButton from "@/components/QueryMediaButton";
import MediaChangesButton from "@/ducks/products/components/MediaChangesButton";
import {selectPendingChanges} from "@/ducks/media";
import ProductsTable from "@/ducks/products/components/ProductsTable";
import VariantFilter from "@/ducks/products/components/VariantFilter";

export default function ProductInfo() {
    const product = useAppSelector(selectCurrentProduct);
    const pendingChanges = useAppSelector(selectPendingChanges)

    if (!product) {
        return (
            <ProductsTable />
        );
    }
    return (
        <div>
            <Card>
                <Card.Header>{product.title}</Card.Header>
                <Card.Body>
                    <div>Preview: <ProductLink product={product}>{product.handle}</ProductLink></div>
                    <div>Admin: <ProductLink product={product} admin>{product.id}</ProductLink></div>
                    <div>Collections: <small className="text-secondary-emphasis">{product.collections.join(', ')}</small></div>
                    <div>Status: {product.status}</div>
                </Card.Body>
                <Card.Body>
                    <Stack direction="horizontal" gap={1}>
                        <QueryProductsButton handle={product.handle} />
                        <QueryMediaButton product={product} />
                        <MediaChangesButton />
                    </Stack>
                </Card.Body>
            </Card>
            {!product.hasOnlyDefaultVariant && (
                <div className="mt-1 sticky-top">
                    <Row className="g-3">
                        <Col xs="auto">
                            <h2>Variants</h2>
                        </Col>
                        <Col>
                            <VariantFilter />
                        </Col>
                    </Row>
                    <VariantsTable/>
                </div>
            )}
            <code>
                <pre>
                    {JSON.stringify(pendingChanges, null, 2)}
                </pre>
            </code>
        </div>
    )
}
