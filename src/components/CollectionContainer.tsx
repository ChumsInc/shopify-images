import React from 'react';
import {Col, Row} from "react-bootstrap";
import CollectionsList from "@/components/collections/CollectionsList";
import ProductsTable from "@/ducks/products/components/ProductsTable";

export default function CollectionContainer() {
    return (
        <Row>
            <Col md={6}>
                <CollectionsList/>
            </Col>
            <Col md={6}>
                <ProductsTable />
            </Col>
        </Row>
    )
}
