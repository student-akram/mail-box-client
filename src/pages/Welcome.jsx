import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Welcome() {

    const navigate = useNavigate();

    return (

        <Container className="text-center mt-5">

            <h2>Welcome to your Mail Box</h2>

            <Button
                className="mt-4"
                onClick={() => navigate("/compose")}
            >
                Compose Mail
            </Button>

        </Container>

    );
}

export default Welcome;