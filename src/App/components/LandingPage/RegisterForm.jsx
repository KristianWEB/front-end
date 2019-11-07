import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { connect } from "react-redux";
import { Input, message } from "antd";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { REGISTER_USER } from "../../graphql/queries";
import { register as registerUser } from "../../actions/auth";
import { AuthDisplay, StyledButton } from "./LandingPage.styles";

const RegisterForm = ({ register, isAuthenticated }) => {
  const [signUpState, setSignUpState] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const [isPending, setIsPending] = useState(false);

  const onChangeRegister = e =>
    setSignUpState({ ...signUpState, [e.target.name]: e.target.value });

  const [addUser] = useMutation(REGISTER_USER, {
    update: (_, result) => register(result.data),
    onError: err => setErrors(err.graphQLErrors[0].extensions.exception.errors),
    variables: {
      username: signUpState.username,
      email: signUpState.email,
      password: signUpState.password,
      confirmPassword: signUpState.confirmPassword
    }
  });

  const onSubmitRegister = async e => {
    e.preventDefault();

    if (isPending) {
      return;
    }

    setIsPending(true);

    const { password, confirmPassword } = signUpState;

    if (!password.match(/(?=.*[A-Z])/)) {
      message.error("password must contain at least one upppercase character");
      setIsPending(false);
      return;
    }

    if (!password.match(/(?=.*\d)/)) {
      message.error("password must contain at least one number");
      setIsPending(false);
      return;
    }

    if (password.length < 8) {
      message.error("password must be at least 8 characters");
      setIsPending(false);
      return;
    }

    if (password !== confirmPassword) {
      message.error("Passwords must be the same");
      setIsPending(false);
      return;
    }

    setIsPending(false);

    addUser();

    setSignUpState({
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    });
  };
  useEffect(() => {
    // I've tried for like 2-3 hours to connect this to register_fail but no success if anybody knows how to implement that please do let me know!

    Object.keys(errors).map(error => message.error(errors[error]));
  }, [errors]);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <AuthDisplay>
      <h1>Create Your Account</h1>
      <h3 style={{ color: "#808080" }}>Register</h3>
      <form onSubmit={onSubmitRegister}>
        <Input
          name="username"
          value={signUpState.username}
          onChange={onChangeRegister}
          placeholder="Username"
          size="large"
          style={{ marginBottom: "40px" }}
          required
        />
        <Input
          name="email"
          value={signUpState.email}
          onChange={onChangeRegister}
          placeholder="Email"
          size="large"
          style={{ marginBottom: "40px" }}
          required
        />
        <Input.Password
          name="password"
          value={signUpState.password}
          onChange={onChangeRegister}
          placeholder="New Password"
          size="large"
          required
        />
        <p
          style={{
            fontSize: "12px",
            color: "grey",
            marginBottom: "40px",
            marginTop: "5px"
          }}
        >
          Password should have atleast 1 lowercase letter, 1 uppercase letter, 1
          number
        </p>
        <Input.Password
          name="confirmPassword"
          value={signUpState.confirmPassword}
          onChange={onChangeRegister}
          placeholder="Confirm Password"
          size="large"
          style={{ marginBottom: "40px" }}
          required
        />
        <StyledButton
          type="primary"
          htmlType="submit"
          block
          loading={isPending}
        >
          <span style={{ fontSize: "16px" }}>Register</span>
        </StyledButton>
      </form>
    </AuthDisplay>
  );
};

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register: registerUser }
)(RegisterForm);
