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
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/user/userSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import W2Form from "../components/W2Form";
import Form1099 from "../components/Form1099";
import { RootState } from "../app/store";

interface FormData {
  email: string;
  filingStatus: string;
  year: number;
  income: number;
  withheld: number;
  employer: string;
  employer_id: number;
  form: string;
}

interface TableData extends FormData {
  id: string;
}

export default function GenerateReport() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<TableData[]>([]);
  const email = useSelector((state: RootState) => state.email);
  const postReportURL = `http://localhost:8080/users/returns/create`;

  const handleFormSubmit = (formData: FormData) => {
    const newEntry: TableData = {
      id: new Date().getTime().toString(),
      ...formData,
    };
    console.log(formData);
    setTableData((prevData) => [...prevData, newEntry]);
  };

  const routeChange = (e: any) => {
    let path = e.currentTarget.getAttribute("data-value");
    navigate(path);
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

  function loopTableData(data: any) {}
  const formatedData = () => {
    console.log(tableData.length);
    const firstItem = tableData[0];
    const email = firstItem.email;
    const income = firstItem.income; // Convert to number if needed
    const withheld = firstItem.withheld; // Convert to number if needed
    const employer = firstItem.employer;
    const employer_id = firstItem.employer_id;
    const form = firstItem.form;
    const filing_status = firstItem.filingStatus;
    const tax_year = firstItem.year;
    const income_sources: any = [
      {
        type: form,
        income: income,
        withheld: withheld,
        employer: employer,
        employer_id: employer_id,
      },
    ];

    const data = {
      email,
      tax_year,
      filing_status,
      income_sources,
    };
    return JSON.stringify(data);
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //POST Request to db in order to send the reports
    const dataToSend = formatedData();
    console.log(dataToSend);
    fetch(postReportURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: dataToSend,
    }).catch((error) => console.error(error));
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
          <GridContainer>
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
              <Button
                data-value="../reports"
                type="button"
                onClick={routeChange}
                style={{ marginBottom: 20 }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid className="flex-justify-center" style={{ marginLeft: 150 }}>
              <Form onSubmit={handleSubmit}>
                <table className="usa-table">
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
                <Button style={{ margin: "auto" }} type="submit">
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
