"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const E_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

const TEAM = [
  {
    name: "Kartik Ravi",
    role: "Chief Technical Officer",
    sub: "Finance, Administration & Operations",
    image: "/team-kartik.png",
    position: "object-center",
    bio: "Kartik oversees the operational and administrative framework that powers Akarian. He ensures seamless execution across finance, systems and organisational operations, supporting the growth and scalability of the program.",
  },
  {
    name: "Kamya Ravi",
    role: "Chief Academic Officer",
    sub: "Academic & Program Operations",
    image: "/team-kamya.png",
    position: "object-center",
    bio: "Kamya contributes to curriculum development and program design at Akarian. Currently pursuing Clinical Psychology, she brings a growing understanding of human behaviour and development, complemented by a strong creative background and passion for music and art.",
  },
  {
    name: "Asher",
    role: "Creative Associate Director",
    sub: "Digital Content & Marketing Operations",
    image: "/team-asher.png",
    position: "object-top",
    bio: "Asher leads Akarian's creative communication and digital presence. From visual storytelling to content strategy, he helps translate Akarian's vision into meaningful experiences for families and educational partners.",
  },
];

export default function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(founderRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: E_OUT,
          scrollTrigger: { trigger: founderRef.current, start: "top 88%", once: true } }
      );
      const cards = teamRef.current?.querySelectorAll(".team-card");
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: E_OUT,
            scrollTrigger: { trigger: teamRef.current, start: "top 88%", once: true } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="founder" className="section-padding bg-sandstone-beige/20">
      <div className="container-wide">
        <SectionHeading
          eyebrow="The People Behind Akarian"
          heading="Our Team"
          align="center"
        />

        {/* Founder row — arch photo left, text right */}
        <div ref={founderRef} className="flex flex-col sm:flex-row items-center sm:items-start gap-10 mb-16 sm:mb-20 max-w-4xl mx-auto">
          {/* Arch frame */}
          <div className="shrink-0 relative h-72 w-52 sm:h-80 sm:w-56 arch-top overflow-hidden border border-golden-sand/30 shadow-[0_24px_64px_-16px_rgba(47,59,46,0.22)]">
            <Image
              src="/founder-photo.jpg"
              alt="Akshatha"
              fill
              className="object-cover object-top"
              sizes="224px"
              priority
            />
          </div>
          {/* Text */}
          <div className="text-center sm:text-left pt-2">
            <p className="font-serif text-4xl sm:text-5xl font-bold text-forest-green">Akshatha</p>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-deep-olive mt-2">Founder &amp; Managing Director</p>
            <p className="font-sans text-sm italic text-deep-olive/60 mt-1">Toddler Development Specialist &nbsp;|&nbsp; EISE Instructor</p>
            <div className="mt-1 mb-5 h-px w-10 bg-golden-sand/50 mx-auto sm:mx-0" />
            <div className="space-y-3 max-w-md">
              <p className="font-sans text-sm text-sage leading-relaxed">
                Akshatha&apos;s journey spans both early childhood education and healthcare environments, giving her a unique perspective on child development.
              </p>
              <p className="font-sans text-sm text-sage leading-relaxed">
                Through years of working closely with children, families and developmental professionals, she recognised a critical gap between academic readiness and developmental readiness.
              </p>
              <p className="font-sans text-sm text-sage leading-relaxed">
                This insight led to the creation of Akarian — a platform dedicated to building the sensory foundations that support learning, regulation and lifelong growth.
              </p>
            </div>
          </div>
        </div>

        {/* Team row — 3 circle cards */}
        <div ref={teamRef} className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
          {TEAM.map((member) => (
            <div key={member.name} className="team-card flex flex-col items-center text-center gap-4">
              <div className={`relative h-36 w-36 sm:h-40 sm:w-40 rounded-full overflow-hidden border-2 border-golden-sand/30 shadow-[0_8px_32px_-8px_rgba(47,59,46,0.18)]`}>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className={`object-cover ${member.position}`}
                  sizes="160px"
                />
              </div>
              <div>
                <p className="font-serif text-xl font-bold text-forest-green">{member.name}</p>
                <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-deep-olive mt-1">{member.role}</p>
                <p className="font-sans text-[0.7rem] italic text-deep-olive/60 mt-0.5">{member.sub}</p>
                <div className="mt-2 mb-3 h-px w-8 bg-golden-sand/50 mx-auto" />
                <p className="font-sans text-[0.78rem] text-sage leading-relaxed max-w-[14rem] mx-auto">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
