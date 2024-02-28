// utils
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

// styles
import styles from "./MyAccountLayout.module.css";
import AccountSectionsNav from "features/account/components/AccountSectionsNav";
import ToggleDropdownItem from "components/ui/ToggleDropdownItem";

function MyAccountLayout() {
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isUserLoggedIn) {
    return <Navigate to="/login" />;
  }

  // when the viewport is higher than 768px, the account menu should be expanded
  const width = window.innerWidth;
  const isAcocuntMenuVisible = width > 768;

  return (
    <>
      <h1 className={styles["page-title"]}>My Account</h1>
      <div className={styles["account-container"]}>
        <div className={styles.left}>
          <ToggleDropdownItem
            isItemExpanded={isAcocuntMenuVisible}
            title="Account sections"
            titleClass={styles["account-title"]}
          >
            <AccountSectionsNav />
          </ToggleDropdownItem>
        </div>
        <section className={styles.right}>
          <Outlet />
        </section>
      </div>
    </>
  );
}

export default MyAccountLayout;
