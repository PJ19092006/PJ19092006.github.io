import React, { useEffect, useRef } from "react";

export const Penguin = (props) => {
  const goose = useRef();
  const happyEyes = [useRef(), useRef()];
  const blushes = [useRef(), useRef()];

  const hover = (state) => {
    blushes.forEach((blush) => {
      blush.current.style.opacity = state === "enter" ? "1" : "0";
    });
    happyEyes.forEach((eye) => {
      eye.current.style.opacity = state === "enter" ? "1" : "0";
    });
    [document.getElementById("eye"), document.getElementById("eye_2")].forEach(
      (eye) => {
        eye.style.opacity = state !== "enter" ? "1" : "0";
      },
    );
  };

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const rekt = document?.getElementById("goose")?.getBoundingClientRect();
      const anchorX = rekt.left + rekt.width / 2;
      const anchorY = rekt.top + rekt.height / 2;
      const intensity = 0.012;
      const moveX = (mouseX - anchorX) * intensity;
      const moveY = (mouseY - anchorY) * intensity;
      [
        document.getElementById("eye"),
        document.getElementById("eye_2"),
      ].forEach((eye) => {
        eye.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
      });
    });

    blushes.forEach((blush) => {
      blush.current.style.opacity = "0";
      blush.current.style.transition = "all 0.15s ease";
    });
    happyEyes.forEach((eye) => {
      eye.current.style.opacity = "0";
      eye.current.style.transition = "all 0.15s ease";
    });
    [document.getElementById("eye"), document.getElementById("eye_2")].forEach(
      (eye) => {
        eye.style.transition = "opacity 0.15s ease";
      },
    );
  }, []);

  return (
    <div
      id="goose"
      style={{ width: "90px", cursor: "pointer" }}
      ref={goose}
      onMouseEnter={() => hover("enter")}
      onMouseLeave={() => hover("leave")}
    >
      <svg
        viewBox="0 0 200 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        style={{ pointerEvents: "none" }}
      >
        {/* Body */}
        <ellipse cx="100" cy="220" rx="65" ry="75" fill="#e8e4dc" />
        <ellipse cx="108" cy="230" rx="52" ry="60" fill="#d4cfc5" />
        {/* Neck */}
        <path
          d="M85 160 Q75 130 80 100 Q83 80 90 65"
          stroke="#e8e4dc"
          strokeWidth="32"
          strokeLinecap="round"
        />
        <path
          d="M88 158 Q78 128 83 98 Q86 78 92 63"
          stroke="#d4cfc5"
          strokeWidth="18"
          strokeLinecap="round"
        />
        {/* Head */}
        <ellipse cx="100" cy="52" rx="32" ry="28" fill="#e8e4dc" />
        <rect x="72" y="38" width="58" height="22" fill="#e8e4dc" />
        {/* Beak */}
        <path d="M68 52 Q55 48 52 54 Q55 60 68 58 Z" fill="#e67e22" />
        <path d="M68 58 Q55 60 54 65 Q57 68 68 62 Z" fill="#d35400" />
        <ellipse cx="59" cy="53" rx="2" ry="1.2" fill="#c0611a" />
        {/* Normal eyes */}
        <circle id="eye" cx="85" cy="48" r="8" fill="#2c2c2c" />
        <circle id="eye_2" cx="112" cy="48" r="8" fill="#2c2c2c" />
        {/* Happy eyes */}
        <path
          id="happy-eye"
          d="M78 51 Q85 42 92 51"
          stroke="#2c2c2c"
          strokeWidth="3.5"
          strokeLinecap="round"
          ref={happyEyes[0]}
        />
        <path
          id="happy-eye_2"
          d="M105 51 Q112 42 119 51"
          stroke="#2c2c2c"
          strokeWidth="3.5"
          strokeLinecap="round"
          ref={happyEyes[1]}
        />
        {/* Blushes */}
        <ellipse
          cx="78"
          cy="57"
          rx="10"
          ry="4.5"
          fill="#FDB0D1"
          ref={blushes[0]}
        />
        <ellipse
          cx="119"
          cy="57"
          rx="10"
          ry="4.5"
          fill="#FDB0D1"
          ref={blushes[1]}
        />
        {/* Legs & feet */}
        <path
          d="M85 285 L75 290"
          stroke="#e67e22"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M110 287 L115 293"
          stroke="#e67e22"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M75 290 L68 305 M75 290 L75 308 M75 290 L83 305"
          stroke="#e67e22"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M115 293 L108 308 M115 293 L115 310 M115 293 L123 307"
          stroke="#e67e22"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
