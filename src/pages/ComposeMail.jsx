import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

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

    // This is where we'll send data to Firebase in the next step.
    const mailData = {
      to,
      subject,
      message,
    };

    console.log("Mail Data:", mailData);

    setSuccess("Mail is ready to send!");

    // Clear form
    setTo("");
    setSubject("");
    setMessage("");
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