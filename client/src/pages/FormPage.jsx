import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/Loading";

export default function FormPage() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    api
      .get(`public/forms/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => setForm(false));
  }, [id]);

  if (form === null) return <Loading />;
  if (form === false) return <div className="card">Form not found</div>;

  const handleChange = (name, value) => {
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    setErrors(null);
    try {
      await api.post(`public/forms/${id}/submit`, answers);
      alert("Submitted successfully");
      setAnswers({});
    } catch (err) {
      setErrors(err.response?.data?.errors || { general: "Submit failed" });
    }
  };

  return (
    <div>

      <div className="card">
        <Link to="/">{`<- Back`}</Link>
      </div>

      <div className="card">
        <h2>{form.title}</h2>
        <p className="muted">{form.description}</p>
      </div>

      <div className="card">
        {form.fields
          .sort((a, b) => a.order - b.order)
          .map((field) => (
            <div className="form-row" key={field.name}>
              <label>
                {field.label}
                {field.required ? "*" : ""}
              </label>

              {field.type === "textarea" && (
                <textarea
                  value={answers[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              )}

              {field.type === "select" && (
                <select
                  value={answers[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                >
                  <option value="">--select--</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {field.type === "checkbox" &&
                field.options.map((opt) => {
                  const current = Array.isArray(answers[field.name])
                    ? answers[field.name]
                    : [];

                  const toggle = (checked) => {
                    if (checked) {
                      handleChange(field.name, [...current, opt]);
                    } else {
                      handleChange(
                        field.name,
                        current.filter((v) => v !== opt)
                      );
                    }
                  };

                  return (
                    <label key={opt}>
                      <input
                        type="checkbox"
                        checked={current.includes(opt)}
                        onChange={(e) => toggle(e.target.checked)}
                      />
                      {opt}
                    </label>
                  );
                })}

              {field.type !== "textarea" &&
                field.type !== "select" &&
                field.type !== "checkbox" && (
                  <input
                    type={field.type === "number" ? "number" : field.type}
                    value={answers[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  />
                )}
            </div>
          ))}

        {errors && (
          <div
            className="card small"
            style={{ background: "#fff3f2", color: "#9b1c1c" }}
          >
            {JSON.stringify(errors)}
          </div>
        )}

        <div className="flex">
          <button onClick={submit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
