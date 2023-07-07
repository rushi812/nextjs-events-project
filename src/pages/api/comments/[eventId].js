const handler = (req, res) => {
  const eventId = req.query.eventId;

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
      return;
    }
    const newComment = {
      id: new Date().getTime(),
      email,
      name,
      text,
    };
    console.log("RB:: newComemnt", newComment);

    res.status(201).json({
      status: "SUCCESS",
      message: "Comment added!",
      comment: newComment,
    });
  }

  if (req.method === "GET") {
    const commentsList = [
      { id: "c1", email: "test@test.com", name: "Rushi", text: "Comment 1" },
      {
        id: "c2",
        email: "test@test1.com",
        name: "Rushiraj",
        text: "Comment 2",
      },
    ];

    res.status(200).json({ status: "SUCCESS", comments: commentsList });
  }
};

export default handler;
