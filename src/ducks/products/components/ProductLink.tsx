import React from 'react';
import type {Product} from "chums-types/shopify";

export interface ProductLinkProps {
    product: Product;
    admin?: boolean;
    children: React.ReactNode;
}

export default function ProductLink({product, admin, children}: ProductLinkProps) {

    if (!admin) {
        const [collection] = product.collections;
        let url = `https://chums.com/products/${encodeURIComponent(product.handle)}`;
        if (collection) {
            url = `https://chums.com/collections/${encodeURIComponent(collection)}/products/${encodeURIComponent(product.handle)}`;
        }
        return (
            <a href={url} target="_blank" rel="noreferrer">{children}</a>
        )
    }
    const id = product.id.replace('gid://shopify/Product/', '');
    const url = `https://admin.shopify.com/store/chumsinc/products/${encodeURIComponent(id)}`;
    return (
        <a href={url} target="_blank" rel="noreferrer">{children}</a>
    )
}
