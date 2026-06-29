import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Inbox() {
  const [mails, setMails] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMails();
  }, []);

  const fetchMails = async () => {
    try {
      const email = localStorage.getItem("email");

      const userKey = email.replace(/\./g, ",");

      const response = await axios.get(
        `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/mailbox/inbox/${userKey}.json`
      );

      const data = response.data;

      if (!data) {
        setMails([]);
        return;
      }

      const loadedMails = [];

      for (const key in data) {
        loadedMails.push({
          id: key,
          ...data[key],
        });
      }

      setMails(loadedMails);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="mt-5">

      <div className="d-flex justify-content-between mb-4">

        <h2>Inbox</h2>

        <Button
          onClick={() => navigate("/compose")}
        >
          Compose
        </Button>

      </div>

      <Card className="shadow">

        <Table striped hover>

          <thead>

            <tr>

              <th>From</th>

              <th>Subject</th>

              <th>Date</th>

            </tr>

          </thead>

          <tbody>

            {mails.length === 0 ? (

              <tr>

                <td colSpan="3" className="text-center">
                  No Mails Found
                </td>

              </tr>

            ) : (

              mails.map((mail) => (

                <tr key={mail.id}>

                  <td>{mail.from}</td>

                  <td>{mail.subject}</td>

                  <td>
                    {new Date(mail.date).toLocaleString()}
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

export default Inbox;