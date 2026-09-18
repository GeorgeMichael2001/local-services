"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./LogoutButton.module.css";

export default function LogoutButton() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      const result = await response.json();

      if (result.success) {
        router.push("/login");
        router.refresh();
      } else {
        alert(result.message);
        setLoggingOut(false);
      }
    } catch {
      alert("Unable to log out. Please try again.");
      setLoggingOut(false);
    }
  }

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleLogout}
      disabled={loggingOut}
    >
      {loggingOut ? "Logging out..." : "Logout"}
    </button>
  );
}