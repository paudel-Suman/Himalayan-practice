export function logout() {
  if (typeof window !== "undefined") {
    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=None;";
    window.location.href = "/admin";
  }
}
