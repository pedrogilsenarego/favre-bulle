export async function GET(request: Request) {
  return new Response("hi");
}

export async function POST(request: Request) {
  const body = request.body;
  console.log(body);
  return new Response("OK");
}
