import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectProductMedia} from "@/ducks/media";
import {Col, Row} from "react-bootstrap";
import {loadProductMedia} from "@/ducks/media/actions";
import ProductImageCard from "@/ducks/media/components/ProductImageCard";
import {selectCurrentProduct} from "@/ducks/products";
import {TablePagination} from "@chumsinc/sortable-tables";

export default function ProductImageList() {
    const dispatch = useAppDispatch();
    const product = useAppSelector(selectCurrentProduct);
    const images = useAppSelector(selectProductMedia);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);

    useEffect(() => {
        if (!product) {
            return;
        }
        setPage(0);
        dispatch(loadProductMedia(product));
    }, [product]);

    const rowsPerPageChangeHandler = (rowsPerPage: number) => {
        setPage(0);
        setRowsPerPage(rowsPerPage);
    }

    return (
        <div>
            <Row className="g-3">
                {images
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map(image => (
                        <Col key={image.id} xs={6} md={3}>
                            <ProductImageCard media={image}/>
                        </Col>
                    ))}
            </Row>
            <TablePagination size="sm" count={images.length} page={page} onChangePage={setPage}
                             rowsPerPage={rowsPerPage}
                             rowsPerPageProps={{pageValues: [8, 16, 32, 64], onChange: rowsPerPageChangeHandler}}/>
        </div>
    )


}
