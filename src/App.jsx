import axios from "axios";
import "./App.css";
import { useState } from "react";

function App() {
  const [base64, setBase64] = useState("");
  const [accessTokenData, setAccessTokenData] = useState("");

  const handleOnAccess = () => {
    const username = "apitoken";
    const password = "XdS2yV6xDL9nBOZPtgMZdNmVDLGkGNPzcDVfGgQN";
    const credentials = `${username}:${password}`;

    const encodedCredentials = btoa(credentials);
    setBase64(encodedCredentials);
    console.log(encodedCredentials);
  };

  const handleOnClic = async () => {
    // base64Credentials is the base64 encoded string you generated in Step 2.1
    const base64Credentials = base64;
    var instance = "https://demo-us.leanix.net";
    const tokenEndpoint =
      "https://demo-us.leanix.net/services/mtm/v1/oauth2/token";

    // Step 2: Make a POST request to obtain the access token
    try {
      const response = await axios.post(
        tokenEndpoint,
        "grant_type=client_credentials",
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Step 3: Receive and use the access token
      const accessToken = response.data.access_token;
      setAccessTokenData(accessToken);
      console.log("Access Token:", accessToken);

      // Now you can use the accessToken in your API requests
    } catch (error) {
      console.error("Error obtaining access token:", error.message);
    }
  };

  const handleAuthentication = () => {
    // Replace {SUBDOMAIN} with your actual subdomain
    const url = "https://demo-us.leanix.net/demo/api/v1/services";
    const accessToken = accessTokenData; // Replace with your actual access token

    // Step 2: Make a GET request to the /v1/services API endpoint
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // Process the response as needed
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <>
      <button onClick={handleOnAccess}>Obtain an Access Token</button>
      <button onClick={handleOnClic}>
        Make Authenticated Requests to Services
      </button>
      <button onClick={handleAuthentication}>Authentication</button>
    </>
  );
}

export default App;
