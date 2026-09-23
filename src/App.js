import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import StudentForm from "./MyComponent/EmailSignatureForm";
import Header from "./MyComponent/Header";
import Footer from "./MyComponent/Footer";

function App() {
  return (
    <Router>
      <Header />
      <StudentForm />
      <Footer />
    </Router>
  );
}

export default App;