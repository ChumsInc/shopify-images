import React, {useEffect, useRef} from 'react';
import ProductFigure from "@/ducks/media/components/ProductFigure";
import ProductImageEdit from "@/ducks/media/components/ProductImageEdit";
import type {ProductMedia} from "@/types/media";
import {Card, Stack} from "react-bootstrap";
import PushMediaButton from "@/ducks/media/components/PushMediaButton";
import {useAppSelector} from "@/app/configureStore";
import {selectSortedVariants} from "@/ducks/products";
import PrimaryMediaBadge from "@/ducks/media/components/PrimaryMediaBadge";
import SuccessfulMediaBadge from "@/ducks/media/components/SuccessfulMediaBadge";
import DangerMediaButton from "@/ducks/media/components/DangerMediaButton";
import InfoMediaBadge from "@/ducks/media/components/InfoMediaBadge";
import {hasPrimaryImage, isImpulse2, isMissingAltText, isValidAll, isValidImpulse7} from "@/ducks/media/utils";
import UnlinkMediaButton from "@/components/UnlinkMediaButton";
import MediaTypeBadge from "@/ducks/products/components/MediaTypeBadge";


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
                <Stack direction="horizontal" className="mb-1 align-content-center justify-content-between" gap={1}>
                    <Stack direction="horizontal" gap={1}>
                        <MediaTypeBadge type={media.mediaContentType}/>
                        {isPrimaryImage && (
                            <PrimaryMediaBadge/>
                        )}
                        {isValidImpulse7(media.alt) && (
                            <SuccessfulMediaBadge/>
                        )}
                        {isImpulse2(media.alt) && (
                            <DangerMediaButton>ALL</DangerMediaButton>
                        )}
                        {isValidAll(media.alt) && (
                            <InfoMediaBadge>ALL</InfoMediaBadge>
                        )}
                    </Stack>
                    <PushMediaButton media={media}/>
                    <UnlinkMediaButton media={media} disabled={isPrimaryImage}/>
                </Stack>
            </Card.Header>
            <Card.Body className="text-center">
                <ProductFigure media={media} width={240}/>
            </Card.Body>
            <Card.Body className="border-top">
                {isMissingAltText(media.alt) &&
                    <DangerMediaButton onClick={() => setEdit(true)}>Missing Alt Text</DangerMediaButton>}
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
