import {useEffect, useId, useState} from 'react';
import {Col, FormControl, InputGroup, ProgressBar, Row, Stack, ToggleButton} from "react-bootstrap";
import {useAppSelector} from "@/app/configureStore";
import {selectImagesStatus, selectProductMedia} from "@/ducks/media";
import {selectCurrentProduct} from "@/ducks/products";
import {hasPrimaryImage, isImpulse2, isMissingAltText, isValidAll, isValidImpulse7} from "@/ducks/media/utils";
import MediaTypeBadge from "@/ducks/products/components/MediaTypeBadge";

export default function ProductImageStatus() {
    const product = useAppSelector(selectCurrentProduct);
    const images = useAppSelector(selectProductMedia);
    const status = useAppSelector(selectImagesStatus)
    const [primary, setPrimary] = useState<number>(0);
    const [valid, setValid] = useState<number>(0);
    const [invalid, setInvalid] = useState<number>(0);
    const [all, setAll] = useState<number>(0);
    const [missing, setMissing] = useState<number>(0);
    const [video, setVideo] = useState<number>(0);
    const [image, setImage] = useState<number>(0);

    const idPrimary = useId();
    const idValid = useId()
    const idInvalid = useId();
    const idAll = useId();
    const idMissing = useId();

    useEffect(() => {
        setPrimary(images.filter(media => hasPrimaryImage(product?.variants ?? [], media.id)).length);
        setValid(images.filter(media => isValidImpulse7(media.alt)).length);
        setInvalid(images.filter(media => isImpulse2(media.alt)).length);
        setAll(images.filter(media => isValidAll(media.alt)).length);
        setMissing(images.filter(media => isMissingAltText(media.alt)).length);
        setVideo(images.filter(media => media.mediaContentType === 'EXTERNAL_VIDEO').length);
        setImage(images.filter(media => media.mediaContentType === 'IMAGE').length);
    }, [images]);

    return (
        <div>
            <Row className="g-3">
                <Col xs="auto">
                    <Stack direction="horizontal" className="mb-1 align-content-center" gap={3}>
                        <MediaTypeBadge type="EXTERNAL_VIDEO"/>
                        <div>{video}</div>
                    </Stack>

                </Col>
                <Col xs="auto">
                    <Stack direction="horizontal" className="mb-1 align-content-center" gap={3}>
                        <MediaTypeBadge type="IMAGE"/>
                        <div>{image}</div>
                    </Stack>
                </Col>
                <Col>
                    <InputGroup size="sm">
                        <InputGroup.Text>Primary</InputGroup.Text>
                        <FormControl readOnly value={primary} className="text-center"/>
                        <ToggleButton id={idPrimary} variant="outline-primary" type="checkbox"
                                      checked={primary > 0}
                                      value="primary">
                            <span className="bi-key-fill"/>
                        </ToggleButton>
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup size="sm">
                        <InputGroup.Text>Valid</InputGroup.Text>
                        <FormControl readOnly value={valid} className="text-center"/>
                        <ToggleButton id={idValid} variant="outline-success" type="checkbox"
                                      checked={valid > 0}
                                      value="valid">
                            <span className="bi-check"/>
                        </ToggleButton>
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup size="sm">
                        <InputGroup.Text>Invalid</InputGroup.Text>
                        <FormControl readOnly value={invalid} className="text-center"/>
                        <ToggleButton id={idInvalid} variant="outline-danger" type="checkbox"
                                      checked={invalid > 0}
                                      value="invalid">
                            <span className="bi-exclamation-octagon me-1"/>ALL
                        </ToggleButton>
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup size="sm">
                        <InputGroup.Text>All Products</InputGroup.Text>
                        <FormControl readOnly value={all} className="text-center"/>
                        <ToggleButton id={idAll} variant="outline-info" type="checkbox"
                                      checked={all > 0}
                                      value="all">
                            <span className="bi-info-circle-fill me-1"/>ALL
                        </ToggleButton>
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup size="sm">
                        <InputGroup.Text>Missing Alt Text</InputGroup.Text>
                        <FormControl readOnly value={missing} className="text-center"/>
                        <ToggleButton id={idMissing} variant="outline-danger" type="checkbox"
                                      checked={missing > 0}
                                      value="missing">
                            <span className="bi-exclamation-triangle-fill me-1"/>
                        </ToggleButton>
                    </InputGroup>
                </Col>
            </Row>
            {status !== 'idle' && (
                <ProgressBar animated now={100}/>
            )}
        </div>
    )
}
