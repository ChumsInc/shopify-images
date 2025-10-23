import React from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectImagesStatus} from "@/ducks/media";
import {Button, type ButtonProps, Modal, ProgressBar, Stack} from "react-bootstrap";
import {selectCurrentProduct} from "@/ducks/products";
import ProductFigure from "@/ducks/media/components/ProductFigure";
import {unlinkProductMedia} from "@/ducks/media/actions";
import type {ProductMedia} from "@/types/media";

export interface UnlinkMediaButtonProps extends Omit<ButtonProps, 'onClick'|'variant'> {
    media: ProductMedia;
}

export default function UnlinkMediaButton({media, disabled, ...props}: UnlinkMediaButtonProps) {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectImagesStatus);
    const product = useAppSelector(selectCurrentProduct);
    const [show, setShow] = React.useState(false);

    const clickHandler = async () => {
        await dispatch(unlinkProductMedia({productId: product!.id, mediaId: media.id}));
        setShow(false);
    }

    if (!product) {
        return null;
    }
    return (
        <>
            <Button {...props} type="button" variant="danger" size="sm" onClick={() => setShow(true)} disabled={disabled || status !== 'idle'}>
                <span className="bi-x-lg" />
            </Button>
            {show && (
                <Modal show={show} onHide={() => setShow(false)} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Unlink Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Stack gap={2} direction="horizontal" className="align-items-start">
                            <ProductFigure media={media} width={240}/>
                            <div>
                                <h4>{media.alt}</h4>
                                <p>Are you sure you want to unlink this image from &#39;<strong>{product.handle}</strong>&#39;?</p>
                            </div>
                        </Stack>
                        {status !== 'idle' && (
                            <ProgressBar animated now={100} title={"unlinking media..."}/>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={clickHandler} disabled={status !== 'idle'}>Unlink Image from Product</Button>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )

}
