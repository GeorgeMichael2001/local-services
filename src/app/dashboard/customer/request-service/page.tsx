"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./request-service.module.css";

export default function RequestServicePage() {
  const router = useRouter();

  const [serviceCategory, setServiceCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/service-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceCategory,
          description,
          location,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(
          result.message || "Unable to submit service request."
        );
        setSubmitting(false);
        return;
      }

      router.push("/dashboard/customer");
      router.refresh();
    } catch {
      setMessage("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => router.push("/dashboard/customer")}
        >
          Back to Dashboard
        </button>

        <div className={styles.header}>
          <p className={styles.label}>Service Request</p>

          <h1>Request a Service</h1>

          <p>
            Tell us what service you need and where you need it.
            We will help connect you with a suitable provider.
          </p>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.field}>
            <label htmlFor="serviceCategory">
              Service Category
            </label>

            <select
              id="serviceCategory"
              value={serviceCategory}
              onChange={(event) =>
                setServiceCategory(event.target.value)
              }
              required
            >
              <option value="">
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

          <div className={styles.field}>
            <label htmlFor="description">
              Describe the problem
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Example: Burst water pipe at my shop."
              rows={6}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="location">
              Location
            </label>

            <input
              id="location"
              type="text"
              value={location}
              onChange={(event) =>
                setLocation(event.target.value)
              }
              placeholder="Example: Ntinda, Kampala"
              required
            />
          </div>

          {message && (
            <p className={styles.error}>
              {message}
            </p>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={submitting}
          >
            {submitting
              ? "Submitting..."
              : "Submit Service Request"}
          </button>
        </form>
      </div>
    </main>
  );
}