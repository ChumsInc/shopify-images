import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch, useAppSelector} from "_app/configureStore";
import {FormCheck} from "react-bootstrap";
import {selectShowProducts} from "_ducks/products/selectors";
import {setShowProducts} from "_ducks/products/actions";

export default function ShowProductsCheckbox() {
    const dispatch = useAppDispatch();
    const showProducts = useAppSelector(selectShowProducts);
    const id = useId();

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(setShowProducts(ev.target.checked));
    }

    return (
        <FormCheck id={id} checked={showProducts} label="Show Products" onChange={changeHandler} />
    )

}
