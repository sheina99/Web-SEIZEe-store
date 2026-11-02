const ADMIN_WA_NUMBER = "62895330027340";

// Data 14 Produk SEIZE STORE (9 Kalung, 2 Gelang, 3 One Set)
const products = [
    // --- KALUNG (9 Produk) ---
    { id: 1, name: "Kalung Goth Rantai Manik Hitam", category: "kalung", price: 95000, img: "image/kalung goth 1.jpg", desc: "Kalung liontin goth hitam dengan rantai antikarat." },
    { id: 2, name: "Kalung Goth Manik-manik Hitam", category: "kalung", price: 89000, img: "image/kalung goth 2.jpg", desc: "Kalung goth dengan manik hitam yang elegan." },
    { id: 3, name: "Kalung Goth Moon", category: "kalung", price: 90000, img: "image/kalung goth 3.jpg", desc: "Kalung liontin goth dengan liontin bulan sabit." },
    { id: 4, name: "Kalung Goth Manik Merah", category: "kalung", price: 85000, img: "image/kalung goth 4.jpg", desc: "Kalung goth dengan manik merah yang cantik bernuansa elegan." },
    { id: 5, name: "Kalung Goth Simple", category: "kalung", price: 80000, img: "image/kalung goth 5.jpg", desc: "Kalung goth dengan gaya simple tapi elegan." },
    { id: 6, name: "Kalung Liontin Bintang Pink", category: "kalung", price: 75000, img: "image/kalung lucu 1.jpg", desc: "Kalung lucu simple dengan liontin bintang warna pink." },
    { id: 7, name: "Kalung Liontin Bintang Biru", category: "kalung", price: 75000, img: "image/kalung lucu 2.jpg", desc: "Kalung lucu simple dengan liontin bintang warna biru." },
    { id: 8, name: "Kalung Heart Silver", category: "kalung", price: 92000, img: "image/kalung lucu 3.jpg", desc: "Kalung dengan nuansa biru dan silver yang indah." },
    { id: 9, name: "Kalung Blue Rantai", category: "kalung", price: 95000, img: "image/kalung lucu 4.jpg", desc: "Kalung simple nan elegan." },

    // --- GELANG (2 Produk) ---
    { id: 10, name: "Set Gelang Rantai Layer", category: "gelang", price: 89000, img: "image/set gelang 2.jpg", desc: "Set gelang berlayer cocok digunakan sehari-hari." },
    { id: 11, name: "Set Gelang Rantai Simple", category: "gelang", price: 85000, img: "image/gelang.jpg", desc: "Set gelang simpel cocok digunakan seharo-hari" },

    // --- ONE SET (3 Produk) ---
    { id: 12, name: "One Set Elegance Blue ", category: "set", price: 25000000, img: "image/set 1.jpg", desc: "Set perhiasan kalung, anting & cincin eksklusif warna biru pastel." },
    { id: 13, name: "One Set Elegance ", category: "set", price: 32000000, img: "image/set 2.jpg", desc: "Set perhiasan lengkap harga terjangkau." },
    { id: 14, name: "One Set Elegance Pink", category: "set", price: 45000000, img: "image/set 3.jpg", desc: "Set mewah premium cocok untuk hadiah spesial." }
];

const fallbackImg = "https://via.placeholder.com/300x300/5b87b8/ffffff?text=SEIZE+STORE";

let cart = JSON.parse(localStorage.getItem("seize_cart")) || [];
let currentUser = JSON.parse(localStorage.getItem("seize_user")) || null;
let reviews = JSON.parse(localStorage.getItem("seize_reviews")) || {
    1: [{ user: "Siti A.", rating: 5, text: "Bagus banget kalungnya, realpict!" }],
    10: [{ user: "Rina M.", rating: 5, text: "Lucu banget gelang daisy-nya!" }]
};

document.addEventListener("DOMContentLoaded", () => {
    updateUserUI();
    updateCartBadge();
    
    if (document.getElementById("featuredGrid")) {
        renderProducts(products.slice(0, 6), "featuredGrid");
    }
    if (document.getElementById("productGrid")) {
        renderProducts(products, "productGrid");
    }
});

function renderProducts(items, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = items.map(p => {
        const prodReviews = reviews[p.id] || [];
        const avgRating = prodReviews.length 
            ? (prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length).toFixed(1) 
            : "5.0";

        return `
        <div class="card">
            <img src="${p.img}" onerror="this.src='${fallbackImg}'" onclick="openProductDetail(${p.id})" alt="${p.name}">
            <h3 onclick="openProductDetail(${p.id})">${p.name}</h3>
            <div class="card-rating">⭐ ${avgRating} (${prodReviews.length} ulasan)</div>
            <div class="card-price">Rp ${p.price.toLocaleString("id-ID")}</div>
            <div class="card-actions">
                <div class="qty-control">
                    <button class="qty-btn" onclick="changeQtyInput(${p.id}, -1)">-</button>
                    <input type="number" id="qty-${p.id}" class="qty-input" value="1" min="1" readonly>
                    <button class="qty-btn" onclick="changeQtyInput(${p.id}, 1)">+</button>
                </div>
                <button class="btn-add-cart" onclick="addToCart(${p.id})">🛒 Tambah Ke Keranjang</button>
            </div>
        </div>
        `;
    }).join('');
}

function changeQtyInput(prodId, delta) {
    const input = document.getElementById(`qty-${prodId}`);
    if (input) {
        let val = parseInt(input.value) + delta;
        if (val >= 1) input.value = val;
    }
}

function openAuthModal() {
    document.getElementById("authModal").classList.add("active");
}

function handleAuth(e) {
    e.preventDefault();
    const name = document.getElementById("authName").value;
    const email = document.getElementById("authEmail").value;
    
    currentUser = { name, email };
    localStorage.setItem("seize_user", JSON.stringify(currentUser));
    
    updateUserUI();
    closeModal("authModal");
    alert(`Selamat datang, ${name}! Sekarang Anda bisa berbelanja.`);
}

function updateUserUI() {
    const btnAuth = document.getElementById("btnAuth");
    const userBadge = document.getElementById("userBadge");
    
    if (currentUser) {
        if (btnAuth) btnAuth.classList.add("hidden");
        if (userBadge) {
            userBadge.classList.remove("hidden");
            userBadge.innerText = `👤 ${currentUser.name}`;
        }
    }
}

function addToCart(prodId) {
    if (!currentUser) {
        alert("⚠️ Anda wajib mendaftarkan akun / login terlebih dahulu sebelum membeli!");
        openAuthModal();
        return;
    }

    const qtyInput = document.getElementById(`qty-${prodId}`);
    const qty = qtyInput ? parseInt(qtyInput.value) : 1;
    const product = products.find(p => p.id === prodId);

    const existingIndex = cart.findIndex(item => item.id === prodId);
    if (existingIndex > -1) {
        cart[existingIndex].qty += qty;
    } else {
        cart.push({ ...product, qty });
    }

    saveCart();
    alert(`Berhasil menambahkan ${qty}x ${product.name} ke keranjang!`);
}

function saveCart() {
    localStorage.setItem("seize_cart", JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll("#cartCount").forEach(el => el.innerText = totalCount);
}

function openCartModal() {
    const listContainer = document.getElementById("cartItemsList");
    const totalContainer = document.getElementById("cartTotal");
    
    if (cart.length === 0) {
        listContainer.innerHTML = "<p style='text-align:center; color:gray;'>Keranjang belanja masih kosong.</p>";
        totalContainer.innerText = "0";
    } else {
        let grandTotal = 0;
        listContainer.innerHTML = cart.map((item, index) => {
            const itemTotal = item.price * item.qty;
            grandTotal += itemTotal;
            return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.qty} x Rp ${item.price.toLocaleString("id-ID")}</p>
                </div>
                <button class="btn-delete-item" onclick="removeFromCart(${index})">🗑️ Hapus</button>
            </div>
            `;
        }).join('');
        totalContainer.innerText = grandTotal.toLocaleString("id-ID");
    }
    document.getElementById("cartModal").classList.add("active");
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    openCartModal();
}

function checkoutOrder() {
    if (cart.length === 0) {
        alert("Keranjang belanja kosong!");
        return;
    }
    if (!currentUser) {
        alert("Wajib mendaftar akun terlebih dahulu!");
        openAuthModal();
        return;
    }

    const address = document.getElementById("coAddress").value;
    const payment = document.getElementById("coPaymentMethod").value;

    if (!address.trim()) {
        alert("Silakan isi alamat pengiriman Anda terlebih dahulu!");
        return;
    }

    let itemsText = cart.map(i => `- ${i.name} (${i.qty}x)`).join("%0A");
    let totalHarga = document.getElementById("cartTotal").innerText;

    if (payment === "dana") {
        window.open("https://link.dana.id", "_blank");
    } else if (payment === "gopay") {
        window.open("https://gopay.co.id", "_blank");
    } else if (payment === "ovo") {
        window.open("https://www.ovo.id", "_blank");
    }

    let waMessage = `Halo SEIZE STORE, saya mau konfirmasi pesanan:%0A%0A` +
        `👤 *Nama:* ${currentUser.name}%0A` +
        `📞 *Kontak:* ${currentUser.email}%0A` +
        `📍 *Alamat:* ${address}%0A%0A` +
        `🛒 *Detail Pesanan:*%0A${itemsText}%0A%0A` +
        `💰 *Total:* Rp ${totalHarga}%0A` +
        `💳 *Metode Pembayaran:* ${payment.toUpperCase()}`;

    window.open(`https://wa.me/${ADMIN_WA_NUMBER}?text=${waMessage}`, "_blank");

    cart = [];
    saveCart();
    closeModal("cartModal");
}

function openProductDetail(prodId) {
    const p = products.find(prod => prod.id === prodId);
    if (!p) return;

    const prodReviews = reviews[p.id] || [];

    const bodyHtml = `
        <img src="${p.img}" onerror="this.src='${fallbackImg}'" style="width:100%; height:200px; object-fit:cover; border-radius:6px; margin-bottom:10px;">
        <h3>${p.name}</h3>
        <p style="font-size:12px; color:gray; margin-bottom:8px;">${p.desc}</p>
        <div class="card-price">Rp ${p.price.toLocaleString("id-ID")}</div>
        
        <div style="margin: 15px 0;">
            <button class="btn-add-cart" onclick="addToCart(${p.id})">🛒 Beli Produk Ini</button>
        </div>

        <hr style="margin: 15px 0; border: none; border-top: 1px solid #e2e8f0;">

        <h4>Ulasan Pembeli ⭐</h4>
        <div style="margin-top: 10px;">
            ${prodReviews.length === 0 ? '<p style="font-size:12px; color:gray;">Belum ada ulasan.</p>' : 
                prodReviews.map(r => `
                    <div class="review-box">
                        <div class="review-author">${r.user} <span class="review-stars">★ ${r.rating}</span></div>
                        <div>${r.text}</div>
                    </div>
                `).join('')
            }
        </div>

        <form onsubmit="addReview(event, ${p.id})" style="margin-top: 15px;">
            <h5>Tambah Ulasan Anda</h5>
            <div class="form-group">
                <label>Rating Bintang</label>
                <select id="reviewRating">
                    <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value="4">⭐⭐⭐⭐ (4/5)</option>
                    <option value="3">⭐⭐⭐ (3/5)</option>
                </select>
            </div>
            <div class="form-group">
                <label>Komentar</label>
                <textarea id="reviewText" rows="2" placeholder="Tuliskan ulasan produk..." required></textarea>
            </div>
            <button type="submit" class="btn-submit">Kirim Ulasan</button>
        </form>
    `;

    document.getElementById("modalProdTitle").innerText = p.name;
    document.getElementById("modalProdBody").innerHTML = bodyHtml;
    document.getElementById("productModal").classList.add("active");
}

function addReview(e, prodId) {
    e.preventDefault();
    if (!currentUser) {
        alert("⚠️ Anda wajib login terlebih dahulu untuk memberikan ulasan!");
        openAuthModal();
        return;
    }

    const rating = parseInt(document.getElementById("reviewRating").value);
    const text = document.getElementById("reviewText").value;

    if (!reviews[prodId]) reviews[prodId] = [];
    reviews[prodId].push({ user: currentUser.name, rating, text });

    localStorage.setItem("seize_reviews", JSON.stringify(reviews));
    alert("Ulasan Anda berhasil dikirim!");
    openProductDetail(prodId);
}

function filterCategory(cat, btn) {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");

    if (cat === "semua") {
        renderProducts(products, "productGrid");
    } else {
        const filtered = products.filter(p => p.category === cat);
        renderProducts(filtered, "productGrid");
    }
}

function closeModal(id) {
    document.getElementById(id).classList.remove("active");
}