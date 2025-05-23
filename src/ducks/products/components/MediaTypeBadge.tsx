import React from 'react';
import {Badge} from "react-bootstrap";

export interface MediaTypeIconProps {
    type?: string;
}
export default function MediaTypeBadge({type}:MediaTypeIconProps) {
    switch (type) {
        case 'IMAGE':
            return <Badge bg="info" className="fs-6 text-dark" ><span className="bi-image"/></Badge>
        case 'EXTERNAL_VIDEO':
            return <Badge bg="danger" className="fs-6"><span className="bi-youtube"/></Badge>
        default:
            return null;
    }
}
