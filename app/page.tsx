import Image from "next/image";
import Link from "next/link";
import { Action, CTA, Kicker, ProofGrid, SectionHead } from "@/components/Content";
import { ScrollHero } from "@/components/ScrollHero";
import { publicPath } from "@/lib/publicPath";

const proof = [
  {num:"01",title:"Depth over breadth",body:"We operate exclusively in mobility. Every engineer, every product, every deployment is automotive—no dilution from unrelated domains. That specialization translates directly into faster delivery and fewer integration surprises."},
  {num:"02",title:"India’s engineering advantage, without the trade-offs",body:"Enterprise-grade automotive software from India—with full program transparency, timezone-aligned collaboration, and engineering accountability that matches global OEM standards."},
  {num:"03",title:"Platform thinking, not ticket-fixing",body:"Our fleet platform is built from real-world operator deployments. Our engineering services feed learnings back into reusable accelerators and OTA frameworks—every engagement makes the next one faster."},
];
const industries = [["School & Student Transport Operators","RFID · SOS"],["Corporate Employee Shuttle Programs","SLA · Safety"],["Logistics & Last-Mile Delivery Fleets","Fuel · Routes"],["Public Transport & Bus Rapid Transit","Multi-Depot"],["Global Automotive OEMs & Tier-1 Suppliers","OTA · ECU"],["Mobility Tech Startups & EV Platforms","Full-Stack"]];

export default function Home() {
  return <main id="main">
    <ScrollHero kind="home"/>
    <section className="export-section"><div className="kx-container"><SectionHead kicker="Two verticals · one mission" title="Built for operators and OEMs who demand more."/><div className="vertical-cards">
      <Link href="/fleet"><Image src={publicPath("/kaarnex/detail-grille.png")} alt="Fleet intelligence" width={1200} height={560}/><div><Kicker>For operators</Kicker><h3>Fleet Intelligence Platform</h3><p>Real-time tracking, driver behavior analytics, RFID passenger boarding, SOS safety systems, and fuel intelligence—purpose-built for school buses, corporate shuttles, logistics fleets, and public transport operators.</p><span>Explore platform →</span></div></Link>
      <Link href="/oem"><Image src={publicPath("/kaarnex/detail-shell.png")} alt="SDV engineering" width={1200} height={560}/><div><Kicker>For OEMs & Tier-1s</Kicker><h3>SDV / Connected Vehicle Engineering</h3><p>Remote feature delivery, OTA workflow management, ECU/TCU integration, HIL/SIL test automation, white-label mobile apps, and offshore engineering pods—for the next generation of software-defined vehicles.</p><span>Engineering services →</span></div></Link>
    </div></div></section>
    <section className="export-section alternate"><div className="kx-container"><SectionHead kicker="Why Kaarnex" title="Three proof points."/><ProofGrid items={proof}/></div></section>
    <section className="export-section"><div className="kx-container industries-home"><div><SectionHead kicker="Industries served" title="Every fleet. Every vehicle program."/><Action href="/industries" ghost>See use cases →</Action></div><div className="industry-list">{industries.map(([name,tag])=><div key={name}><strong>{name}</strong><span>{tag}</span></div>)}</div></div></section>
    <CTA title="Ready to bring your fleet or vehicle program into the intelligence era?" label="Schedule a Discovery Call"/>
  </main>;
}
