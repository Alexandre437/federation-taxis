export default function Courriers() {
  return (
    <div style={{ minHeight: "60vh" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
        Courriers
      </h1>
      <p>
        Ici seront publiés les courriers envoyés par la Fédération des Taxis de Genève.
      </p>

      <ul style={{ marginTop: "16px", lineHeight: "1.6" }}>
        <li>
          <a href="/docs/courrier-janvier.pdf" target="_blank" style={{ color: "#facc15" }}>
            📄 Courrier de Janvier 2025
          </a>
        </li>
        <li>
          <a href="/docs/courrier-fevrier.pdf" target="_blank" style={{ color: "#facc15" }}>
            📄 Courrier de Février 2025
          </a>
        </li>
      </ul>
    </div>
  );
}
