import React from 'react';
import {Nav} from "react-bootstrap";
import {generatePath, Link, useLocation} from 'react-router'
import {useAppSelector} from "@/app/configureStore";
import {selectCurrentCollection} from "@/ducks/collections";
import {selectCurrentProduct} from "@/ducks/products";
import {Collection, Product} from "chums-types/src/shopify";

export default function AppNav() {
    const location = useLocation();
    const collection = useAppSelector(selectCurrentCollection);
    const product = useAppSelector(selectCurrentProduct);

    const productPath = (collection: Collection | undefined, product: Product) => {
        return generatePath('/collections/:handle/:productHandle', {
            handle: collection?.handle ?? 'all-products',
            productHandle: product.handle
        })
    }

    return (
        <Nav variant="tabs" defaultActiveKey="/collections" activeKey={location.pathname} className="mb-1">
            <Nav.Item>
                <Nav.Link as={Link} to="/collections" eventKey="/collections">Collections</Nav.Link>
            </Nav.Item>
            {collection && product && (
                <Nav.Item>
                    <Nav.Link as={Link} to={productPath(collection, product)}
                              eventKey={productPath(collection, product)}>
                        Product: {product.handle}
                    </Nav.Link>
                </Nav.Item>
            )}
            <Nav.Item>
                <Nav.Link as={Link} to="/help" eventKey="/help">Help</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}
