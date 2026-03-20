import styled, { keyframes } from "styled-components";
import { blue, typeScale } from "../../utils";

const marquee = keyframes`
  from { transform: translateX(0%); }
  to   { transform: translateX(-50%); }
`;

export const StyledCampaign = styled.div`
  grid-column: 1 / -1;
  position: relative;
  overflow: hidden;
  padding: 0 4rem 6rem;

  @media screen and (max-width: 940px) {
    padding: 0 3rem 4rem;
  }

  @media screen and (max-width: 720px) {
    padding: 0 1.5rem 3rem;
  }
`;

export const Marquee = styled.div`
  pointer-events: none;
  user-select: none;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0.06;

  .track {
    display: flex;
    width: max-content;
    animation: ${marquee} 18s linear infinite;
  }

  span {
    font-size: clamp(4rem, 10vw, 10rem);
    font-weight: 900;
    color: ${(props) => (props.color ? props.color["60"] : blue["60"])};
    white-space: nowrap;
    padding-right: 3rem;
    line-height: 1;
    letter-spacing: -0.02em;
  }
`;

export const SectionLabel = styled.p`
  font-size: ${typeScale.helperText};
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${(props) => (props.color ? props.color["50"] : blue["50"])};
  margin-bottom: 1rem;
`;

export const Headline = styled.div`
  margin-bottom: 3rem;

  h2 {
    font-size: clamp(2rem, 5vw, ${typeScale.headline});
    font-weight: 900;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: ${(props) => (props.color ? props.color["110"] : blue["110"])};
    margin: 0 0 1.25rem;

    span {
      color: ${(props) => (props.color ? props.color["60"] : blue["60"])};
    }
  }

  p {
    font-size: ${typeScale.paragraph};
    line-height: 1.8;
    color: ${(props) => (props.color ? props.color["90"] : blue["90"])};
  }
`;

export const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 3rem;

  @media screen and (max-width: 940px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const XPTable = styled.div`
  border-top: 2px solid
    ${(props) => (props.color ? props.color["20"] : blue["20"])};
`;

export const XPRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  border-bottom: 2px solid
    ${(props) => (props.color ? props.color["20"] : blue["20"])};
  padding: 0.85rem 0;
  transition: padding-left 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    padding-left: 0.5rem;
  }

  .label {
    font-weight: 700;
    font-size: ${typeScale.paragraph};
    color: ${(props) => (props.color ? props.color["110"] : blue["110"])};
  }

  .sub {
    font-size: ${typeScale.helperText};
    color: ${(props) => (props.color ? props.color["70"] : blue["70"])};
    line-height: 1.5;
  }
`;

export const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 3rem;

  @media screen and (max-width: 940px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const PlanCard = styled.div`
  background-color: ${(props) =>
    props.color ? props.color["10"] : blue["10"]};
  color: ${(props) => (props.color ? props.color["110"] : blue["110"])};
  border: 3px solid ${(props) => (props.color ? props.color["60"] : blue["60"])};
  box-shadow: 0.4rem 0.4rem 0
    ${(props) => (props.color ? props.color["60"] : blue["60"])};
  border-radius: 1rem;
  padding: 1.25rem 1rem;
  transition:
    transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1),
    box-shadow 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    transform: translate(-0.15rem, -0.15rem);
    box-shadow: 0.55rem 0.55rem 0
      ${(props) => (props.color ? props.color["60"] : blue["60"])};
  }

  .plan-num {
    font-size: ${typeScale.text};
    font-weight: 900;
    color: ${(props) => (props.color ? props.color["60"] : blue["60"])};
    margin-bottom: 0.4rem;
    line-height: 1;
  }

  .plan-tag {
    font-size: ${typeScale.helperText};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${(props) => (props.color ? props.color["70"] : blue["70"])};
    margin-bottom: 0.3rem;
  }

  h3 {
    font-size: ${typeScale.text};
    font-weight: 700;
    color: ${(props) => (props.color ? props.color["110"] : blue["110"])};
    margin: 0 0 0.6rem;
    line-height: 1.25;
  }

  p {
    font-size: ${typeScale.helperText};
    color: ${(props) => (props.color ? props.color["90"] : blue["90"])};
    line-height: 1.6;
    margin: 0;
  }
`;

export const CTARow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;

  p {
    font-size: ${typeScale.text};
    font-weight: 700;
    color: ${(props) => (props.color ? props.color["110"] : blue["110"])};
    margin: 0;
  }

  a {
    display: inline-block;
    padding: 0.65rem 1.5rem;
    border: 3px solid
      ${(props) => (props.color ? props.color["60"] : blue["60"])};
    box-shadow: 0.3rem 0.3rem 0
      ${(props) => (props.color ? props.color["60"] : blue["60"])};
    color: ${(props) => (props.color ? props.color["60"] : blue["60"])};
    font-size: ${typeScale.paragraph};
    font-family: "Roboto Mono", monospace;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 0.5rem;
    transition:
      transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1),
      box-shadow 0.2s cubic-bezier(0.165, 0.84, 0.44, 1),
      background-color 0.2s ease,
      color 0.2s ease;

    &:hover {
      transform: translate(-0.1rem, -0.1rem);
      box-shadow: 0.45rem 0.45rem 0
        ${(props) => (props.color ? props.color["60"] : blue["60"])};
      background-color: ${(props) =>
        props.color ? props.color["60"] : blue["60"]};
      color: ${(props) => (props.color ? props.color["00"] : blue["00"])};
    }
  }

  @media screen and (max-width: 720px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
