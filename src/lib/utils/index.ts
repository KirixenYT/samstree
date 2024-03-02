export function getCookieValue(cookieString: string, cookieName: string) {
    const allCookies = cookieString.split("; ");
    const cookie = allCookies.find((cookie) => cookie.startsWith(cookieName));
    return cookie ? cookie.split("=")[1] : null;
  }
  