// utils
import { Link } from "react-router-dom";

// components
import MainNavigation from "layouts/navigation/MainNavigation";
import SearchBar from "features/search/components/SearchBar";
import UserNav from "layouts/navigation/UserNav";

// styles
import styles from "./MainHeader.module.css";

function MainHeader() {
  return (
    <header className={styles.header}>
      <div className={styles["header-banner"]}>
        <p>
          Save an <span>extra 25% off</span> with code <span>extra25</span>
        </p>
      </div>
      <div className={styles["header-main"]}>
        <div className={styles["logo-container"]}>
          <Link to="/">
            <img
              src="/images/logoImg.png"
              alt="logo of a clock"
            />
          </Link>
        </div>
        <div className={styles["search-wrapper"]}>
          <SearchBar />
        </div>
        <div className={styles["usernav-wrapper"]}>
          <UserNav />
        </div>
        <nav className={styles["header-navigation"]}>
          <MainNavigation />
        </nav>
      </div>
    </header>
  );
}

export default MainHeader;
