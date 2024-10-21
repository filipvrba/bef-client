export default function handler(req, res) {
  let email, password;

  if (req.method === "POST") {
    email = req.body.email;
    password = req.body.password;
    return email === "filipvrbaxi@gmail.com" && password === "vrba" ? res.status(200).json({message: "Login successful!"}) : res.status(401).json({message: "Invalid credentials!"})
  } else {
    return res.status(405).json({message: "Method not allowed"})
  }
}