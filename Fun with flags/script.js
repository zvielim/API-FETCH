function predictOrigin() {
    const name = document.getElementById('nameInput').value;
    const apiUrl = `https://api.nationalize.io/?name=${name}`;
  
    // Make a GET request to the first API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          console.log(data)
        const countries = data.country;
        // const countryCodes = countries.map(country => country.country_id);

        const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = ''; // Clear previous results
  
            countries.forEach(({country_id,probability }, index) => {
            //   const countryName = country.name.common;
              let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
              const probabilityPercentage = probability * 100;
              const flagUrl = `https://flagsapi.com/${country_id}/flat/64.png`;
  
              // Create HTML elements for each country's information
              const countryDiv = document.createElement('div');
              countryDiv.classList.add('country');
              countryDiv.innerHTML = `
                <h3>${regionNames.of(country_id)}</h3>
                <p>Probability: ${probabilityPercentage.toFixed(2)}%</p>
                <img src="${flagUrl}" alt="${country_id} Flag">
              `;
  
              resultsContainer.appendChild(countryDiv);
            });
  

      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  