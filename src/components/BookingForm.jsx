import { useEffect, useMemo, useState } from "react";
import { submitBooking } from "../services/bookings.js";

function isEmail(value) {
  return /[^@\s]+@[^@\s]+\.[^@\s]+/.test(String(value).toLowerCase());
}

function todayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

function timeOptions() {
  return [
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
  ];
}

export default function BookingForm() {
  const [form, setForm] = useState({
    date: todayISO(),
    time: "",
    guests: 2,
    name: "",
    email: "",
    phone: "",
    occasion: "None",
    requests: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [apiError, setApiError] = useState("");

  const times = useMemo(() => timeOptions(), []);

  useEffect(() => {
    if (status === "error") setStatus("idle");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  function setField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate(next = form) {
    const e = {};

    // Date
    if (!next.date) e.date = "Please choose a date.";
    else if (next.date < todayISO()) e.date = "Date cannot be in the past.";

    // Time
    if (!next.time) e.time = "Please choose a time.";

    // Guests
    const guests = Number(next.guests);
    if (!guests || Number.isNaN(guests)) e.guests = "Enter number of guests.";
    else if (guests < 1 || guests > 10)
      e.guests = "Guests must be between 1 and 10.";

    // Name
    if (!next.name.trim()) e.name = "Name is required.";
    else if (next.name.trim().length < 2)
      e.name = "Name must be at least 2 characters.";

    // Email
    if (!next.email.trim()) e.email = "Email is required.";
    else if (!isEmail(next.email)) e.email = "Enter a valid email address.";

    // Phone
    if (!next.phone.trim()) e.phone = "Phone is required.";

    return e;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) {
      // Focus first error
      const first = Object.keys(v)[0];
      const el = document.getElementById(`field-${first}`);
      if (el) el.focus();
      return;
    }

    setStatus("submitting");
    setApiError("");
    try {
      await submitBooking(form);
      setStatus("success");
    } catch (err) {
      setApiError(err?.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  const disabled = status === "submitting";

  if (status === "success") {
    return (
      <div role="status" className="success">
        <h2 tabIndex={-1}>Booking confirmed!</h2>
        <p>
          Thanks, {form.name}. We sent a confirmation to{" "}
          <strong>{form.email}</strong>.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setForm({
              ...form,
              name: "",
              email: "",
              phone: "",
              occasion: "None",
              requests: "",
            });
          }}
        >
          Make another booking
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-describedby="form-errors"
      className="booking-form"
    >
      <div className="grid-2">
        <fieldset>
          <legend>Reservation details</legend>
          <div className="field">
            <label htmlFor="field-date">Date</label>
            <input
              type="date"
              id="field-date"
              name="date"
              min={todayISO()}
              value={form.date}
              onChange={(e) => setField("date", e.target.value)}
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errors.date ? "error-date" : undefined}
              required
            />
            {errors.date && (
              <p className="error" id="error-date" role="alert">
                {errors.date}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="field-time">Time</label>
            <select
              id="field-time"
              name="time"
              value={form.time}
              onChange={(e) => setField("time", e.target.value)}
              aria-invalid={Boolean(errors.time)}
              aria-describedby={errors.time ? "error-time" : undefined}
              required
            >
              <option value="" disabled>
                Select a time
              </option>
              {times.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors.time && (
              <p className="error" id="error-time" role="alert">
                {errors.time}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="field-guests">Number of guests</label>
            <input
              type="number"
              id="field-guests"
              name="guests"
              min={1}
              max={10}
              value={form.guests}
              onChange={(e) => setField("guests", e.target.value)}
              aria-invalid={Boolean(errors.guests)}
              aria-describedby={errors.guests ? "error-guests" : undefined}
              required
            />
            {errors.guests && (
              <p className="error" id="error-guests" role="alert">
                {errors.guests}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="field-occasion">Occasion (optional)</label>
            <select
              id="field-occasion"
              name="occasion"
              value={form.occasion}
              onChange={(e) => setField("occasion", e.target.value)}
            >
              <option>None</option>
              <option>Birthday</option>
              <option>Anniversary</option>
              <option>Business</option>
            </select>
          </div>
        </fieldset>

        <fieldset>
          <legend>Contact details</legend>
          <div className="field">
            <label htmlFor="field-name">Full name</label>
            <input
              type="text"
              id="field-name"
              name="name"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "error-name" : undefined}
              autoComplete="name"
              required
            />
            {errors.name && (
              <p className="error" id="error-name" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="field-email">Email</label>
            <input
              type="email"
              id="field-email"
              name="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "error-email" : undefined}
              autoComplete="email"
              required
            />
            {errors.email && (
              <p className="error" id="error-email" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="field-phone">Phone</label>
            <input
              type="tel"
              id="field-phone"
              name="phone"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "error-phone" : undefined}
              autoComplete="tel"
              required
            />
            {errors.phone && (
              <p className="error" id="error-phone" role="alert">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="field-requests">Special requests (optional)</label>
            <textarea
              id="field-requests"
              name="requests"
              rows={3}
              value={form.requests}
              onChange={(e) => setField("requests", e.target.value)}
            />
          </div>
        </fieldset>
      </div>

      {apiError && (
        <div className="error-box" role="alert" aria-live="assertive">
          {apiError}
        </div>
      )}

      <div className="actions">
        <button type="submit" disabled={disabled} aria-busy={disabled}>
          {disabled ? "Submitting…" : "Confirm booking"}
        </button>
      </div>
    </form>
  );
}
