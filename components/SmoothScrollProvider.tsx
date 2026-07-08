"use client";

import Lenis from "lenis";
import LenisSnap from "lenis/snap";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function SmoothScrollProvider({children}:{children:React.ReactNode}){
  const path=usePathname();
  useEffect(()=>{
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    if(reduced.matches) return;
    const easing=(t:number)=>1-Math.pow(1-t,3);
    const lenis=new Lenis({duration:1.02,easing,smoothWheel:true,wheelMultiplier:.86,touchMultiplier:1.05,infinite:false,anchors:true,stopInertiaOnNavigate:true,virtualScroll:data=>{if(data.event.type==="wheel")data.deltaY=Math.max(-360,Math.min(360,data.deltaY));return true}});
    const snap=new LenisSnap(lenis,{type:"proximity",duration:.66,easing,distanceThreshold:"18%",debounce:180});
    const phaseSnap=new LenisSnap(lenis,{type:"proximity",duration:.72,easing,distanceThreshold:"55%",debounce:160});
    const snapFrame=requestAnimationFrame(()=>{
      snap.addElements([...document.querySelectorAll<HTMLElement>("main>section:not(.scroll-hero),main>header,.kx-footer")],{align:"start"});
      phaseSnap.addElements([...document.querySelectorAll<HTMLElement>(".roadmap article")],{align:"center"});
    });
    let frame=0;
    const raf=(time:number)=>{lenis.raf(time);frame=requestAnimationFrame(raf)};
    frame=requestAnimationFrame(raf);
    return()=>{cancelAnimationFrame(snapFrame);cancelAnimationFrame(frame);phaseSnap.destroy();snap.destroy();lenis.destroy()};
  },[path]);
  return <>{children}</>;
}
