"use client";

import { useState } from "react";
import Link from "next/link";

export default function PhonePage() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = window.localStorage.getItem("theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
      }
    }
    return "dark";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme === "dark" ? "light" : "dark");
      window.localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    }
  };

  return (
    <>
      <div className="mobileNav">
        <Link href="/" style={{ fontWeight: 600 }}>Back</Link>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          <i className={`fa-solid ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
        </button>
      </div>

      <main style={{ marginLeft: 0, width: "100%" }}>
        <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "4rem 2rem" }}>
          <div className="section-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h2 className="section-title">Phone</h2>
            <div style={{ maxWidth: "600px", marginBottom: "3rem" }}>
              <div style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: "16px", padding: "2rem", textAlign: "center" }}>
                <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: "1.5rem", lineHeight: "1.6" }}>
                  My phone number is <span style={{ fontWeight: 700, color: "var(--text)" }}>available on request</span>. Please reach out via email or any of my social media channels and I&apos;ll be happy to provide it.
                </p>
                <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "2rem" }}>
                  <span style={{ color: "var(--accent)", fontWeight: 600 }}>Email:</span> mindrilavasilevalentin@gmail.com
                </p>
                <Link href="/" style={{ display: "inline-block", padding: "0.8rem 1.8rem", background: "var(--accent)", color: "white", textDecoration: "none", borderRadius: "8px", fontWeight: 600, transition: "background-color 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--accent-hover)")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--accent)")}>
                  ← Back to Portfolio
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
