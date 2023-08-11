import {
  Button,
  Form,
  Grid,
  GridContainer,
  Header,
  Title,
} from "@trussworks/react-uswds";
import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Form1099 from "../components/Form1099";

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
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<TableData[]>([]);
  const postReportURL = `http://3.228.10.188:8080/users/returns/create`;

  //updating the table of forms and persisting the previous forms added
  const handleFormSubmit = (formData: FormData) => {
    const newEntry: TableData = {
      id: new Date().getTime().toString(),
      ...formData,
    };
    setTableData((prevData) => [...prevData, newEntry]);
  };

  //helper function to redirect user baded on attribute passed in
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

  //adds listener to help fix a bug in the responsive resizing
  /**
   * Trussworks mobile button if opened will remained open if user resizing the screen, preventing the user from using the site
   * until they resize the screen and manually close it.
   *
   * This event listener will watch for when the screen grows past that point and force close the mobile nav
   *
   * */

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

  /**
   *
   * Responsible for looping over the many differnt forms supplied to by the user.
   *
   * The model of the returns in the backend were very specific, this was needed in order to properly match how the backend accpets data for the posts requests
   *
   * Function loops through all the forms and pushes the necessary infomration into the income_sources array. This array is what stores the actualy W2/1099 forms
   * and is what is used for calculating the deductions.
   *
   */
  function loopTableData(newTableData: any) {
    console.log(newTableData);
    const email = newTableData[0].email;
    const filing_status = newTableData[0].filingStatus;
    const tax_year = newTableData[0].year;
    const income_sources: any[] = [];

    newTableData.forEach((element: any) => {
      console.log("ELEMENT: " + element);
      const income = element.income;
      const withheld = element.withheld;
      const employer = element.employer;
      const employer_id = element.employer_id;
      const form = element.form;
      income_sources.push({
        type: form,
        income: income,
        withheld: withheld,
        employer: employer,
        employer_id: employer_id,
      });
    });
    const data = {
      email,
      tax_year,
      filing_status,
      income_sources,
    };
    console.log("LOOP FUNCTION: " + data);
    return data;
  }
  //sends the formatted data from the loopTableData to the backend through the request body
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(postReportURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loopTableData(tableData)),
    }).catch((error) => console.error(error));
  }

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
                Back
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
                    {/* Mapping all of the different forms to the table to show before submitting */}
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
