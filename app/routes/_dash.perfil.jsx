import { useLoaderData } from "@remix-run/react";
// Utils
import { getUserId } from "~/utils/session.server";

export const loader = async ({ request }) => {
  const userId = await getUserId(request);
  return userId;
};

export default function Perfil() {
  const userId = useLoaderData();

  return (
    <>
      <h1>Perfil</h1>
      <p>Add profile info here.</p>
      <p>
        Current logged in user: <b>{userId ? userId : "Not signed in."}</b>
      </p>
    </>
  );
}
