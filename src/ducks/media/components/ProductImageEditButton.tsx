import React, {useId} from 'react';
import {ToggleButton, ToggleButtonProps} from "react-bootstrap";

export interface ProductImageEditButtonProps extends Omit<ToggleButtonProps, 'id'|'value'> {
    checked?: boolean;
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProductImageEditButton({checked, onChange, ...rest}: ProductImageEditButtonProps) {
    const id = useId();
    return (
        <ToggleButton type="checkbox" variant="outline-primary" size="sm"
                      id={id} value="1" checked={checked} onChange={onChange} {...rest}>
            Edit
        </ToggleButton>
    )
}
