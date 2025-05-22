import React, {useEffect, useRef} from 'react';
import ProductImageEditButton from "@/ducks/media/components/ProductImageEditButton";
import ProductFigure from "@/ducks/media/components/ProductFigure";
import ProductImageEdit from "@/ducks/media/components/ProductImageEdit";
import {ProductMedia} from "@/src/types/media";
import {Card, Stack} from "react-bootstrap";
import PushMediaButton from "@/ducks/media/components/PushMediaButton";
import {useAppSelector} from "@/app/configureStore";
import {selectSortedVariants} from "@/ducks/products";
import {ProductVariant} from "chums-types/src/shopify";
import {reImpulse2, reImpulse7} from "@/ducks/products/utils";
import PrimaryMediaBadge from "@/ducks/media/components/PrimaryMediaBadge";
import SuccessfulMediaBadge from "@/ducks/media/components/SuccessfulMediaBadge";
import DangerMediaBadge from "@/ducks/media/components/DangerMediaBadge";
import InfoMediaBadge from "@/ducks/media/components/InfoMediaBadge";
import {hasPrimaryImage, isImpulse2, isMissingAltText, isValidAll, isValidImpulse7} from "@/ducks/media/utils";
import UnlinkMediaButton from "@/components/UnlinkMediaButton";


export interface ProductImageContainerProps {
    media: ProductMedia;
}

export default function ProductImageCard({media}: ProductImageContainerProps) {
    const variants = useAppSelector(selectSortedVariants);
    const [edit, setEdit] = React.useState(false);
    const [isPrimaryImage, setIsPrimaryImage] = React.useState(hasPrimaryImage(variants, media.id));
    const editRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        setIsPrimaryImage(hasPrimaryImage(variants, media.id));
    }, [variants, media]);

    const altTextClickHandler = () => {
        editRef.current?.focus();
        setEdit(true);
    }

    return (
        <Card className="mb-3">
            <Card.Header>
                <Stack direction="horizontal" className="mb-1 align-content-center" gap={1}>
                    {isPrimaryImage && (
                        <PrimaryMediaBadge/>
                    )}
                    {isValidImpulse7(media.alt) && (
                        <SuccessfulMediaBadge/>
                    )}
                    {isImpulse2(media.alt) && (
                        <DangerMediaBadge>ALL</DangerMediaBadge>
                    )}
                    {isValidAll(media.alt) && (
                        <InfoMediaBadge>ALL</InfoMediaBadge>
                    )}
                    <ProductImageEditButton checked={edit} onChange={(ev) => setEdit(ev.target.checked)}/>
                    <PushMediaButton media={media}/>
                </Stack>
            </Card.Header>
            <Card.Body>
                <ProductFigure media={media} width={240}/>
            </Card.Body>
            <Card.Body className="border-top">
                {isMissingAltText(media.alt) && <DangerMediaBadge>Missing Alt Text</DangerMediaBadge>}
                <div className="text-secondary font-monospace mb-1"
                     onClick={altTextClickHandler}
                     style={{fontSize: 'small', cursor: 'pointer'}}>
                    {media.alt}
                </div>
                <ProductImageEdit media={media} show={edit} onClose={() => setEdit(false)} ref={editRef}/>
            </Card.Body>
            <Card.Footer className="text-muted">
                <UnlinkMediaButton media={media}/>
            </Card.Footer>
        </Card>
    )
}
