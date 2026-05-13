const rgb = {
  lavender:      "167,139,250",
  lightLavender: "196,181,253",
  surfaceDark:   "88,28,135",
  surfaceDarker: "49,10,101",
  brandDeep:     "124,58,237",
  brand:         "168,85,247",
  brandAlt:      "139,92,246",
  brandDarker:   "109,40,217",
  bgDeep:        "13,5,21",
  danger:        "220,38,38",
  white:         "255,255,255",
}

const a = (base: string, alpha: number) => `rgba(${base},${alpha})`

export const colors = {
  // brand
  primary:      "#a855f7",
  primaryDeep:  "#7c3aed",
  pinkAccent:   "#f0abfc",

  // text
  textBright:   "#f3e8ff",
  textSoft:     "#e9d5ff",
  textMuted:    "#c4b5fd",
  textDanger:   "#fca5a5",

  // backgrounds
  bgBase:       "#0D0515",

  // surfaces (purple-tinted glass)
  surface:      a(rgb.surfaceDark, 0.15),
  surfaceLow:   a(rgb.surfaceDark, 0.10),
  surfaceModal: a(rgb.surfaceDark, 0.18),
  surfaceDim:   a(rgb.surfaceDark, 0.30),

  // borders
  border:        a(rgb.lavender, 0.25),
  borderSoft:    a(rgb.lavender, 0.20),
  borderStrong:  a(rgb.lavender, 0.30),
  borderFaint:   a(rgb.lavender, 0.12),
  borderActive:  a(rgb.lavender, 0.60),
  borderHover:   a(rgb.lavender, 0.50),
  accentMuted:   a(rgb.lavender, 0.50),
  borderTrace:   a(rgb.lavender, 0.10),

  // muted lavender text alphas
  muted90:       a(rgb.lightLavender, 0.90),
  muted80:       a(rgb.lightLavender, 0.80),
  muted70:       a(rgb.lightLavender, 0.70),
  muted60:       a(rgb.lightLavender, 0.60),
  muted50:       a(rgb.lightLavender, 0.50),
  muted40:       a(rgb.lightLavender, 0.40),
  muted35:       a(rgb.lightLavender, 0.35),
  muted30:       a(rgb.lightLavender, 0.30),
  muted25:       a(rgb.lightLavender, 0.25),
  muted20:       a(rgb.lightLavender, 0.20),

  // overlays
  overlayDeep:   a(rgb.bgDeep, 0.95),
  overlayMid:    a(rgb.bgDeep, 0.80),
  overlayLight:  a(rgb.bgDeep, 0.75),

  // brand glow (used in shadows/box-shadow)
  glow15:        a(rgb.brandDeep, 0.15),
  glow25:        a(rgb.brandDeep, 0.25),
  glow30:        a(rgb.brandDeep, 0.30),
  glow50:        a(rgb.brandDeep, 0.50),

  // misc
  innerHighlight: a(rgb.white, 0.05),
  dangerSurface:  a(rgb.danger, 0.10),
  dangerBorder:   a(rgb.danger, 0.30),

  // ambient orbs
  orbDarker:     a(rgb.brandDarker, 0.18),
  orbAlt:        a(rgb.brandAlt, 0.12),
  orbBrand:      a(rgb.brand, 0.10),
} as const

export const gradients = {
  brand:       `linear-gradient(135deg, ${colors.textSoft}, ${colors.primary})`,
  cta:         `linear-gradient(135deg, ${colors.primaryDeep}, ${colors.primary})`,
  placeholder: `linear-gradient(135deg, ${a(rgb.surfaceDark, 0.4)}, ${a(rgb.surfaceDarker, 0.6)})`,
  overlayRight:  `linear-gradient(to right, transparent 60%, ${colors.overlayMid})`,
  overlayBottom: `linear-gradient(to bottom, transparent 50%, ${colors.overlayMid})`,
  captionFromBottom:     `linear-gradient(to top, ${colors.overlayDeep} 0%, transparent 100%)`,
  miniCardCaption:       `linear-gradient(to top, ${colors.overlayDeep}, transparent)`,
} as const

export const shadows = {
  card:       `0 0 60px ${colors.glow15}, inset 0 1px 0 ${colors.innerHighlight}`,
  modal:      `0 0 80px ${colors.glow25}, inset 0 1px 0 ${colors.innerHighlight}`,
  cta:        `0 0 20px ${colors.glow30}`,
  miniActive: `0 0 20px ${colors.glow30}`,
  dotActive:  `0 0 12px ${colors.glow50}`,
  helpHover:  `0 0 16px ${colors.glow25}`,
} as const

export const fonts = {
  brand: "'Syne', sans-serif",
  mono:  "'DM Mono', monospace",
} as const
