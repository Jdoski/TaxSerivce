import {
  Button,
  ExtendedNav,
  Footer,
  FooterNav,
  Grid,
  GridContainer,
  Header,
  NavMenuButton,
  Title,
} from "@trussworks/react-uswds";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/user/userSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Accordion from "../components/Accordion";
import W2Form from "../components/W2Form";
import Form1099 from "../components/Form1099";

export default function GenerateReport() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isSignedIn = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const URL = "http://localhost:5173/";

  const toggleMobileNav = (): void => {
    setMobileNavOpen((prevOpen) => !prevOpen);
  };

  const routeChange = (e: any) => {
    let path = e.currentTarget.getAttribute("data-value");
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
        </div>
      </Header>

      <main id="main-content">
        <section className="grid-container usa-section">
          <Grid
            row
            gap
            className="margin-x-neg-205 margin-bottom-2 flex-justify-center"
          >
            <h2 className="font-heading-xl margin-top-0 tablet:margin-bottom-0">
              Generate Report
            </h2>
          </Grid>
          <Grid className="flex-justify-center" row>
            <Form1099 name={"Add 1099 Form"} />
            <W2Form name={"Add W2 From"} />
            <Button
              data-value="../reports"
              type="button"
              onClick={routeChange}
              style={{ marginBottom: 20 }}
            >
              Cancel
            </Button>
          </Grid>
        </section>
      </main>
    </>
  );
}
