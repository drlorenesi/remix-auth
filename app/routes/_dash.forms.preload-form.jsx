import {
  useActionData,
  useNavigation,
  Form as RemixForm,
} from "@remix-run/react";
import * as Yup from "yup";
// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// Form Inputs
import InputField from "~/components/formInputs/InputField";
import DateField from "~/components/formInputs/DateField";
// Utils
import validate from "~/utils/validate.server";

// Yup validation Schema
const validationSchema = Yup.object({
  // email: Yup.string()
  //   .matches(
  //     /^.+?(?:deltafrio.com|gmail.com|outlook.com)$/,
  //     'Por favor usa tu correo de "@deltafrio.com"'
  //   )
  //   .required("Campo obligatorio."),
  date: Yup.date()
    .typeError("Por favor ingresar una fecha válida.")
    .required("Campo obligatorio")
    .nullable(),
  // fechaIni: Yup.date().required("Campo obligatorio").nullable(),
  // fechaFin: Yup.date().required("Campo obligatorio").nullable(),
});

export const action = async ({ request }) => {
  const formData = await request.formData();
  const result = await validate(formData, validationSchema);
  return result;
};

export default function PreloadForm() {
  const actionData = useActionData();
  console.log(actionData);
  const { state } = useNavigation();

  return (
    <>
      <Row>
        <Col lg={6} md={6} sm={6}>
          <h2>Preloaded Form</h2>
          <RemixForm method="post">
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
            {/* Date */}
            <Form.Group className="mb-3">
              <DateField
                name="date"
                // defaultValue={new Date()}
                isInvalid={!!actionData?.fieldErrors?.date}
                errorMsg={actionData?.fieldErrors?.date}
              />
            </Form.Group>
            <Button
              type="submit"
              name="_action"
              value="submit"
              disabled={state === "submitting"}
            >
              {state === "submitting" ? "Submitting..." : "Submit"}
            </Button>
          </RemixForm>
        </Col>
      </Row>
    </>
  );
}
