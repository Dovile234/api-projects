const selectFirst = document.querySelector(".currency1");
const selectSecond = document.querySelector(".currency2");

const btn = document.querySelector(".btn");
const result = document.getElementById("result");

const host = "api.frankfurter.app";
fetch(`https://${host}/currencies`)
  .then((resp) => resp.json())
  .then((data) => {
    let entries = Object.entries(data);
    entries.map((entry) => {
      let optionElement = document.createElement("option");
      optionElement.textContent = entry[0] + " - " + entry[1];
      optionElement.value = entry[0];
      selectFirst.append(optionElement);

      let optionElementSecond = document.createElement("option");
      optionElementSecond.textContent = entry[0] + " - " + entry[1];
      optionElementSecond.value = entry[0];
      selectSecond.append(optionElementSecond);
    });
  });

function converter() {
  let inputValue = input.value;
  if (selectFirst.value != selectSecond.value) {
    let allerMessage = document.querySelector("#error-message");
    allerMessage.textContent = "";
    const host = "api.frankfurter.app";
    fetch(
      `https://${host}/latest?amount=${inputValue}&from=${selectFirst.value}&to=${selectSecond.value}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        result.value = Object.values(data.rates)[0];
      });
  } else {
    let allerMessage = document.querySelector("#error-message");
    allerMessage.textContent = "Please select different currency";
  }
}

const exchange = document.querySelector(".icon-wrapper");
exchange.addEventListener("click", () => {
  let tempCode = selectFirst.value;
  selectFirst.value = selectSecond.value;
  selectSecond.value = tempCode;
});
