var Granularity1 =
    {
        "Roads_Water_RS":[11,15.51],
        "Roads_Water_500m":[0,1],
        "Roads_Water_200m":[0,1],
        "Roads_Water_100m":[0,1],
        "Roads_Water_50m":[0,1],
        "NumberRoads":[0,1]

    };

var Granularity2 =
    {

        "Roads_Water_RS":[11,13],
        "Roads_Water_500m":[13,14],
        "Roads_Water_200m":[14,14.5],
        "Roads_Water_100m":[14.5,15.51],
        "Roads_Water_50m":[0,1],
        "NumberRoads":[0,1]
    };

var Granularity3 =
    {

        "Roads_Water_RS":[0,1],
        "Roads_Water_500m":[11,12],
        "Roads_Water_200m":[12,13],
        "Roads_Water_100m":[13,14],
        "Roads_Water_50m":[14,15.51],
        "NumberRoads":[0,1]
    };

var LineLevelWidth1 = [
    "match",
    ["get", "displayLev"],
    [1],
    3,
    [2],
    0,
    0
];


var LineLevelWidth2 = [
    "match",
    ["get", "displayLev"],
    [1],
    3,
    [2],
    2,
    0
];

var LineLevelWidth3 = [
    "match",
    ["get", "displayLev"],
    [1],
    3,
    [2],
    2,
    1
];






function zoomat(zoom,zoomRange) {
    return zoom >= zoomRange[0] && zoom <= zoomRange[1];

}
function getZoomRange(granIndex) {
    if (granIndex === 1)
        return Granularity1;
    else if (granIndex === 2)
        return Granularity2;
    else
        return Granularity3;
}

function activeGranularity(zoom) {
    var ZoomRangeList = getZoomRange(SettingList["granularity"]);
    var layerindex;
    for (var i in ZoomRangeList)
        if (zoomat(zoom,ZoomRangeList[i]))
            layerindex = i;
    switch (layerindex) {
        case "Roads_Water_RS":
            return "路段";
        case "Roads_Water_500m":
            return "500米";
        case "Roads_Water_200m":
            return "200米";
        case "Roads_Water_100m":
            return "100米";
        case "Roads_Water_50m":
            return "50米";
    }

}