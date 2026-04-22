class SpecSearchController {
  async form(req, res) {
    res.render("spec-search");
  }

  async results(req, res) {
    try {
      const query = (req.query.q || "").trim();
      const selectedSort = req.query.sort === "asc" ? "asc" : "desc";
      const sort = selectedSort === "asc" ? "score asc" : "score desc";

      if (!query) {
        return res.render("spec-search-results", {
          query,
          selectedSort,
          results: []
        });
      }

      const solrUrl =
        `http://localhost:8983/solr/book_specs/select?` +
        `q=${encodeURIComponent(`pdf_text:${query}`)}` +
        `&fl=id,title,slug,pdf_url,score,[explain]` +
        `&sort=${encodeURIComponent(sort)}` +
        `&wt=json`;

      const response = await fetch(solrUrl);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Solr search failed: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      const docs = data.response?.docs || [];

      const results = docs.map((doc) => ({
        id: Array.isArray(doc.id) ? doc.id[0] : doc.id,
        title: Array.isArray(doc.title) ? doc.title[0] : doc.title,
        slug: Array.isArray(doc.slug) ? doc.slug[0] : doc.slug,
        pdf_url: Array.isArray(doc.pdf_url) ? doc.pdf_url[0] : doc.pdf_url,
        score: doc.score,
        explain: Array.isArray(doc["[explain]"])
          ? doc["[explain]"][0]
          : doc["[explain]"] || "No explanation available."
      }));

      res.render("spec-search-results", {
        query,
        selectedSort,
        results
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error searching specifications.");
    }
  }
}

module.exports = new SpecSearchController();