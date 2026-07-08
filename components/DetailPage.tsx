"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Handshake, LifeBuoy, MapPin } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Action, CTA, Kicker, ModuleGrid, ProofGrid, SectionHead, TagBar } from "./Content";
import { ScrollHero } from "./ScrollHero";
import { publicPath } from "@/lib/publicPath";

const fleetModules = [
  {tag:"TRACKING",title:"Real-Time Fleet Tracking",body:"Sub-minute GPS updates across your entire fleet. Every vehicle’s location, speed, heading, and status on a live map. Historical playback, geofencing alerts, and route adherence monitoring included."},
  {tag:"DRIVERS",title:"Driver Behavior Intelligence",body:"Score every driver on acceleration, braking, cornering, speed compliance, and idle time. Automated alerts, daily scorecards, and gamified performance boards drive measurable improvement."},
  {tag:"RFID · SAFETY",title:"Passenger Safety & RFID Boarding",body:"RFID tap-in/tap-out captures precise boarding records for every passenger. Parent notifications dispatch automatically. Instant headcounts, stop-level logs, and audit-ready attendance."},
  {tag:"SOS",title:"Panic SOS & Emergency Response",body:"One-touch panic activation triggers an immediate alert cascade—control room notification, supervisor SMS, and live location tracking. Built for school transport and safety mandates."},
  {tag:"FUEL",title:"Fuel Monitoring & Efficiency",body:"Track consumption per vehicle, route, and driver via fuel sensors or CAN bus. Detect anomalies, flag siphoning events, and generate reports that pay for the platform within a quarter."},
  {tag:"COMMAND",title:"Operations Dashboard & Reporting",body:"An enterprise command center—route performance, SLA compliance, maintenance scheduling, audit logs, and regulatory reports with role-based permissions."},
  {tag:"MOBILE",title:"Driver & Supervisor Apps",body:"White-labeled Android and iOS apps: trip assignments, route instructions, in-app SOS for drivers; real-time alerts and approval workflows for supervisors. Works offline."},
];
const fleetDeploy=[
  {num:"01",title:"Hardware Supply & Installation",body:"Kaarnex sources, configures, and installs all vehicle hardware—GPS nodes, RFID readers, panic buttons, and dashcams. Turnkey deployment minimizes downtime."},
  {num:"02",title:"SaaS Platform Subscription",body:"Monthly or annual tiers scaled by fleet size. Includes platform access, mobile apps, cloud hosting, data retention, and standard support SLA."},
  {num:"03",title:"Enterprise Custom Deployments",body:"Custom integrations, white-labeling, or on-premise hosting—dedicated engineering pods build, deploy, and maintain bespoke fleet solutions."},
];
const oemServices=[
  {tag:"Remote features",title:"Remote Feature Engineering",body:"Remote-activated vehicle features—climate pre-conditioning, lock/unlock, diagnostics, OEM-branded experiences. Full API design, backend services, and iOS/Android integration."},
  {tag:"OTA",title:"OTA Update Workflow Engineering",body:"End-to-end OTA pipelines: campaign orchestration, differential packages, rollback safety nets, and compliance reporting. AUTOSAR-compatible and Linux/QNX, with multi-ECU sequencing."},
  {tag:"ECU / TCU",title:"ECU / TCU Integration Support",body:"Telematics control units, body control modules, and infotainment ECUs. CAN/LIN protocol handling, DTC management, UDS/OBD-II diagnostic stacks, and V2C communication layers."},
  {tag:"HIL / SIL",title:"HIL / SIL Test Automation",body:"Hardware- and software-in-the-loop frameworks for continuous validation. Test harnesses, automated regression suites, and CI/CD integration that accelerate release cadence."},
  {tag:"Cloud",title:"Backend API & Cloud Infrastructure",body:"Scalable microservices for vehicle data ingestion, command dispatch, and telemetry aggregation. Built for high-volume fleets with sub-100ms latency and multi-region deployment."},
  {tag:"Mobile",title:"White-Label Mobile Applications",body:"OEM-branded companion apps—remote commands, vehicle health, trip logging, service booking, OTA status. Android and iOS, built to OEM UX guidelines with full white-labeling."},
  {tag:"Pods",title:"Engineering Pod Delivery",body:"Dedicated offshore squads embedded in OEM or Tier-1 workflows. 4–12 person pods—tech lead, developers, QA, DevOps—on your tools, your repos, your cadence."},
];
const chargingModules=[
  {tag:"Status",title:"Charger Status & Sessions",body:"Live state of every charge point—output, temperature, session progress, and fault codes. Faults raise maintenance tickets automatically."},
  {tag:"Depot map",title:"Depot Map & Scheduling",body:"A semi top-down view of every bay: charging, ready, queued, or faulted. Overnight schedules sequence vehicles so the fleet is ready by first departure."},
  {tag:"Energy",title:"Energy Analytics & Tariffs",body:"Load curves, per-vehicle energy cost, and off-peak optimization. Shift charging into cheap windows without missing morning readiness."},
  {tag:"Battery",title:"Battery Intelligence",body:"State-of-charge and state-of-health per vehicle, fed into route assignment—range-aware dispatch, no mid-route surprises."},
];

export function DetailPage({slug}:{slug:string}) {
  if(slug==="fleet") return <Fleet/>;
  if(slug==="oem") return <Oem/>;
  if(slug==="charging") return <Charging/>;
  if(slug==="architecture") return <Architecture/>;
  if(slug==="industries") return <Industries/>;
  if(slug==="about") return <About/>;
  return <Contact/>;
}

function Fleet(){return <main id="main"><ScrollHero kind="fleet"/><section className="statement alternate"><div><Kicker>The problem we solve</Kicker><p>Most fleet operators rely on fragmented tools: one vendor for GPS, another for driver scoring, another for reporting. The result is delays, data silos, and decisions made on incomplete information. <em>Kaarnex consolidates everything into one connected platform</em>—purpose-built for transport and mobility fleets in India and emerging markets.</p></div></section><section className="export-section"><div className="kx-container"><SectionHead kicker="CORE PLATFORM MODULES" title="Seven modules. One command center."/><ModuleGrid items={fleetModules}/></div></section><TagBar label="TECHNOLOGY STACK" items={["GPS + IMU nodes","RFID hardware","4G cloud uplink","Edge hub","BLE / RS485","Cloud microservices","Real-time analytics","Secure DevOps","REST APIs — ERP/HR"]}/><section className="export-section"><div className="kx-container"><SectionHead kicker="DEPLOYMENT MODEL" title="Turnkey—from hardware to insight."/><ProofGrid items={fleetDeploy}/></div></section><CTA title="See the platform in action." text="Request a live demo—we’ll map the platform to your fleet’s specific routes, vehicle types, and compliance requirements." label="Book a Fleet Demo"/></main>}

function Oem(){return <main id="main"><ScrollHero kind="oem"/><section className="export-section"><div className="kx-container"><SectionHead kicker="What we build" title="From remote features to full engineering pods."/><ModuleGrid items={oemServices}/></div></section><TagBar label="TECHNOLOGY EXPERTISE" items={["Embedded Linux & QNX","AUTOSAR Classic & Adaptive","CAN / LIN / SOME-IP","OTA — Mender + custom","Android Automotive OS","REST / gRPC","AWS / Azure / GCP","Kubernetes / Docker","CI/CD — Jenkins, GitLab","Python · C · C++ · Go · Kotlin · Swift"]}/><section className="export-section"><div className="kx-container"><SectionHead kicker="ENGAGEMENT MODELS" title="Start scoped. Scale embedded."/><div className="engagement-grid"><article><Kicker>LOW-RISK ENTRY</Kicker><h3>Pilot Engineering Contract</h3><p>A scoped, time-boxed engagement—feature development, test framework, or integration work. Clear deliverables and exit criteria before you commit further.</p></article><article className="accent"><Kicker>LONG-TERM PARTNER</Kicker><h3>Dedicated Engineering Pod</h3><p>An offshore team embedded in your program. Fixed composition, defined SLAs, full IP ownership by client. Scales from 4 to 20+ engineers on program demand.</p></article></div></div></section><CTA title="Let’s talk about your vehicle program." text="Scoping a new connected feature, scaling an OTA program, or looking for a long-term engineering partner in India—tell us your program. We’ll map the right team to it." label="Request an Engineering Brief"/></main>}

function Charging(){return <main id="main"><ScrollHero kind="charging"/><section className="export-section"><div className="kx-container"><SectionHead kicker="Depot intelligence modules" title="From plug to platform."/><ModuleGrid items={chargingModules}/></div></section><section className="statement alternate"><div><Kicker>One intelligence layer</Kicker><p>Charging isn’t a separate system. State-of-charge feeds route assignment. Off-peak tariffs feed dispatch schedules. Charger faults feed maintenance workflows. <em>The depot and the fleet share one brain.</em></p><Action href="/fleet" ghost>See the fleet platform →</Action></div></section><CTA title="Electrifying your fleet?" text="We’ll map charging infrastructure, depot layout, and energy analytics to your routes and duty cycles." label="Plan Your Charging Layer"/></main>}

const architecturePillars=[
  {kicker:"Platform architecture",title:"Edge-first. Cloud-native. Protocol-agnostic.",items:[{title:"Edge-First Design",body:"Fleet hardware buffers, processes, and prioritizes data locally before cloud uplink—continuous operation during connectivity loss, lower transfer costs, no lost visibility."},{title:"Microservices Cloud Backend",body:"Containerized, independently deployable, horizontally scalable services—ingestion, dispatch, analytics, APIs—enabling zero-downtime updates and granular capacity scaling."},{title:"Multi-Protocol Communication",body:"CAN, LIN, RS485, BLE, and Ethernet-based networks. A protocol-agnostic ingestion layer normalizes data across heterogeneous vehicle types and generations."}]},
  {kicker:"Security architecture",title:"No command without cryptographic verification.",items:[{title:"Encrypted Command Channels",body:"All remote commands traverse TLS-encrypted channels with device certificate validation. Source and target identity are cryptographically verified before execution."},{title:"Role-Based Access Control",body:"Granular RBAC across platform and portals. Operators, supervisors, drivers, and executives see only what their role requires. Every access event is audit-logged."},{title:"OTA Security Framework",body:"Package signing, integrity verification, staged rollout with automated health checks, and rollback triggers—aligned to UNECE WP.29 / ISO 21434."}]},
  {kicker:"Delivery excellence",title:"Transparent programs. Owned outcomes.",items:[{title:"Agile Program Governance",body:"Two-week sprints, weekly stakeholder syncs, milestone-based reporting—full visibility without micromanagement. Pod leads own delivery accountability."},{title:"IP Ownership & Confidentiality",body:"Full IP transfer on all client-commissioned work. NDAs before technical disclosure. Engineers operate in client-specified repositories with strict access controls."},{title:"Quality Gates & Code Standards",body:"Automated quality checks, peer review, and coverage thresholds on all deliverables. MISRA C for safety-relevant embedded code; OWASP for cloud-facing APIs."}]},
];
function Architecture(){return <main id="main"><ScrollHero kind="architecture"/>{architecturePillars.map((p,i)=><section key={p.kicker} className={`export-section ${i%2?"alternate":""}`}><div className="kx-container"><SectionHead kicker={p.kicker} title={p.title}/><ProofGrid items={p.items}/></div></section>)}<section className="statement alternate"><div><Kicker>ROADMAP — PROPRIETARY IP</Kicker><p>Phase 3 of the Kaarnex roadmap converts engineering learnings into reusable accelerators—<em>OTA testing SDKs, HIL automation frameworks, and vehicle simulation tooling</em>—reducing custom build time and de-risking program timelines for engineering clients.</p><Action href="/about" ghost>See the full roadmap →</Action></div></section></main>}

const cases={fleet:[
  {tag:"FLEET · SAFETY-CRITICAL",name:"School & Student Transport",body:"The stakes are highest when children are in the vehicle. RFID-based student boarding, real-time route tracking, and instant parent notifications satisfy both safety compliance mandates and parent trust. Panic SOS gives drivers immediate emergency escalation without taking hands off the wheel.",outcomes:["Zero unaccounted students","Real-time parent alerts","Route SLA compliance","Regulatory audit readiness"]},
  {tag:"FLEET · WORKFORCE MOBILITY",name:"Corporate Employee Shuttles",body:"Employee transport demands punctuality, route optimization, and safety reporting for HR and admin teams. Live shuttle tracking, attendance logging, route efficiency analytics, and incident response in a single platform—with APIs into corporate HR and ERP systems.",outcomes:["On-time performance tracking","Female employee safety compliance","Attendance audit trails","Fuel cost reduction"]},
  {tag:"FLEET · MARGIN-CRITICAL",name:"Logistics & Last-Mile Delivery",body:"Where every kilometer translates directly to margin: route performance tracking, driver behavior scoring, fuel monitoring, and SLA compliance reporting. Idle-time reduction and route optimization typically cover platform cost within the first operating quarter.",outcomes:["Delivery SLA visibility","Fuel savings 8–15%","Driver accountability","Reduced maintenance intervals"]},
  {tag:"FLEET · PUBLIC SCALE",name:"Public Transport & BRT",body:"Bus rapid transit and public fleets need schedule adherence, passenger load visibility, and safety incident management at scale. Multi-depot operations with centralized dispatch visibility, route deviation alerts, and compliance reporting for transport authorities.",outcomes:["Schedule adherence dashboards","Passenger incident logs","Government compliance reports","Multi-depot command visibility"]}],sdv:[
  {tag:"SDV · GLOBAL PROGRAMS",name:"Global OEM Connected Vehicle Programs",body:"OEMs scaling connected programs face an engineering capacity crunch—in-house teams cannot absorb backend APIs, OTA infrastructure, remote features, and test automation simultaneously. Kaarnex pods slot into program workflows with pre-vetted automotive engineers, cutting time-to-team from months to weeks.",outcomes:["Faster time-to-feature","Consistent delivery cadence","IP retained by client","Cost-efficient offshore execution"]},
  {tag:"SDV · PRODUCT LINES",name:"Tier-1 Supplier Software Divisions",body:"Tier-1s building telematics modules, infotainment units, or V2X platforms need flexible engineering augmentation for feature validation, protocol integration, and test automation. Kaarnex provides HIL/SIL frameworks and integration engineering for ECU and TCU product lines.",outcomes:["Faster product validation","Reduced QA overhead","Automated regression coverage","Integration risk reduction"]},
  {tag:"SDV · VELOCITY",name:"EV & Mobility Tech Startups",body:"EV startups often build outstanding hardware but face software bandwidth constraints—cloud backend, OTA, and mobile app layers in particular. Kaarnex delivers full-stack connected vehicle software without requiring you to build internal teams from scratch.",outcomes:["Product launch acceleration","Scalable engineering capacity","OEM-grade delivery quality","Reduced time-to-market"]}]};
function Industries(){
  const [tab,setTab]=useState<"fleet"|"sdv">("fleet");
  const [idx,setIdx]=useState(0);
  const storyRefs=useRef<(HTMLElement|null)[]>([]);
  const list=cases[tab];
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(visible) setIdx(Number((visible.target as HTMLElement).dataset.index||0));
    },{threshold:[.25,.5,.7],rootMargin:"-22% 0px -30% 0px"});
    storyRefs.current.slice(0,list.length).forEach(el=>{if(el) observer.observe(el)});
    return()=>observer.disconnect();
  },[tab,list.length]);
  const pick=(value:"fleet"|"sdv")=>{
    if(tab===value){storyRefs.current[0]?.scrollIntoView({behavior:"smooth",block:"center"});return}
    storyRefs.current=[];setIdx(0);setTab(value);
    window.setTimeout(()=>storyRefs.current[0]?.scrollIntoView({behavior:"smooth",block:"center"}),80);
  };
  const go=(i:number)=>{setIdx(i);storyRefs.current[i]?.scrollIntoView({behavior:"smooth",block:"center"})};
  return <main id="main">
    <PageHero kicker="INDUSTRIES & USE CASES" title="Every fleet. Every vehicle program. One intelligence layer." body="Kaarnex serves transport operators managing thousands of vehicles and automotive engineers building the next generation of connected cars. Scroll through the sectors—or choose one directly."/>
    <section className="case-section"><div className="kx-container">
      <div className="case-tabs"><button type="button" aria-pressed={tab==="fleet"} onClick={()=>pick("fleet")} className={tab==="fleet"?"active":""}>Fleet intelligence</button><button type="button" aria-pressed={tab==="sdv"} onClick={()=>pick("sdv")} className={tab==="sdv"?"active":""}>SDV engineering</button></div>
      <div className="case-scroll-layout" key={tab}
>
        <aside className="case-sidebar"><Kicker>Explore by sector</Kicker><div className="case-list">{list.map((x,i)=><button key={x.name} onClick={()=>go(i)} className={idx===i?"active":""}><span>{String(i+1).padStart(2,"0")}</span>{x.name}<i/></button>)}</div><div className="case-progress"><i style={{height:`${((idx+1)/list.length)*100}%`}}/></div></aside>
        <div className="case-stories">{list.map((story,i)=><article ref={el=>{storyRefs.current[i]=el}} data-index={i} className={idx===i?"case-story active":"case-story"} key={story.name}>
          <div className="story-index kx-mono">{String(i+1).padStart(2,"0")}</div><Kicker>{story.tag}</Kicker><h2>{story.name}</h2><p>{story.body}</p><Kicker>Key outcomes</Kicker><div className="story-outcomes">{story.outcomes.map(x=><span key={x}><i/>{x}</span>)}</div><Action href={tab==="fleet"?"/fleet":"/oem"} ghost>{tab==="fleet"?"Explore Fleet Platform":"Explore Engineering Services"} →</Action>
        </article>)}</div>
      </div>
    </div></section>
    <CTA title="Don’t see your fleet or program?" text="If it moves and it matters, we can make it intelligent. Tell us about your operation." label="Schedule a Discovery Call"/>
  </main>
}

const aboutPillars=[{title:"Exclusively Automotive",body:"No retail, fintech, or generic enterprise IT. We exist entirely within mobility and automotive—deeper technical knowledge, faster ramp-up, fewer costly learning curves at client expense."},{title:"Two Revenue Engines, One Compound Advantage",body:"Fleet deployments generate recurring revenue and real-world telematics data. OEM engineering generates high-value project revenue and software depth. Each reinforces the other—clients benefit from both."},{title:"India’s Premium Engineering Destination",body:"World-class automotive engineering talent, massively underutilized by Western OEM programs. Kaarnex curates and deploys it through structured pods—with governance and delivery standards that meet or exceed OEM expectations."}];
const phases=[{num:"PHASE 1 — MARKET ESTABLISHMENT",title:"Prove it in the field.",body:"Fleet platform deployments across school, corporate, and logistics segments in India. Parallel pilot engineering contracts with OEM and Tier-1 clients. Establishing delivery credibility and production-proven references."},{num:"PHASE 2 — OFFSHORE ENGINEERING SCALE",title:"Scale the pods.",body:"Dedicated engineering pod expansion for global OEM and Tier-1 programs. Multi-client delivery operations. Deepening connected vehicle capabilities across OTA, remote feature, and test automation domains."},{num:"PHASE 3 — PROPRIETARY CONNECTED VEHICLE IP",title:"Convert learnings into products.",body:"OTA testing SDKs, HIL automation frameworks, connected vehicle simulation tooling—and eventually proprietary platform IP with licensing potential."}];
const aboutStory="Kaarnex was founded at the intersection of two unsolved problems: fleet operators with no real intelligence, and OEMs with no trusted engineering partner in India.";

function AboutIntro(){return <section className="contact-hero page-system-hero about-page-hero" aria-labelledby="about-title"><div className="contact-guide" aria-hidden="true"/><div className="contact-hero-inner page-system-hero-inner about-page-hero-inner"><h1 id="about-title" className="hero-heading">We built this because the <span className="hero-highlight">gap</span> was real.</h1><RevealWords text={aboutStory}/><div className="contact-hero-actions"><Action href="#about-pillars">Meet Kaarnex</Action><Action href="/architecture" ghost>Explore our intelligence layer</Action></div></div></section>}

function About(){return <main id="main"><AboutIntro/><section id="about-pillars" className="export-section"><div className="kx-container"><SectionHead kicker="What sets us apart" title="Domain depth, compounding by design."/><ProofGrid items={aboutPillars}/></div></section><section className="export-section alternate"><div className="kx-container roadmap"><SectionHead kicker="Our three-phase roadmap" title="From deployments to proprietary IP."/><div className="roadmap-track">{phases.map(x=><article key={x.num}><i/><Kicker>{x.num}</Kicker><h3>{x.title}</h3><p>{x.body}</p></article>)}</div></div></section><section className="export-section"><div className="kx-container brand-grid"><div><Image src={publicPath("/kaarnex/logo.png")} alt="Kaarnex logo" width={430} height={115}/></div><article><Kicker>Brand identity</Kicker><h2>The K is a GPS pin.</h2><p>The Kaarnex logo embeds a ‘K’ that forms a GPS location pin—a visual statement of identity: we track, we position, we make vehicles intelligent. The tagline ‘Where Vehicles Meet Intelligence’ defines both the fleet product and the engineering mission.</p></article></div></section><CTA title="Work with a partner that lives in your domain." label="Start the Conversation"/></main>}

function RevealWords({text,className=""}:{text:string;className?:string}){return <p className={`scroll-reveal-text ${className}`} aria-label={text}>{text.split(" ").map((word,i)=><span aria-hidden="true" style={{"--word-delay":`${Math.min(i,24)*28}ms`} as React.CSSProperties} key={`${word}-${i}`}>{word}&nbsp;</span>)}</p>}

const contactTypes=["Fleet Platform","Engineering Services","Charging Station","Partnership","Investment","Technical Support","Other"];
const contactDetails=[
  ["Business enquiries","business@kaarnex.com","Fleet demos, platform enquiries, commercial discussions, and enterprise conversations."],
  ["Technical & support","support@kaarnex.com","Technical questions, integration discussions, deployment assistance, and platform support."],
  ["Partnership & investment","partners@kaarnex.com","Strategic partnerships, ecosystem opportunities, investment conversations, and channel relationships."],
  ["Headquarters","Kaarnex Technologies Pvt. Ltd. · India","India-based. Globally aligned. Built for the world."]
];
const responseSteps=[
  ["01","Signal received","We review the enquiry and identify the correct intelligence domain."],
  ["02","Program context","We study your vehicles, routes, software scope, and delivery needs."],
  ["03","Right team assigned","Your request moves to the relevant product, engineering, or business team."],
  ["04","Discovery call","We map the next step: demo, technical review, engineering brief, or partnership discussion."]
];

function Contact(){
  const [enquiry,setEnquiry]=useState("Fleet Platform");
  const [sent,setSent]=useState(false);
  const [isSending,setIsSending]=useState(false);
  const [sendError,setSendError]=useState("");
  const formRef=useRef<HTMLFormElement|null>(null);
  const sectionRef=useRef<HTMLElement|null>(null);
  const timelineRef=useRef<HTMLElement>(null);
  useEffect(()=>{
    let frame=0;
    const update=()=>{frame=0;const el=timelineRef.current;if(!el)return;const rect=el.getBoundingClientRect();const range=rect.height+window.innerHeight*.4;const progress=Math.max(0,Math.min(1,(window.innerHeight*.75-rect.top)/range));el.style.setProperty("--timeline-progress",String(progress))};
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update)};
    update();window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",onScroll);
    return()=>{window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",onScroll);if(frame)cancelAnimationFrame(frame)};
  },[]);
  const choose=(value:string)=>{setEnquiry(value);sectionRef.current?.scrollIntoView({behavior:"smooth",block:"start"})};
  const route=enquiry==="Fleet Platform"?"Product Demo Team":enquiry==="Engineering Services"?"SDV Engineering Pod":enquiry==="Charging Station"?"EV Fleet Intelligence Team":enquiry==="Technical Support"?"Technical Support":"Business Desk";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendError("");
    if (isSending) return;
    const form = formRef.current;
    if (!form) {
      setSendError("Something went wrong. Please try again later.");
      return;
    }

    const formData = new FormData(form);
    const honeypot = String(formData.get("website") || "").trim();
    if (honeypot) return;

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const enquiryType = String(formData.get("enquiry_type") || "").trim();
    const message = String(formData.get("message") || "").trim();
    if (!name || !email || !enquiryType || !message) {
      setSendError("Please complete all required fields before sending.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setSendError("Please enter a valid email address.");
      return;
    }

    // Populate hidden fields before sending
    const pageUrlInput = form.querySelector<HTMLInputElement>("input[name='page_url']");
    const submittedAtInput = form.querySelector<HTMLInputElement>("input[name='submitted_at']");
    if (pageUrlInput) pageUrlInput.value = window.location.href;
    if (submittedAtInput) submittedAtInput.value = new Date().toISOString();

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

    setIsSending(true);
    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      setIsSending(false);
      setSent(true);
      form.reset();
      setEnquiry("Fleet Platform");
    } catch {
      setIsSending(false);
      setSendError("Something went wrong while sending your enquiry. Please try again or contact us directly at business@kaarnex.com.");
    }
  };

  return <main id="main" className="contact-page">
    <section className="contact-hero page-system-hero"><div className="contact-guide" aria-hidden="true"/><div className="contact-hero-inner page-system-hero-inner"><h1 className="hero-heading">The <span className="hero-highlight">right conversation</span> starts here.</h1><RevealWords text="Whether you are managing a fleet of 50 vehicles or engineering a connected vehicle feature for a global OEM, Kaarnex wants to understand your program and show you what it can do."/><div className="contact-hero-actions"><Action href="#discovery-form">Start discovery</Action><a className="kx-button kx-button-ghost" href="mailto:business@kaarnex.com">Talk to Kaarnex</a></div><span className="contact-live"><i/>Discovery channel open</span></div></section>
    <section className="contact-path-section"><div className="kx-container"><SectionHead kicker="Choose your path" title="Two paths. One discovery layer."/><RevealWords text="Choose the conversation that fits your program. We route platform, engineering, partnership, and support enquiries to the right Kaarnex team." className="contact-section-copy"/><div className="contact-paths premium-paths">
      <button type="button" className={enquiry==="Fleet Platform"?"active":""} onClick={()=>choose("Fleet Platform")}><span className="path-index">01 / Fleet</span><strong>For fleet operators</strong><span className="path-body">Book a live platform demo mapped to your vehicles, routes, compliance needs, charging workflows, and operating goals.</span><span className="path-tags">{["Fleet tracking","RFID boarding","SOS safety","Fuel analytics","EV charging","Route visibility"].map(x=><i key={x}>{x}</i>)}</span><b>Book a fleet demo ↗</b></button>
      <button type="button" className={enquiry==="Engineering Services"?"active":""} onClick={()=>choose("Engineering Services")}><span className="path-index">02 / Engineering</span><strong>For OEMs & engineering leaders</strong><span className="path-body">Share your vehicle program, connected feature, OTA workflow, ECU integration, or test automation requirement.</span><span className="path-tags">{["OTA","ECU / TCU","HIL / SIL","Connected apps","SDV engineering","Engineering pods"].map(x=><i key={x}>{x}</i>)}</span><b>Request engineering brief ↗</b></button>
    </div></div></section>
    <section ref={sectionRef} id="discovery-form" className="contact-console"><div className="kx-container"><SectionHead kicker="Discovery console" title="Tell us about your program."/>{!sent?<div className="contact-console-grid"><form ref={formRef} onSubmit={handleSubmit}>
      <input type="hidden" name="website" value="" />
      <input type="hidden" name="page_url" value="" />
      <input type="hidden" name="submitted_at" value="" />
      {sendError && <div className="form-error">{sendError}</div>}
      <label>Name<input name="name" required placeholder="Your name"/></label><label>Company<input name="company" placeholder="Company"/></label><label>Role / title<input name="role" placeholder="Role or title"/></label><label>Country / region<input name="region" placeholder="Country or region"/></label><label>Work email<input name="email" required type="email" placeholder="you@company.com"/></label><label>Phone number<input name="phone" type="tel" placeholder="Optional"/></label>
      <label>Enquiry type<select name="enquiry_type" value={enquiry} onChange={e=>setEnquiry(e.target.value)}>{contactTypes.map(x=><option key={x} value={x}>{x}</option>)}</select></label><label>Preferred contact<select name="preferred_contact"><option>Email</option><option>Phone</option><option>Video call</option><option>WhatsApp</option><option>LinkedIn</option></select></label><label>Timeline / urgency<select name="timeline"><option>Exploring</option><option>This quarter</option><option>This month</option><option>Immediate</option></select></label><label className="full">Program details<textarea name="message" required rows={6} placeholder="Vehicles, routes, connected feature, charging requirement, delivery scope, or technical context…"/></label><button className="kx-button full" type="submit" disabled={isSending}>{isSending?"Sending...":"Start Discovery"}</button>
    </form><aside className="contact-routing"><Kicker>Discovery routing</Kicker><div className="routing-active"><span>Selected signal</span><strong>{enquiry}</strong><p>Routed to → {route}</p></div>{[["Fleet Platform","Product Demo Team"],["Engineering Services","SDV Engineering Pod"],["Charging Station","EV Fleet Intelligence Team"],["Partnership","Business Desk"],["Technical Support","Technical Support"]].map(([a,b])=><div className={a===enquiry?"active":""} key={a}><span>{a}</span><i>→</i><b>{b}</b></div>)}<small><i/>Typical response window: within 48 hours</small></aside></div>:<div className="form-success"><i>✓</i><h2>Thank you. Your enquiry has been received.</h2><p>The Kaarnex team will review your message and respond shortly.</p><button onClick={()=>setSent(false)} className="kx-button kx-button-ghost">Send another enquiry</button></div>}</div></section>
    <section id="direct-channels" className="contact-details"><span className="channel-watermark" aria-hidden="true">Kaarnex channels</span><div className="kx-container"><div className="channel-heading"><Kicker>Direct channels</Kicker><h2>Reach the right Kaarnex team.</h2></div><div className="channel-route" aria-hidden="true"><i/></div><div className="contact-detail-grid">{contactDetails.map(([label,value,body],index)=>{const Icon=index===0?BriefcaseBusiness:index===1?LifeBuoy:index===2?Handshake:MapPin;const href=value.includes("@")?`mailto:${value}`:undefined;return <article className={`channel-card channel-${index+1}`} key={label}><div className="channel-card-top"><span className="kx-mono"><i/>{label}</span><Icon aria-hidden="true"/></div>{href?<a href={href}>{value}</a>:<strong>{value}</strong>}<p>{body}</p><span className="channel-action">{href?"Open channel":"View headquarters"}<ArrowUpRight aria-hidden="true"/></span></article>})}</div></div></section>
    <section ref={timelineRef} className="contact-timeline"><div className="kx-container"><SectionHead kicker="What happens next" title="A clear route from signal to conversation."/><div className="timeline-track"><div className="timeline-progress" aria-hidden="true"><i/></div>{responseSteps.map(([num,title,body])=><article key={num}><span>{num}</span><i/><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
    <section className="contact-quick"><div className="kx-container"><div><Kicker>Need something specific?</Kicker><p>Select a signal and we’ll prepare the right discovery path.</p></div><div>{["Fleet Platform","Engineering Services","Charging Station","Partnership","Technical Support"].map(x=><button type="button" key={x} onClick={()=>choose(x)}>{x}</button>)}</div></div></section>
    <section className="contact-final"><div className="kx-container"><Kicker>Where vehicles meet intelligence</Kicker><h2>Let’s build the next intelligence layer together.</h2><RevealWords text="From fleet operations to connected vehicle engineering, Kaarnex helps teams turn vehicle data into decisions, software, and safer mobility systems."/><div><Action href="#discovery-form">Start Discovery</Action><Action href="/" ghost>Explore Kaarnex</Action></div></div></section>
  </main>
}

function PageHero({kicker,title,body,align="center"}:{kicker?:string;title:string;body:string;align?:"center"|"left"}){return <header className={`simple-hero ${align}`}><div><h1 className="hero-heading">{title}</h1><p>{body}</p></div></header>}
