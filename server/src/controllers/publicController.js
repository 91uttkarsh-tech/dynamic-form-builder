import mongoose from "mongoose";
import Form from "../models/Form.js";
import sanitize from "../utils/sanitize.js";
import validateSubmission from "../validation/validateSubmission.js";

export async function getFormsList(req, res) {
  try {
    const forms = await Form.find().select("title description");
    res.json(forms);
  } catch (err) {
    console.error("Error fetching forms list:", err);
    res.status(500).json({ message: "Failed to fetch forms" });
  }
}

export async function fetchFormDefinition(req, res) {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json(form);
  } catch (err) {
    console.error("Error fetching form:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function submitForm(req, res) {
  try {
    const formId = req.params.id;

    // Load form definition
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Clean and validate submitted data
    const answers = sanitize(req.body);
    const errors = validateSubmission(form, answers);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // Load or create submission model dynamically
    const Submission = getSubmissionModel(formId);

    const entry = new Submission({
      formId,
      answers,
      meta: { ip: req.ip },
    });

    await entry.save();

    res.status(201).json({
      message: "Form submitted successfully",
      id: entry._id,
    });
  } catch (err) {
    console.error("Error submitting form:", err);
    res.status(500).json({ message: "Server error" });
  }
}


function getSubmissionModel(formId) {
  const modelName = `Submission_${formId}`;

  if (mongoose.models[modelName]) {
    return mongoose.models[modelName];
  }

  const submissionSchema = new mongoose.Schema(
    {
      formId: String,
      answers: Object,
      submittedAt: { type: Date, default: Date.now },
      meta: Object,
    },
    { strict: false }
  );

  return mongoose.model(modelName, submissionSchema);
}
