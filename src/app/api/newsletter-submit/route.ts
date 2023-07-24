import axios from "axios";

function getRequestParams(email: string) {
  // get env variables
  const API_KEY = process.env.MAILCHIMP_API_KEY;

  const LIST_ID = process.env.MAILCHIMP_LIST_ID;
  // mailchimp datacenter - mailchimp api keys always look like this:
  // fe4f064432e4684878063s83121e4971-us6
  // We need the us6 part
  const DATACENTER = process.env.MAILCHIMP_API_KEY!.split("-")[1];

  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

  // Add aditional params here. See full list of available params:
  // https://mailchimp.com/developer/reference/lists/list-members/
  const data = {
    email_address: email,
    status: "subscribed",
  };

  // Api key needs to be encoded in base 64 format
  const base64ApiKey = Buffer.from(`anystring:${API_KEY}`).toString("base64");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Basic ${base64ApiKey}`,
  };

  return {
    url,
    data,
    headers,
  };
}

export async function POST(request: Request) {
  const email = await request.json();

  if (!email || !email.length) {
    return new Response(JSON.stringify("The email is not valid"));
  }

  try {
    const { url, data, headers } = getRequestParams(email);

    console.log(url);
    const response = await axios.post(url, data, { headers });
    // Success
    return new Response(JSON.stringify("The user was subscribed"));
  } catch (error) {
    return new Response(
      JSON.stringify(
        "An error occured, please sendn an email to pedrogilsenarego@gmail.com"
      )
    );
  }
}
