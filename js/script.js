// open desktop menu when hover

const desktop_menu = document.querySelectorAll(".desktop_menu");
const menuItems = ["CATEGORIES", "MEN'S", "WOMEN'S", "JEWELRY", "PERFUME"];
let activeItemIndex = null;

menuItems.forEach((item, index) => {
  let menuItem = desktop_menu[0].children[index + 1];

  menuItem.addEventListener("mouseover", () => {
    handleHover(index + 1, "mouseover");
  });

  menuItem.children[1].addEventListener("mouseleave", () => {
    handleHover(index + 1, "mouseleave");
  });
});

function handleHover(index, event) {
  if (
    event === "mouseover" &&
    activeItemIndex !== null &&
    activeItemIndex !== index
  ) {
    resetActiveItem();
  }

  const menuItem = desktop_menu[0].children[index];
  switch (event) {
    case "mouseover":
      menuItem.children[0].classList.add("hover:text-red-400");
      menuItem.children[1].classList.remove("hidden");
      menuItem.children[1].classList.add("flex");
      activeItemIndex = index;
      break;
    case "mouseleave":
      menuItem.children[0].classList.remove("hover:text-red-400");
      menuItem.children[1].classList.remove("flex");
      menuItem.children[1].classList.add("hidden");
      break;
    default:
      break;
  }
}

function resetActiveItem() {
  if (activeItemIndex !== null) {
    const activeMenuItem = desktop_menu[0].children[activeItemIndex];
    activeMenuItem.children[0].classList.remove("hover:text-red-400");
    activeMenuItem.children[1].classList.remove("flex");
    activeMenuItem.children[1].classList.add("hidden");
  }
}

// toggle mobile & tab menu section
let mobileCategories = document.querySelectorAll(".mobile_tab_categories");
let mobileNavBtn = document.querySelectorAll(".mobile_tab_nav");
let mobileCategoriesIsOpen = false;

let mobileCategoryDiv = () => {
  if (!mobileCategoriesIsOpen) {
    mobileCategories[0].classList.remove("hidden");
    mobileCategories[0].classList.add("block");
    mobileCategoriesIsOpen = true;
  } else {
    mobileCategories[0].classList.remove("block");
    mobileCategories[0].classList.add("hidden");
    mobileCategoriesIsOpen = false;
  }
};

mobileNavBtn[0].children[4].children[0].addEventListener("click", () => {
  if (mobileMenuIsOpen) mobileMenuDiv();
  mobileCategoryDiv();
});
mobileCategories[0].children[0].children[0].children[1].addEventListener(
  "click",
  mobileCategoryDiv
);

// toggle mobile and tablet categories section
let mobileMenu = document.querySelectorAll(".mobile_tab_menu");
let mobileMenuIsOpen = false;

let mobileMenuDiv = () => {
  if (!mobileMenuIsOpen) {
    mobileMenu[0].classList.remove("hidden");
    mobileMenu[0].classList.add("block");
    mobileMenuIsOpen = true;
  } else {
    mobileMenu[0].classList.remove("block");
    mobileMenu[0].classList.add("hidden");
    mobileMenuIsOpen = false;
  }
};

mobileNavBtn[0].children[0].children[0].addEventListener("click", () => {
  if (mobileCategoriesIsOpen) mobileCategoryDiv();
  mobileMenuDiv();
});
mobileMenu[0].children[0].children[0].children[1].addEventListener(
  "click",
  mobileMenuDiv
);

// toggle mobile menu components
let mobileMenuItem = (idx) =>
  mobileMenu[0].children[0].children[1].children[idx].children[1];
const mobileMenuItems = [
  "Men's",
  "Women's",
  "Jewelry",
  "Perfume",
  "Blog",
  "Hot offers",
  "Language",
  "Currency",
];

mobileMenuItems.forEach((item, idx) => {
  if (idx === 4 || idx === 5) return;
  mobileMenu[0].children[0].children[1].children[
    idx + 1
  ].children[0].children[1].addEventListener("click", () => {
    let menuItem = mobileMenuItem(idx + 1);
    menuItem.classList.toggle("hidden");
  });
});

// toggle mobile categories components
const mobileCategoriesItems = [
  "Clothes",
  "Footwear",
  "Jewelry",
  "Perfume",
  "Cosmetics",
  "Glasses",
  "Bags",
];

mobileCategoriesItems.forEach((item, idx) => {
  mobileCategories[0].children[0].children[1].children[
    idx
  ].children[0].children[1].addEventListener("click", () => {
    let mobileCategoryItem =
      mobileCategories[0].children[0].children[1].children[idx].children[1];
    mobileCategoryItem.classList.toggle("hidden");
  });
});

// toggle cart
let desktopCartBtn = document.querySelector(".dektop_cart");
let mobileCartBtn = document.querySelector(".mobile_cart");
let productsDiv = document.querySelector(".products");
let closeCartBtn = document.querySelector(".close_cart_btn");
let cartDiv = document.querySelector(".cart");

let openCart = () => {
  if (cartDiv.classList.contains("hidden")) {
    cartDiv.classList.remove("hidden");
    productsDiv.classList.add("hidden");
  }
};

let closeCart = () => {
  if (!cartDiv.classList.contains("hidden")) {
    cartDiv.classList.add("hidden");
    productsDiv.classList.remove("hidden");
  }
};

[desktopCartBtn, mobileCartBtn].forEach((btn) =>
  btn.addEventListener("click", openCart)
);
closeCartBtn.addEventListener("click", closeCart);

// Fetch All products
let fetchProducts = async () => {
  try {
    let response = await fetch("https://dummyjson.com/products");
    let data = await response.json();
    return data.products;
  } catch (error) {
    console.log("Error while fetching products: " + error);
  }
};

// Product template
function productTemplate(img, title, price, discount, rating, category) {
  let discountedPrice = (price - price * (discount / 100)).toFixed(2);
  return `
    <div class="relative">
        <img src="${img}" alt="${title}" class="object-cover w-full h-40">                     
    </div>
    <div class="w-full mt-2">
        <span class="text-red-400 text-xs">${category.toUpperCase()}</span>
        <h2 class="text-gray-400 truncate text-sm">${title}</h2>
        <div class="text-orange-400 text-[14px] mb-1">
            <strong class="text-gray-400">Rating: </strong><span>${rating}</span>
        </div>
        <span class="text-red-400 text-md font-bold">&#36;${discountedPrice} <del class="font-normal text-sm ml-2 text-gray-400">&#36;${price}</del></span>
        <div class="add_to_cart mt-1 cursor-pointer px-2 py-1 rounded-md text-sm bg-red-500 hover:bg-gray-700 text-white w-fit">
          <button>Add to Cart</button>
          <i class="ml-1 bi bi-cart3"></i>
        </div>
    </div>
  `;
}

// Show all products on Homepage
(async function showAllProducts() {
  let productsList = await fetchProducts();
  let productsDisplay = document.querySelector("#products_container");

  productsList.forEach((product) => {
    let productCard = document.createElement("div");
    productCard.setAttribute("id", product.id);
    productCard.classList.add(
      "w-52",
      "h-full",
      "rounded-lg",
      "border-2",
      "p-2"
    );
    productCard.innerHTML = productTemplate(
      product.images[0],
      product.title,
      product.price,
      product.discountPercentage,
      product.rating,
      product.category
    );
    productsDisplay.appendChild(productCard);
  });

  // Add event listeners to "Add to Cart" buttons
  let addToCartBtns = document.querySelectorAll(".add_to_cart");
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let productId = btn.closest("div[id]").getAttribute("id");
      addToCart(productId);
    });
  });
})();

// Fetch single product by ID
let fetchSingleProduct = async (id) => {
  try {
    let response = await fetch(`https://dummyjson.com/products/${id}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log("Error while fetching single product: " + error);
  }
};

// Template for cart items
function cartItemTemplate(product) {
  let discountedPrice = (
    product.price -
    product.price * (product.discountPercentage / 100)
  ).toFixed(2);
  return `
  <div class="mr-2 sm:w-36 w-full">
    <img class="m-auto w-36 sm:w-36" src=${product.thumbnail} alt=${product.title}>
    <div class="flex flex-row justify-center items-center gap-4 pb-1 sm:pb-0">
        <button id="decrease" class="border-[1px] bg-gray-300 rounded-full px-1"><i class="bi bi-dash"></i></button>
        <span id="quantity" class="text-sm">${product.quantity}</span>
        <button id="increase" class="border-[1px] bg-gray-300 rounded-full px-1"><i class="bi bi-plus"></i></button>
    </div>
  </div>
  <div class='w-full px-2'>
    <h2 id="title" class="truncate">${product.title}</h2>
    <p id="category" class="text-[14px] text-gray-400">${product.category}</p>
    <p class="text-[13px]">
        <span>Rating: </span>
        <span id="rating">${product.rating}</span>
    </p>
    <div>
        <strong class="text-red-500" id="price">&#36;${discountedPrice}</strong>
        <del class="text-gray-400 text-[14px] ml-1" id="discount">&#36;${product.price}</del>
    </div>
    <div class="text-[14px] text-white pt-1">
        <button class="px-2 py-1 rounded-md bg-slate-500" id="remove_item">Remove</button>
        <button class="px-2 py-1 rounded-md bg-orange-500 float-end" id="place_order">Place Order</button>
    </div>
  </div>
  `;
}

// Payment template
let paymentTemplate = () => {
  return `
      <h1 class="pb-1 border-b-[1px] px-1">Price Details</h1>
      <div class="p-2 text-[14px] flex flex-col gap-4">
        <div>
          <span>
            Price <span id="item_count">(0 items)</span>
          </span>
          <span class="float-end" id="item_price">&#36;0.00</span>
        </div>
        <div>
          <span>Delivery Charges</span>
          <span class="float-end" id="delivery_charges">&#36;40.00</span>
        </div>
        <div class="border-t-[1px] py-2">
          <span>Amount Payable</span>
          <span class="float-end" id="payable_amount">&#36;40.00</span>
        </div>
      </div>
  `;
};

// empty cart template
let emptyCartTemplate = () => {
  let node = document.createElement("div");
  node.classList.add(
    "empty",
    "text-xl",
    "sm:text-5xl",
    "flex",
    "flex-col",
    "border-2",
    "rounded-xl",
    "border-black",
    "bg-red-300",
    "justify-center",
    "items-center",
    "w-full",
    "py-4"
  );
  node.innerHTML = `
    <i class="bi bi-cart-x-fill text-5xl sm:text-7xl mb-2"></i>
    <h2>Your cart is empty</h2>
  `;
  return node;
};

let cartBody = document.querySelector(".cart_body");

// Global cart array
let cart = [];

// Change cart icon color
let changeCartIconColor = (productId, added) => {
  let productCard = document.querySelector(`div[id="${productId}"]`);

  if (!productCard) {
    console.error(`No element found with id :  ${productId}`);
    return;
  }

  let cartDiv = productCard.querySelector(".add_to_cart");
  let cartIcon = productCard.querySelector(".bi");

  if (added) {
    cartDiv.classList.remove("bg-red-500");
    cartDiv.classList.add("bg-sky-400");
    cartIcon.classList.remove("bi-cart3");
    cartIcon.classList.add("bi-cart-fill", "text-red-700");
  } else {
    cartDiv.classList.add("bg-red-500");
    cartDiv.classList.remove("bg-sky-400");
    cartIcon.classList.add("bi-cart3");
    cartIcon.classList.remove("bi-cart-fill", "text-red-700");
  }
};



// Function to add item to cart
let addToCart = async (productId) => {
  let product = await fetchSingleProduct(productId);

  let cartProduct = cart.find((item) => item.id === product.id);
  if (cartProduct) {
    cartProduct.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  changeCartIconColor(productId, true);
  showCart();
  updateCartCount();
};

// Function to remove item from cart
let removeFromCart = (productId) => {
  cart = cart.filter((item) => item.id !== productId);
  changeCartIconColor(productId, false);
  showCart();
  updateCartCount();
};

// Function to update the payment details
let updatePaymentDetails = () => {
  let itemCount = 0;
  let itemPrice = 0;

  cart.forEach((product) => {
    itemCount += product.quantity;
    let discountedPrice = (
      product.price -
      product.price * (product.discountPercentage / 100)
    ).toFixed(2);
    itemPrice += discountedPrice * product.quantity;
  });

  let deliveryCharges = itemCount > 0 ? 2 : 0;
  let payableAmount = itemPrice + deliveryCharges;

  document.getElementById("item_count").innerText = `(${itemCount} ${
    itemCount > 1 ? "items" : "item"
  })`;
  document.getElementById("item_price").innerText = `$${itemPrice.toFixed(2)}`;
  document.getElementById("delivery_charges").innerText =
    deliveryCharges > 0 ? "$2" : "Free";
  document.getElementById(
    "payable_amount"
  ).innerText = `$${payableAmount.toFixed(2)}`;
};

// Update cart quantity
let desktopCartCount = document.querySelector(".desktop_cart_count");
let mobileCartCount = document.querySelector(".mobile_cart_count");
function updateCartCount() {
  let cartArrayLength = cart.length;
  if (cartArrayLength > 0) {
    desktopCartCount.innerText = cartArrayLength.toString();
    mobileCartCount.innerText = cartArrayLength.toString();
  } else {
    desktopCartCount.innerText = "0";
    mobileCartCount.innerText = "0";
  }
}
updateCartCount();

// show cart
let showCart = () => {
  let cartItemsDiv = document.querySelector(".cart_products");
  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.appendChild(emptyCartTemplate());
  } else {
    cart.forEach((product) => {
      let cartItem = document.createElement("div");
      cartItem.classList.add(
        "border-[1px]",
        "flex",
        "flex-col",
        "sm:flex-row",
        "shadow-sm",
        "py-2",
        "rounded-sm",
        "px-1",
        "sm:px-0"
      );
      cartItem.innerHTML = cartItemTemplate(product);
      cartItemsDiv.appendChild(cartItem);

      // Add functionality to increase/decrease quantity
      cartItem.querySelector("#increase").addEventListener("click", () => {
        product.quantity += 1;
        showCart();
      });

      cartItem.querySelector("#decrease").addEventListener("click", () => {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          removeFromCart(product.id);
        }
        showCart();
      });

      // Add remove button functionality
      cartItem.querySelector("#remove_item").addEventListener("click", () => {
        removeFromCart(product.id);
      });
    });
  }

  // Add or update the payment details section
  let paymentDiv = document.querySelector(".payment");
  if (!paymentDiv) {
    paymentDiv = document.createElement("div");
    cartBody.appendChild(paymentDiv);
  }
  paymentDiv.innerHTML = paymentTemplate();

  // Update payment details
  updatePaymentDetails();
};
showCart();

