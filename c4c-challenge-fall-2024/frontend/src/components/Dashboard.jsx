import {useState, useEffect} from 'react';
import PartnerTile from './PartnerTile';
import {Button, Col, Container, Row} from "react-bootstrap";
import EditablePartnerTile from './EditablePartnerTile';
import '../App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
function Dashboard() {

    const [partners, setPartners] = useState({});
    const [showAddOrgPopup, setShowAddOrgPopup] = useState(false);

    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = () => {
        fetch('http://localhost:4000', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched partners data:", data);
                setPartners(data);
            })
            .catch((err) => console.error("Error fetching partners:", err));
    };

    const handleDeletePartner = (id) => {
        setPartners(partners.filter(partner => partner.id !== id));
    };

    return (
        <Container>
            <Row>
                <Col style={{justifyContent: 'center', alignContent: 'center'}}>
                    <Button
                        onClick={() => setShowAddOrgPopup(!showAddOrgPopup)}
                        className="add-button"
                    >
                        <i className="bi bi-plus" style={{marginRight: '5px'}}></i>
                        {'Add New Org'}
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    {Object.entries(partners).map(([key, partner]) => (
                        <PartnerTile key={key} partnerData={partner} onDelete={handleDeletePartner}/>
                    ))}
                </Col>
            </Row>
            <EditablePartnerTile
                show={showAddOrgPopup}
                handleClose={() => setShowAddOrgPopup(false)}
                onSave={fetchPartners}
            />
        </Container>
    )
}

export default Dashboard;