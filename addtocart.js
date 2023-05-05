const product = [
  {
    id: 0,
    image: "image/gg-1.jpg",
    title: "Z Flip Foldable Mobile",
    price: 120,
    ct: 0,
  },
  {
    id: 1,
    image: "image/hh-2.jpg",
    title: "Air Pods Pro",
    price: 60,
    ct: 0,
  },
  {
    id: 2,
    image: "image/ee-3.jpg",
    title: "250D DSLR Camera",
    price: 230,
    ct: 0,
  },
  {
    id: 3,
    image: "image/aa-1.jpg",
    title: "Head Phones",
    price: 100,
    ct: 0,
  },
];

const r = document.getElementById("root");
let i = 0;
product.forEach((p) => {
  const pm = document.createElement("div");
  pm.classList.add("box");
  const productHTML = `
  <div class='img-box'>
      <img class='images' src=${p.image}></img>
  </div>
  <div class='bottom'>
    <p>${p.title}</p>
    <p>${p.id}</p>
    <h2>$ ${p.price}.00</h2>
    
    <button>Add to cart</button>

  </div>
`;
  pm.innerHTML = productHTML;
  r.appendChild(pm);
});
let cart = [];
const buttns = document.querySelectorAll(".bottom");
let arr = Array.from(buttns);
arr.forEach((a) => {
  a.addEventListener("click", (event) => {
    const clickedButton = event.target;
    const clickedProductId =
      clickedButton.parentElement.querySelector("p:nth-child(2)").textContent;
    const clickedProduct = product.find((p) => p.id == clickedProductId);

    const existingProduct = cart.find((p) => p.id == clickedProductId);
    if (existingProduct) {
      existingProduct.ct++; // increase quantity by 1
    } else {
      clickedProduct.ct = 1; // set initial quantity to 1
      cart.push(clickedProduct);
    }
    displaycart();
  });
});

function displaycart() {
  document.getElementById("count").innerHTML = cart.length;
  document.getElementById("cartItem").innerHTML = "";
  if (cart.length == 0) {
    document.getElementById("cartItem").innerHTML = "Your cart is empty";
    document.getElementById("total").innerHTML = "$ " + 0 + ".00";
  } else {
    let total = 0;
    cart.forEach((c) => {
      total = total + c.ct * c.price;
      const y = document.createElement("div");

      const HTMLP = `<div class='cart-item'>
      <div class='row-img'>
          <img class='rowimg' src=${c.image}>
      </div>
      <p style='font-size:12px;'>${c.title}</p>
      <h2 style='font-size: 15px;'>$ ${c.ct * c.price}.00</h2>
      <i class='fa-solid fa-trash delete-btn'></i></div>`;
      y.innerHTML = HTMLP;
      const trashIcon = y.querySelector(".delete-btn");
      trashIcon.addEventListener("click", () => {
        const index = cart.findIndex((p) => p.id == c.id);
        if (c.ct > 1) {
          c.ct--;
        } else {
          cart.splice(index, 1);
        }
        displaycart();
      });
      document.getElementById("cartItem").appendChild(y);
    });
    document.getElementById("total").innerHTML = total;
  }
}
