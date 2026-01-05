import { Table, Spinner, Badge } from 'react-bootstrap'

const UserList = ({ users, loading }) => {
    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted">Loading users...</p>
            </div>
        )
    }

    if (users.length === 0) {
        return (
            <div className="text-center py-5">
                <p className="text-muted">No users found. Be the first to join!</p>
            </div>
        )
    }

    return (
        <div className="table-responsive">
            <Table hover className="align-middle">
                <thead className="table-light">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Joined</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td className="fw-semibold">{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Badge bg="info" text="dark">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </Badge>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default UserList
