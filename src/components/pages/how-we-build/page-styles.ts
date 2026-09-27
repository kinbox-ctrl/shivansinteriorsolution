/**
 * Page-local motion CSS for How We Build. Every hidden state is gated on `html.js` and on the
 * shared `[data-reveal]` `.is-in` class, and is cancelled under `prefers-reduced-motion`, so SSR,
 * no-JS and reduced-motion visitors always see the finished state.
 */
export const HOW_WE_BUILD_CSS = `
.hwb-dim-line{transform-origin:50% 50%;transition:transform .9s cubic-bezier(.22,1,.36,1) var(--d,0ms)}
.hwb-dim-tick{transition:opacity .3s ease calc(var(--d,0ms) + .7s),transform .3s cubic-bezier(.22,1,.36,1) calc(var(--d,0ms) + .7s)}
html.js [data-reveal]:not(.is-in) .hwb-dim-line{transform:scaleX(0)}
html.js [data-reveal]:not(.is-in) .hwb-dim-tick{opacity:0;transform:scaleY(.2)}
.hwb-dot{transition:transform .35s cubic-bezier(.22,1,.36,1) var(--d,0ms),background-color .35s ease var(--d,0ms)}
html.js [data-reveal]:not(.is-in) .hwb-dot.is-on{transform:scale(.45);background-color:transparent}
.hwb-tick{stroke-dasharray:26;stroke-dashoffset:0;transition:stroke-dashoffset .3s cubic-bezier(.22,1,.36,1) var(--d,0ms)}
html.js [data-reveal]:not(.is-in) .hwb-tick{stroke-dashoffset:26}
.hwb-tick-ring{transition:border-color .3s ease var(--d,0ms)}
html.js [data-reveal]:not(.is-in) .hwb-tick-ring{border-color:var(--line-strong)}
.hwb-card{transition:scale .6s cubic-bezier(.22,1,.36,1),opacity .6s cubic-bezier(.22,1,.36,1),box-shadow .6s cubic-bezier(.22,1,.36,1)}
.hwb-fill{transition:height .5s cubic-bezier(.22,1,.36,1)}
@keyframes hwb-sheen{0%{transform:translateX(-140%) skewX(-18deg)}60%,100%{transform:translateX(240%) skewX(-18deg)}}
.hwb-sheen{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.hwb-sheen::after{content:"";position:absolute;top:0;bottom:0;left:0;width:45%;background:linear-gradient(90deg,rgba(198,105,53,0) 0%,rgba(198,105,53,.16) 50%,rgba(198,105,53,0) 100%);animation:hwb-sheen 7s cubic-bezier(.22,1,.36,1) infinite}
@keyframes hwb-typing{0%,80%,100%{transform:translateY(0);opacity:.35}40%{transform:translateY(-3px);opacity:1}}
.hwb-typing>span{animation:hwb-typing 1s ease-in-out infinite}
.hwb-typing>span:nth-child(2){animation-delay:.15s}
.hwb-typing>span:nth-child(3){animation-delay:.3s}
@media (prefers-reduced-motion:reduce){
  html.js [data-reveal]:not(.is-in) .hwb-dim-line{transform:none}
  html.js [data-reveal]:not(.is-in) .hwb-dim-tick{opacity:1;transform:none}
  html.js [data-reveal]:not(.is-in) .hwb-dot.is-on{transform:none;background-color:var(--teal)}
  html.js [data-reveal]:not(.is-in) .hwb-tick{stroke-dashoffset:0}
  html.js [data-reveal]:not(.is-in) .hwb-tick-ring{border-color:var(--copper)}
  .hwb-sheen::after,.hwb-typing>span{animation:none}
}
`;
