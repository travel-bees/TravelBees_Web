import { useEffect, useMemo, useState } from "react";
import { cn } from "../utils/cn";
import { emptyEnquiry, useApp, type EnquiryValues } from "../lib/app-context";
import { site } from "../data/site";
import { packages } from "../data/packages";
import { Icon } from "./Icon";
import { Button } from "./ui";

const tripTypes = [
  "International holiday",
  "Domestic holiday",
  "Group tour",
  "Custom / private trip",
  "Honeymoon",
  "Safari",
  "Corporate / group travel",
  "Not sure yet",
];

const budgets = [
  "Under ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹2,00,000",
  "₹2,00,000 +",
  "Not decided yet",
];

const preferences = [
  "Vegetarian / Jain meals",
  "Indian food options",
  "Travelling with kids",
  "Travelling with seniors",
  "Visa assistance needed",
  "Flights included",
  "Private vehicle",
  "Honeymoon setup",
];

const steps = ["Trip details", "Budget & style", "Contact"];

export function EnquiryForm() {
  const { enquiryOpen, enquiryPrefill, enquirySource, closeEnquiry } = useApp();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry);
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (enquiryOpen) {
      setValues({ ...emptyEnquiry, ...enquiryPrefill });
      setStep(0);
      setErrors({});
      setSubmitted(false);
    }
  }, [enquiryOpen, enquiryPrefill]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeEnquiry();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeEnquiry]);

  const set = <K extends keyof EnquiryValues>(key: K, value: EnquiryValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const destinationOptions = useMemo(
    () => Array.from(new Set(packages.map((p) => p.destination))),
    [],
  );

  const validateStep = (current: number) => {
    const next: Partial<Record<keyof EnquiryValues, string>> = {};
    if (current === 0 && !values.destination.trim()) {
      next.destination = "Tell us where you'd like to go";
    }
    if (current === 2) {
      if (!values.name.trim()) next.name = "Please enter your name";
      if (!/^[0-9+\-\s()]{10,16}$/.test(values.phone.trim()))
        next.phone = "Enter a valid phone number";
      if (values.email.trim() && !/^\S+@\S+\.\S+$/.test(values.email.trim()))
        next.email = "Enter a valid email address";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const whatsappLink = useMemo(() => {
    const text = [
      `Hi Travelbees! I'd like to plan a trip.`,
      values.destination ? `Destination: ${values.destination}` : "",
      values.tripType ? `Trip type: ${values.tripType}` : "",
      values.travelDates ? `Travel month/dates: ${values.travelDates}` : "",
      values.travelers ? `Travellers: ${values.travelers}` : "",
      values.budget ? `Budget per person: ${values.budget}` : "",
      values.requirements ? `Preferences: ${values.requirements}` : "",
      values.name ? `Name: ${values.name}` : "",
      values.phone ? `Phone: ${values.phone}` : "",
      values.message ? `Notes: ${values.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    return `${site.whatsappHref}?text=${encodeURIComponent(text)}`;
  }, [values]);

  if (!enquiryOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
        onClick={closeEnquiry}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Trip enquiry form"
        className="relative flex max-h-[94svh] w-full max-w-4xl overflow-hidden rounded-t-3xl bg-cream shadow-2xl sm:max-h-[88svh] sm:rounded-3xl"
      >
        {/* Brand panel */}
        <aside className="relative hidden w-[38%] shrink-0 overflow-hidden bg-ink-900 p-8 lg:block">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "url(https://images.pexels.com/photos/29176026/pexels-photo-29176026.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1200)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/90 to-ink-950" />
          <div className="relative flex h-full flex-col">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-300">
              TRAVELBEES - PLAN MY TRIP
            </p>
            <h3 className="mt-5 text-[2rem] font-bold leading-tight tracking-tight text-cream">
              Let's design something unforgettable.
            </h3>
            <p className="mt-4 text-[14.5px] leading-relaxed text-cream/70">
              Share a few details and a travel expert will come back with a personalised itinerary —
              usually within one working day.
            </p>

            <ul className="mt-8 space-y-3.5">
              {[
                "Hand-built itineraries, no copy-paste tours",
                "Transparent pricing with clear inclusions",
                "Support on WhatsApp before and during your trip",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-[14px] text-cream/80">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500 text-ink-950">
                    <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-auto space-y-2 border-t border-white/10 pt-6 text-[13.5px] text-cream/70">
              <a href={site.phoneHref} className="flex items-center gap-2.5 hover:text-cream">
                <Icon name="phone" className="h-4 w-4 text-gold-400" />
                {site.phone}
              </a>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-cream"
              >
                <Icon name="whatsapp" className="h-4 w-4 text-gold-400" />
                {site.whatsapp}
              </a>
              <a href={site.emailHref} className="flex items-center gap-2.5 hover:text-cream">
                <Icon name="mail" className="h-4 w-4 text-gold-400" />
                {site.email}
              </a>
            </div>
          </div>
        </aside>

        {/* Form panel */}
        <div className="relative flex max-h-[94svh] flex-1 flex-col overflow-y-auto sm:max-h-[88svh]">
          <button
            type="button"
            onClick={closeEnquiry}
            aria-label="Close enquiry form"
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 bg-white/80 text-ink-900 transition-colors hover:bg-white"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>

          {submitted ? (
            <div className="flex flex-1 flex-col items-center justify-center px-7 py-16 text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-ink-950">
                <Icon name="check" className="h-8 w-8" strokeWidth={3} />
              </span>
              <h3 className="mt-7 text-[1.9rem] font-bold leading-tight tracking-tight text-ink-900">
                Thanks! Our travel expert will get in touch with you shortly.
              </h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-700/75">
                We've received your enquiry{values.destination ? ` for ${values.destination}` : ""}. If
                you'd like to fast-track things, message us on WhatsApp — we usually reply within a few
                hours.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button variant="whatsapp" size="lg" href={whatsappLink}>
                  Chat on WhatsApp
                </Button>
                <Button variant="outline" size="lg" onClick={closeEnquiry}>
                  Back to site
                </Button>
              </div>
            </div>
          ) : (
            <div className="px-6 pb-8 pt-12 sm:px-9">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-600">
                Step {step + 1} of {steps.length}
              </p>
              <h3 className="mt-2 text-[1.8rem] font-bold leading-tight tracking-tight text-ink-900">
                {step === 0 && "Tell us about your trip"}
                {step === 1 && "Budget & travel style"}
                {step === 2 && "How can we reach you?"}
              </h3>

              <div className="mt-6 flex gap-2" aria-hidden="true">
                {steps.map((label, i) => (
                  <div key={label} className="flex-1">
                    <div
                      className={cn(
                        "h-1.5 rounded-full transition-colors duration-500",
                        i <= step ? "bg-gold-500" : "bg-ink-900/10",
                      )}
                    />
                    <p
                      className={cn(
                        "mt-2 hidden text-[11px] font-medium sm:block",
                        i <= step ? "text-ink-900" : "text-ink-700/45",
                      )}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <form
                className="mt-7 space-y-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!validateStep(step)) return;
                  if (step < steps.length - 1) {
                    setStep(step + 1);
                    return;
                  }
                  setSubmitted(true);
                }}
              >
                {step === 0 && (
                  <>
                    <TextInput
                      id="destination"
                      label="Destination"
                      placeholder="Japan, Bali, Kerala…"
                      value={values.destination}
                      error={errors.destination}
                      onChange={(v) => set("destination", v)}
                      list={destinationOptions}
                    />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <TextInput
                        id="travelDates"
                        label="Approximate travel dates"
                        placeholder="e.g. mid-March, 10 days"
                        value={values.travelDates}
                        onChange={(v) => set("travelDates", v)}
                      />
                      <SelectInput
                        id="travelers"
                        label="Number of travellers"
                        value={values.travelers}
                        options={[
                          "1 traveller",
                          "2 travellers",
                          "3–4 travellers",
                          "5–8 travellers",
                          "9+ travellers",
                        ]}
                        onChange={(v) => set("travelers", v)}
                      />
                    </div>
                    <SelectInput
                      id="tripType"
                      label="Trip type"
                      value={values.tripType}
                      options={tripTypes}
                      onChange={(v) => set("tripType", v)}
                    />
                  </>
                )}

                {step === 1 && (
                  <>
                    <SelectInput
                      id="budget"
                      label="Budget per person"
                      value={values.budget}
                      options={budgets}
                      onChange={(v) => set("budget", v)}
                    />
                    <fieldset>
                      <legend className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-700/60">
                        Special requirements
                      </legend>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {preferences.map((pref) => {
                          const active = values.requirements.includes(pref);
                          return (
                            <button
                              key={pref}
                              type="button"
                              aria-pressed={active}
                              onClick={() => {
                                const list = values.requirements
                                  ? values.requirements.split(", ").filter(Boolean)
                                  : [];
                                const next = active
                                  ? list.filter((item) => item !== pref)
                                  : [...list, pref];
                                set("requirements", next.join(", "));
                              }}
                              className={cn(
                                "rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all duration-300",
                                active
                                  ? "border-gold-500 bg-gold-500 text-ink-950"
                                  : "border-ink-900/15 bg-white text-ink-700 hover:border-ink-900/35",
                              )}
                            >
                              {pref}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                    <TextArea
                      id="message"
                      label="Anything else we should know? (optional)"
                      placeholder="Occasion you're celebrating, must-see places, dietary needs…"
                      value={values.message}
                      onChange={(v) => set("message", v)}
                    />
                  </>
                )}

                {step === 2 && (
                  <>
                    <TextInput
                      id="name"
                      label="Full name"
                      placeholder="Your name"
                      value={values.name}
                      error={errors.name}
                      onChange={(v) => set("name", v)}
                    />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <TextInput
                        id="phone"
                        label="Phone / WhatsApp"
                        placeholder="+91 ..."
                        value={values.phone}
                        error={errors.phone}
                        onChange={(v) => set("phone", v)}
                        type="tel"
                      />
                      <TextInput
                        id="email"
                        label="Email (optional)"
                        placeholder="you@email.com"
                        value={values.email}
                        error={errors.email}
                        onChange={(v) => set("email", v)}
                        type="email"
                      />
                    </div>
                    <p className="rounded-2xl border border-ink-900/10 bg-white px-4 py-3.5 text-[13px] leading-relaxed text-ink-700/70">
                      We'll only use these details to plan your trip — no spam, no shared lists.
                    </p>
                  </>
                )}

                <div className="flex flex-wrap items-center gap-3 border-t border-ink-900/10 pt-6">
                  <Button type="submit" variant="primary" size="lg" className="flex-1 sm:flex-none">
                    {step === steps.length - 1 ? "Send Enquiry" : "Continue"}
                  </Button>
                  {step > 0 && (
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => setStep(step - 1)}
                      className="px-2"
                    >
                      Back
                    </Button>
                  )}
                  <Button variant="whatsapp" size="lg" href={whatsappLink} className="sm:ml-auto">
                    WhatsApp instead
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- fields */

function FieldShell({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-700/60"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p className="mt-1.5 text-[12.5px] font-medium text-[#b23b2e]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClasses =
  "w-full rounded-2xl border border-ink-900/12 bg-white px-4 py-3.5 text-[15px] text-ink-900 outline-none transition-colors duration-300 placeholder:text-ink-700/40 focus:border-gold-500";

function TextInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  list,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  type?: string;
  list?: string[];
}) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        list={list ? `${id}-options` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={inputClasses}
        aria-invalid={Boolean(error)}
      />
      {list && (
        <datalist id={`${id}-options`}>
          {list.map((option) => (
            <option key={option} value={option} />
          ))}
        </datalist>
      )}
    </FieldShell>
  );
}

function SelectInput({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <FieldShell id={id} label={label}>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClasses}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

function TextArea({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <FieldShell id={id} label={label}>
      <textarea
        id={id}
        rows={4}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={inputClasses}
      />
    </FieldShell>
  );
}
