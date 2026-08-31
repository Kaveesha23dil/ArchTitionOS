"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SiteNavbar } from "@/components/SiteNavbar";
import styles from "./page.module.css";

gsap.registerPlugin(useGSAP,ScrollTrigger);

const capabilities=[
  ["01","Zero-config discovery","Linux and Android peers announce themselves over mDNS and appear without accounts or manual IP entry."],
  ["02","Direct file transfer","Files move peer-to-peer across the local network with streaming I/O, progress reporting and integrity checks."],
  ["03","Remote telemetry","View CPU, memory, thermal and workload signals from the ArchTitan machine on Android."],
  ["04","Remote controls","Trigger approved system actions through a small, explicit command surface with device-level trust."],
];

const flow=[
  ["DISCOVER","_titanshare._tcp.local","mDNS advertises an available ArchTitan peer."],
  ["PAIR","ephemeral challenge","Both devices confirm identity on the local network."],
  ["NEGOTIATE","capability manifest","Peers agree on transfer and control capabilities."],
  ["TRANSFER","chunked TCP stream","Data moves directly with progress and verification."],
];

const shareSections = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Flow", href: "#flow" },
  { label: "Architecture", href: "#architecture" },
  { label: "Trust Model", href: "#trust" },
];

export default function TitanSharePage(){
  const root=useRef<HTMLElement>(null);
  useGSAP(()=>{
    if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;

    // Hero entrance timeline
    const tl = gsap.timeline({defaults:{ease:"power4.out"}});
    tl
      .from(`.${styles.kicker}`,{y:14,autoAlpha:0,duration:0.6})
      .from(`.${styles.hero} h1 span`,{yPercent:120,autoAlpha:0,duration:0.9,stagger:0.12,ease:"power3.out"},"-=0.3")
      .from(`.${styles.lede}`,{y:24,autoAlpha:0,duration:0.7},"-=0.5")
      .from(`.${styles.actions} a`,{y:18,autoAlpha:0,duration:0.55,stagger:0.1,ease:"back.out(1.4)"},"-=0.4")
      .from(`.${styles.network}`,{scale:0.92,autoAlpha:0,duration:0.9,ease:"power3.out"},"-=0.7")
      .from(`.${styles.device}`,{y:20,autoAlpha:0,stagger:0.15,duration:0.6,ease:"back.out(1.2)"},"-=0.5")
      .from(`.${styles.transfer}`,{y:20,autoAlpha:0,duration:0.6,ease:"power2.out"},"-=0.3")
      .from(`.${styles.meta} span`,{y:10,autoAlpha:0,duration:0.4,stagger:0.08},"-=0.3");

    // Continuous P2P data packet trajectory loop
    gsap.fromTo(`.${styles.packet}`,{x:-4,opacity:0.6},{
      x:104,
      opacity:1,
      duration:1.4,
      repeat:-1,
      yoyo:true,
      ease:"power1.inOut"
    });

    // Transfer progress bar dynamic pulse
    gsap.to(`.${styles.transfer} > i b`,{
      width:"88%",
      duration:2.5,
      repeat:-1,
      yoyo:true,
      ease:"sine.inOut"
    });

    // 3D Network visualizer mouse tilt
    const heroEl = root.current?.querySelector<HTMLElement>(`.${styles.hero}`);
    const move = (e: PointerEvent) => {
      const x = (e.clientX / innerWidth - 0.5) * 18;
      const y = (e.clientY / innerHeight - 0.5) * 18;
      gsap.to(`.${styles.network}`,{
        x,
        y,
        rotateY: x * 0.08,
        rotateX: -y * 0.08,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto"
      });
    };
    heroEl?.addEventListener("pointermove", move);

    // Section 01: Capabilities Grid
    gsap.fromTo(`.${styles.capabilityGrid} article`,{
      autoAlpha:0,
      y:45,
      scale:0.96
    },{
      autoAlpha:1,
      y:0,
      scale:1,
      duration:0.8,
      stagger:0.1,
      ease:"power3.out",
      clearProps:"transform",
      scrollTrigger:{trigger:`.${styles.capabilityGrid}`,start:"top 85%",once:true}
    });

    // Section 02: Connection Lifecycle Flow
    gsap.fromTo(`.${styles.flow} li`,{
      autoAlpha:0,
      x:-30
    },{
      autoAlpha:1,
      x:0,
      duration:0.7,
      stagger:0.12,
      ease:"power3.out",
      clearProps:"transform",
      scrollTrigger:{trigger:`.${styles.flow}`,start:"top 85%",once:true}
    });

    // Section 03: Architecture Layers
    gsap.fromTo(`.${styles.layers} article`,{
      autoAlpha:0,
      y:35
    },{
      autoAlpha:1,
      y:0,
      duration:0.75,
      stagger:0.1,
      ease:"power3.out",
      clearProps:"transform",
      scrollTrigger:{trigger:`.${styles.layers}`,start:"top 85%",once:true}
    });

    // Section 04: Trust Grid
    gsap.fromTo(`.${styles.trustGrid} article`,{
      autoAlpha:0,
      y:40,
      scale:0.96
    },{
      autoAlpha:1,
      y:0,
      scale:1,
      duration:0.8,
      stagger:0.12,
      ease:"power3.out",
      clearProps:"transform",
      scrollTrigger:{trigger:`.${styles.trustGrid}`,start:"top 85%",once:true}
    });

    // Section intros reveal
    gsap.utils.toArray<HTMLElement>(`.${styles.intro}`).forEach((el)=>{
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
    <SiteNavbar pageBadge="TITANSHARE" sectionLinks={shareSections} />

    <section className={styles.hero}>
      <div className={styles.grid}/>
      <div className={styles.heroCopy}>
        <p className={styles.kicker}><i/> Cross-device ecosystem · TitanShare</p>
        <h1><span>Your devices.</span><span>One local</span><span>workspace.</span></h1>
        <p className={styles.lede}>Zero-configuration discovery, peer-to-peer file transfer, remote monitoring and secure controls between ArchTitan Linux and Android.</p>
        <div className={styles.actions}><a href="#capabilities">Explore TitanShare ↓</a><a href="#flow">See the protocol</a></div>
      </div>
      <div className={styles.network} aria-label="A Linux workstation connected to an Android phone">
        <div className={styles.device}><small>ARCHTITAN / LINUX</small><b>workstation-01</b><span><i/> Available</span><em>192.168.1.24</em></div>
        <div className={styles.connection}><span>LOCAL P2P</span><i className={styles.packet}/><small>12.4 MB/s</small></div>
        <div className={`${styles.device} ${styles.phone}`}><small>ANDROID / MOBILE</small><b>Kaveesha&apos;s phone</b><span><i/> Paired</span><em>192.168.1.41</em></div>
        <div className={styles.transfer}><header><span>project-build.tar.zst</span><b>74%</b></header><i><b/></i><footer><span>1.28 GB / 1.72 GB</span><span>00:31 remaining</span></footer></div>
      </div>
      <div className={styles.meta}><span>C++ service</span><span>Kotlin client</span><span>TCP transport</span><span>mDNS discovery</span></div>
    </section>

    <section id="capabilities" className={styles.section}>
      <div className={styles.intro} data-motion><p>01 / Capabilities</p><h2>Local-first by design.<br/><em>Useful by default.</em></h2><span>TitanShare turns nearby devices into a coherent developer environment without routing local work through a cloud service.</span></div>
      <div className={styles.capabilityGrid}>{capabilities.map(item=><article key={item[0]} data-motion><b>{item[0]}</b><h3>{item[1]}</h3><p>{item[2]}</p><span>Native capability ↗</span></article>)}</div>
    </section>

    <section id="flow" className={`${styles.section} ${styles.dark}`}>
      <div className={styles.intro} data-motion><p>02 / Connection lifecycle</p><h2>From nearby peer<br/><em>to verified transfer.</em></h2><span>A small protocol keeps discovery fast, pairing explicit and data movement observable.</span></div>
      <ol className={styles.flow}>{flow.map((item,index)=><li key={item[0]} data-motion><b>0{index+1}</b><span><strong>{item[0]}</strong><code>{item[1]}</code></span><p>{item[2]}</p></li>)}</ol>
    </section>

    <section id="architecture" className={styles.architecture}>
      <div data-motion><p>03 / System architecture</p><h2>Native at<br/>both ends.</h2><span>The desktop service owns discovery, transfer and system integration. The Android client provides a focused mobile interface for files, telemetry and controls.</span></div>
      <div className={styles.layers} data-motion>
        <article><b>04</b><span><strong>Experience</strong><small>Send · Receive · Monitor · Control</small></span><em>Android + Linux UI</em></article>
        <article><b>03</b><span><strong>Session</strong><small>Pairing · Capabilities · Progress · Recovery</small></span><em>TitanShare protocol</em></article>
        <article><b>02</b><span><strong>Transport</strong><small>Chunked streams · Checksums · Backpressure</small></span><em>TCP</em></article>
        <article><b>01</b><span><strong>Discovery</strong><small>Service announcement · Peer presence</small></span><em>mDNS</em></article>
      </div>
    </section>

    <section id="trust" className={styles.trust}>
      <div data-motion><p>04 / Trust model</p><h2>Nearby does not mean trusted.</h2></div>
      <div className={styles.trustGrid}><article data-motion><b>01</b><h3>Explicit pairing</h3><p>A discovered device receives no privileged capability until both endpoints confirm the pairing.</p></article><article data-motion><b>02</b><h3>Scoped permissions</h3><p>File transfer, telemetry and remote controls are negotiated as separate capabilities.</p></article><article data-motion><b>03</b><h3>Local transport</h3><p>Traffic stays on the local network and does not depend on an external relay or account.</p></article></div>
    </section>

    <footer className={styles.footer}><p>ArchTitan OS / TitanShare</p><h2>Move work between devices without moving it through the cloud.</h2><Link href="/">Return to the research overview →</Link></footer>
  </main>
}
