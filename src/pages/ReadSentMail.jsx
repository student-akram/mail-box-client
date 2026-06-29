import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getSingleSentMail } from "../services/mailService";

function ReadSentMail() {
  const { id } = useParams();

  const email = useSelector(
    (state) => state.auth.email
  );

  const [mail, setMail] = useState(null);

  useEffect(() => {
    fetchMail();
  }, []);

  const fetchMail = async () => {
    const data = await getSingleSentMail(
      email,
      id
    );

    setMail(data);
  };

  if (!mail) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <Container className="mt-5">

      <Card className="shadow p-4">

        <h3>{mail.subject}</h3>

        <hr />

        <p>
          <strong>To : </strong>
          {mail.to}
        </p>

        <p>
          <strong>From : </strong>
          {mail.from}
        </p>

        <p>
          <strong>Date : </strong>
          {new Date(
            mail.date
          ).toLocaleString()}
        </p>

        <hr />

        <h5>Message</h5>

        <p style={{ whiteSpace: "pre-wrap" }}>
          {mail.message}
        </p>

      </Card>

    </Container>
  );
}

export default ReadSentMail;