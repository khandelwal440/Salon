const s=function(...e){var l;if(!window.location.hostname.endsWith("webflow.io"))return;const n=(l=new Error().stack)==null?void 0:l.split(`
`);n&&n.length>2?(window.console.log("👉",n[2]),e.forEach(o=>{o instanceof Error?window.console.error("❌",o):window.console.log("🚦",o)}),window.console.log("⏳",String(Date.now()).slice(-5)),window.console.log(`
`)):(e.forEach(o=>{o instanceof Error?window.console.error("🚧",o):window.console.log("🚧",o)}),window.console.log("⏳",String(Date.now()).slice(-5)),window.console.log(`
`))};export{s as l};
