import { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sendMail } from "../services/mailService";
import { mailActions } from "../redux/slices/mailSlice";

function ComposeMail() {
  const senderEmail = useSelector(
    (state) => state.auth.email
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const sendMailHandler = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (!to || !subject || !message) {
      setError("Please fill all fields");
      return;
    }

    const mailData = {
      from: senderEmail,
      to,
      subject,
      message,
      date: new Date().toISOString(),
      read: false,
    };

    try {
      await sendMail(mailData);

      dispatch(mailActions.addSentMail(mailData));

      setSuccess("Mail Sent Successfully");

      setTo("");
      setSubject("");
      setMessage("");

      setTimeout(() => {
        navigate("/inbox");
      }, 1000);

    } catch (err) {
      console.log(err);
      setError("Failed to Send Mail");
    }
  };

  return (
    <Container className="mt-5">

      <Card className="shadow p-4">

        <h2 className="mb-4">
          Compose Mail
        </h2>

        {success && (
          <Alert variant="success">
            {success}
          </Alert>
        )}

        {error && (
          <Alert variant="danger">
            {error}
          </Alert>
        )}

        <Form onSubmit={sendMailHandler}>

          <Form.Group className="mb-3">

            <Form.Label>To</Form.Label>

            <Form.Control
              type="email"
              value={to}
              placeholder="Enter Receiver Email"
              onChange={(e) =>
                setTo(e.target.value)
              }
            />

          </Form.Group>

          <Form.Group className="mb-3">

            <Form.Label>Subject</Form.Label>

            <Form.Control
              type="text"
              value={subject}
              placeholder="Enter Subject"
              onChange={(e) =>
                setSubject(e.target.value)
              }
            />

          </Form.Group>

          <Form.Group className="mb-3">

            <Form.Label>Message</Form.Label>

            <Form.Control
              as="textarea"
              rows={10}
              value={message}
              placeholder="Write your message..."
              onChange={(e) =>
                setMessage(e.target.value)
              }
            />

          </Form.Group>

          <Button type="submit">
            Send
          </Button>

        </Form>

      </Card>

    </Container>
  );
}

export default ComposeMail;