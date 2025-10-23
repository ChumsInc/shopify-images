import {useEffect, useState} from 'react';
import type {ProductVariant} from "chums-types/shopify";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectProductMedia, setMediaChange} from "@/ducks/media";
import type {ProductMedia} from "@/types/media";
import {Button} from "react-bootstrap";
import {formatAltText, variantImages} from "@/ducks/products/utils";
import {selectCurrentProduct} from "@/ducks/products";


export interface VariantUpdateMediaButtonProps {
    variant: ProductVariant;
}

export default function VariantUpdateMediaButton({variant}: VariantUpdateMediaButtonProps) {
    const dispatch = useAppDispatch();
    const product = useAppSelector(selectCurrentProduct);
    const productMedia = useAppSelector(selectProductMedia);
    // variant media is an array, perhaps Shopify is adding ways to link multiple media to a variant?
    const [media, setMedia] = useState<ProductMedia[]>(variantImages(productMedia, variant));

    useEffect(() => {
        setMedia(variantImages(productMedia, variant));
    }, [variant, productMedia]);

    const clickHandler = () => {
        media.forEach(m => {
            const alt = formatAltText(m.alt, variant, product!.title);
            dispatch(setMediaChange({id: m.id, alt: alt}));
        })
    }
    if (!product) {
        return null;
    }
    return (
        <Button type="button" onClick={clickHandler} disabled={media.length === 0} size="sm" style={{fontSize: '10px'}}>
            Set Alt ({media.length})
        </Button>
    )

}
