import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Scheduling = () => {
  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="name@example.com" />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Scheduling;
