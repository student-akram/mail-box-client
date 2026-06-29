import { useEffect } from "react";
import {
    Container,
    Card,
    Table,
    Button,
    Badge,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getInboxMails } from "../services/mailService";
import { mailActions } from "../redux/slices/mailSlice";
import { deleteMail } from "../services/mailService";

function Inbox() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const email = useSelector(
        (state) => state.auth.email
    );

    const inbox = useSelector(
        (state) => state.mail.inbox
    );

    const unreadCount = useSelector(
        (state) => state.mail.unreadCount
    );

    useEffect(() => {
        fetchInbox();
    }, []);

    const fetchInbox = async () => {
        try {
            const mails = await getInboxMails(email);

            dispatch(mailActions.setInbox(mails));

        } catch (err) {
            console.log(err);
        }
    };
    const deleteHandler = async (mailId) => {
        try {
            await deleteMail(email, mailId);

            dispatch(mailActions.deleteMail(mailId));

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container className="mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>
                    Inbox{" "}
                    <Badge bg="primary">
                        {unreadCount}
                    </Badge>
                </h2>

                <Button
                    onClick={() => navigate("/compose")}
                >
                    Compose
                </Button>

            </div>

            <Card className="shadow">

                <Table hover>

                    <thead>

                        <tr>

                            <th>Status</th>

                            <th>From</th>

                            <th>Subject</th>

                            <th>Date</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {inbox.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="4"
                                    className="text-center"
                                >
                                    No Mails
                                </td>

                            </tr>

                        ) : (

                            inbox.map((mail) => (

                                <tr
                                    key={mail.id}
                                    style={{
                                        cursor: "pointer",
                                    }}

                                >

                                    <td>

                                        {!mail.read ? (
                                            <span
                                                style={{
                                                    color: "blue",
                                                    fontSize: "22px",
                                                }}
                                            >
                                                ●
                                            </span>
                                        ) : (
                                            ""
                                        )}

                                    </td>

                                    <td>
                                        {mail.from}
                                    </td>

                                    <td
                                        onClick={() =>
                                            navigate(`/mail/${mail.id}`)
                                        }
                                    >

                                        {mail.subject}

                                    </td>

                                    <td>
                                        {new Date(
                                            mail.date
                                        ).toLocaleString()}
                                    </td>
                                    <td>

                                        <Button
                                            variant="danger"
                                            size="sm"

                                            onClick={() =>

                                                deleteHandler(mail.id)

                                            }

                                        >

                                            Delete

                                        </Button>

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