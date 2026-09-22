import React, { useState } from "react";
import data from "../data.json";
import { Form, Button, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "bootstrap/dist/css/bootstrap.min.css";
import GeneratedSignature from "./GeneratedSignature";

// ── Build react-select options from data.json ────────────────────────────
const institutionOptions = data.institutions.map((inst) => ({
  value: inst,
  label: inst,
}));

const departmentOptions = Object.entries(data.departments).flatMap(([group, depts]) =>
  depts.map((dept) => ({ value: dept, label: dept, group }))
);

const groupedDeptOptions = Object.entries(data.departments).map(([group, depts]) => ({
  label: group,
  options: depts.map((dept) => ({ value: dept, label: dept })),
}));

// ── Helpers ──────────────────────────────────────────────────────────────
const sectionHeader = (label) => (
  <div style={{ borderBottom: "2px solid #dee2e6", marginBottom: "16px", marginTop: "28px", paddingBottom: "6px" }}>
    <span style={{ fontWeight: "700", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.8px", color: "#6c757d" }}>
      {label}
    </span>
  </div>
);

const renderTooltip = (text) => <Tooltip>{text}</Tooltip>;

const infoIcon = (text) => (
  <OverlayTrigger placement="right" overlay={renderTooltip(text)}>
    <span style={{ cursor: "pointer", color: "#0d6efd", border: "1px solid #0d6efd", borderRadius: "50%", padding: "0 5px", fontSize: "11px", marginLeft: "6px", fontWeight: "bold" }}>i</span>
  </OverlayTrigger>
);

const selectStyles = {
  control: (base, state) => ({
    ...base,
    borderColor: state.isFocused ? "#86b7fe" : "#ced4da",
    boxShadow: state.isFocused ? "0 0 0 0.25rem rgba(13,110,253,.25)" : "none",
    "&:hover": { borderColor: "#86b7fe" },
    fontSize: "14px",
    minHeight: "38px",
  }),
  option: (base, state) => ({
    ...base,
    fontSize: "14px",
    backgroundColor: state.isSelected ? "#0d6efd" : state.isFocused ? "#e8f0fe" : "white",
    color: state.isSelected ? "white" : "#333",
  }),
  groupHeading: (base) => ({
    ...base,
    fontSize: "11px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color: "#6c757d",
    backgroundColor: "#f8f9fa",
    padding: "6px 12px",
  }),
  placeholder: (base) => ({ ...base, color: "#adb5bd", fontSize: "14px" }),
  menu: (base) => ({ ...base, zIndex: 9999 }),
};

// ── Component ─────────────────────────────────────────────────────────────
const EmailSignatureForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    department: "",
    designation: "",
    position: "",
    workNumber: "",
    phone: "",
    email: "",
    linkedin: "",
    personalWebsite: { category: "", url: "" },
    showThirdLink: false,
    thirdLink: { name: "", url: "" },
    extraContent: "",
    showInstitutions: false,
    showAddress: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handlePersonalWebsiteChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      personalWebsite: { ...prev.personalWebsite, [name]: value },
    }));
    if (errors[`personalWebsite${name.charAt(0).toUpperCase() + name.slice(1)}`]) {
      setErrors((prev) => ({ ...prev, [`personalWebsite${name.charAt(0).toUpperCase() + name.slice(1)}`]: undefined }));
    }
  };

  const handleThirdLinkChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, thirdLink: { ...prev.thirdLink, [name]: value } }));
    if (errors[`thirdLink${name.charAt(0).toUpperCase() + name.slice(1)}`]) {
      setErrors((prev) => ({ ...prev, [`thirdLink${name.charAt(0).toUpperCase() + name.slice(1)}`]: undefined }));
    }
  };

  const handleDepartmentChange = (selected) => {
    setFormData((prev) => ({ ...prev, department: selected ? selected.value : "" }));
  };

  const handleQuillChange = (value) => {
    setFormData((prev) => ({ ...prev, extraContent: value }));
  };

  const validate = () => {
    const newErrors = {};
    const { personalWebsite, showThirdLink, thirdLink } = formData;
    if (personalWebsite.category && !personalWebsite.url)
      newErrors.personalWebsiteUrl = "Please enter a URL for the selected category.";
    if (personalWebsite.url && !personalWebsite.category)
      newErrors.personalWebsiteCategory = "Please select a category for this URL.";
    if (showThirdLink) {
      if (!thirdLink.name) newErrors.thirdLinkName = "Please enter a name for the third link.";
      if (!thirdLink.url) newErrors.thirdLinkUrl = "Please enter a URL for the third link.";
    }
    return newErrors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to first error
      const first = document.querySelector(".is-invalid, [data-error]");
      if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setErrors({});
  };

  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const selectedDeptOption = departmentOptions.find((o) => o.value === formData.department) || null;

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div className="container-fluid mt-4" style={{ fontFamily: "'Roboto', sans-serif", maxWidth: "1400px" }}>

      <Row>
        {/* ── LEFT: Form ─────────────────────────────────────────────────── */}
        <Col lg={6}>
          <Form
            onSubmit={handleFormSubmit}
            className="bg-light rounded p-4 shadow-sm"
            style={{ marginBottom: "50px" }}
          >
            {/* ── Personal Info ─── */}
            {sectionHeader("Personal Info")}

            <Form.Group className="mb-3">
              <Form.Label>Name <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Institution <span className="text-danger">*</span></Form.Label>
              <Select
                options={institutionOptions}
                value={institutionOptions.find((o) => o.value === formData.institution) || null}
                onChange={(selected) => setFormData((prev) => ({ ...prev, institution: selected ? selected.value : "" }))}
                isClearable
                isSearchable
                placeholder="Search or select institution…"
                styles={selectStyles}
                noOptionsMessage={() => "No matching institution"}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Department {infoIcon("Start typing to search departments")}</Form.Label>
              <Select
                options={groupedDeptOptions}
                value={selectedDeptOption}
                onChange={handleDepartmentChange}
                isClearable
                isSearchable
                placeholder="Search or select department…"
                styles={selectStyles}
                noOptionsMessage={() => "No matching department"}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="e.g. Associate Professor"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Additional Positions {infoIcon("Separate multiple positions with a comma")}</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g. Coordinator, Mentor"
              />
            </Form.Group>

            {/* ── Contact ─── */}
            {sectionHeader("Contact")}

            <Row className="mb-3">
              <Col>
                <Form.Label>Work Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="workNumber"
                  value={formData.workNumber}
                  onChange={handleChange}
                  placeholder="e.g. 0731-452001"
                />
              </Col>
              <Col>
                <Form.Label>Phone <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 9876543210"
                  required
                />
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Email <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. name@acropolis.in"
                required
              />
            </Form.Group>

            {/* ── Links ─── */}
            {sectionHeader("Links")}

            <Form.Group className="mb-3">
              <Form.Label>LinkedIn <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Personal Website {infoIcon("Both category and URL must be filled together")}</Form.Label>
              <Row>
                <Col xs={4}>
                  <Form.Select
                    name="category"
                    value={formData.personalWebsite.category}
                    onChange={handlePersonalWebsiteChange}
                    isInvalid={!!errors.personalWebsiteCategory}
                    className={errors.personalWebsiteCategory ? "is-invalid" : ""}
                  >
                    <option value="">Category</option>
                    <option value="Portfolio">Portfolio</option>
                    <option value="Scholar">Scholar</option>
                    <option value="Personal">Personal</option>
                  </Form.Select>
                  {errors.personalWebsiteCategory && (
                    <div className="invalid-feedback d-block">{errors.personalWebsiteCategory}</div>
                  )}
                </Col>
                <Col>
                  <Form.Control
                    type="url"
                    name="url"
                    value={formData.personalWebsite.url}
                    onChange={handlePersonalWebsiteChange}
                    placeholder="https://yourwebsite.com"
                    className={errors.personalWebsiteUrl ? "is-invalid" : ""}
                  />
                  {errors.personalWebsiteUrl && (
                    <div className="invalid-feedback d-block">{errors.personalWebsiteUrl}</div>
                  )}
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="showThirdLink"
                name="showThirdLink"
                label="Add a third link"
                checked={formData.showThirdLink}
                onChange={handleChange}
              />
              {formData.showThirdLink && (
                <Row className="mt-2">
                  <Col xs={4}>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.thirdLink.name}
                      onChange={handleThirdLinkChange}
                      placeholder="Link name"
                      className={errors.thirdLinkName ? "is-invalid" : ""}
                    />
                    {errors.thirdLinkName && (
                      <div className="invalid-feedback d-block">{errors.thirdLinkName}</div>
                    )}
                  </Col>
                  <Col>
                    <Form.Control
                      type="url"
                      name="url"
                      value={formData.thirdLink.url}
                      onChange={handleThirdLinkChange}
                      placeholder="URL"
                      className={errors.thirdLinkUrl ? "is-invalid" : ""}
                    />
                    {errors.thirdLinkUrl && (
                      <div className="invalid-feedback d-block">{errors.thirdLinkUrl}</div>
                    )}
                  </Col>
                </Row>
              )}
            </Form.Group>

            {/* ── Additional Info ─── */}
            {sectionHeader("Additional Information")}

            <Form.Group className="mb-3">
              <div style={{ backgroundColor: "white", borderRadius: "4px" }}>
                <ReactQuill
                  theme="snow"
                  modules={quillModules}
                  value={formData.extraContent}
                  onChange={handleQuillChange}
                  placeholder="Add any quotes, disclaimers, or extra details…"
                />
              </div>
            </Form.Group>

            {/* ── Footer Options ─── */}
            {sectionHeader("Signature Footer")}

            <div className="p-3 rounded" style={{ backgroundColor: "white", border: "1px solid #dee2e6" }}>
              <Form.Check
                type="switch"
                id="showInstitutions"
                name="showInstitutions"
                label="Include list of Acropolis institutions"
                checked={formData.showInstitutions}
                onChange={handleChange}
                className="mb-2"
              />
              <Form.Check
                type="switch"
                id="showAddress"
                name="showAddress"
                label="Include campus address"
                checked={formData.showAddress}
                onChange={handleChange}
              />
            </div>
          </Form>
        </Col>

        {/* ── RIGHT: Live Preview ─────────────────────────────────────────── */}
        <Col lg={6}>
          <div
            style={{
              position: "sticky",
              top: "20px",
              backgroundColor: "#fff",
              border: "1px solid #dee2e6",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              maxHeight: "calc(100vh - 40px)",
              overflowY: "auto",
            }}
          >
            <div style={{ marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid #dee2e6" }}>
              <span style={{ fontWeight: "700", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.8px", color: "#6c757d" }}>
                Preview
              </span>
            </div>
            <GeneratedSignature formData={formData} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EmailSignatureForm;
