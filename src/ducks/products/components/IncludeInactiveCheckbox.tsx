import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch, useAppSelector} from "_app/configureStore";
import {selectIncludeInactive} from "_ducks/products/selectors";
import {setIncludeInactive} from "_ducks/products/actions";
import {FormCheck} from "react-bootstrap";

export default function IncludeInactiveCheckbox() {
    const dispatch = useAppDispatch();
    const includeInactive = useAppSelector(selectIncludeInactive);
    const id = useId();

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(setIncludeInactive(ev.target.checked));
    }

    return (
        <FormCheck checked={includeInactive} onChange={changeHandler} id={id} label="Include inactive" />
    )
}
