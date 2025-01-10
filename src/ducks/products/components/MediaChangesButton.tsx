import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "_app/configureStore";
import {selectPendingChanges} from "_ducks/images/selectors";
import {mutateProductMedia} from "_ducks/images/api";
import {receiveMedia} from "_ducks/images/actions";
import {Button} from "react-bootstrap";

export default function MediaChangesButton() {
    const dispatch = useAppDispatch();
    const changes = useAppSelector(selectPendingChanges);
    const [busy, setBusy] = React.useState(false);
    const [disabled, setDisabled] = React.useState(changes.length === 0);

    const clickHandler = useCallback(async () => {
        setBusy(true);
        const response = await mutateProductMedia(changes);
        dispatch(receiveMedia(response));
        setBusy(false);
    }, [changes]);

    useEffect(() => {
        setDisabled(changes.length === 0);
    }, [changes]);

    const variant = changes.length > 0 ? 'warning' : 'outline-secondary';

    return (
        <Button variant={variant} size="sm" disabled={busy || disabled} onClick={clickHandler}>
            Upload ({changes.length}) <span className="ms-1 bi-cloud-upload"/>
        </Button>
    )


}
