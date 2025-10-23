import {SortableTable, type SortableTableField, TablePagination} from "@chumsinc/sortable-tables";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {
    selectCurrentProduct,
    selectPage,
    selectProductSort,
    selectRowsPerPage,
    selectSortedProducts,
    setCurrentProductId,
    setPage,
    setProductSort,
    setRowsPerPage
} from "@/ducks/products";
import type {SortProps} from "chums-types";
import IncludeInactiveCheckbox from "@/ducks/products/components/IncludeInactiveCheckbox";
import classNames from "classnames";
import {generatePath, useNavigate} from "react-router";
import {selectCurrentCollection} from "@/ducks/collections";
import type {ProductWithMedia} from "@/types/products";
import MediaTypeIcon from "@/ducks/products/components/MediaTypeIcon";

const fields: SortableTableField<ProductWithMedia>[] = [
    // {field: 'id', title: 'ID', sortable: true},
    {field: 'handle', title: 'Handle', sortable: true},
    {field: 'title', title: 'Title', sortable: true},
    {field: 'variants', title: 'Variants', render: (row) => row.variants.length, align: 'end'},
    {field: 'mediaCount', title: 'Media', render: (row) => row.mediaCount, align: 'end'},
    {field: 'mediaTypes', title: 'Media Types', render: (row) => row.mediaTypes.map(t => <MediaTypeIcon type={t} key={t} />), align: 'center'},
]
export default function ProductsTable() {
    const dispatch = useAppDispatch();
    const collection = useAppSelector(selectCurrentCollection);
    const products = useAppSelector(selectSortedProducts);
    const current = useAppSelector(selectCurrentProduct);
    const sort = useAppSelector(selectProductSort);
    const page = useAppSelector(selectPage);
    const rowsPerPage = useAppSelector(selectRowsPerPage);
    const navigate = useNavigate();

    const sortChangeHandler = (sort: SortProps<ProductWithMedia>) => {
        dispatch(setProductSort(sort));
    }

    const selectProductHandler = (product: ProductWithMedia) => {
        dispatch(setCurrentProductId(product.id));
        if (!collection) {
            return;
        }
        navigate(generatePath('/collections/:collection/:product', {
            collection: collection.handle,
            product: product.handle
        }));
    }

    const pageChangeHandler = (page: number) => {
        dispatch(setPage(page));
    }
    const rowsPerPageChangeHandler = (rowsPerPage: number) => {
        dispatch(setRowsPerPage(rowsPerPage));
    }
    const rowClassName = (row: ProductWithMedia) => {
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
            <TablePagination size="sm" page={page} onChangePage={pageChangeHandler}
                             rowsPerPage={rowsPerPage}
                             showFirst showLast
                             count={products.length}
                             rowsPerPageProps={{
                                 onChange: rowsPerPageChangeHandler,
                             }}/>
        </div>
    )
}
