import React from 'react';
import {SortableTable, SortableTableField, TablePagination} from "@chumsinc/sortable-tables";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectSortedVariants, selectVariantSort} from "@/ducks/products/selectors";
import {ProductVariant} from "chums-types/src/shopify";
import {SortProps} from "chums-types";
import {setVariantSort} from "@/ducks/products/actions";
import VariantUpdateMediaButton from "@/ducks/products/components/VariantUpdateMediaButton";


const fields: SortableTableField<ProductVariant>[] = [
    // {field: 'id', title: 'ID', sortable: true},
    {field: 'sku', title: 'SKU', sortable: true},
    {field: 'title', title: 'Title', sortable: true},
    {field: 'price', title: 'Price', sortable: true},
    {field: 'selectedOptions', title: 'Options', render: row => <VariantUpdateMediaButton variant={row}/>},
]
export default function VariantsTable() {
    const dispatch = useAppDispatch();
    const variants = useAppSelector(selectSortedVariants);
    const sort = useAppSelector(selectVariantSort);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const sortChangeHandler = (sort: SortProps<ProductVariant>) => {
        setPage(0);
        dispatch(setVariantSort(sort));
    }

    const selectVariantHandler = (variant: ProductVariant) => {
        // dispatch(setCurrentProduct(product.id));
    }

    const rowsPerPageChangeHandler = (rowsPerPage: number) => {
        setPage(0);
        setRowsPerPage(rowsPerPage);
    }
    return (
        <div>
            <SortableTable size="xs" currentSort={sort} onChangeSort={sortChangeHandler} fields={fields}
                           data={variants.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                           keyField="id" onSelectRow={selectVariantHandler}/>
            <TablePagination size="sm" page={page} onChangePage={setPage}
                             rowsPerPage={rowsPerPage}
                             rowsPerPageProps={{
                                 pageValues: [15, 25, 50, 100],
                                 onChange: rowsPerPageChangeHandler,
                             }}
                             count={variants.length}/>
        </div>
    )
}
