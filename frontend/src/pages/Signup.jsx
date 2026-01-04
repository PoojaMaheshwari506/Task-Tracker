import { useState } from "react";
import "../styles/auth.css";

function Signup({ onSwitch }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = () => {
    fetch("http://127.0.0.1:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => onSwitch());
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Create account</h2>

        <input
          className="auth-input"
          placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="auth-input"
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button className="auth-button" onClick={submit}>
          Sign up
        </button>

        <div className="auth-switch" onClick={onSwitch}>
          Already have an account? <span>Login</span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
