import { useState } from "react";
import { saveAuth } from "../auth/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/auth.css";

function Login({ onSwitch }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const submit = () => {
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(data => {
        saveAuth(data.token, data.user);
        window.location.reload();
      });
  };

return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Welcome back</h2>

        <input
          className="auth-input"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        {/* PASSWORD WITH EYE ICON */}
        <div className="password-wrapper">
          <input
            className="auth-input"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />

          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="auth-button" onClick={submit}>
          Login
        </button>

        <div className="auth-switch" onClick={onSwitch}>
          Don’t have an account? <span>Sign up</span>
        </div>
      </div>
    </div>
  );
}

export default Login;