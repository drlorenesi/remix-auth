import {
  Link,
  useActionData,
  useNavigation,
  Form as RemixForm,
} from "@remix-run/react";
import { redirect } from "@remix-run/node";
import * as Yup from "yup";
// Bootstrap
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
// Form Inputs

// Utils
import validate from "~/utils/validate.server";
// Models
import { addPost } from "~/models/posts.server.js";

// Yup validation Schema
const validationSchema = Yup.object({
  title: Yup.string()
    .min(2, "The title must be over 2 characters")
    .max(40, "The title cannot be over 40 characters")
    .nullable(),
  body: Yup.string()
    .min(2, "The body must be over 2 characters")
    .max(20, "The body cant be over 20 characters")
    .nullable(),
});

export const action = async ({ request }) => {
  const formData = await request.formData();
  const result = await validate(formData, validationSchema);
  // If there are validation errors, return 'result'
  if (result?.status === 400) return result;
  // Add post to DB
  const { title, body } = result.fields;
  await addPost(title, body);
  return redirect("/posts");
  // Alternative redirect
  // const { rows } = await addPost(title, body);
  // return redirect(`/posts/${rows.insertId}`);
};

export default function NewPost() {
  const actionData = useActionData();
  const { state } = useNavigation();
  let submitting = state === "submitting";

  return (
    <>
      <div className="page-header">
        <h2>New Post</h2>
        <Link to="/posts" title="Remix Jokes">
          <Button variant="outline-primary">Back</Button>
        </Link>
      </div>

      <Row>
        <Col lg={6} md={6} sm={6}>
          <RemixForm method="POST">
            {/* Title */}
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Your title..."
                defaultValue={actionData?.fields?.title}
                isInvalid={!!actionData?.fieldErrors?.title}
              />
              <Form.Control.Feedback type="invalid">
                {actionData?.fieldErrors?.title}
              </Form.Control.Feedback>
            </Form.Group>
            {/* Body */}
            <Form.Group className="mb-3">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                name="body"
                placeholder="Write something..."
                defaultValue={actionData?.fields?.body}
                isInvalid={!!actionData?.fieldErrors?.body}
              />
              <Form.Control.Feedback type="invalid">
                {actionData?.fieldErrors?.body}
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Posting..." : "Add Post"}
            </Button>
          </RemixForm>
        </Col>
      </Row>
    </>
  );
}
