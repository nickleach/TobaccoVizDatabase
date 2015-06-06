$(document).ready(function() {
    /* START of configuration options */
    var lowColor = "#D9EAD3"
    var highColor = "#F24642"
    var defaultColor = "#EEE"
    // var datasetDomain = "//chronicdata.cdc.gov/"
    // var datesetID = "3wxw-iz29"
    // var datasetColumnToColorByKey = "provisionaltvalue"
    var cdcJSON = 'https://chronicdata.cdc.gov/resource/ag3f-urcg.json';

    function tooltipHtml(stateName, stateData){ /* function to create html content string in tooltip div. */
        return "<h4>"+stateName+"</h4><table>"+
            // "<tr><td>Value</td><td>"+(stateData[datasetColumnToColorByKey])+"</td></tr>"+
            "<tr><td>Provision Desc</td><td>"+(stateData.provisiondesc)+"</td></tr>"+
            "<tr><td>Provision Value</td><td>"+(stateData.provisionvalue)+"</td></tr>"+
            "</table>";
    }

    /* END of configuration options */
    // var datasetDataEndpoint = datasetDomain+"resource/"+datesetID+".json"
    $("#legend-high").attr("style","background-color: "+highColor);
    $("#legend-low").attr("style","background-color: "+lowColor);

    $.get(cdcJSON, function(response){
        var mapData = {}

        // somehow create `response` to be an array of states' data

        // just in case the state is not in the data set, let's color it the default color
        $.each(["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
         "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH",
         "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT",
         "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN",
         "WI", "MO", "AR", "OK", "KS", "LA", "VA"], function(n,stateCode){
            mapData[stateCode] = {value: "Missing Value", color: defaultColor}
        })

        $.each(response, function(n,stateData){
            mapData[stateData.state_code] = stateData
            // set a new color based on the value in the configuration file
            var genColor = d3.interpolate(lowColor, highColor)(parseFloat(stateData[datasetColumnToColorByKey])/4)
            mapData[stateData.state_code].color = genColor

        })

        uStates.draw("#statesvg", mapData, tooltipHtml);
    })


})
