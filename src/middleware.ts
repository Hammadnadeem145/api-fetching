import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { getJWTSecretKey } from "./lib/auth";

export const middleware = async (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;
  const { pathname, origin } = request.nextUrl;
  console.log("Token", token);

  try {
    if (pathname === "/login" || pathname === "/register") {
      if (token) return NextResponse.redirect(`${origin}`);
      return NextResponse.next();
    }
    if (!token) {
      return NextResponse.redirect(`http://localhost:3000/login`);
    }

    const verifyToken = await jwtVerify(
      token,
      new TextEncoder().encode(getJWTSecretKey())
    );

    console.log("JWT Auth: ", verifyToken);

    if (verifyToken) {
      return NextResponse.next();
    }
    return NextResponse.json(
      { error: { Message: "Authentication Required" } },
      { status: 401 }
    );
  } catch (error) {
    console.log(error);
  }
};

export const config = {
  matcher: ["/login", "/api/login/:path*"],
};
