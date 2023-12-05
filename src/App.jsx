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
    const tokenEndpoint = "https://demo-us.leanix.net/services/mtm/v1/oauth2/token"
    
    // Step 2: Make a POST request to obtain the access token
      try {
        const response = await axios.post(
          tokenEndpoint,
          'grant_type=client_credentials',
          {
            headers: {
              Authorization: `Basic ${base64Credentials}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
    
        // Step 3: Receive and use the access token
        const accessToken = response.data.access_token;
        console.log('Access Token:', accessToken);
    
        // Now you can use the accessToken in your API requests
      } catch (error) {
        console.error('Error obtaining access token:', error.message);
      }
    
    
  };

  return (
    <>
     <button onClick={handleOnAccess}>Obtain an Access Token</button>
      <button onClick={handleOnClic}>Make Authenticated Requests to Services</button>
    </>
  );
}

export default App;
