import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

test("renders title", () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const restaurant = screen.getByText(/Jaws Bits N' Bites/i);
  expect(restaurant).toBeInTheDocument();
});
