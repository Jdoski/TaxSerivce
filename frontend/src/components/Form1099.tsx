import {
  Button,
  ButtonGroup,
  Fieldset,
  Grid,
  GridContainer,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
  ModalRef,
  ModalToggleButton,
  Radio,
  TextInput,
} from "@trussworks/react-uswds";
import { ChangeEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface FormData {
  email: string;
  income: number;
  withheld: number;
  employer: string;
  employer_id: number;
  form: string;
  filingStatus: string;
  year: number;
}

interface ModalProps {
  onSubmit: (formData: FormData) => void;
}

export default function Form1099({ onSubmit }: ModalProps) {
  const modalRef = useRef<ModalRef>(null);
  const email = useSelector((state: RootState) => state.email);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionForm, setSelectedOptionForm] = useState("");
  const [formData, setFormData] = useState<FormData>({
    email: email,
    income: 0,
    withheld: 0,
    employer: "",
    employer_id: 0,
    form: "",
    filingStatus: "",
    year: 0,
  });

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormData((prevData) => ({ ...prevData, filingStatus: value }));
    setSelectedOption(value);
  };

  const handleOptionChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target);
    const { value } = event.target;
    setFormData((prevData) => ({ ...prevData, form: value }));
    console.log(value);
    setSelectedOptionForm(value);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div>
      <div>
        <ModalToggleButton modalRef={modalRef} opener>
          Add A New Form
        </ModalToggleButton>
        <Modal
          ref={modalRef}
          id="example-modal-1"
          aria-labelledby="modal-1-heading"
          aria-describedby="modal-1-description"
        >
          <ModalHeading id="modal-1-heading">
            Please fill out all the fields carefully
          </ModalHeading>
          <div className="usa-prose">
            <GridContainer>
              <Grid>
                <h2>Tax Return Questions</h2>
                <Label htmlFor={"form"}>
                  <h3>Select Form Type:</h3>
                </Label>
                <Fieldset legend="Form" legendStyle="srOnly">
                  <Radio
                    id="W2"
                    name="W2"
                    label="W2"
                    value="W2"
                    checked={selectedOptionForm === "W2"}
                    onChange={handleOptionChangeForm}
                  />
                  <Radio
                    id="1099"
                    name="1099"
                    label="1099"
                    value="1099"
                    checked={selectedOptionForm === "1099"}
                    onChange={handleOptionChangeForm}
                  />
                </Fieldset>
                <Label htmlFor={"status"}>
                  <h3>Select Filing Status:</h3>
                </Label>
                <Fieldset legend="FilingStatus" legendStyle="srOnly">
                  <Radio
                    id="single"
                    name="single"
                    label="Single"
                    value="single"
                    checked={selectedOption === "single"}
                    onChange={handleOptionChange}
                  />
                  <Radio
                    id="married-filing-jointly"
                    name="married-filing-jointly"
                    label="Married Filing Jointly"
                    value="married-filing-jointly"
                    checked={selectedOption === "married-filing-jointly"}
                    onChange={handleOptionChange}
                  />
                  <Radio
                    id="married-filing-seperately"
                    name="married-filing-seperately"
                    label="Married Filing Seperately"
                    value="married-filing-seperately"
                    checked={selectedOption === "married-filing-seperately"}
                    onChange={handleOptionChange}
                  />
                  <Radio
                    id="widow"
                    name="widow"
                    label="Widow"
                    value="widow"
                    checked={selectedOption === "widow"}
                    onChange={handleOptionChange}
                  />
                  <Radio
                    id="head-of-house"
                    name="head-of-house"
                    label="Head of House"
                    value="head-of-house"
                    checked={selectedOption === "head-of-house"}
                    onChange={handleOptionChange}
                  />
                </Fieldset>
                <Label htmlFor={"year"}>
                  <h3>Year</h3>
                </Label>
                <TextInput
                  id="year"
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleInputChange}
                />
                <Label htmlFor="income">
                  <h3>Income</h3>
                </Label>
                <TextInput
                  id="income"
                  name="income"
                  type="number"
                  value={formData.income}
                  onChange={handleInputChange}
                />

                <Label htmlFor="withheld">
                  <h3>Withheld</h3>
                </Label>
                <TextInput
                  id="number"
                  name="withheld"
                  type="number"
                  value={formData.withheld}
                  onChange={handleInputChange}
                />

                <Label htmlFor="employer">
                  <h3>Employer</h3>
                </Label>
                <TextInput
                  type="text"
                  name="employer"
                  id="Employer"
                  value={formData.employer}
                  onChange={handleInputChange}
                />

                <Label htmlFor="employer_id">
                  <h3>Employer ID</h3>
                </Label>
                <TextInput
                  type="number"
                  name="employer_id"
                  id="employer_id"
                  value={formData.employer_id}
                  onChange={handleInputChange}
                />
              </Grid>
            </GridContainer>
          </div>
          <ModalFooter>
            <ButtonGroup className="flex-justify-center">
              <Button type="submit" onClick={handleSubmit}>
                Submit
              </Button>
              <ModalToggleButton modalRef={modalRef} closer>
                Continue without saving
              </ModalToggleButton>
            </ButtonGroup>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}
