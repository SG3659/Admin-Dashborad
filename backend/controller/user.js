import bcrypt from "bcrypt";
import prisma from "../config/dbconfig.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {

    const isValidEmail = /^[a-zA-Z0-9._%+-]+@example\.com$/.test(email);
  if (!isValidEmail) {
    return res.status(400).json({ error: "Only work emails are allowed." });
  }
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
     const { password: _, ...userWithoutPassword } = user;
    return res.status(201).json({ message: "User created", user:userWithoutPassword });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@example\.com$/.test(email);
  if (!isValidEmail) {
    return res.status(400).json({ error: "Only work emails are allowed." });
  }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
       const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({ message: "Login successful", user:userWithoutPassword });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


