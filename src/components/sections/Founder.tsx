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
    image: "/team-kartik.png",
    position: "object-center",
  },
  {
    name: "Kamya Ravi",
    role: "Chief Executive Officer",
    image: "/team-kamya.png",
    position: "object-center",
  },
  {
    name: "Asher Shalom",
    role: "Creative Director",
    image: "/team-asher.png",
    position: "object-top",
  },
];

export default function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        founderRef.current,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.9, ease: E_OUT,
          scrollTrigger: { trigger: founderRef.current, start: "top 88%", once: true },
        }
      );

      const cards = teamRef.current?.querySelectorAll(".team-card");
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 36 },
          {
            opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: E_OUT,
            scrollTrigger: { trigger: teamRef.current, start: "top 88%", once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="founder" className="section-padding bg-sandstone-beige/20">
      <div className="container-wide">
        <SectionHeading
          eyebrow="House Akarian"
          heading="The Team"
          align="center"
        />

        {/* All four in one row */}
        <div ref={teamRef} className="grid grid-cols-2 sm:grid-cols-4 gap-12 sm:gap-10 max-w-5xl mx-auto">

          {/* Akshatha — arch portrait */}
          <div ref={founderRef} className="team-card flex flex-col items-center text-center gap-4">
            <div className="relative h-44 w-32 sm:h-52 sm:w-36 arch-top overflow-hidden border border-golden-sand/30 shadow-[0_8px_32px_-8px_rgba(47,59,46,0.22)]">
              <Image
                src="/founder-new.png"
                alt="Akshatha"
                fill
                className="object-cover object-top"
                sizes="144px"
                priority
              />
            </div>
            <div>
              <p className="font-serif text-xl font-bold text-forest-green">Akshatha</p>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-deep-olive mt-1">Founder &amp; MD</p>
              <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-deep-olive/70 mt-0.5">EISE Instructor</p>
            </div>
          </div>

          {/* Team — circle avatars */}
          {TEAM.map((member) => (
            <div key={member.name} className="team-card flex flex-col items-center text-center gap-4">
              <div className="relative h-40 w-40 sm:h-48 sm:w-48 rounded-full overflow-hidden border-2 border-golden-sand/30 shadow-[0_8px_32px_-8px_rgba(47,59,46,0.18)]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className={`object-cover ${member.position}`}
                  sizes="192px"
                />
              </div>
              <div>
                <p className="font-serif text-xl font-bold text-forest-green">{member.name}</p>
                <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-deep-olive mt-1">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
