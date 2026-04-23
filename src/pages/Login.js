import { useState } from "react";
import axios from "axios";
import { API } from "../config";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(`${API}/login`, {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard"); // ✅ FIXED
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>

        <p style={{ textAlign: "center" }}>
          New user? <Link to="/register">Register</Link> {/* ✅ FIXED */}
        </p>
      </div>
    </div>
  );
}
