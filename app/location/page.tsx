"use client";

import { useState } from "react";
import Link from "next/link";

export default function LocationPage() {
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
            <h2 className="section-title">Location</h2>
            <div style={{ maxWidth: "600px", marginBottom: "3rem" }}>
              <div style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: "16px", padding: "2rem", textAlign: "center" }}>
                <i className="fa-solid fa-location-dot" style={{ fontSize: "3rem", color: "var(--accent)", marginBottom: "1.5rem", display: "block" }}></i>
                <p style={{ fontSize: "1.3rem", color: "var(--text)", fontWeight: 700, marginBottom: "0.5rem" }}>Suceava, Romania</p>
                <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "2rem", lineHeight: "1.6" }}>
                  Located in Suceava, I&apos;m open to remote opportunities worldwide and occasional travel for in-person collaboration.
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
