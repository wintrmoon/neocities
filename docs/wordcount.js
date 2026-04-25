/*NOTE - this currently unused, keeping this as ref for future website tree page
use this command in the terminal to get a list of the pages:
Get-ChildItem -Path ./public -Recurse -File -Filter *.html |
ForEach-Object {
  "'./" + $_.FullName.Substring((Resolve-Path ./public).Path.Length + 1).Replace("\","/") + "',"
}
*/

const pages = [
  "./about.html",
  "./era.html",
  "./index.html",
  "./lost.html",
  "./music.html",
  "./not_found.html",
  "./testing-title.html",
  "./testing.html",
  "./archive/photos.html",
  "./journal/index.html",
  "./log/archive.html",
  "./log/dec25.html",
  "./log/index.html",
  "./log/info.html",
  "./log/nov25.html",
  "./log/oct25.html",
  "./tui/index.html",
  "./tui/logs.html",
];

async function countWords() {
  let total = 0;

  for (const page of pages) {
    try {
      const res = await fetch(page);
      const text = await res.text();

      // Remove scripts & styles
      const clean = text
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ");

      const words = clean.trim().split(/\s+/).length;
      total += words;
    } catch (e) {
      console.warn("Failed to load", page);
    }
  }

  document.getElementById("total-word-count").textContent = total.toLocaleString() + " words";
}

countWords();
