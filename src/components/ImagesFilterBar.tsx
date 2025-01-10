import React from 'react';
import {Col, Row} from "react-bootstrap";
import CollectionSelect from "_ducks/collections/components/CollectionSelect";
import ProductSelect from "_ducks/products/components/ProductSelect";
import ShowProductsCheckbox from "_ducks/products/components/ShowProductsCheckbox";

export default function ImagesFilterBar() {
    return (
        <Row gap={2}>
            <Col xs="auto">
                <CollectionSelect/>
            </Col>
            <Col xs="auto">
                <ProductSelect/>
            </Col>
            <Col xs="auto">
                <ShowProductsCheckbox/>
            </Col>
        </Row>
    )
}
