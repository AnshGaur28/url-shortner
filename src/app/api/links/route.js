import {redis} from "../../../lib/redis.js"; 

export  async function GET(req, res) {
  let links = (await redis.hgetall("links")) || [];

  console.log(links);

  return new Response(JSON.stringify({
    status: "Success!",
    links,
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}