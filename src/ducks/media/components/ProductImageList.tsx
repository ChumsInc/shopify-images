import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectProductMedia} from "@/ducks/media";
import {Col, Row} from "react-bootstrap";
import {loadMedia} from "@/ducks/media/actions";
import ProductImageCard from "@/ducks/media/components/ProductImageCard";

export default function ProductImageList() {
    const dispatch = useAppDispatch();
    const images = useAppSelector(selectProductMedia);

    useEffect(() => {
        dispatch(loadMedia());
    }, []);

    return (
        <Row className="g-3">
            {images.map(image => (
                <Col key={image.id} xs={6} md={3}>
                    <ProductImageCard media={image}/>
                </Col>
            ))}
        </Row>
    )


}
