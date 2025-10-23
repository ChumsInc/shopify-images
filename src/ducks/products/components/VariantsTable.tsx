import React, {useEffect, useId, useState} from 'react';
import {SortableTable, type SortableTableField, TablePagination} from "@chumsinc/sortable-tables";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectSortedVariants, selectVariantSort, setVariantSort} from "@/ducks/products";
import type {ProductVariant} from "chums-types/shopify";
import type {SortProps} from "chums-types";
import VariantUpdateMediaButton from "@/ducks/products/components/VariantUpdateMediaButton";
import {Col, Row, ToggleButton} from "react-bootstrap";


const defaultFields: SortableTableField<ProductVariant>[] = [
    // {field: 'id', title: 'ID', sortable: true},
    {field: 'sku', title: 'SKU', sortable: true},
    {field: 'title', title: 'Title', sortable: true},
    {field: 'price', title: 'Price', sortable: true},
];

const optionalFields: SortableTableField<ProductVariant>[] = [
    {field: 'selectedOptions', title: 'Options', render: row => <VariantUpdateMediaButton variant={row}/>},
]

export default function VariantsTable() {
    const dispatch = useAppDispatch();
    const variants = useAppSelector(selectSortedVariants);
    const sort = useAppSelector(selectVariantSort);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [fields, setFields] = useState<SortableTableField<ProductVariant>[]>(defaultFields);
    const [show, setShow] = useState(false);
    const showOptionsId = useId();

    useEffect(() => {
        setPage(0);
    }, [variants.length]);

    useEffect(() => {
        setFields(show ? [...defaultFields, ...optionalFields] : defaultFields);
    }, [show]);

    const sortChangeHandler = (sort: SortProps<ProductVariant>) => {
        setPage(0);
        dispatch(setVariantSort(sort));
    }

    const selectVariantHandler = (_: ProductVariant) => {
        //@TODO: can this be removed
        // dispatch(setCurrentProduct(product.id));
    }

    const rowsPerPageChangeHandler = (rowsPerPage: number) => {
        setPage(0);
        setRowsPerPage(rowsPerPage);
    }
    return (
        <div>
            <Row className="g-0">
                <Col/>
                <Col xs="auto">
                    <ToggleButton id={showOptionsId} type="checkbox" checked={show}
                                  variant="secondary" size="sm"
                                  value="show-options" onChange={() => setShow(!show)}>
                        Show Options
                    </ToggleButton>
                </Col>
            </Row>
            <SortableTable size="xs" currentSort={sort} onChangeSort={sortChangeHandler} fields={fields}
                           data={variants.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                           keyField="id" onSelectRow={selectVariantHandler}/>
            <TablePagination size="sm" page={page} onChangePage={setPage}
                             rowsPerPage={rowsPerPage}
                             rowsPerPageProps={{
                                 pageValues: [10, 15, 25, 50, 100],
                                 onChange: rowsPerPageChangeHandler,
                             }}
                             count={variants.length}/>
        </div>
    )
}
