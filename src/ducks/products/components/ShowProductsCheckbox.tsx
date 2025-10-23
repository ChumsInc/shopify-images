import {type ChangeEvent, useId} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {FormCheck} from "react-bootstrap";
import {selectShowProducts, setShowProducts} from "@/ducks/products";

export default function ShowProductsCheckbox() {
    const dispatch = useAppDispatch();
    const showProducts = useAppSelector(selectShowProducts);
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setShowProducts(ev.target.checked));
    }

    return (
        <FormCheck id={id} checked={showProducts} label="Show Products" onChange={changeHandler}/>
    )

}
