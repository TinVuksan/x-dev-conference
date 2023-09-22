import { useState } from "react";
import { Container, Form, Col, Row, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosConfig from "../../API/axiosConfig";
import Select from "react-select";
import countryList from "react-select-country-list";
import { countryValues } from "../../data/countryValueOverride";
import Dropzone from "react-dropzone";
import styles from "./styles.module.css";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/auth/register";

function generateCountryOptions(countryValues) {
  return countryValues.map((country) => {
    const label = Object.keys(country)[0];
    const value = country[label];
    return { label, value };
  });
}

const Signup = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const countryOptions = generateCountryOptions(countryValues);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    country: {
      label: "",
      value: "",
    },
    image: null,
    dateOfBirth: null,
    previewImage: null,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(
        PWD_REGEX,
        "Password must be 8 to 24 characters and contain uppercase, lowercase, number, and special character"
      )
      .required("Password is required"),
    phone: Yup.string()
      .matches(/^\d{12}$/, "Phone number must be 12 digits")
      .required("Phone number is required"),
    gender: Yup.string().required("Gender is required"),
    country: Yup.mixed().required("Country is required"),
    image: Yup.mixed().required("Image is required"),
    dateOfBirth: Yup.date().nullable().required("Date of Birth is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("phone", values.phone);
      formData.append("gender", values.gender);
      formData.append("countryLabel", values.country.label);
      formData.append("countryValue", values.country.value);
      formData.append("image", values.image);
      formData.append("dateOfBirth", values.dateOfBirth);
      console.log(formData);

      const response = await axiosConfig.post(REGISTER_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log(formData);
      console.log(response);
      setSuccess(true);
      navigate("/");
    } catch (err) {
      console.log(values.image);
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email already taken");
      } else {
        setErrMsg("Registration failed");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Container
        className="login-signup d-flex flex-column min-vh-100 justify-content-center align-items-center"
        fluid
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleSubmit, isSubmitting, setFieldValue }) => (
            <Form className={styles.signupForm} onSubmit={handleSubmit}>
              <p
                style={{ color: "white" }}
                className={errMsg ? "errmsg" : "offscreen"}
              >
                {errMsg}
              </p>
              <h2 className="mb-3" style={{ color: "white" }}>
                Sign up
              </h2>
              <Row>
                <Col xs="auto" className="mb-3">
                  <Form.Label style={{ color: "white" }}>First Name</Form.Label>
                  <Field
                    type="text"
                    id="firstName"
                    placeholder="Your first name"
                    name="firstName"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-danger"
                  />
                </Col>
                <Col>
                  <Form.Label style={{ color: "white" }}>Last name</Form.Label>
                  <Field
                    type="text"
                    id="lastName"
                    placeholder="Your last name"
                    name="lastName"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-danger"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs="auto" className="mb-3">
                  <Form.Label style={{ color: "white" }}>Email</Form.Label>
                  <Field
                    type="text"
                    id="email"
                    placeholder="Enter your email"
                    name="email"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </Col>
                <Col>
                  <Form.Label htmlFor="password" style={{ color: "white" }}>
                    Password
                    <span className={values.validPassword ? "valid" : "hide"}>
                      {"\n"}
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={
                        values.validPassword || !values.password
                          ? "hide"
                          : "invalid"
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </Form.Label>
                  <Field
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    name="password"
                    className="form-control"
                  />
                  <div
                    style={{
                      whiteSpace: "pre-line",
                      color: "white",
                    }}
                  >
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <p
                    id="pwdnote"
                    className={
                      values.passwordFocus && !values.validPassword
                        ? "instructions"
                        : "offscreen"
                    }
                    style={{ color: "white" }}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} /> {"\n"}8 to 24
                    characters. Must include uppercase and lowercase letters, a
                    number and a special character. Allowed special characters:
                    ! @ # $ %
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs="auto" className="mb-3">
                  <div className={styles.datePicker}>
                    <Form.Label style={{ color: "white" }}>
                      Date of Birth
                    </Form.Label>
                    <DatePicker
                      selected={values.dateOfBirth}
                      onChange={(date) => setFieldValue("dateOfBirth", date)}
                      dateFormat="dd.MM.yyyy" // Define your desired date format
                      className="form-control" // Apply your custom CSS class if needed
                    />
                  </div>
                  <ErrorMessage
                    name="dateOfBirth"
                    component="div"
                    className="text-danger"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs="auto" className="mb-3">
                  <FloatingLabel label="Phone number">
                    <Field
                      type="tel"
                      id="phone"
                      placeholder="eg. 385981234567"
                      name="phone"
                      className="form-control"
                    />
                  </FloatingLabel>
                  <Form.Text id="passwordHelpBlock" muted>
                    Phone number must start with country code followed by the
                    number, eg. 385981234567
                  </Form.Text>
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-danger"
                  />
                </Col>
                <Col>
                  <FloatingLabel label="Your gender">
                    <Field
                      as="select"
                      id="gender"
                      name="gender"
                      className="form-select"
                    >
                      <option value="">Unselected</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Field>
                  </FloatingLabel>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-danger"
                  />
                </Col>
              </Row>
              <Col>
                <Form.Label style={{ color: "white" }}>Country</Form.Label>
                <Select
                  type="text"
                  id="country"
                  placeholder="Select your country"
                  name="country"
                  options={countryOptions}
                  value={values.country}
                  onChange={(selectedValue) => {
                    setFieldValue("country", selectedValue);
                    console.log(selectedValue);
                  }}
                  menuPlacement="top"
                  isClearable
                  isSearchable
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-danger"
                />
              </Col>
              <Row>
                <Col md={6}>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      setFieldValue("image", acceptedFiles[0]);
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setFieldValue("previewImage", e.target.result);
                      };
                      reader.readAsDataURL(acceptedFiles[0]);
                      console.log(values.image);
                      console.log(values.previewImage);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Container
                        className={styles.dropzone}
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        <p>
                          "Drag and drop an image file here, or click to select
                          one."
                        </p>
                      </Container>
                    )}
                  </Dropzone>
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-danger"
                  />
                </Col>
                <Col md={6}>
                  {values.previewImage && (
                    <Container className="image-preview mt-3">
                      <img
                        width="150px"
                        height="200px"
                        src={values.previewImage}
                        alt="Preview"
                      />
                    </Container>
                  )}
                </Col>
              </Row>

              <button
                disabled={isSubmitting && !values.validPassword}
                className="btn btn-info mt-3"
                type="submit"
              >
                SIGN UP
              </button>

              <p className="mt-1" style={{ color: "white" }}>
                Already have an account?{" "}
                <span
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => navigate("/")}
                >
                  Click here
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default Signup;
