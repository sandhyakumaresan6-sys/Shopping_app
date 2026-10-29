const products = [
  {id:1,name:"CloudBeat Wireless Headphones",category:"Tech",price:2499,oldPrice:3299,rating:"4.9",reviews:128,emoji:"🎧",tag:"BESTSELLER",bg:"#eee9ff"},
  {id:2,name:"Everyday Mini Tote",category:"Style",price:1299,oldPrice:1699,rating:"4.8",reviews:96,emoji:"👜",tag:"TRENDING",bg:"#ffeae5"},
  {id:3,name:"Sunday Ceramic Planter",category:"Home",price:799,oldPrice:999,rating:"4.9",reviews:74,emoji:"🪴",tag:"",bg:"#e4f5e9"},
  {id:4,name:"MoveLite Street Sneakers",category:"Active",price:2899,oldPrice:3599,rating:"4.7",reviews:82,emoji:"👟",tag:"NEW",bg:"#fff0ce"},
  {id:5,name:"Pocket Sound Mini Speaker",category:"Tech",price:1599,oldPrice:1999,rating:"4.8",reviews:111,emoji:"🔊",tag:"POPULAR",bg:"#e5f0ff"},
  {id:6,name:"Soft Glow Table Lamp",category:"Home",price:1899,oldPrice:2399,rating:"4.9",reviews:63,emoji:"💡",tag:"",bg:"#fff0d9"},
  {id:7,name:"Weekend Crossbody Bag",category:"Style",price:1799,oldPrice:2199,rating:"4.8",reviews:57,emoji:"👝",tag:"JUST IN",bg:"#fce8f2"},
  {id:8,name:"FlexFit Smart Bottle",category:"Active",price:999,oldPrice:1299,rating:"4.7",reviews:45,emoji:"🧴",tag:"",bg:"#e0f5f2"}
];
const state = {filter:"All",search:"",cart:[],wishes:new Set()};
const $ = (selector) => document.querySelector(selector);
const money = value => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value);
const grid = $("#productGrid");
function renderProducts(){
  const filtered = products.filter(p => (state.filter==="All" || p.category===state.filter) && (p.name+" "+p.category).toLowerCase().includes(state.search.toLowerCase()));
  grid.innerHTML = filtered.map((p,i)=>`<article class="product-card" style="animation-delay:${i*45}ms">
    <div class="product-visual" style="background:${p.bg}">
      ${p.tag?`<span class="product-tag">${p.tag}</span>`:""}
      <button class="wish-btn ${state.wishes.has(p.id)?"wished":""}" data-wish="${p.id}" aria-label="Add ${p.name} to wishlist">${state.wishes.has(p.id)?"♥":"♡"}</button>
      <span class="product-emoji" aria-hidden="true">${p.emoji}</span>
    </div>
    <div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3>
      <div class="rating"><span>★★★★★</span> ${p.rating} <span style="color:#aaa5b5">(${p.reviews})</span></div>
      <div class="price-row"><div class="price">${money(p.price)}<span class="old-price">${money(p.oldPrice)}</span></div><button class="add-btn" data-add="${p.id}" aria-label="Add ${p.name} to cart">+</button></div>
    </div></article>`).join("");
  $("#emptyState").classList.toggle("hidden",filtered.length!==0);
}
function renderCart(){
  const count=state.cart.reduce((sum,item)=>sum+item.qty,0);
  $("#cartCount").textContent=count; $("#drawerCount").textContent=`(${count})`;
  $("#cartEmpty").classList.toggle("hidden",count!==0);
  $("#cartFooter").classList.toggle("hidden",count===0);
  $("#cartItems").innerHTML=state.cart.map(item=>{const p=products.find(x=>x.id===item.id);return `<div class="cart-line">
    <div class="cart-thumb" style="background:${p.bg}">${p.emoji}</div><div><h4>${p.name}</h4><span class="cart-price">${money(p.price)}</span>
    <div class="quantity"><button data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">+</button></div></div>
    <button class="remove-btn" data-remove="${p.id}" aria-label="Remove ${p.name}">×</button></div>`}).join("");
  $("#subtotal").textContent=money(state.cart.reduce((sum,item)=>sum+products.find(p=>p.id===item.id).price*item.qty,0));
}
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2200)}
function openCart(){ $("#overlay").classList.remove("hidden");$("#cartDrawer").classList.add("open");$("#cartDrawer").setAttribute("aria-hidden","false");document.body.style.overflow="hidden"; }
function closeCart(){ $("#overlay").classList.add("hidden");$("#cartDrawer").classList.remove("open");$("#cartDrawer").setAttribute("aria-hidden","true");document.body.style.overflow=""; }
function addToCart(id){const item=state.cart.find(x=>x.id===id);if(item)item.qty++;else state.cart.push({id,qty:1});renderCart();const p=products.find(x=>x.id===id);toast(`${p.name} added to your bag`)}
grid.addEventListener("click",e=>{
  const add=e.target.closest("[data-add]"),wish=e.target.closest("[data-wish]");
  if(add)addToCart(Number(add.dataset.add));
  if(wish){const id=Number(wish.dataset.wish);if(state.wishes.has(id)){state.wishes.delete(id);toast("Removed from wishlist")}else{state.wishes.add(id);toast("Saved to your wishlist")}renderProducts()}
});
$("#filters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;state.filter=b.dataset.filter;document.querySelectorAll(".filter-pill").forEach(x=>x.classList.toggle("selected",x===b));renderProducts()});
document.querySelectorAll("[data-category]").forEach(b=>b.addEventListener("click",()=>{state.filter=b.dataset.category;document.querySelectorAll(".filter-pill").forEach(x=>x.classList.toggle("selected",x.dataset.filter===state.filter));renderProducts();$("#shop").scrollIntoView({behavior:"smooth"})}));
$("#searchToggle").addEventListener("click",()=>{$("#searchBar").classList.toggle("hidden");if(!$("#searchBar").classList.contains("hidden"))$("#searchInput").focus()});
$("#searchInput").addEventListener("input",e=>{state.search=e.target.value;renderProducts();if(state.search){state.filter="All";document.querySelectorAll(".filter-pill").forEach(x=>x.classList.toggle("selected",x.dataset.filter==="All"))}});
$("#clearSearch").addEventListener("click",()=>{$("#searchInput").value="";state.search="";renderProducts()});
$("#cartToggle").addEventListener("click",openCart);$("#closeCart").addEventListener("click",closeCart);$("#overlay").addEventListener("click",closeCart);
$("#continueShopping").addEventListener("click",()=>{closeCart();$("#shop").scrollIntoView({behavior:"smooth"})});
$("#cartItems").addEventListener("click",e=>{const qty=e.target.closest("[data-qty]"),remove=e.target.closest("[data-remove]");if(qty){const id=Number(qty.dataset.qty),item=state.cart.find(x=>x.id===id);item.qty+=Number(qty.dataset.delta);if(item.qty<=0)state.cart=state.cart.filter(x=>x.id!==id);renderCart()}if(remove){state.cart=state.cart.filter(x=>x.id!==Number(remove.dataset.remove));renderCart()}});
$("#checkoutBtn").addEventListener("click",()=>toast("Demo only — connect a payment provider for real checkout."));
$("#newsletterForm").addEventListener("submit",e=>{e.preventDefault();$("#newsletterNote").textContent="You're on the list! Thanks for joining 💜";$("#emailInput").value="";toast("Thanks for joining the good list!")});
$("#menuToggle").addEventListener("click",()=>$("#nav").classList.toggle("open"));
document.querySelector(".nav").id="nav";
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>$("#nav").classList.remove("open")));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart()});
renderProducts();renderCart();
