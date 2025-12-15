const express = require("express");
const router = express.Router();
const BookService = require("../services/BookService");

router.get("/sitemap.xml", async (req, res) => {
  const books = await BookService.getAllBooks();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  xml += `
    <url>
        <loc>http://localhost:3000/</loc>
        <changefreq>weekly</changefreq>
    </url>`;

  books.forEach(book => {
    xml += `
        <url>
            <loc>http://localhost:3000/books/${book.slug}</loc>
            <changefreq>weekly</changefreq>
        </url>`;
  });

  xml += `</urlset>`;

  res.header("Content-Type", "application/xml");
  res.send(xml);
});

module.exports = router;
