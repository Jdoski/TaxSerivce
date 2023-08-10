import {
  Button,
  ComboBox,
  Dropdown,
  ExtendedNav,
  Footer,
  FooterNav,
  Form,
  Grid,
  GridContainer,
  Header,
  Label,
  NavMenuButton,
  Table,
  TextInput,
  Title,
} from "@trussworks/react-uswds";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/user/userSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import W2Form from "../components/W2Form";
import Form1099 from "../components/Form1099";

interface FormData {
  income: number;
  withheld: number;
  employer: string;
  employer_id: number;
  form: string;
  filingStatus: string;
  year: number;
}

interface TableData extends FormData {
  id: string;
}

export default function GenerateReport() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isSignedIn = useSelector((state: any) => state.isLoggedIn);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const URL = "http://localhost:5173/";
  const [tableData, setTableData] = useState<TableData[]>([]);

  const handleFormSubmit = (formData: FormData) => {
    const newEntry: TableData = {
      id: new Date().getTime().toString(),
      ...formData,
    };
    setTableData((prevData) => [...prevData, newEntry]);
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

  function handleSubmit() {
    //POST Request to db in order to send the reports
  }
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
          <GridContainer className="flex-justify-center">
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
              <Form1099 onSubmit={handleFormSubmit} />
              <W2Form onSubmit={handleFormSubmit} />
              <Button
                data-value="../reports"
                type="button"
                onClick={routeChange}
                style={{ marginBottom: 20 }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid className="flex-justify-center">
              <Form onSubmit={handleSubmit} style={{ margin: "auto" }}>
                <table
                  className="usa-table flex-justify-start"
                  style={{ width: "250%", marginTop: 30 }}
                >
                  <thead>
                    <tr>
                      <th scope="col">Form</th>
                      <th scope="col">Filing Status</th>
                      <th scope="col">Year</th>
                      <th scope="col">Income</th>
                      <th scope="col">Withheld</th>
                      <th scope="col">Employer</th>
                      <th scope="col">Employer ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((data) => (
                      <tr key={data.id}>
                        <td>{data.form}</td>
                        <td>{data.filingStatus}</td>
                        <td>{data.year}</td>
                        <td>${data.income}</td>
                        <td>${data.withheld}</td>
                        <td>{data.employer}</td>
                        <td>{data.employer_id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Button type="submit" style={{ marginLeft: 75 }}>
                  Submit Report
                </Button>
              </Form>
            </Grid>
          </GridContainer>
        </section>
      </main>
    </>
  );
}
