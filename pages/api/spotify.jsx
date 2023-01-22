export default async function handler(req,res)
{
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    if(req.method == "POST" && req.query.token == "true"){

        var token = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      body: "grant_type=client_credentials",
    }).then((res) => res.json());

    res.status(200).json({
        res: token,
    });

    }
}