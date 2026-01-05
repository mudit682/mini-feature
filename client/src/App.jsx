import { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/users'

function App() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL)
            setUsers(response.data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching users:', error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <Container className="py-5">
            <Row className="justify-content-center mb-5">
                <Col md={8} className="text-center">
                    <h1 className="display-4 fw-bold text-primary mb-3">Mini Feature</h1>
                    <p className="lead text-muted">A simple Full-Stack application to manage user data.</p>
                </Col>
            </Row>

            <Row className="g-4">
                <Col lg={4}>
                    <Card className="shadow-sm border-0">
                        <Card.Body className="p-4">
                            <h3 className="card-title mb-4">Add New User</h3>
                            <UserForm onUserAdded={fetchUsers} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={8}>
                    <Card className="shadow-sm border-0">
                        <Card.Body className="p-4">
                            <h3 className="card-title mb-4">Submitted Users</h3>
                            <UserList users={users} loading={loading} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default App
