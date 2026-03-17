import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mankai Software - 毎日を、満開に。";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom, #ecfdf5, #ffffff)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 100, marginBottom: 32 }}>🌸</div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            color: "#111827",
            marginBottom: 16,
            letterSpacing: "-1px",
          }}
        >
          Mankai Software
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 600,
            color: "#059669",
            marginBottom: 20,
          }}
        >
          毎日を、満開に。
        </div>
        <div style={{ fontSize: 24, color: "#6b7280" }}>
          ちょっとした不便を解消する、シンプルで使いやすいアプリ
        </div>
      </div>
    ),
    { ...size }
  );
}
