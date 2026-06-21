"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Icon, { type IconName } from "@/components/ui/Icon";
import { PROGRAMME_INTERESTS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const E_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const formWrapRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    parentName: "",
    childAge: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Info side
      const infoItems = infoRef.current?.querySelectorAll(".info-item");
      if (infoItems) {
        gsap.fromTo(infoItems, { opacity: 0, x: -36 }, {
          opacity: 1, x: 0, duration: 0.65, stagger: 0.1, ease: E_OUT,
          scrollTrigger: { trigger: infoRef.current, start: "top 88%", once: true },
        });
      }

      // Form card
      gsap.fromTo(formWrapRef.current, { opacity: 0, y: 50, scale: 0.97 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.85, ease: E_OUT,
        scrollTrigger: { trigger: formWrapRef.current, start: "top 90%", once: true },
      });

      // Form fields cascade after card enters
      const formFields = formRef.current?.querySelectorAll(".form-field");
      if (formFields) {
        gsap.fromTo(formFields, { opacity: 0, y: 16 }, {
          opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: E_OUT,
          scrollTrigger: { trigger: formRef.current, start: "top 85%", once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Input focus glow via GSAP
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    gsap.to(e.currentTarget, {
      boxShadow: "0 0 0 3px rgba(180, 106, 40, 0.15)",
      duration: 0.2,
      ease: E_OUT,
    });
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    gsap.to(e.currentTarget, {
      boxShadow: "0 0 0 0px rgba(180, 106, 40, 0)",
      duration: 0.3,
      ease: E_OUT,
    });
  };

  const WHATSAPP_PHONE = "918050659897";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Compose the enquiry as a WhatsApp message and hand off to WhatsApp.
    const lines = [
      "Hello AKARIAN, I'd like to enquire about a programme.",
      "",
      `Parent: ${formData.parentName}`,
      `Child's age: ${formData.childAge}`,
      `Phone: ${formData.phone}`,
      `Programme: ${formData.interest}`,
    ];
    if (formData.message.trim()) {
      lines.push("", `About my child: ${formData.message.trim()}`);
    }
    const text = encodeURIComponent(lines.join("\n"));
    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${text}`;

    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl bg-ivory border border-golden-sand/40 font-sans text-sm text-forest-green placeholder:text-golden-sand/60 focus:outline-none focus:border-terracotta transition-colors duration-300";

  return (
    <section ref={sectionRef} id="contact" className="section-padding bg-ivory">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Begin."
          heading="Your Child's Sensory Journey"
          subheading="Every great beginning starts with a single, deliberate step. We welcome limited cohorts each month — reach out to learn more, discuss your child's world, or reserve your place."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 mt-8 sm:mt-12">
          {/* Left */}
          <div ref={infoRef}>
            <h3 className="info-item font-serif text-xl sm:text-2xl text-forest-green mb-6 sm:mb-8 will-change-transform">
              We would love to hear from you.
            </h3>

            <div className="space-y-2">
              {([
                {
                  icon: "location",
                  label: "Founder's Office",
                  body: (
                    <p className="font-sans text-sm text-sage leading-relaxed">
                      Unit 101, Oxford Towers<br />
                      139 HAL Old Airport Road, HAL II Stage<br />
                      Bangalore 560008
                    </p>
                  ),
                },
                {
                  icon: "phone",
                  label: "Phone / WhatsApp",
                  body: (
                    <a href="tel:8050659897" className="link-underline font-sans text-sm text-terracotta">
                      8050659897
                    </a>
                  ),
                },
                {
                  icon: "instagram",
                  label: "Instagram",
                  body: (
                    <a
                      href="https://www.instagram.com/akarian_blr/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline font-sans text-sm text-terracotta"
                    >
                      @akarian_blr
                    </a>
                  ),
                },
                {
                  icon: "calendar",
                  label: "Availability",
                  body: (
                    <p className="font-sans text-sm text-sage">
                      Limited cohorts open monthly. Prior booking is required.
                    </p>
                  ),
                },
              ] as { icon: IconName; label: string; body: React.ReactNode }[]).map((row) => (
                <div
                  key={row.label}
                  className="info-item flex items-start gap-4 py-4 border-b border-golden-sand/15 last:border-0 will-change-transform"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-full border border-golden-sand/30 text-terracotta shrink-0">
                    <Icon name={row.icon} className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-golden-sand mb-1.5">
                      {row.label}
                    </p>
                    {row.body}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div ref={formWrapRef} className="will-change-transform">
            <div className="bg-sandstone-beige/25 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] rounded-b-2xl p-6 sm:p-7 md:p-10 border border-golden-sand/25">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-5">
                  <span className="flex items-center justify-center w-16 h-16 rounded-full bg-forest-green/10 text-terracotta">
                    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5l4 4 10-10" />
                    </svg>
                  </span>
                  <h3 className="font-serif text-2xl text-forest-green">Enquiry received.</h3>
                  <p className="font-sans text-sm text-sage max-w-xs">
                    We will respond within 24 hours. We look forward to welcoming your child.
                  </p>
                </div>
              ) : (
                <div>
              <h3 className="font-serif text-xl text-forest-green mb-1">
                Reserve Your Place
              </h3>
              <p className="font-sans text-xs text-sage mb-6">
                We respond to all enquiries within 24 hours.
              </p>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="form-field">
                  <input
                    type="text"
                    placeholder="Parent Name"
                    className={inputClasses}
                    id="form-parent-name"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                </div>

                <div className="form-field grid grid-cols-1 xs:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Child's Age"
                    className={inputClasses}
                    id="form-child-age"
                    value={formData.childAge}
                    onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone / WhatsApp"
                    className={inputClasses}
                    id="form-phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                </div>

                <div className="form-field">
                  <select
                    className={`${inputClasses} ${!formData.interest ? "text-golden-sand/60" : ""}`}
                    id="form-interest"
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  >
                    <option value="">Programme Interest</option>
                    {PROGRAMME_INTERESTS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <textarea
                    placeholder="Tell Us About Your Child"
                    rows={4}
                    className={`${inputClasses} resize-none`}
                    id="form-message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>

                <p className="form-field font-sans text-xs text-sage leading-relaxed">
                  We welcome limited cohorts each month. Your message helps us
                  understand your child&apos;s unique world and ensures the right fit.
                </p>

                <div className="form-field">
                  <Button type="submit" variant="primary" className="w-full" id="form-submit">
                    Send Enquiry
                  </Button>
                </div>
              </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
