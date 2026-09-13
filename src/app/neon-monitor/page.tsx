import type { Metadata } from "next";
import { StructuredData } from "@/components/StructuredData";
import { SystemFeaturePage, type FeaturePageData } from "@/components/feature/SystemFeaturePage";
import { createPageMetadata, pageSeo } from "@/lib/site";
import { pageSchema } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata(pageSeo.neonMonitor);

const data: FeaturePageData = {
  accent: "#5ce1a8",
  eyebrow: "Native observability · Neon Monitor",
  title: ["See the system.", "Understand", "the workload."],
  summary: "Neon Monitor turns procfs and sysfs signals into a lightweight, live view of CPU, memory, thermal and process behavior—without introducing the overhead of a heavyweight monitoring stack.",
  metrics: [["42%", "CPU load"], ["3.8 GB", "memory used"], ["61°C", "package thermal"], ["18", "active processes"]],
  capabilities: [
    ["01", "Live resource telemetry", "Samples processor and memory state directly from Linux kernel interfaces.", "procfs · loadavg · meminfo"],
    ["02", "Thermal visibility", "Surfaces sensor zones and package temperatures before throttling becomes invisible friction.", "sysfs · thermal zones"],
    ["03", "Process context", "Connects process activity to THM classifications and the workspace that owns the workload.", "/proc · PID tree · workspace ID"],
    ["04", "Low overhead", "Uses a native sampling path and bounded refresh cadence to preserve the resources it measures.", "native UI · adaptive sampling"],
  ],
  pipeline: [
    ["Sample", "procfs + sysfs", "Read counters, memory state, sensors and selected process statistics."],
    ["Normalize", "native collector", "Convert kernel-specific values into consistent, human-readable metrics."],
    ["Correlate", "THM context", "Associate activity with workload profiles and workspace policy state."],
    ["Present", "lightweight native UI", "Render responsive telemetry without a browser-based monitoring service."],
  ],
  principles: [["Measure cheaply", "Monitoring should consume a negligible fraction of the resources under observation."], ["Show useful context", "A percentage becomes actionable when paired with its process and workspace."], ["Prefer kernel truth", "Telemetry comes from native Linux interfaces instead of opaque intermediaries."], ["Make pressure visible", "Memory, thermal and scheduling pressure remain clear before performance collapses."]],
  footer: "System telemetry with developer context built in.",
};

export default function NeonMonitorPage() {
  return <><StructuredData data={pageSchema(pageSeo.neonMonitor)} /><SystemFeaturePage data={data} /></>;
}
