(() => {
  const body = document.body;
  const stage = body?.dataset?.stage || "";
  const fragment = body?.dataset?.fragment || "";
  if (!stage) return;

  const KEY = "orakel.memory.v2";
  const SEEN = "orakel.seen.v2";

  try {
    const seen = JSON.parse(localStorage.getItem(SEEN) || "[]");
    if (!seen.includes(stage)) {
      const memoryBefore = localStorage.getItem(KEY) || "";
      const allowed404 = stage !== "404" || memoryBefore === "KONSOL";
      if (allowed404) {
        seen.push(stage);
        localStorage.setItem(SEEN, JSON.stringify(seen));
        if (fragment) {
          localStorage.setItem(KEY, memoryBefore + fragment);
        }
      }
    }

    // Deliberately quiet except on the 404 layer.
    // The console becomes part of the puzzle only after "KONSOLE" is found.
    if (stage === "404") {
      const memory = localStorage.getItem(KEY) || "";
      console.info("[ORAKEL] Browser-Speicher erkannt.");
      console.info("[ORAKEL] memory =", memory);
      if (memory === "KONSOLE") {
        console.info(
          "%c[ORAKEL] 48 41 52 4D 4F 4E 49 45",
          "font-weight:700; letter-spacing:0.12em;"
        );
        console.info("[ORAKEL] Drei Dinge helfen: Hex → Zeichen → Adresse.");
      } else {
        console.info("[ORAKEL] Die gespeicherte Sequenz ist noch nicht vollständig.");
      }
    }
  } catch {
    // Private browsing / disabled storage should not break the game.
  }
})();