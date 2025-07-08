export const config = {
    matcher: ['/((?!api|_next/static|auth|_next/image|favicon.ico).*)'],
};
export { auth as middleware } from '~/lib/auth';
