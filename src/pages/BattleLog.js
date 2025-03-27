import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import '../styles/Leaderboard.css'; // We'll add some custom CSS for table styling

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch leaderboard data on component mount
    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch('http://localhost:5000/leaderboard/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLeaderboard(data.leaderboard); // Assuming response has leaderboard data
            } catch (error) {
                setError('Failed to fetch leaderboard');
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    const columns = [
        {
            name: 'Player Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Score',
            selector: row => row.score,
            sortable: true,
        },
    ];

    return (
        <Container fluid className="py-5">
            <Row>
                <Col xs={12} md={8} className="mx-auto">
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center">Leaderboard</Card.Title>
                            <DataTable
                                columns={columns}
                                data={leaderboard}
                                pagination
                                highlightOnHover
                                striped
                                responsive
                                className="custom-table" // Adding custom class for table styling
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Leaderboard;
