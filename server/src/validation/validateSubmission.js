export default function validateSubmission(form, answers) {
  const errors = {};
  for (const field of (form.fields || [])) {
    const val = answers[field.name];
    if (field.required && (val === undefined || val === null || val === '')) {
      errors[field.name] = `${field.label} is required`;
      continue;
    }
    if (!val) continue;
    const t = field.type;
    const v = field.validation || {};
    if (t === 'number') {
      const num = Number(val);
      if (Number.isNaN(num)) errors[field.name] = `${field.label} must be a number`;
      if (v.min != null && num < v.min) errors[field.name] = `${field.label} must be >= ${v.min}`;
      if (v.max != null && num > v.max) errors[field.name] = `${field.label} must be <= ${v.max}`;
    }
    if (t === 'email') {
      const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!re.test(String(val))) errors[field.name] = `${field.label} must be a valid email`;
    }
    if (v.regex) {
      const rx = new RegExp(v.regex);
      if (!rx.test(String(val))) errors[field.name] = `${field.label} is invalid`;
    }
    if ((t === 'select' || t === 'radio' || t === 'checkbox') && field.options && field.options.length) {
      if (t === 'checkbox') {
        const arr = Array.isArray(val) ? val : [val];
        const invalid = arr.some(x => !field.options.includes(x));
        if (invalid) errors[field.name] = `${field.label} contains invalid option`;
      } else {
        if (!field.options.includes(val)) errors[field.name] = `${field.label} contains invalid option`;
      }
    }
  }
  return errors;
}
