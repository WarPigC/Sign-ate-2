import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import StudentForm from "./MyComponent/EmailSignatureForm";
import Header from "./MyComponent/Header";

function App() {
  return (
    <Router>
      <Header title={" Sign Ate"} />
      <StudentForm />
    </Router>
  );
}

export default App;