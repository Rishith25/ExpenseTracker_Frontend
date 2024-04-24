import { render, fireEvent, waitFor } from "@testing-library/react";
import SignupForm from "../pages/signup/SignupForm";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { API_ENDPOINT } from "../config/constants";

// Mock axios post function
jest.mock("axios");

describe("SignupForm", () => {
  test("submits sign-up form with user input", async () => {
    // Mock axios post function to resolve with successful response
    (
      axios.post as jest.MockedFunction<typeof axios.post>
    ).mockResolvedValueOnce({
      data: {
        auth_token: "mockAuthToken",
        user: {
          id: 1,
          email: "test@example.com",
          first_name: "John",
          last_name: "Doe",
          phone_number: "1234567890",
        },
      },
    });

    const { getByLabelText, getByText } = render(
      <Router>
        <SignupForm />
      </Router>
    );

    // Fill out the form fields
    fireEvent.change(getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByLabelText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(getByLabelText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(getByLabelText("Phone Number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.submit(getByText("Sign-Up"));

    // Wait for axios to be called with the correct data
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(`${API_ENDPOINT}/signup/`, {
        email: "test@example.com",
        password: "password123",
        first_name: "John",
        last_name: "Doe",
        phone_number: "1234567890",
      });
    });

    // Check if navigation to the dashboard page occurred after successful sign-up
    expect(window.location.pathname).toBe("/home/dashboard");
  });
});
