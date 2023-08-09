import {
  Button,
  Grid,
  GridContainer,
  Header,
  Title,
} from "@trussworks/react-uswds";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../app/features/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const isSignedIn = useSelector((state: any) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: any) => {
    window.location.replace("http://localhost:8080/signin");
    dispatch(login());
  };

  return (
    <>
      <Header extended>
        <div className="usa-navbar">
          <Title id="extended-logo">
            <a href="/" title="Home" aria-label="Home">
              SpecTaxular{" "}
            </a>
          </Title>
        </div>
      </Header>

      <main id="main-content">
        <div className="bg-base-lightest">
          <GridContainer className="usa-section">
            <Grid
              row={true}
              className="margin-x-neg-205 margin-bottom-7 flex-justify-center"
            >
              <Grid
                col={12}
                mobileLg={{ col: 10 }}
                tablet={{ col: 8 }}
                desktop={{ col: 6 }}
                className="padding-x-205 margin-bottom-7"
              >
                <h1 className="desktop:display-none font-sans-lg margin-bottom-4 tablet:margin-top-neg-3">
                  Sign into your google account in order to access the site
                </h1>

                <div className="bg-white padding-y-3 padding-x-5 border border-base-lighter">
                  <h1 className="margin-bottom-1">
                    New and existing users sign in below!
                  </h1>

                  <div className="usa-prose">
                    <p className="margin-top-1">
                      You can access your account by signing in through your
                      google account below.
                    </p>
                    <p className="margin-top-1">
                      Haven't made an account yet? When you sign in through
                      google it will automatically create your account for you!
                    </p>
                  </div>
                  <p>
                    <Button
                      onClick={handleLogin}
                      type="button"
                      outline={true}
                      className="width-full"
                    >
                      Sign in with Google
                    </Button>
                  </p>
                  <div className="border-top border-base-lighter padding-top-4 desktop:border-0 desktop:padding-top-0">
                    <h2 className="display-none desktop:display-block">
                      Sign in to unlock the full features of SpecTaxular!
                    </h2>

                    <div className="usa-prose">
                      <p>
                        Users are able to generate new tax reports, and have
                        them saved to their account. Calculate what you could
                        owe by following a few quick and easy steps!
                      </p>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </GridContainer>
        </div>
      </main>
    </>
  );
}
