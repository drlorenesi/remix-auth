import { query, execute } from "~/utils/db.server";

export async function getPosts() {
  const result = await query("SELECT * FROM posts");
  return result;
}

export async function getPost(id) {
  const result = await execute("SELECT * FROM posts WHERE id = ?", [id]);
  return result;
}

export async function addPost(title, body) {
  const result = await execute(
    "INSERT INTO posts (title, body) VALUES (?, ?)",
    [title, body]
  );
  return result;
}

export async function deletePost(id) {
  const result = await execute("DELETE FROM posts WHERE id = ?", [id]);
  return result;
}
