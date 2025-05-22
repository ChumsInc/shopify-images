import React from 'react';
import {SortableTable, SortableTableField, TablePagination} from "@chumsinc/sortable-tables";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {
    selectCurrentProduct,
    selectProductSort,
    selectSortedProducts,
    setCurrentProductId,
    setProductSort
} from "@/ducks/products";
import {Product} from "chums-types/src/shopify";
import {SortProps} from "chums-types";
import IncludeInactiveCheckbox from "@/ducks/products/components/IncludeInactiveCheckbox";
import classNames from "classnames";
import {generatePath, useNavigate} from "react-router";
import {selectCurrentCollection} from "@/ducks/collections";

const fields: SortableTableField<Product>[] = [
    // {field: 'id', title: 'ID', sortable: true},
    {field: 'handle', title: 'Handle', sortable: true},
    {field: 'title', title: 'Title', sortable: true},
    {field: 'variants', title: 'Variants', render: (row) => row.variants.length, align: 'end'},
]
export default function ProductsTable() {
    const dispatch = useAppDispatch();
    const collection = useAppSelector(selectCurrentCollection);
    const products = useAppSelector(selectSortedProducts);
    const current = useAppSelector(selectCurrentProduct);
    const sort = useAppSelector(selectProductSort);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const navigate = useNavigate();

    const sortChangeHandler = (sort: SortProps<Product>) => {
        setPage(0);
        dispatch(setProductSort(sort));
    }

    const selectProductHandler = (product: Product) => {
        dispatch(setCurrentProductId(product.id));
        if (!collection) {
            return;
        }
        navigate(generatePath('/collections/:collection/:product', {
            collection: collection.handle,
            product: product.handle
        }));
    }

    const rowsPerPageChangeHandler = (rowsPerPage: number) => {
        setPage(0);
        setRowsPerPage(rowsPerPage);
    }
    const rowClassName = (row: Product) => {
        return classNames({
            'table-danger': row.status === 'ARCHIVED',
            'table-info': row.status === 'DRAFT',
        })
    }
    return (
        <div>
            <IncludeInactiveCheckbox/>
            <SortableTable size="xs" currentSort={sort} onChangeSort={sortChangeHandler} fields={fields}
                           data={products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                           selected={current?.id}
                           rowClassName={rowClassName}
                           keyField="id" onSelectRow={selectProductHandler}/>
            <TablePagination size="sm" page={page} onChangePage={setPage}
                             rowsPerPage={rowsPerPage}
                             showFirst showLast
                             count={products.length}
                             rowsPerPageProps={{
                                 onChange: rowsPerPageChangeHandler,
                             }}/>
        </div>
    )
}
