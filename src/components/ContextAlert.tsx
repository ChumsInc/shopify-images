import React from 'react';
import Alert, {type AlertProps} from 'react-bootstrap/Alert'
import {Badge} from "react-bootstrap";
import numeral from "numeral";
import type {StyledErrorAlert} from "@/types/alert";

export interface ContextAlertProps extends Pick<StyledErrorAlert, 'context' | 'count'>, AlertProps {
    children?: React.ReactNode;
}

export default function ContextAlert({context, count, children, ...alertProps}: ContextAlertProps) {
    return (
        <Alert {...alertProps}>
            {!!context && (
                <Alert.Heading>
                    {context}
                    {count > 1 && (
                        <Badge color={alertProps.color} className="ms-1">{numeral(count).format('0,0')}</Badge>
                    )}
                </Alert.Heading>
            )}
            {children}
        </Alert>
    )
}
