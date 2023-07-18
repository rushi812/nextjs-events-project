import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../helpers/db-utils";

const handler = async (req, res) => {
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email ||
      email.trim() === "" ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ status: "FAILED", message: "Invalid input!" });
      client.close();
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    try {
      const result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res.status(201).json({
        status: "SUCCESS",
        message: "Comment added!",
        comment: newComment,
      });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed!" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(
        client,
        "comments",
        { _id: -1 },
        { eventId }
      );
      res.status(200).json({ status: "SUCCESS", comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Fetching all comments failed!" });
    }
  }
  client.close();
};

export default handler;
