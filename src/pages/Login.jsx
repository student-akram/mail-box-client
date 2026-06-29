import { useState } from "react";
import {
  Card,
  Button,
  Form,
  Container,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      // Login user
      const response = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get Firebase ID Token
      const token = await response.user.getIdToken();

      // Get logged-in user's email
      const userEmail = response.user.email;

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("email", userEmail);

      console.log("Login Successful");
      console.log("Token:", token);
      console.log("Email:", userEmail);

      navigate("/welcome");
    } catch (err) {
      console.error(err);

      alert("Invalid Email or Password");
      setError("Invalid Email or Password");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow" style={{ width: "420px" }}>
        <h2 className="text-center mb-4">Login</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={submitHandler}>
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

          <Button
            type="submit"
            className="w-100"
            disabled={!email || !password}
          >
            Login
          </Button>
        </Form>

        <div className="text-center mt-3">
          New User? <Link to="/">Signup</Link>
        </div>
      </Card>
    </Container>
  );
}

export default Login;