import { query, execute } from "~/utils/db.server";
import { badRequest, created } from "~/utils/request.server.js";
import { genSalt, hash, compare } from "bcryptjs";

export async function getUserByEmail({ email }) {
  const { rows: user } = await query(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  return user[0];
}

export async function getUserById(id) {
  const { rows: user } = await query(`SELECT * FROM users WHERE id = '${id}'`);
  return user[0];
}

export async function registerUser({ nombre, apellido, email, pass }) {
  // A. Buscar si email ya esta registrado
  const result = await execute("SELECT * FROM users WHERE email = ?", [email]);
  if (result.rows[0])
    return badRequest({ message: "Por favor usa otro email." });
  // B. Registrar a usuario
  // const salt = await genSalt(10);
  // const hashedPass = await hash(pass, salt);
  // await query(
  //   `INSERT INTO
  //     users (nombre, apellido, email, pass)
  //   VALUES
  //     ('${nombre}', '${apellido}', '${email}', '${hashedPass}')`
  // );

  return created({ message: "Usuario registrado!" });
}

export async function loginUser(email, pass) {
  // A. Buscar a usuario
  const { rows: user } = await query(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  if (!user[0]) return null;
  // B. Comparar pass vrs. la guardada en DB
  const concuerda = await compare(pass, user[0].pass);
  if (!concuerda) return null;

  return user[0];
}
