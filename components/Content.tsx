import Link from "next/link";

export function Kicker({children}:{children:React.ReactNode}) { return <div className="kx-kicker">{children}</div> }
export function Action({href,children,ghost=false}:{href:string;children:React.ReactNode;ghost?:boolean}) { return <Link className={ghost?"kx-button kx-button-ghost":"kx-button"} href={href}>{children}</Link> }

export function SectionHead({kicker,title}:{kicker:string;title:string}) { return <div className="section-head"><Kicker>{kicker}</Kicker><h2>{title}</h2></div> }

export function ModuleGrid({items}:{items:{tag:string;title:string;body:string}[]}) { return <div className="module-grid">{items.map(x=><article key={x.title}><Kicker>{x.tag}</Kicker><h3>{x.title}</h3><p>{x.body}</p></article>)}</div> }

export function ProofGrid({items}:{items:{num?:string;title:string;body:string}[]}) { return <div className="proof-grid">{items.map((x,i)=><article key={x.title}><span>{x.num??String(i+1).padStart(2,"0")}</span><h3>{x.title}</h3><p>{x.body}</p></article>)}</div> }

export function TagBar({label,items}:{label:string;items:string[]}) {
  const second = [...items].reverse();
  return <section className="tag-section">
    <div className="kx-container tag-intro"><Kicker>{label}</Kicker><h2>Engineering across the full vehicle stack.</h2><p>Embedded systems, cloud infrastructure, vehicle networks, and release engineering—one continuous capability line.</p></div>
    <div className="tag-marquee" aria-hidden="true">
      <div className="tag-track">{[...items,...items].map((x,i)=><span key={`${x}-${i}`}><i/>{x}</span>)}</div>
      <div className="tag-track reverse">{[...second,...second].map((x,i)=><span key={`${x}-reverse-${i}`}><i/>{x}</span>)}</div>
    </div>
    <ul className="sr-only">{items.map(x=><li key={x}>{x}</li>)}</ul>
  </section>
}

export function CTA({title,text,href="/contact",label}:{title:string;text?:string;href?:string;label:string}) { return <section className="export-cta"><div><h2>{title}</h2>{text&&<p>{text}</p>}<Action href={href}>{label} →</Action></div></section> }
