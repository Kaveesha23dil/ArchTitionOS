"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SiteNavbar } from "@/components/SiteNavbar";
import styles from "./page.module.css";

gsap.registerPlugin(useGSAP,ScrollTrigger);

const pipeline=[
  ["01","Capture","MediaProjection","Android captures the display into a hardware-backed video surface."],
  ["02","Encode","H.264 / AVC","Frames are compressed into a low-latency elementary stream."],
  ["03","Transport","Local TCP","NAL units move directly to the ArchTitan workstation."],
  ["04","Decode","libavcodec","Native decoding turns the stream back into renderable frames."],
  ["05","Present","SDL2 + DRM/KMS","Frames reach the display with minimal compositor overhead."],
];

const qualities=[
  ["INTERACTIVE","1080p","60 fps","< 100 ms","Balanced for coding, demos and device control."],
  ["QUALITY","1440p","30 fps","< 160 ms","Sharper output for presentations and visual review."],
  ["NETWORK SAVER","720p","30 fps","< 120 ms","Stable mirroring on constrained local networks."],
];

const mirrorSections = [
  { label: "Pipeline", href: "#pipeline" },
  { label: "Telemetry", href: "#latency" },
  { label: "Profiles", href: "#profiles" },
  { label: "Controls", href: "#controls" },
];

export default function TitanMirrorPage(){
  const root=useRef<HTMLElement>(null);
  useGSAP(()=>{
    if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    gsap.timeline({defaults:{ease:"power3.out"}})
      .from(`.${styles.kicker}`,{y:14,autoAlpha:0,duration:.45})
      .from(`.${styles.hero} h1 span`,{yPercent:110,autoAlpha:0,duration:.85,stagger:.1},"-=.2")
      .from(`.${styles.lede}`,{y:22,autoAlpha:0,duration:.6},"-=.4")
      .from(`.${styles.actions} a`,{y:16,autoAlpha:0,duration:.45,stagger:.08},"-=.3")
      .from(`.${styles.viewer}`,{x:50,rotateY:-5,autoAlpha:0,duration:.85},"-=.65");
    gsap.to(`.${styles.scanline}`,{y:300,duration:2.8,repeat:-1,ease:"none"});
    gsap.to(`.${styles.wave} i`,{scaleY:()=>gsap.utils.random(.25,1),duration:.45,repeat:-1,yoyo:true,stagger:{each:.05,from:"random"},ease:"sine.inOut"});
    gsap.utils.toArray<HTMLElement>("[data-motion]").forEach(element=>gsap.from(element,{y:36,duration:.7,ease:"power3.out",clearProps:"transform",scrollTrigger:{trigger:element,start:"top 90%",once:true}}));
  },{scope:root});

  return <main ref={root} className={styles.page}>
    <SiteNavbar pageBadge="TITANMIRROR" sectionLinks={mirrorSections} />

    <section className={styles.hero}>
      <div className={styles.grid}/>
      <div className={styles.heroCopy}>
        <p className={styles.kicker}><i/> Real-time media · TitanMirror</p>
        <h1><span>Android on Linux.</span><span>Native. Direct.</span><span>Low latency.</span></h1>
        <p className={styles.lede}>Real-time Android screen capture and H.264 streaming, decoded natively with libavcodec and presented through SDL2 using a DRM/KMS-aware Linux path.</p>
        <div className={styles.actions}><a href="#pipeline">Trace the frame ↓</a><a href="#profiles">View stream profiles</a></div>
      </div>
      <div className={styles.viewer}>
        <header><span><i/><i/><i/></span><b>titanmirror / pixel-8</b><em><i/> LIVE · 58 FPS</em></header>
        <div className={styles.screen}>
          <div className={styles.scanline}/>
          <div className={styles.phoneTop}><span>09:41</span><span>● ● ●</span></div>
          <div className={styles.mobileHero}><small>ARCHTITAN</small><strong>Remote workspace</strong><p>Connected to workstation-01</p></div>
          <div className={styles.mobileStats}><span><small>CPU</small><b>42%</b></span><span><small>MEMORY</small><b>3.8 GB</b></span></div>
          <div className={styles.mobileCards}><i/><i/><i/></div>
          <div className={styles.gesture}/>
        </div>
        <footer><span>1920 × 1080</span><span>H.264</span><span>8.2 Mbps</span><b>84 ms</b></footer>
      </div>
      <div className={styles.meta}><span>MediaProjection</span><span>H.264</span><span>libavcodec</span><span>SDL2 · DRM/KMS</span></div>
    </section>

    <section id="pipeline" className={styles.section}>
      <div className={styles.intro} data-motion><p>01 / Frame pipeline</p><h2>Five stages.<br/><em>One continuous frame.</em></h2><span>Every stage is explicit and measurable—from the Android capture surface to the Linux display.</span></div>
      <ol className={styles.pipeline}>{pipeline.map(item=><li key={item[0]} data-motion><b>{item[0]}</b><span><strong>{item[1]}</strong><code>{item[2]}</code></span><p>{item[3]}</p><i>→</i></li>)}</ol>
    </section>

    <section id="latency" className={`${styles.section} ${styles.dark}`}>
      <div className={styles.intro} data-motion><p>02 / Live telemetry</p><h2>Latency you can<br/><em>see and measure.</em></h2><span>Capture, network, decode and presentation timings remain visible during every session.</span></div>
      <div className={styles.telemetry} data-motion>
        <div className={styles.bigMetric}><span>END-TO-END</span><strong>84<small>ms</small></strong><em>Target &lt; 100 ms</em></div>
        <div className={styles.wave}>{Array.from({length:34},(_,i)=><i key={i}/>)}</div>
        <div className={styles.breakdown}><p><span>Capture</span><b>18 ms</b></p><p><span>Encode</span><b>21 ms</b></p><p><span>Network</span><b>12 ms</b></p><p><span>Decode</span><b>25 ms</b></p><p><span>Present</span><b>8 ms</b></p></div>
      </div>
    </section>

    <section id="profiles" className={styles.profiles}>
      <div data-motion><p>03 / Stream profiles</p><h2>Quality matched<br/>to the moment.</h2></div>
      <div className={styles.profileGrid}>{qualities.map((profile,index)=><article key={profile[0]} data-motion className={index===0?styles.active:""}><header><span>{profile[0]}</span>{index===0&&<em>RECOMMENDED</em>}</header><strong>{profile[1]}</strong><div><p><span>FRAME RATE</span><b>{profile[2]}</b></p><p><span>LATENCY TARGET</span><b>{profile[3]}</b></p></div><footer>{profile[4]}</footer></article>)}</div>
    </section>

    <section id="controls" className={styles.controls}>
      <div className={styles.controlCopy} data-motion><p>04 / Interaction</p><h2>More than a video stream.</h2><span>TitanMirror is designed as a responsive device surface with an explicit path for input, rotation, resizing and session control.</span></div>
      <div className={styles.controlList} data-motion><p><b>01</b><span><strong>Adaptive viewport</strong><small>Resize while preserving aspect ratio and stream stability.</small></span></p><p><b>02</b><span><strong>Rotation awareness</strong><small>Follow Android orientation without restarting the session.</small></span></p><p><b>03</b><span><strong>Session controls</strong><small>Pause, resume, reconnect and inspect live stream statistics.</small></span></p><p><b>04</b><span><strong>Input-ready protocol</strong><small>A bounded channel for future keyboard, pointer and touch forwarding.</small></span></p></div>
    </section>

    <footer className={styles.footer}><p>ArchTitan OS / TitanMirror</p><h2>Your Android workspace, rendered natively on Linux.</h2><Link href="/">Return to the research overview →</Link></footer>
  </main>
}
