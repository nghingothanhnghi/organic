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
      route("cart", "routes/cart.tsx"), // Store page
    ]),
    route("about", "routes/about.tsx"),
  ] satisfies RouteConfig;
