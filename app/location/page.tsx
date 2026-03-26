export default function LocationPage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "rgb(42, 42, 42)", color: "white", fontFamily: "Poppins, sans-serif", padding: "24px" }}>
      <section style={{ textAlign: "center", border: "2px solid rgb(84, 84, 84)", borderRadius: "16px", padding: "24px 32px", background: "rgb(52, 52, 52)" }}>
        <h1 style={{ marginTop: 0 }}>Location</h1>
        <p style={{ fontSize: "1.1rem", marginBottom: "14px" }}>Suceava, Romania</p>
        <a href="/" style={{ color: "#7bc8ff", fontWeight: 700 }}>Back to portfolio</a>
      </section>
    </main>
  );
}
