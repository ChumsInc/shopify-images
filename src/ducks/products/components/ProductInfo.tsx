import React from 'react';
import VariantsTable from "_ducks/products/components/VariantsTable";
import {Card, Stack} from "react-bootstrap";
import {useAppSelector} from "_app/configureStore";
import {selectCurrentProduct} from "_ducks/products/selectors";
import ProductLink from "_ducks/products/components/ProductLink";
import QueryProductsButton from "_components/QueryProductsButton";
import QueryMediaButton from "_components/QueryMediaButton";
import MediaChangesButton from "_ducks/products/components/MediaChangesButton";
import {selectPendingChanges} from "_ducks/images/selectors";

export default function ProductInfo() {
    const product = useAppSelector(selectCurrentProduct);
    const pendingChanges = useAppSelector(selectPendingChanges)

    if (!product) {
        return null;
    }
    return (
        <div>
            <Card>
                <Card.Header>{product.title}</Card.Header>
                <Card.Body>
                    <div>Link to page: <ProductLink product={product}>{product.handle}</ProductLink></div>
                    <div>Link to admin: <ProductLink product={product} admin>{product.id}</ProductLink></div>
                    <div>Collections: {product.collections.join(', ')}</div>
                    <div>Status: {product.status}</div>
                </Card.Body>
                <Card.Body>
                    <Stack direction="horizontal" gap={1}>
                        <QueryProductsButton handle={product.handle} />
                        <QueryMediaButton handle={product.handle} />
                        <MediaChangesButton />
                    </Stack>
                </Card.Body>
            </Card>
            {!product.hasOnlyDefaultVariant && (
                <div>
                    <h2>Variants</h2>
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
