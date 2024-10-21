document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("product-grid");
    const searchBar = document.getElementById("search-bar");
    const categoryFilter = document.getElementById("category-filter");
    const totalProducts =  document.getElementById("total-products");

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
      totalProducts.innerHTML = `Total products: ${products.length}`
      productGrid.innerHTML = products
        .map(
          (product) => `
              <div class="product">
                <div class="product-card" data-product-id="${product.id}">
                  <img src="${product.image}" alt="${product.name}">
                </div>
                <h2>${product.name}</h2>
                <p>Category: ${product.category}</p>
              </div>
          `
        )
        .join("");
  
      // Add click event listener to each product card
      document.querySelectorAll(".product-card").forEach(card => {
        card.addEventListener("click", () => {
          const productId = card.getAttribute("data-product-id");
          const product = products.find(p => p.id === parseInt(productId));
          
          // Save product details in localStorage
          localStorage.setItem('selectedProduct', JSON.stringify(product));
          
          // Redirect to product details page
          window.location.href = 'product-details.html';
        });
      });
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
  