import { TextField, Button, Container, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./contact.module.css";

const ContactUsForm = () => {
  const axiosPrivate = useAxiosPrivate();
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    message: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      // Disable the submit button during the request
      setSubmitting(true);

      // Make an Axios POST request to your Spring Boot backend
      const response = await axiosPrivate.post("/contact", {
        email: values.email,
        subject: `Inquiry from user: ${values.name}`,
        message: values.message,
      });

      if (response.status === 200) {
        console.log("Email sent successfully");
      } else {
        console.error("Email sending failed:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    } finally {
      resetForm();
      setSubmitting(false);
    }
  };

  return (
    <Container className={styles.contactFormContainer}>
      <br />
      <Typography variant="h3" align="left" className={styles.contactFormTitle}>
        We are here for you.
        <br /> Send us an email!
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        className={styles.contactForm}
      >
        {({ isSubmitting }) => (
          <Form>
            <div style={{ marginTop: "15px", marginBottom: "15px" }}>
              <Field as={TextField} label="Name" name="name" variant="filled" />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.formError}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <Field
                as={TextField}
                label="Email"
                name="email"
                variant="filled"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.formError}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <Field
                as={TextField}
                label="Message"
                name="message"
                variant="filled"
                multiline
                rows={5}
                fullWidth
              />
              <ErrorMessage
                name="message"
                component="div"
                className={styles.formError}
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ width: "250px", marginTop: "25px" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Send"}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ContactUsForm;
