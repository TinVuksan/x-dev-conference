import { useState, useRef, useEffect } from "react";
import { Container, Form, Col, Row, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosConfig from "../../API/axiosConfig";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/auth/register";

const Signup = () => {
  const passwordRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    setErrMsg("");
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        email,
        password,
        phone,
        firstName,
        lastName,
        gender,
        country,
      })
    );
    try {
      const response = await axiosConfig.post(
        REGISTER_URL,
        JSON.stringify({
          email,
          password,
          phone,
          firstName,
          lastName,
          gender,
          country,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      console.log(JSON.stringify(response));
      setSuccess(true);
      navigate("/");
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email already taken");
      } else {
        setErrMsg("Registration failed");
      }
      errRef.current.focus();
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <Container
        className="login-signup d-flex flex-column min-vh-100 justify-content-center align-items-center"
        fluid
      >
        <Form className="login-form" onSubmit={handleSubmit}>
          <p
            style={{ color: "white" }}
            ref={errRef}
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
              <Form.Control
                type="text"
                id="firstName"
                placeholder="Your first name"
                name="firstName"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label style={{ color: "white" }}>Last name</Form.Label>
              <Form.Control
                type="text"
                id="lastName"
                placeholder="Your last name"
                name="lastName"
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="auto" className="mb-3">
              <Form.Label style={{ color: "white" }}>Email</Form.Label>
              <Form.Control
                type="text"
                id="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label htmlFor="password" style={{ color: "white" }}>
                Password
                <span className={validPassword ? "valid" : "hide"}>
                  {"\n"}
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={validPassword || !password ? "hide" : "invalid"}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </Form.Label>
              <Form.Control
                type="password"
                id="password"
                placeholder="Enter password"
                name="password"
                ref={passwordRef}
                value={password}
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="pwdnote"
                required
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              <p
                id="pwdnote"
                className={
                  passwordFocus && !validPassword ? "instructions" : "offscreen"
                }
                style={{ color: "white" }}
              >
                <FontAwesomeIcon icon={faInfoCircle} /> {"\n"}
                8 to 24 characters. <br />
                Must include uppercase and lowercase letters, a number and a
                special character. <br />
                Allowed special characters: ! @ # $ %
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs="auto" className="mb-3">
              <FloatingLabel label="Phone number">
                <Form.Control
                  type="tel"
                  id="phone"
                  placeholder="eg. 385981234567"
                  name="phone"
                  value={phone}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FloatingLabel>
              <Form.Text id="passwordHelpBlock" muted>
                Phone number must start with country code followed by the
                number, eg. 385981234567
              </Form.Text>
            </Col>
            <Col>
              <FloatingLabel label="Your gender">
                <Form.Select
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  value={gender}
                  defaultValue="Male"
                >
                  <option>Unselected</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
          <Col>
            <Form.Label style={{ color: "white" }}>Country</Form.Label>
            <Form.Control
              type="text"
              id="country"
              placeholder="Select your country"
              name="country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </Col>

          <button
            disabled={!validPassword ? true : false}
            className="btn btn-info mt-3"
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
      </Container>
    </>
  );
};

export default Signup;
