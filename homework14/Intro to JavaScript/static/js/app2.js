// from data.js
var tableData = data;

// YOUR CODE HERE!
// Get a reference to the table body
var tbody = d3.select('tbody');

// Create a function to renderTable function by using 3 to update each cell's text
function renderTable(dataSet) {
    dataSet.forEach(function(record) {
        var row = tbody.append('tr');
        Object.entries(record).forEach(function([key, value]) {
            var cell = row.append('td');
            cell.text(value);
        });
    });
};

renderTable(tableData);

// Select the submit button
var submit = d3.select('#filter-btn');
submit.on('click', function() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Delete all the record
    tbody.selectAll('tr').remove(); 

    // Seelect the input element and get the raw HTML node
    var inputElement = d3.select('#datetime');

    // Get the value property of the input element
    var inputDate = inputElement.property('value');

    console.log(inputDate);

    var filterData = tableData.filter(record => record.datetime === inputDate);

    console.log(filterData);

    if (filterData.length > 0) {
        renderTable(filterData);
    }
    else {
        d3.select('#msg').text('No UFO Sighting');
    }
});

var reset = d3.select('#reset-btn');
reset.on('click', function() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    d3.select('#msg').text('');
    d3.select('datetime').text('');

    renderTable(tableData);
});