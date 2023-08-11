import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../app/features/user/userSlice";

import { RootState } from "../app/store";
import { FormEvent, useState } from "react";
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

interface UserData {
  email: string;
  password: string;
}

export default function CreateAccount() {
  const isSignedIn = useSelector((state: RootState) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCreateAccount, setShowCreateAccount] = useState(true);
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    // Update the corresponding state variable based on the input id
    switch (id) {
      case "email":
        setUserData((prevUserData) => ({
          ...prevUserData,
          email: value,
        }));
        break;
      case "password":
        setUserData((prevUserData) => ({
          ...prevUserData,
          password: value,
        }));
        break;
      default:
        break;
    }
  };
  const handleCreateAccount = () => {
    fetch("http://localhost:8080/users/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    console.log(JSON.stringify(userData));
  };
  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData);
    fetch("http://localhost:8080/users/check-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        console.log("before response");
        if (response.ok) {
          console.log(response);
          dispatch(login(userData.email));
          navigate("../");
        } else {
          console.log("Response Not Okay");
          throw new Error("Login failed");
        }
      })
      .catch((error) => {
        console.error(error), dispatch(logout());
      });
  };

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
            <Form onSubmit={handleCreateAccount}>
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
                  Email address
                  <abbr title="required" className="usa-label--required">
                    *
                  </abbr>
                </Label>
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={userData.email}
                  onChange={handleTextChange}
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
                  defaultValue={userData.password}
                  onChange={handleTextChange}
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
                  id="password-create-account"
                  name="password"
                  defaultValue={userData.password}
                  onChange={handleTextChange}
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
              <Form onSubmit={handleSignIn}>
                <Fieldset legend="Access your account" legendStyle="large">
                  <Label htmlFor="email">Email address</Label>

                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={userData.email}
                    onChange={handleTextChange}
                    autoCapitalize="off"
                    autoCorrect="off"
                    required={true}
                  />

                  <Label htmlFor="email">Password</Label>
                  <TextInput
                    id="password"
                    name="password"
                    defaultValue={userData.password}
                    onChange={handleTextChange}
                    type={showPassword ? "text" : "password"}
                    autoCapitalize="off"
                    autoCorrect="off"
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
