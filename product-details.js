window.onload = function () {
    // Get product details from localStorage
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    
    if (product) {
        // If product details exist, render them
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `Price: PKR ${product.price}`;
        document.getElementById('product-category').textContent = `Category: ${product.category}`;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-image').src = product.image;
    } else {
        // If no product details, show a message
        document.getElementById('product-details-container').innerHTML = "<p>No product details found. Please go back to the products page and select a product.</p>";
    }
}

function openModal() {
    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");
    const productImage = document.getElementById("product-image");
    
    modal.style.display = "block"; // Show the modal
    modalImage.src = productImage.src; // Set the modal image source to the clicked image
}

function closeModal() {
    const modal = document.getElementById("image-modal");
    modal.style.display = "none"; // Hide the modal
}

// Close the modal when clicking the close button
document.querySelector('.close').onclick = function() {
    closeModal();
}
