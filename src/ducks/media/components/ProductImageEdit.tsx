import {
    type ChangeEvent,
    type FormEvent,
    type KeyboardEvent,
    type RefObject,
    useCallback,
    useEffect,
    useId,
    useState
} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {saveMediaChange} from "@/ducks/media/actions";
import {Button, Collapse, FormControl, InputGroup} from "react-bootstrap";
import {selectMediaStatusById} from "@/ducks/media";
import type {ProductMedia} from "@/types/media";

export interface ProductImageEditProps {
    media: ProductMedia;
    show?: boolean;
    onClose: () => void;
    ref: RefObject<HTMLTextAreaElement|null>
}

export default function ProductImageEdit({media, show, onClose, ref}: ProductImageEditProps) {
    const dispatch = useAppDispatch();
    const [alt, setAlt] = useState<string>(media.alt ?? media.preview.image.altText ?? '');
    const status = useAppSelector(state => selectMediaStatusById(state, media.id));
    const inputId = useId();

    useEffect(() => {
        setAlt(media.alt ?? media.preview.image.altText ?? '');
    }, [media]);

    const onSave = useCallback(async (alt: string) => {
        if (!media) {
            return;
        }
        await dispatch(saveMediaChange({id: media.id, alt}))
    }, [media])

    const onSubmit = async (ev: FormEvent) => {
        ev.preventDefault();
        await onSave(alt);
        onClose();
    }

    const changeHandler = (ev: ChangeEvent<HTMLTextAreaElement>) => {
        setAlt(ev.target.value.replace(/\n/g, ''));
    }

    const inputHandler = async (ev: KeyboardEvent<HTMLTextAreaElement>) => {
        if (ev.code === 'Enter') {
            ev.preventDefault();
            await onSave(alt);
            onClose();
        }
    }

    return (
        <Collapse in={show}>
            <form onSubmit={onSubmit}>
                <InputGroup size="sm" className="mb-1">
                    <InputGroup.Text as="label" htmlFor={inputId}>
                        <span className="bi-card-text" aria-label="Image Alt Text"/>
                    </InputGroup.Text>
                    <FormControl size="sm" id={inputId} value={alt} ref={ref}
                                 onChange={changeHandler} onKeyDown={inputHandler}
                                 as="textarea" rows={4}
                                 className="font-monospace"/>
                </InputGroup>
                <Button type="submit" variant="secondary" size="sm" disabled={status !== 'idle'}
                        className="me-1">Save</Button>
                <Button type="button" variant="outline-secondary" size="sm" disabled={status !== 'idle'}
                        onClick={onClose}>Cancel</Button>
            </form>
        </Collapse>
    )
}
