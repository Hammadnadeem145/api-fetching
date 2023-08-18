import { request } from "http";
import { NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
  const name = request.nextUrl.searchParams.get("name");

  if (name) {
    return NextResponse.json({
      message: `Hello ${name}!`,
    });
  } else {
    return NextResponse.json(
      {
        message: "Name not found",
      },
      {
        status: 400,
      }
    );
  }
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  return NextResponse.json({
    data: body,
    message: "Data created successfully.",
  });
};

export const PUT = async (request: NextRequest) => {
  const body = await request.json();
  return NextResponse.json({
    data: body,
    message: `Data updated successfully`,
  });
};

export const DELETE = async (request: NextRequest) => {
    const id = request.nextUrl.searchParams.get("id");
  return NextResponse.json({
    message: "Data deleted successfully",
    id: id,
  });
};
