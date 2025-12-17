const BookService = require("../services/BookService");

class BookController {

  async homepage(req, res) {
    try {
      const allBooks = await BookService.getAllBooks();

      const genres = Array.from(
        new Set((allBooks || []).map(b => b.genre).filter(Boolean))
      ).sort((a, b) => a.localeCompare(b));

      const authors = Array.from(
        new Set((allBooks || []).map(b => b.author).filter(Boolean))
      ).sort((a, b) => a.localeCompare(b));

      // Read filters from querystring
      const filters = {
        sort: (req.query.sort || "").toString(),
        genre: (req.query.genre || "").toString(),
        author: (req.query.author || "").toString()
      };

      // Apply filters
      let books = [...(allBooks || [])];

      if (filters.genre) {
        books = books.filter(b => (b.genre || "") === filters.genre);
      }

      if (filters.author) {
        books = books.filter(b => (b.author || "") === filters.author);
      }

      // Apply sorting
      if (filters.sort === "price_asc") {
        books.sort((a, b) => Number(a.price) - Number(b.price));
      } else if (filters.sort === "price_desc") {
        books.sort((a, b) => Number(b.price) - Number(a.price));
      }

      const grouped = [];
      for (let i = 0; i < books.length; i += 4) {
        grouped.push(books.slice(i, i + 4));
      }

      res.render("index", {
        books: grouped,
        genres,
        authors,
        filters
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error loading books.");
    }
  }

  async details(req, res) {
    try {
      const book = await BookService.getBookById(req.params.id);
      if (!book) return res.status(404).send("Book not found");

      res.render("book-details", { book });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error loading book.");
    }
  }

  async adminList(req, res) {
    try {
      const books = await BookService.getAllBooks();
      res.render("admin-books", { books });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error loading admin book list.");
    }
  }

  async create(req, res) {
    try {
      await BookService.createBook(req.body);
      res.redirect("/admin/books");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error creating book.");
    }
  }

  async edit(req, res) {
    try {
      const book = await BookService.getBookById(req.params.id);
      if (!book) return res.status(404).send("Book not found");

      res.render("edit-book", { book });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error loading book editor.");
    }
  }

  async update(req, res) {
    try {
      await BookService.updateBook(req.params.id, req.body);
      res.redirect("/admin/books");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating book.");
    }
  }

  async delete(req, res) {
    try {
      await BookService.deleteBook(req.params.id);
      res.redirect("/admin/books");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting book.");
    }
  }

  async searchBooks(req, res) {
    try {
      const query = req.query.q;
      const books = await BookService.searchBooks(query);

      res.render("search-results", {
        query,
        books
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error searching books.");
    }
  }

  async bookPage(req, res) {
    try {
      const slug = req.params.slug;
      const book = await BookService.getBookBySlug(slug);

      if (!book) return res.status(404).send("Book not found");

      res.render("book-details-page", {
        book,
        pageTitle: `${book.title} – ${book.author} | BookShop`,
        pageDescription: book.description?.substring(0, 150)
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error loading book page.");
    }
  }





}

module.exports = new BookController();
