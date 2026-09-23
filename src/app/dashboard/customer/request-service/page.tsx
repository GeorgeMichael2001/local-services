"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import styles from "./request-service.module.css";

export default function RequestServicePage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      serviceCategory: formData.get("serviceCategory"),
      description: formData.get("description"),
      location: formData.get("location"),
    };

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const response = await fetch("/api/service-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setMessage("Your service request has been submitted successfully.");
        form.reset();
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Link
            href="/dashboard/customer"
            className={styles.backLink}
          >
            Back to Dashboard
          </Link>

          <p className={styles.label}>Local Services</p>

          <h1>Request a Service</h1>

          <p className={styles.subtitle}>
            Tell us what service you need and where you need it.
            We will help connect you with a suitable provider.
          </p>
        </div>

        <section className={styles.card}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="serviceCategory">
                Service Category
              </label>

              <select
                id="serviceCategory"
                name="serviceCategory"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Select a service
                </option>

                <option value="Plumbing">
                  Plumbing
                </option>

                <option value="Electrical">
                  Electrical
                </option>

                <option value="Appliance Repair">
                  Appliance Repair
                </option>

                <option value="Computer Services">
                  Computer Services
                </option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">
                Describe the Problem
              </label>

              <textarea
                id="description"
                name="description"
                placeholder="Describe the service you need..."
                rows={6}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="location">
                Location
              </label>

              <input
                id="location"
                name="location"
                type="text"
                placeholder="e.g. Ntinda, Kampala"
                required
              />
            </div>

            {message && (
              <div
                className={
                  success
                    ? styles.successMessage
                    : styles.errorMessage
                }
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "Submit Service Request"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}