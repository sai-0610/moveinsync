export function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateRandomId(prefix = "id") {
  return prefix + "_" + Math.random().toString(36).substring(2, 10);
}

export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function mergeObjects(base, update) {
  return { ...base, ...update };
}
