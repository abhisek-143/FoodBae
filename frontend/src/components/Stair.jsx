import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TbQrcode } from "react-icons/tb";
import { useLocation } from "react-router-dom";


const Stair = ({ children }) => {
  const parentRef = useRef(null);
  const appref = useRef(null);
  const [is_animate, setIs_animate] = useState(true);

  const currentPath = useLocation().pathname;

  useGSAP(
    () => {
      setIs_animate(true);
      const t1 = gsap.timeline();

      t1.set(parentRef, {
        display: "block",
        pointerEvents: "auto",
      });

      t1.from(".stair", {
        height: 0,
        duration: 0.5,
        stagger: {
          amount: -0.2,
        },
      });
      t1.to(".stair", {
        y: "100%",
        opacity:0,
        duration: 0.5,
        stagger: {
          amount: -0.3,
        },
      });

      t1.set(parentRef, {
        display: "none",
        opacity:0,
        pointerEvents: "none",
      });

      gsap.from(appref.current, {
        opacity: 0,
        duration: 1,
        delay: 0.7,
        scale: 1.1,
      });
      setIs_animate(false);

      return () => {
        t1.kill();
      };
    },
    {
      dependencies: [currentPath],
      revertOnUpdate: true,
    },
  );

  return (
    <>
      <div
        ref={parentRef}
        className="fixed h-screen w-full  top-0 pointer-events-none z-50"
      >
        <div className="flex w-full h-full ">
          <div className="h-screen stair w-1/6 bg-black"></div>
          <div className="h-screen stair w-1/6 bg-white"></div>
          <div className="h-screen stair w-1/6 bg-black"></div>
          <div className="h-screen stair w-1/6 bg-white"></div>
          <div className="h-screen stair w-1/6 bg-black"></div>
          <div className="h-screen stair w-1/6 bg-white"></div>
        </div>
      </div>
      <div ref={appref} className="">
        {" "}
        {children}
      </div>
    </>
  );
};

export default Stair;
