import type { Metadata } from "next";
import { StructuredData } from "@/components/StructuredData";
import { SystemFeaturePage, type FeaturePageData } from "@/components/feature/SystemFeaturePage";
import { createPageMetadata, pageSeo } from "@/lib/site";
import { pageSchema } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata(pageSeo.gpuSwitcher);

const data: FeaturePageData = {
  accent: "#ff7a55",
  eyebrow: "Adaptive graphics · Auto GPU Switcher",
  title: ["The right GPU.", "For the work", "in front of you."],
  summary: "ArchTitan OS detects hybrid graphics through DRM/KMS, interprets workload context from THM, and routes applications to integrated or discrete graphics without manual reconfiguration or a session restart.",
  metrics: [["iGPU", "idle route"], ["dGPU", "heavy route"], ["0", "session restarts"], ["live", "policy state"]],
  capabilities: [
    ["01", "Hardware discovery", "Enumerates DRM devices and identifies integrated and discrete graphics paths through sysfs.", "sysfs · /dev/dri · DRM/KMS"],
    ["02", "Context-aware routing", "Consumes THM workload classification rather than forcing developers to select a GPU manually.", "THM profile · workspace context"],
    ["03", "PRIME offload", "Injects the correct environment for discrete rendering while preserving integrated graphics efficiency.", "DRI_PRIME · __NV_PRIME_RENDER_OFFLOAD"],
    ["04", "Reversible policy", "Keeps routing decisions explicit and restores the efficient default when demanding work ends.", "policy state · safe fallback"],
  ],
  pipeline: [
    ["Detect", "DRM/KMS enumeration", "Discover the available render devices and their driver topology."],
    ["Classify", "THM workload signal", "Determine whether the active workload benefits from discrete graphics."],
    ["Route", "PRIME environment", "Launch the workload against the selected rendering device."],
    ["Verify", "device telemetry", "Confirm the active route and expose it to monitoring surfaces."],
  ],
  principles: [["Automatic, not opaque", "Developers can inspect why a route was selected and which device is active."], ["Power proportionality", "The integrated GPU remains the default for ordinary and idle work."], ["No session restart", "Policy changes avoid interrupting the active development environment."], ["Safe degradation", "Unsupported hardware falls back to the platform default without blocking applications."]],
  footer: "Graphics performance that follows developer intent.",
};

export default function AutoGpuSwitcherPage() {
  return <><StructuredData data={pageSchema(pageSeo.gpuSwitcher)} /><SystemFeaturePage data={data} /></>;
}
