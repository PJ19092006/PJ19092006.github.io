import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { Page } from "../../components/Page";
import { blue } from "../../utils";
import { campaignPlans, campaignXP } from "../../data/campaign";
import {
  StyledCampaign,
  Marquee,
  SectionLabel,
  Headline,
  TwoCol,
  XPTable,
  XPRow,
  PlansGrid,
  PlanCard,
  CTARow,
} from "./Campaign.styled";

gsap.registerPlugin(ScrollTrigger);

export const Campaign = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const xpRowsRef = useRef([]);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        xpRowsRef.current,
        { x: -32, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: xpRowsRef.current[0],
            start: "top 88%",
          },
        },
      );

      gsap.fromTo(
        cardsRef.current,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.9)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: "top 88%",
          },
        },
      );

      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <Page header="Vote">
        {/* Single wrapper that spans all grid columns — same as how About's Text/SkillsWrapper work */}
        <StyledCampaign>
          <Marquee color={blue}>
            <div className="track">
              {Array(2)
                .fill(null)
                .map((_, i) => (
                  <span key={i}>VOTE · DIRECTOR OF TECH · </span>
                ))}
            </div>
          </Marquee>

          <SectionLabel color={blue}>
            CSSA Election · Director of Tech
          </SectionLabel>

          <TwoCol>
            <Headline ref={headlineRef} color={blue}>
              <h2>
                RUNNING FOR
                <br />
                <span>TECH DIRECTOR.</span>
              </h2>
              <p>
                First-year CS, already shipping production websites,
                contributing to open source, and living on GitHub. I'm not
                pitching ideas I thought up last week — most of this I've
                already been doing. You can verify every word.
              </p>
            </Headline>

            <div>
              <SectionLabel color={blue}>Experience</SectionLabel>
              <XPTable color={blue}>
                {campaignXP.map((item, i) => (
                  <XPRow
                    key={i}
                    ref={(el) => (xpRowsRef.current[i] = el)}
                    color={blue}
                  >
                    <span className="label">{item.label}</span>
                    <span className="sub">{item.sub}</span>
                  </XPRow>
                ))}
              </XPTable>
            </div>
          </TwoCol>

          <SectionLabel color={blue}>What I'll Do</SectionLabel>
          <PlansGrid>
            {campaignPlans.map((plan, i) => (
              <PlanCard
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                color={plan.color}
              >
                <div className="plan-num">{plan.icon}</div>
                <p className="plan-tag">{plan.tag}</p>
                <h3>{plan.title}</h3>
                <p>{plan.desc}</p>
              </PlanCard>
            ))}
          </PlansGrid>

          {/* <CTARow ref={ctaRef} color={blue}>
            <p>Count on me — I literally live on GitHub.</p>
            <a
              href="https://github.com/teshank2137"
              target="_blank"
              rel="noreferrer"
            >
              See My Work ↗
            </a>
          </CTARow> */}
        </StyledCampaign>
      </Page>
    </div>
  );
};
