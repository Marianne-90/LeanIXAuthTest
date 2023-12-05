import axios from "axios";
import "./App.css";
import { useState } from "react";

function App() {
  const [base64, setBase64] = useState("");

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
      console.log("Access Token:", accessToken);

      // Now you can use the accessToken in your API requests
    } catch (error) {
      console.error("Error obtaining access token:", error.message);
    }
  };

  const handleOnAuth = () => {
    // Replace {SUBDOMAIN} with your actual subdomain
    const url = "https://demo-us.leanix.net/demo/api/v1/services";
    const accessToken =
      "eyJraWQiOiI0ODQxM2FmNzc3YTEyZmJlNTVlMmYxNzQ5ODg4ODQ0MyIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIyYTQ5MWY4YS1hOTcxLTQ2NTAtYTNiNC1lNDIzNjNmNDZlZTYuNzQ3MTA0NTc3QHRlY2huaWNhbHVzZXJzLmxlYW5peC5sb2NhbCIsInByaW5jaXBhbCI6eyJpZCI6Ijc4MjQ5N2NjLWY5ZmQtNDM4ZS1iNTMxLTI1NmQ4MjI0M2ZiYyIsInVzZXJuYW1lIjoiMmE0OTFmOGEtYTk3MS00NjUwLWEzYjQtZTQyMzYzZjQ2ZWU2Ljc0NzEwNDU3N0B0ZWNobmljYWx1c2Vycy5sZWFuaXgubG9jYWwiLCJyb2xlIjoiQUNDT1VOVFVTRVIiLCJzdGF0dXMiOiJBQ1RJVkUiLCJhY2NvdW50Ijp7ImlkIjoiMzk0MmFjMDEtOWY3My00N2UyLTljNTItYTA0M2M1NzAyYTBhIiwibmFtZSI6IlBhcnRuZXIgVEVDMzYwIChJQU0zNjApIn0sInBlcm1pc3Npb24iOnsiaWQiOiJjYzBmMjRhMS00MzRjLTQ1MTMtODhkYy1lNWEzOWIzODE5ZWEiLCJ3b3Jrc3BhY2VJZCI6IjJhNDkxZjhhLWE5NzEtNDY1MC1hM2I0LWU0MjM2M2Y0NmVlNiIsIndvcmtzcGFjZU5hbWUiOiJJQU0zNjBTYW5kYm94Iiwicm9sZSI6IkFETUlOIiwiY3VzdG9tZXJSb2xlcyI6bnVsbCwiYWNjZXNzQ29udHJvbEVudGl0aWVzIjpudWxsLCJzdGF0dXMiOiJBQ1RJVkUiLCJhc1VzZXIiOm51bGx9fSwiaXNzIjoiaHR0cHM6Ly91cy1zdmMubGVhbml4Lm5ldCIsImp0aSI6Ijc4N2EyNmQ1LWI0MTYtNDJiMS05ZGY0LTFjN2FkZTVkZDQ3ZiIsImV4cCI6MTcwMTczOTkzMiwiaW5zdGFuY2VVcmwiOiJodHRwczovL2RlbW8tdXMubGVhbml4Lm5ldCIsInJlZ2lvbiI6ImVhc3R1cyJ9.fh_LtjWi_qpuIKp-I6E0qM9Qq35CF-mQlS5EllnC4xKpE3l3AramcOeyzzjEsHA_36YMAbPBHi-bjNIbpE5dWlLD2kJxhot496NDWcYOy7JszvVns9PoirbOxEPPnBq_-Ut37uZWm6TBE8GN2tNKO7Aw2PtRzurGe1q-LiKBjtX-33m2c9sTAh_cd5EaCxbPEqORxlMi1K3PlbcCX5RbVvtYZd2ii8k800-kOHhuXwMVmxOc3kA9f1MxSAI9sAg1ZL-sxnPQWTY3UorxE9URRwCCbpXJ21DkO5QUD-exCnv4d3BrrUIHm-F9WmZmvbSfD7uJulfV7DjgrFe-5Jrj6w"; // Replace with your actual access token

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
      <button onClick={handleOnAuth}>Access</button>
    </>
  );
}

export default App;
