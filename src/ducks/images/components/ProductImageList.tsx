import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectProductMedia} from "@/ducks/images/selectors";
import {Col, Row} from "react-bootstrap";
import {loadMedia} from "@/ducks/images/actions";
import ProductImageCard from "@/ducks/images/components/ProductImageCard";
import {selectShowProducts} from "@/ducks/products/selectors";
import BestPractices from "@/components/BestPractices";

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
