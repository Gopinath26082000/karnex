"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { publicPath } from "@/lib/publicPath";

const navigation = [["/fleet","Fleet platform"],["/oem","SDV engineering"],["/architecture","Architecture"],["/industries","Industries"],["/charging","Charging"],["/about","About"]];
const normalizePath = (value:string|null) => {
  if (!value || value === "/") return "/";
  return value.replace(/\/+$/,"");
};

export function Header(){
  const path=usePathname();
  const currentPath=normalizePath(path);
  const [open,setOpen]=useState(false);
  useEffect(()=>setOpen(false),[path]);
  return <header className="kx-header"><Link href="/" className="kx-logo" aria-label="Kaarnex home"><Image src={publicPath("/kaarnex/logo.png")} alt="Kaarnex" width={430} height={115} priority/></Link><nav className={open?"kx-nav is-open":"kx-nav"} aria-label="Main navigation">{navigation.map(([href,label])=><Link key={href} href={href} className={currentPath===normalizePath(href)?"is-active":""}>{label}</Link>)}<Link className={currentPath==="/contact"?"kx-talk is-active":"kx-talk"} href="/contact">Talk to us</Link></nav><button className="kx-menu" onClick={()=>setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}><i/><i/></button></header>;
}

export function Footer(){
  return <footer className="kx-footer">
    <div className="footer-signal" aria-hidden="true"><i/><i/><i/><span/></div>
    <div className="kx-container">
      <div className="footer-hero"><div><span className="kx-kicker">The next move starts here</span><h2>Where vehicles<br/><em>meet intelligence.</em></h2></div><div><p>One intelligence layer for fleets, engineering programs, and the electric mobility systems connecting them.</p><Link href="/contact" className="footer-orbit" aria-label="Start a conversation"><span>Start a<br/>conversation</span><i>↗</i></Link></div></div>
      <div className="footer-grid">
        <div className="footer-brand"><Link href="/" className="kx-footer-logo"><Image src={publicPath("/kaarnex/logo.png")} alt="Kaarnex" width={430} height={115}/></Link></div>
        <div><h3>Explore</h3><Link href="/fleet">Fleet platform</Link><Link href="/oem">SDV engineering</Link><Link href="/charging">Charging intelligence</Link><Link href="/architecture">Architecture</Link></div>
        <div><h3>Company</h3><Link href="/industries">Industries</Link><Link href="/about">About Kaarnex</Link><Link href="/contact">Contact</Link><a href="https://www.linkedin.com/company/kaarnex" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
        <div className="footer-contact"><h3>New business</h3><a href="mailto:business@kaarnex.com">business@kaarnex.com</a><p>India-based.<br/>Globally aligned.</p></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Kaarnex. All rights reserved.</span><span>BENGALURU, INDIA · 12.9716° N / 77.5946° E</span><div><a href="#main">BACK TO TOP ↑</a></div></div>
    </div>
  </footer>;
}
