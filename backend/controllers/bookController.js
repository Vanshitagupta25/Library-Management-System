import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Book from "../models/bookSchema.js";

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in registering user",
      error: err.message,
    });
  }
};
const login = async (req, res) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
  res.json({
    message: "Login successful",
    token,
  });
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      message: "Books fetched successfully",
      books,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in fetching books",
      error: err.message,
    });
  }
};
const newBooks = async (req, res) => {
  try {
    const { title, author } = req.body;

    const book = new Book({
      title,
      author,
    });
    await book.save();

    res.status(201).json({
      message: "Book created successfully",
      book,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in creating book",
      error: err.message,
    });
  }
};
const updateBooks = async (req, res) => {
  try {
    const { title, author } = req.body;
    const bookId = req.params.id;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    book.title = title;
    book.author = author;

    await book.save();

    res.status(200).json({
      message: "Book updated successfully",
      book,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in updating book",
      error: err.message,
    });
  }
};
const deleteBooks = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findByIdAndDelete(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      book,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in deleting book",
      error: err.message,
    });
  }
};
export { login, register, getBooks, newBooks, updateBooks, deleteBooks };
