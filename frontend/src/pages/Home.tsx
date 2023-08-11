import {
  Button,
  ExtendedNav,
  Footer,
  FooterNav,
  Grid,
  GridContainer,
  Header,
  MediaBlockBody,
  NavMenuButton,
  Title,
} from "@trussworks/react-uswds";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/user/userSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isSignedIn = useSelector((state: any) => state.isLoggedIn);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const URL = "http://localhost:8080/users/user/64d0247ff92a0477212386d5";

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

  function getData() {
    fetch(URL, { credentials: "include", method: "get" })
      .then((data) => data.json())
      .then((data) => console.log(data));
  }

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
        <a
          key="primaryNav_2"
          href="http://localhost:5173/reports"
          className="usa-nav__link"
        >
          <span>{t("nav.reports")}</span>
        </a>,
      ]
    : [
        <a key="primaryNav_0" className="usa-nav__link">
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
          {t("btn.login")}
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
          <Grid row gap>
            <Grid tablet={{ col: 4 }}>
              <h2 className="font-heading-xl margin-top-0 tablet:margin-bottom-0">
                Quickly generate your federal tax returns
              </h2>
            </Grid>
            <Grid tablet={{ col: 8 }} className="usa-prose">
              <p>
                SpecTaxular is a free to use federal tax calulator. You can
                calculate how much in federal taxes you will owe based off a
                number of customisable fields.
              </p>
              <p>
                Each report will be saved to your account, allowing you to
                compare different reports so you can make decisions accordingly!
              </p>
            </Grid>
          </Grid>
        </section>
        <section className="usa-graphic-list usa-section usa-section--dark">
          <GridContainer>
            <Grid row gap className="usa-graphic-list__row">
              <Grid tablet={{ col: true }} className="usa-media-block">
                <MediaBlockBody>
                  <h2 className="usa-graphic-list__heading">
                    Fast
                  </h2>
                  <p>
                    Just provide the details for your 1099's or W2's
                    and get an immediate calculation of your taxes.
                  </p>
                </MediaBlockBody>
              </Grid>
              <Grid tablet={{ col: true }} className="usa-media-block">
                <MediaBlockBody>
                  <h2 className="usa-graphic-list__heading">
                    Convenient Reports
                  </h2>
                  <p>
                    Your reports are stored to your account so they
                    will be conveniently available to you whenever you need.
                  </p>
                </MediaBlockBody>
              </Grid>
            </Grid>
            <Grid row gap className="usa-graphic-list__row">
              <Grid tablet={{ col: true }} className="usa-media-block">
                <MediaBlockBody>
                  <h2 className="usa-graphic-list__heading">
                    Easily Accessible
                  </h2>
                  <p>
                    Our simplified user interface makes it easy to 
                    create an account, login to an account, and get
                    started with calculating your taxes.
                  </p>
                </MediaBlockBody>
              </Grid>
              <Grid tablet={{ col: true }} className="usa-media-block">
                <MediaBlockBody>
                  <h2 className="usa-graphic-list__heading">
                    Control Over Your Information
                  </h2>
                  <p>
                    You handle the information on your account and can
                    edit it at any time.
                  </p>
                </MediaBlockBody>
              </Grid>
            </Grid>
          </GridContainer>
        </section>

        <section id="test-section-id" className="usa-section">
          <GridContainer>
            <h2 className="font-heading-xl margin-y-0">Section heading</h2>
            <p className="usa-intro">
              Everything up to this point should help people understand your
              agency or project: who you are, your goal or mission, and how you
              approach it. Use this section to encourage them to act. Describe
              why they should get in touch here, and use an active verb on the
              button below. “Get in touch,” “Learn more,” and so on.
            </p>
            <Button type="button" onClick={getData}>
              Get Data
            </Button>
          </GridContainer>
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
