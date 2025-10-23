import {type ReactNode} from 'react';
import {Badge} from "react-bootstrap";

export default function InfoMediaBadge({children}: {
    children?: ReactNode;
}) {
    return (
        <Badge bg="info" className="fs-6">
            {children}
        </Badge>
    )
}
