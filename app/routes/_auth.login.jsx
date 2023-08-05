import {
  Link,
  useActionData,
  useNavigation,
  Form as RemixForm,
} from "@remix-run/react";
import * as Yup from "yup";
// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
// Form Inputs
import InputField from "~/components/formInputs/InputField";
// Utils
import validate from "~/utils/validate.server";
import { badRequest } from "~/utils/request.server";
import { login, createUserSession } from "~/utils/session.server";

// Redirect user to home page if logged in
// export async function loader() {
//   console.log("Check for user login...");
// }

// Yup validation Schema
const validationSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^.+?(?:deltafrio.com|gmail.com|outlook.com)$/,
      'Por favor usa tu correo de "@deltafrio.com"'
    )
    .required("Campo obligatorio."),
  pass: Yup.string().required("Campo obligatorio."),
});

export const action = async ({ request }) => {
  const formData = await request.formData();
  const result = await validate(formData, validationSchema);
  // If there are validation errors, return 'result'
  if (result?.status === 400) return result;
  // See if email and pass match
  const user = await login(formData.get("email"), formData.get("pass"));
  if (!user) {
    return badRequest({
      message: "Email o contraseña inválida.",
    });
  }
  // if there is a user, create session and redirect to "/"
  return createUserSession(user.id, "/");
};

export default function Login() {
  const actionData = useActionData();

  const { state } = useNavigation();

  return (
    <>
      <div className="login-form">
        <h2 className="text-center p-2">Iniciar Sesión</h2>
        <RemixForm method="POST">
          {/* Email */}
          <Form.Group className="mb-3">
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              isInvalid={!!actionData?.fieldErrors?.email}
              errorMsg={actionData?.fieldErrors?.email}
            />
            <Form.Text className="text-muted">
              Tu correo "@example.com"
            </Form.Text>
          </Form.Group>
          {/* Password */}
          <Form.Group className="mb-3">
            <InputField
              type="password"
              name="pass"
              placeholder="Contraseña"
              isInvalid={!!actionData?.fieldErrors?.pass}
              errorMsg={actionData?.fieldErrors?.pass}
            />
          </Form.Group>
          {/* Error de inicio de sesión */}
          {actionData?.message && (
            <Alert className="text-center" variant="danger">
              {actionData?.message}
            </Alert>
          )}
          <div className="d-grid">
            <Button
              type="submit"
              name="_action"
              value="login"
              disabled={state === "submitting"}
            >
              {state === "submitting"
                ? "Iniciando sesión..."
                : "Iniciar sesión"}
            </Button>
          </div>
        </RemixForm>
        {/* Link para registro */}
        <br />
        <p className="text-center">
          ¿No tienes cuenta? <Link to="/registro">Registrate aquí.</Link>
        </p>
      </div>
      <p className="text-center">
        <Link to="/solicitar">¿Olvidaste tu contraseña?</Link>
      </p>
    </>
  );
}
