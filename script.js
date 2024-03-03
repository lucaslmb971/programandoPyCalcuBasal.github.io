function calculateHydration() {
  const weight = parseFloat(document.getElementById("weight").value);
  let method;
  let dailyVolume;
  let maintenance;
  let mm2;
  let dailyVolume1500;
  let dailyVolume2000;

  // If the weight administered in kg is equal to or less than 30 KG, the Holliday-Segar method will be used
  // If the weight is greater than 30 KG, calculate based on body surface area
  if (weight <= 30) {
    method = "Holliday-Segar";
    if (weight <= 10) {
      dailyVolume = weight * 100;
    } else if (weight <= 20) {
      dailyVolume = 1000 + (weight - 10) * 50;
    } else {
      dailyVolume = 1000 + 500 + (weight - 20) * 20;
    }
    maintenance = dailyVolume / 24;
    mm2 = maintenance * 1.5;
  } else {
    method = "Body Surface Area";
    const bodySurfaceArea = (weight * 4 + 7) / (weight + 90);
    // This result is multiplied by 1500 or by 2000 to find the value of the daily volume in cc
    // and the doctor decides which of the two results to use.
    dailyVolume1500 = bodySurfaceArea * 1500;
    dailyVolume2000 = bodySurfaceArea * 2000;
  }

  // Change the content of the h2 with the results
  const resultH2 = document.getElementById("resultHeading");
  resultH2.textContent = `Patient: ${weight.toFixed(2)} kg`; // Rounded to two decimal places

  // Hide the SVG icon
  const iconSVG = document.getElementById("icon");
  iconSVG.style.display = "none";

  // Show results in the div 'result'
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<h2>Results</h2>
          <p> <strong>Method used:</strong>  ${method}</p>`;

  if (method === "Holliday-Segar") {
    resultDiv.innerHTML += `<p><strong>Daily Volume:</strong> ${dailyVolume.toFixed(
      2
    )} cc</p>
          <p><strong>Maintenance:</strong> ${maintenance.toFixed(2)} cc/hr</p>
          <p><strong>Maintenance + Half Maintenance (m+m/2):</strong> ${mm2.toFixed(
            2
          )} cc/hr</p>`;
  } else if (method === "Body Surface Area") {
    resultDiv.innerHTML += `<p><strong>Daily Volume (1500):</strong> ${dailyVolume1500.toFixed(
      2
    )} cc</p>
          <p><strong>Daily Volume (2000):</strong> ${dailyVolume2000.toFixed(
            2
          )} cc</p>`;
  } else {
    // Appears in the case where the appropriate method for calculation cannot be determined
    // It is a way to handle unexpected situations or errors in the calculation process.
    resultDiv.innerHTML += `<p>Method could not be determined</p>`;
  }
}
