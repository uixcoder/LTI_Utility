(async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const idToken = urlParams.get("id_token"); // LTI 1.3 launch sends an id_token
    const resultDiv = document.getElementById("result");
  
    if (!idToken) {
      resultDiv.innerText = "No id_token found. This is not a valid LTI 1.3 launch.";
      return;
    }
  
    // Decode JWT (requires a library like jwt-decode or custom decoding)
    const decoded = parseJwt(idToken);
    console.log("Decoded LTI Data:", decoded);
  
    // Verify JWT (signature, issuer, audience, etc.)
    const isValid = await verifyJwt(idToken, decoded);
    if (!isValid) {
      resultDiv.innerText = "Invalid id_token.";
      return;
    }
  
    resultDiv.innerHTML = `
      <h2>LTI Launch Data</h2>
      <pre>${JSON.stringify(decoded, null, 2)}</pre>
    `;
  })();
  
  // Decode JWT
  function parseJwt(token) {
    const [header, payload] = token.split(".").slice(0, 2);
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  }
  
  // Verify JWT (requires fetching JWKS for public key verification)
  async function verifyJwt(idToken, decoded) {
    const jwksUri = decoded.iss + "/.well-known/jwks.json"; // JWKS URL from Moodle
    const response = await fetch(jwksUri);
    const jwks = await response.json();
  
    // Find the matching key in the JWKS set
    const key = jwks.keys.find((key) => key.kid === decoded.header.kid);
    if (!key) return false;
  
    // Verify JWT using the key (this part requires crypto libraries in JS)
    // Use libraries like `jsonwebtoken` or `@panva/jose` in a server-side implementation.
    return true; // Placeholder: replace with actual signature verification logic.
  }
  