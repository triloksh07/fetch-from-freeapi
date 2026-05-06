import { useState } from "react";

const ManualForm = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    role: "Frontend",
    experience: "",
    cover: "",
  });

  const [errors, SetErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function set(field) {
    return (e) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
    };
  }

  function validate(v) {
    const e = {};
    if (!v.name.trim()) e.name = "Name is required";
    if (!v.email.trim()) e.email = "Email is required";
    return e;
  }

  function submit(ev) {
    ev.preventDefault();
    const e = validate(values);
    SetErrors(e);
    if (Object.keys(e).length === 0) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div>
        <h1>Form submitted successfully</h1>
      </div>
    );
  }

  return <div>form</div>;
};

export default ManualForm;
