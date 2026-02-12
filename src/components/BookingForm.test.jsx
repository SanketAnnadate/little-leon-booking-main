import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BookingForm from "./BookingForm";

describe("BookingForm", () => {
  it("renders the booking form", () => {
    render(<BookingForm />);
    expect(
      screen.getByRole("button", { name: /confirm booking/i }),
    ).toBeInTheDocument();
  });
});
