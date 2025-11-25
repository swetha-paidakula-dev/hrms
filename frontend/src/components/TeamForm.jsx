import { useState } from "react";
import api from "../services/api";

export default function TeamForm({ onSaved }) {
  const [form, setForm] = useState({ name: "", description: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/teams", form);
      setForm({ name: "", description: "" });
      onSaved();
    } catch {
      alert("Failed to create team");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Team</h3>
      <input name="name" placeholder="Team Name" value={form.name} onChange={handleChange} />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <button>Create</button>
    </form>
  );
}
