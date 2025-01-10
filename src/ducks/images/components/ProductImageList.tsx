import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "_app/configureStore";
import {selectProductMedia} from "_ducks/images/selectors";
import {Col, Row} from "react-bootstrap";
import {loadMedia} from "_ducks/images/actions";
import ProductImageCard from "_ducks/images/components/ProductImageCard";
import {selectShowProducts} from "_ducks/products/selectors";
import BestPractices from "_components/BestPractices";

export default function ProductImageList() {
    const dispatch = useAppDispatch();
    const images = useAppSelector(selectProductMedia);
    const showProducts = useAppSelector(selectShowProducts);

    useEffect(() => {
        dispatch(loadMedia());
    }, []);

    if (!images.length) {
        return (<BestPractices />)
    }

    return (
        <Row gap={3}>
            {images.map(image => (
                <Col key={image.id} xs={6} md={showProducts ? 4 : 3}>
                    <ProductImageCard media={image}/>
                </Col>
            ))}
        </Row>
    )


}
