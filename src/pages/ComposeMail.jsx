import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

function ComposeMail() {
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
    setError("Please fill all the fields.");
    return;
  }

  const senderEmail = localStorage.getItem("email");

  const senderKey = senderEmail.replace(/\./g, ",");
  const receiverKey = to.replace(/\./g, ",");

  const mailData = {
    from: senderEmail,
    to,
    subject,
    message,
    date: new Date().toISOString(),
  };

  try {
    // Receiver Inbox
    await axios.post(
      `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/mailbox/inbox/${receiverKey}.json`,
      mailData
    );

    // Sender Sent
    await axios.post(
      `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/mailbox/sent/${senderKey}.json`,
      mailData
    );

    console.log("Mail Sent Successfully");

    setSuccess("Mail Sent Successfully");

    setTo("");
    setSubject("");
    setMessage("");

  } catch (err) {
    console.log(err);

    setError("Failed to send mail.");
  }
};

  return (
    <Container className="mt-5">
      <Card className="shadow p-4">
        <h2 className="text-center mb-4">Compose Mail</h2>

        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={sendMailHandler}>
          <Form.Group className="mb-3">
            <Form.Label>To</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter recipient email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={!to || !subject || !message}
          >
            Send
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default ComposeMail;