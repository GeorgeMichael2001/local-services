import Link from "next/link";

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
            Find trusted
            <br />
            <span>service providers</span>
            <br />
            near you.
          </h1>

          <p>
            Connect with verified electricians, plumbers, mechanics, veterinarians, computer technicians
            technicians and other trusted professionals in
            your area.
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
            🔧 Plumbing
          </div>

          <div className="service-item">
            ⚡ Electrical
          </div>

          <div className="service-item">
            🛠️ Appliance Repair
          </div>

          <div className="service-item">
            💻 Computer Services
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <h2>Services You Can Find</h2>

        <p>
          Get help from trusted professionals for everyday needs.
        </p>

        <div className="service-grid">

          <div className="service-box">
            <h3>🔧 Plumbing</h3>
            <p>
              Find plumbers for pipe repairs, installations
              and other plumbing problems.
            </p>
          </div>

          <div className="service-box">
            <h3>⚡ Electrical</h3>
            <p>
              Connect with electricians for safe and reliable
              electrical services.
            </p>
          </div>

          <div className="service-box">
            <h3>🛠️ Repairs</h3>
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