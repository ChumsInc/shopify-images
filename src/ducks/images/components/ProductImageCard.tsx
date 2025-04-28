import React, {useEffect, useRef} from 'react';
import ProductImageEditButton from "@/ducks/images/components/ProductImageEditButton";
import ProductFigure from "@/ducks/images/components/ProductFigure";
import ProductImageEdit from "@/ducks/images/components/ProductImageEdit";
import {ProductMedia} from "@/src/types/media";
import {Card, Stack} from "react-bootstrap";
import PushMediaButton from "@/ducks/images/components/PushMediaButton";
import {useAppSelector} from "@/app/configureStore";
import {selectSortedVariants} from "@/ducks/products/selectors";
import {ProductVariant} from "chums-types/src/shopify";
import {reImpulse2, reImpulse7} from "@/ducks/products/utils";
import PrimaryMediaBadge from "@/ducks/images/components/PrimaryMediaBadge";
import SuccessfulMediaBadge from "@/ducks/images/components/SuccessfulMediaBadge";
import DangerMediaBadge from "@/ducks/images/components/DangerMediaBadge";
import InfoMediaBadge from "@/ducks/images/components/InfoMediaBadge";

function hasPrimaryImage(variants: ProductVariant[], id: string): boolean {
    return variants.some(variant => variant.media.some(m => m.id === id));
}

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
                    {reImpulse7.test(media.alt) && (
                        <SuccessfulMediaBadge/>
                    )}
                    {reImpulse2.test(media.alt) && !reImpulse7.test(media.alt) && (
                        <DangerMediaBadge>ALL</DangerMediaBadge>
                    )}
                    {!reImpulse2.test(media.alt) && !reImpulse7.test(media.alt) && (
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
                {!media.alt && <DangerMediaBadge>Missing Alt Text</DangerMediaBadge>}
                <div className="text-secondary font-monospace mb-1"
                     onClick={altTextClickHandler}
                     style={{fontSize: 'small', cursor: 'pointer'}}>
                    {media.alt}
                </div>
                <ProductImageEdit media={media} show={edit} onClose={() => setEdit(false)} ref={editRef}/>
            </Card.Body>
        </Card>
    )
}
