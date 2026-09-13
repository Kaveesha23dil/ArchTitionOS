import { ImageResponse } from "next/og";

export const alt = "ArchTitan OS — context-aware Linux for developers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px", background: "#070b12", color: "#f4f3ef", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: 28, fontWeight: 700 }}><span style={{ width: 18, height: 18, borderRadius: "50%", background: "#5ce1e6" }} />ARCHTITAN <span style={{ color: "#546dff" }}>OS</span></div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 78, lineHeight: 1.02, letterSpacing: "-3px", fontWeight: 700 }}><span>Context-aware Linux</span><span>for developers.</span></div>
        <div style={{ marginTop: 30, fontSize: 25, color: "#a8b0bf" }}>Adaptive resource management · Workspace intelligence · Linux–Android tools</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#7f8999", fontSize: 20 }}><span>Built on Arch Linux</span><span>archtitan.tech</span></div>
    </div>,
    size,
  );
}
