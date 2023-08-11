import {
  Button,
  ExtendedNav,
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

interface ReportsData {
  year: string;
  taxes_due: number;
  income: number;
}

export default function Reports() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isSignedIn = useSelector((state: any) => state.isLoggedIn);
  const email = useSelector((state: any) => state.email);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [returnData, setReturnData] = useState<ReportsData[]>([]);

  const returnsURL = `http://3.228.10.188:8080/users/returns/${email}`;

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

  useEffect(() => {
    fetch(returnsURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        filterData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function filterData(rawData: any) {
    const reports: any[] = [];
    rawData.forEach((element: any) => {
      reports.push({
        year: element["tax_year"],
        income: element["income"],
        taxes_due: element["tax_due"],
      });
      setReturnData(reports);
    });
    const newReport = {
      reports,
    };
    return newReport;
  }

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
            className="margin-x-neg-205 margin-bottom-2 flex-justify-center"
          >
            <h2 className="font-heading-xl margin-top-0 tablet:margin-bottom-0">
              Tax Returns
            </h2>
          </Grid>
          <h5
            style={{
              margin: 20,
              display: "flex",
              justifyContent: "center",
            }}
          >
            *All reports are estimates, not a substitute for officially filing
            tax returns
          </h5>
          <Grid className="flex-justify-center" row>
            <Button
              data-value="../generate-report"
              type="button"
              onClick={routeChange}
              style={{ marginBottom: 20 }}
            >
              New Report
            </Button>
          </Grid>
          <GridContainer>
            <Grid className="flex-justify-center" row>
              {returnData.map((data) => (
                <Accordion
                  year={data.year}
                  taxesDue={data.taxes_due}
                  income={data.income}
                />
              ))}
            </Grid>
          </GridContainer>
        </section>
      </main>
    </>
  );
}
