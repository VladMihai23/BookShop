const fs = require("fs");
const path = require("path");
const { PDFParse } = require("pdf-parse");
const BookRepository = require("../repositories/BookRepository");

async function extractPdfText(pdfUrl) {
  if (!pdfUrl) return "";

  const relativePath = pdfUrl.startsWith("/") ? pdfUrl.slice(1) : pdfUrl;
  const fullPath = path.join(process.cwd(), "public", relativePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`PDF not found: ${fullPath}`);
    return "";
  }

  const dataBuffer = fs.readFileSync(fullPath);
  const parser = new PDFParse(new Uint8Array(dataBuffer));
  const parsed = await parser.getText();

  return parsed?.text || "";
}

async function indexBooksToSolr() {
  const books = await BookRepository.getAll();

  const docs = [];
  for (const book of books) {
    const pdfText = await extractPdfText(book.pdf_url);

    docs.push({
      id: String(book.id),
      title: book.title || "",
      slug: book.slug || "",
      description: book.description || "",
      pdf_url: book.pdf_url || "",
      pdf_text: pdfText
    });
  }

  const response = await fetch("http://localhost:8983/solr/book_specs/update?commit=true", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(docs)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Solr indexing failed: ${response.status} ${errorText}`);
  }

  const result = await response.json();
  console.log(JSON.stringify(result, null, 2));
}

indexBooksToSolr().catch(console.error);