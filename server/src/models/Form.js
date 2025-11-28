import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const FieldSchema = new Schema({
  label: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  required: { type: Boolean, default: false },
  options: { type: [String], default: [] },
  validation: { type: Object, default: {} },
  order: { type: Number, default: 0 },
  nestedFields: {
    type: Map, of: [new Schema({
      label: String, name: String, type: String, required: Boolean, options: [String], validation: Object, order: Number
    }, { _id: false })], default: {}
  }
}, { _id: false });

const FormSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  fields: { type: [FieldSchema], default: [] },
  version: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
}, { strict: false });

export default model('Form', FormSchema);
