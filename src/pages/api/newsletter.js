import { connectDatabase, insertDocument } from "../../helpers/db-utils";

const handler = async (req, res) => {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to database failed!" });
    return;
  }

  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res
        .status(422)
        .json({ status: "FAILED", message: "Invalid email address!" });
      client.close();
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      res
        .status(201)
        .json({ status: "SUCCESS", message: "Signed up!", email: userEmail });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
    }
  }
  client.close();
};

export default handler;
