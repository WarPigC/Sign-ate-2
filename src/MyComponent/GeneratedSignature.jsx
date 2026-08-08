import React from "react";

const GeneratedSignature = ({ formData }) => {
  if (!formData) return null;

  const {
    name = "",
    institution = "",
    department = "",
    designation = "",
    position = "", // additional positions
    workNumber = "",
    phone = "",
    email = "",
    socialMedia = {},
    extraContent = "", // now HTML
    college = "AITR",
  } = formData;

  let fullDesignation = "";
  if (designation === "Dr.") fullDesignation = "Dr.";
  else if (designation === "Prof.") fullDesignation = "Professor";
  else if (designation === "HOD") fullDesignation = "Head Of Department";
  else fullDesignation = designation;

  const collegeData = {
    AITR: { link: "https://aitr.ac.in/", logo: "https://aimsr.ac.in/wp-content/uploads/2023/03/AITR-logo.jpg" },
    AGI: { link: "https://acropolis.in/", logo: "https://aimsr.ac.in/wp-content/uploads/2023/03/AITR-logo.jpg" },
    AFMR: { link: "https://afmr.ac.in/", logo: "https://aimsr.ac.in/wp-content/uploads/2023/03/AITR-logo.jpg" },
    AIPER: { link: "https://aiper.ac.in/", logo: "https://aimsr.ac.in/wp-content/uploads/2023/03/AITR-logo.jpg" },
    AIMSR: { link: "https://aimsr.ac.in/", logo: "https://aimsr.ac.in/wp-content/uploads/2023/03/AITR-logo.jpg" },
    AIL: { link: "https://www.acropolislaw.in/", logo: "https://aimsr.ac.in/wp-content/uploads/2023/03/AITR-logo.jpg" },
    FTL: { link: "https://acrolabs.in/", logo: "https://acrolabs.in/wp-content/uploads/2023/08/Acro_White-Logo-02-300x72.png" },
  };

  const selectedCollege = collegeData[college] || collegeData.AITR;
  
  const hasExtraContent = extraContent && extraContent !== "<p><br></p>" && extraContent !== "<p></p>";

  const baseText = { margin: "3px 0", lineHeight: "1.2" };

  const copyHtmlToClipboard = () => {
    const html = `
<div style="font-family:Arial;width:400px;line-height:1.2">

<p style="margin:3px 0;"><b>______________________</b></p>

<p style="margin:3px 0;color:#343579;font-size:18px;font-weight:bold;">${name}</p>
${institution ? `<p style="margin:3px 0;">${institution}</p>` : ""}
${department ? `<p style="margin:3px 0;">${department}</p>` : ""}
${fullDesignation ? `<p style="margin:3px 0;">${fullDesignation}</p>` : ""}
${position ? `<p style="margin:3px 0;">${position}</p>` : ""}

<p style="margin:3px 0;"><b>______________________</b></p>

${workNumber ? `<p style="margin:3px 0;"><b>W-</b> ${workNumber}</p>` : ""}
${phone ? `<p style="margin:3px 0;"><b>P-</b> ${phone}</p>` : ""}
${email ? `<p style="margin:3px 0;"><b>M-</b> ${email}</p>` : ""}

<img src="${selectedCollege.logo}" width="200" style="margin-top: 10px;"/>

<p style="margin:3px 0;">
<a href="${selectedCollege.link}">For more details</a>
</p>

${socialMedia.linkedin ? `<a href="${socialMedia.linkedin}"><img src="https://cdn3.iconfinder.com/data/icons/picons-social/57/11-linkedin-512.png" width="18"/></a> ` : ""}
${socialMedia.portfolio ? `<a href="${socialMedia.portfolio}"><img src="https://cdn-icons-png.flaticon.com/512/1006/1006771.png" width="18"/></a> ` : ""}
${socialMedia.otherlinks ? `<a href="${socialMedia.otherlinks}"><img src="https://cdn-icons-png.flaticon.com/512/1006/1006771.png" width="18"/></a>` : ""}

${hasExtraContent ? `<div style="margin-top:10px;">${extraContent}</div>` : ""}

</div>
`;

    const el = document.createElement("div");
    el.innerHTML = html;
    document.body.appendChild(el);
    const range = document.createRange();
    range.selectNode(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand("copy");
    document.body.removeChild(el);
    alert("Copied");
  };

  return (
    <div style={{ fontFamily: "Arial", width: "400px", margin: "20px auto", padding: "15px", boxShadow: "0 0 6px #343579", lineHeight: "1.2" }}>
      <p style={baseText}><b>______________________</b></p>
      <p style={{ ...baseText, color: "#343579", fontSize: "18px", fontWeight: "bold" }}>{name}</p>
      {institution && <p style={baseText}>{institution}</p>}
      {department && <p style={baseText}>{department}</p>}
      {fullDesignation && <p style={baseText}>{fullDesignation}</p>}
      {position && <p style={baseText}>{position}</p>}

      <p style={baseText}><b>______________________</b></p>

      {workNumber && <p style={baseText}><b>W-</b> {workNumber}</p>}
      {phone && <p style={baseText}><b>P-</b> {phone}</p>}
      {email && <p style={baseText}><b>M-</b> {email}</p>}

      <img src={selectedCollege.logo} width="200" alt="" style={{ marginTop: "10px" }} />
      <p style={baseText}><a href={selectedCollege.link}>For more details</a></p>

      <div>
        {socialMedia.linkedin && <a href={socialMedia.linkedin}><img src="https://cdn3.iconfinder.com/data/icons/picons-social/57/11-linkedin-512.png" width="18" alt="" /></a>}
        {socialMedia.portfolio && <a href={socialMedia.portfolio} style={{ marginLeft: "5px" }}><img src="https://cdn-icons-png.flaticon.com/512/1006/1006771.png" width="18" alt="" /></a>}
        {socialMedia.otherlinks && <a href={socialMedia.otherlinks} style={{ marginLeft: "5px" }}><img src="https://cdn-icons-png.flaticon.com/512/1006/1006771.png" width="18" alt="" /></a>}
      </div>

      {hasExtraContent && (
        <div style={{ marginTop: "10px" }} dangerouslySetInnerHTML={{ __html: extraContent }} />
      )}

      <button onClick={copyHtmlToClipboard} className="btn btn-primary mt-3">
        Copy Email Signature
      </button>
    </div>
  );
};

export default GeneratedSignature;
