// utils
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import firestoreDB from "utils/firebaseConfig";

// components
import LoadingSpinner from "components/ui/LoadingSpinner";
import UniversalButton from "components/ui/UniversalButton";

// styles
import styles from "./AccountAddressForm_v1.module.css";

function AccountAddressForm({ onSetIsEditing, onShowModal }) {
  const userData = useLoaderData();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // get the current logged in user id
  const authState = localStorage.getItem("persist:root") ? JSON.parse(localStorage.getItem("persist:root")).auth : null;
  const currentUserId = authState ? JSON.parse(authState).userId : null;

  let loggedInUserData;

  if (!userData) {
    loggedInUserData = undefined;
  } else {
    loggedInUserData = userData[0];
  }

  // values for the inputs
  const [address, setAddress] = useState(loggedInUserData?.address || "");
  const [addressHasError, setAddressHasError] = useState(false);

  const [county, setCounty] = useState(loggedInUserData?.county || "");

  const [city, setCity] = useState(loggedInUserData?.city || "");
  const [cityHasError, setCityHasError] = useState(false);

  const [zipCode, setZipCode] = useState(loggedInUserData?.zipCode || "");
  const [zipCodeHasError, setZipCodeHasError] = useState(false);

  // handle input changes
  // address input
  function handleAddressChange(event) {
    setAddress(event.target.value);

    if (event.target.value.trim() === "") {
      setAddressHasError(true);
    } else {
      setAddressHasError(false);
    }
  }

  // county input
  function handleCountyChange(event) {
    setCounty(event.target.value);
  }

  // city input
  function handleCityChange(event) {
    setCity(event.target.value);

    if (event.target.value.trim() === "") {
      setCityHasError(true);
    } else {
      setCityHasError(false);
    }
  }

  // zip code input
  function handleZipCodeChange(event) {
    setZipCode(event.target.value);

    if (event.target.value.trim() === "" || event.target.value.trim().length !== 6) {
      setZipCodeHasError(true);
    } else {
      setZipCodeHasError(false);
    }
  }

  let formIsValid;

  if (!addressHasError && !cityHasError && !zipCodeHasError) {
    formIsValid = true;
  }

  const modifiedAddressData = {
    ...loggedInUserData,
    address: address,
    county: county,
    city: city,
    zipCode: zipCode,
  };

  async function handleEditAddressSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const docRef = doc(firestoreDB, "users", currentUserId, "userAddress", "address");
      const payload = modifiedAddressData;
      await setDoc(docRef, payload);

      onSetIsEditing(false);

      navigate("/my-account/address");
      onShowModal();
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }

  // classes for invalid inputs
  const addressClass = addressHasError ? `${styles.input} ${styles.invalid}` : styles.input;
  const cityClass = cityHasError ? `${styles.input} ${styles.invalid}` : styles.input;
  const zipCodeClass = zipCodeHasError ? `${styles.input} ${styles.invalid}` : styles.input;

  return (
    <form
      className={styles["edit-form"]}
      onSubmit={handleEditAddressSubmit}
    >
      <div className={styles.inputs}>
        <div className={styles["form-field"]}>
          <label htmlFor="account-data-address">
            Address <span>*</span>
          </label>
          <input
            className={addressClass}
            type="text"
            id="account-data-address"
            onChange={handleAddressChange}
            value={address}
            required
          />
          {addressHasError && <p className={styles["warning-text"]}>Please enter your full address</p>}
        </div>
        <div className={styles["form-field"]}>
          <label htmlFor="account-data-county">
            County <span>*</span>
          </label>
          <select
            id="account-data-county"
            onChange={handleCountyChange}
            value={county}
            required
          >
            <option>Alba</option>
            <option>Arad</option>
            <option>Arges</option>
            <option>Bacau</option>
            <option>Bihor</option>
            <option>Bistrita-Nasaud</option>
            <option>Botosani</option>
            <option>Brasov</option>
            <option>Braila</option>
            <option>Bucuresti</option>
            <option>Buzau</option>
            <option>Caras-Severin</option>
            <option>Calarasi</option>
            <option>Cluj</option>
            <option>Constanta</option>
            <option>Covasna</option>
            <option>Dambovita</option>
            <option>Dolj</option>
            <option>Galati</option>
            <option>Giurgiu</option>
            <option>Gorj</option>
            <option>Harghita</option>
            <option>Hunedoara</option>
            <option>Ialomita</option>
            <option>Iasi</option>
            <option>Ilfov</option>
            <option>Maramures</option>
            <option>Mehedinti</option>
            <option>Mures</option>
            <option>Neamt</option>
            <option>Olt</option>
            <option>Prahova</option>
            <option>Satu Mare</option>
            <option>Salaj</option>
            <option>Sibiu</option>
            <option>Suceava</option>
            <option>Teleorman</option>
            <option>Timis</option>
            <option>Tulcea</option>
            <option>Vaslui</option>
            <option>Valcea</option>
            <option>Vrancea</option>
          </select>
        </div>

        <div className={styles["form-field"]}>
          <label htmlFor="account-data-city">
            City <span>*</span>
          </label>
          <input
            className={cityClass}
            type="text"
            id="account-data-city"
            onChange={handleCityChange}
            value={city}
            required
          />
          {cityHasError && <p className={styles["warning-text"]}>Please enter a city</p>}
        </div>

        <div className={styles["form-field"]}>
          <label htmlFor="account-data-zip">
            Zip/Postal Code <span>*</span> (exactly 6 characters)
          </label>
          <input
            className={zipCodeClass}
            type="number"
            id="account-data-zip"
            onChange={handleZipCodeChange}
            value={zipCode}
            required
          />
          {zipCodeHasError && <p className={styles["warning-text"]}>Please enter a valid zip code</p>}
        </div>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.actions}>
          <UniversalButton
            type="submit"
            disabled={!formIsValid}
          >
            Apply changes
          </UniversalButton>
          <UniversalButton
            type="button"
            onClick={() => {
              window.location.reload();
              onSetIsEditing(false);
            }}
          >
            Cancel editing
          </UniversalButton>
        </div>
      )}
      {error && <p className={styles["warning-text"]}>{error.message}</p>}
    </form>
  );
}

export default AccountAddressForm;
