import { useState } from "react";
import axios from "axios";
import { API } from "../config";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const register = async () => {
    try {
      await axios.post(`${API}/register`, data);
      navigate("/"); // FIXED
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h2>Register</h2>

        <input
          placeholder="Name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button onClick={register}>Register</button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Already have an account? <Link to="/">Login</Link>
        </p>

      </div>
    </div>
  );
}
