export function deepCloneObject<T>(obj: T): T {
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch (error) {
      console.error("Deep clone error:", error);
      return obj;
    }
  }