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
import { logout } from "../features/userSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Home() {
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
                    Graphic headings can vary.
                  </h2>
                  <p>
                    Graphic headings can be used a few different ways, depending
                    on what your landing page is for. Highlight your values,
                    specific program areas, or results.
                  </p>
                </MediaBlockBody>
              </Grid>
              <Grid tablet={{ col: true }} className="usa-media-block">
                <MediaBlockBody>
                  <h2 className="usa-graphic-list__heading">
                    Stick to 6 or fewer words.
                  </h2>
                  <p>
                    Keep body text to about 30 words. They can be shorter, but
                    try to be somewhat balanced across all four. It creates a
                    clean appearance with good spacing.
                  </p>
                </MediaBlockBody>
              </Grid>
            </Grid>
            <Grid row gap className="usa-graphic-list__row">
              <Grid tablet={{ col: true }} className="usa-media-block">
                <MediaBlockBody>
                  <h2 className="usa-graphic-list__heading">
                    Never highlight anything without a goal.
                  </h2>
                  <p>
                    For anything you want to highlight here, understand what
                    your users know now, and what activity or impression you
                    want from them after they see it.
                  </p>
                </MediaBlockBody>
              </Grid>
              <Grid tablet={{ col: true }} className="usa-media-block">
                <MediaBlockBody>
                  <h2 className="usa-graphic-list__heading">
                    Could also have 2 or 6.
                  </h2>
                  <p>
                    In addition to your goal, find out your users’ goals. What
                    do they want to know or do that supports your mission? Use
                    these headings to show these.
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
            <a href="#" className="usa-button usa-button--big">
              Call to action
            </a>
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
