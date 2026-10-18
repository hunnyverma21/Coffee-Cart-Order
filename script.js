const menu = [
 {id:1,name:"Classic Cappuccino",desc:"Espresso, steamed milk and silky foam.",price:160,category:"Coffee",emoji:"☕"},
 {id:2,name:"Caramel Latte",desc:"Smooth espresso with sweet caramel notes.",price:190,category:"Coffee",emoji:"🥛"},
 {id:3,name:"Americano",desc:"Bold espresso topped with hot water.",price:130,category:"Coffee",emoji:"🫘"},
 {id:4,name:"Mocha Delight",desc:"Chocolate, espresso and creamy milk.",price:210,category:"Coffee",emoji:"🍫"},
 {id:5,name:"Iced Coffee",desc:"Chilled coffee served over ice.",price:170,category:"Cold",emoji:"🧋"},
 {id:6,name:"Cold Brew",desc:"Slow-steeped, mellow and refreshing.",price:200,category:"Cold",emoji:"🧊"},
 {id:7,name:"Matcha Latte",desc:"Earthy matcha blended with milk.",price:220,category:"Tea",emoji:"🍵"},
 {id:8,name:"Masala Chai",desc:"Indian tea with warming spices.",price:90,category:"Tea",emoji:"🫖"}
];
let cart = {};
let category = "All";
const rupees = n => "₹" + n.toLocaleString("en-IN");
const products = document.getElementById("products");
const cartItems = document.getElementById("cartItems");
function renderProducts(){
 const shown = menu.filter(p => category==="All" || p.category===category);
 products.innerHTML = shown.map(p=>`<article class="product"><div class="product-art">${p.emoji}</div><h3>${p.name}</h3><p>${p.desc}</p><div class="product-bottom"><span class="price">${rupees(p.price)}</span><button class="add-btn" onclick="addToCart(${p.id})">+ Add</button></div></article>`).join("");
}
function addToCart(id){cart[id]=(cart[id]||0)+1;renderCart();toast(menu.find(p=>p.id===id).name+" added to cart");}
function changeQty(id,delta){cart[id]=(cart[id]||0)+delta;if(cart[id]<=0)delete cart[id];renderCart();}
function renderCart(){
 const ids=Object.keys(cart);const count=ids.reduce((s,id)=>s+cart[id],0);
 document.getElementById("cartCount").textContent=count;
 if(!ids.length){cartItems.innerHTML='<div class="empty"><span>🛍️</span><h3>Your cart is waiting</h3><p>Add a drink from the menu to get started.</p></div>';}
 else{cartItems.innerHTML=ids.map(id=>{const p=menu.find(x=>x.id===Number(id));return `<div class="cart-item"><div class="cart-emoji">${p.emoji}</div><div class="cart-info"><strong>${p.name}</strong><small>${rupees(p.price)} each · ${rupees(p.price*cart[id])}</small></div><div class="qty"><button aria-label="Decrease ${p.name}" onclick="changeQty(${p.id},-1)">−</button><strong>${cart[id]}</strong><button aria-label="Increase ${p.name}" onclick="changeQty(${p.id},1)">+</button></div></div>`}).join("");}
 const subtotal=ids.reduce((s,id)=>s+menu.find(p=>p.id===Number(id)).price*cart[id],0);
 const packaging=count?10:0;
 document.getElementById("subtotal").textContent=rupees(subtotal);
 document.getElementById("packaging").textContent=rupees(packaging);
 document.getElementById("total").textContent=rupees(subtotal+packaging);
}
function toast(message){const t=document.getElementById("toast");t.textContent=message;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2000);}
document.getElementById("filters").addEventListener("click",e=>{const b=e.target.closest("button[data-category]");if(!b)return;category=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts();});
document.getElementById("cartJump").addEventListener("click",()=>document.getElementById("cart").scrollIntoView({behavior:"smooth"}));
document.getElementById("clearCart").addEventListener("click",()=>{cart={};renderCart();toast("Cart cleared");});
document.getElementById("checkout").addEventListener("click",()=>{
 const name=document.getElementById("customerName").value.trim();
 const ids=Object.keys(cart);
 if(!ids.length){toast("Please add a drink first");return;}
 if(!name){document.getElementById("customerName").focus();toast("Please enter your name");return;}
 const lines=ids.map(id=>{const p=menu.find(x=>x.id===Number(id));return `${cart[id]} × ${p.name}`}).join(", ");
 const total=document.getElementById("total").textContent;
 const type=document.getElementById("orderType").value;
 alert(`Thanks, ${name}! ☕\n\nYour ${type.toLowerCase()} order:\n${lines}\n\nTotal: ${total}\n\nThis is a demo order; no payment was taken.`);
 cart={};renderCart();document.getElementById("customerName").value="";
});
renderProducts();renderCart();
