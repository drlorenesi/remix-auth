import {
  Link,
  useActionData,
  useNavigation,
  Form as RemixForm,
} from "@remix-run/react";
// import { redirect } from '@remix-run/node';
import * as Yup from "yup";
// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// Models
import { registerUser } from "~/models/users.server.js";
// Utils
import validate from "~/utils/validate.server";

const validationSchema = Yup.object({
  nombre: Yup.string()
    .min(2, "Su nombre debe contener almenos 2 caracteres.")
    .required("Campo obligatorio."),
  apellido: Yup.string()
    .min(2, "Su apellido debe contener almenos 2 caracteres.")
    .required("Campo obligatorio."),
  email: Yup.string()
    .matches(
      /^.+?(?:deltafrio.com|gmail.com|outlook.com)$/,
      'Por favor usa tu correo de "@deltafrio.com"'
    )
    .required("Campo obligatorio."),
  pass: Yup.string()
    .min(4, "Contraseña no puede ser menor a 4 caracteres.")
    .required("Campo obligatorio."),
  confirmPass: Yup.string()
    .required("Por favor confirma tu contraseña.")
    .oneOf([Yup.ref("pass"), null], "Las contraseñas no concuerdan."),
});

export const action = async ({ request }) => {
  const formData = await request.formData();
  const result = await validate(formData, validationSchema);
  // If there are validation errors, return 'result'
  if (result?.status === 400) return result;
  // Get field data
  const { nombre, apellido, email, pass } = result.fields;
  // Register user
  const register = await registerUser({ nombre, apellido, email, pass });

  if (register?.status === 400) return register;
  // Redirect to success page
  return null;
};

export default function Login() {
  const actionData = useActionData();
  const { state } = useNavigation();
  let submitting = state === "submitting";

  return (
    <>
      <div className="login-form">
        <h2 className="text-center p-2">Regístrate</h2>
        <RemixForm method="post">
          {/* Nombre */}
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Nombre"
              defaultValue={actionData?.fields?.nombre}
              isInvalid={!!actionData?.fieldErrors?.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {actionData?.fieldErrors?.nombre}
            </Form.Control.Feedback>
          </Form.Group>
          {/* Apellido */}
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              name="apellido"
              placeholder="Apellido"
              defaultValue={actionData?.fields?.apellido}
              isInvalid={!!actionData?.fieldErrors?.apellido}
            />
            <Form.Control.Feedback type="invalid">
              {actionData?.fieldErrors?.apellido}
            </Form.Control.Feedback>
          </Form.Group>
          {/* Email */}
          <Form.Group className="mb-2">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              defaultValue={actionData?.fields?.email}
              isInvalid={!!actionData?.fieldErrors?.email}
            />
            <Form.Text className="text-muted">
              Tu correo "@example.com"
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {actionData?.fieldErrors?.email}
            </Form.Control.Feedback>
          </Form.Group>
          {/* Pass */}
          <Form.Group className="mb-2">
            <Form.Control
              type="password"
              name="pass"
              placeholder="Contraseña"
              defaultValue={actionData?.fields?.pass}
              isInvalid={!!actionData?.fieldErrors?.pass}
            />
            <Form.Control.Feedback type="invalid">
              {actionData?.fieldErrors?.pass}
            </Form.Control.Feedback>
          </Form.Group>
          {/* Confirm Pass */}
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="confirmPass"
              placeholder="Confirma tu contraseña"
              defaultValue={actionData?.fields?.confirmPass}
              isInvalid={!!actionData?.fieldErrors?.confirmPass}
            />
            <Form.Control.Feedback type="invalid">
              {actionData?.fieldErrors?.confirmPass}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-grid">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Creando cuenta.." : "Crear cuenta"}
            </Button>
          </div>
        </RemixForm>
      </div>
      {/* Link para inicio de sesión */}
      <p className="text-center">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí.</Link>
      </p>
    </>
  );
}
