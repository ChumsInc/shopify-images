import React, {useId} from 'react';
import {FormControl, InputGroup} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectVariantFilter, setVariantFilter} from "@/ducks/products";

export default function VariantFilter() {
    const dispatch = useAppDispatch();
    const value = useAppSelector(selectVariantFilter);
    const id = useId();

    const changeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setVariantFilter(ev.target.value));
    }
    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id} aria-label="Filter Variants">
                <span className="bi-search" aria-hidden="true"/>
            </InputGroup.Text>
            <FormControl id={id} type="search" value={value} onChange={changeHandler}/>
        </InputGroup>
    )
}
