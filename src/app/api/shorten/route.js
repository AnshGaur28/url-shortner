import {redis}  from "../../../lib/redis.js";

export  async function POST(req, res) {
  const { longUrl } = await req.json();
  console.log(longUrl)
  if (!longUrl || longUrl.length <= 0) {
    return new Response(JSON.stringify({
      status: "Error!",
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const shortUrl = makeShortUrl(4);

  // Save urls to hash "links" with the shortUrl being key and longUrl being value
  let result = await redis.hset("links", { [shortUrl]: longUrl });

  return new Response(JSON.stringify({
    status: "Success!",
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

const makeShortUrl = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};