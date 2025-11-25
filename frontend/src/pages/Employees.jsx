import { useEffect, useState } from "react";
import api from "../services/api";
import EmployeeForm from "../components/EmployeeForm";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
      alert("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadEmployees(); }, []);

  if (loading) return <p>Loading employees...</p>;
  if (!employees.length) return <p>No employees found</p>;

  return (
    <div>
      <h2>Employees</h2>
      <EmployeeForm onSaved={loadEmployees} />
      <ul>
        {employees.map((e) => (
          <li key={e.id}>
            {e.first_name} {e.last_name} — {e.email || "No email"}
          </li>
        ))}
      </ul>
    </div>
  );
}
