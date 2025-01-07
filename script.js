import * as d3 from "d3";


const data = {
  labels: [
    'Color Scheme',
    'Visual Hierarchy',
    'Typography',
    'Images and Multimedia,Layout',
    'Mobile Responsiveness',
    'CTA (Call to Action) Buttons',
    'Forms and Input Fields',
    'Feedback and Error Messages',
    'Loading Speed',
    'Personalization',
    'Accessibility,Animation and Transitions',
    'Scrolling_Behavior',
    'Gestures and Touch Controls',
    'Search Functionality,Social_Media_Integration'
  ], 
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 90, 81, 56, 55, 40],
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
  }, {
    label: 'My Second Dataset',
    data: [28, 48, 40, 19, 96, 27, 100],
    fill: true,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    pointBackgroundColor: 'rgb(54, 162, 235)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(54, 162, 235)'
  }]
};

const config = {
  type: 'radar',
  data: data,
  options: {
    elements: {
      line: {
        borderWidth: 3
      }
    }
  },
};

new Chart(document.getElementById('myChart'), config)


/*
new Chart(document.getElementById("myChart"), {
  type: "radar",
  labels:[
    'Color Scheme',
    'Visual Hierarchy',
    'Typography',
    'Images and Multimedia,Layout',
    'Mobile Responsiveness',
    'CTA (Call to Action) Buttons',
    'Forms and Input Fields',
    'Feedback and Error Messages',
    'Loading Speed',
    'Personalization',
    'Accessibility,Animation and Transitions',
    'Scrolling_Behavior',
    'Gestures and Touch Controls',
    'Search Functionality,Social_Media_Integration'
  ], 
  dataset: [{
    label: 'Instagram',
    data: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
  }]
});

// Återanvändbar funktion 
function standardChartOptions(title) {
  return {
      responsive: true, // Gör diagrammet responsivt.
      plugins: {
          datasource: {
            url: 'UI UX Dataset (1).csv'
          }
      }
  };
}


/* options: {
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
  }*/








//Graf - Här hämtar vi data över antalet personbilar i alla län mellan år 2012-2022 
/*const urlSCB = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/TK/TK1001/TK1001A/FordonTrafik";


const querySCB = {
    "query": [
      {
        "code": "Region",
        "selection": {
          "filter": "item",
          "values": [
            "00"
          ]
        }
      },
      {
        "code": "Fordonsslag",
        "selection": {
          "filter": "item",
          "values": [
            "10"
          ]
        }
      },
      {
        "code": "Tid",
        "selection": {
          "filter": "item",
          "values": [
            "2012",
            "2013",
            "2014",
            "2015",
            "2016",
            "2017",
            "2018",
            "2019",
            "2020",
            "2021",
            "2022"
          ]
        }
      }
    ],
    "response": {
      "format": "JSON"
    }
  }

  function printSCBChart(dataSCB){
    console.log(dataSCB)
    const years = dataSCB.data;
    const labels = years.map((year) => year.key[2]);
    console.log(labels);
    const data = years.map((year) => year.values[0]);
    console.log(data);
    console.log(years);


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
    type: "radar",
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

  const request = new Request (urlSCB, {
    method: "POST",
    body: JSON.stringify(querySCB)
  });

  fetch (request)
  .then((response) => response.json())
  .then(printSCBChart);
  */