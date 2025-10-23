import {Col, Row} from "react-bootstrap";
import ProductInfo from "@/ducks/products/components/ProductInfo";
import ProductImageList from "@/ducks/media/components/ProductImageList";
import ProductImageStatus from "@/ducks/media/components/ProductImageStatus";


export default function ProductImagesContainer() {
    return (
        <Row>
            <Col xs={4} sm={3}>
                <ProductInfo/>
            </Col>
            <Col>
                <div className="sticky-top bg-body p-0 pb-3">
                    <ProductImageStatus />
                </div>
                <ProductImageList/>
            </Col>
        </Row>
    )
}
