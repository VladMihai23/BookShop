function tokenize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function computeBM25(books, query) {
  const k1 = 1.5;
  const b = 0.75;

  const queryTerms = tokenize(query);
  if (!queryTerms.length) return books;

  const docs = books.map(book => {
    const tokens = tokenize(book.title);
    return {
      book,
      tokens,
      length: tokens.length
    };
  });

  const N = docs.length;
  const avgdl = docs.reduce((sum, doc) => sum + doc.length, 0) / (N || 1);

  const uniqueQueryTerms = [...new Set(queryTerms)];
  const documentFrequency = {};

  for (const term of uniqueQueryTerms) {
    documentFrequency[term] = docs.reduce((count, doc) => {
      return count + (doc.tokens.includes(term) ? 1 : 0);
    }, 0);
  }

  const scoredDocs = docs.map(doc => {
    let score = 0;

    for (const term of queryTerms) {
      const tf = doc.tokens.filter(token => token === term).length;
      if (tf === 0) continue;

      const df = documentFrequency[term] || 0;
      const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5));

      const numerator = tf * (k1 + 1);
      const denominator = tf + k1 * (1 - b + b * (doc.length / (avgdl || 1)));

      score += idf * (numerator / denominator);
    }

    return {
      book: doc.book,
      score
    };
  });

  return scoredDocs
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.book);
}

module.exports = computeBM25;