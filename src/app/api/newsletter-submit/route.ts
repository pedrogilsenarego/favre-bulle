//import { redirect } from "next/navigation";
//import { NextRequest } from "next/server";

export async function GET(request: Request) {
  //redirect("http://www.google.com")
  return new Response("hi");
}

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  //console.log(request.headers.get("Authorization"));
  return new Response(JSON.stringify("OK"));
}
