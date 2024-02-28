// utils
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store/index";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// components
import RootLayout from "layouts/RootLayout";
import Home from "pages/Home";
import MyAccountLayout from "pages/MyAccountLayout";
import AccountData, { loader as accountDataLoader } from "features/account/components/AccountData";
import AccountAddress, { loader as accountAddressLoader } from "features/account/components/AccountAddress";
import AccountOrders, { loader as accountOrdersLoader } from "features/account/components/AccountOrders";
import AccountFavorites from "features/account/components/AccountFavorites";
import AccountReturns from "features/account/components/AccountReturns";
import ErrorPage from "components/ui/ErrorPage";
import LoadingSpinner from "components/ui/LoadingSpinner";

// styles
import "./index.css";

// lazy loading components
const ContactLazy = lazy(() => import("pages/Contact"));
const CartLazy = lazy(() => import("pages/Cart"));
const OrderLazy = lazy(() => import("pages/Order"));
const LogInLazy = lazy(() => import("pages/LogIn"));
const RegisterLazy = lazy(() => import("pages/Register"));
const SingleItemDetailsLazy = lazy(() => import("features/items/components/SingleItemDetails"));
const ItemsListWrapperLazy = lazy(() => import("pages/ItemsListWrapper"));
const RequireAuthLazy = lazy(() => import("layouts/RequireAuth"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/items/:itemsType",
        element: (
          <Suspense fallback={<LoadingSpinner text="Loading items" />}>
            <ItemsListWrapperLazy />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
        loader: () => import("pages/ItemsListWrapper").then((module) => module.loader()),
      },
      {
        path: "/:itemId",
        element: (
          <Suspense fallback={<LoadingSpinner text="Loading item" />}>
            <SingleItemDetailsLazy />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
        loader: ({ params }) =>
          import("features/items/components/SingleItemDetails").then((module) => module.loader({ params })),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<LoadingSpinner text="Loading..." />}>
            <LogInLazy />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/register-user",
        element: (
          <Suspense fallback={<LoadingSpinner text="Loading..." />}>
            <RegisterLazy />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/my-account",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <RequireAuthLazy>
              <MyAccountLayout />
            </RequireAuthLazy>
          </Suspense>
        ),
        errorElement: <ErrorPage />,
        children: [
          { path: "data", element: <AccountData />, loader: accountDataLoader },
          { path: "address", element: <AccountAddress />, loader: accountAddressLoader },
          { path: "orders", element: <AccountOrders />, loader: accountOrdersLoader },
          { path: "favorites", element: <AccountFavorites /> },
          { path: "returns", element: <AccountReturns /> },
        ],
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<LoadingSpinner text="Loading..." />}>
            <CartLazy />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/cart/checkout",
        element: (
          <Suspense fallback={<LoadingSpinner text="Loading..." />}>
            <OrderLazy />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
        loader: () => import("pages/Order").then((module) => module.loader()),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<LoadingSpinner text="Loading..." />}>
            <ContactLazy />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
let persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>,
);
