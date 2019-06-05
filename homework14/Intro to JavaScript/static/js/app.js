// from data.js
var tableData = data;

// YOUR CODE HERE!
// Get a reference to the table body
var tbody = d3.select('tbody');
// Use d3 to update each cell's text with UFO data
tableData.forEach(function(ufoData) {
    var row = tbody.append('tr');
    Object.entries(ufoData).forEach(function([key, value]) {
        var cell = row.append('td');
        cell.text(value);
    });
});

// Select the submit button
var submit = d3.select('#filter-btn');

submit.on('click', function() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Delete all the record
    tbody.selectAll('tr').remove(); 

    // Seelect the input element and get the raw HTML node
    var inputElement = d3.select('#datetime')

    // Get the value property of the input element
    var inputDate = inputElement.property('value');

    console.log(inputDate);

    var filterData = tableData.filter(record => record.datetime === inputDate);

    console.log(filterData);

    filterData.forEach(function(ufoData) {
        row = tbody.append('tr');
        Object.entries(ufoData).forEach(function([key, value]) {
            cell = row.append('td');
            cell.text(value);
        });
    });

    
});