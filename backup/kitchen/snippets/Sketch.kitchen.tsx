// Removed from the site on 9 Oct 2026. Original source: see backup/kitchen/README.md

function Kitchen() {
  return (
    <svg viewBox="0 0 320 200" {...COMMON}>
      {/* worktop and base cabinets */}
      <path d="M20 110h280" />
      <path d="M24 114v60h272v-60" />
      <path d="M24 174h272" />
      <path d="M92 114v60M160 114v60M228 114v60" />
      <path d="M52 144h12M120 144h12M188 144h12M256 144h12" />
      {/* wall units */}
      <path d="M40 30h240v50H40z" />
      <path d="M100 30v50M160 30v50M220 30v50" />
      <path d="M68 62v6M130 62v6M190 62v6M250 62v6" />
      {/* chimney + hob */}
      <path d="M136 80v10h48V80" />
      <path d="M130 90h60" />
      <circle cx="148" cy="104" r="4" />
      <circle cx="172" cy="104" r="4" />
      {/* sink */}
      <path d="M236 100h44v8h-44z" />
      <path d="M258 100v-12c0-4 4-6 8-4" />
      {/* dimension line top */}
      <path d="M40 14h240M40 10v8M280 10v8" />
      <path d="M156 8h8" strokeOpacity="0.6" />
      {/* dimension line left */}
      <path d="M8 30v144M4 30h8M4 174h8" />
      <path d="M6 100h4" strokeOpacity="0.6" />
      {/* tick marks along the worktop */}
      <path d="M60 110v-4M100 110v-4M140 110v-4M180 110v-4M220 110v-4M260 110v-4" />
    </svg>
  );
}

