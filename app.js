const input = document.querySelector(".input");
const countries = document.querySelector(".countries");
const url = "https://restcountries.com/v3.1/all";
//?asenkron işlemler ve veri çekme--
const inputDiv = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Something went wrong ${res.status}`);
    }
    const arrayCountryNames = [];
    data.forEach((country) => {
      arrayCountryNames.push(
        `<option value="${country.name.common}">${country.name.common}</option>`
      );
    });
    arrayCountryNames.sort();
    strArrayCountryNames = arrayCountryNames.join("");

    input.innerHTML = `<select class="form-select" aria-label="Default select example">
   <option selected value = "">Select Country...</option>
  ${strArrayCountryNames}
</select>`;

    const select = document.querySelector("select");
    select.addEventListener("change", () => {
      countries.innerHTML = "";
      countriesDiv(select.value);
    });
  } catch (error) {
    console.log(error);
  }

  //!! İnputa veriler girildi.---------------------------------------------------------------------
};

const countriesDiv = async (countryName) => {
  const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
  const data = await res.json();
  console.log(data[0]);
  if (countryName == "") {
  } else {
    const {
      name: { common },
      region,
      capital,
      languages,
      flags: { svg },
      currencies,
    } = data[0];
    console.log(common, capital);

    countries.innerHTML += `<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${svg}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${common}</h5>
    <p class="card-text">${region}</div>
  <ul class="list-group list-group-flush">
      <li class="list-group-item"> <i class="fas fa-lg fa-landmark"></i> ${capital}</li>
     <li class="list-group-item"> <i class="fas fa-lg fa-comments"></i> ${Object.values(
       languages
     )}</li>
       <li class="list-group-item"> <i class="fas fa-lg fa-money-bill-wave"></i> ${
         Object.values(currencies)[0].name
       }, ${Object.values(currencies)[0].symbol} </li>
  </ul>
</div>`;
  }
};

inputDiv();
