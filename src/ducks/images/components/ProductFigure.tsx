import React, {useEffect, useState} from 'react';
import {Figure, FigureProps} from "react-bootstrap";
import {Media} from "chums-types/src/shopify";
import {parseImageUrl, parseImageURLParams} from "@/ducks/images/utils";
import Decimal from "decimal.js";
import {ProductMedia} from "@/src/types/media";

function mediaHeight(width:string|number, media:ProductMedia|Media):number {
    return new Decimal(width).dividedBy(media.preview.image.width ?? 0)
        .times(media.preview.image.height ?? 0)
        .toDecimalPlaces(0).toNumber()
}

export interface ProductFigureProps extends Omit<FigureProps, 'media'> {
    media: ProductMedia;
    width: string|number;
}
export default function ProductFigure({media, width}:ProductFigureProps) {
    const [url, setUrl] = useState<string | null>(parseImageUrl(media.preview.image.url));
    const [params, setParams] = useState<URLSearchParams>(parseImageURLParams(media?.preview.image.url, {width: `${width}`}));
    const [height, setHeight] = useState<number>(mediaHeight(width, media));

    useEffect(() => {
        setUrl(parseImageUrl(media.preview.image.url));
        setHeight(mediaHeight(width, media));
        setParams(parseImageURLParams(media?.preview.image.url, {width: `${width}`}));
    }, [media, width]);

    const src = `${url}?${params.toString()}`;

    if (!url) {
        return null;
    }

    return (
        <Figure title={media.preview.image.id}>
            <Figure.Image width={width} height={height} alt={media.alt} src={src} />
            <Figure.Caption style={{fontSize: 'x-small', wordBreak: 'break-all'}}>
                <a href={media.preview.image.url} target="_blank" rel="noreferrer">{media.preview.image.url}</a>
            </Figure.Caption>
        </Figure>
    )

}
