const KEY = "quickcv.v1";
const form = document.querySelector("#cvForm");
let data = { ...CV.sample };
let storageOK = true;
try {
  const saved = JSON.parse(localStorage.getItem(KEY));
  if (saved && typeof saved === "object")
    for (const key of Object.keys(data))
      if (typeof saved[key] === "string") data[key] = saved[key];
} catch {
  storageOK = false;
}
const el = (tag, text, cls) => {
  const n = document.createElement(tag);
  if (text !== undefined) n.textContent = text;
  if (cls) n.className = cls;
  return n;
};
function fill() {
  for (const key of Object.keys(data)) form.elements[key].value = data[key];
  render();
}
function render() {
  const paper = document.querySelector("#resume");
  paper.replaceChildren();
  paper.append(
    el("h2", data.name || "Your name"),
    el("p", data.role, "resume-role"),
  );
  const contact = el("div", undefined, "contact");
  ["email", "phone", "location", "website"].forEach((k) => {
    if (data[k].trim()) contact.append(el("span", data[k]));
  });
  paper.append(contact);
  if (data.summary.trim()) paper.append(el("p", data.summary, "summary"));
  for (const key of CV.sections(data)) {
    paper.append(el("h3", key));
    for (const block of data[key].trim().split(/\n\s*\n/)) {
      const entry = el("div", undefined, "entry");
      CV.lines(block).forEach((line, i) =>
        entry.append(el(i ? "p" : "strong", line)),
      );
      paper.append(entry);
    }
  }
  if (CV.skills(data.skills).length) {
    paper.append(el("h3", "Skills"));
    const list = el("div", undefined, "skill-list");
    CV.skills(data.skills).forEach((s) => list.append(el("span", s)));
    paper.append(list);
  }
  document.querySelector("#lengthNote").textContent =
    paper.scrollHeight > 900 ? "Long content: check the print preview." : "";
}
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
    storageOK = true;
  } catch {
    storageOK = false;
  }
  document.querySelector("#saveStatus").textContent = storageOK
    ? "Saved locally"
    : "Storage unavailable - export before leaving";
}
form.addEventListener("input", () => {
  for (const key of Object.keys(data)) data[key] = form.elements[key].value;
  render();
  save();
});
document.querySelector("#sample").onclick = () => {
  if (confirm("Replace your current details with the fictional example?")) {
    data = { ...CV.sample };
    fill();
    save();
    document.querySelector("#notice").textContent =
      "Tip: choose Save as PDF, A4, and turn off browser headers and footers.";
  }
};
document.querySelector("#clear").onclick = () => {
  if (confirm("Clear this resume and its saved details?")) {
    for (const k of Object.keys(data)) data[k] = "";
    fill();
    save();
  }
};
document.querySelector("#export").onclick = () => {
  const error = CV.validate(data);
  if (error) {
    document.querySelector("#notice").textContent = error;
    form.elements.name.focus();
    return;
  }
  document.querySelector("#notice").textContent =
    "In the print dialog, choose Save as PDF, A4, and turn off headers and footers.";
  window.print();
};
fill();
if (!storageOK)
  document.querySelector("#saveStatus").textContent =
    "Storage unavailable - export before leaving";
