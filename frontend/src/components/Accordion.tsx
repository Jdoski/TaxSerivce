import { Button, Grid, GridContainer, Table } from "@trussworks/react-uswds";
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
                    <th scope="col">Form</th>
                    <th scope="col">Income</th>
                    <th scope="col">Taxs Due</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1099</td>
                    <td>$45,000</td>
                    <td>$4,302</td>
                  </tr>
                </tbody>
              </Table>

              <Button
                className="usa-button usa-button--accent-warm"
                style={{ maxHeight: 45, marginLeft: 10, marginTop: 40 }}
                type="button"
              >
                Edit
              </Button>
              <Button
                className="usa-button usa-button--secondary"
                style={{ maxHeight: 45, marginLeft: 10, marginTop: 40 }}
                type="button"
              >
                Delete
              </Button>
            </Grid>
          </GridContainer>
        </div>
      </div>
    </>
  );
}
