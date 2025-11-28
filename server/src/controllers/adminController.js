import Form from '../models/Form.js';
import sanitize from '../utils/sanitize.js';
import mongoose from 'mongoose';

export const createForm = async (req, res) => {
  try {
    const payload = sanitize(req.body);
    const fields = payload.fields || [];
    const names = fields.map(f => f.name);
    if (new Set(names).size !== names.length)
      return res.status(400).json({ message: 'Field names must be unique within a form' });

    const form = await Form.create(payload);
    res.status(201).json(form);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const listForms = async (req, res) => {
  const forms = await Form.find().select('title description createdAt version');
  res.json(forms);
};

export const getForm = async (req, res) => {
  const form = await Form.findById(req.params.id);
  form ? res.json(form) : res.status(404).json({ message: 'Form not found' });
};

export const updateForm = async (req, res) => {
  try {
    const payload = sanitize(req.body);
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });

    const changed = JSON.stringify(form.fields) !== JSON.stringify(payload.fields || form.fields);
    if (changed) form.version = (form.version || 1) + 1;

    Object.assign(form, {
      title: payload.title ?? form.title,
      description: payload.description ?? form.description,
      fields: payload.fields ?? form.fields
    });

    await form.save();
    res.json(form);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await Form.findByIdAndDelete(id);
    if (!form) return res.status(404).json({ message: 'Form not found' });

    const SubModel = getSubmissionModel(id);
    await SubModel.deleteMany({ formId: id });

    res.json({ message: 'Deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};


const getSubmissionModel = id => {
  const name = `Submission_${id}`;
  if (mongoose.models[name]) return mongoose.models[name];
  return mongoose.model(
    name,
    new mongoose.Schema(
      {
        formId: String,
        answers: Object,
        submittedAt: { type: Date, default: Date.now },
        meta: Object
      },
      { strict: false }
    )
  );
};

export const listSubmissions = async (req, res) => {
  try {
    const M = getSubmissionModel(req.params.formId);
    const items = await M.find().sort({ submittedAt: -1 }).limit(200);
    res.json(items);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};
