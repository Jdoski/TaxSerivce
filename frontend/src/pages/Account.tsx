import {
  Button,
  ExtendedNav,
  Grid,
  Header,
  NavMenuButton,
  Title,
} from "@trussworks/react-uswds";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/user/userSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ToggleableTextInput from "../components/ToggleTextInput";
import { RootState } from "../app/store";

interface UserData {
  firstName: string;
  lastName: string;
  ssn: string;
  email: string;
  dateOfBirth: string;
  streetPrimary: string;
  state: string;
  city: string;
  zipcode: string;
}

export default function Account() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isSignedIn = useSelector((state: RootState) => state.isLoggedIn);
  const user = useSelector((state: RootState) => state.email);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isDisabled, setDisabled] = useState(true);
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    ssn: "",
    email: "",
    dateOfBirth: "",
    streetPrimary: "",
    state: "",
    city: "",
    zipcode: "",
  });

  const emailURL = `http://3.228.10.188:8080/users/email/${user}`;

  const toggleMobileNav = (): void => {
    setMobileNavOpen((prevOpen) => !prevOpen);
  };

  const handleSave = () => {
    sendData();
    setDisabled(true); // Disable the inputs after saving
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    // Update the corresponding state variable based on the input id
    switch (id) {
      case "first-name-value":
        setUserData((prevUserData) => ({
          ...prevUserData,
          firstName: value,
        }));
        break;
      case "last-name-value":
        setUserData((prevUserData) => ({
          ...prevUserData,
          lastName: value,
        }));
        break;
      case "ssn-value":
        setUserData((prevUserData) => ({
          ...prevUserData,
          ssn: value,
        }));
        break;
      case "email-value":
        setUserData((prevUserData) => ({
          ...prevUserData,
          email: value,
        }));
        break;
      case "dob-value":
        setUserData((prevUserData) => ({
          ...prevUserData,
          dateOfBirth: value,
        }));
        break;
      case "address-value":
        setUserData((prevUserData) => ({
          ...prevUserData,
          streetPrimary: value,
        }));
        break;
      case "city-value":
        setUserData((prevUserData) => ({
          ...prevUserData,
          city: value,
        }));
        break;
      case "state-value":
        setUserData((prevUserData) => ({
          ...prevUserData,
          state: value,
        }));
        break;
      case "zipcode-value":
        setUserData((prevUserData) => ({
          ...prevUserData,
          zipcode: value,
        }));
        break;
      default:
        break;
    }
  };

  const handleToggle = () => {
    setDisabled((prevDisabled) => !prevDisabled);
  };

  const routeChange = (e: any) => {
    let path = e.currentTarget.getAttribute("data-value");
    navigate(path);
  };

  const handleLogout = (e: any) => {
    e.preventDefault();
    dispatch(logout());
    navigate("../");
  };

  // Closes the mobile menu when resizing back over to the default value
  const handleResize = () => {
    if (window.innerWidth >= 1023) {
      setMobileNavOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, []);

  // RIP OAuth2.0 Working project. ETD August 8th 4:45 PM EST 2023

  //Get request that pulls the info from the user baded off of their email.
  //This is called on component start so the account page will be autoloaded with the users dated when they arrive
  useEffect(() => {
    fetch(emailURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //PUT request to update the account data through to the backend
  const sendData = () => {
    fetch("http://3.228.10.188:8080/users/user", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    console.log(JSON.stringify(userData));
  };

  const primaryNavItems = [
    <a
      key="primaryNav_0"
      href="http://s3-cmelendez.s3-website-us-east-1.amazonaws.com/"
      className="usa-nav__link"
    >
      <span>{t("nav.home")}</span>
    </a>,
    <a
      key="primaryNav_1"
      href="http://s3-cmelendez.s3-website-us-east-1.amazonaws.com/account"
      className="usa-nav__link"
    >
      <span>{t("nav.account")}</span>
    </a>,
    <a
      key="primaryNav_2"
      href="http://s3-cmelendez.s3-website-us-east-1.amazonaws.com/reports"
      className="usa-nav__link"
    >
      <span>{t("nav.reports")}</span>
    </a>,
  ];

  const secondaryNavItems = isSignedIn
    ? [
        <Button onClick={handleLogout} type="button" style={{ margin: 10 }}>
          <a key="secondaryNav_0" href="" style={{ color: "white" }}>
            {t("btn.logout")}
          </a>
        </Button>,
      ]
    : [
        <Button
          data-value="../login"
          onClick={routeChange}
          type="button"
          style={{ margin: 10 }}
        >
          <a key="secondaryNav_0" href="" style={{ color: "white" }}>
            {t("btn.login")}
          </a>
        </Button>,
      ];

  const editForm = isDisabled
    ? [
        <Button
          key="edit"
          style={{ margin: "auto", display: "flex", marginTop: 20 }}
          type="button"
          onClick={handleToggle}
        >
          Edit
        </Button>,
      ]
    : [
        <Grid row className="flex-justify-center" style={{ marginTop: 20 }}>
          <Button
            key={"save"}
            style={{ marginTop: 20 }}
            type="submit"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            key="cancel"
            style={{ marginTop: 20 }}
            type="button"
            onClick={handleToggle}
          >
            Cancel
          </Button>
        </Grid>,
      ];

  return (
    <>
      <div className={`usa-overlay ${mobileNavOpen ? "is-visible" : ""}`}></div>
      <Header extended>
        <div className="usa-navbar">
          <Title id="extended-logo">
            <a href="/" title="Home" aria-label="Home">
              SpecTaxular
            </a>
          </Title>
          <NavMenuButton
            label="Menu"
            onClick={toggleMobileNav}
            className="usa-menu-btn"
          />
        </div>
        <ExtendedNav
          aria-label="Primary navigation"
          primaryItems={primaryNavItems}
          secondaryItems={secondaryNavItems}
          onToggleMobileNav={toggleMobileNav}
          mobileExpanded={mobileNavOpen}
        ></ExtendedNav>
      </Header>

      <main id="main-content">
        <section className="grid-container usa-section">
          <Grid
            row
            gap
            className="margin-x-neg-205 margin-bottom-7 flex-justify-center"
          >
            <h2 className="font-heading-xl margin-top-0 tablet:margin-bottom-0">
              User Account
            </h2>
          </Grid>
          <Grid>
            <ToggleableTextInput
              label="First Name"
              id="first-name-value"
              type="text"
              defaultValue={userData.firstName}
              disabled={isDisabled}
              onChange={handleTextChange}
            />
            <ToggleableTextInput
              label="Last Name"
              id="last-name-value"
              type="text"
              defaultValue={userData.lastName}
              disabled={isDisabled}
              onChange={handleTextChange}
            />
            <ToggleableTextInput
              label="Social Security Number (SSN)"
              id="ssn-value"
              type="password"
              defaultValue={userData.ssn}
              disabled={isDisabled}
              onChange={handleTextChange}
            />
            <ToggleableTextInput
              label="Email Address"
              id="email-value"
              type="text"
              defaultValue={userData.email}
              disabled={isDisabled}
              onChange={handleTextChange}
            />
            <ToggleableTextInput
              label="Date of Birth (DOB)"
              id="dob-value"
              type="text"
              defaultValue={userData.dateOfBirth}
              disabled={isDisabled}
              onChange={handleTextChange}
            />
            <ToggleableTextInput
              label="Address"
              id="address-value"
              type="text"
              defaultValue={userData.streetPrimary}
              disabled={isDisabled}
              onChange={handleTextChange}
            />
            <ToggleableTextInput
              label="City"
              id="city-value"
              type="text"
              defaultValue={userData.city}
              disabled={isDisabled}
              onChange={handleTextChange}
            />
            <ToggleableTextInput
              label="State"
              id="state-value"
              type="text"
              defaultValue={userData.state}
              disabled={isDisabled}
              onChange={handleTextChange}
            />
            <ToggleableTextInput
              label="Zip Code"
              id="zipcode-value"
              type="text"
              defaultValue={userData.zipcode}
              disabled={isDisabled}
              onChange={handleTextChange}
            />
            {editForm}
          </Grid>
        </section>
      </main>
    </>
  );
}
