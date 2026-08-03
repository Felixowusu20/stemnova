export type RegistrationFieldType =
  | "text"
  | "email"
  | "tel"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox";

export type EventRegistrationField = {
  id: string;
  label: string;
  type: RegistrationFieldType;
  required: boolean;
  placeholder?: string;
  helpText?: string;
  options?: string[];
};

export type EventRegistrationFormConfig = {
  title: string;
  description: string;
  submitLabel: string;
  fields: EventRegistrationField[];
};

export const DEFAULT_EVENT_REGISTRATION_FORM: EventRegistrationFormConfig = {
  title: "Event registration",
  description:
    "Complete this form to register. Required questions are marked with *.",
  submitLabel: "Submit registration",
  fields: [
    {
      id: "fullName",
      label: "Full name",
      type: "text",
      required: true,
      placeholder: "Your full name",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      required: true,
      placeholder: "you@example.com",
    },
    {
      id: "phone",
      label: "Phone",
      type: "tel",
      required: true,
      placeholder: "+233 …",
    },
    {
      id: "organisation",
      label: "Organisation or school",
      type: "text",
      required: false,
      placeholder: "Optional",
    },
    {
      id: "guests",
      label: "Number of guests",
      type: "number",
      required: true,
      placeholder: "1",
    },
    {
      id: "notes",
      label: "Anything we should know?",
      type: "textarea",
      required: false,
      placeholder: "Dietary needs, accessibility, questions…",
    },
    {
      id: "consent",
      label:
        "I agree to receive event updates and consent to STEMNova's privacy policy.",
      type: "checkbox",
      required: true,
    },
  ],
};

function isFieldType(value: unknown): value is RegistrationFieldType {
  return (
    value === "text" ||
    value === "email" ||
    value === "tel" ||
    value === "number" ||
    value === "textarea" ||
    value === "select" ||
    value === "radio" ||
    value === "checkbox"
  );
}

export function createRegistrationFieldId() {
  return `q_${Math.random().toString(36).slice(2, 10)}`;
}

export function parseRegistrationForm(
  data: unknown
): EventRegistrationFormConfig {
  if (!data || typeof data !== "object") {
    return structuredClone(DEFAULT_EVENT_REGISTRATION_FORM);
  }

  const record = data as Record<string, unknown>;
  const rawForm = record.registrationForm;
  if (!rawForm || typeof rawForm !== "object") {
    return structuredClone(DEFAULT_EVENT_REGISTRATION_FORM);
  }

  const form = rawForm as Record<string, unknown>;
  const fieldsRaw = Array.isArray(form.fields) ? form.fields : [];
  const fields: EventRegistrationField[] = [];

  fieldsRaw.forEach((item, index) => {
    if (!item || typeof item !== "object") return;
    const field = item as Record<string, unknown>;
    const type = isFieldType(field.type) ? field.type : "text";
    const id =
      typeof field.id === "string" && field.id.trim()
        ? field.id.trim()
        : `field_${index + 1}`;
    const label =
      typeof field.label === "string" && field.label.trim()
        ? field.label.trim()
        : `Question ${index + 1}`;
    const options = Array.isArray(field.options)
      ? field.options
          .filter((option): option is string => typeof option === "string")
          .map((option) => option.trim())
          .filter(Boolean)
      : undefined;

    fields.push({
      id,
      label,
      type,
      required: Boolean(field.required),
      placeholder:
        typeof field.placeholder === "string" ? field.placeholder : undefined,
      helpText: typeof field.helpText === "string" ? field.helpText : undefined,
      options:
        type === "select" || type === "radio"
          ? options && options.length > 0
            ? options
            : ["Option 1", "Option 2"]
          : undefined,
    });
  });

  if (fields.length === 0) {
    return structuredClone(DEFAULT_EVENT_REGISTRATION_FORM);
  }

  return {
    title:
      typeof form.title === "string" && form.title.trim()
        ? form.title.trim()
        : DEFAULT_EVENT_REGISTRATION_FORM.title,
    description:
      typeof form.description === "string"
        ? form.description
        : DEFAULT_EVENT_REGISTRATION_FORM.description,
    submitLabel:
      typeof form.submitLabel === "string" && form.submitLabel.trim()
        ? form.submitLabel.trim()
        : DEFAULT_EVENT_REGISTRATION_FORM.submitLabel,
    fields,
  };
}

export function getEventRegistrationForm(
  event: { registrationForm?: EventRegistrationFormConfig } | null | undefined
): EventRegistrationFormConfig {
  if (event?.registrationForm?.fields?.length) {
    return event.registrationForm;
  }
  return structuredClone(DEFAULT_EVENT_REGISTRATION_FORM);
}
