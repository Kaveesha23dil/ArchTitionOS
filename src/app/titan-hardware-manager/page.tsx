"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SiteNavbar } from "@/components/SiteNavbar";
import styles from "./page.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const signals=[
  ["01","Process topology","Parent/child relationships, command lines and active process trees."],
  ["02","Workspace context","Hyprland workspaces reveal which project is active, protected or idle."],
  ["03","Project semantics","Filesystem markers identify web, Android and systems workloads."],
];

const policies=[
  ["ACTIVE","820","Full CPU weight and responsive I/O for work visible on any monitor."],
  ["PROTECTED","420","Build daemons, language servers and long-running tasks remain alive."],
  ["FREEZEABLE","100","Inactive non-daemon processes can be suspended and restored safely."],
];

const thmSections = [
  { label: "Classifier", href: "#classifier" },
  { label: "Policies", href: "#policies" },
  { label: "Architecture", href: "#architecture" },
];

export default function TitanHardwareManagerPage(){
  const root=useRef<HTMLElement>(null);

  useGSAP(()=>{
    if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;

    // Hero entrance timeline
    const tl = gsap.timeline({defaults:{ease:"power4.out"}});
    tl
      .from(`.${styles.eyebrow}`,{y:16,autoAlpha:0,duration:0.6})
      .from(`.${styles.hero} h1 span`,{yPercent:120,autoAlpha:0,duration:0.9,stagger:0.12,ease:"power3.out"},"-=0.3")
      .from(`.${styles.lede}`,{y:24,autoAlpha:0,duration:0.7},"-=0.5")
      .from(`.${styles.heroActions} a`,{y:18,autoAlpha:0,duration:0.55,stagger:0.1,ease:"back.out(1.4)"},"-=0.4")
      .from(`.${styles.terminal}`,{x:60,rotateY:-8,autoAlpha:0,scale:0.95,duration:1.1,ease:"power3.out"},"-=0.8")
      .from(`.${styles.terminal} section > i b`,{scaleX:0,transformOrigin:"left",duration:0.8,stagger:0.15,ease:"power2.out"},"-=0.4")
      .from(`.${styles.heroMeta} span`,{y:10,autoAlpha:0,duration:0.4,stagger:0.08},"-=0.3");

    // 3D Terminal pointer tilt
    const heroEl = root.current?.querySelector<HTMLElement>(`.${styles.hero}`);
    const move = (e: PointerEvent) => {
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      gsap.to(`.${styles.terminal}`,{
        x,
        y,
        rotateY: x * 0.1,
        rotateX: -y * 0.1,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto"
      });
    };
    heroEl?.addEventListener("pointermove", move);

    // Section 01: Context Engine Signals Grid
    gsap.fromTo(`.${styles.signalGrid} article`,{
      autoAlpha:0,
      y:45,
      scale:0.96
    },{
      autoAlpha:1,
      y:0,
      scale:1,
      duration:0.8,
      stagger:0.12,
      ease:"power3.out",
      clearProps:"transform",
      scrollTrigger:{trigger:`.${styles.signalGrid}`,start:"top 85%",once:true}
    });

    // Section 02: Adaptive Policies Grid
    gsap.fromTo(`.${styles.policyGrid} article`,{
      autoAlpha:0,
      y:45,
      scale:0.96
    },{
      autoAlpha:1,
      y:0,
      scale:1,
      duration:0.8,
      stagger:0.12,
      ease:"power3.out",
      clearProps:"transform",
      scrollTrigger:{trigger:`.${styles.policyGrid}`,start:"top 85%",once:true}
    });

    // Section 03: Control Loop sequence (Observe, Classify, Apply, Verify)
    gsap.fromTo(`.${styles.architecture} ol li`,{
      autoAlpha:0,
      x:-30
    },{
      autoAlpha:1,
      x:0,
      duration:0.7,
      stagger:0.14,
      ease:"power3.out",
      clearProps:"transform",
      scrollTrigger:{trigger:`.${styles.architecture} ol`,start:"top 85%",once:true}
    });

    // Section intros reveal
    gsap.utils.toArray<HTMLElement>(`.${styles.sectionIntro}`).forEach((el)=>{
      gsap.fromTo(el,{autoAlpha:0,y:35},{
        autoAlpha:1,
        y:0,
        duration:0.8,
        ease:"power3.out",
        clearProps:"transform",
        scrollTrigger:{trigger:el,start:"top 90%",once:true}
      });
    });

    return ()=>{
      heroEl?.removeEventListener("pointermove", move);
    };
  },{scope:root});

  return <main ref={root} className={styles.page}>
    <SiteNavbar pageBadge="THM DAEMON" sectionLinks={thmSections} />

    <section className={styles.hero}>
      <div className={styles.heroGrid}/>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}><i/> Core research contribution · THM</p>
        <h1><span>Hardware management</span><span>that understands</span><span>developer intent.</span></h1>
        <p className={styles.lede}>A root-privileged C++17 daemon that classifies developer workloads and continuously orchestrates CPU, memory, I/O and process state from live system context.</p>
        <div className={styles.heroActions}><a href="#classifier">Explore the engine ↓</a><a href="#architecture">View architecture</a></div>
      </div>
      <div className={styles.terminal}>
        <header><span><i/><i/><i/></span><b>thmctl — workspace 1</b><em>LIVE</em></header>
        <div>
          <p><small>$</small> thmctl inspect --active</p>
          <p><small>profile</small><b> WEB_DEV + AI</b></p>
          <p><small>confidence</small><b> 0.94</b></p>
          <section><span>CPU weight</span><i><b style={{width:"82%"}}/></i><em>820</em></section>
          <section><span>Memory high</span><i><b style={{width:"70%"}}/></i><em>70%</em></section>
          <footer><span>ACTIVE</span><span>daemon protected</span></footer>
        </div>
      </div>
      <div className={styles.heroMeta}><span>C++17 daemon</span><span>cgroup v2</span><span>Hyprland IPC</span><span>/proc + inotify</span></div>
    </section>

    <section id="classifier" className={styles.section}>
      <div className={styles.sectionIntro} data-motion><p>01 / Context engine</p><h2>Three signals.<br/><em>One confident decision.</em></h2><span>THM fuses behavioral and semantic evidence instead of trusting a binary name or focused window.</span></div>
      <div className={styles.signalGrid}>{signals.map(signal=><article key={signal[0]} data-motion><b>{signal[0]}</b><h3>{signal[1]}</h3><p>{signal[2]}</p><span>signal connected ↗</span></article>)}</div>
    </section>

    <section id="policies" className={`${styles.section} ${styles.dark}`}>
      <div className={styles.sectionIntro} data-motion><p>02 / Adaptive policies</p><h2>Resources follow<br/><em>the work.</em></h2><span>Workspace state becomes a policy decision that can be inspected, measured and reversed.</span></div>
      <div className={styles.policyGrid}>{policies.map(policy=><article key={policy[0]} data-motion><header><span>{policy[0]}</span><b>{policy[1]}</b></header><p>{policy[2]}</p><code>cpu.weight = {policy[1]}</code></article>)}</div>
    </section>

    <section id="architecture" className={styles.architecture}>
      <div data-motion><p>03 / Control loop</p><h2>Observe. Classify.<br/>Apply. Verify.</h2></div>
      <ol data-motion><li><b>01</b><span><strong>Observe</strong><small>/proc · Hyprland IPC · inotify</small></span></li><li><b>02</b><span><strong>Classify</strong><small>Composite profile + confidence score</small></span></li><li><b>03</b><span><strong>Apply</strong><small>cgroup v2 · nice · ionice · process signals</small></span></li><li><b>04</b><span><strong>Verify</strong><small>Telemetry, thresholds and safe rollback</small></span></li></ol>
    </section>

    <footer className={styles.footer}><p>ArchTitan OS / Titan Hardware Manager</p><h2>Context-aware resource orchestration for developer-first Linux.</h2><Link href="/">Return to the research overview →</Link></footer>
  </main>
}
