// The URL that stores our bacteria JSON.
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Collect the information and Push the Names onto the HTML using d3. Data retrieved, is stored in a variable called "data".
d3.json(url).then(function(data) {
  // The array of "names" is extracted from the "data" object and stored in a variable called "dataNames".
  dataNames = data.names;
  // console.log("Data Names:", dataNames);
  // console.log("All Data:", data);
  // console.log("MetaData Only:", data.metadata)
  // A new selection is created in the HTML with an id of "selDataset" using the d3.selectAll() method.
  let selectTab = d3.selectAll("#selDataset");
  // The map() method is used to loop through "dataNames" array and append an option for each name to the selection created earlier.
  // Learning to do this was my favourite part. 
  dataNames.map((name) => {
    selectTab.append("option").text(name);})
});


// Listener that updates the screen output so that when it is activated whenever the value of the dropdown menu changes. 
// It calls the "panelUpdate" and "graphUpdate" functions with the selected value as the argument.
function optionChanged(value){
  panelUpdate(value);
  // I ran out of time to make this work tonight before the assignment was due. Did not quite work.
  // plotGuage(value);
  graphUpdate(value);
};



// Get Panel information with Data from the metadata array
// The "panelUpdate" function takes in a parameter "value".
function panelUpdate(value){
  d3.json(url).then(function(data) { 
    let metaDataDivider = d3.select("#sample-metadata");
    // It retrieves the metadata from the JSON file using d3.json() and stores it in a variable called "metadata".
    let metadata = data.metadata;
    // Filter the metadata array to obtain the object with the "id" attribute matching the "value" parameter passed to the function.
    let results = metadata.filter(metaid => metaid.id == value);
    // console.log("RESULTS :",results)
    // Selecting the first object so that the single object matches the id value.
    let result = results[0];
    // console.log(result);
    // Clear the previous entry before the next one is delivered.
    metaDataDivider.selectAll("*").remove();  
    // Each property in the resulting object is looped through using the Object.entries() method and appended to the HTML element as an h5 element.
    Object.entries(result).map(([key, value]) => {
      // Capitalize the first letter of the key string
      key = key.charAt(0).toUpperCase() + key.slice(1);
      // Capitalize the first letter of the value string (if it's a string)
      if (typeof value === 'string') {
        value = value.charAt(0).toUpperCase() + value.slice(1);
      }
      // Push the data to webpage for display to the originally selected metaDataDivider spot in the HTML.
      metaDataDivider.append("h5").text(`${key}: ${value}`);
  });
});
};

// This is a JavaScript function named "graphUpdate" which takes in a parameter "value".
function graphUpdate(value){
  // This function uses the D3 library to retrieve data from a specified URL.
  d3.json(url).then(function(data) { 
    // It then stores the retrieved data in a variable called "sampleData".
    let sampleData = data;
    // Next, it extracts the "samples" attribute from "sampleData" and stores it in a variable called "dataSamples".
    let dataSamples = sampleData.samples;
    // It filters "dataSamples" to obtain the object with the "id" attribute matching the "value" parameter passed to the function.
    let panelID = dataSamples.filter(getid => getid.id == value);
    // The resulting object is stored in a variable called "resultBarData".
    let resultBarData = panelID[0];
    // The next three lines of code extract the top 10 "sample_values", "otu_ids", and "otu_labels" from "resultBarData",
    // and store them in variables called "otuSampleValues", "otuIds", and "labels", respectively.
    // These arrays are then reversed so that they are in descending order.
    let otuSampleValues = resultBarData.sample_values.slice(0,10).reverse();
    let otuIds = resultBarData.otu_ids.slice(0,10).reverse();
    let labels = resultBarData.otu_labels.slice(0,10).reverse();
    // console.log(otuIds);
    // console.log(labels);
    // console.log(otuSampleValues);
    // A new object called "barInfo" is created which contains the "x", "y", "name", "type", and "orientation" attributes.
    let barInfo = {
      // The "x" attribute is set to "otuSampleValues", the "y" attribute is set to "otuIds" with each element preceded by the text "OTU ",
      x: otuSampleValues,
      y: otuIds.map(value1 => 'OTU '+ value1),
      // the "name" attribute is set to "labels", the "type" attribute is set to "bar", and the "orientation" attribute is set to "h".
      name: labels,
      // This object represents the data to be displayed in the bar chart.
      type: "bar",
      orientation: "h",
      marker: {
        color: otuSampleValues,
        colorscale: 'Viridis'
      }
    };
    // A new object called "barLayout" is created with a "title" attribute, which is set to a string containing the "value" parameter passed to the function.
    // This object represents the layout options for the bar chart.
    let barLayout = {
      title: `Top 10 OTUs for ID: ${value}`,
    };
    // The Plotly library is then used to create a new plot with the specified data and layout options, and it is displayed in an HTML element with the id "bar".
    Plotly.newPlot('bar', [barInfo], barLayout);

    // A new object called "bubbleData" is created which contains the "x", "y", "mode", "marker", and "text" attributes.
    let bubbleData = {
      // The "x" attribute is set to "resultBarData.otu_ids", the "y" attribute is set to "resultBarData.sample_values",
      x: resultBarData.otu_ids,
      y: resultBarData.sample_values,
      // the "mode" attribute is set to "markers", the "marker" attribute is an object containing the "size", "color", and "colorscale" attributes,
      mode: 'markers',
      // and the "text" attribute is set to "resultBarData.otulabels". This object represents the data to be displayed in the bubble chart.
      marker: {
        size: resultBarData.sample_values,
        color: resultBarData.otu_ids,
        colorscale: 'Viridis'
      },
      text: resultBarData.otulabels,
    };
    // This object represents the layout options for the bubble chart.
    let bubbleLayout = {
      title: `Bubble Plot for Subject ID No.: ${value}`,
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Values" },
    };
    // This object represents the layout options for the bubble chart.
    Plotly.newPlot('bubble', [bubbleData], bubbleLayout);
  })};
  
// I ran out of time to make this work tonight before the assignment was due. Did not quite work.

  // function plotGuage(value) {
  //   d3.json(url).then(function(data) { 
  //     let metadata = data.metadata;
  //     // Filter the metadata array to obtain the object with the "id" attribute matching the "value" parameter passed to the function.
  //     let results = metadata.filter(metaid => metaid.id == value);
  //     console.log("RESULTS: ",results)
  //     // Selecting the first object so that the single object matches the id value.
  //     let result = results["wfreq"];
  //     console.log("Result2:", result);
  //     let dataGuage = [{domain: { x: [0, 1], y: [0, 1] },
  //       value: result,
  //       title: { text: "Number of Washes" },
  //       type: "indicator",
  //       mode: "gauge+number"
  //     }
  //   ];
  
  //   var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
  //   Plotly.newPlot('gauge', dataGuage, layout);
  // })};

  