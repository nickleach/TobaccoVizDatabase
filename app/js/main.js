$(document).ready(function() {
    /* START of configuration options */
    var lowColor = "#D9EAD3"
    var highColor = "#274E13"
    var defaultColor = "#EEE"
    var datasetDomain = "//chronicdata.cdc.gov/"
    var datesetID = "3wxw-iz29"
    var datasetColumnToColorByKey = "provisionaltvalue"

    function tooltipHtml(stateName, stateData){ /* function to create html content string in tooltip div. */
        return "<h4>"+stateName+"</h4><table>"+
            // "<tr><td>Value</td><td>"+(stateData[datasetColumnToColorByKey])+"</td></tr>"+
            "<tr><td>Provision Desc</td><td>"+(stateData.provisiondesc)+"</td></tr>"+
            "<tr><td>Provision Value</td><td>"+(stateData.provisionvalue)+"</td></tr>"+
            "</table>";
    }
    /* END of configuration options */
    var datasetDataEndpoint = datasetDomain+"resource/"+datesetID+".json"
    var datasetMetadataEndpoint = datasetDomain+"api/views/"+datesetID+".json"
    $("#legend-high").attr("style","background-color: "+highColor);
    $("#legend-low").attr("style","background-color: "+lowColor);

    $.get(datasetMetadataEndpoint, function(response){
        var datasetName = response.name
        $("#chart-title").text(datasetName)
        $("#info .dataset-link").attr("href",datasetDomain+"d/"+datesetID)
        $("#info .dataset-link").attr("title",datasetName)
        $("#info .attribution-name a").text(response.attribution)
        $("#info .attribution-link").attr("href",response.attributionLink)
        $("#info .attribution-link").attr("title",response.attribution)

        var datasetColumnToColorBy = response.columns.filter(function(i){return i.fieldName == datasetColumnToColorByKey})[0]
        $("#info .colored-by").text(datasetColumnToColorBy.name)
        $("#info .legend-low-value").text(datasetColumnToColorBy.cachedContents.smallest)
        $("#info .legend-high-value").text(datasetColumnToColorBy.cachedContents.largest)

    })

    $.get(datasetDataEndpoint, function(response){
        var mapData = {}
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
