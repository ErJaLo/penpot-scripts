try {
  console.log("library.local keys:", Object.keys(penpot.library.local));
  console.log("library.local proto:", Object.getOwnPropertyNames(Object.getPrototypeOf(penpot.library.local)));
  console.log("library.local:", JSON.stringify(penpot.library.local));
} catch(e) {
  console.error("[FATAL]", e.message);
}