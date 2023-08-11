import { Grid, GridContainer, Table } from "@trussworks/react-uswds";
import { useState } from "react";

export default function Accordion(props: any) {
  const [accordionOpen, setAccordionOpen] = useState(false);

  const toggleAccordion = (): void => {
    setAccordionOpen((prevOpen) => !prevOpen);
  };
  return (
    <>
      <div
        className="usa-accordion usa-accordion--multiselectable"
        data-allow-multiple
      >
        <h4 className="usa-accordion__heading">
          <button
            type="button"
            className="usa-accordion__button"
            aria-expanded={accordionOpen}
            aria-controls="a1"
            onClick={toggleAccordion}
          >
            {props.year} Tax Returns
          </button>
        </h4>
        <div
          id="a1"
          className="usa-accordion__content usa-prose"
          hidden={!accordionOpen}
        >
          <GridContainer>
            <Grid row className="flex-justify-center">
              <Table bordered className="usa-table">
                <thead>
                  <tr>
                    <th scope="col">Year</th>
                    <th scope="col">Income</th>
                    <th scope="col">Taxes Due</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{props.year}</td>
                    <td>${props.income}</td>
                    <td>${props.taxesDue}</td>
                  </tr>
                </tbody>
              </Table>
            </Grid>
          </GridContainer>
        </div>
      </div>
    </>
  );
}
