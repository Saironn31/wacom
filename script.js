const productData = {
  professional: [
    {
      id: 1,
      title: "Wacom Cintiq Pro 27",
      price: "₱215,000",
      rating: 5,
      img: "public/pro/wacom%20cintiq%20pro%2027.webp"
    },
    {
      id: 2,
      title: "Wacom Cintiq 16",
      price: "₱115,000",
      rating: 5,
      img: "public/pro/wacom%20cintiq%2016%20.webp"
    },
    {
      id: 3,
      title: "Wacom MobileStudio Pro 16",
      price: "₱230,000",
      rating: 5,
      img: "public/pro/wacom%20mobile%20studio%20pro%2016.webp"
    },
    {
      id: 4,
      title: "Wacom Intuos Pro Large",
      price: "₱31,000",
      rating: 5,
      img: "public/pro/wacom%20intuos%20pro%20large.webp"
    },
    {
      id: 5,
      title: "Wacom Intuos Pro Medium",
      price: "₱23,000",
      rating: 4,
      img: "public/pro/wacom%20intuos%20pro%20medium.webp"
    },
    {
      id: 6,
      title: "Wacom Cintiq 22",
      price: "₱46,500",
      rating: 4,
      img: "public/pro/wacom%20cintiq%2022.webp"
    }
  ],
  beginner: [
    {
      id: 7,
      title: "Wacom One 13 Touch",
      price: "₱31,000",
      rating: 5,
      img: "public/noob/wacom%20one%2013%20touch.webp"
    },
    {
      id: 8,
      title: "Wacom One 12 Pen Display",
      price: "₱22,295",
      rating: 4,
      img: "public/noob/wacom%20one%2012%20pen%20display.webp"
    },
    {
      id: 9,
      title: "Wacom Intuos Medium (Bluetooth)",
      price: "₱8,000",
      rating: 5,
      img: "public/noob/wacom%20intuous%20medium%20bluetooth.webp"
    },
    {
      id: 10,
      title: "One by Wacom Medium",
      price: "₱4,900",
      rating: 4,
      img: "public/noob/one%20by%20wacom%20medium.webp"
    },
    {
      id: 11,
      title: "Wacom Intuos Small",
      price: "₱2,500",
      rating: 4,
      img: "public/noob/wacom%20intuous%20small.webp"
    },
    {
      id: 12,
      title: "One by Wacom Small",
      price: "₱3,300",
      rating: 4,
      img: "public/noob/one%20by%20wacom%20small.webp"
    }
  ],
  styluses: [
    {
      id: 13,
      title: "Wacom Pro Pen 3",
      price: "₱8,000",
      rating: 5,
      img: "public/stylus/wacom%20pro%20pen%203.webp"
    },
    {
      id: 14,
      title: "Wacom Pro Pen 2",
      price: "₱5,900",
      rating: 5,
      img: "public/stylus/wacom%20pro%20pen%202.webp"
    },
    {
      id: 15,
      title: "Wacom Pro Pen Slim",
      price: "₱5,000",
      rating: 4,
      img: "public/stylus/wacom%20pro%20pen%20slim.webp"
    },
    {
      id: 16,
      title: "Wacom One Standard Pen",
      price: "₱2,150",
      rating: 4,
      img: "public/stylus/wacom%20one%20standard%20pen.png"
    },
    {
      id: 17,
      title: "Wacom Bamboo Ink Plus",
      price: "₱6,650",
      rating: 4,
      img: "public/stylus/wacom%20bamboo%20ink%20plus.webp"
    },
    {
      id: 18,
      title: "Wacom Finetip Pen",
      price: "₱6,150",
      rating: 4,
      img: "public/stylus/wacom%20finetip%20pen.webp"
    }
  ]
};

const tabs = document.querySelectorAll(".category-card");
const productGrid = document.getElementById("product-grid");
const productSection = document.getElementById("product-section");
const productTitle = document.querySelector("[data-product-title]");
const searchForms = document.querySelectorAll(".search");
const searchInputs = document.querySelectorAll(".search-input");
const priceMinInput = document.querySelector("[data-price-min]");
const priceMaxInput = document.querySelector("[data-price-max]");
const ratingOptions = document.querySelectorAll("[data-rating-value]");
const clearFiltersButton = document.querySelector("[data-filter-clear]");
const filterStatus = document.querySelector("[data-filter-status]");

const categoryLabels = {
  professional: "Professional Tablets",
  beginner: "Beginner Friendly Tablets",
  styluses: "Smart Styluses",
  all: "All Products"
};

const buildStars = (rating) => "\u2605".repeat(rating) + "\u2606".repeat(5 - rating);

const parsePrice = (price) => Number(price.replace(/[^\d]/g, ""));
const normalizeSearch = (value) => value.trim().toLowerCase();
const parseFilterNumber = (value) => {
  if (value === "") {
    return null;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const getAllProducts = () => Object.values(productData).flat();

const getProductsForCategory = (category) => {
  if (category === "all") {
    return getAllProducts();
  }

  return productData[category] || [];
};

const clearActiveTabs = () => {
  tabs.forEach((item) => item.classList.remove("active"));
};

const renderProducts = (products) => {
  if (!productGrid) {
    return;
  }

  productGrid.innerHTML = "";

  if (!products || products.length === 0) {
    productGrid.classList.add("is-empty");
    const empty = document.createElement("p");
    empty.className = "product-empty";
    empty.textContent = "No products match your filters.";
    productGrid.appendChild(empty);
    return;
  }

  productGrid.classList.remove("is-empty");
  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image">
        <img src="${product.img}" alt="${product.title}" />
      </div>
      <div class="product-row">
        <span>${product.title}</span>
        <span>${product.price}</span>
      </div>
      <div class="product-rating" aria-label="${product.rating} star rating">
        ${buildStars(product.rating)}
      </div>
    `;

    productGrid.appendChild(card);
  });
};

const updateFilterStatus = (shown, total) => {
  if (!filterStatus) {
    return;
  }

  if (total === 0) {
    filterStatus.textContent = "0 products";
    return;
  }

  filterStatus.textContent =
    shown === total ? `${total} products` : `${shown} of ${total} products`;
};

let activeCategory = "professional";
let activeSearch = "";
let activeMinPrice = "";
let activeMaxPrice = "";
let activeMinRating = "";

const setActiveTab = (tab) => {
  clearActiveTabs();
  tab.classList.add("active");
};

const setActiveTabByCategory = (category) => {
  clearActiveTabs();
  const match = Array.from(tabs).find(
    (tab) => tab.getAttribute("data-category") === category
  );

  if (match) {
    match.classList.add("active");
  }
};

const setSectionTitle = (category) => {
  if (!productTitle) {
    return;
  }

  const label = categoryLabels[category];
  productTitle.textContent = label
    ? `Featured Products - ${label}`
    : "Featured Products";
};

const getInitialCategory = () => {
  const params = new URLSearchParams(window.location.search);
  const selected = params.get("category");

  if (selected === "all") {
    return "all";
  }

  return productData[selected] ? selected : "professional";
};

const getInitialFilters = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    search: params.get("search") || "",
    min: params.get("min") || "",
    max: params.get("max") || "",
    rating: params.get("rating") || ""
  };
};

const syncSearchInputs = (value) => {
  searchInputs.forEach((input) => {
    if (input.value !== value) {
      input.value = value;
    }
  });
};

const syncRatingOptions = () => {
  if (ratingOptions.length === 0) {
    return;
  }

  ratingOptions.forEach((option) => {
    const value = option.getAttribute("data-rating-value") || "";
    const isActive = value === activeMinRating;
    option.classList.toggle("is-active", isActive);
    option.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
};

const updateUrlParams = () => {
  if (!productSection) {
    return;
  }

  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set("category", activeCategory);

  const trimmedSearch = activeSearch.trim();
  if (trimmedSearch) {
    nextUrl.searchParams.set("search", trimmedSearch);
  } else {
    nextUrl.searchParams.delete("search");
  }

  if (activeMinPrice) {
    nextUrl.searchParams.set("min", activeMinPrice);
  } else {
    nextUrl.searchParams.delete("min");
  }

  if (activeMaxPrice) {
    nextUrl.searchParams.set("max", activeMaxPrice);
  } else {
    nextUrl.searchParams.delete("max");
  }

  if (activeMinRating) {
    nextUrl.searchParams.set("rating", activeMinRating);
  } else {
    nextUrl.searchParams.delete("rating");
  }

  history.replaceState(null, "", nextUrl);
};

const filterProducts = (products) => {
  const term = normalizeSearch(activeSearch);
  const min = parseFilterNumber(activeMinPrice);
  const max = parseFilterNumber(activeMaxPrice);
  const rating = parseFilterNumber(activeMinRating);

  return products.filter((product) => {
    const matchesSearch = term
      ? product.title.toLowerCase().includes(term)
      : true;
    const priceValue = parsePrice(product.price);
    const matchesMin = min !== null ? priceValue >= min : true;
    const matchesMax = max !== null ? priceValue <= max : true;
    const matchesRating = rating !== null ? product.rating >= rating : true;
    return matchesSearch && matchesMin && matchesMax && matchesRating;
  });
};

const updateClearFiltersVisibility = () => {
  if (!clearFiltersButton) {
    return;
  }

  const hasFilters = Boolean(
    activeSearch.trim() || activeMinPrice || activeMaxPrice || activeMinRating
  );
  clearFiltersButton.classList.toggle("is-hidden", !hasFilters);
};

const applyFilters = () => {
  if (!productGrid) {
    return;
  }

  const baseProducts = getProductsForCategory(activeCategory);
  const filteredProducts = filterProducts(baseProducts);

  renderProducts(filteredProducts);
  updateFilterStatus(filteredProducts.length, baseProducts.length);
  updateClearFiltersVisibility();
};

const setSearchTerm = (value) => {
  activeSearch = value.trim();
  syncSearchInputs(activeSearch);
  applyFilters();
  updateUrlParams();
};

const handlePriceInput = () => {
  activeMinPrice = priceMinInput ? priceMinInput.value : "";
  activeMaxPrice = priceMaxInput ? priceMaxInput.value : "";
  applyFilters();
  updateUrlParams();
};

const handleRatingSelection = (value) => {
  activeMinRating = value;
  syncRatingOptions();
  applyFilters();
  updateUrlParams();
};

const clearFilters = () => {
  activeSearch = "";
  activeMinPrice = "";
  activeMaxPrice = "";
  activeMinRating = "";
  syncSearchInputs("");

  if (priceMinInput) {
    priceMinInput.value = "";
  }

  if (priceMaxInput) {
    priceMaxInput.value = "";
  }

  syncRatingOptions();

  applyFilters();
  updateUrlParams();
};

const initSearchForms = () => {
  searchForms.forEach((form) => {
    const input = form.querySelector(".search-input");
    if (!input) {
      return;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const term = input.value.trim();

      if (!productGrid) {
        const nextUrl = new URL("products.html", window.location.href);
        if (term) {
          nextUrl.searchParams.set("search", term);
          nextUrl.searchParams.set("category", "all");
        }
        window.location.href = nextUrl.toString();
        return;
      }

      setSearchTerm(term);
    });

    if (productGrid) {
      input.addEventListener("input", (event) => {
        setSearchTerm(event.target.value);
      });
    }
  });
};

const initProductPage = () => {
  if (!productGrid || !productSection || tabs.length === 0) {
    return;
  }

  activeCategory = getInitialCategory();
  const initialFilters = getInitialFilters();
  activeSearch = initialFilters.search;
  activeMinPrice = initialFilters.min;
  activeMaxPrice = initialFilters.max;
  activeMinRating = initialFilters.rating;

  setActiveTabByCategory(activeCategory);
  setSectionTitle(activeCategory);
  syncSearchInputs(activeSearch);

  if (priceMinInput) {
    priceMinInput.value = activeMinPrice;
    priceMinInput.addEventListener("input", handlePriceInput);
  }

  if (priceMaxInput) {
    priceMaxInput.value = activeMaxPrice;
    priceMaxInput.addEventListener("input", handlePriceInput);
  }

  ratingOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.getAttribute("data-rating-value") || "";
      handleRatingSelection(value);
    });
  });

  if (clearFiltersButton) {
    clearFiltersButton.addEventListener("click", clearFilters);
  }

  syncRatingOptions();

  applyFilters();

  tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      const category = tab.getAttribute("data-category");

      if (!productData[category]) {
        return;
      }

      activeCategory = category;
      setActiveTab(tab);
      setSectionTitle(category);
      applyFilters();
      productSection.scrollIntoView({ behavior: "smooth" });
      updateUrlParams();
    });
  });
};

initProductPage();
initSearchForms();
