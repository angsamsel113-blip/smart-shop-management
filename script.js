
function initSidebarNavigation() {
  const dashboardLink = document.getElementById('dashboard-link');
  const productsLink = document.getElementById('products-link');
  const salesLink=document.getElementById('sales-link');
  const categoriesLink = document.getElementById('categories-link');
  const inventoryLink = document.getElementById('inventory-link');
  const salesReportLink=document.getElementById('sales-report-link');
  const stockReportLink=document.getElementById('stock-report-link');
  const dashboardView = document.getElementById('dashboard-view');
  const productsView = document.getElementById('products-section');
  const salesView=document.getElementById('sales-section');
  const categoriesView = document.getElementById('categories-section');
  const inventoryView = document.getElementById('inventory-section');
  const salesReportView =document.getElementById('sales-report-section')
  const stockReportView=document.getElementById('stock-report-section');

  const navLinks = [dashboardLink, productsLink,salesLink, categoriesLink, inventoryLink, salesReportLink, stockReportLink].filter(Boolean);
  const views = [dashboardView, productsView,salesView, categoriesView, inventoryView,salesReportView,stockReportView].filter(Boolean);

  function showView(activeView, activeLink) {
    views.forEach((view) => {
      view.style.display = view === activeView ? 'block' : 'none';
    });
    //Hidde Add Product form when changing sections
    const addProductForm=document.getElementById("add-product-form");
    if(addProductForm){
      addProductForm.style.display="none";
    }

    navLinks.forEach((link) => {
      link.classList.toggle('nav-link--active', link === activeLink);
    });
  }

  if (productsLink && productsView && dashboardView) {
    productsLink.addEventListener('click', (e) => {
      e.preventDefault();
      showView(productsView, productsLink);
      updateProductTable();
    });
  }

  if (categoriesLink && categoriesView && dashboardView) {
    categoriesLink.addEventListener('click', (e) => {
      e.preventDefault();
      showView(categoriesView, categoriesLink);
    });
  }

  if (inventoryLink && inventoryView && dashboardView) {
    inventoryLink.addEventListener('click', (e) => {
      e.preventDefault();
      showView(inventoryView, inventoryLink);
    });
  }
 
  if(salesLink && salesView && dashboardView) {
   salesLink.addEventListener('click', (e) => {
    e.preventDefault();
    showView(salesView, salesLink);
   });
  }
  
  if(salesReportLink && salesReportView && dashboardView) {
    salesReportLink.addEventListener('click', (e) => {
      e.preventDefault();
      showView(salesReportView, salesReportLink);
      
    });
    
  }

  if(stockReportLink && stockReportView && dashboardView) {
    stockReportLink.addEventListener('click', (e) => {
      e.preventDefault();
      showView(stockReportView, stockReportLink);
    });
  }
      
  

  if (dashboardLink && dashboardView) {
    dashboardLink.addEventListener('click', (e) => {
      e.preventDefault();
      showView(dashboardView, dashboardLink);
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSidebarNavigation);
} else {
  initSidebarNavigation();
}

const productSearch = document.getElementById("product-search");
const productSuggestions = document.getElementById("product-suggestions");

const existingProducts = [
  {
    name: "Pepsi",
    category: "Beverages",
    price: "₹40",
    stock: 24
  },
  {
    name: "Coca Cola",
    category: "Beverages",
    price: "₹40",
    stock: 18
  }
];

document.getElementById("total-products").textContent=existingProducts.length;

if (productSearch && productSuggestions) {
  productSearch.addEventListener("input", function () {
    const searchText = this.value.trim().toLowerCase();

    productSuggestions.innerHTML = "";

    if (searchText === "") {
      return;
    }

    const matches = inventory.filter(product =>
      product.name.toLowerCase().includes(searchText)
    );

    matches.forEach(product => {
      const suggestion = document.createElement("div");

      suggestion.className = "product-suggestion-item";

      suggestion.textContent = product.name;

      suggestion.addEventListener("click", function () {
        productSearch.value = product.name;
        productSuggestions.innerHTML = "";
      });

      productSuggestions.appendChild(suggestion);
    });

    if (matches.length === 0) {
      const noResult = document.createElement("div");

      noResult.className = "product-suggestion-item";
      noResult.textContent = "No existing product found";

      productSuggestions.appendChild(noResult);
    }
  });
  
}


const addProductBtn = document.getElementById("add-product-btn");
const addProductForm = document.getElementById("add-product-form");
const cancelProductBtn = document.getElementById("cancel-product-btn");

if (addProductBtn && addProductForm) {
  addProductBtn.addEventListener("click", function () {
    addProductForm.style.display = "block";
  });
}

if (cancelProductBtn && addProductForm) {
  cancelProductBtn.addEventListener("click", function () {
    addProductForm.style.display = "none";
  });
}

const productCategory = document.getElementById("product-category");
const newProductName = document.getElementById("new-product-name");
const newProductSuggestions = document.getElementById("new-product-suggestions");

if (newProductName && productCategory && newProductSuggestions) {
  newProductName.addEventListener("input", function () {
    const searchText = this.value.trim().toLowerCase();
    const selectedCategory = productCategory.value;

    newProductSuggestions.innerHTML = "";

    if (searchText === "") {
      return;
    }

    const matches = inventory.filter(product =>
      product.category === selectedCategory &&
      product.name.toLowerCase().includes(searchText)
    );

    matches.forEach(product => {
      const suggestion = document.createElement("div");

      suggestion.className = "product-suggestion-item";
      suggestion.textContent = `${product.name} (Existing product)`;

      suggestion.addEventListener("click", function () {
        newProductName.value = product.name;

        document.getElementById("product-price").value =
          product.price || "";

        
        newProductSuggestions.innerHTML = "";
      });

      newProductSuggestions.appendChild(suggestion);
    });

    if (matches.length === 0) {
      const noResult = document.createElement("div");

      noResult.className = "product-suggestion-item";
      noResult.textContent = "No existing product found";

      newProductSuggestions.appendChild(noResult);
    }
  });
}

const saveProductBtn = document.getElementById("save-product-btn");

if (saveProductBtn && addProductForm && productCategory && newProductName && newProductSuggestions) {
  saveProductBtn.addEventListener("click", function () {
    const category = productCategory.value;
    const productName = newProductName.value.trim();
    const price = document.getElementById("product-price").value;

    if (!category || !productName || !price ) {
      alert("Please fill in all product details.");
      return;
    }

    const existingProduct = inventory.find(
      product =>
        product.name.toLowerCase() === productName.toLowerCase() &&
        product.category === category
    );

    if (existingProduct) {
      existingProduct.price = price;

      alert(`${existingProduct.name} price updated successfully!`);
    } else {
      const newProduct = {
        name: productName,
        category: category,
        price: price,
        batches:[]
      };
         
      inventory.push(newProduct);
      

      alert(`${productName} added successfully!`);
    }

    localStorage.setItem("inventory",JSON.stringify(inventory));
   
    productCategory.value = "";
    newProductName.value = "";
    document.getElementById("product-price").value = "";
   
    newProductSuggestions.innerHTML = "";

    addProductForm.style.display = "none";
    updateProductTable();
    updateInventoryTable();
    updateSalesReport();
  });
}



function updateProductTable() { 
  console.log("Products table is updating");
   const tableBody = document.getElementById("products-table-body");

  if(!tableBody) return;

  tableBody.innerHTML = "";

  document.getElementById("total-products").textContent=inventory.length;
  inventory.forEach(product => {
    const totalStock=getTotalStock(product);
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>${product.price  ? `₹${product.price}` : "Not set"}</td>
      <td>${totalStock}</td>
    `;

    tableBody.appendChild(row);
  });
}

const existingCategories = [
  { name: "Beverages", productCount: 24 },
  { name: "Snacks & Biscuits", productCount: 18 },
  { name: "Rice & Grains", productCount: 12 },
  { name: "Dairy & Eggs", productCount: 15 },
  { name: "Oils", productCount: 9 },
  { name: "Spices & Masala", productCount: 22 },
  { name: "Cleaning Products", productCount: 11 },
  { name: "Personal Care", productCount: 14 },
  { name: "Tea & Coffee", productCount: 10 },
  { name: "Packaged Foods", productCount: 16 }
];

const addCategoryBtn = document.getElementById("add-category-btn");
const addCategoryForm = document.getElementById("add-category-form");
const cancelCategoryBtn = document.getElementById("cancel-category-btn");
const saveCategoryBtn = document.getElementById("save-category-btn");
const categoryNameInput = document.getElementById("category-name");

if (addCategoryBtn && addCategoryForm) {
  addCategoryBtn.addEventListener("click", function () {
    addCategoryForm.style.display = "block";
    if (categoryNameInput) categoryNameInput.focus();
  });
}

if (cancelCategoryBtn && addCategoryForm) {
  cancelCategoryBtn.addEventListener("click", function () {
    addCategoryForm.style.display = "none";
    if (categoryNameInput) categoryNameInput.value = "";
  });
}

function updateCategoryTable() {
  const tableBody = document.getElementById("categories-table-body");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  existingCategories.forEach((category) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const countCell = document.createElement("td");

    nameCell.textContent = category.name;
    countCell.textContent = category.productCount;

    row.appendChild(nameCell);
    row.appendChild(countCell);
    tableBody.appendChild(row);
  });
}

if (saveCategoryBtn && addCategoryForm && categoryNameInput) {
  saveCategoryBtn.addEventListener("click", function () {
    const categoryName = categoryNameInput.value.trim();

    if (!categoryName) {
      alert("Please enter a category name.");
      return;
    }

    const isDuplicate = existingCategories.some(
      (category) => category.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (isDuplicate) {
      alert("This category already exists.");
      return;
    }

    existingCategories.push({
      name: categoryName,
      productCount: 0
    });

    categoryNameInput.value = "";
    addCategoryForm.style.display = "none";
    updateCategoryTable();
  });
}
const addStockBtn = document.getElementById("add-stock-btn");
const addStockForm = document.getElementById("add-stock-form");

addStockBtn.addEventListener("click", () => {
  if (addStockForm.style.display === "none") {
    addStockForm.style.display = "grid";
  } else {
    addStockForm.style.display = "none";
  }
});
const saveStockBtn = document.getElementById("save-stock-btn");
const stockProduct = document.getElementById("stock-product");
const stockQuantity = document.getElementById("stock-quantity");
const stockExpiry = document.getElementById("stock-expiry");
;
const inventory = [
  {
    name: "Pepsi",
    category: "Beverages",
    price: 40,
    batches: [
      {
        quantity: 24,
        expiry: "2026-11-12"
      }
    ]
  },
  {
    name: "Coca Cola",
    category: "Beverages",
    price: 40,
    batches: [
      {
        quantity: 18,
        expiry: "2026-11-18"
      }
    ]
  },
  {
    name: "Parle-G Biscuits",
    category: "Snacks & Biscuits",
    batches: [
      {
        quantity: 8,
        expiry: "2026-10-05"
      }
    ]
  },
  {
    name: "Amul Taaza Milk 1L",
    category: "Dairy & Eggs",
    batches: []
  },
  {
    name: "India Gate Basmati Rice 5kg",
    category: "Rice & Grains",
    batches: [
      {
        quantity: 15,
        expiry: "2027-03-20"
      }
    ]
  },
  {
    name: "Fortune Sunflower Oil 1L",
    category: "Oils",
    batches: [
      {
        quantity: 6,
        expiry: "2027-01-14"
      }
    ]
  },
  {
    name: "Maggi 2-Minute Noodles",
    category: "Packaged Foods",
    batches: [
      {
        quantity: 12,
        expiry: "2026-09-02"
      }
    ]
  },
  {
    name: "Tata Tea Gold 250g",
    category: "Tea & Coffee",
    batches: [
      {
        quantity: 4,
        expiry: "2026-07-10"
      }
    ]
  }
];
function loadStockProducts() {
  stockProduct.innerHTML=`<option value="">Select Product </option>`;
  inventory.forEach(product => {
    const option=document.createElement("option");
    option.value=product.name;
    option.textContent=product.name;
    stockProduct.appendChild(option);
  });
  
}
loadStockProducts();

const savedInventory = localStorage.getItem("inventory");

if (savedInventory) {
  inventory.length = 0;
  inventory.push(...JSON.parse(savedInventory));
}
//Add prices to product
inventory.forEach(product=> {
  if(product.name==="Pepsi") {
    product.price=40;
  }
  if(product.name==="Coca Cola") {
    product.price=40;
  }
});
localStorage.setItem("inventory",JSON.stringify(inventory));
loadStockProducts();

function getTotalStock(product) {
  return product.batches.reduce(
    (total, batch) => total + batch.quantity,
    0
  );
}
updateProductTable();

const lowStockItems=inventory.filter(product => getTotalStock(product) <= 5);
document.getElementById("low-stock-count").textContent=lowStockItems.length;
function getExpiryStatus(expiryDate) {

  if (!expiryDate) {
    return "";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);

  if (expiry < today) {
    return "expired";
  }

  const difference =
    expiry.getTime() - today.getTime();

  const daysRemaining =
    Math.ceil(difference / (1000 * 60 * 60 * 24));

  if (daysRemaining <= 30) {
    return "expiring-soon";
  }

  return "valid";
}

function getNearestExpiry(product) {
  if (product.batches.length === 0) {
    return "";
  }

  return product.batches
    .map(batch => batch.expiry)
    .sort()[0];
}
  
saveStockBtn.addEventListener("click", () => {
      
  // 1. Get values from form
  const selectedProduct = stockProduct.value;
  const quantityToAdd = Number(stockQuantity.value);
  const expiryDate = stockExpiry.value;

  // 2. Validate inputs
  if (!selectedProduct) {
    alert("Please select a product.");
    return;
  }

  if (quantityToAdd <= 0) {
    alert("Please enter a valid quantity.");
    return;
  }

  if (!expiryDate) {
    alert("Please select an expiry date.");
    return;
  }

  // 3. Find the selected product in inventory
  const inventoryProduct = inventory.find(
    product => product.name === selectedProduct
  );

 inventoryProduct.batches.push({
  quantity: quantityToAdd,
  expiry: expiryDate
});
localStorage.setItem("inventory", JSON.stringify(inventory));

  // 6. Update inventory table
  updateInventoryTable();

  // 7. Success message
  alert(`${selectedProduct} stock added successfully!`);

  // 8. Clear form
  stockProduct.value = "";
  stockQuantity.value = "";
  stockExpiry.value = "";

  // 9. Close form
  addStockForm.style.display = "none";
  

});


function updateInventoryTable() {
  const tableBody = document.getElementById("inventory-table-body");

  tableBody.innerHTML = "";

  inventory.forEach(product => {
     const totalStock = getTotalStock(product);
const nearestExpiry = getNearestExpiry(product);

const expiryStatus = getExpiryStatus(nearestExpiry);

let status = "";

if (totalStock === 0) {
  status = `<span class="badge badge--out-of-stock">Out of Stock</span>`;
} else if (expiryStatus === "expired") {
  status = `<span class="badge badge--expired">Expired</span>`;
} else if (expiryStatus === "expiring-soon") {
  status = `<span class="badge badge--expiring-soon">Expiring Soon</span>`;
} else if (totalStock <= 5) {
  status = `<span class="badge badge--low-stock">Low Stock</span>`;
} else {
  status = `<span class="badge badge--in-stock">In Stock</span>`;
}

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>${totalStock} units</td>
      <td>${status}</td>
      <td>${nearestExpiry|| "—"}</td>
      <td>
  ${
    product.batches.length > 1
      ? `<button
          type="button"
          class="btn btn--table"
          onclick="viewStockBatches('${product.name}')"
        >
          View
        </button>`
      : ""
  }
</td>
    `;

    tableBody.appendChild(row);
  });
}
updateInventoryTable();

function viewStockBatches(productName) {

  const product = inventory.find(
    item => item.name === productName
  );

  if (!product) {
    return;
  }

  const modal = document.getElementById("stock-modal");
  const modalTitle = document.getElementById("stock-modal-title");
  const batchList = document.getElementById("stock-batch-list");

  modalTitle.textContent = `${product.name} - Stock Batches`;

  batchList.innerHTML = "";

  if (product.batches.length === 0) {

    batchList.innerHTML = `
      <p>No stock batches available.</p>
    `;

  } else {

    product.batches.forEach((batch, index) => {

      const batchDiv = document.createElement("div");

      batchDiv.className = "stock-batch";

      batchDiv.innerHTML = `
        <strong>Batch ${index + 1}</strong>
        <div>Quantity: ${batch.quantity} units</div>
        <div>Expiry: ${batch.expiry}</div>
      `;

      batchList.appendChild(batchDiv);
    });
  }

  modal.style.display = "flex";
}
const closeStockModal =
  document.getElementById("close-stock-modal");

const stockModal =
  document.getElementById("stock-modal");

closeStockModal.addEventListener("click", () => {
  stockModal.style.display = "none";
});
const saleProduct = document.getElementById("sale-product");
const saleStock = document.getElementById("sale-stock");
const saleQuantity = document.getElementById("sale-quantity");
const salePrice = document.getElementById("sale-price");
const saleTotal = document.getElementById("sale-total");
function loadSaleProducts() {
  saleProduct.innerHTML = `
    <option value="">Select product</option>
  `;

  console.log("Inventory for Sales :",inventory);
  console.log("Sale Product Element :",saleProduct)

  inventory.forEach(product => {
    const option = document.createElement("option");

    option.value = product.name;
    option.textContent = product.name;

    saleProduct.appendChild(option);
  });
}
loadSaleProducts();
saleProduct.addEventListener('change',function() {
  
  const saleItem=inventory.find(product=>product.name===saleProduct.value);
  console.log("Selected sale item:",saleItem);

if(!saleItem){
  saleStock.value="";
  salePrice.value="";
  saleTotal.value="";
  return;
}
const totalStock= getTotalStock(saleItem);
saleStock.value=`${totalStock} units`;
salePrice.value=saleItem.price;
saleTotal.value="";
});
saleQuantity.addEventListener("input", function () {
  const quantity = Number(saleQuantity.value);

  const saleItem = inventory.find(
    product => product.name === saleProduct.value
  );

  if (!saleItem || quantity <= 0) {
    saleTotal.value = "";
    return;
  }

  const totalAmount = quantity * saleItem.price;

  saleTotal.value = `₹${totalAmount}`;
});
const saveSaleBtn = document.getElementById("save-sale-btn");

saveSaleBtn.addEventListener("click", () => {

  const selectedProduct = saleProduct.value;
  const quantity = Number(saleQuantity.value);
  const customerName = document.getElementById("customer-name").value.trim();
  const paymentMethodSelect = document.getElementById("payment-method");
  const paymentMethod=paymentMethodSelect.value;

  if (!selectedProduct) {
    alert("Please select a product.");
    return;
  }

  if (quantity <= 0) {
    alert("Please enter a valid quantity.");
    return;
  }

  if(!paymentMethod){
    alert("please select a payment method.");
    return;
  }

  const product = inventory.find(
    item => item.name === selectedProduct
  );

  if (!product) {
    alert("Product not found.");
    return;
  }

  const availableStock = getTotalStock(product);

  if (quantity > availableStock) {
    alert("Not enough stock available.");
    return;
  }

  // Reduce stock
  let remainingQuantity = quantity;

  for (let i = 0; i < product.batches.length; i++) {

    if (remainingQuantity <= 0) {
      break;
    }

    const batch = product.batches[i];

    if (batch.quantity <= remainingQuantity) {
      remainingQuantity -= batch.quantity;
      batch.quantity = 0;
    } else {
      batch.quantity -= remainingQuantity;
      remainingQuantity = 0;
    }
  }

  // Save updated inventory
  localStorage.setItem(
    "inventory",
    JSON.stringify(inventory)
  );

  // Update Inventory table
  updateInventoryTable();

  

  const sales = JSON.parse(localStorage.getItem("sales")) || [];

  
 
const sale = {
  invoiceId: "INV-" + Date.now(),
  date: new Date().toLocaleDateString(),
  customerName: customerName || "Walk-in-Customer",
  items: `${selectedProduct} × ${quantity}`,
  totalAmount: quantity * product.price,
  payment: paymentMethod
};

sales.push(sale);


localStorage.setItem("sales", JSON.stringify(sales));
document.getElementById("total-sales").textContent=sales.length;
  document.getElementById("total-revenue").textContent=sales.reduce( (totalRevenue,sale) => totalRevenue + sale.totalAmount,0);

  updateSalesReport();

  alert(`${selectedProduct} sale completed successfully!`);
});

function updateSalesReport() {
  const tableBody = document.getElementById("sales-report-table-body");

    if(!tableBody){
      return;
    }
    
    
  const sales = JSON.parse(localStorage.getItem("sales")) || [];
  
  document.getElementById("total-sales").textContent=sales.length;
  document.getElementById("total-revenue").textContent=sales.reduce( (totalRevenue,sale) => totalRevenue + sale.totalAmount,0);

  tableBody.innerHTML = "";

  sales.forEach(sale => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${sale.invoiceId}</td>
      <td>${sale.date}</td>
      <td>${sale.customerName}</td>
      <td>${sale.items}</td>
      <td>₹${sale.totalAmount}</td>
      <td>${sale.payment}</td>
    `;

    tableBody.appendChild(row);
  });
  
}

updateSalesReport();



function updateStockReport() {
  const tableBody = document.getElementById("stock-report-table-body");

  if (!tableBody) {
    return;
  }

  tableBody.innerHTML = "";

  inventory.forEach(product => {
    const totalStock = getTotalStock(product);
    const nearestExpiry = getNearestExpiry(product);

    let status = "";

    if (totalStock === 0) {
      status = `<span class="badge badge--out-of-stock">Out of Stock</span>`;
    } else if (totalStock <= 5) {
      status = `<span class="badge badge--low-stock">Low Stock</span>`;
    } else {
      status = `<span class="badge badge--in-stock">In Stock</span>`;
    }

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>${totalStock} units</td>
      <td>${status}</td>
      <td>${nearestExpiry || "—"}</td>
    `;

    tableBody.appendChild(row);
  });
}
updateStockReport();

const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", darkModeToggle.checked);
});
