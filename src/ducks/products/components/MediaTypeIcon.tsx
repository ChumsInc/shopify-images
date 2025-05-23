import React from 'react';

export interface MediaTypeIconProps {
    type?: string;
}
export default function MediaTypeIcon({type}:MediaTypeIconProps) {
    switch (type) {
        case 'IMAGE':
            return <span className="bi-image text-info mx-1"/>
        case 'EXTERNAL_VIDEO':
            return <span className="bi-youtube mx-1 text-danger"/>
        default:
            return null;
    }
}
