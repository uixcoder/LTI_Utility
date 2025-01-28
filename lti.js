document.getElementById("ltiForm").addEventListener("submit", async () => {
    const consumerKey = document.getElementById("oauth_consumer_key").value;
    const signature = document.getElementById("oauth_signature").value;
  
    // Validate LTI Launch Request (basic example)
    const isValid = validateLTI(consumerKey, signature);
    if (!isValid) {
      document.getElementById("result").innerText = "Invalid LTI Request!";
      return;
    }
  
    // Fetch data from Moodle (replace with your Moodle endpoint)
    const data = await fetchMoodleData();
    displayResult(data);
  });
  
  function validateLTI(consumerKey, signature) {
    // Simplified validation logic (for demo purposes only)
    const expectedKey = "example_consumer_key"; // Replace with your real key
    const expectedSignature = "example_signature"; // Replace with your real signature
    return consumerKey === expectedKey && signature === expectedSignature;
  }
  
  async function fetchMoodleData() {
    // Simulating an API call to Moodle (use actual API URL)
    const response = await fetch("moodle-data.json"); // Replace with Moodle API endpoint
    if (response.ok) {
      return response.json();
    } else {
      return { error: "Failed to fetch data from Moodle." };
    }
  }
  
  function displayResult(data) {
    const resultDiv = document.getElementById("result");
    if (data.error) {
      resultDiv.innerText = data.error;
    } else {
      resultDiv.innerHTML = `
        <h2>Fetched Moodle Data:</h2>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      `;
    }
  }