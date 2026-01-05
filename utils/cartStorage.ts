const CART_KEY = "gm_cart";
const TEN_MINUTES = 20 * 60 * 1000; // 20 min in ms
const CART_EVENT = "cart_updated";


export const getCart = () => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(CART_KEY);
  if (!stored) return [];

  const parsed = JSON.parse(stored);

  
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


  const existingIndex = items.findIndex((i) => i.sku === item.sku);

  if (existingIndex !== -1) {
    items[existingIndex].quantity += item.quantity;
  } else {
    items.push(item);
  }

  
  localStorage.setItem(
    CART_KEY,
    JSON.stringify({
      items,
      expiresAt,
    })
  );

  
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
      expiresAt: parsed.expiresAt, 
    })
  );

  window.dispatchEvent(new Event(CART_EVENT));
};




// remove product function
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};

// remove by slug category fun
export const removeCartItemBySlug = (slug: string) => {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem(CART_KEY);
  if (!stored) return;

  const parsed = JSON.parse(stored);

  // ⛔ expired হলে cart clear
  if (Date.now() > parsed.expiresAt) {
    localStorage.removeItem(CART_KEY);
    return;
  }

  const filteredItems = (parsed.items || []).filter(
    (item: any) => item.slug !== slug
  );

  localStorage.setItem(
    CART_KEY,
    JSON.stringify({
      items: filteredItems,
      expiresAt: parsed.expiresAt, // ⏰ keep expiry
    })
  );

  // 🔔 UI notify
  window.dispatchEvent(new Event(CART_EVENT));
};

