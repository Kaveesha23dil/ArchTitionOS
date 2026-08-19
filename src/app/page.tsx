"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TerminalLoader } from "@/components/TerminalLoader";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Arrow=()=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
const Mark=()=> <svg className="mark" viewBox="0 0 44 44" fill="none"><path d="M22 3 39 12.5v19L22 41 5 31.5v-19L22 3Z" stroke="currentColor" strokeWidth="2"/><path d="m14 28 8-17 8 17M17 22h10" stroke="currentColor" strokeWidth="2"/></svg>;
const Label=({children}:{children:React.ReactNode})=><div className="label"><i/>{children}</div>;

const features=[
  {n:"01",title:"Titan Hardware Manager",tag:"Core research contribution",text:"A C++17 root-privileged daemon that classifies developer workloads and orchestrates CPU, memory, I/O and process state using real-time system signals.",meta:"Hyprland IPC · cgroup v2 · /proc"},
  {n:"02",title:"Auto GPU Switcher",tag:"Adaptive graphics",text:"Detects hybrid GPU systems through DRM/KMS and routes workloads to integrated or discrete graphics without a restart or manual configuration.",meta:"DRI_PRIME · sysfs · DRM/KMS"},
  {n:"03",title:"Neon Monitor",tag:"Observability",text:"A lightweight native monitor for live CPU, memory, thermal and process telemetry with minimal runtime overhead.",meta:"procfs · sysfs · native UI"},
  {n:"04",title:"TitanShare",tag:"Cross-device ecosystem",text:"Zero-configuration Linux–Android discovery, peer-to-peer file transfer, remote monitoring and controls over the local network.",meta:"C++ · Kotlin · TCP · mDNS"},
  {n:"05",title:"TitanMirror",tag:"Real-time media",text:"Native Android screen capture and H.264 streaming, decoded with libavcodec and rendered through SDL2 using a DRM/KMS backend.",meta:"MediaProjection · H.264 · SDL2"},
  {n:"06",title:"Developer-First Base",tag:"Complete distribution",text:"A minimal Arch Linux system with Hyprland, BTRFS snapshots, Calamares installation and a purpose-built developer environment.",meta:"archiso · BTRFS · Wayland"},
];
const metrics=[["< 1 GB","Target idle RAM"],["< 100 ms","Mirror latency target"],["> 10 MB/s","Transfer throughput"],["72 h","Mixed-workload stress test"]];
const researchers=[
  ["CIT-23-02-0025","Siluna Nusal"],["CIT-23-02-0127","Kaveesha Dilshan"],["CIT-23-02-0132","Chanika Anuradhi"],["CIT-23-02-0359","Zumra Hasaan"]
];
const refs=[
  "Silberschatz, Galvin & Gagne — Operating System Concepts, 10th ed.","Robert Love — Linux Kernel Development, 3rd ed.","Mel Gorman — Understanding the Linux Virtual Memory Manager","Brendan Gregg — Systems Performance, 2nd ed.","Android Open Source Project — Low Memory Killer Daemon (lmkd)","Corbet, Rubini & Kroah-Hartman — Linux Device Drivers, 3rd ed."
];

export default function Home(){
  const [ready,setReady]=useState(false),[menu,setMenu]=useState(false),[activeSignal,setActiveSignal]=useState(0);
  const pageRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    scrollTo(0,0);document.documentElement.classList.add("locked");
    const esc=(e:KeyboardEvent)=>e.key==="Escape"&&setMenu(false);addEventListener("keydown",esc);
    return()=>removeEventListener("keydown",esc);
  },[]);
  useEffect(()=>{document.documentElement.classList.toggle("locked",!ready||menu)},[ready,menu]);
  useGSAP(()=>{
    if(!ready||!pageRef.current)return;
    if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(".reveal",{clearProps:"all"});return;}
    gsap.timeline({defaults:{ease:"power3.out"}})
      .from(".nav-shell",{y:-28,autoAlpha:0,duration:.7})
      .from(".hero-copy .status",{y:18,autoAlpha:0,duration:.55},"-=.35")
      .from(".research-hero h1 span",{yPercent:115,autoAlpha:0,duration:.9,stagger:.11},"-=.3")
      .from(".hero-copy > p",{y:24,autoAlpha:0,duration:.7},"-=.5")
      .from(".hero-actions a",{y:18,autoAlpha:0,duration:.55,stagger:.1},"-=.45")
      .from(".hero-console",{x:55,rotateY:-7,autoAlpha:0,duration:1},"-=.85")
      .from(".console-body > *",{x:14,autoAlpha:0,duration:.35,stagger:.045},"-=.55")
      .from(".hero-foot span",{y:10,autoAlpha:0,duration:.4,stagger:.08},"-=.4");
    gsap.to(".hero-glow",{xPercent:-12,yPercent:8,scale:1.12,ease:"none",scrollTrigger:{trigger:".research-hero",start:"top top",end:"bottom top",scrub:1.2}});
    gsap.to(".hero-grid",{yPercent:16,ease:"none",scrollTrigger:{trigger:".research-hero",start:"top top",end:"bottom top",scrub:1}});
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el)=>{
      if(el.closest(".research-hero"))return;
      gsap.fromTo(el,{y:52},{y:0,duration:.85,ease:"power3.out",clearProps:"transform",scrollTrigger:{trigger:el,start:"top 92%",once:true}});
    });
    [[".feature-grid",".feature"],[".tier-grid",".tier-grid article"],[".metrics",".metrics > div"],[".team-grid",".team-grid article"]].forEach(([trigger,targets])=>{
      gsap.fromTo(targets,{y:36},{y:0,duration:.7,stagger:.08,ease:"power3.out",clearProps:"transform",scrollTrigger:{trigger,start:"top 90%",once:true}});
    });
    requestAnimationFrame(()=>ScrollTrigger.refresh());
    const move=(event:PointerEvent)=>{const x=(event.clientX/innerWidth-.5)*18,y=(event.clientY/innerHeight-.5)*18;gsap.to(".hero-console",{x,y,rotateY:x*.08,rotateX:-y*.08,duration:1.1,ease:"power3.out",overwrite:"auto"})};
    const hero=document.querySelector<HTMLElement>(".research-hero");hero?.addEventListener("pointermove",move);
    return()=>hero?.removeEventListener("pointermove",move);
  },{scope:pageRef,dependencies:[ready],revertOnUpdate:true});
  useGSAP(()=>{
    const menuEl=pageRef.current?.querySelector(".mobile-menu");if(!menuEl)return;
    if(menu){gsap.set(menuEl,{autoAlpha:1,y:0});gsap.fromTo(".mobile-menu nav a",{x:-30,autoAlpha:0},{x:0,autoAlpha:1,duration:.5,stagger:.07,ease:"power3.out"})}
    else gsap.to(menuEl,{autoAlpha:0,y:-16,duration:.25,ease:"power2.inOut"});
  },{scope:pageRef,dependencies:[menu]});
  const finish=()=>{setReady(true);document.documentElement.classList.remove("locked")};
  return <div ref={pageRef}>
    {!ready&&<TerminalLoader onComplete={finish}/>} 
    <header className="nav-shell">
      <a href="#top" className="logo"><Mark/><span>ArchTitan <b>OS</b></span></a>
      <nav className="nav-links"><a href="#research">Research</a><a href="#architecture">Architecture</a><a href="#ecosystem">Ecosystem</a><a href="#evaluation">Evaluation</a></nav>
      <a className="nav-cta" href="#team">Meet the team <Arrow/></a>
      <button className="menu-button" onClick={()=>setMenu(true)} aria-label="Open menu"><i/><i/></button>
    </header>

    <main id="top" className={ready?"site-ready":""}>
      <section className="hero research-hero">
        <div className="hero-grid"/><div className="hero-glow"/>
        <div className="hero-copy">
          <div className="status"><i/> Final Year Research Project · 2026</div>
          <h1><span>Context-aware.</span><span>Developer-centric.</span><span className="outline">Built on Linux.</span></h1>
          <p>ArchTitan OS is an adaptive Arch Linux distribution that understands developer workloads, workspace topology and cross-device context—then allocates resources where they matter.</p>
          <div className="hero-actions"><a className="primary" href="#research">Explore the research <Arrow/></a><a className="secondary" href="#architecture">View architecture</a></div>
        </div>
        <div className="hero-console reveal">
          <div className="console-top"><span><i/><i/><i/></span><b>thmctl — live context</b><em>ACTIVE</em></div>
          <div className="console-body">
            <p><span className="muted">$</span> thmctl status --workspace active</p>
            <p><span className="blue">workspace</span> <strong>dev/web-platform</strong></p>
            <p><span className="blue">profile</span> <span className="green">WEB_DEV + AI</span></p>
            <p><span className="blue">confidence</span> <strong>0.94</strong> <span className="muted">[process-tree]</span></p>
            <div className="meter"><span>CPU weight</span><i><b style={{width:"82%"}}/></i><em>820</em></div>
            <div className="meter"><span>Memory</span><i><b style={{width:"64%"}}/></i><em>70%</em></div>
            <div className="workspace-row"><span className="active">1 ACTIVE</span><span>2 PROTECTED</span><span>3 FREEZEABLE</span></div>
            <p className="event"><span className="green">✓</span> gradle daemon protected across workspace switch</p>
          </div>
        </div>
        <div className="hero-foot"><span>SLTC Research University</span><span>BSc (Hons) Software Engineering</span><span>June 2026</span></div>
      </section>

      <section id="research" className="intro section">
        <div className="section-head reveal"><Label>Research premise</Label><h2>General-purpose operating systems do not understand <em>developer intent.</em></h2></div>
        <div className="intro-grid">
          <div className="intro-index">01 <span>/ 08</span></div>
          <div className="intro-copy reveal"><p className="lead">Modern operating systems apply static policies to radically different activities: an active compilation, an idle browser and a background build daemon are treated without meaningful workflow context.</p><p>ArchTitan OS proposes a shift from process-only management to <strong>workspace-topology-aware resource orchestration</strong>. It observes what processes are doing, not simply which window has focus.</p></div>
          <div className="problem-list reveal"><p><span>01</span>2–4 GB idle memory overhead</p><p><span>02</span>Static CPU and memory policies</p><p><span>03</span>Manual hybrid GPU switching</p><p><span>04</span>Fragmented Linux–Android tooling</p></div>
        </div>
      </section>

      <section id="architecture" className="architecture section dark-section">
        <div className="section-head reveal"><Label>System architecture</Label><h2>One adaptive system.<br/><em>Four integrated layers.</em></h2><p>Built from the distribution base upward, each layer exposes native signals and services to the next.</p></div>
        <div className="layer-stack reveal">
          <div><b>04</b><span><strong>Application</strong><small>TitanShare · TitanMirror · CoreAI · TUI Installer</small></span><em>Developer experience</em></div>
          <div><b>03</b><span><strong>System Services</strong><small>THM · GPU Switcher · Neon Monitor · Snapshot Manager</small></span><em>Adaptive intelligence</em></div>
          <div><b>02</b><span><strong>Desktop</strong><small>Hyprland · Wayland · SDDM · Calamares</small></span><em>Workspace topology</em></div>
          <div><b>01</b><span><strong>Base</strong><small>Arch Linux · BTRFS · archiso · Linux kernel</small></span><em>Minimal foundation</em></div>
        </div>
      </section>

      <section className="classifier section">
        <div className="classifier-copy reveal"><Label>THM classifier</Label><h2>Three signals.<br/>One confident decision.</h2><p>Modern IDE binaries are polyglot. THM fuses behavioral and semantic evidence instead of trusting a process name.</p><div className="signal-tabs">{[["01","Process tree","High confidence"],["02","Window title","Medium confidence"],["03","Project root","Tiebreaker"]].map((s,i)=><button className={activeSignal===i?"active":""} onClick={()=>setActiveSignal(i)} key={s[0]}><b>{s[0]}</b><span>{s[1]}<small>{s[2]}</small></span></button>)}</div></div>
        <div className="signal-visual reveal">
          <div className="signal-core"><span>FUSION<br/>ENGINE</span><i/></div>
          <div className={`orbit o1 ${activeSignal===0?"active":""}`}><b>/proc</b><small>children + cmdline</small></div>
          <div className={`orbit o2 ${activeSignal===1?"active":""}`}><b>IPC</b><small>window semantics</small></div>
          <div className={`orbit o3 ${activeSignal===2?"active":""}`}><b>inotify</b><small>project markers</small></div>
          <div className="signal-result"><small>CLASSIFIED AS</small><b>{["SYSTEM_DEV","WEB_DEV","ANDROID_DEV"][activeSignal]}</b><span>confidence {["0.97","0.81","0.68"][activeSignal]}</span></div>
        </div>
      </section>

      <section className="tiers section dark-section">
        <div className="section-head reveal"><Label>Workspace intelligence</Label><h2>Resources follow the work—<br/><em>not just the focus.</em></h2></div>
        <div className="tier-grid">
          <article><div><span>ACTIVE</span><b>70%</b></div><h3>Visible on any monitor</h3><p>Full tier-one allocation governed by the workspace composite profile.</p><code>cpu.weight = 820</code></article>
          <article><div><span>PROTECTED</span><b>20%</b></div><h3>Background + live daemon</h3><p>Build daemons and LSP services remain active and are never frozen.</p><code>cgroup.freeze = 0</code></article>
          <article><div><span>FREEZEABLE</span><b>5%</b></div><h3>Inactive beyond 15 min</h3><p>Non-daemon processes are surgically suspended until the workspace returns.</p><code>signal = SIGSTOP</code></article>
        </div>
      </section>

      <section id="ecosystem" className="ecosystem section">
        <div className="section-head reveal"><Label>Integrated ecosystem</Label><h2>Designed as an operating system.<br/><em>Not a collection of add-ons.</em></h2></div>
        <div className="feature-grid">{features.map((f)=><a className="feature" href={f.n==="01"?"/titan-hardware-manager":"#ecosystem"} key={f.n}><div className="feature-top"><span>{f.n}</span><em>{f.tag}</em></div><h3>{f.title}</h3><p>{f.text}</p><code>{f.meta}</code></a>)}</div>
      </section>

      <section id="evaluation" className="evaluation section">
        <div className="metrics">{metrics.map(m=><div key={m[1]}><strong>{m[0]}</strong><span>{m[1]}</span></div>)}</div>
        <div className="evaluation-grid"><div className="reveal"><Label>Evaluation plan</Label><h2>Measured under real developer workloads.</h2><p>Controlled benchmarks evaluate memory efficiency, classification accuracy, response latency, daemon continuity and cross-device performance.</p></div><div className="eval-list reveal">{[["THM memory","free -m / procfs baseline"],["Classifier accuracy","Controlled polyglot IDE scenarios"],["Workspace tiers","Gradle and Cargo continuity"],["GPU switching","Detection-to-routing latency"],["TitanShare","Calibrated TCP throughput"],["TitanMirror","Capture-to-render timestamps"]].map((x,i)=><p key={x[0]}><span>0{i+1}</span><b>{x[0]}</b><em>{x[1]}</em></p>)}</div></div>
      </section>

      <section className="stack section dark-section">
        <div className="section-head reveal"><Label>Engineering stack</Label><h2>Native where performance matters.</h2></div>
        <div className="stack-grid reveal"><div><span>Core</span><b>C++17</b><b>Bash</b><b>Python</b><b>Kotlin</b></div><div><span>Platform</span><b>Arch Linux</b><b>Hyprland</b><b>BTRFS</b><b>Wayland</b></div><div><span>Interfaces</span><b>procfs</b><b>sysfs</b><b>inotify</b><b>DRM/KMS</b></div><div><span>Media & Network</span><b>TCP / mDNS</b><b>H.264</b><b>libavcodec</b><b>SDL2</b></div></div>
      </section>

      <section id="team" className="team section">
        <div className="section-head reveal"><Label>Research team</Label><h2>Built at SLTC Research University.</h2><p>BSc (Hons) Software Engineering · Final Year Project · June 2026</p></div>
        <div className="team-grid">{researchers.map((r,i)=><article key={r[0]}><span>0{i+1}</span><div className="avatar">{r[1].split(" ").map(x=>x[0]).join("")}</div><h3>{r[1]}</h3><p>{r[0]}</p></article>)}</div>
      </section>

      <section className="references section"><button className="ref-summary"><Label>Selected references</Label><span>Foundational systems research and platform documentation</span></button><div className="ref-grid">{refs.map((r,i)=><p key={r}><span>{String(i+1).padStart(2,"0")}</span>{r}</p>)}</div></section>

      <footer className="footer">
        <div className="footer-panel">
          <a className="footer-wordmark" href="#top" aria-label="ArchTitan OS home">ARCHTITAN<span>OS</span><sup>©</sup></a>
          <div className="footer-grid">
            <div className="footer-newsletter">
              <h3>Join the ArchTitan research community</h3>
              <p>Follow development milestones, technical findings and future release updates.</p>
              <form onSubmit={e=>e.preventDefault()}><label className="sr-only" htmlFor="footer-email">Email address</label><input id="footer-email" type="email" placeholder="Enter your email address" required/><button type="submit">Subscribe <i/></button></form>
            </div>
            <div className="footer-col"><span>Research</span><a href="#research">Research premise</a><a href="#architecture">Architecture</a><a href="#evaluation">Evaluation</a><a href="#team">Research team</a></div>
            <div className="footer-col"><span>System</span><a href="#ecosystem">Titan Hardware Manager</a><a href="#ecosystem">TitanShare</a><a href="#ecosystem">TitanMirror</a><a href="#ecosystem">Neon Monitor</a></div>
            <div className="footer-col"><span>Institution</span><p>SLTC Research University</p><p>BSc (Hons) Software Engineering</p><p>Final Year Project</p><a href="mailto:research@archtitan.dev">Contact</a></div>
            <div className="footer-social-row"><span>Social Media</span><nav><a href="#">GitHub</a><i/> <a href="#">LinkedIn</a><i/> <a href="#">X</a><i/> <a href="mailto:research@archtitan.dev">Email</a></nav></div>
          </div>
          <div className="copyright"><span>© 2026 ArchTitan OS. Designed for adaptive computing. All rights reserved.</span><span>SLTC Research University · Sri Lanka</span><a href="#top">Back to top ↑</a></div>
        </div>
      </footer>
    </main>

    <aside className={`mobile-menu ${menu?"open":""}`}><div><a href="#top" className="logo"><Mark/><span>ArchTitan <b>OS</b></span></a><button onClick={()=>setMenu(false)}>×</button></div><nav>{[["Research","research"],["Architecture","architecture"],["Ecosystem","ecosystem"],["Evaluation","evaluation"],["Team","team"]].map(x=><a href={`#${x[1]}`} onClick={()=>setMenu(false)} key={x[0]}>{x[0]} <Arrow/></a>)}</nav><p>Final Year Research Project · 2026</p></aside>
  </div>
}
