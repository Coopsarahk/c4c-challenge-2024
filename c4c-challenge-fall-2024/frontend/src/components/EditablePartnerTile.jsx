import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {Button} from 'react-bootstrap';
import {useState, useRef} from 'react';


function EditablePartnerTile({show, handleClose, onSave}) {
    // State to track form fields and validation
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState('');
    const [active, setActive] = useState(false);
    const formRef = useRef(null);


    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/partners', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, description, logo, active}),
            });

            if (!response.ok) {
                throw new Error('Failed to add partner organization');
            }

            if (onSave) {
                onSave();
            }

            resetForm();
            handleClose();
        } catch (error) {
            console.error('Error adding partner organization:', error.message);
        }
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setLogo('');
        setActive(false);
        setValidated(false); // Reset validation state
        if (formRef.current) {
            formRef.current.reset();
        }
    };

    const handleModalClose = () => {
        resetForm();
        handleClose();
    };

    return (
        <Modal
            show={show}
            onHide={handleModalClose}
            centered
            backdrop="static"
            keyboard={false}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Register a new Organization</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form ref={formRef} noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Start typing here..."
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a name.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Start typing here..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLogo">
                        <Form.Label>Logo</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Start typing here..."
                            value={logo}
                            onChange={(e) => setLogo(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formCheckbox">
                        <Form.Check
                            type="checkbox"
                            label="Actively Working with C4C"
                            checked={active}
                            onChange={(e) => setActive(e.target.checked)}
                        />
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" style={{backgroundColor: '#4F6D7A'}}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EditablePartnerTile;
