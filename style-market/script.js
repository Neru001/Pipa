/* =========================================================
   Style Market — JavaScript (интерактивность сайта)
   Данные корзины и пользователя хранятся в localStorage браузера.
   ========================================================= */

/* ---------- Данные о товарах ---------- */
const PRODUCTS = [
  { id: 1, name: "Футболка Coral Basic", cat: "Одежда", price: 1990, old: 2490, img: "tshirt.jpg", sizes: ["XS", "S", "M", "L", "XL"], desc: "Базовая футболка из 100% хлопка. Мягкая, не теряет форму после стирки.", hit: false },
  { id: 2, name: "Худи Oversize Royal Blue", cat: "Одежда", price: 4990, img: "hoodie.jpg", sizes: ["S", "M", "L", "XL"], desc: "Тёплое худи из плотного футера с начёсом, свободный крой, карман-кенгуру.", hit: true },
  { id: 3, name: "Джинсы Straight Indigo", cat: "Одежда", price: 5490, img: "jeans.jpg", sizes: ["28", "30", "32", "34", "36"], desc: "Прямые джинсы классической посадки из плотного денима.", hit: false },
  { id: 4, name: "Платье Noir Stripe", cat: "Платья", price: 6290, old: 7990, img: "dress.jpg", sizes: ["XS", "S", "M", "L"], desc: "Длинное вечернее платье в тонкую полоску с V-образным вырезом.", hit: true },
  { id: 5, name: "Кеды Urban Mint", cat: "Обувь", price: 7490, img: "sneakers.jpg", sizes: ["37", "38", "39", "40", "41", "42", "43"], desc: "Замшевые кеды мятного цвета на светлой подошве.", hit: true },
  { id: 6, name: "Куртка Classic Brown", cat: "Одежда", price: 9990, img: "jacket.svg", sizes: ["S", "M", "L", "XL"], desc: "Демисезонная куртка из эко-кожи с подкладкой.", hit: false },
  { id: 7, name: "Кепка Sunny", cat: "Аксессуары", price: 1290, img: "cap.svg", sizes: ["Универсальный"], desc: "Хлопковая кепка с регулируемой застёжкой.", hit: false },
  { id: 8, name: "Сумка Violet Tote", cat: "Аксессуары", price: 3590, img: "bag.svg", sizes: ["Универсальный"], desc: "Вместительная сумка-шоппер с внутренним карманом.", hit: false }
];

const DELIVERY_PRICE = 300;
const FREE_DELIVERY_FROM = 5000;
const PROMO_CODES = { STYLE10: 0.10 };

/* ---------- Вспомогательные функции ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const formatPrice = (n) => n.toLocaleString("ru-RU") + " ₽";
const findProduct = (id) => PRODUCTS.find((p) => p.id === Number(id));

const storage = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* хранилище недоступно */ }
  }
};

/* Всплывающее уведомление */
let toastTimer;
function showToast(text, isError = false) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = text;
  toast.classList.toggle("error", isError);
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

/* ---------- Корзина ---------- */
const Cart = {
  items() { return storage.get("sm_cart", []); },
  save(items) { storage.set("sm_cart", items); updateCartCount(); },
  add(id, size) {
    const product = findProduct(id);
    if (!product) return;
    size = size || product.sizes[Math.min(2, product.sizes.length - 1)];
    const items = this.items();
    const existing = items.find((i) => i.id === product.id && i.size === size);
    if (existing) existing.qty += 1;
    else items.push({ id: product.id, size, qty: 1 });
    this.save(items);
    showToast(`«${product.name}» (${size}) добавлен в корзину`);
  },
  change(index, delta) {
    const items = this.items();
    items[index].qty += delta;
    if (items[index].qty <= 0) items.splice(index, 1);
    this.save(items);
  },
  remove(index) {
    const items = this.items();
    items.splice(index, 1);
    this.save(items);
  },
  clear() { this.save([]); },
  count() { return this.items().reduce((s, i) => s + i.qty, 0); },
  subtotal() { return this.items().reduce((s, i) => s + findProduct(i.id).price * i.qty, 0); }
};

function updateCartCount() {
  $$(".cart-count").forEach((el) => {
    el.textContent = Cart.count();
    el.classList.remove("bump");
    void el.offsetWidth; // перезапуск анимации
    el.classList.add("bump");
  });
}

/* Анимация кнопки «В корзину» */
function flashButton(btn) {
  const text = btn.textContent;
  btn.classList.add("added");
  btn.textContent = "✓ Добавлено";
  setTimeout(() => { btn.classList.remove("added"); btn.textContent = text; }, 1200);
}

/* ---------- Общие элементы (на всех страницах) ---------- */
function initCommon() {
  updateCartCount();

  // Бургер-меню для мобильных
  const burger = $("#burger");
  const nav = $("#nav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open);
    });
  }

  // Кнопки «В корзину» со статичной разметкой (главная страница)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    Cart.add(btn.dataset.add);
    flashButton(btn);
  });

  // Простые формы с сообщением об успехе (подписка, обратная связь)
  $$(".js-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      showToast(form.dataset.success || "Готово!");
      form.reset();
      const counter = $("#counter");
      if (counter) counter.textContent = "0";
    });
  });
}

/* ---------- Страница каталога ---------- */
function initCatalog() {
  const grid = $("#catalog");
  if (!grid) return;

  const params = new URLSearchParams(location.search);
  const state = {
    query: params.get("q") || "",
    cat: params.get("cat") || "Все",
    sort: "default"
  };

  const search = $("#search");
  const sort = $("#sort");
  search.value = state.query;

  // Выделяем активную категорию, если пришли по ссылке с главной
  $$(".chip").forEach((c) => c.classList.toggle("active", c.dataset.cat === state.cat));

  function render() {
    let list = PRODUCTS.filter((p) =>
      (state.cat === "Все" || p.cat === state.cat) &&
      p.name.toLowerCase().includes(state.query.trim().toLowerCase())
    );
    if (state.sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (state.sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (state.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name, "ru"));

    grid.innerHTML = list.map((p) => `
      <article class="card">
        <img src="images/${p.img}" alt="${p.name}" class="card__img" data-details="${p.id}">
        <div class="card__body">
          ${p.hit ? '<span class="badge">Хит</span>' : p.old ? '<span class="badge">Скидка</span>' : ""}
          <span class="card__cat">${p.cat}</span>
          <h3 class="card__title">${p.name}</h3>
          <p class="card__text">${p.desc}</p>
          <div class="card__footer">
            <span class="price">${formatPrice(p.price)}${p.old ? `<s>${formatPrice(p.old)}</s>` : ""}</span>
            <div class="card__actions">
              <button class="btn btn--outline btn--small" data-details="${p.id}">Подробнее</button>
              <button class="btn btn--small" data-add="${p.id}">В корзину</button>
            </div>
          </div>
        </div>
      </article>`).join("");

    $("#found").textContent = `Найдено товаров: ${list.length}`;
    $("#empty").hidden = list.length > 0;
  }

  search.addEventListener("input", () => { state.query = search.value; render(); });
  sort.addEventListener("change", () => { state.sort = sort.value; render(); });
  $("#filters").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    $$(".chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    state.cat = chip.dataset.cat;
    render();
  });

  // Модальное окно «Подробнее»
  const modal = $("#modal");
  let current = null;

  grid.addEventListener("click", (e) => {
    const el = e.target.closest("[data-details]");
    if (!el) return;
    current = findProduct(el.dataset.details);
    $("#modal-img").src = `images/${current.img}`;
    $("#modal-img").alt = current.name;
    $("#modal-cat").textContent = current.cat;
    $("#modal-title").textContent = current.name;
    $("#modal-desc").textContent = current.desc;
    $("#modal-price").textContent = formatPrice(current.price);
    $("#modal-size").innerHTML = current.sizes.map((s) => `<option>${s}</option>`).join("");
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  });

  function closeModal() { modal.hidden = true; document.body.style.overflow = ""; }
  $$("[data-close]", modal).forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  $("#modal-add").addEventListener("click", (e) => {
    Cart.add(current.id, $("#modal-size").value);
    flashButton(e.currentTarget);
    setTimeout(closeModal, 700);
  });

  render();
}

/* ---------- Страница корзины ---------- */
function initCart() {
  const list = $("#cart-list");
  if (!list) return;

  let discountRate = 0;

  function render() {
    const items = Cart.items();
    $("#cart-empty").hidden = items.length > 0;
    $("#order-form").hidden = items.length === 0;

    list.innerHTML = items.map((item, i) => {
      const p = findProduct(item.id);
      return `
        <article class="cart-item">
          <img src="images/${p.img}" alt="${p.name}">
          <div><h3>${p.name}</h3><small>Размер: ${item.size} · ${formatPrice(p.price)}</small></div>
          <div class="qty">
            <button data-minus="${i}" aria-label="Уменьшить">−</button>
            <span>${item.qty}</span>
            <button data-plus="${i}" aria-label="Увеличить">+</button>
          </div>
          <b class="cart-item__sum">${formatPrice(p.price * item.qty)}</b>
          <button class="remove" data-remove="${i}" aria-label="Удалить">×</button>
        </article>`;
    }).join("");

    const subtotal = Cart.subtotal();
    const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_PRICE;
    const discount = Math.round(subtotal * discountRate);
    $("#sum-items").textContent = formatPrice(subtotal);
    $("#sum-delivery").textContent = delivery ? formatPrice(delivery) : "Бесплатно";
    $("#sum-discount").textContent = discount ? "−" + formatPrice(discount) : "0 ₽";
    $("#sum-total").textContent = formatPrice(subtotal - discount + delivery);
    return subtotal - discount + delivery;
  }

  list.addEventListener("click", (e) => {
    const t = e.target;
    if (t.dataset.plus !== undefined) Cart.change(+t.dataset.plus, 1);
    if (t.dataset.minus !== undefined) Cart.change(+t.dataset.minus, -1);
    if (t.dataset.remove !== undefined) { Cart.remove(+t.dataset.remove); showToast("Товар удалён из корзины"); }
    render();
  });

  $("#promo-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const code = $("#promo").value.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      discountRate = PROMO_CODES[code];
      showToast(`Промокод ${code} применён: скидка ${discountRate * 100}%`);
    } else {
      discountRate = 0;
      showToast("Такого промокода не существует", true);
    }
    render();
  });

  $("#order-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const total = render();
    const orders = storage.get("sm_orders", []);
    const number = 1000 + orders.length + 1;
    orders.unshift({ number, date: new Date().toLocaleDateString("ru-RU"), count: Cart.count(), total, status: "Оформлен" });
    storage.set("sm_orders", orders);

    const user = storage.get("sm_user", null);
    if (user) { user.bonus = (user.bonus || 0) + Math.round(total * 0.05); storage.set("sm_user", user); }

    Cart.clear();
    form.reset();
    discountRate = 0;
    render();
    showToast(`Заказ №${number} оформлен! Мы свяжемся с вами для подтверждения.`);
  });

  render();
}

/* ---------- Личный кабинет ---------- */
function initAccount() {
  const auth = $("#auth");
  if (!auth) return;
  const profile = $("#profile");

  // Переключение вкладок «Вход / Регистрация»
  $$(".tab").forEach((tab) => tab.addEventListener("click", () => {
    $$(".tab").forEach((t) => t.classList.toggle("active", t === tab));
    $$(".tab-panel").forEach((p) => { p.hidden = p.dataset.panel !== tab.dataset.tab; });
  }));

  function showProfile() {
    const user = storage.get("sm_user", null);
    auth.hidden = !!user;
    profile.hidden = !user;
    if (!user) return;
    $("#profile-name").textContent = user.name;
    $("#profile-email").textContent = user.email;
    $("#profile-bonus").textContent = user.bonus || 0;
    $("#avatar").textContent = user.name.charAt(0).toUpperCase();

    const orders = storage.get("sm_orders", []);
    $("#orders").innerHTML = orders.map((o) => `
      <tr><td>№${o.number}</td><td>${o.date}</td><td>${o.count}</td><td>${formatPrice(o.total)}</td><td><span class="status">${o.status}</span></td></tr>`).join("");
    $("#orders-empty").hidden = orders.length > 0;
  }

  $("#login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!f.checkValidity()) { f.reportValidity(); return; }
    const email = f.email.value.trim();
    const saved = storage.get("sm_registered", null);
    const name = saved && saved.email === email ? saved.name : email.split("@")[0];
    storage.set("sm_user", { name, email, bonus: saved && saved.email === email ? saved.bonus : 0 });
    showToast(`Добро пожаловать, ${name}!`);
    showProfile();
  });

  $("#register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (f.password.value !== f.password2.value) {
      f.password2.setCustomValidity("Пароли не совпадают");
    } else {
      f.password2.setCustomValidity("");
    }
    if (!f.checkValidity()) { f.reportValidity(); return; }
    const user = { name: f.name.value.trim(), email: f.email.value.trim(), bonus: 500 };
    storage.set("sm_registered", user);
    storage.set("sm_user", user);
    showToast("Регистрация прошла успешно! Вам начислено 500 бонусов 🎉");
    showProfile();
  });
  $("#register-form").password2.addEventListener("input", (e) => e.target.setCustomValidity(""));

  $("#logout").addEventListener("click", () => {
    const user = storage.get("sm_user", null);
    if (user) storage.set("sm_registered", user); // сохраняем бонусы
    storage.set("sm_user", null);
    showToast("Вы вышли из аккаунта");
    showProfile();
  });

  showProfile();
}

/* ---------- Контакты: счётчик символов ---------- */
function initContacts() {
  const message = $("#message");
  if (!message) return;
  message.addEventListener("input", () => { $("#counter").textContent = message.value.length; });
}

/* ---------- Запуск ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initCommon();
  initCatalog();
  initCart();
  initAccount();
  initContacts();
});
