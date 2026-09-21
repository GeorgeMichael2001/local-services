"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import styles from "./login.module.css";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      phone: formData.get("phone"),
      password: formData.get("password"),
    };

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`Welcome, ${result.user.full_name}!`);
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

            <h1>Welcome back</h1>

            <p>
              Sign in to continue finding trusted
              service providers.
            </p>
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.formContent}>
            <h2>Login</h2>

            <p className={styles.subtitle}>
              Sign in to your Local Services account.
            </p>

            <form
              onSubmit={handleSubmit}
              className={styles.form}
            >
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
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
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
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className={styles.footer}>
              <span>Don't have an account?</span>

              <Link href="/register">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}