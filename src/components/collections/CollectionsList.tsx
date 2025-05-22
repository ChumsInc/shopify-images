import React, {useEffect, useState} from 'react';
import {SortableTable, SortableTableField, TablePagination} from "@chumsinc/sortable-tables";
import {Collection} from "chums-types/src/shopify";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {
    selectCollectionSort,
    selectCurrentCollection,
    selectSortedCollectionsList,
    setCollectionSort,
    setCurrentCollectionId
} from "@/ducks/collections";
import {useNavigate} from "react-router";
import {SortProps} from "chums-types";
import classNames from "classnames";
import dayjs from "dayjs";

const fields: SortableTableField<Collection>[] = [
    {field: 'handle', title: 'Handle', sortable: true},
    {field: 'title', title: 'Title', sortable: true},
    {
        field: 'productsCount',
        title: 'Products',
        render: (row) => row.productsCount,
        align: 'end',
        sortable: true,
        className: (row) => classNames({'text-danger': !row.productsCount})
    },
    {
        field: 'updatedAt',
        title: 'Last Updated',
        sortable: true,
        align: 'end',
        render: (row) => dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm')
    },
]
export default function CollectionsList() {
    const dispatch = useAppDispatch();
    const list = useAppSelector(selectSortedCollectionsList);
    const collection = useAppSelector(selectCurrentCollection);
    const sort = useAppSelector(selectCollectionSort);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const navigate = useNavigate();

    useEffect(() => {
        setPage(0);
    }, [sort, list.length]);

    const sortChangeHandler = (sort: SortProps<Collection>) => {
        dispatch(setCollectionSort(sort));
    }

    const rowSelectHandler = (row: Collection) => {
        dispatch(setCurrentCollectionId(row.gid));
        // navigate(`/collections/${row.handle}`);
    }

    return (
        <div>
            <SortableTable<Collection> size="xs" fields={fields} keyField="gid"
                                       data={list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                                       onSelectRow={rowSelectHandler} selected={collection?.gid}
                                       currentSort={sort} onChangeSort={sortChangeHandler}/>
            <TablePagination page={page} onChangePage={setPage}
                             rowsPerPage={rowsPerPage} rowsPerPageProps={{onChange: setRowsPerPage}}
                             count={list.length}/>
        </div>
    )
}
