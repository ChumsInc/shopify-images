import React, {ChangeEvent, useEffect, useId} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectCollectionsCurrentId, selectSortedCollectionsList} from "@/ducks/collections/selectors";
import {loadCollections, setCurrentCollection} from "@/ducks/collections/actions";
import {FormSelect, InputGroup} from "react-bootstrap";

export default function CollectionSelect() {
    const dispatch = useAppDispatch();
    const list = useAppSelector(selectSortedCollectionsList);
    const selected = useAppSelector(selectCollectionsCurrentId);
    const id = useId();

    useEffect(() => {
        dispatch(loadCollections());
    }, []);

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        const id = ev.target.value;
        dispatch(setCurrentCollection(id));
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>Filter by Collection</InputGroup.Text>
            <FormSelect id={id} value={selected ?? ''} size="sm" onChange={changeHandler}>
                <option value="">All</option>
                {list.map((item) => (<option key={item.gid} value={item.gid}>{item.handle}</option>))}
            </FormSelect>
        </InputGroup>
    )

}
