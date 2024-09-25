import AdminRoot from "../admin/adminRoot";
import Produtcs from "../admin/products";
import Users from "../admin/users";
import Account from "../user/pages/account/index";
import Basket from "../user/pages/basket";
import Contact from "../user/pages/contact";
import Home from "../user/pages/home";
import Login from "../user/pages/login";
import Register from "../user/pages/login/register";
import Wishlist from "../user/pages/wishlist";
import UserRoot from "../user/userRoot";
import ProductsUser from "../user/pages/products";
import DetailPage from "../user/pages/detailPage";
import LoginAdmin from "../admin/loginAdmin";
export let routes = [
  {
    path: "/",
    element: <UserRoot />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/account", element: <Account /> },
      { path: "/contact", element: <Contact /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/basket", element: <Basket /> },
      { path: "/products", element: <ProductsUser /> },
      { path: "/product-detail/:id", element: <DetailPage /> },
    ],
  },
  {
    path: "/admin-page",
    element: <AdminRoot />,
    children: [
      {
        path: "/admin-page/users",
        element: <Users />,
      },
      {
        path: "/admin-page/products",
        element: <Produtcs />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/admin", element: <LoginAdmin /> },
];
