import { redirect } from "@remix-run/node";
import {
  Link,
  Form as RemixForm,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
// Bootstrap
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Models
import { getPost, deletePost } from "~/models/posts.server";

export const loader = async ({ params }) => {
  const result = await getPost(params.postId);

  if (result === undefined)
    throw new Response("El recurso que buscas no existe.", {
      status: 404,
    });

  return result.rows[0];
};

export const action = async ({ params, request }) => {
  const formData = await request.formData();
  if (formData.get("_action") !== "delete") {
    throw new Response(`La acción '${formData.get("intent")}' no es válida`, {
      status: 400,
    });
  }

  const post = await getPost(params.postId);
  if (!post) {
    throw new Response("El recurso a eliminar no existe.", {
      status: 404,
    });
  }
  await deletePost(params.postId);

  return redirect("/posts");
};

export default function Post() {
  const post = useLoaderData();
  const { state } = useNavigation();
  let submitting = state === "submitting";

  return (
    <>
      <div className="page-header">
        <h2>Post {post.id}</h2>
        <Link to="/posts">
          <Button variant="outline-primary">Back</Button>
        </Link>
      </div>
      <Row>
        <Col lg={6} md={6} sm={6}>
          <p>
            <b>Title:</b> {post.title}
          </p>
          <p>
            <b>Body:</b> {post.body}
          </p>
          <hr />
          {/* Delete Button */}
          <RemixForm method="post">
            <Button
              type="submit"
              name="_action"
              value="delete"
              variant="danger"
              disabled={submitting}
            >
              {submitting ? "Deleting..." : "Delete"}
            </Button>
          </RemixForm>
        </Col>
      </Row>
    </>
  );
}
