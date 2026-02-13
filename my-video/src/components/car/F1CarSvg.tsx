import React from "react";

interface Props {
  wheelRotation: number;
  brakeGlowIntensity: number;
}

export const F1CarSvg: React.FC<Props> = ({
  wheelRotation,
  brakeGlowIntensity,
}) => (
  <svg
    width="1200"
    height="380"
    viewBox="0 0 1200 380"
    style={{ display: "block" }}
  >
    <defs>
      {/* ── Metallic Ferrari Red (main body) ── */}
      <linearGradient id="ferrariBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ff2a2a" />
        <stop offset="20%" stopColor="#e60000" />
        <stop offset="55%" stopColor="#b30000" />
        <stop offset="85%" stopColor="#800000" />
        <stop offset="100%" stopColor="#5a0000" />
      </linearGradient>

      {/* Metallic sheen overlay */}
      <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0.3">
        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
        <stop offset="35%" stopColor="rgba(255,255,255,0.08)" />
        <stop offset="48%" stopColor="rgba(255,255,255,0.22)" />
        <stop offset="52%" stopColor="rgba(255,255,255,0.22)" />
        <stop offset="65%" stopColor="rgba(255,255,255,0.08)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>

      {/* Side body (darker, shadow side) */}
      <linearGradient id="ferrariSide" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#a30000" />
        <stop offset="50%" stopColor="#700000" />
        <stop offset="100%" stopColor="#4a0000" />
      </linearGradient>

      {/* Nose gradient */}
      <linearGradient id="nose" x1="0" y1="0" x2="1" y2="0.2">
        <stop offset="0%" stopColor="#cc0000" />
        <stop offset="50%" stopColor="#e00000" />
        <stop offset="100%" stopColor="#aa0000" />
      </linearGradient>

      {/* Carbon fiber pattern */}
      <pattern
        id="carbon"
        width="6"
        height="6"
        patternUnits="userSpaceOnUse"
      >
        <rect width="6" height="6" fill="#141414" />
        <rect width="3" height="3" fill="#1a1a1a" />
        <rect x="3" y="3" width="3" height="3" fill="#1a1a1a" />
      </pattern>

      {/* Chrome / titanium gradient */}
      <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ddd" />
        <stop offset="25%" stopColor="#888" />
        <stop offset="45%" stopColor="#bbb" />
        <stop offset="55%" stopColor="#777" />
        <stop offset="75%" stopColor="#999" />
        <stop offset="100%" stopColor="#666" />
      </linearGradient>

      {/* Tire rubber gradient */}
      <radialGradient id="rearTire" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#2a2a2a" />
        <stop offset="55%" stopColor="#1a1a1a" />
        <stop offset="80%" stopColor="#111" />
        <stop offset="95%" stopColor="#090909" />
        <stop offset="100%" stopColor="#050505" />
      </radialGradient>
      <radialGradient id="frontTire" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#282828" />
        <stop offset="55%" stopColor="#181818" />
        <stop offset="80%" stopColor="#101010" />
        <stop offset="100%" stopColor="#060606" />
      </radialGradient>

      {/* Rim chrome */}
      <radialGradient id="rim" cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#ccc" />
        <stop offset="40%" stopColor="#888" />
        <stop offset="70%" stopColor="#555" />
        <stop offset="100%" stopColor="#333" />
      </radialGradient>

      {/* Brake glow */}
      <radialGradient id="brakeGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ff6600" stopOpacity="0.9" />
        <stop offset="40%" stopColor="#ff3300" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#cc0000" stopOpacity="0" />
      </radialGradient>

      {/* Ground shadow filter */}
      <filter id="shadowBlur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
      </filter>

      {/* Soft glow filter */}
      <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
      </filter>

      {/* Cockpit glass gradient */}
      <linearGradient id="cockpitGlass" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#222" />
        <stop offset="30%" stopColor="#111" />
        <stop offset="60%" stopColor="#0a0a0a" />
        <stop offset="100%" stopColor="#050505" />
      </linearGradient>

      {/* Wing endplate gradient */}
      <linearGradient id="endplate" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d00" />
        <stop offset="50%" stopColor="#900" />
        <stop offset="100%" stopColor="#600" />
      </linearGradient>
    </defs>

    {/* ══════ GROUND SHADOW ══════ */}
    <ellipse
      cx="560"
      cy="345"
      rx="500"
      ry="28"
      fill="rgba(0,0,0,0.6)"
      filter="url(#shadowBlur)"
    />

    {/* ══════ REAR WING ══════ */}
    {/* Main plane */}
    <path
      d="M55,42 L190,42 Q195,42 195,47 L195,52 Q195,57 190,57 L55,57 Q50,57 50,52 L50,47 Q50,42 55,42 Z"
      fill="url(#ferrariBody)"
    />
    <path
      d="M55,42 L190,42 Q195,42 195,47 L195,52 Q195,57 190,57 L55,57 Q50,57 50,52 L50,47 Q50,42 55,42 Z"
      fill="url(#sheen)"
      opacity="0.5"
    />
    {/* Top edge highlight */}
    <line x1="55" y1="42" x2="190" y2="42" stroke="rgba(255,150,150,0.2)" strokeWidth="1" />
    {/* Second element */}
    <rect x="60" y="62" width="120" height="7" rx="2" fill="url(#ferrariBody)" />
    <rect x="60" y="62" width="120" height="7" rx="2" fill="url(#sheen)" opacity="0.3" />
    {/* Pillars */}
    <rect x="112" y="65" width="10" height="78" rx="2" fill="url(#chrome)" />
    <rect x="128" y="70" width="7" height="73" rx="2" fill="url(#chrome)" />
    {/* DRS actuator detail */}
    <rect x="100" y="48" width="40" height="3" rx="1" fill="url(#chrome)" opacity="0.5" />

    {/* ══════ ENGINE COVER / AIRBOX ══════ */}
    <path
      d="M130,150 Q220,95 380,115 L380,195 Q220,205 130,185 Z"
      fill="url(#ferrariBody)"
    />
    <path
      d="M130,150 Q220,95 380,115 L380,195 Q220,205 130,185 Z"
      fill="url(#sheen)"
      opacity="0.4"
    />
    {/* Top edge highlight */}
    <path
      d="M140,152 Q220,100 375,117"
      fill="none"
      stroke="rgba(255,180,180,0.15)"
      strokeWidth="1.5"
    />
    {/* Central ridge */}
    <path
      d="M200,110 Q280,95 370,115"
      fill="none"
      stroke="rgba(255,200,200,0.12)"
      strokeWidth="2"
    />
    {/* Airbox */}
    <path d="M355,80 Q400,42 450,80 L450,115 L355,115 Z" fill="url(#ferrariBody)" />
    <path d="M365,88 Q400,58 435,88 L435,110 L365,110 Z" fill="url(#cockpitGlass)" />

    {/* ══════ HALO ══════ */}
    <path
      d="M400,110 Q465,55 540,110"
      fill="none"
      stroke="url(#chrome)"
      strokeWidth="12"
      strokeLinecap="round"
    />
    {/* Halo highlight */}
    <path
      d="M405,107 Q465,55 535,107"
      fill="none"
      stroke="rgba(255,255,255,0.15)"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* ══════ COCKPIT ══════ */}
    <path
      d="M390,115 Q460,82 535,115 L535,168 L390,168 Z"
      fill="url(#cockpitGlass)"
    />
    {/* Cockpit rim highlight */}
    <path
      d="M395,117 Q460,87 530,117"
      fill="none"
      stroke="rgba(200,200,200,0.15)"
      strokeWidth="2"
    />
    {/* Steering wheel hint */}
    <ellipse cx="462" cy="140" rx="14" ry="10" fill="#1a1a1a" stroke="#333" strokeWidth="1.5" />

    {/* ══════ MAIN BODY (MONOCOQUE) ══════ */}
    <path
      d="M320,115 L740,115 Q800,120 830,148 L830,228 Q790,245 320,228 Z"
      fill="url(#ferrariBody)"
    />
    <path
      d="M320,115 L740,115 Q800,120 830,148 L830,228 Q790,245 320,228 Z"
      fill="url(#sheen)"
      opacity="0.35"
    />
    {/* Top edge highlight */}
    <path
      d="M330,116 L735,116 Q795,121 825,148"
      fill="none"
      stroke="rgba(255,180,180,0.12)"
      strokeWidth="1.5"
    />

    {/* ══════ SIDEPODS ══════ */}
    <path
      d="M460,170 Q560,210 690,210 L690,228 Q560,232 460,228 Z"
      fill="url(#ferrariSide)"
    />
    {/* Sidepod intake mesh */}
    <path
      d="M470,155 L520,155 L520,185 L470,178 Z"
      fill="url(#carbon)"
    />
    <path
      d="M470,155 L520,155 L520,185 L470,178 Z"
      fill="none"
      stroke="rgba(255,255,255,0.05)"
      strokeWidth="0.5"
    />

    {/* ══════ NOSE CONE ══════ */}
    <path
      d="M740,130 Q860,133 1020,145 L1020,162 Q860,157 740,155 Z"
      fill="url(#nose)"
    />
    <path
      d="M740,130 Q860,133 1020,145 L1020,162 Q860,157 740,155 Z"
      fill="url(#sheen)"
      opacity="0.3"
    />
    {/* Nose top highlight */}
    <path
      d="M745,131 Q860,134 1015,146"
      fill="none"
      stroke="rgba(255,200,200,0.1)"
      strokeWidth="1"
    />
    {/* Nose tip */}
    <path
      d="M1020,143 Q1070,146 1120,150 L1120,158 Q1070,155 1020,153 Z"
      fill="url(#ferrariBody)"
    />

    {/* ══════ FRONT WING ══════ */}
    <rect x="1020" y="165" width="140" height="8" rx="3" fill="url(#ferrariBody)" />
    <rect x="1020" y="165" width="140" height="8" rx="3" fill="url(#sheen)" opacity="0.4" />
    <rect x="1010" y="180" width="155" height="7" rx="3" fill="url(#ferrariBody)" />
    <rect x="1005" y="193" width="160" height="5" rx="2" fill="url(#ferrariSide)" />
    {/* Endplates */}
    <rect x="1158" y="158" width="7" height="48" rx="2" fill="url(#endplate)" />
    <rect x="1005" y="163" width="7" height="42" rx="2" fill="url(#endplate)" />
    {/* Wing top highlights */}
    <line x1="1025" y1="165" x2="1155" y2="165" stroke="rgba(255,180,180,0.1)" strokeWidth="1" />

    {/* ══════ FLOOR / BARGEBOARD ══════ */}
    <path
      d="M320,228 L830,228 L855,248 L300,248 Z"
      fill="url(#carbon)"
    />
    {/* Barge board vanes */}
    {[380, 400, 420].map((x) => (
      <line
        key={x}
        x1={x}
        y1={228}
        x2={x - 8}
        y2={248}
        stroke="rgba(100,100,100,0.3)"
        strokeWidth="1"
      />
    ))}

    {/* ══════ REAR TIRE ══════ */}
    <g transform={`rotate(${wheelRotation}, 210, 255)`}>
      {/* Outer tire */}
      <circle cx="210" cy="255" r="78" fill="url(#rearTire)" />
      {/* Tread marks */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const x1 = 210 + Math.cos(angle) * 60;
        const y1 = 255 + Math.sin(angle) * 60;
        const x2 = 210 + Math.cos(angle) * 76;
        const y2 = 255 + Math.sin(angle) * 76;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#0a0a0a"
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      })}
      {/* Rim */}
      <circle cx="210" cy="255" r="42" fill="url(#rim)" />
      {/* Spokes */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <line
            key={`s-${i}`}
            x1={210 + Math.cos(angle) * 12}
            y1={255 + Math.sin(angle) * 12}
            x2={210 + Math.cos(angle) * 38}
            y2={255 + Math.sin(angle) * 38}
            stroke="url(#chrome)"
            strokeWidth="6"
            strokeLinecap="round"
          />
        );
      })}
    </g>
    {/* Brake glow (doesn't rotate) */}
    <circle
      cx="210"
      cy="255"
      r="35"
      fill="url(#brakeGlow)"
      opacity={brakeGlowIntensity}
    />
    {/* Wheel nut (doesn't rotate) */}
    <circle cx="210" cy="255" r="9" fill="#dc0000" />
    <circle cx="210" cy="255" r="6" fill="#ff1a1a" />
    <circle cx="210" cy="255" r="3" fill="#ff6666" opacity="0.6" />

    {/* ══════ FRONT TIRE ══════ */}
    <g transform={`rotate(${wheelRotation}, 880, 255)`}>
      <circle cx="880" cy="255" r="64" fill="url(#frontTire)" />
      {/* Tread */}
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        const x1 = 880 + Math.cos(angle) * 48;
        const y1 = 255 + Math.sin(angle) * 48;
        const x2 = 880 + Math.cos(angle) * 62;
        const y2 = 255 + Math.sin(angle) * 62;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#080808"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );
      })}
      {/* Rim */}
      <circle cx="880" cy="255" r="34" fill="url(#rim)" />
      {/* Spokes */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <line
            key={`fs-${i}`}
            x1={880 + Math.cos(angle) * 10}
            y1={255 + Math.sin(angle) * 10}
            x2={880 + Math.cos(angle) * 30}
            y2={255 + Math.sin(angle) * 30}
            stroke="url(#chrome)"
            strokeWidth="5"
            strokeLinecap="round"
          />
        );
      })}
    </g>
    {/* Front brake glow */}
    <circle
      cx="880"
      cy="255"
      r="28"
      fill="url(#brakeGlow)"
      opacity={brakeGlowIntensity * 0.7}
    />
    {/* Front wheel nut */}
    <circle cx="880" cy="255" r="7" fill="#dc0000" />
    <circle cx="880" cy="255" r="4.5" fill="#ff1a1a" />

    {/* ══════ REAR LIGHT ══════ */}
    <rect x="90" y="168" width="35" height="10" rx="5" fill="#ff2200" opacity="0.9" />
    <rect x="90" y="168" width="35" height="10" rx="5" fill="#ff0000" filter="url(#softGlow)" opacity="0.4" />

    {/* ══════ SPONSORS / NUMBER ══════ */}
    <text
      x="600"
      y="188"
      fontSize="48"
      fontWeight="900"
      fill="rgba(255,255,255,0.85)"
      fontFamily="Arial Black, sans-serif"
      textAnchor="middle"
    >
      16
    </text>
    <text
      x="430"
      y="210"
      fontSize="16"
      fill="rgba(255,204,0,0.8)"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
    >
      Shell
    </text>
    <text
      x="650"
      y="207"
      fontSize="18"
      fill="rgba(255,255,255,0.5)"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
    >
      HP
    </text>
    <text
      x="520"
      y="207"
      fontSize="12"
      fill="rgba(255,255,255,0.3)"
      fontFamily="Arial, sans-serif"
    >
      Puma
    </text>

    {/* ══════ AMBIENT REFLECTION LINE (bottom body) ══════ */}
    <path
      d="M330,225 Q580,232 820,225"
      fill="none"
      stroke="rgba(255,240,220,0.04)"
      strokeWidth="2"
    />
  </svg>
);
