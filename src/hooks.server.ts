import { adminAuth } from "$lib/server/admin";
import type { Handle } from "@sveltejs/kit";

console.log('hooks.server.ts is being imported');
export const handle: Handle = (async ({ event, resolve }) => {
  const sessionCookie = event.cookies.get("__session");

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie!);
    event.locals.userID = decodedClaims.uid;
    console.log("found user id", decodedClaims.uid);
    console.log(handle);
  } catch (e) {
    event.locals.userID = null;
    console.log(handle);
    return resolve(event);
    
  }
  console.log(handle);
  return resolve(event);
}) satisfies Handle;