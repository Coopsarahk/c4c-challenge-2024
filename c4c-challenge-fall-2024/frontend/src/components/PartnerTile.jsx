import React from 'react';
import {Button, Card, CardBody, Col, Container, Row} from "react-bootstrap";
import '../App.css';

function PartnerTile({partnerData, onDelete}) {

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:4000/partners/${partnerData.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete partner organization');
            }

            onDelete(partnerData.id);
        } catch (error) {
            console.error('Error deleting partner organization:', error.message);
        }
    };

    const activeStatus = partnerData.active ? 'Currently Active' : 'Not Currently Active'

    return (
        <Container fluid>
            <Row className="justify-content-center mb-0">
                <Col md={12}>
                    <Card className="shadow-0 border rounded-3 mt-4 mb-3" style={{backgroundColor: '#E8DAB2'}}>
                        <CardBody>
                            <Row>
                                <Col md={4}>
                                    <img className="logo__img" src={partnerData.logo} alt="Image Title"/>
                                </Col>
                                <Col md={8}>
                                    <h5>{partnerData.name}</h5>
                                    <div className="mt-1 mb-0 text-muted small">
                                        <span>{activeStatus}</span>
                                    </div>
                                    <p style={{whiteSpace: 'normal', overflowWrap: 'break-word'}}>
                                        {partnerData.description}
                                    </p>
                                </Col>
                            </Row>
                            <hr/>
                            <Row className="justify-content-end">
                                <Col md={'auto'}>
                                    <Button
                                        onClick={handleDelete}
                                        className="delete-button">
                                        {'Delete'}
                                    </Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default PartnerTile;