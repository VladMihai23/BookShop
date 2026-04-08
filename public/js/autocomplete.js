document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector('input[name="q"]');
  const resultsBox = document.getElementById("autocomplete-results");

  if (!searchInput || !resultsBox) return;

  let debounceTimeout;

  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(async () => {
      const query = searchInput.value.trim();

      if (!query) {
        resultsBox.innerHTML = "";
        resultsBox.style.display = "none";
        return;
      }

      try {
        const response = await fetch(`/api/autocomplete?q=${encodeURIComponent(query)}`);
        const suggestions = await response.json();

        if (!Array.isArray(suggestions) || suggestions.length === 0) {
          resultsBox.innerHTML = "";
          resultsBox.style.display = "none";
          return;
        }

        resultsBox.innerHTML = suggestions
          .map(
            (item) => `
              <a href="/books/${item.slug}" class="list-group-item list-group-item-action">
                ${item.title}
              </a>
            `
          )
          .join("");

        resultsBox.style.display = "block";
      } catch (error) {
        console.error("Autocomplete error:", error);
        resultsBox.innerHTML = "";
        resultsBox.style.display = "none";
      }
    }, 250);
  });

  document.addEventListener("click", (event) => {
    if (!resultsBox.contains(event.target) && event.target !== searchInput) {
      resultsBox.innerHTML = "";
      resultsBox.style.display = "none";
    }
  });
});