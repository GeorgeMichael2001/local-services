"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import styles from "./register.module.css";

export default function RegisterPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const password = String(formData.get("password") || "");
    const confirmPassword = String(
      formData.get("confirmPassword") || ""
    );

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const data = {
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      password,
    };

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Account created successfully!");
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
      <div className={styles.card}>
        <div className={styles.blackSection}>
          <div className={styles.blackContent}>
            <p className={styles.brand}>
              Local<span>Services</span>
            </p>

            <h1>Sign up</h1>

            <p>
              Create your account and start finding trusted
              local professionals.
            </p>
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.formContent}>
            <h2>Create account</h2>

            <p className={styles.subtitle}>
              Join Local Services today.
            </p>

            <form
              onSubmit={handleSubmit}
              className={styles.form}
            >
              <div className={styles.formGroup}>
                <label htmlFor="fullName">
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
              </div>

              {message && (
                <p className={styles.message}>
                  {message}
                </p>
              )}

              <button
                type="submit"
                className={styles.button}
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>
            </form>

            <div className={styles.footer}>
              <span>Already have an account?</span>

              <Link href="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}