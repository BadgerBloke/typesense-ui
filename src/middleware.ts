import { NextRequest, NextResponse } from 'next/server';

import { CLIENT, COOKIES } from './lib/config';

export const config = {
    matcher: ['/((?!_next/static|sign-in|_next/image|favicon.ico).*)'],
};
export const middleware = (request: NextRequest) => {
    const cookieStore = request.cookies;
    const authorization = cookieStore.get(COOKIES.authorization)?.value;
    if (!authorization) return NextResponse.redirect(`${CLIENT.host}/sign-in?callback=${request.nextUrl.pathname}`);

    return NextResponse.next({ ...request });
};
