import {SortProps} from "chums-types";
import {Product, ProductVariant, SelectedOption} from "chums-types/src/shopify";
import {ProductMedia} from "@/src/types/media";

export const productSorter = ({field, ascending}: SortProps<Product>) => (a: Product, b: Product) => {
    const sortMod = ascending ? 1 : -1;
    switch (field) {
        case 'handle':
        case 'title':
            return (
                a[field].localeCompare(b[field]) === 0
                    ? a.id.localeCompare(b.id)
                    : a[field].localeCompare(b[field])
            ) * sortMod;
        case 'id':
        default:
            return (a.id.localeCompare(b.id)) * sortMod;
    }
}

export const productVariantSorter = ({field, ascending}: SortProps<ProductVariant>) =>
    (a: ProductVariant, b: ProductVariant) => {
        const sortMod = ascending ? 1 : -1;
        switch (field) {
            case 'sku':
            case 'title':
            case 'price':
                return (
                    (a[field] ?? '').localeCompare(b[field] ?? '') === 0
                        ? a.id.localeCompare(b.id)
                        : (a[field] ?? '').localeCompare(b[field] ?? '')
                ) * sortMod;
            case 'id':
            default:
                return (a.id.localeCompare(b.id)) * sortMod;
        }
    }


export function handleize(str: string): string {
    return str.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-$/, '')
        .replace(/^-/, '')
}

export const colorGroups = ['color', 'pattern', 'color-pattern']

export function colorOptions(options:SelectedOption[]):string {
    if (options.length === 1) {
        return options
            .map(opt => `#${handleize(opt.name)}_${handleize(opt.value)}`)
            .join('')
    }
    return options.filter(opt => colorGroups.includes(handleize(opt.name)))
        .map(opt => `#${handleize(opt.name)}_${handleize(opt.value)}`)
        .join('')
}

export const reOptionGroup = /#([a-z-]+)_[a-z0-9-]+$/;
export const reImpulse7 = /^(sku:[A-Z0-9-]+)\s+(.*)(#[a-z-]+_[a-z0-9-]+)$/;
export const reImpulse2 = /^(sku:|#)[a-z0-9]+/i;


export function variantImages(media:ProductMedia[], variant: ProductVariant):ProductMedia[] {
    const idList = variant.media.map(m => m.id);
    return media
        .filter(
            m => idList.includes(m.id)
            || m.alt.startsWith(`#${variant.sku} `)
            || m.alt.startsWith(`sku:${variant.sku} `)
            || m.preview.image.url.includes(variant.sku)
        );
}

export function formatAltText(altText: string, variant:ProductVariant, productTitle:string): string {
    const hasColorOption = variant.selectedOptions.length === 1
        || variant.selectedOptions.filter(opt => colorGroups.includes(handleize(opt.name))).length > 0;
    const skuInfo = `sku:${variant.sku} `;
    const hashSku = `#${variant.sku} `;
    let alt = altText;
    if (!(alt.trim().startsWith(skuInfo) || alt.trim().startsWith(hashSku))) {
        alt = `${skuInfo.trim()} ${alt.trim()}`;
    }
    if (alt.startsWith(hashSku)) {
        alt = alt.replace(hashSku, skuInfo);
    }
    if (alt.trim() === skuInfo.trim()) {
        alt = `${alt.trim()} ${productTitle} ${variant.title}`;
    }
    if (hasColorOption && !reOptionGroup.test(alt)) {
        alt = `${alt.trim()} ${colorOptions(variant.selectedOptions)}`;
    }
    return alt;
}
