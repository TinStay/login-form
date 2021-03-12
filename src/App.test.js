import React from "react";
import LoginForm from "./components/LoginForm";
import { render, fireEvent } from "@testing-library/react";

test("checks if all form fields and buttons are rendered", () => {
  const { getByText, getByLabelText, getByAltText } = render(
    <LoginForm></LoginForm>
  );

  // Get form elements
  const emailField = getByLabelText("Email");
  const passwordField = getByLabelText("Password");
  const submitBtn = getByText("Log in");
  const changeAuthLabel = getByText("Don't have an account?");
  const fbIcon = getByAltText("Facebook icon");
  const googleIcon = getByAltText("Google icon");
  const twitterIcon = getByAltText("Twitter icon");

});

test("checks if checkbox is checked and unchecked when clicked", () => {
  const { getByLabelText } = render(<LoginForm></LoginForm>);

  const checkbox = getByLabelText("Remember me");

  // Check the box
  fireEvent.click(checkbox);

  // Uncheck the box
  fireEvent.click(checkbox);

  // Checkbox should be unchecked after 2 clicks
  expect(checkbox).not.toBeChecked();
});
