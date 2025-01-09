import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

fetch('./dataset.csv')
  .then(response => response.text())
  .then((text) => {
    const json = d3.csvParse(text, d3.autoType)
    console.log(json)

    
// -----------------------Spindeldiagram-------------------------------   
    
    // Skapa de kolumner som används i radardiagrammet
    const factors = [
      "Color Scheme",
      "Visual Hierarchy",
      "Typography",
      "Images and Multimedia",
      "Layout",
      "Mobile Responsiveness",
      "CTA (Call to Action) Buttons",
      "Forms and Input Fields",
      "Feedback and Error Messages",
      "Loading Speed",
      "Personalization",
      "Accessibility",
      "Animation and Transitions",
      "Scrolling_Behavior",
      "Gestures and Touch Controls",
      "Search Functionality",
      "Social_Media_Integration"
  ];

  // Sortera datan i fem olika arrays enligt vilken webbplats den berör
  const platforms = Array.from(d3.group(json, d => d.Platform).entries());
  //console.log(platforms)

  // Räkna ut medelvärdet och sedan sortera in dem i varje kategori i varje webbplats
  const averages = platforms.map(([platform, group]) => {
      const avg = {};
      factors.forEach(factor => {
        avg[factor] = d3.mean(group, d => d[factor]);
      });
      return { platform, ...avg };
  });
  console.log(averages)

  // Ställ in dimensioner
  const width = 1000, height = width, margin = 120;
  const innerRadius = width / 6.5;
  const outerRadius = width / 2 - margin;
  const radius = Math.min(width, height) / 2 - margin;

  // Skapa SVG-element
  const svg = d3.select("#chart1") //påverkar div i html
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    //.attr("viewBox", "000 0 1000 1000")
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

/*     // Lägg till titel
    d3.select("svg")
      .append("text")
      .attr("x", 20)
      .attr("y", 20)
      .attr("text-anchor", "start")
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .style("font-family", "Arial, sans-serif") // Ändra typsnitt
      .text("Spindeldiagram");
     */

  // Skapa skalor
  const angleScale = d3.scalePoint()
    .domain(factors)
    .range([0, 1.9 * Math.PI]); //bytte till 1.9 ist för 2 då en kategori försvann annars

  const radiusScale = d3.scaleLinear()
    .domain([3.6, 4.3]) // Bytte betygen för större skillnad mellan linjerna
    .range([0, radius]);

  // Rita axlar
  factors.forEach(factor => {
    const angle = angleScale(factor);
    
    const startCoords = [
      Math.cos(angle) * innerRadius,
      Math.sin(angle) * innerRadius
    ]

    const lineCoord = [
      Math.cos(angle) * outerRadius,
      Math.sin(angle) * outerRadius
    ];

    // Axellinjer
    svg.append("line")
      .attr("x1", startCoords[0])
      .attr("y1", startCoords[1])
      .attr("x2", lineCoord[0])
      .attr("y2", lineCoord[1])
      .attr("stroke", "lightgray")
      .attr("stroke-width", 0.5);

    // Faktorlabels
    svg.append("text")
      .attr("x", lineCoord[0] * 1.1)
      .attr("y", lineCoord[1] * 1.1)
      .attr("text-anchor", "middle")
      .text(factor)
      .style("font-family", "Arial, sans-serif") // Ändra typsnitt
      .style("font-size", "12px");
  });

  // Betygskalan med linjer
  const dataValues = averages.map(d => factors.map(factor => d[factor])).flat();
  const minValue = d3.min(dataValues);
  const maxValue = d3.max(dataValues);

  const numGuides = 3;
  const interval = (maxValue - minValue) / numGuides;

  const guideValues = d3.range(minValue, maxValue, interval).concat(maxValue);

  guideValues.forEach(value => {
    const r = radiusScale(value);

    svg.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", r)
      .attr("fill", "none")
      .attr("stroke", "lightgray")
      .attr("stroke-width", 0.5);

    svg.append("text")
      .attr("x", 0)
      .attr("y", -r)
      .attr("dy", "-0.3em")
      .attr("text-anchor", "middle")
      .text(value.toFixed(1))
      .style("font-size", "10px")
      .style("font-family", "Arial, sans-serif") // Ändra typsnitt
      .style("fill", "gray");
    
    svg.append("text")
      .attr("x", 0)
      .attr("y", -120)
      .attr("r", r)
      .attr("text-anchor", "middle")
      .text("BETYG MEDELVÄRDE")
      .style("font-size", "10px")
      .style("font-family", "Arial, sans-serif") // Ändra typsnitt
      .style("fill", "gray");

  });

  // Rita spindeldiagrammet med data
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
 
    // Rita datalinjerna
    svg.append("path")
      .datum(pathData)
      .attr("d", d3.line().curve(d3.curveLinearClosed))
      .attr("fill", "none")
      .attr("stroke", platform === "Instagram" ? " #833AB4" : "gray") // Ändra färg beroende på condition
      .attr("stroke-width", platform === "Instagram" ? 2 : 1) // Ändra tjocklek beroende på condition
      ;

   // Hitta högsta och lägsta värde för Instagram
   const instagramData = averages.find(d => d.platform === "Instagram");
   const maxFactor = factors.reduce((a, b) => (instagramData[a] > instagramData[b] ? a : b));
   const minFactor = factors.reduce((a, b) => (instagramData[a] < instagramData[b] ? a : b));

   // Lägg till cirkel för högsta värdet
   const maxAngle = angleScale(maxFactor);
   const maxRadius = radiusScale(instagramData[maxFactor]);
   svg.append("circle")
     .attr("cx", Math.cos(maxAngle) * maxRadius)
     .attr("cy", Math.sin(maxAngle) * maxRadius)
     .attr("r", 20)
     .attr("fill", "none")
     .attr("stroke", "#405DE6")
     .attr("stroke-width", 1.5);

     // Lägg till cirkel för lägsta värdet
    const minAngle = angleScale(minFactor);
    const minRadius = radiusScale(instagramData[minFactor]);
    svg.append("circle")
      .attr("cx", Math.cos(minAngle) * minRadius)
      .attr("cy", Math.sin(minAngle) * minRadius)
      .attr("r", 20)
      .attr("fill", "none")
      .attr("stroke", "#405DE6")
      .attr("stroke-width", 1.5);

    
  });  

    
}); 

  

// -----------------------Stapeldiagram------------------------------- 











