import Link from "next/link";
import styles from "./SystemFeaturePage.module.css";

export type FeaturePageData = {
  accent: string;
  eyebrow: string;
  title: string[];
  summary: string;
  metrics: Array<[string, string]>;
  capabilities: Array<[string, string, string, string]>;
  pipeline: Array<[string, string, string]>;
  principles: Array<[string, string]>;
  footer: string;
};

export function SystemFeaturePage({ data }: { data: FeaturePageData }) {
  return (
    <main className={styles.page} style={{ "--accent": data.accent } as React.CSSProperties}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.brand}><i /> ArchTitan <b>OS</b></Link>
        <div><a href="#capabilities">Capabilities</a><a href="#pipeline">Pipeline</a><a href="#principles">Principles</a></div>
        <Link href="/#ecosystem" className={styles.back}>← All features</Link>
      </nav>

      <section className={styles.hero}>
        <div className={styles.grid} />
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><i /> {data.eyebrow}</p>
          <h1>{data.title.map((line, index) => <span key={line} className={index === data.title.length - 1 ? styles.accent : ""}>{line}</span>)}</h1>
          <p className={styles.summary}>{data.summary}</p>
          <a className={styles.heroAction} href="#capabilities">Explore the subsystem ↓</a>
        </div>
        <div className={styles.console} aria-label={`${data.title.join(" ")} live system preview`}>
          <header><span><i /><i /><i /></span><b>archtitan / system service</b><em>ONLINE</em></header>
          <div className={styles.metrics}>{data.metrics.map(([value, label], index) => <article key={label}><small>0{index + 1} / {label}</small><strong>{value}</strong><i><b style={{ width: `${92 - index * 13}%` }} /></i></article>)}</div>
          <footer><span>policy synchronized</span><span>telemetry live</span></footer>
        </div>
        <div className={styles.heroMeta}><span>Arch Linux</span><span>Native service</span><span>Developer-first</span><span>Research prototype · 2026</span></div>
      </section>

      <section id="capabilities" className={styles.section}>
        <div className={styles.intro}><p>01 / Capabilities</p><h2>Purpose-built for<br /><em>the active workload.</em></h2><span>Each capability is grounded in the ArchTitan OS research architecture and designed to remain inspectable.</span></div>
        <div className={styles.capabilityGrid}>{data.capabilities.map(([number, title, copy, technology]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{copy}</p><code>{technology}</code></article>)}</div>
      </section>

      <section id="pipeline" className={`${styles.section} ${styles.dark}`}>
        <div className={styles.intro}><p>02 / Control path</p><h2>Observe. Decide.<br /><em>Act. Verify.</em></h2><span>A bounded native pipeline turns low-level signals into reversible system behavior.</span></div>
        <ol className={styles.pipeline}>{data.pipeline.map(([title, technology, copy], index) => <li key={title}><b>0{index + 1}</b><span><strong>{title}</strong><code>{technology}</code></span><p>{copy}</p></li>)}</ol>
      </section>

      <section id="principles" className={styles.principles}>
        <div><p>03 / Design principles</p><h2>Native by design.<br />Transparent by default.</h2></div>
        <div className={styles.principleGrid}>{data.principles.map(([title, copy], index) => <article key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <footer className={styles.footer}><p>ArchTitan OS / {data.title.join(" ")}</p><h2>{data.footer}</h2><Link href="/#ecosystem">Return to the complete ecosystem →</Link></footer>
    </main>
  );
}
