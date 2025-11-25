import { useState } from "react";
import api from "../services/api";

export default function EmployeeForm({ onSaved }) {
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/employees", form);
      setForm({ first_name: "", last_name: "", email: "", phone: "" });
      onSaved();
    } catch (err) {
      alert("Failed to add employee");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Employee</h3>
      <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} />
      <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      <button>Add</button>
    </form>
  );
}
