"use client";

import Image from "next/image";
import Link from "next/link";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { HeroImageSequence } from "./HeroImageSequence";

type HeroKind = "home" | "fleet" | "oem" | "charging" | "architecture";

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const enter = (p: number, at: number, duration = 8) => clamp((p - at) / duration);
const leave = (p: number, at: number, duration = 12) => 1 - clamp((p - at) / duration);

const heroContent: Record<Exclude<HeroKind,"architecture">, { kicker:string; title:ReactNode; body:string; cta:string; href:string; cue:string }> = {
  home: {
    kicker:"Mobility intelligence · fleet + SDV",
    title:<><span>Intelligence that</span><br/><span className="hero-highlight">Moves</span> with Every<br/>Vehicle.</>,
    body:"Real-time fleet management for transport operators. Specialized automotive software engineering for OEMs and the SDV era. Two disciplines. One mission: eliminate blind spots between vehicles and the platforms that run them.",
    cta:"Explore Fleet Platform",
    href:"/fleet",
    cue:"Scroll to activate the intelligence layer"
  },
  fleet: {
    kicker:"Fleet intelligence platform",
    title:<><span>Total fleet visibility.</span><br/><span className="hero-highlight">Zero Blind Spots.</span></>,
    body:"One platform to track, manage, and optimize every vehicle in your operation—in real time. GPS dots on a map are not enough; Kaarnex closes the gap between data and action.",
    cta:"Book a Fleet Demo",
    href:"/contact",
    cue:"Scroll — the command center wakes up"
  },
  oem: {
    kicker:"OEM / SDV engineering services",
    title:<><span>Engineering the</span><br/><span className="hero-highlight">Software-Defined</span><br/>Vehicle.</>,
    body:"Specialized automotive software engineering from India—at OEM quality, with startup speed. Not a generic IT staffing firm. An automotive engineering partner.",
    cta:"Request an Engineering Brief",
    href:"/contact",
    cue:"Scroll — reveal the software layer"
  },
  charging: {
    kicker:"Charging station intelligence",
    title:<><span>EV fleet readiness,</span><br/><span>powered by the <span className="hero-highlight">depot.</span></span></>,
    body:"Chargers, energy flow, battery state, and depot scheduling—folded into the same intelligence layer that runs your fleet. Physical infrastructure, made software.",
    cta:"Plan Your Charging Layer",
    href:"/contact",
    cue:"Scroll — power up the depot"
  },
};

function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const max = Math.max(1, el.offsetHeight - innerHeight);
      setProgress(clamp(-el.getBoundingClientRect().top / max) * 100);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener("scroll", onScroll, { passive:true });
    addEventListener("resize", onScroll);
    update();
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return { ref, progress };
}

export function ScrollHero({ kind }: { kind:HeroKind }) {
  const { ref, progress:p } = useScrollProgress();
  const length = kind === "home" ? 430 : kind === "charging" ? 330 : 300;
  if (kind === "architecture") return <ArchitectureHero innerRef={ref} progress={p} length={length}/>;
  const copy = heroContent[kind];
  const headlineOpacity = leave(p, kind === "home" ? 28 : 34, 15);
  return (
    <section ref={ref} className={`scroll-hero scroll-hero-${kind}`} style={{height:`${length}vh`, "--p":`${p}%`} as CSSProperties}>
      <div className="scroll-stage">
        {kind === "home"&&<><HeroImageSequence framePath="/kaarnex/home-sequence-hq" frameCount={192} progress={p} filePrefix="frame_" padding={5}/><div className="home-sequence-overlay"/></>}
        {kind === "fleet"&&<><HeroImageSequence framePath="/kaarnex/Fleet_Intelligence_Platform_webp_frames" frameCount={192} progress={p} filePrefix="frame_" padding={5}/><div className="fleet-sequence-overlay"/></>}
        {kind === "charging"&&<><HeroImageSequence framePath="/kaarnex/Car_charging_station_img_sq" frameCount={192} progress={p} filePrefix="frame_" padding={5}/><div className="charging-sequence-overlay"/></>}
        {kind !== "home"&&kind !== "charging"&&kind !== "fleet"&&<><div className="stage-grid" style={{opacity:enter(p,36,14)*.55}}/><div className="stage-route route-one" style={{width:`${enter(p,38,18)*100}%`,opacity:enter(p,38,8)}}/><div className="stage-route route-two" style={{width:`${enter(p,44,18)*82}%`,opacity:enter(p,44,8)}}/></>}

        {kind === "oem" ? <VehicleScene kind={kind} progress={p}/> : null} 

        <div className="scroll-copy" style={{opacity:headlineOpacity,transform:`translateY(${(1-headlineOpacity)*-28}px)`}}>
          <h1 className="hero-heading">{copy.title}</h1><p>{copy.body}</p>
          <div className="hero-buttons"><Link className="kx-button" href={copy.href}>{copy.cta}</Link>{kind === "home" && <Link className="kx-button kx-button-ghost" href="/contact">Talk to Our Engineers</Link>}</div>
        </div>

        <div className="hero-resolution" style={{opacity:enter(p,82,12),transform:`translateY(${(1-enter(p,82,12))*24}px)`}}>
          {kind === "home" ? <><strong>One vehicle. Two worlds of intelligence.</strong><div><Link className="kx-button" href="/fleet">Explore the Platform</Link><Link className="kx-button kx-button-ghost" href="/oem">Engineering Services</Link></div></> :
           kind === "fleet" ? <strong>Every vehicle, driver, route, and passenger—one dashboard.</strong> :
           kind === "charging" ? <strong>Intelligent charging, energy, and depot readiness in one platform.</strong> :
           <strong>Software-defined vehicle engineering for OEMs and connected programs.</strong>}
        </div>
        <div className="stage-progress"><i><b style={{width:`${p}%`}}/></i><span>{kind === "home" ? stageName(p) : kind === "fleet" ? "Fleet command center" : kind === "oem" ? "Vehicle software stack" : "Depot energy intelligence"}</span></div>
      </div>
    </section>
  );
}

function VehicleScene({ kind, progress:p }: { kind:"home"|"oem"; progress:number }) {
  const sensors = kind === "home" ? [
    ["GPS · LOCKED","12%","38%",18],["TCU · ONLINE","46%","10%",21],["CAN · 500 KB/S","38%","58%",24],["RFID · ARMED","60%","40%",27],["OTA · READY","78%","18%",30],["SOS · STANDBY","20%","72%",33]
  ] : [["TCU · V2C LINK","48%","8%",18],["ECU · BODY CTRL","16%","42%",24],["CAN / LIN BUS","40%","60%",30],["UDS · 0 DTC","64%","44%",38],["OTA · WAVE 3","76%","16%",58]];
  return <div className={`photo-car photo-car-${kind}`} style={{transform:`translateX(${enter(p,60,24)*-7}%) scale(${1+clamp(p/100)*.06})`,filter:kind === "oem" ? "brightness(.58) saturate(.72)" : undefined}}>
    <Image src="/kaarnex/car-hero.png" width={1600} height={900} alt={kind === "home" ? "Kaarnex intelligent vehicle" : "Vehicle software cutaway"} priority/>
    <div className="wire-scan" style={{opacity:enter(p,16,6)*leave(p,82,10)}}/><div className="scan-line" style={{left:`${4+enter(p,16,26)*88}%`,opacity:enter(p,16,5)*leave(p,40,6)}}/>
    {sensors.map(([label,x,y,at]) => <div className="sensor" key={String(label)} style={{left:String(x),top:String(y),opacity:enter(p,Number(at),6)*leave(p,90,8)}}><i/><span>{label}</span></div>)}
    {kind === "oem" && <div className="can-line" style={{width:`${enter(p,34,14)*70}%`}}/>}
  </div>;
}

function ChargingScene({progress:p}:{progress:number}) {
  const pct=Math.round(enter(p,32,46)*100);
  const points=[["CP-01 · CHARGING","14%","18%",66,"ok"],["CP-02 · READY","32%","10%",70,"ok"],["CP-04 · CHARGING","52%","16%",74,"ok"],["CP-05 · QUEUED","68%","8%",78,"idle"],["CP-06 · FAULT → TICKET","82%","15%",82,"fault"]];
  return <><div className="charging-car" style={{opacity:enter(p,14,10),transform:`translateX(${(1-enter(p,14,10))*-30}px) scaleX(-1)`}}><Image src="/kaarnex/car-hero.png" width={1600} height={900} alt="EV at charging bay" priority/></div><div className="energy-line" style={{opacity:enter(p,40,8)}}><i/></div>{points.map(([label,x,y,at,state])=><div key={label} className={`depot-point ${state}`} style={{left:String(x),top:String(y),opacity:enter(p,Number(at),6)}}><i/><span>{label}</span></div>)}</>;
}

function HomePanels({progress:p}:{progress:number}) {
  const left=[["Fleet health","98.2%","LIVE"],["Driver score — avg","87 / 100","TODAY"],["Route compliance","99.1%","SLA"],["RFID boardings","4,218","AM SHIFT"]];
  const right=[["OTA campaign","Wave 3 / 5","ROLLOUT"],["ECU diagnostics","0 DTC","CLEAR"],["HIL regression","1,142 pass","CI"],["Cloud sync","42 ms","P99"]];
  return <>{[["FLEET OPERATIONS",left,"left"],["OEM ENGINEERING",right,"right"]].map(([title,cards,side])=><div key={String(title)} className={`data-panel data-panel-${side}`} style={{opacity:enter(p,62,10),transform:`translateY(-50%) translateX(${(1-enter(p,62,12))*(side === "left" ? -60:60)}px)`}}><h3>{title as string}</h3>{(cards as string[][]).map(c=><div className="mini-card" key={c[0]}><div><span>{c[0]}</span><strong>{c[1]}</strong></div><b>{c[2]}</b></div>)}</div>)}</>;
}

function FleetCards({progress:p}:{progress:number}) { const cards=[["Vehicles online","312 / 318","GPS",28],["Driver score — fleet avg","87 / 100","TODAY",36],["Route compliance","99.1%","SLA",44],["RFID boardings","4,218","AM SHIFT",52],["Fuel anomalies","2 flagged","REVIEW",60]]; return <div className="data-panel fleet-live"><h3 style={{opacity:enter(p,26,8)}}>LIVE OPERATIONS</h3>{cards.map(c=><div className="mini-card" key={String(c[0])} style={{opacity:enter(p,Number(c[3]),8),transform:`translateX(${(1-enter(p,Number(c[3]),8))*40}px)`}}><div><span>{c[0]}</span><strong>{c[1]}</strong></div><b>{c[2]}</b></div>)}</div> }

function ArchitectureHero({innerRef,progress:p,length}:{innerRef:React.RefObject<HTMLDivElement|null>;progress:number;length:number}) {
  const steps=[["⌁","Vehicle Edge","",8],["⇄","Encrypted Channel","",18],["▣","Security Layer","",28],["☁","Cloud Processing","",38],["▤","Dashboard","",48]];
  return <section ref={innerRef} className="scroll-hero scroll-hero-architecture" style={{height:`${length}vh`}}><div className="scroll-stage"><div className="architecture-copy"><h1 className="hero-heading">Built to <span className="hero-highlight">Run.</span><br/>Built to <span className="hero-highlight">Last.</span><br/>Built to <span className="hero-highlight">Scale.</span></h1><p>The automotive industry demands zero tolerance for downtime, data integrity failures, or security vulnerabilities. We design against those expectations as a first principle.</p></div><div className="pipeline">{steps.map((s,i)=><div className="pipeline-wrap" key={String(s[1])}><article style={{opacity:enter(p,Number(s[3]),8),transform:`translateY(${(1-enter(p,Number(s[3]),8))*22}px)`}}><b>{s[0]}</b><strong>{s[1]}</strong>{s[2]&&<span>{s[2]}</span>}</article>{i<4&&<i style={{opacity:enter(p,Number(s[3])+6,6)}}><em/></i>}</div>)}</div><div className="stage-progress"><i><b style={{width:`${p}%`}}/></i><span className="kx-mono">VEHICLE → CLOUD · ENCRYPTED</span></div></div></section>;
}

function stageName(p:number){return p<15?"01 — VEHICLE REVEAL":p<38?"02 — INTELLIGENCE LAYER":p<62?"03 — ROUTE & FLEET DATA":p<87?"04 — FLEET × OEM":"05 — RESOLUTION"}
