// utils
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import firestoreDB from "utils/firebaseConfig";

// components
import FormInputElement from "./FormInputElement";
import LoadingSpinner from "components/ui/LoadingSpinner";
import UniversalButton from "components/ui/UniversalButton";

// styles
import styles from "./AccountEditAddressForm.module.css";

function AccountEditAddressForm({ onSetIsEditing, onShowModal }) {
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
    loggedInUserData = userData;
  }

  const [values, setValues] = useState({
    address: loggedInUserData?.address || "",
    county: loggedInUserData?.county || "",
    city: loggedInUserData?.city || "",
    zipCode: loggedInUserData?.zipCode || "",
  });

  const inputs = [
    {
      id: "address",
      name: "address",
      type: "text",
      label: "Address",
      errorMessage: "Address field must not be empty",
      required: true,
    },
    {
      id: "county",
      name: "county",
      type: "select",
      label: "County",
      options: [
        { id: "Alba", value: "Alba" },
        { id: "Arad", value: "Arad" },
        { id: "Arges", value: "Arges" },
        { id: "Bacau", value: "Bacau" },
        { id: "Bihor", value: "Bihor" },
        { id: "Bistrita-Nasaud", value: "Bistrita-Nasaud" },
        { id: "Botosani", value: "Botosani" },
        { id: "Brasov", value: "Brasov" },
        { id: "Braila", value: "Braila" },
        { id: "Bucuresti", value: "Bucuresti" },
        { id: "Buzau", value: "Buzau" },
        { id: "Caras-Severin", value: "Caras-Severin" },
        { id: "Calarasi", value: "Calarasi" },
        { id: "Cluj", value: "Cluj" },
        { id: "Constanta", value: "Constanta" },
        { id: "Covasna", value: "Covasna" },
        { id: "Dambovita", value: "Dambovita" },
        { id: "Dolj", value: "Dolj" },
        { id: "Galati", value: "Galati" },
        { id: "Giurgiu", value: "Giurgiu" },
        { id: "Gorj", value: "Gorj" },
        { id: "Harghita", value: "Harghita" },
        { id: "Hunedoara", value: "Hunedoara" },
        { id: "Ialomita", value: "Ialomita" },
        { id: "Iasi", value: "Iasi" },
        { id: "Ilfov", value: "Ilfov" },
        { id: "Maramures", value: "Maramures" },
        { id: "Mehedinti", value: "Mehedinti" },
        { id: "Mures", value: "Mures" },
        { id: "Neamt", value: "Neamt" },
        { id: "Olt", value: "Olt" },
        { id: "Prahova", value: "Prahova" },
        { id: "Satu Mare", value: "Satu Mare" },
        { id: "Salaj", value: "Salaj" },
        { id: "Sibiu", value: "Sibiu" },
        { id: "Suceava", value: "Suceava" },
        { id: "Teleorman", value: "Teleorman" },
        { id: "Timis", value: "Timis" },
        { id: "Tulcea", value: "Tulcea" },
        { id: "Vaslui", value: "Vaslui" },
        { id: "Valcea", value: "Valcea" },
        { id: "Vrancea", value: "Vrancea" },
      ],
      required: true,
    },
    {
      id: "city",
      name: "city",
      type: "text",
      label: "City",
      errorMessage: "City field must not be empty",
      required: true,
    },
    {
      id: "zipCode",
      name: "zipCode",
      type: "text",
      label: "Zip/Postal Code",
      errorMessage: "Zip code must contain exatclty 6 digits",
      pattern: "^[0-9]{6}$",
      required: true,
    },
  ];

  function handleInputChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const docRef = doc(firestoreDB, "users", currentUserId, "userAddress", "address");
      const payload = values;
      await setDoc(docRef, payload);

      onSetIsEditing(false);

      navigate("/my-account/address");
      onShowModal();
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }

  return (
    <form
      className={styles["account-address-form"]}
      onSubmit={handleSubmit}
    >
      <div className={styles.inputs}>
        {inputs.map((input) => (
          <FormInputElement
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={handleInputChange}
            errorMessage={input.errorMessage}
            required={input.required}
          />
        ))}
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.actions}>
          <UniversalButton type="submit">Apply changes</UniversalButton>
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
      {error && <p className={styles["error-text"]}>{error.message}</p>}
    </form>
  );
}

export default AccountEditAddressForm;
