import React, {useEffect, useState} from 'react';
import {ProductVariant} from "chums-types/src/shopify";
import {useAppDispatch, useAppSelector} from "_app/configureStore";
import {selectProductMedia} from "_ducks/images/selectors";
import {ProductMedia} from "_src/types/media";
import {Button} from "react-bootstrap";
import {setMediaChange} from "_ducks/images/actions";
import {formatAltText, variantImages} from "_ducks/products/utils";
import {selectCurrentProduct} from "_ducks/products/selectors";


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
            const alt = formatAltText(m.alt, variant, product.title);
            dispatch(setMediaChange({id: m.id, alt: alt}));
        })
    }
    return (
        <Button type="button" onClick={clickHandler} disabled={media.length === 0} size="sm" style={{fontSize: '10px'}}>
            Set Alt ({media.length})
        </Button>
    )

}
