import React from 'react';
import {ProductMedia} from "@/src/types/media";
import {Button} from "react-bootstrap";
import {mutateProductMedia} from "@/ducks/media/api";
import {useAppDispatch} from "@/app/configureStore";
import {receiveMedia} from "@/ducks/media/actions";

export interface PushMediaButtonProps {
    media:ProductMedia;
    disabled?: boolean;
}

export default function PushMediaButton({media, disabled}: PushMediaButtonProps) {
    const dispatch = useAppDispatch();
    const [busy, setBusy] = React.useState(disabled ?? false);

    const isChanged = media.alt !== media.preview.image.altText;
    const variant = isChanged ? 'warning' : 'outline-secondary';

    const clickHandler = async () => {
        setBusy(true);
        const response = await mutateProductMedia([{id: media.id, alt: media.alt}]);
        dispatch(receiveMedia(response));
        setBusy(false);
    }
    return (
        <Button variant={variant} size="sm" disabled={busy} onClick={clickHandler}>
            Upload <span className="ms-1 bi-cloud-upload" />
        </Button>
    )
}
