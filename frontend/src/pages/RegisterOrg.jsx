import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function RegisterOrg() {
  const [form, setForm] = useState({ orgName: "", adminName: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/employees");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h3>Register Organisation</h3>
      <form onSubmit={handleSubmit}>
        <input name="orgName" placeholder="Organisation Name" value={form.orgName} onChange={handleChange} />
        <input name="adminName" placeholder="Admin Name" value={form.adminName} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button>Register</button>
      </form>
    </div>
  );
}
