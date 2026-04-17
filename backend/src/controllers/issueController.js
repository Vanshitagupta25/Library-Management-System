import Book from "../models/bookSchema.js";
import Issue from "../models/issueSchema.js";

const issueBook = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);
    console.log(book);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.available == false) {
      return res.status(400).json({ message: "Book not available" });
    }
    //issue book
    const issue = new Issue({
      user: req.user._id,
      book: bookId,
      status: "issued",
    });

    await issue.save();
    book.available = false;
    await book.save();
    console.log(book);

    res.status(201).json({ message: "Book issued successfully", issue });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in issuing book", error: err.message });
  }
};

const returnBook = async (req, res) => {
  try {
    const { issueId } = req.body;

    const issue = await Issue.findById(issueId);

    if (!issue) {
      return res.status(404).json({ message: "Issue record not found" });
    }
    if (issue.status === "returned") {
      return res.status(400).json({ message: "Book already returned" });
    }
    issue.status = "returned";
    issue.returnDate = new Date();

    await issue.save();
    await Book.findByIdAndUpdate(issue.book, {
      available: true,
    });
    res.status(201).json({ message: "Book returned successfully", issue });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in returning   book", error: err.message });
  }
};
const myBooks = async (req, res) => {
  try {
    const issues = await Issue.find({
      user: req.user._id,
    }).populate("book");
    res.status(200).json({ issues });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in fetching my books", error: err.message });
  }
};
export { returnBook, issueBook, myBooks };
