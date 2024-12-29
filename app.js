const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const inpAmount = document.querySelector(".amount input");
const dropdowns = document.querySelectorAll(".drop-down select");
const btn = document.querySelector("button");
const fromCode = document.querySelector(".from select");
const toCode = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let x of dropdowns) {
  for (let val in countryList) {
    let option = document.createElement("option");
    option.textContent = val;
    option.value = val;

    if (x.name == "from" && val == "USD") {
      option.selected = "selected";
    } else if (x.name == "to" && val == "INR") {
      option.selected = "selected";
    }
    x.append(option);
    // x.innerHTML += `<option value="${val}">${val}</option>`;
  }
  x.addEventListener("change", (ele) => {
    changeflag(ele.target);
  });
}

function changeflag(event) {
  const code = countryList[event.value];
  let newsrc = `https://flagsapi.com/${code}/flat/64.png`;
  let img = event.parentElement.querySelector("img");
  img.src = newsrc;
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let amount = inpAmount.value;
  if (amount === "" || amount < 1) {
    inpAmount.value = "1";
  }
  convertCurr();
});

async function convertCurr() {
  let amount = inpAmount.value;
  const URL = `${BASE_URL}/${fromCode.value.toLowerCase()}.min.json`;
  let response = await fetch(URL);
  const data = await response.json();
  const from = fromCode.value.toLowerCase();
  const to = toCode.value.toLowerCase();
  const rate = amount * data[from][to];

  msg.textContent = `${amount} ${fromCode.value} = ${rate.toFixed(2)} ${(toCode.value)}`;
}

// window.addEventListener("load", () => {
//   convertCurr();
// });
