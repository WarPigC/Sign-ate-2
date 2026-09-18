import React, { useState } from "react";
import data from "../data.json";
import {
  Form,
  Button,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "bootstrap/dist/css/bootstrap.min.css";
import GeneratedSignature from "./GeneratedSignature";

const EmailSignatureForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    department: "",
    designation: "",
    position: "", // Additional Positions
    workNumber: "",
    phone: "",
    email: "",
    college: "", // Website / College
    socialMedia: {
      linkedin: "",
      portfolio: "",
      otherlinks: "",
    },
    extraContent: "", // Now Rich Text HTML
  });

  const [generatedSignature, setGeneratedSignature] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      socialMedia: { ...prevData.socialMedia, [name]: value },
    }));
  };

  const handleQuillChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      extraContent: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setGeneratedSignature(true);
  };

  // Tooltip helper
  const renderTooltip = (text) => (
    <Tooltip>{text}</Tooltip>
  );

  const quillModules = {
    toolbar: [
      [{ font: [] }, { header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ direction: "rtl" }, { align: [] }],
      ["link", "image", "video", "formula"],
      ["clean"],
    ],
  };

  return (
    <div className="container mt-5" style={{ fontFamily: "'Roboto', sans-serif" }}>
      <div className="text-center mb-5">
        <h2 style={{ fontWeight: "800", color: "#2c3e50", letterSpacing: "1px" }}>
          Acropolis Email Signature Generator.
        </h2>
      </div>

      <Form
        onSubmit={handleFormSubmit}
        className="bg-light rounded p-4 shadow"
        style={{ marginBottom: "50px" }}
      >
        {/* 1. Name */}
        <Form.Group className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* 2. Institution */}
        <Form.Group className="mb-3">
          <Form.Label>Institution:</Form.Label>
          <Form.Select
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            required
          >
            <option value="">Select Institution</option>
            {data.institutions.map((inst) => (
              <option key={inst} value={inst}>{inst}</option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* 3. Department */}
        <Form.Group className="mb-3">
          <Form.Label>Department:</Form.Label>
          <Form.Select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            {Object.entries(data.departments).map(([group, depts]) => (
              <optgroup key={group} label={group}>
                {depts.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </optgroup>
            ))}
          </Form.Select>
        </Form.Group>

        {/* 4. Designation */}
        <Form.Group className="mb-3">
          <Form.Label>Designation:</Form.Label>
          <Form.Control
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Enter designation"
          />
        </Form.Group>

        {/* 5. Additional Positions */}
        <Form.Group className="mb-3">
          <Form.Label>Additional Positions:</Form.Label>
          <Form.Control
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Add comma to add multiple names (e.g. Coordinator, Mentor).
          </Form.Text>
        </Form.Group>

        {/* 6. Work Number */}
        <Form.Group className="mb-3">
          <Form.Label>Work Number:</Form.Label>
          <Form.Control
            type="tel"
            placeholder="e.g. 123..."
            name="workNumber"
            value={formData.workNumber}
            onChange={handleChange}
          />
        </Form.Group>

        {/* 7. Phone Number */}
        <Form.Group className="mb-3">
          <Form.Label>Phone:</Form.Label>
          <Form.Control
            type="tel"
            placeholder="e.g. +91 1234567890"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* 8. Email Address */}
        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* 9. Website (College Selection) */}
        <Form.Group className="mb-3">
          <Form.Label>Website (Select College for Website Link & Logo):</Form.Label>
          <Form.Select
            name="college"
            value={formData.college}
            onChange={handleChange}
          >
            <option value="">Select Institution For Website</option>
            <option value="AGI">AGI</option>
            <option value="AITR">AITR</option>
            <option value="AIMSR">AIMSR</option>
            <option value="AIPER">AIPER</option>
            <option value="AFMR">AFMR</option>
            <option value="AIL">AIL</option>
            <option value="FTL">FTL</option>
          </Form.Select>
        </Form.Group>

        {/* 10. Links */}
        <Form.Group className="mb-3">
          <Form.Label>
            Links:{" "}
            <OverlayTrigger placement="right" overlay={renderTooltip("Provide full URLs starting with https://")}>
              <span style={{ cursor: "pointer", color: "blue", border: "1px solid blue", borderRadius: "50%", padding: "0 5px", fontSize: "12px", marginLeft: "5px" }}>i</span>
            </OverlayTrigger>
          </Form.Label>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="LinkedIn"
                name="linkedin"
                value={formData.socialMedia.linkedin}
                onChange={handleSocialMediaChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Scholar/Personal/Portfolio Website"
                name="portfolio"
                value={formData.socialMedia.portfolio}
                onChange={handleSocialMediaChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Other Link"
                name="otherlinks"
                value={formData.socialMedia.otherlinks}
                onChange={handleSocialMediaChange}
              />
            </Col>
          </Row>
        </Form.Group>

        {/* 11. Additional Information */}
        <Form.Group className="mb-3">
          <Form.Label>
            Additional Information:{" "}
            <OverlayTrigger placement="right" overlay={renderTooltip("Use this rich text editor to add any quotes, extra details, or disclaimers.")}>
              <span style={{ cursor: "pointer", color: "blue", border: "1px solid blue", borderRadius: "50%", padding: "0 5px", fontSize: "12px", marginLeft: "5px" }}>i</span>
            </OverlayTrigger>
          </Form.Label>
          <div style={{ backgroundColor: "white" }}>
            <ReactQuill
              theme="snow"
              modules={quillModules}
              value={formData.extraContent}
              onChange={handleQuillChange}
            />
          </div>
        </Form.Group>

        <Button variant="primary" type="submit" className="mb-3 mt-4">
          Generate Email Signature
        </Button>
      </Form>

      {generatedSignature && <GeneratedSignature formData={formData} />}
    </div>
  );
};

export default EmailSignatureForm;
