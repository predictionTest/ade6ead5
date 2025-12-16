import { useState } from "react";
import { Mail, MessageSquare, User, FileText } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const Contact = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error on change
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else {
      // Basic email pattern for client-side validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(form.email.trim())) {
        nextErrors.email = "Please enter a valid email address";
      }
    }

    if (!form.message.trim()) {
      nextErrors.message = "Message is required";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(false);

    if (!validate()) {
      return;
    }

    // Simulate async submission (no real backend wiring here)
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setForm(initialState);
    }, 800);
  };

  return (
    <div className="card max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Intro + meta info */}
        <section className="space-y-4 lg:col-span-1" aria-labelledby="contact-heading">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary-500" />
            </div>
            <div>
              <h1
                id="contact-heading"
                className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white"
              >
                Contact Us
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Have a question, feature request, or found an issue? Send us a message
                and we will get back to you shortly.
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 mt-0.5 text-primary-500" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-0.5">
                  Placeholder address where form submissions would be handled:
                </p>
                <p className="font-mono text-xs break-all">example.gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="w-4 h-4 mt-0.5 text-primary-500" />
              <div>
                <p className="font-medium">Response Time</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs">
                  We aim to respond to most messages within 24-48 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Right: Contact form */}
        <section className="lg:col-span-2" aria-label="Contact form">
          {submitted && (
            <div
              className="mb-4 rounded-xl border border-green-500/40 bg-green-50 dark:bg-emerald-900/20 px-4 py-3 text-sm text-green-800 dark:text-emerald-200 flex items-start gap-2"
              role="status"
              aria-live="polite"
            >
              <span className="mt-0.5" aria-hidden="true">
                ✓
              </span>
              <p>
                Thank you for contacting us. We will get back to you shortly.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="label mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`input pl-10 ${
                    errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500/40" : ""
                  }`}
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
              </div>
              {errors.name && (
                <p id="name-error" className="mt-1 text-xs text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="label mb-1">
                Email address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={`input pl-10 ${
                    errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/40" : ""
                  }`}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="label mb-1">
                Subject <span className="text-xs text-gray-400">(optional)</span>
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  className="input pl-10"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="label mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className={`input resize-none ${
                  errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500/40" : ""
                }`}
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-xs text-red-500">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
              >
                {isSubmitting && (
                  <span className="inline-block w-4 h-4 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                )}
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              </button>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 max-w-xs">
                This form is for demonstration purposes. Submissions would be routed to
                <span className="font-mono"> example.gmail.com</span> in a production
                environment.
              </p>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
