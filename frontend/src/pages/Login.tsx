import { useDispatch, useSelector } from "react-redux";
import { login } from "../app/features/user/userSlice";

import { RootState } from "../app/store";
import { useState } from "react";
import {
  Button,
  Fieldset,
  Form,
  Grid,
  GridContainer,
  Header,
  Label,
  TextInput,
  Title,
} from "@trussworks/react-uswds";
import { useNavigate } from "react-router";

export default function CreateAccount() {
  const isSignedIn = useSelector((state: RootState) => state.isLoggedIn);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCreateAccount, setShowCreateAccount] = useState(true);
  const handleLogin = (e: any) => {
    dispatch(login(user));
  };

  const mockSubmit = () => {};
  const checkboxLabel = () => {};

  const [showPassword, setShowPassword] = useState(false);

  const selectLogin = showCreateAccount
    ? [
        <Grid
          col={12}
          mobileLg={{ col: 10 }}
          tablet={{ col: 8 }}
          desktop={{ col: 6 }}
          style={{ margin: "auto" }}
        >
          <div className="bg-white padding-y-3 padding-x-5 border border-base-lighter">
            <h1 className="margin-bottom-0">Create account</h1>
            <Form onSubmit={mockSubmit}>
              <Fieldset legend="Get started with an account.">
                <p>
                  <abbr
                    title="required"
                    className="usa-hint usa-hint--required"
                  >
                    *
                  </abbr>{" "}
                  indicates a required field.
                </p>

                <Label htmlFor="email">
                  Email address{" "}
                  <abbr title="required" className="usa-label--required">
                    *
                  </abbr>
                </Label>
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  autoCapitalize="off"
                  autoCorrect="off"
                  required={true}
                />

                <Label htmlFor="password-create-account">
                  Create password{" "}
                  <abbr title="required" className="usa-label--required">
                    *
                  </abbr>
                </Label>
                <TextInput
                  id="password-create-account"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoCapitalize="off"
                  autoCorrect="off"
                  required={true}
                />

                <p className="usa-form__note">
                  <a
                    title="Show password"
                    className="usa-show-password"
                    aria-controls="password-create-account password-create-account-confirm"
                    onClick={(): void =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? "Hide password" : "Show password"}
                  </a>
                </p>

                <Label htmlFor="password-create-account-confirm">
                  Re-type password{" "}
                  <abbr title="required" className="usa-label--required">
                    *
                  </abbr>
                </Label>
                <TextInput
                  id="password-create-account-confirm"
                  name="password-confirm"
                  type={showPassword ? "text" : "password"}
                  autoCapitalize="off"
                  autoCorrect="off"
                  required={true}
                />
                <Button type="submit">Create account</Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowCreateAccount(!showCreateAccount);
                  }}
                >
                  Existing user?
                </Button>
              </Fieldset>
            </Form>
          </div>
        </Grid>,
      ]
    : [
        <Grid row={true} className="flex-justify-center">
          <Grid col={12} tablet={{ col: 8 }} desktop={{ col: 6 }}>
            <div className="bg-white padding-y-3 padding-x-5 border border-base-lighter">
              <h1 className="margin-bottom-0">Sign in</h1>
              <Form onSubmit={mockSubmit}>
                <Fieldset legend="Access your account" legendStyle="large">
                  <Label htmlFor="email">Email address</Label>

                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    autoCorrect="off"
                    autoCapitalize="off"
                    required={true}
                  />

                  <Label htmlFor="email">Password</Label>
                  <TextInput
                    id="password-sign-in"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoCorrect="off"
                    autoCapitalize="off"
                    required={true}
                  />
                  <p
                    style={{ margin: "auto", width: "100%" }}
                    className="usa-form__note"
                  >
                    <a
                      title="Show password"
                      className="usa-show-password"
                      aria-controls="password-create-account password-create-account-confirm"
                      onClick={(): void =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? "Hide password" : "Show password"}
                    </a>
                  </p>

                  <Button
                    type="submit"
                    style={{
                      margin: "auto",
                      marginLeft: 50,
                      marginRight: 10,
                    }}
                  >
                    Sign in
                  </Button>
                  <Button
                    type="submit"
                    style={{ margin: "auto" }}
                    onClick={() => {
                      setShowCreateAccount(!showCreateAccount);
                    }}
                  >
                    New user?
                  </Button>
                </Fieldset>
              </Form>
            </div>
          </Grid>
        </Grid>,
      ];

  return (
    <>
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>

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
        <div className="bg-base-lightest">
          <GridContainer className="usa-section flex-justify-center">
            {selectLogin}
          </GridContainer>
        </div>
      </main>
    </>
  );
}
