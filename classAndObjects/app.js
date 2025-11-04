const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const countryList = {
  USD: "US",
  INR: "IN",
  EUR: "EU",
  GBP: "GB",
  JPY: "JP",
  CAD: "CA",
  AUD: "AU",
  CNY: "CN",
};

const dropdowns = document.querySelectorAll("select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const button = document.querySelector("form button");
const msg = document.querySelector(".msg");

// Populate dropdowns
dropdowns.forEach(select => {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.innerText = currCode;

    if (select.name === "from" && currCode === "USD") {
      option.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      option.selected = true;
    }

    select.appendChild(option);
  }

  select.addEventListener("change", e => updateFlag(e.target));
});

// Update flag image
function updateFlag(selectElement) {
  const currCode = selectElement.value;
  const countryCode = countryList[currCode];
  const img = selectElement.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// Fetch exchange rate
button.addEventListener("click", async e => {
  e.preventDefault();

  const amountInput = document.querySelector("form input");
  let amountVal = parseFloat(amountInput.value);

  if (isNaN(amountVal) || amountVal < 1) {
    amountVal = 1;
    amountInput.value = "1";
  }

  const fromCode = fromCurr.value.toLowerCase();
  const toCode = toCurr.value.toLowerCase();
  const url = `${BASE_URL}/${fromCode}.json`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const rate = data[fromCode][toCode];
    const converted = (rate * amountVal).toFixed(2);

    msg.innerText = `${amountVal} ${fromCurr.value} = ${converted} ${toCurr.value}`;
  } catch (err) {
    msg.innerText = "Something went wrong. Try again!";
    console.error(err);
  }
});