import { useEffect, useState } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  getSingleMail,
  markMailAsRead,
} from "../services/mailService";

import { mailActions } from "../redux/slices/mailSlice";

function ReadMail() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const email = useSelector(
    (state) => state.auth.email
  );

  const [mail, setMail] = useState(null);

  useEffect(() => {
    fetchMail();
  }, []);

  const fetchMail = async () => {
    try {
      const data = await getSingleMail(email, id);

      setMail(data);

      if (data && !data.read) {
        await markMailAsRead(email, id);

        dispatch(mailActions.markAsRead(id));
      }

    } catch (err) {
      console.log(err);
    }
  };

  if (!mail) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-5">

      <Card className="shadow p-4">

        <h3>{mail.subject}</h3>

        <hr />

        <p>

          <strong>From : </strong>

          {mail.from}

        </p>

        <p>

          <strong>To : </strong>

          {mail.to}

        </p>

        <p>

          <strong>Date : </strong>

          {new Date(mail.date).toLocaleString()}

        </p>

        <hr />

        <h5>Message</h5>

        <p
          style={{
            whiteSpace: "pre-wrap",
          }}
        >
          {mail.message}
        </p>

      </Card>

    </Container>
  );
}

export default ReadMail;