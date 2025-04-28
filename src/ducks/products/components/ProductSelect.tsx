import React, {ChangeEvent, useEffect, useId} from 'react';
import {FormSelect, InputGroup} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectCurrentProduct, selectSortedProducts} from "@/ducks/products/selectors";
import {loadProducts, setCurrentProduct} from "@/ducks/products/actions";
import {useSearchParams} from "react-router";

export default function ProductSelect() {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectSortedProducts);
    const product = useAppSelector(selectCurrentProduct);
    const [searchParams, setSearchParams] = useSearchParams();
    const id = useId();

    useEffect(() => {
        dispatch(loadProducts());
    }, []);

    useEffect(() => {
        const handle = searchParams.get("product");
        if (handle && !product && products.length > 0) {
            const [p] = products.filter(p => p.handle === handle);
            if (p) {
                dispatch(setCurrentProduct(p.id));
            }
        }
    }, [products, product, searchParams]);

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        const [p] = products.filter(p => p.id === ev.target.value);
        if (p) {
            searchParams.set('product', p.handle)
            setSearchParams(searchParams);
        } else if (ev.target.value === '') {
            searchParams.delete('product');
            setSearchParams(searchParams);
        }
        dispatch(setCurrentProduct(ev.target.value));
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>Filter Products</InputGroup.Text>
            <FormSelect id={id} size="sm" value={product?.id} onChange={changeHandler}>
                <option value="">All</option>
                {products.map(product => (<option key={product.id} value={product.id}>{product.handle}</option>))}
            </FormSelect>
        </InputGroup>
    )
}
