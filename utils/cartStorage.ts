const CART_KEY = "gm_cart";
const TEN_MINUTES = 20 * 60 * 1000; // 20 min in ms
const CART_EVENT = "cart_updated";

/* ---------- GET CART ---------- */
export const getCart = () => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(CART_KEY);
  if (!stored) return [];

  const parsed = JSON.parse(stored);

  // ⏰ expired?
  if (Date.now() > parsed.expiresAt) {
    localStorage.removeItem(CART_KEY);
    return [];
  }

  return parsed.items || [];
};


export const addToCart = (item: any) => {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem(CART_KEY);

  let items: any[] = [];
  let expiresAt = Date.now() + TEN_MINUTES;

  if (stored) {
    const parsed = JSON.parse(stored);

    if (Date.now() <= parsed.expiresAt) {
      items = parsed.items || [];
      expiresAt = parsed.expiresAt;
    }
  }

  // SKU based merge
  const existingIndex = items.findIndex((i) => i.sku === item.sku);

  if (existingIndex !== -1) {
    items[existingIndex].quantity += item.quantity;
  } else {
    items.push(item);
  }

  // ✅ FIRST save to localStorage
  localStorage.setItem(
    CART_KEY,
    JSON.stringify({
      items,
      expiresAt,
    })
  );

  // ✅ THEN notify UI
  window.dispatchEvent(new Event(CART_EVENT));
};



export const updateCartItems = (items: any[]) => {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem(CART_KEY);
  if (!stored) return;

  const parsed = JSON.parse(stored);

  localStorage.setItem(
    CART_KEY,
    JSON.stringify({
      items,
      expiresAt: parsed.expiresAt, // ⏰ keep old expiry
    })
  );

  window.dispatchEvent(new Event(CART_EVENT));
};




/* ---------- CLEAR CART ---------- */
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};
