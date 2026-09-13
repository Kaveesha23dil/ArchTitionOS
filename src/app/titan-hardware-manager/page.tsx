"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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

export default function TitanHardwareManagerPage(){
  const root=useRef<HTMLElement>(null);

  useGSAP(()=>{
    if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    gsap.timeline({defaults:{ease:"power3.out"}})
      .from(`.${styles.eyebrow}`,{y:16,autoAlpha:0,duration:.5})
      .from(`.${styles.hero} h1 span`,{yPercent:110,autoAlpha:0,duration:.85,stagger:.1},"-=.2")
      .from(`.${styles.lede}`,{y:24,autoAlpha:0,duration:.65},"-=.45")
      .from(`.${styles.heroActions} a`,{y:18,autoAlpha:0,duration:.5,stagger:.08},"-=.35")
      .from(`.${styles.terminal}`,{x:50,autoAlpha:0,duration:.8},"-=.7");
    gsap.utils.toArray<HTMLElement>("[data-motion]").forEach((item)=>{
      gsap.from(item,{y:38,duration:.7,ease:"power3.out",clearProps:"transform",scrollTrigger:{trigger:item,start:"top 90%",once:true}});
    });
  },{scope:root});

  return <main ref={root} className={styles.page}>
    <nav className={styles.nav} aria-label="Titan Hardware Manager navigation">
      <Link href="/" className={styles.brand}><i/> ArchTitan <b>OS</b></Link>
      <div><a href="#classifier">Classifier</a><a href="#policies">Policies</a><a href="#architecture">Architecture</a></div>
      <Link href="/" className={styles.back}>← Back to research</Link>
    </nav>

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

    <footer className={styles.footer}><p>ArchTitan OS / Titan Hardware Manager</p><h2>Context-aware resource orchestration for developer-first Linux.</h2><Link href="/">Return to the ArchTitan OS research overview →</Link><span> · </span><Link href="/titanshare">Explore TitanShare&apos;s Linux–Android workflow →</Link></footer>
  </main>
}
