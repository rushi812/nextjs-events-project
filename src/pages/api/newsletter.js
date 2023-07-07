const handler = (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res
        .status(422)
        .json({ status: "FAILED", message: "Invalid email address!" });
      return;
    }

    console.log("RB:: userEmail", userEmail);

    res
      .status(201)
      .json({ status: "SUCCESS", message: "Signed up!", email: userEmail });
  }
};

export default handler;
