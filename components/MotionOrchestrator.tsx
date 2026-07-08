"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function MotionOrchestrator(){
  const path=usePathname();
  useEffect(()=>{
    if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let observer:IntersectionObserver|undefined;
    let roadmapObserver:IntersectionObserver|undefined;
    const cleanups:(()=>void)[]=[];
    const frame=requestAnimationFrame(()=>{
      const groups=[
        ".scroll-copy>*,.architecture-copy>*,.simple-hero .kx-kicker,.simple-hero h1,.simple-hero p,.about-copy>.kx-kicker,.about-copy>h1,.about-copy>.about-story,.about-copy>.about-actions,.contact-hero-inner>*",
        ".section-head,.statement>div,.mission>div,.export-cta>div,.tag-intro,.contact-section-copy,.contact-console-grid,.form-success,.channel-heading,.channel-route,.contact-quick>.kx-container,.contact-final>.kx-container,.footer-hero,.footer-grid,.footer-bottom",
        ".module-grid article,.proof-grid article,.vertical-cards>a,.engagement-grid article,.brand-grid>*,.premium-paths>button,.contact-detail-grid article,.contact-timeline article",
        ".case-tabs,.case-sidebar,.case-story>.kx-kicker,.case-story>h2,.case-story>p,.story-outcomes,.case-story>.kx-button"
      ];
      const reveals=new Set<HTMLElement>();
      groups.forEach(selector=>document.querySelectorAll<HTMLElement>(selector).forEach((el,i)=>{reveals.add(el);el.style.setProperty("--reveal-delay",`${Math.min(i%6,5)*85}ms`)}));
      reveals.forEach(el=>el.classList.add("motion-reveal"));
      document.querySelectorAll<HTMLElement>(".vertical-cards img,.brand-grid img").forEach(el=>el.classList.add("motion-image"));
      observer=new IntersectionObserver(entries=>entries.forEach(entry=>{entry.target.classList.toggle("motion-in",entry.isIntersecting);entry.target.querySelectorAll(".motion-image").forEach(image=>image.classList.toggle("motion-in",entry.isIntersecting))}),{threshold:.16,rootMargin:"-5% 0px -8% 0px"});
      document.querySelectorAll<HTMLElement>(".motion-reveal").forEach(el=>observer?.observe(el));
      const roadmapItems=[...document.querySelectorAll<HTMLElement>(".roadmap article")];
      roadmapItems.forEach(el=>{el.classList.add("motion-reveal");el.style.setProperty("--reveal-delay","0ms")});
      roadmapObserver=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle("motion-in",entry.isIntersecting)),{threshold:.1,rootMargin:"-34% 0px -34% 0px"});
      roadmapItems.forEach(el=>roadmapObserver?.observe(el));
      if(matchMedia("(pointer:fine)").matches){
        document.querySelectorAll<HTMLElement>(".module-grid article,.vertical-cards>a,.engagement-grid article").forEach(el=>{
          const move=(event:PointerEvent)=>{const r=el.getBoundingClientRect();const x=(event.clientX-r.left)/r.width-.5;const y=(event.clientY-r.top)/r.height-.5;el.style.setProperty("--tilt-x",`${y*-2.4}deg`);el.style.setProperty("--tilt-y",`${x*3}deg`)};
          const leave=()=>{el.style.setProperty("--tilt-x","0deg");el.style.setProperty("--tilt-y","0deg")};
          el.addEventListener("pointermove",move);el.addEventListener("pointerleave",leave);cleanups.push(()=>{el.removeEventListener("pointermove",move);el.removeEventListener("pointerleave",leave)});
        });
      }
    });
    return()=>{cancelAnimationFrame(frame);observer?.disconnect();roadmapObserver?.disconnect();cleanups.forEach(fn=>fn())};
  },[path]);
  return null;
}
