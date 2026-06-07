import { useEffect, useMemo, useState } from "react";
import "./style.css";

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");

  const tomorrow = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    dentist: "",
    apptDate: "",
    apptTime: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-aos]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const siblings = [
            ...entry.target.parentElement.querySelectorAll("[data-aos]"),
          ];

          const idx = siblings.indexOf(entry.target);

          setTimeout(() => {
            entry.target.classList.add("visible");
          }, idx * 100);

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = true;
    if (!formData.lastName.trim()) newErrors.lastName = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.phone.trim()) newErrors.phone = true;
    if (!formData.service) newErrors.service = true;
    if (!formData.apptDate) newErrors.apptDate = true;
    if (!formData.apptTime) newErrors.apptTime = true;

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      const formattedDate = new Date(
        formData.apptDate + "T00:00:00"
      ).toLocaleDateString("en-CA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const dentistText = formData.dentist
        ? ` with ${formData.dentist}`
        : "";

      setConfirmationText(
        `${formData.firstName} ${formData.lastName} · ${formData.service}${dentistText} · ${formattedDate} at ${formData.apptTime}`
      );

      setConfirmed(true);
      setLoading(false);
    }, 800);
  };

  const handleBookAnother = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      dentist: "",
      apptDate: "",
      apptTime: "",
      notes: "",
    });

    setErrors({});
    setConfirmed(false);
  };

    return (
    <>
    {/* NAVBAR */}
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
    <div className="nav-inner">
        <a href="#hero" className="brand">
        <span className="brand-leaf">✦</span>
        <span className="brand-name">EvergreenSmile</span>
        </a>

        <ul className="nav-links">
        <li><a href="#services">Services</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#team">Team</a></li>
        <li><a href="#contact">Contact</a></li>
        </ul>

        <a href="#booking" className="nav-book-btn">
        Book Appointment
        </a>

        <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        >
        <span></span>
        <span></span>
        <span></span>
        </button>
    </div>

    <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="#services" onClick={() => setMenuOpen(false)}>
        Services
        </a>

        <a href="#about" onClick={() => setMenuOpen(false)}>
        About
        </a>

        <a href="#team" onClick={() => setMenuOpen(false)}>
        Team
        </a>

        <a href="#contact" onClick={() => setMenuOpen(false)}>
        Contact
        </a>

        <a
        href="#booking"
        className="mobile-book"
        onClick={() => setMenuOpen(false)}
        >
        Book Appointment
        </a>
    </div>
    </nav>

    {/* HERO SECTION */}
    <section id="hero">
        <div className="hero-content">
            <div className="hero-badge">✦ ACCEPTING NEW PATIENTS</div>
            <h1>
                Your smile,<br />
                <em>beautifully</em><br />
                cared for.
            </h1>
            <p className="hero-sub">
                Warm, gentle dental care for the family.<br />
                EvergreenSmile, Ottawa's neighbourhood dental clinic.
            </p>
            <div className="hero-actions">
                <a href="#booking" className="btn-primary">Book an Appointment</a>
                <a href="#services" className="btn-ghost">Explore Services ↓</a>
            </div>
            <div className="hero-trust">
                <div className="trust-item"><span className="trust-num">10+</span><span>Years of Care</span></div>
                <div className="trust-divider"></div>
                <div className="trust-item"><span className="trust-num">5000+</span><span>Happy Patients</span></div>
                <div className="trust-divider"></div>
                <div className="trust-item"><span className="trust-num">5 ★</span><span>Google Rating</span></div>
            </div>
        </div>
        <div className="hero-visual">
            <div className="hero-img-wrap">
                <img src="/images/hero.jpeg" alt="Friendly dentist with patient" onerror="this.style.display='none'" />
            </div>
        </div>
    </section>

    {/* SERVICES */}
    <section id="services">
        <div className="section-inner">
            <div className="section-tag">What We Offer</div>
            <h2 className="section-title">Comprehensive dental care,<br /><em>all under one roof</em></h2>
            <div className="services-grid">

                <div className="service-card" data-aos>
                <div className="service-icon">🪥</div>
                <h3>General Dentistry</h3>
                <p>Routine cleanings, exams, X-rays, and fillings to keep your teeth healthy and strong.</p>
                <div className="service-price">From $100</div>
                <a href="#booking" className="service-link">Book →</a>
                </div>

                <div className="service-card" data-aos>
                <div className="service-badge">Most Popular</div>
                <div className="service-icon">✨</div>
                <h3>Teeth Whitening</h3>
                <p>Professional in-office whitening that delivers visibly brighter results in a single visit.</p>
                <div className="service-price">From $250</div>
                <a href="#booking" className="service-link">Book →</a>
                </div>

                <div className="service-card" data-aos>
                <div className="service-icon">🦷</div>
                <h3>Root Canal</h3>
                <p>Pain-relieving treatment to save infected teeth. Comfortable, efficient, and anxiety-free.</p>
                <div className="service-price">From $500</div>
                <a href="#booking" className="service-link">Book →</a>
                </div>

                <div className="service-card" data-aos>
                <div className="service-icon">😁</div>
                <h3>Orthodontics</h3>
                <p>Traditional braces and clear aligners to straighten your smile at any age.</p>
                <div className="service-price">From $3,500</div>
                <a href="#booking" className="service-link">Book →</a>
                </div>

                <div className="service-card" data-aos>
                <div className="service-icon">👶</div>
                <h3>Pediatric Dentistry</h3>
                <p>Gentle, fun dental care designed to make kids feel safe and excited about their oral health.</p>
                <div className="service-price">From $50</div>
                <a href="#booking" className="service-link">Book →</a>
                </div>

                <div className="service-card" data-aos>
                <div className="service-icon">🦴</div>
                <h3>Dental Implants</h3>
                <p>Permanent, natural-looking tooth replacements that restore function and confidence.</p>
                <div className="service-price">From $2,500</div>
                <a href="#booking" className="service-link">Book →</a>
                </div>

            </div>
        </div>
    </section>

    {/* ROOT CANAL INFO (addresses Jahir's goal) */}
    <section id="root-canal-info">
        <div className="section-inner">
        <div className="rci-grid">
            <div className="rci-text" data-aos>
            <div className="section-tag">Patient Education</div>
            <h2>What is a <em>Root Canal</em>?</h2>
            <p>A root canal is a dental procedure used to treat infection inside the tooth's root. It removes infected pulp, cleans the canal, and seals it while saving your natural tooth and eliminating pain.</p>
            <p>Despite its reputation, modern root canal treatment is no more uncomfortable than getting a filling. Most patients are surprised by how relaxed the experience is.</p>
            <div className="rci-facts">
                <div className="rci-fact">
                <span className="fact-icon">⏱</span>
                <div><strong>Duration</strong><p>60 – 90 minutes</p></div>
                </div>
                <div className="rci-fact">
                <span className="fact-icon">💊</span>
                <div><strong>Anesthesia</strong><p>Local — you'll feel no pain</p></div>
                </div>
                <div className="rci-fact">
                <span className="fact-icon">💰</span>
                <div><strong>Cost</strong><p>From $600 (insurance accepted)</p></div>
                </div>
                <div className="rci-fact">
                <span className="fact-icon">🔄</span>
                <div><strong>Recovery</strong><p>1-3 days mild pain/swelling</p></div>
                </div>
            </div>
            <a href="#booking" className="btn-primary">Book a Consultation</a>
            </div>
            <div className="rci-visual" data-aos>
            <div className="rci-img-wrap">
                <img src="images/root-canal.png" alt="Root canal illustration" onerror="this.style.display='none'" />
            </div>
            </div>
        </div>
        </div>
    </section>

    {/* ABOUT */}
    <section id="about">
        <div className="section-inner">
        <div className="about-grid">
            <div className="about-visual" data-aos>
            <div className="about-img-wrap">
                <img src="images/clinic.jpg" alt="Inside the clinic" onerror="this.style.display='none'" />
            </div>
            <div className="about-hours-card">
                <h4>Hours & Location</h4>
                <table className="hours-table">
                <tr><td>Mon – Fri</td><td>9:00 AM – 7:00 PM</td></tr>
                <tr><td>Saturday</td><td>8:00 AM – 5:00 PM</td></tr>
                <tr className="closed"><td>Sunday</td><td>Closed</td></tr>
                </table>
                <p className="clinic-address">📍 123 Dental Street, Ottawa, ON K1A B2C</p>
            </div>
            </div>
            <div className="about-text" data-aos>
            <div className="section-tag">About Us</div>
            <h2>A practice built on <em>trust & warmth</em></h2>
            <p>Founded in 2015, EvergreenSmile Dental Clinic was built around a single belief, that dental care should never feel intimidating. We've grown into a team of 6 dedicated professionals who treat every patient like family.</p>
            <p>We accept walk-ins and offer same-day emergency appointments. Most major insurance plans accepted.</p>
            <div className="about-pillars">
                <div className="pillar">
                <span>🌿</span>
                <div><strong>Gentle Approach</strong><p>Anxiety-free environment for all ages</p></div>
                </div>
                <div className="pillar">
                <span>🔬</span>
                <div><strong>Modern Tech</strong><p>Digital X-rays, 3D scans, laser dentistry</p></div>
                </div>
                <div className="pillar">
                <span>🤝</span>
                <div><strong>Walk-ins Welcome</strong><p>No appointment needed for urgent care</p></div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>

    {/* TEAM */}
    <section id="team">
        <div className="section-inner">
        <div className="section-tag">Meet the Team</div>
        <h2 className="section-title">The people behind <em>your smile</em></h2>
        <div className="team-grid">
            <div className="team-card" data-aos>
              <h3>Dr. Prithviraj Sowdermett</h3>
              <p className="team-role">Lead Dentist & Founder</p>
              <p className="team-bio">DDS, University of Toronto. 10 years experience in general and cosmetic dentistry.</p>
            </div>
            <div className="team-card" data-aos>
              <h3>Dr. Rohan Patel</h3>
              <p className="team-role">Orthodontist</p>
              <p className="team-bio">MSc Orthodontics, McGill. Specializes in Invisalign and early childhood alignment.</p>
            </div>
            <div className="team-card" data-aos>
              <h3>Dr. Kate Spade</h3>
              <p className="team-role">Pediatric Dentist</p>
              <p className="team-bio">In the Canadian Academy of Pediatric Dentistry. Creates a fun, welcoming environment for kids.</p>
            </div>
        </div>
        </div>
    </section>

    {/* BOOKING SECTION */}
    <section id="booking">
    <div className="section-inner">
      <div className="booking-wrap">
        <div className="booking-left" data-aos>
          <div className="section-tag">Book Online</div>
          <h2>Ready for your <em>best smile?</em></h2>
          <p>Choose your preferred service, date, and dentist. We'll confirm within 2 hours.</p>
          <div className="booking-perks">
            <div>✓ No referral needed</div>
            <div>✓ Most insurance accepted</div>
            <div>✓ Same-day emergency slots</div>
          </div>
        </div>
        <div className="booking-form-wrap">

        {!confirmed ? (
            <form
            className="booking-form"
            onSubmit={handleSubmit}
            >
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? "error" : ""}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? "error" : ""}
                />
              </div>
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (optional)"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                />  
            </div>

            <div className="form-row">
              <div className="form-group">
                <label for="service">Service</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={errors.service ? "error" : ""}
                >
                  <option value="" disabled selected>Select a service</option>
                  <option>General Cleaning</option>
                  <option>Teeth Whitening</option>
                  <option>Root Canal</option>
                  <option>Orthodontics Consult</option>
                  <option>Pediatric Exam</option>
                  <option>Dental Implant Consult</option>
                  <option>Emergency / Other</option>
                </select>
              </div>
              <div className="form-group">
                <label for="dentist">Preferred Dentist</label>
                <select
                  name="dentist"
                  value={formData.dentist}
                  onChange={handleChange}
                  className={errors.dentist ? "error" : ""}
                >
                  <option value="" disabled selected>No preference</option>
                  <option>Dr. Prithviraj Sowdermett</option>
                  <option>Dr. Rohan Patel</option>
                  <option>Dr. Kate Spade</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label for="apptDate">Preferred Date</label>
                <input
                  type="date"
                  name="apptDate"
                  min={tomorrow}
                  value={formData.apptDate}
                  onChange={handleChange}
                  className={errors.apptDate ? "error" : ""}
                />
              </div>
              <div className="form-group">
                <label for="apptTime">Preferred Time</label>
                <select
                  name="apptTime"
                  value={formData.apptTime}
                  onChange={handleChange}
                  className={errors.apptTime ? "error" : ""}
                >
                  <option value="" disabled selected>Select time</option>
                  <option>8:00 AM</option>
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>1:00 PM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                  <option>5:00 PM</option>
                  <option>6:00 PM</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label for="notes">Additional Notes (optional)</label>
              <textarea id="notes" rows="3" placeholder="Any concerns, dental history, or questions…"></textarea>
            </div>

            <button
                type="submit"
                className="btn-submit"
                disabled={loading}
            >
                {loading
                ? "Confirming..."
                : "Confirm Appointment"}
            </button>
            </form>
        ) : (
            <div className="booking-confirmation show">
            <div className="confirm-icon">✅</div>

            <h3>Appointment Requested!</h3>

            <p>{confirmationText}</p>

            <p className="confirm-note">
                We'll send a confirmation to your email
                within 2 hours. See you soon!
            </p>

            <button
                className="btn-ghost"
                onClick={handleBookAnother}
            >
                Book Another
            </button>
            </div>
        )}
        </div>
      </div>
    </div>
    </section>

    {/* CONTACT */}
    <section id="contact">
      <div className="section-inner">
        <div className="contact-grid">
          <div className="contact-info" data-aos>
            <div className="section-tag">Get In Touch</div>
            <h2>We're here <em>for you</em></h2>
            <div className="contact-items">
              <div className="contact-item">
                <span>📞</span>
                <div>
                  <strong>Phone</strong>
                  <p><a href="tel:+1234567890">(123) 456-7890</a></p>
                </div>
              </div>
              <div className="contact-item">
                <span>✉️</span>
                <div>
                  <strong>Email</strong>
                  <p><a href="mailto:hello@evergreensmile.com">hello@evergreensmile.com</a></p>
                </div>
              </div>
              <div className="contact-item">
                <span>📍</span>
                <div>
                  <strong>Address</strong>
                  <p>123 Dental Street, Ottawa, ON K1A B2C</p>
                </div>
              </div>
              <div className="contact-item">
                <span>🚗</span>
                <div>
                  <strong>Parking</strong>
                  <p>Free parking on site</p>
                </div>
              </div>
            </div>
          </div>
          <div className="map-wrap" data-aos>
            <div className="map-placeholder">
              <span>🗺</span>
              <p>123 Dental Street, Ottawa</p>
              <a href="https://maps.google.com/?q=123+Dental+Street+Ottawa" target="_blank" className="btn-ghost">Open in Maps →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* FOOTER */}
    <footer id="footer">
        <div className="footer-inner">
            <div className="footer-brand">
                <span className="brand-leaf">✦</span>
                <span className="brand-name">EvergreenSmile</span>
                <p>Warm, gentle dental care for the family.<br />Ottawa, ON</p>
            </div>
            <div className="footer-links">
                <h4>Quick Links</h4>
                <a href="#services">Services</a>
                <a href="#about">About</a>
                <a href="#team">Our Team</a>
                <a href="#booking">Book Appointment</a>
                <a href="#contact">Contact</a>
            </div>
            <div className="footer-contact">
                <h4>Contact</h4>
                <p>📞 (123) 456-7890</p>
                <p>✉️ hello@evergreensmile.com</p>
                <p>📍 123 Dental Street, Ottawa</p>
            </div>
        </div>
        <div className="footer-bottom">
            <p>Built with React, HTML, CSS, JavaScript &amp; Bootstrap 5</p>
            <p>Designed by <a href="https://sprithvi10.github.io/seg3125-portfolio/">Prithviraj Sowdermett</a> · SEG3125 · uOttawa</p>
        </div>
    </footer>
    </>
  );
}

export default App;