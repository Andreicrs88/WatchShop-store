// utils
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { database } from "../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { authActions } from "../store/auth-slice";

// components
import MainHeader from "./header/MainHeader";
import Footer from "./footer/Footer";
import NewsletterBar from "features/newsletter/NewsletterBar";
import ScrollToTop from "utils/ScrollToTop";

function RootLayout() {
  const dispatchFn = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(database, (user) => {
      // if the user is logged in, persist the state (store the credentials in local storage)
      if (user) {
        dispatchFn(
          authActions.storeCredentials({
            userId: user.uid,
          }),
        );
        dispatchFn(authActions.setIsLoggedIn(true));
      } else {
        // if no user is logged in, store null in local storage
        dispatchFn(authActions.removeCredentials());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatchFn]);

  return (
    <>
      <ScrollToTop />
      <MainHeader />
      <main>
        <Outlet />
      </main>
      <NewsletterBar />
      <Footer />
    </>
  );
}

export default RootLayout;
