/* 
fetch('./dataset.json')
.then((response) => response.json())
.then((data) => console.log(data)) */




/* 
function dataProcessing(data) {
  // Definierar de år som ska visas i diagrammen.
  const years = ['2018', '2019', '2020', '2021', '2022'];
  // Skapa en datamodell för varje år med totala transport- och fordonsutsläpp inställda på 0.
  const emissionsData = years.map(year => ({
      year: year,
      total: 0,
      transport: 0,
      cars: 0
  }));
  // Loopar igenom varje datapost och aggregerar utsläpp för varje år och kategori.
  data.forEach(item => {
      const index = years.indexOf(item.artal);
      if (index !== -1) {
          if (item.huvudsektor === 'Alla') {
              emissionsData[index].total += item.varde_co2e;
          }
          if (item.huvudsektor === 'Transporter') {
              emissionsData[index].transport += item.varde_co2e;
              if (item.undersektor === 'Personbilar') {
                  emissionsData[index].cars += item.varde_co2e;
              }
          }
      }
  });
   
  createLineChart(years, emissionsData.map(data => data.total));
}

function createLineChart(years, data) {
  const canvas = document.getElementById('totalaUtsläppLineChart'); // Hämtar canvas-elementet för diagrammet.
  new Chart(canvas, {
      type: 'bar', // Typ av diagram.
      data: {
          labels: years, // Åren blir x-axelns etiketter.
          datasets: [{
              label: 'Totala utsläpp', // Namn på dataserien.
              data: data, // Data för diagrammet.
              borderColor: 'rgba(61, 76, 49, 0.5)', // Färg på linjen.
              backgroundColor: 'rgba(61, 76, 49, 1)' // Färg på fyllningen under linjen.
          }]
      },

      options: Object.assign(
          standardChartOptions('Ton CO2e'), // Använder standardalternativen
          {
               scales: {
                  y: {
                      beginAtZero: false, // Börjar inte vid noll.
                      min: 300000, // Börjar vid 250 000.
                      
                  }
              }
          }
      )
  });
}

// När sidan laddas körs fetchData funktionen för att starta datanhämtningen.
document.addEventListener('DOMContentLoaded', fetchData);

 */

//Hanna Test

/* function fetchData() {
    
  // URL till datamängden som ska användas.
  const urlUm = 'https://opendata.umea.se/api/explore/v2.1/catalog/datasets/vaxthusgasutslapp_umea/records?where=artal%20%3E%3D2018&limit=60&refine=huvudsektor%3A%22Alla%22&refine=huvudsektor%3A%22Transporter%22';
  
  //fetch för att hämta data från URL:en.
  fetch(urlUm)
      .then(response => response.json()) // Omvandlar serverns svar till JSON-format.
      .then(data => dataProcessing(data.results)) // Skickar den bearbetade datan till en annan funktion för vidare bearbetning.
      .catch(error => console.error('Error fetching data:', error));  // Om det finns några fel vid hämtningen, loggas dessa i konsolen.
}
 */

fetch('./dataset.json')
    .then((response) => response.json())
    .then((json) => console.log(json));


function printchart(dataUX){
  console.log(dataUX)
  const ages = dataUX.data;
  const labels = ages.map((age) => age.key[1]);
  console.log(labels);  
  const data = ages.map((age) => age.values[0]);
  console.log(data);  
  console.log(ages);


const datasets = [
  {
    label: "",
    data,
    fill: false,
    borderWidth: 2,
    borderColor: "#40A2E3",
    backgroundColor: "#e8eef0",
    hoverBorderWidth: 4,
    tension: 0.5,
    barThickness: 20,
   
 }];


new Chart(document.getElementById("myChart"), {
  type: "bar",
  data: {labels, datasets},
  options: {
    plugins: {
      legend: {
          display: false,
        
      }
    },
    scales: {
      y: {
          beginAtZero: true,
          min: 4000000,
          max: 5000000
      }
  }
  }
});
}






