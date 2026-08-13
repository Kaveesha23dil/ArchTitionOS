"use client";

import { FormEvent, useEffect, useState } from "react";
import { TerminalLoader } from "@/components/TerminalLoader";

const A="https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000";
const img=(n:string)=>`${A}/${n}`;
const coaches=[
  {words:["Expert","Result-","Driven","Coaching"],image:"5.webp",name:"Marco Vidal",role:"Head Coach"},
  {words:["Sharper","Faster","Stronger","Player"],image:"4.webp",name:"Elena Sokolova",role:"Performance Coach"},
  {words:["Future","Champions","Start","Here"],image:"1.webp",name:"James Okoro",role:"Juniors Lead"},
];
const gear=[
  {image:"2.webp",brand:"Baseline Pro",title:"Featured Gear",cta:"Shop the kit"},
  {image:"3.webp",brand:"Court Series",title:"Summer Drop",cta:"View the line"},
  {image:"5.webp",brand:"Academy Kit",title:"Junior Range",cta:"Browse juniors"},
];
const programs=[
  ["01","Junior Development","Fundamentals, footwork, and match play for ages 6–14.","junior"],
  ["02","Performance Squad","High-volume training for competitive and ranked players.","performance"],
  ["03","Adult Clinics","Small-group sessions to sharpen technique and fitness.","adult"],
  ["04","Private Coaching","One-to-one sessions tailored to your goals and schedule.","private"],
];
const testimonials=[
  ["I added a level to my serve in one season. The coaching is detailed and it actually sticks.","Priya Anand","Performance Squad"],
  ["Best courts in the city and a team that treats every member like a competitor.","Lukas Brenner","Adult Clinics"],
  ["My daughter went from shy beginner to club champion. Worth every minute.","Dana Okafor","Parent, Junior Development"],
];

function Ball(){return <svg className="ball" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M4.8 5.6a9 9 0 0 0 0 12.8M19.2 5.6a9 9 0 0 1 0 12.8"/></svg>}
function Arrow(){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>}
function Brand(){return <a className="brand" href="#top"><Ball/><span>Baseline</span></a>}
function Eyebrow({children,light=false}:{children:React.ReactNode,light?:boolean}){return <div className={`eyebrow ${light?"light":""}`}><i/>{children}</div>}
function Lines({children}:{children:string[]}){return <>{children.map((x,i)=><span className="line reveal" style={{transitionDelay:`${i*100}ms`}} key={x}>{x}</span>)}</>}
function Dots({active,set,light=false}:{active:number,set:(n:number)=>void,light?:boolean}){return <div className={`dots ${light?"light":""}`}>{[0,1,2].map(i=><button aria-label={`Slide ${i+1}`} aria-current={i===active} onClick={()=>set(i)} key={i}><i/></button>)}</div>}

export default function Home(){
  const [ready,setReady]=useState(false),[menu,setMenu]=useState(false),[modal,setModal]=useState(false),[sent,setSent]=useState(false);
  const [coach,setCoach]=useState(0),[product,setProduct]=useState(0);
  useEffect(()=>{
    window.scrollTo(0,0); document.documentElement.classList.add("locked");
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("seen")}),{threshold:.12});
    document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
    const resize=()=>{const s=16-(16*(((1920-innerWidth)/1920)*100*.6666))/100;if(s>16)document.documentElement.style.fontSize=s+"px";else document.documentElement.style.removeProperty("font-size")};resize();addEventListener("resize",resize);
    return()=>{io.disconnect();removeEventListener("resize",resize)};
  },[]);
  useEffect(()=>{if(!ready)return;const t=setInterval(()=>setProduct(v=>(v+1)%3),3800);return()=>clearInterval(t)},[ready]);
  useEffect(()=>{document.documentElement.classList.toggle("locked",!ready||menu||modal)},[ready,menu,modal]);
  useEffect(()=>{const esc=(e:KeyboardEvent)=>{if(e.key==="Escape"){setMenu(false);setModal(false)}};addEventListener("keydown",esc);return()=>removeEventListener("keydown",esc)},[]);
  const openModal=()=>{setMenu(false);setSent(false);setModal(true)};
  const submit=(e:FormEvent)=>{e.preventDefault();setTimeout(()=>setSent(true),650)};
  const closeOverlays=()=>{setMenu(false);setModal(false)};
  const finishLoading=()=>{setReady(true);document.documentElement.classList.remove("locked")};
  const c=coaches[coach],g=gear[product];
  return <>
    {!ready&&<TerminalLoader onComplete={finishLoading}/>} 
    <main id="top" className={ready?"ready":""}>
      <section className="hero">
        <div className="hero-bg"><img src={img("hero/hero-court.webp")} alt="Player lunging for a shot on a hard court" fetchPriority="high"/></div>
        <header><nav className="desktop"><a href="#programs">Programs & Coaches</a><a href="#facilities">Club & Events</a></nav><Brand/><div className="header-right"><button className="book desktop-sm" onClick={openModal}>Book a Visit</button><button className="burger" onClick={()=>setMenu(true)} aria-label="Open menu"><i/><i/></button></div></header>
        <h1>{["Own","The","Court"].map((w,i)=><span style={{transitionDelay:`${i*140}ms`}} key={w}>{w}</span>)}</h1>
        <div className="hero-bottom"><p className="tag"><span>Show Up,</span><span>Level Up</span></p><div className="hero-cards">
          <div className="gear-card reveal"><div className="glass"><img src={img(g.image)} alt="Featured tennis gear"/><div><b>{g.brand}</b><span>{g.title}</span><u>{g.cta} →</u></div></div><Dots active={product} set={setProduct} light/></div>
          <article className="member glass reveal"><div><strong>9K+</strong><div className="avatars"><i/><i/><i/><i/></div><small>Members on court</small></div><img src={img("1.webp")} alt="Player waiting to return on a clay court"/></article>
        </div></div>
      </section>

      <section className="trust section-pad">
        <div className="trust-top"><div className="percent reveal"><b>100%</b><small>Coaching built around your game</small></div><article className="trust-note reveal"><b>#01</b><div><h3>Trusted by serious players</h3><p>From first-timers to nationally ranked juniors, players train here because the progress shows up on the scoreboard.</p></div></article></div>
        <h2 className="ghost" key={coach}>{c.words.map((w,i)=><span className={i===2?"dark":""} key={w}>{w}</span>)}</h2>
        <figure className="coach reveal"><img src={img(c.image)} alt={c.name}/><figcaption><b>{c.name}</b><small>{c.role}</small></figcaption></figure>
        <div className="coach-controls"><button className="circle prev" onClick={()=>setCoach((coach+2)%3)}><Arrow/></button><Dots active={coach} set={setCoach}/><button className="circle" onClick={()=>setCoach((coach+1)%3)}><Arrow/></button></div>
      </section>

      <section id="programs" className="programs section-pad"><Eyebrow>Training programs</Eyebrow><h2><Lines>{["Built for","every level"]}</Lines></h2><ul>{programs.map((p,i)=><li id={p[3]} className="reveal" style={{transitionDelay:`${i*90}ms`}} key={p[0]}><a href={`#${p[3]}`}><span>{p[0]}</span><div><h3>{p[1]}</h3><p>{p[2]}</p></div><i className="row-arrow"><Arrow/></i></a></li>)}</ul></section>

      <section id="facilities" className="facilities section-pad"><div className="fac-grid"><div className="fac-copy"><img className="fac-icon reveal" src={img("3.webp")} alt="Player stretching for a forehand on clay"/><h2><Lines>{["Tour Our","World-Class","Courts"]}</Lines></h2><p className="reveal">Reserve a court for focused practice, squad drills, or private sessions — and train in the same conditions you’ll compete in.</p></div><div className="courts"><Court image="1.webp" title="Redline Clay" text="A fast outdoor clay court tuned for long, physical rallies."/><Court image="4.webp" title="Harbor Court" text="A sheltered hard court built for precision and night play." blue/></div></div></section>

      <section className="stats section-pad"><Eyebrow light>By the numbers</Eyebrow><h2><Lines>{["A club that","keeps score"]}</Lines></h2><dl>{[["24","Certified coaches"],["12","Championship courts"],["9K+","Members training"],["15","Years on the baseline"]].map((s,i)=><div className="reveal" style={{transitionDelay:`${i*110}ms`}} key={s[0]}><dd>{s[0]}</dd><dt>{s[1]}</dt></div>)}</dl></section>

      <section id="testimonials" className="testimonials section-pad"><Eyebrow>What players say</Eyebrow><h2><Lines>{["Loved by","the locker room"]}</Lines></h2><ul>{testimonials.map((t,i)=><li className="reveal" style={{transitionDelay:`${i*120}ms`}} key={t[1]}><span>“</span><blockquote>{t[0]}</blockquote><footer><b>{t[1]}</b><small>{t[2]}</small></footer></li>)}</ul></section>

      <footer id="contact" className="site-footer section-pad"><div className="footer-cta"><div><Eyebrow light>Get started</Eyebrow><p><Lines>{["Ready to","play?"]}</Lines></p></div><button className="pill" onClick={openModal}>Book a Visit <Arrow/></button></div><div className="footer-grid"><div><Brand/><p>A members’ tennis club and academy where focused coaching meets championship courts.</p><address><a href="mailto:play@baseline.club">play@baseline.club</a><a href="tel:+12125550148">+1 (212) 555-0148</a><span>120 Court Lane, New York</span></address></div><FooterNav title="Programs" links={["Junior Development","Performance Squad","Adult Clinics","Private Coaching"]}/><FooterNav title="Club" links={["Membership","Facilities","Events","Pro Shop"]}/><FooterNav title="Company" links={["About","Coaches","Careers","Contact"]}/></div><div className="bottom"><span>© 2026 Baseline Tennis Club. All rights reserved.</span><span>Instagram　 X　 YouTube　 LinkedIn</span><span>Privacy　 Terms</span></div></footer>
    </main>

    <div className={`menu ${menu?"open":""}`} aria-hidden={!menu}><div className="menu-top"><Brand/><button className="close" onClick={()=>setMenu(false)}>×</button></div><nav>{[["Programs","programs"],["Facilities","facilities"],["Reviews","testimonials"],["Contact","contact"]].map(x=><a onClick={()=>setMenu(false)} href={`#${x[1]}`} key={x[0]}>{x[0]}</a>)}</nav><div className="menu-bottom"><button className="pill" onClick={openModal}>Book a Visit <Arrow/></button><span>Instagram　 X　 YouTube　 LinkedIn</span></div></div>
    <div className={`modal ${modal?"open":""}`} aria-hidden={!modal}><button className="backdrop" onClick={closeOverlays}/><section role="dialog" aria-modal="true"><button className="modal-close" onClick={closeOverlays}>×</button><Eyebrow>Book a visit</Eyebrow><h2>Come see<br/>the courts</h2>{!sent?<form onSubmit={submit}><label>Full name<input autoFocus name="name" placeholder="Alex Rivera"/></label><label>Email<input type="email" required placeholder="you@email.com"/></label><label>What would you like to play?<textarea rows={3} placeholder="I’d love to try a private lesson on the clay courts…"/></label><button>Request a visit</button></form>:<div className="success"><i>✓</i><h3>Request received</h3><p>Thanks — our team will be in touch to lock in your visit.</p><button onClick={closeOverlays}>Done</button></div>}</section></div>
  </>
}

function Court({image,title,text,blue=false}:{image:string,title:string,text:string,blue?:boolean}){return <figure className="court reveal"><img src={img(image)} alt={title} loading="lazy"/><figcaption className={blue?"blue":""}><b>{title}</b><small>{text}</small></figcaption></figure>}
function FooterNav({title,links}:{title:string,links:string[]}){return <nav className="footer-nav"><h4>{title}</h4>{links.map(x=><a href="#" key={x}>{x}</a>)}</nav>}
