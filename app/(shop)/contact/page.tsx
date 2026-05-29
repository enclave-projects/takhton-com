/**
 * Contact page for Takhton — with validated message form, contact info, and FAQ snippet.
 * @module app/(shop)/contact/page
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { ContactFormSchema, type ContactFormValues } from "@/lib/validations";
import { logger } from "@/lib/logger";

interface ContactChannel {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  primary: string;
  secondary?: string;
  href?: string;
}

const CHANNELS: ReadonlyArray<ContactChannel> = [
  {
    icon: Mail,
    label: "Email",
    primary: "atelier@takhton.com",
    secondary: "Replies within one business day.",
    href: "mailto:atelier@takhton.com",
  },
  {
    icon: Phone,
    label: "Phone",
    primary: "+91 98765 43210",
    secondary: "Mon–Sat, 10:00–19:00 IST.",
    href: "tel:+919876543210",
  },
  {
    icon: MapPin,
    label: "Atelier",
    primary: "12 Heritage Lane, New Delhi 110003",
    secondary: "By appointment for fittings.",
  },
  {
    icon: Clock,
    label: "Customer Care",
    primary: "Mon–Fri, 10:00–18:00 IST",
    secondary: "Closed on national holidays.",
  },
];

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ: ReadonlyArray<FaqItem> = [
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 5–7 business days. Express orders ship in 2–3 business days. Orders placed before 14:00 IST ship the same day.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Unworn pieces in original condition can be returned within 14 days of delivery. Final-sale pieces and altered garments are not eligible for return.",
  },
  {
    question: "Do you offer made-to-measure?",
    answer:
      "Yes — for shirts, trousers, and our tuxedo. Book a fitting at our Delhi atelier or request a remote measurement guide via this form.",
  },
  {
    question: "Where do you ship?",
    answer:
      "Worldwide. Duties and taxes are calculated at checkout for international orders.",
  },
];

export default function ContactPage() {
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "sent" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitState("submitting");
    try {
      // AGENT-DECISION: No backend endpoint exists yet for the contact form.
      // We log via the project logger and resolve as success — replace with
      // a server action or /api/contact route when the backend is ready.
      logger.info("Contact form submitted", {
        name: values.name,
        email: values.email,
        subject: values.subject,
      });
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSubmitState("sent");
      reset();
    } catch (error) {
      logger.error("Contact form submission failed", { error });
      setSubmitState("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#030c1b] text-[#f3ebd8]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#dfc38a]/15 bg-[#030c1b]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(26,64,130,0.4),transparent_38%),linear-gradient(115deg,#020713_0%,#061638_46%,#020713_100%)]"
        />
        <div className="relative mx-auto max-w-[1200px] px-6 py-24 lg:px-12 lg:py-28">
          <p className="t-eyebrow mb-5 text-[#dfc38a]">Speak with us</p>
          <h1 className="mb-6 max-w-3xl font-serif text-4xl leading-[1.05] tracking-wide text-[#f3ebd8] md:text-5xl lg:text-6xl">
            Hold court with the
            <span className="text-[#dfc38a]"> atelier.</span>
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[#f3ebd8]/80 md:text-lg">
            Questions on fit, fabric, made-to-measure, or your order? Send us a
            message — a real human from the studio will reply within one
            business day.
          </p>
        </div>
      </section>

      {/* Form + channels */}
      <section className="border-b border-[#dfc38a]/15 bg-[#030c1b] px-6 py-20 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          {/* Form */}
          <div>
            <p className="t-eyebrow mb-3 text-[#dfc38a]">Send a message</p>
            <h2 className="mb-9 font-serif text-3xl leading-tight tracking-wide text-[#f3ebd8] md:text-4xl">
              Tell us how we can help.
            </h2>

            {submitState === "sent" ? (
              <div
                role="status"
                aria-live="polite"
                className="border border-[#dfc38a]/40 bg-[#05142c] p-8"
              >
                <Send
                  aria-hidden="true"
                  className="mb-4 h-6 w-6 text-[#dfc38a]"
                />
                <h3 className="mb-2 font-serif text-xl uppercase tracking-wide text-[#f3ebd8]">
                  Message received
                </h3>
                <p className="mb-6 text-sm leading-7 text-[#f3ebd8]/75">
                  Thank you. The atelier has your note — we&apos;ll be in touch
                  within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitState("idle")}
                  className={cn(
                    "border border-[#dfc38a] bg-[#dfc38a] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#030c1b]",
                    "transition-colors hover:bg-[#f3ebd8]",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030c1b]",
                  )}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-label="Contact form"
                className="space-y-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    label="Full name"
                    id="contact-name"
                    error={errors.name?.message}
                  >
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={
                        errors.name ? "contact-name-error" : undefined
                      }
                      {...register("name")}
                      className={inputClasses(Boolean(errors.name))}
                    />
                  </FormField>

                  <FormField
                    label="Email address"
                    id="contact-email"
                    error={errors.email?.message}
                  >
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? "contact-email-error" : undefined
                      }
                      {...register("email")}
                      className={inputClasses(Boolean(errors.email))}
                    />
                  </FormField>
                </div>

                <FormField
                  label="Subject"
                  id="contact-subject"
                  error={errors.subject?.message}
                >
                  <input
                    id="contact-subject"
                    type="text"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={
                      errors.subject ? "contact-subject-error" : undefined
                    }
                    {...register("subject")}
                    className={inputClasses(Boolean(errors.subject))}
                  />
                </FormField>

                <FormField
                  label="Message"
                  id="contact-message"
                  error={errors.message?.message}
                >
                  <textarea
                    id="contact-message"
                    rows={6}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                    {...register("message")}
                    className={cn(inputClasses(Boolean(errors.message)), "min-h-[160px] resize-y")}
                  />
                </FormField>

                {submitState === "error" && (
                  <p
                    role="alert"
                    className="border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                  >
                    Something went wrong sending your message. Please try
                    again or email us directly at atelier@takhton.com.
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || submitState === "submitting"}
                    className={cn(
                      "inline-flex items-center gap-2 border border-[#dfc38a] bg-[#dfc38a] px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#030c1b]",
                      "transition-colors hover:bg-[#f3ebd8]",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030c1b]",
                      "disabled:cursor-not-allowed disabled:opacity-60",
                    )}
                  >
                    {submitState === "submitting" || isSubmitting
                      ? "Sending…"
                      : "Send Message"}
                    {!(submitState === "submitting" || isSubmitting) && (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                  <p className="text-[11px] uppercase tracking-wider text-[#f3ebd8]/55">
                    We never share your details.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Channels */}
          <aside className="space-y-px border border-[#dfc38a]/15 bg-[#05142c]">
            {CHANNELS.map((channel) => {
              const Icon = channel.icon;
              const content = (
                <>
                  <Icon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-shrink-0 text-[#dfc38a]"
                  />
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#dfc38a]">
                      {channel.label}
                    </p>
                    <p className="mt-1 text-sm font-medium break-words text-[#f3ebd8]">
                      {channel.primary}
                    </p>
                    {channel.secondary && (
                      <p className="mt-1 text-xs leading-6 text-[#f3ebd8]/60">
                        {channel.secondary}
                      </p>
                    )}
                  </div>
                </>
              );

              return channel.href ? (
                <a
                  key={channel.label}
                  href={channel.href}
                  className={cn(
                    "flex gap-4 border-b border-[#dfc38a]/15 px-6 py-6 transition-colors last:border-b-0",
                    "hover:bg-[#0d2142] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-inset",
                  )}
                >
                  {content}
                </a>
              ) : (
                <div
                  key={channel.label}
                  className="flex gap-4 border-b border-[#dfc38a]/15 px-6 py-6 last:border-b-0"
                >
                  {content}
                </div>
              );
            })}
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faqs"
        className="bg-[#030c1b] px-6 py-20 lg:px-12 lg:py-24"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 max-w-2xl">
            <p className="t-eyebrow mb-4 text-[#dfc38a]">Frequently asked</p>
            <h2 className="font-serif text-3xl leading-tight tracking-wide text-[#f3ebd8] md:text-4xl">
              Before you write to us…
            </h2>
          </div>

          <dl className="grid gap-px bg-[#dfc38a]/15 sm:grid-cols-2">
            {FAQ.map((item) => (
              <div key={item.question} className="bg-[#030c1b] p-7">
                <dt className="mb-3 font-serif text-lg uppercase tracking-wide text-[#dfc38a]">
                  {item.question}
                </dt>
                <dd className="text-sm leading-7 text-[#f3ebd8]/75">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-12 text-sm text-[#f3ebd8]/65">
            Still curious?{" "}
            <Link
              href="/about"
              className="text-[#dfc38a] underline-offset-4 hover:underline"
            >
              Read more about the house
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

/** Tailwind class string for form text inputs / textareas, matching the navy/gold palette. */
function inputClasses(hasError: boolean): string {
  return cn(
    "w-full border bg-[#05142c] px-4 py-3 text-sm text-[#f3ebd8]",
    "placeholder:text-[#f3ebd8]/40",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a]",
    hasError
      ? "border-red-400/60 focus:border-red-400"
      : "border-[#dfc38a]/30 focus:border-[#dfc38a]",
  );
}

interface FormFieldProps {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}

function FormField({ label, id, error, children }: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#dfc38a]"
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-xs text-red-300"
        >
          {error}
        </p>
      )}
    </div>
  );
}
