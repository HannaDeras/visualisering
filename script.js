import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

fetch('./dataset.csv')
  .then(response => response.text())
  .then((text) => {
    const json = d3.csvParse(text, d3.autoType)
    console.log(json)
  })












/*
//Hanna testar

    // Importera D3
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Hämta och bearbeta datan
fetch('./dataset.csv')
  .then(response => response.text())
  .then((text) => {
    const data = d3.csvParse(text, d3.autoType);

    // Välj de kolumner som används i radardiagrammet
    const factors = [
      "Color Scheme", "Visual Hierarchy", "Typography", 
      "Images and Multimedia", "Layout", "Accessibility", "Mobile Responsiveness",
      "CTA (Call to Action) Buttons",	"Forms and Input Fields",	"Feedback and Error Messages",
      "Loading Speed","Personalization",	"Animation and Transitions",
      "Scrolling_Behavior",	"Gestures and Touch Controls",	"Search Functionality",
      "Social_Media_Integration"
];

    // Gruppera data efter plattform och beräkna medelvärden
    const platforms = Array.from(d3.group(data, d => d.Platform).entries());
    const averages = platforms.map(([platform, group]) => {
      const avg = {};
      factors.forEach(factor => {
        avg[factor] = d3.mean(group, d => d[factor]);
      });
      return { platform, ...avg };
    });

    // Ställ in dimensioner
    const width = 600, height = 600, margin = 50;
    const radius = Math.min(width, height) / 2 - margin;

    // Skapa SVG-element
    const svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Skapa skalor
    const angleScale = d3.scalePoint()
      .domain(factors)
      .range([0, 2 * Math.PI]);

    const radiusScale = d3.scaleLinear()
      .domain([0, 5]) // Antag att betygen går från 0 till 5
      .range([0, radius]);

    // Rita axlar
    factors.forEach(factor => {
      const angle = angleScale(factor);
      const lineCoord = [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius
      ];

      // Axellinjer
      svg.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", lineCoord[0])
        .attr("y2", lineCoord[1])
        .attr("stroke", "gray")
        .attr("stroke-width", 1);

      // Faktorlabels
      svg.append("text")
        .attr("x", lineCoord[0] * 1.1)
        .attr("y", lineCoord[1] * 1.1)
        .attr("text-anchor", "middle")
        .text(factor)
        .style("font-size", "12px");
    });

    // Rita spindeldiagrammet
    averages.forEach(({ platform, ...values }) => {
      const pathData = factors.map(factor => {
        const angle = angleScale(factor);
        const valueRadius = radiusScale(values[factor]);
        return [
          Math.cos(angle) * valueRadius,
          Math.sin(angle) * valueRadius
        ];
      });
      pathData.push(pathData[0]); // Stäng polygonen

      svg.append("path")
        .datum(pathData)
        .attr("d", d3.line().curve(d3.curveLinearClosed))
        .attr("fill", "none")
        .attr("stroke", d3.schemeCategory10[platforms.findIndex(p => p[0] === platform)])
        .attr("stroke-width", 2);
    });

    // Lägg till en legend
    svg.selectAll(".legend")
      .data(averages.map(d => d.platform))
      .enter()
      .append("text")
      .attr("x", -radius - 20)
      .attr("y", (_, i) => -radius + i * 20)
      .text(d => d)
      .style("font-size", "12px")
      .attr("fill", (_, i) => d3.schemeCategory10[i]);
  });


 */ 


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


*/



