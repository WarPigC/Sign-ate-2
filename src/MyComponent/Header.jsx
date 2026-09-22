import React from "react";

const Header = () => {
  return (
    <header
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        padding: "0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle decorative accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #e94560, #0f3460, #e94560)",
        }}
      />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 32px",
        }}
      >
        {/* Logo + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img
            src={process.env.PUBLIC_URL + "/acropolis-logo.svg"}
            alt="Acropolis Logo"
            style={{
              height: "48px",
              width: "auto",
              filter: "brightness(0) invert(1)",
              opacity: 0.9,
            }}
          />
          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.2)", paddingLeft: "16px" }}>
            <h1
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: "700",
                color: "#fff",
                letterSpacing: "0.5px",
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              Email Signature Generator
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: "11px",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              Acropolis Group of Institutions
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;