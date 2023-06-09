chrome.runtime.sendMessage("ping", () => {});
chrome.storage.local.get("browser", (d) => {
  if (!d || !d.hasOwnProperty("browser")) return;
  let p = d["browser"];
  if (p) {
    if (p == "chrome")
      p = chrome.runtime.getURL("polyfill/chrome/polyfill.min.js");
    else if (p == "edge")
      p = chrome.runtime.getURL("polyfill/edge/polyfill.min.js");
    else if (p == "firefox")
      p = chrome.runtime.getURL("polyfill/firefox/polyfill.min.js");
    document.documentElement.setAttribute("data-path", p);
    let e = document.createElement("script");
    e.src = chrome.runtime.getURL("polyfill/attach.js");
    e.onload = () => document.documentElement.removeChild(e);
    document.documentElement.appendChild(e);
  }
});
