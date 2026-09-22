import React, { useState } from "react";
import data from "../data.json";

const LOGO_URL = "https://warpigc.github.io/Sign-ate-2/acropolis-logo.svg";
const { meta } = data;

const dividerText = "______________________";

// Consistent font size for Gmail — 13px matches Gmail's "Normal"
const P = 'style="margin:3px 0;font-size:13px;color:#333;"';

const GeneratedSignature = ({ formData }) => {
  const [copied, setCopied] = useState(false);

  if (!formData) return null;

  const {
    name = "",
    institution = "",
    department = "",
    designation = "",
    position = "",
    workNumber = "",
    phone = "",
    email = "",
    linkedin = "",
    personalWebsite = { category: "", url: "" },
    showThirdLink = false,
    thirdLink = { name: "", url: "" },
    extraContent = "",
    showInstitutions = false,
    showAddress = false,
  } = formData;

  const hasExtraContent =
    extraContent &&
    extraContent !== "<p><br></p>" &&
    extraContent !== "<p></p>";

  const showFooterDivider = showInstitutions || showAddress;

  // Build the links array
  const linkItems = [];
  if (linkedin) linkItems.push({ label: "LinkedIn", url: linkedin });
  if (personalWebsite.category && personalWebsite.url)
    linkItems.push({ label: personalWebsite.category, url: personalWebsite.url });
  if (showThirdLink && thirdLink.name && thirdLink.url)
    linkItems.push({ label: thirdLink.name, url: thirdLink.url });

  // Preview styles
  const s = { margin: "3px 0", lineHeight: "1.4", fontSize: "13px", color: "#333" };
  const linkStyle = { color: "#1a0dab", textDecoration: "none" };

  // ── HTML builders for clipboard ────────────────────────────────────────
  const buildLinksHtml = () =>
    linkItems
      .map((l) => `<a href="${l.url}" style="color:#1a0dab;text-decoration:none;font-size:13px;">${l.label}</a>`)
      .join(' <span style="color:#555;font-size:13px;"> | </span> ');

  const buildInstitutionsHtml = () =>
    meta.institutionsList
      .map((i) => `<p style="margin:1px 0;font-size:13px;color:#333;">${i}</p>`)
      .join("\n");

  const buildAddressHtml = () => `
<p style="margin:1px 0;font-size:13px;color:#333;padding-top:14px;white-space:nowrap;">
  <b>${meta.campusAddress.label}:</b> ${meta.campusAddress.text}
  <a href="${meta.campusAddress.url}" style="color:#1a0dab;font-size:13px;">${meta.campusAddress.linkText}</a>
</p>
<p style="margin:1px 0;font-size:13px;color:#333;white-space:nowrap;">
  <b>${meta.cityOffice.label}:</b> ${meta.cityOffice.text}
  <a href="${meta.cityOffice.url}" style="color:#1a0dab;font-size:13px;">${meta.cityOffice.linkText}</a>
</p>`;

  const getClipboardHtml = () => `
<div style="font-family:Arial,sans-serif;max-width:500px;line-height:1.4;color:#333;">

<p ${P}><b>${dividerText}</b></p>
<p style="margin:3px 0;color:#343579;font-size:13px;font-weight:bold;">${name}</p>
${institution ? `<p ${P}>${institution}</p>` : ""}
${department ? `<p ${P}>${department}</p>` : ""}
${designation ? `<p ${P}>${designation}</p>` : ""}
${position ? `<p ${P}>${position}</p>` : ""}

<p ${P}><b>${dividerText}</b></p>
${workNumber ? `<p style="margin:3px 0 0;font-size:13px;color:#333;"><b>W-</b> ${workNumber}</p>` : ""}
${phone ? `<p style="margin:3px 0 0;font-size:13px;color:#333;"><b>P-</b> <a href="tel:${phone}" style="color:#1a0dab;font-size:13px;">${phone}</a></p>` : ""}
${email ? `<p style="margin:3px 0 0;font-size:13px;color:#333;"><b>M-</b> <a href="mailto:${email}" style="color:#1a0dab;font-size:13px;">${email}</a></p>` : ""}

<p style="margin:10px 0 0;"><img src="${LOGO_URL}" width="200" alt="Acropolis Logo" style="display:block;" /></p>
<p style="margin:10px 0 0;font-size:13px;color:#333;"><a href="${meta.groupWebsiteUrl}" style="color:#1a0dab;font-size:13px;">${meta.groupWebsiteUrl}</a></p>
${linkItems.length > 0 ? `<p style="margin:7px 0 0;font-size:13px;color:#333;">${buildLinksHtml()}</p>` : ""}
${hasExtraContent ? `<div style="margin-top:6px;font-size:13px;"><style>div p{margin:3px 0 !important;}</style>${extraContent}</div>` : ""}

${showFooterDivider ? `<p ${P}><b>${dividerText}</b></p>` : ""}
${showInstitutions ? buildInstitutionsHtml() : ""}
${showAddress ? buildAddressHtml() : ""}

</div>`;

  const copyHtmlToClipboard = () => {
    const html = getClipboardHtml();
    const listener = (e) => {
      e.clipboardData.setData("text/html", html);
      e.clipboardData.setData("text/plain", html.replace(/<[^>]+>/g, ""));
      e.preventDefault();
    };
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isEmpty = !name && !institution;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", color: "#333", lineHeight: "1.4" }}>
      {isEmpty ? (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "#ccc" }}>
          <p style={{ margin: 0, fontSize: "13px" }}>Start filling in the form to see your signature.</p>
        </div>
      ) : (
        <>
          <p style={s}><b>{dividerText}</b></p>
          <p style={{ ...s, color: "#343579", fontSize: "13px", fontWeight: "bold" }}>{name}</p>
          {institution && <p style={s}>{institution}</p>}
          {department && <p style={s}>{department}</p>}
          {designation && <p style={s}>{designation}</p>}
          {position && <p style={s}>{position}</p>}

          <p style={s}><b>{dividerText}</b></p>

          {workNumber && <p style={{ ...s, marginTop: "3px" }}><b>W-</b> {workNumber}</p>}
          {phone && <p style={{ ...s, marginTop: "3px" }}><b>P-</b> <a href={`tel:${phone}`} style={linkStyle}>{phone}</a></p>}
          {email && <p style={{ ...s, marginTop: "3px" }}><b>M-</b> <a href={`mailto:${email}`} style={linkStyle}>{email}</a></p>}

          <p style={{ margin: "10px 0 0" }}>
            <img
              src={process.env.PUBLIC_URL + "/" + meta.logo}
              width="180"
              alt="Acropolis Logo"
              style={{ display: "block" }}
            />
          </p>

          <p style={{ ...s, marginTop: "10px" }}>
            <a href={meta.groupWebsiteUrl} style={linkStyle}>
              {meta.groupWebsiteUrl}
            </a>
          </p>

          {linkItems.length > 0 && (
            <p style={{ ...s, marginTop: "7px" }}>
              {linkItems.map((l, i) => (
                <span key={l.label}>
                  {i > 0 && <span style={{ color: "#555" }}> | </span>}
                  <a href={l.url} style={linkStyle}>{l.label}</a>
                </span>
              ))}
            </p>
          )}

          {hasExtraContent && (
            <div style={{ marginTop: "6px", fontSize: "13px" }} dangerouslySetInnerHTML={{ __html: extraContent }} className="sig-extra" />
          )}

          {showFooterDivider && <p style={s}><b>{dividerText}</b></p>}

          {showInstitutions && (
            <div>
              {meta.institutionsList.map((inst) => (
                <p key={inst} style={{ margin: "1px 0", fontSize: "13px", color: "#333", lineHeight: "1.4" }}>{inst}</p>
              ))}
            </div>
          )}

          {showAddress && (
            <div style={{ paddingTop: "14px" }}>
              <p style={{ margin: "1px 0", fontSize: "13px", color: "#333", lineHeight: "1.4", whiteSpace: "nowrap" }}>
                <b>{meta.campusAddress.label}:</b> {meta.campusAddress.text}{" "}
                <a href={meta.campusAddress.url} style={linkStyle}>{meta.campusAddress.linkText}</a>
              </p>
              <p style={{ margin: "1px 0", fontSize: "13px", color: "#333", lineHeight: "1.4", whiteSpace: "nowrap" }}>
                <b>{meta.cityOffice.label}:</b> {meta.cityOffice.text}{" "}
                <a href={meta.cityOffice.url} style={linkStyle}>{meta.cityOffice.linkText}</a>
              </p>
            </div>
          )}
        </>
      )}

      <button
        onClick={copyHtmlToClipboard}
        disabled={isEmpty}
        style={{
          marginTop: "16px",
          padding: "8px 20px",
          backgroundColor: copied ? "#198754" : "#0d6efd",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: isEmpty ? "not-allowed" : "pointer",
          fontWeight: "600",
          fontSize: "13px",
          transition: "background-color 0.3s",
          opacity: isEmpty ? 0.5 : 1,
        }}
      >
        {copied ? "✅ Copied!" : "Copy Email Signature"}
      </button>
    </div>
  );
};

export default GeneratedSignature;
