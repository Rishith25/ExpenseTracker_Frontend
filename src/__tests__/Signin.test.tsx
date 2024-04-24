import { render, fireEvent, waitFor } from "@testing-library/react";
import SigninForm from "../pages/signin/SigninForm";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";

// Mock axios post function
jest.mock("axios");

describe("SigninForm", () => {
  test("submits sign-in form with user input", async () => {
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
        <SigninForm />
      </Router>
    );

    // Fill out the form fields
    fireEvent.change(getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.submit(getByText("Sign-In"));

    // Wait for axios to be called with the correct data
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8000/api/signin/",
        {
          email: "test@example.com",
          password: "password123",
        }
      );
    });

    // Check if navigation to the dashboard page occurred after successful sign-in
    expect(window.location.pathname).toBe("/home/dashboard");
  });
});
