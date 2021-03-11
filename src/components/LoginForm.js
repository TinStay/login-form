import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { green } from "@material-ui/core/colors";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
// import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const LoginForm = () => {
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
      if (isEmail(email) && password.length > 8) {
        isValid = true;
      } else if (!isEmail(email)) {
        setErrorMessage("Invalid email address.");
      } else if (password.length < 8) {
        setErrorMessage("Password must be at least 8 symbols.");
      } else {
        setErrorMessage("Incorrect email or password.");
      }
    }else{
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
        <h1 className="login-form-heading">Login</h1>
        {showAlert && alert}
        <TextField
          className="login-form-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email-field"
          label="Email"
          variant="outlined"
          size="small"
        />
        <TextField
          className="login-form-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password-field"
          label="Password"
          variant="outlined"
          size="small"
        />

        <Button
          type="submit"
          className="submit-btn"
          variant="outlined"
          color="primary"
          fullWidth
        >
          Log in
        </Button>
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              name="checkedG"
            />
          }
          label="Remember me"
        />
        <a href="" className="login-form-sign-up-link">
          <p className="">Don't have an account?</p>
        </a>
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
