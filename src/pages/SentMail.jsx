import { useEffect } from "react";
import {
  Container,
  Card,
  Table,
  Button,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getSentMails } from "../services/mailService";
import { mailActions } from "../redux/slices/mailSlice";

function SentMail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useSelector((state) => state.auth.email);

  const sent = useSelector((state) => state.mail.sent);

  useEffect(() => {
    fetchSent();
  }, []);

  const fetchSent = async () => {
    try {
      const mails = await getSentMails(email);

      dispatch(mailActions.setSent(mails));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="mt-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Sent Mail</h2>

        <Button onClick={() => navigate("/compose")}>
          Compose
        </Button>

      </div>

      <Card className="shadow">

        <Table hover>

          <thead>

            <tr>

              <th>To</th>

              <th>Subject</th>

              <th>Date</th>

            </tr>

          </thead>

          <tbody>

            {sent.length === 0 ? (
              <tr>

                <td
                  colSpan="3"
                  className="text-center"
                >
                  No Sent Mails
                </td>

              </tr>
            ) : (
              sent.map((mail) => (
                <tr key={mail.id}>

                  <td>{mail.to}</td>

                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(`/sent/${mail.id}`)
                    }
                  >
                    {mail.subject}
                  </td>

                  <td>
                    {new Date(
                      mail.date
                    ).toLocaleString()}
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </Table>

      </Card>

    </Container>
  );
}

export default SentMail;