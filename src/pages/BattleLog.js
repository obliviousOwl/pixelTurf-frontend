import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import '../styles/Leaderboard.css'; // Custom CSS for styling

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_STRING}/leaderboard/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLeaderboard(data.leaderboard);
            } catch (error) {
                setError('Failed to fetch leaderboard');
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center loader-container">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="d-flex justify-content-center align-items-center error-container">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    const columns = [
        {
            name: 'Player Name',
            selector: row => row.name,
            sortable: true,
            cell: row => <span className="player-name">{row.name}</span>
        },
        {
            name: 'Score',
            selector: row => row.score,
            sortable: true,
            cell: row => <span className="player-score">{row.score}</span>
        },
    ];

    return (
        <Container fluid className="leaderboard-container py-5 mt-5">
            <Row>
                <Col xs={12} md={8} className="mx-auto">
                    <Card className="leaderboard-card shadow-lg">
                        <Card.Body>
                            <Card.Title className="text-center leaderboard-title">🏆 Leaderboard 🏆</Card.Title>
                            <DataTable
                                columns={columns}
                                data={leaderboard}
                                pagination
                                highlightOnHover
                                striped
                                responsive
                                className="custom-table"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Leaderboard;
