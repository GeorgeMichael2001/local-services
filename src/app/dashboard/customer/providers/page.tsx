import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

import styles from "./providers.module.css";

type ProvidersPageProps = {
  searchParams: Promise<{
    service?: string;
  }>;
};

export default async function ProvidersPage({
  searchParams,
}: ProvidersPageProps) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    redirect("/login");
  }

  const params = await searchParams;
  const service = params.service || "";

  const technicians = service
    ? await prisma.technicians.findMany({
        where: {
          service_category: service,
          verification_status: "verified",
          availability_status: "available",
        },
        include: {
          users: {
            select: {
              full_name: true,
              phone: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      })
    : [];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link
          href="/dashboard/customer"
          className={styles.backLink}
        >
          Back to Dashboard
        </Link>

        <div className={styles.header}>
          <p className={styles.label}>SERVICE PROVIDERS</p>

          <h1>
            {service
              ? `Available ${service} Providers`
              : "Find a Service Provider"}
          </h1>

          <p>
            Choose a verified and available professional for
            your service request.
          </p>
        </div>

        {technicians.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>No providers available</h2>

            <p>
              There are currently no verified and available
              providers for this service.
            </p>

            <Link
              href="/dashboard/customer"
              className={styles.button}
            >
              Back to Dashboard
            </Link>
          </div>
        ) : (
          <div className={styles.providerGrid}>
            {technicians.map((technician) => (
              <div
                key={technician.technician_id}
                className={styles.providerCard}
              >
                <div className={styles.providerHeader}>
                  <div className={styles.avatar}>
                    {technician.users.full_name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <h2>
                      {technician.users.full_name}
                    </h2>

                    <span className={styles.verified}>
                      Verified Provider
                    </span>
                  </div>
                </div>

                <div className={styles.details}>
                  <div>
                    <span>Service</span>
                    <strong>
                      {technician.service_category}
                    </strong>
                  </div>

                  <div>
                    <span>Location</span>
                    <strong>
                      {technician.location}
                    </strong>
                  </div>
                </div>

                {technician.description && (
                  <p className={styles.description}>
                    {technician.description}
                  </p>
                )}

                <Link
                  href={`/dashboard/customer/request-service?technicianId=${technician.technician_id}`}
                  className={styles.button}
                >
                  Select Provider
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}