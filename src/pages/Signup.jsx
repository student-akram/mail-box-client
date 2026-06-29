import { useState } from "react";
import { Card, Button, Form, Container, Alert } from "react-bootstrap";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!email || !password || !confirmPassword) {
            return setError("All fields are required");
        }

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            console.log("User has successfully signed up");
            navigate('/login');
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center vh-100"
        >
            <Card style={{ width: "420px" }} className="p-4 shadow">

                <h2 className="text-center mb-4">
                    Signup
                </h2>

                {error && (
                    <Alert variant="danger">
                        {error}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>

                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>

                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>

                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        className="w-100"
                        disabled={
                            !email ||
                            !password ||
                            !confirmPassword
                        }
                    >
                        Sign Up
                    </Button>

                </Form>

            </Card>
            <div className="text-center mt-3">
                Already have an account?{" "}
                <Link to="/login">
                    Login
                </Link>
            </div>
        </Container>
    );
}

export default Signup;