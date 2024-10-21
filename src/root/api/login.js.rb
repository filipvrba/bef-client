export default def handler(req, res)
  if req.method == 'POST'
    email    = req.body.email
    password = req.body.password

    if email === 'filipvrbaxi@gmail.com' && password === 'vrba'
      res.status(200).json({ message: 'Login successful!' })
    else
      res.status(401).json({ message: 'Invalid credentials!' })
    end
  else
    res.status(405).json({ message: 'Method not allowed' })
  end
end
