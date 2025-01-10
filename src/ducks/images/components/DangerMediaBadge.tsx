import React, {ReactNode} from 'react';
import {Badge} from "react-bootstrap";

export default function DangerMediaBadge({children}: {

    children?: ReactNode;
}) {
    return (
        <Badge bg="danger" className="fs-6">
            {children}
            <span className="bi-exclamation-octagon ms-2"/>
        </Badge>
    )
}
