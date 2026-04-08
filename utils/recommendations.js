function tokenize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function buildDocument(book) {
  return `${book.title || ""} ${book.genre || ""} ${book.description || ""}`;
}

function computeTermFrequency(tokens) {
  const tf = {};
  const total = tokens.length || 1;

  for (const token of tokens) {
    tf[token] = (tf[token] || 0) + 1;
  }

  for (const term in tf) {
    tf[term] = tf[term] / total;
  }

  return tf;
}

function computeInverseDocumentFrequency(docsTokens) {
  const idf = {};
  const N = docsTokens.length;

  const vocabulary = new Set();
  docsTokens.forEach(tokens => {
    tokens.forEach(token => vocabulary.add(token));
  });

  for (const term of vocabulary) {
    let df = 0;

    for (const tokens of docsTokens) {
      if (tokens.includes(term)) {
        df++;
      }
    }

    idf[term] = Math.log(N / (1 + df)) + 1;
  }

  return idf;
}

function computeTfIdfVector(tokens, idf) {
  const tf = computeTermFrequency(tokens);
  const vector = {};

  for (const term in tf) {
    vector[term] = tf[term] * (idf[term] || 0);
  }

  return vector;
}

function cosineSimilarity(vecA, vecB) {
  const allTerms = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (const term of allTerms) {
    const a = vecA[term] || 0;
    const b = vecB[term] || 0;

    dotProduct += a * b;
    normA += a * a;
    normB += b * b;
  }

  if (normA === 0 || normB === 0) return 0;

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

function getSimilarBooks(targetBook, allBooks, limit = 3) {
  const books = allBooks.filter(book => book.id !== targetBook.id);

  const allDocuments = [targetBook, ...books].map(buildDocument);
  const allTokens = allDocuments.map(tokenize);
  const idf = computeInverseDocumentFrequency(allTokens);

  const targetVector = computeTfIdfVector(tokenize(buildDocument(targetBook)), idf);

  const scoredBooks = books.map(book => {
    const bookVector = computeTfIdfVector(tokenize(buildDocument(book)), idf);
    const score = cosineSimilarity(targetVector, bookVector);

    return {
      book,
      score
    };
  });

  return scoredBooks
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.book);
}

module.exports = getSimilarBooks;