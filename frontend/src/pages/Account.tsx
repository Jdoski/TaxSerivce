import {
  Address,
  Button,
  ExtendedNav,
  Footer,
  FooterNav,
  Grid,
  GridContainer,
  Header,
  Label,
  MediaBlockBody,
  NavMenuButton,
  Table,
  TextInput,
  Title,
} from "@trussworks/react-uswds";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../features/userSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ToggleableTextInput from "../components/ToggleTextInput";

export default function Account() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isSignedIn = useSelector((state: any) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const URL = "http://localhost:5173/";

  const toggleMobileNav = (): void => {
    setMobileNavOpen((prevOpen) => !prevOpen);
  };

  const routeChange = () => {
    let path = "login";
    navigate(path);
  };

  const handleLogout = (e: any) => {
    e.preventDefault();
    dispatch(logout());
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

  const lng = navigator.language;

  const primaryNavItems = isSignedIn
    ? [
        <a
          key="primaryNav_0"
          href="http://localhost:5173/"
          className="usa-nav__link"
        >
          <span>{t("nav.home")}</span>
        </a>,
        <a
          key="primaryNav_1"
          href="http://localhost:5173/account"
          className="usa-nav__link"
        >
          <span>{t("nav.account")}</span>
        </a>,
        <a key="primaryNav_2" className="usa-nav__link">
          <span>{t("nav.reports")}</span>
        </a>,
      ]
    : [
        <a
          key="primaryNav_0"
          href="http://localhost:5173/"
          className="usa-nav__link"
        >
          <span>{t("nav.home")}</span>
        </a>,
        <a key="primaryNav_1" className="usa-nav__link">
          <span>{t("nav.about")}</span>
        </a>,
        <a key="primaryNav_2" className="usa-nav__link">
          <span>{t("nav.contact")}</span>
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
          data-value="login"
          onClick={routeChange}
          type="button"
          style={{ margin: 10 }}
        >
          <a key="secondaryNav_0" href="" style={{ color: "white" }}>
            {t("btn.login")}
          </a>
        </Button>,
      ];

  const returnToTop = (
    <GridContainer className="usa-footer__return-to-top">
      <a href="#">Return to top</a>
    </GridContainer>
  );

  const footerPrimary = (
    <FooterNav
      aria-label="Footer navigation"
      size="medium"
      links={Array(5).fill(
        <a href="" className="usa-footer__primary-link">
          Primary link
        </a>
      )}
    />
  );

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
          <ToggleableTextInput
            label="First Name"
            id="first-name-value"
            type="text"
            defaultValue="First Name"
          />
          <ToggleableTextInput
            label="Last Name"
            id="last-name-value"
            type="text"
            defaultValue="Last Name"
          />
          <ToggleableTextInput
            label="Social Security Number (SSN)"
            id="ssn-value"
            type="password"
            defaultValue="000-00-0000"
          />
          <ToggleableTextInput
            label="Email Address"
            id="email-value"
            type="text"
            defaultValue="default@gmail.com"
          />
          <ToggleableTextInput
            label="Date of Birth (DOB)"
            id="dob-value"
            type="text"
            defaultValue="01/01/2001"
          />
          <ToggleableTextInput
            label="Address"
            id="address-value"
            type="text"
            defaultValue="50 Drury Lane"
          />
          <ToggleableTextInput
            label="City"
            id="city-value"
            type="text"
            defaultValue="Far Far Away"
          />
          <ToggleableTextInput
            label="State"
            id="state-value"
            type="text"
            defaultValue="Forever Land"
          />
          <ToggleableTextInput
            label="Zip Code"
            id="zip-code-value"
            type="number"
            defaultValue="77777"
          />
        </section>
      </main>

      <Footer
        returnToTop={returnToTop}
        primary={footerPrimary}
        secondary={null}
      />
    </>
  );
}
