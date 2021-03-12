import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { orange, pink } from "@material-ui/core/colors";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SocialButton from "./SocialButton";
import facebookIcon from "../assets/facebookIcon.png";
import googleIcon from "../assets/googleIcon.png";
import twitterIcon from "../assets/twitterIcon.png";

const OrangeCheckbox = withStyles({
  root: {
    color: pink[600],
    "&$checked": {
      color: pink[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const ColoredTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#f50057",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#f50057",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#f50057",
      },
    },
  },
})(TextField);

const LoginForm = (props) => {
  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Please fill in all form fields"
  );

  const submitForm = (e) => {
    e.preventDefault();

    // Reset state
    setShowAlert(false);

    let isValid = false;

    // Form Validation
    if (email != "" && password != "") {
      if (isEmail(email) && password.length >= 6) {
        isValid = true;
      } else if (!isEmail(email)) {
        setErrorMessage("Invalid email address.");
      } else if (password.length < 6) {
        setErrorMessage("Password must be at least 8 symbols.");
      } else {
        setErrorMessage("Incorrect email or password.");
      }
    } else {
      setErrorMessage("Please fill in all form fields");
    }

    // Update state
    if (isValid) setIsFormValid(true);
    else setIsFormValid(false);

    setShowAlert(true);
  };

  let alert = (
    <Alert style={{ marginBottom: "15px" }} severity="error">
      {errorMessage}
    </Alert>
  );

  if (isFormValid) {
    alert = (
      <Alert style={{ marginBottom: "15px" }} severity="success">
        Successfuly logged in
      </Alert>
    );
  }

  return (
    <div className="login-container">
      <form onSubmit={(e) => submitForm(e)} className="login-form">
        <h1 className="form-heading">Log in with</h1>
        {showAlert && alert}
        <div className="social-buttons">
          <SocialButton platform="Facebook" src={facebookIcon} />
          <SocialButton platform="Google" src={googleIcon} />
          <SocialButton platform="Twitter" src={twitterIcon} />
        </div>

        <p className="line-break-label ">or</p>
        <div className="form-controls">
          <ColoredTextField
            className="form-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email-field"
            label="Email"
            variant="outlined"
            size="small"
          />
          <ColoredTextField
            className="form-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password-field"
            label="Password"
            variant="outlined"
            size="small"
          />
          <div className="checkbox">
            <FormControlLabel
              control={
                <OrangeCheckbox
                  checked={isChecked}
                  // data-testid="checkbox"
                  title="checkbox"
                  onChange={(e) => setIsChecked(e.target.checked)}
                  name="checkbox"
                  id="checkbox"
                />
              }
              label="Remember me "
            />
          </div>
        </div>

        <Button
          id="submit-button"
          type="submit"
          className="submit-button"
          variant="outlined"
          color="primary"
          fullWidth
          size="large"
        >
          Log in
        </Button>

        <div className="change-auth">
          Don't have an account?{" "}
          <a href="" className="sign-up-link">
            Sign Up
          </a>
        </div>

      </form>
    </div>
  );
};

const isEmail = (email) => {
  let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regEmail.test(email)) {
    return false;
  } else {
    return true;
  }
};

export default LoginForm;
