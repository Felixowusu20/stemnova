"use client";

import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
} from "lucide-react";
import {
  createRegistrationFieldId,
  type EventRegistrationField,
  type EventRegistrationFormConfig,
  type RegistrationFieldType,
} from "@/lib/event-registration-form";

const fieldClass =
  "w-full rounded-xl border border-navy/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue";

const FIELD_TYPES: { value: RegistrationFieldType; label: string }[] = [
  { value: "text", label: "Short answer" },
  { value: "textarea", label: "Paragraph" },
  { value: "email", label: "Email" },
  { value: "tel", label: "Phone" },
  { value: "number", label: "Number" },
  { value: "select", label: "Dropdown" },
  { value: "radio", label: "Multiple choice" },
  { value: "checkbox", label: "Checkbox" },
];

export function EventRegistrationFormBuilder({
  value,
  onChange,
}: {
  value: EventRegistrationFormConfig;
  onChange: (next: EventRegistrationFormConfig) => void;
}) {
  function updateField(
    id: string,
    patch: Partial<EventRegistrationField>
  ) {
    onChange({
      ...value,
      fields: value.fields.map((field) =>
        field.id === id ? { ...field, ...patch } : field
      ),
    });
  }

  function moveField(id: string, direction: -1 | 1) {
    const index = value.fields.findIndex((field) => field.id === id);
    if (index < 0) return;
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= value.fields.length) return;
    const fields = [...value.fields];
    const [item] = fields.splice(index, 1);
    fields.splice(nextIndex, 0, item);
    onChange({ ...value, fields });
  }

  function removeField(id: string) {
    if (value.fields.length <= 1) return;
    onChange({
      ...value,
      fields: value.fields.filter((field) => field.id !== id),
    });
  }

  function addField() {
    const field: EventRegistrationField = {
      id: createRegistrationFieldId(),
      label: "Untitled question",
      type: "text",
      required: false,
      placeholder: "",
    };
    onChange({ ...value, fields: [...value.fields, field] });
  }

  return (
    <div className="space-y-4 rounded-xl border border-navy/10 bg-light/60 p-4">
      <div>
        <p className="text-sm font-semibold text-navy">
          Google Form–style registration
        </p>
        <p className="mt-1 text-xs leading-relaxed text-navy/60">
          Build the questions shown when someone clicks Register. You can change
          them any time for this event.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">Form title</label>
          <input
            className={fieldClass}
            value={value.title}
            onChange={(e) => onChange({ ...value, title: e.target.value })}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">
            Form description
          </label>
          <textarea
            className={fieldClass}
            rows={2}
            value={value.description}
            onChange={(e) =>
              onChange({ ...value, description: e.target.value })
            }
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Submit button label
          </label>
          <input
            className={fieldClass}
            value={value.submitLabel}
            onChange={(e) =>
              onChange({ ...value, submitLabel: e.target.value })
            }
          />
        </div>
      </div>

      <ul className="space-y-3">
        {value.fields.map((field, index) => (
          <li
            key={field.id}
            className="rounded-xl border border-navy/10 bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-navy/45">
                Question {index + 1}
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Move up"
                  onClick={() => moveField(field.id, -1)}
                  disabled={index === 0}
                  className="rounded-lg p-1.5 text-navy/50 hover:bg-light disabled:opacity-30"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Move down"
                  onClick={() => moveField(field.id, 1)}
                  disabled={index === value.fields.length - 1}
                  className="rounded-lg p-1.5 text-navy/50 hover:bg-light disabled:opacity-30"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Delete question"
                  onClick={() => removeField(field.id)}
                  disabled={value.fields.length <= 1}
                  className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 disabled:opacity-30"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium">
                  Question
                </label>
                <input
                  className={fieldClass}
                  value={field.label}
                  onChange={(e) =>
                    updateField(field.id, { label: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Type</label>
                <select
                  className={fieldClass}
                  value={field.type}
                  onChange={(e) => {
                    const type = e.target.value as RegistrationFieldType;
                    updateField(field.id, {
                      type,
                      options:
                        type === "select" || type === "radio"
                          ? field.options?.length
                            ? field.options
                            : ["Option 1", "Option 2"]
                          : undefined,
                    });
                  }}
                >
                  {FIELD_TYPES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end pb-2">
                <label className="inline-flex items-center gap-2 text-sm text-navy">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) =>
                      updateField(field.id, { required: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-navy/30"
                  />
                  Required
                </label>
              </div>
              {field.type !== "checkbox" && (
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium">
                    Placeholder
                  </label>
                  <input
                    className={fieldClass}
                    value={field.placeholder || ""}
                    onChange={(e) =>
                      updateField(field.id, { placeholder: e.target.value })
                    }
                  />
                </div>
              )}
              {(field.type === "select" || field.type === "radio") && (
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium">
                    Options (one per line)
                  </label>
                  <textarea
                    className={fieldClass}
                    rows={3}
                    value={(field.options || []).join("\n")}
                    onChange={(e) =>
                      updateField(field.id, {
                        options: e.target.value
                          .split("\n")
                          .map((line) => line.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={addField}
        className="inline-flex items-center gap-2 rounded-xl border border-dashed border-navy/25 px-4 py-2.5 text-sm font-semibold text-navy hover:bg-white"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        Add question
      </button>
    </div>
  );
}
