import {
  ButtonGroup,
  Grid,
  GridContainer,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
  ModalRef,
  ModalToggleButton,
} from "@trussworks/react-uswds";
import { useRef } from "react";

export default function W2Form(props: any) {
  const modalRef = useRef<ModalRef>(null);

  return (
    <div>
      <div>
        <ModalToggleButton modalRef={modalRef} opener>
          {props.name}
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
              <Grid></Grid>
            </GridContainer>
          </div>
          <ModalFooter>
            <ButtonGroup>
              <ModalToggleButton modalRef={modalRef} closer>
                Continue without saving
              </ModalToggleButton>
              <ModalToggleButton
                modalRef={modalRef}
                closer
                unstyled
                className="padding-105 text-center"
              >
                Go back
              </ModalToggleButton>
            </ButtonGroup>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}
