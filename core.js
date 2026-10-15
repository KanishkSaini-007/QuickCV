/* Small pure helpers shared by the browser and the tests. */
(function (root) {
  const sample = {
    name: "Alex Morgan",
    role: "Junior front-end developer",
    email: "alex.morgan@example.com",
    phone: "+1 202 555 0142",
    location: "Portland, OR",
    website: "alexmorgan.example.com",
    summary:
      "Curious developer who builds accessible, practical web experiences. Comfortable turning a rough idea into a thoughtful, responsive interface.",
    education:
      "B.S. Computer Science | Northbridge University | 2024 - 2028\nRelevant study: web development, data structures, human-computer interaction",
    skills: "HTML, CSS, JavaScript, Git, Figma, Accessibility",
    projects:
      "Campus Compass | Responsive student resource directory\nBuilt a searchable directory with keyboard-friendly filters and saved favorites.\n\nWeather Window | Personal weather dashboard\nDesigned a responsive dashboard with clear empty and loading states.",
    experience:
      "Front-end volunteer | Open Neighborhood | Jun 2026 - Present\nRebuilt two community pages with semantic HTML and improved mobile navigation.\nCollaborated with a small team through code reviews and shared design notes.",
  };
  function lines(text) {
    return String(text || "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  function sections(data) {
    return ["education", "experience", "projects"].filter(
      (k) => lines(data[k]).length,
    );
  }
  function skills(text) {
    return String(text || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  function validate(data) {
    return data.name.trim() ? "" : "Add your name before exporting.";
  }
  const api = { sample, lines, skills, sections, validate };
  if (typeof module !== "undefined") module.exports = api;
  root.CV = api;
})(typeof window !== "undefined" ? window : globalThis);
