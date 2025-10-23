import {Badge, Card, ListGroup, Stack} from "react-bootstrap";

export default function BestPractices() {
    return (
        <Card className="mb-3">
            <Card.Header>
                <Card.Title className="text-center">Best Practices</Card.Title>
            </Card.Header>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>
                    <h3>Links</h3>
                    <div className="mb-3">Use the <strong className="text-primary">Link To Page</strong> to view the
                        page on Chums.com;
                    </div>
                    <div className="ms-5 mb-3 text-secondary fst-italic">On Shopify, use the <strong>Preview
                        Theme</strong> link to view in an upcoming theme.
                    </div>
                    <div className="mb-3">Use the <strong className="text-primary">Link To Admin</strong> to view the
                        change the
                        image sorting on Chums.com;
                    </div>
                    <div className="ms-5 mb-3 text-danger fst-italic">Shopify does not include the sorted method when
                        requesting from the database, so this tool is unable to sort the images as they would be on
                        the website.
                    </div>
                    <div className="ms-5 mb-3 text-danger fst-italic">Images should be sorted on the Product Admin page with all the
                        SKU specific products are before the generic/lifestyle images. This will help to ensure one
                        of the lifestyle images does not get selected by default when choosing a product variant.
                    </div>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Stack direction="horizontal" gap={3}>
                        <h3>Download / Upload Buttons</h3>
                        <div>
                            Download <span className="bi-cloud-download ms-1"/>
                            <span className="mx-3">/</span>
                            Upload <span className="bi-cloud-upload ms-1"/>
                        </div>
                    </Stack>
                    <div className="mb-3">
                        The Products / Collections / Media download buttons can retrieve the latest data from Shopify.
                    </div>
                    <div className="mb-3">The Upload buttons will push saved changes to Shopify.
                    </div>
                    <div className="mb-3 text-secondary fst-italic">
                        The <strong>Set Alt (x)</strong> button can be used to pre-populate the standard alt text.
                        Each image should still be checked for proper alt text formatting.
                    </div>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h3>Extra Images &amp; Impulse Theme 7.5+</h3>
                    <div className="mb-3">
                        Any images that are not assigned a <span className="fw-bolder text-secondary mx-1">#set-name_group-name</span>
                        alt text will show on all variants. They will have a
                        <Badge bg="danger" className="fs-6 mx-3">ALL<span className="bi-exclamation-octagon ms-1"/></Badge> or
                        <Badge bg="info" className="fs-6 mx-3">ALL</Badge>
                        icon.
                    </div>
                    <div className="mb-3">
                        Valid Images for products with multiple variants will have a <Badge bg="success" className="fs-6 mx-3"><span className="bi-check text-light" /></Badge>
                        icon.
                    </div>
                    <div className="mb-3">
                        The primary image for a variant will have a <Badge bg="primary" className="fs-6 mx-3"><span className="bi-key-fill text-light"/></Badge>
                        icon.
                    </div>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h3>Alt Text Formatting</h3>
                    <div className="mb-3">
                        <h4>Impulse Theme 2.1</h4>
                        Impulse Theme 2.1 requires image alt text to start with <strong># + variant sku</strong> or
                        <strong>sku: + variant sku</strong> to be filtered for the selected SKU.
                        <div>
                            Examples:
                            <div className="text-danger fst-italic">#12312257 Baja Urban Blue Plaid</div>
                            <div className="text-success fst-italic">sku:12312257 Baja Urban Blue Plaid</div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <h4>Impulse Theme 7.5+</h4>
                        Impulse Theme 7.5+ requires the image alt text to end with <strong># + variant option
                        name + _ + variant option value</strong>, and removes that part of the alt text from the
                        image (everything after the <strong>#</strong>)
                        <div>
                            Examples:
                            <div className="text-success fst-italic">sku:12312257 Baja Urban Blue Plaid
                                #color_blue-plaid</div>
                            <div>The resulting alt tag will be: <span className="fst-italic text-info">sku:12312257 Baja Urban Blue Plaid</span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        Proper alt text should (at least until the migration to Impulse 7.5+) be the following format to
                        work with the current theme and the development theme:
                        <div className="text-success fst-italic">sku:12312257 Baja Urban Blue Plaid
                            #color_blue-plaid</div>
                    </div>
                    <div className="mb-3">
                        Alt text should also describe the image so that visually impaired people can still get a
                        description
                        of the image for screen readers.
                        <figure className="m-3 p-3 ">
                            <blockquote className="blockquote text-info">
                                When an image contains words that are important to understanding the content, the alt
                                text should include those words. This will allow the alt text to play the same function
                                on the page as the image. Note that it does not necessarily describe the visual
                                characteristics of the image itself but must convey the same meaning as the image.
                            </blockquote>
                            <figcaption>
                                <a href="https://www.w3.org/TR/WCAG20-TECHS/H37.html" target="_blank" rel="noreferrer">
                                    W3.org - Using alt attributes on img elements
                                </a>
                            </figcaption>
                        </figure>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    )
}
