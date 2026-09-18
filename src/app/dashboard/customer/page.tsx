import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";

import styles from "./customer.module.css";

export default async function CustomerDashboard() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    redirect("/login");
  }

  const session = await verifySession(sessionToken);

  if (!session) {
    redirect("/login");
  }

  if (session.role !== "customer") {
    if (session.role === "technician") {
      redirect("/dashboard/technician");
    }

    if (session.role === "admin") {
      redirect("/dashboard/admin");
    }

    redirect("/login");
  }

  const user = await prisma.users.findUnique({
    where: {
      user_id: session.userId,
    },
    select: {
      user_id: true,
      full_name: true,
      phone: true,
      email: true,
      role: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <main className={styles.dashboard}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          Local Services
        </div>

        <div className={styles.navActions}>
          <span className={styles.userName}>
            {user.full_name}
          </span>

          <button className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </nav>

      <section className={styles.content}>
        <div className={styles.welcome}>
          <p className={styles.label}>Customer Dashboard</p>

          <h1>
            Welcome, {user.full_name}
          </h1>

          <p>
            Find trusted service providers for your everyday
            service needs.
          </p>
        </div>

        <section className={styles.requestSection}>
          <div>
            <h2>Find a Service</h2>

            <p>
              Choose a service category or create a service
              request.
            </p>
          </div>

          <button className={styles.primaryButton}>
            Request a Service
          </button>
        </section>

        <section className={styles.servicesSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Popular Services</h2>

              <p>
                Connect with verified professionals.
              </p>
            </div>
          </div>

          <div className={styles.serviceGrid}>
            <div className={styles.serviceCard}>
              <h3>Plumbing</h3>

              <p>
                Pipe repairs, installations and plumbing
                maintenance.
              </p>

              <button>Find a Provider</button>
            </div>

            <div className={styles.serviceCard}>
              <h3>Electrical</h3>

              <p>
                Electrical installation, repairs and
                maintenance.
              </p>

              <button>Find a Provider</button>
            </div>

            <div className={styles.serviceCard}>
              <h3>Appliance Repair</h3>

              <p>
                Get help repairing household and business
                appliances.
              </p>

              <button>Find a Provider</button>
            </div>

            <div className={styles.serviceCard}>
              <h3>Computer Services</h3>

              <p>
                Computer repair, installation and technical
                support.
              </p>

              <button>Find a Provider</button>
            </div>
          </div>
        </section>

        <section className={styles.requestsSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>My Service Requests</h2>

              <p>
                Track the services you have requested.
              </p>
            </div>
          </div>

          <div className={styles.emptyState}>
            <h3>No service requests yet</h3>

            <p>
              Your service requests will appear here after
              you submit one.
            </p>

            <button className={styles.primaryButton}>
              Request Your First Service
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}
