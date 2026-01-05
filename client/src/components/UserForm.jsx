import { useState } from 'react'
import { Form, Button, Alert, Spinner } from 'react-bootstrap'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/users'

const UserForm = ({ onUserAdded }) => {
    const [formData, setFormData] = useState({ name: '', email: '' })
    const [status, setStatus] = useState({ type: '', message: '' })
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setStatus({ type: '', message: '' })

        try {
            await axios.post(API_URL, formData)
            setFormData({ name: '', email: '' })
            setStatus({ type: 'success', message: 'User added successfully!' })
            onUserAdded()
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error connecting to server'
            setStatus({ type: 'danger', message: errorMsg })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            {status.message && (
                <Alert variant={status.type} onClose={() => setStatus({ type: '', message: '' })} dismissible>
                    {status.message}
                </Alert>
            )}

            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={submitting}>
                {submitting ? <Spinner animation="border" size="sm" /> : 'Submit'}
            </Button>
        </Form>
    )
}

export default UserForm
