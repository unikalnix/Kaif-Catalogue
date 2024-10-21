document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid");
  const searchBar = document.getElementById("search-bar");
  const categoryFilter = document.getElementById("category-filter");
  let products = [];

  // Fetch products from JSON file
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      displayProducts(products);
      populateCategoryFilter(products);
    });

  // Display products
  function displayProducts(products) {
    productGrid.innerHTML = products
      .map(
        (product) => `
            
                <div class="product">
                  <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                  </div>
                    <h2>${product.name}</h2>
                    <p>Price: $${product.price}</p>
                    <p>Category: ${product.category}</p>
                </div>
          
        `
      )
      .join("");
  }

  // Search functionality
  searchBar.addEventListener("input", () => {
    const searchQuery = searchBar.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery)
    );
    displayProducts(filteredProducts);
  });

  // Category filter functionality
  categoryFilter.addEventListener("change", () => {
    const selectedCategory = categoryFilter.value;
    const filteredProducts =
      selectedCategory === "all"
        ? products
        : products.filter((product) => product.category === selectedCategory);
    displayProducts(filteredProducts);
  });

  // Populate category filter dynamically
  function populateCategoryFilter(products) {
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];
    categoryFilter.innerHTML += categories
      .map((category) => `<option value="${category}">${category}</option>`)
      .join("");
  }
});
