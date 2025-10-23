import {Button, type ButtonProps} from "react-bootstrap";

export default function DangerMediaButton({children, ...props}: ButtonProps) {
    return (
        <Button {...props} variant="danger" size="sm">
            {children}
            <span className="bi-exclamation-octagon ms-2"/>
        </Button>
    )
}
