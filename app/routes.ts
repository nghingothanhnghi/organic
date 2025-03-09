import { type RouteConfig} from "@react-router/dev/routes";
import {
    index,
    layout,
    route,
  } from "@react-router/dev/routes";

export default [
    layout("components/layout.tsx", [
      index("routes/home.tsx"),
      route("contacts/:contactId", "routes/contact.tsx"),
      route("store", "routes/store.tsx"), // Store page
      route("products/:slug", "routes/productDetail.tsx"), // Product detail page
      route("cart", "routes/cart.tsx"), // Cart page
      route("wishlist", "routes/wish.tsx"), // Wish page
      route("checkout", "routes/checkOut.tsx"), // Checkout page
      route("order-check", "routes/orderCheck.tsx"), // Checkout page
    ]),
    route("about", "routes/about.tsx"),
    route("login", "routes/login.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
  ] satisfies RouteConfig;
