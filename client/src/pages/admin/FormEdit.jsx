import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function AdminFormEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    fields: [],
  });

  // Fetch form data when editing
  useEffect(() => {
    if (!id) return;
    api.get(`/admin/forms/${id}`).then((res) => setForm(res.data)).catch((e) => {alert((e))});
  }, [id]);

  // Add new field
  const addField = () => {
    setForm((prev) => ({
      ...prev,
      fields: [
        ...prev.fields,
        {
          label: "New Field",
          name: `field_${Date.now()}`,
          type: "text",
          required: false,
          order: prev.fields.length,
        },
      ],
    }));
  };

  // Save form (create / update)
  const saveForm = async () => {
    try {
      if (id) {
        await api.put(`/admin/forms/${id}`, form);
      } else {
        await api.post("/admin/forms", form);
      }

      navigate("/admin/forms");
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };

  // Update a specific field
  const updateField = (index, updates) => {
    const updated = { ...form };
    updated.fields[index] = { ...updated.fields[index], ...updates };
    setForm(updated);
  };

  // Delete a specific field
  const deleteField = (index) => {
    const updated = { ...form };
    updated.fields.splice(index, 1);
    setForm(updated);
  };

  return (
    <div>
      <div className="card">
        {/* Title */}
        <div className="form-row">
          <label>Title</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Description */}
        <div className="form-row">
          <label>Description</label>
          <input
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        <div className="muted">Fields</div>

        {/* Fields List */}
        <div className="list">
          {form.fields.map((field, index) => (
            <div key={index} className="list-item">
              <div style={{ flex: 1 }}>
                {/* Label */}
                <div className="form-row">
                  <label>Label</label>
                  <input
                    value={field.label}
                    onChange={(e) =>
                      updateField(index, { label: e.target.value })
                    }
                  />
                </div>

                {/* Name */}
                <div className="form-row">
                  <label>Name</label>
                  <input
                    value={field.name}
                    onChange={(e) =>
                      updateField(index, { name: e.target.value })
                    }
                  />
                </div>

                {/* Type */}
                <div className="form-row">
                  <label>Type</label>
                  <select
                    value={field.type}
                    onChange={(e) =>
                      updateField(index, { type: e.target.value })
                    }
                  >
                    <option value="text">text</option>
                    <option value="textarea">textarea</option>
                    <option value="number">number</option>
                    <option value="email">email</option>
                    <option value="date">date</option>
                    <option value="select">select</option>
                    <option value="radio">radio</option>
                    <option value="checkbox">checkbox</option>
                  </select>
                </div>
              </div>

              <div className="flex">
                <button onClick={() => deleteField(index)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex">
          <button onClick={addField}>Add field</button>
          <button onClick={saveForm}>Save</button>
        </div>
      </div>
    </div>
  );
}
