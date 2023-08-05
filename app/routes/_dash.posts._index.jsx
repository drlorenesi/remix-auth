import { Link, useLoaderData } from "@remix-run/react";
// Bootstrap
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Models
import { getPosts } from "~/models/posts.server";

export const meta = () => {
  return [{ title: "Posts!" }];
};

export const loader = async () => {
  return await getPosts();
};

export default function Posts() {
  const data = useLoaderData();

  return (
    <>
      <div className="page-header">
        <h2>Posts</h2>
        <Link to="/posts/new">
          <Button variant="outline-primary">New Post</Button>
        </Link>
      </div>
      <Row>
        <Col lg={6} md={6} sm={6}>
          <ListGroup>
            {data.rows.map((post) => (
              <ListGroup.Item
                key={post.id}
                action
                as={Link}
                to={`/posts/${post.id}`}
              >
                <div>
                  <div className="fw-bold">{post.title}</div>
                  <small>{new Date(post.created_at).toLocaleString()}</small>
                  <br />
                  {post.body}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}
