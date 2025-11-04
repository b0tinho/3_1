async function getCountryByCapital(capital) {
    const url = `https://restcountries.com/v3.1/capital/${capital}`;
    const response = await fetch(url);
    const data = await response.json();
    return data[0];
}

function createTable(country) {
    const tableHTML = `
        <table border="1" cellspacing="0" cellpadding="8" style="margin: 0 auto;">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Capital</th>
                    <th>Population</th>
                    <th>Region</th>
                    <th>Subregion</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${country.name.common}</td>
                    <td>${country.capital[0]}</td>
                    <td>${country.population.toLocaleString()}</td>
                    <td>${country.region}</td>
                    <td>${country.subregion}</td>
                </tr>
            </tbody>
        </table>
    `;
    document.getElementById('table-container').innerHTML = tableHTML;
}

document.getElementById('capital-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const capital = document.getElementById('capital-input').value.trim();
    if (capital) {
        getCountryByCapital(capital)
            .then(createTable)
            .catch(error => {
                document.getElementById('table-container').textContent = 'Błąd pobierania danych.';
                console.error(error);
            });
    }
});
