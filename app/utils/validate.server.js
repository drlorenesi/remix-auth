import { badRequest } from "./request.server";

export default async function validate(formData, validationSchema) {
  // Get field values and convert JSON object
  let fields = Object.fromEntries(formData);

  try {
    await validationSchema.validate(fields, { abortEarly: false });
    return { fields, fieldErrors: null, formError: null };
  } catch (error) {
    // Get field errors from validation schema
    let fieldErrors = {};
    error.inner.forEach((error) => {
      if (error.path) {
        fieldErrors[error.path] = error.message;
      }
    });
    return badRequest({
      fields,
      fieldErrors,
      formError: "Form not submitted correctly.",
    });
  }
}
