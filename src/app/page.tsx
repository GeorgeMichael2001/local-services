import Link from "next/link";

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2 2.6-2.6Z" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

function ToolIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3a3 3 0 0 0-2.9 3.8L4 14l3 3 7.2-7.1A3 3 0 0 0 18 4l-2.2 2.2-1.9-1.9L16 2.2A3 3 0 0 0 14 3Z" />
      <circle cx="6" cy="18" r="2" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="home">
      <nav className="navbar">
        <div className="logo">
          Fundi<span>Link</span>
        </div>

        <div className="nav-links">
          <Link href="#services">Services</Link>
          <Link href="#how-it-works">How It Works</Link>
          <Link href="/login" className="login-link">
            Login
          </Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>
            Find someone
            <br />
            <span>who can get it done.</span>
          </h1>

          <p>
            Connect with trusted local professionals for the jobs
            that keep your home or business running.
          </p>

          <div className="hero-buttons">
            <Link href="/register" className="primary-button">
              Find a Service
            </Link>

            <Link href="/register" className="secondary-button">
              Become a Provider
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h2>Popular Services</h2>

          <div className="service-item">
            <WrenchIcon />
            Plumbing
          </div>

          <div className="service-item">
            <BoltIcon />
            Electrical
          </div>

          <div className="service-item">
            <ToolIcon />
            Appliance Repair
          </div>

          <div className="service-item">
            <MonitorIcon />
            Computer Services
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <h2>Services You Can Find</h2>

        <p>Get help from trusted professionals for everyday needs.</p>

        <div className="service-grid">
          <div className="service-box">
            <WrenchIcon />
            <h3>Plumbing</h3>
            <p>
              Find plumbers for pipe repairs, installations
              and other plumbing problems.
            </p>
          </div>

          <div className="service-box">
            <BoltIcon />
            <h3>Electrical</h3>
            <p>
              Connect with electricians for safe and reliable
              electrical services.
            </p>
          </div>

          <div className="service-box">
            <MonitorIcon />
            <h3>Repairs</h3>
            <p>
              Find technicians who can repair appliances,
              computers and other equipment.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}