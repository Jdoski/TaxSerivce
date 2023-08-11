import {
  Button,
  ExtendedNav,
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
    navigate("/login");
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

  const primaryNavItems = isSignedIn
    ? [
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
      ]
    : [
        <a key="primaryNav_2" href="" className="usa-nav__link">
          <span>{t("nav.welcome")}</span>
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
          style={{}}
        >
          {t("btn.login")}
        </Button>,
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
          <Grid row gap>
            <Grid tablet={{ col: 4 }}>
              <h2 className="font-heading-xl margin-top-0 tablet:margin-bottom-0">
                {t("home.quickly")}
              </h2>
            </Grid>
            <Grid tablet={{ col: 8 }} className="usa-prose">
              <p>{t("home.p2")}</p>
              <p>{t("home.p2b")}</p>
            </Grid>
          </Grid>
        </section>
        <section className="usa-graphic-list usa-section usa-section--dark">
          <GridContainer>
            <Grid row gap className="usa-graphic-list__row">
              <Grid tablet={{ col: true }} className="usa-media-block">
                <MediaBlockBody>
                  <h2 className="usa-graphic-list__heading">{t("home.p3h")}</h2>
                  <p>{t("home.p3")}</p>
                </MediaBlockBody>
              </Grid>
              <Grid tablet={{ col: true }} className="usa-media-block">
                <MediaBlockBody>
                  <h2 className="usa-graphic-list__heading">{t("home.p4h")}</h2>
                  <p>{t("home.p4")}</p>
                </MediaBlockBody>
              </Grid>
            </Grid>
            <Grid row gap className="usa-graphic-list__row">
              <Grid tablet={{ col: true }} className="usa-media-block">
                <MediaBlockBody>
                  <h2 className="usa-graphic-list__heading">{t("home.p5h")}</h2>
                  <p>{t("home.p5")}</p>
                </MediaBlockBody>
              </Grid>
              <Grid tablet={{ col: true }} className="usa-media-block">
                <MediaBlockBody>
                  <h2 className="usa-graphic-list__heading">{t("home.p6h")}</h2>
                  <p>{t("home.p6")}</p>
                </MediaBlockBody>
              </Grid>
            </Grid>
          </GridContainer>
        </section>

        <section id="test-section-id" className="usa-section">
          <GridContainer>
            <h2 className="font-heading-xl margin-y-0">{t("home.p7h")}</h2>
            <p className="usa-intro">{t("home.p7")}</p>
          </GridContainer>
        </section>
      </main>
    </>
  );
}
