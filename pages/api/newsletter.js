function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      return res.status(422).json({ message: "Invalid email address" });
    }
    console.log(userEmail);
    res.status(201).json({ message: "Signed up" });
  }
}

export default handler;
