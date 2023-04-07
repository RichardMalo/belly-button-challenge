# belly-button-challenge
Interactive dashboard using Plotly: 

This project involves the use of JavaScript, D3, and Plotly libraries to create an interactive dashboard that displays bacterial data. The data is retrieved from a JSON file located at a https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json URL, and it contains information about the bacteria found in the belly button in various individuals. The data is displayed in a dropdown menu, and when a user selects an individual denominated by their ID number in the study, their metadata and bacterial data are displayed in a panel and two charts, respectively. The charts display the top 10 bacterial species found in the individual as a horizontal bar chart and a bubble chart.

The 2 main files used in this project are as follows:
app.js - the main code
index.html - the webpage displaying the website
The remainder of the files and images are from the Starter file.

Github Pages address: 
rolosaregood.github.io/belly-button-challenge

Requirements:
Bar Chart (30 points)
Chart initializes without error (10 points)

Chart updates when a new sample is selected (5 points)

Chart uses Top 10 sample values as values (5 points)

Chart uses otu_ids as the labels (5 points)

Chart uses otu_labels as the tooltip (5 points)

Bubble Charts (40 points)
Chart initializes without error (10 points)

Chart updates when a new sample is selected (5 points)

Chart uses otu_ids for the x values (5 points)

Chart uses otu_ids for marker colors (5 points)

Chart uses sample_values for the y values (5 points)

Chart uses sample_values for the marker size (5 points)

Chart uses `otu_labels for text values (5 points)

Metadata and Deployment (30 points)
Metadata initializes without error (10 points)

Metadata updates when a new sample is selected (10 points)

App Successfully Deployed to Github Pages (10 points)

Grading
This assignment will be evaluated against the requirements and assigned a grade according to the following table:
