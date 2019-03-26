var LagendTable1 = '<table width="100%">' +
    '    <tr>\n' +
    '        <td colspan="2" style="font-weight:bold;">积水深度图例（基于暴雨预警配色）</td>\n' +
    '    </tr>'+
    '    <tr>\n' +
    '        <td style="width:35px;height:20px;background-color:rgb(44,212,53);"></td>\n' +
    '        <td>&nbsp;0-5cm</td>\n' +
    '    </tr>\n' +
    '    <tr>\n' +
    '        <td style="width:35px;height:20px;background-color:rgb(48,102,255);"></td>\n' +
    '        <td>&nbsp;5-20cm</td>\n' +
    '    </tr>\n' +
    '    <tr>\n' +
    '        <td style="width:35px;height:20px;background-color:rgb(255,255,0);"></td>\n' +
    '        <td>&nbsp;20-55cm</td>\n' +
    '    </tr>\n' +
    '    <tr>\n' +
    '        <td style="width:35px;height:20px;background-color:rgb(254,154,0);"></td>\n' +
    '        <td>&nbsp;55-100cm</td>\n' +
    '    </tr>\n' +
    '    <tr>\n' +
    '        <td style="width:35px;height:20px;background-color:rgb(218,41,37);"></td>\n' +
    '        <td>&nbsp;>100cm</td>\n' +
    '    </tr>\n' +
    '</table>';

var ColorbyLagendTable1 =
    [
        "case",
        ["<", ["get", "depth"], 5],
        "#2cd435",//0-5
        ["<", ["get", "depth"], 20],
        "#3066ff",//5-20
        ["<", ["get", "depth"], 55],
        "#ffff00",//20-55
        ["<", ["get", "depth"], 100],
        "#fe9a00",//55-100
        [">=", ["get", "depth"], 100],
        "#da2925",//>100
        "#000000"
    ];




var LagendTable2 = '<table width="100%">' +
    '    <tr>\n' +
    '        <td colspan="2" style="font-weight:bold;">积水深度图例（基于洪水地图）</td>\n' +
    '    </tr>'+
    '    <tr>\n' +
    '        <td style="width:35px;height:20px;background-color:rgb(199,230,242);"></td>\n' +
    '        <td>&nbsp;0-5cm</td>\n' +
    '    </tr>\n' +
    '    <tr>\n' +
    '        <td style="width:35px;height:20px;background-color:rgb(84,197,237);"></td>\n' +
    '        <td>&nbsp;5-20cm</td>\n' +
    '    </tr>\n' +
    '    <tr>\n' +
    '        <td style="width:35px;height:20px;background-color:rgb(37,138,206);"></td>\n' +
    '        <td>&nbsp;20-55cm</td>\n' +
    '    </tr>\n' +
    '    <tr>\n' +
    '        <td style="width:35px;height:20px;background-color:rgb(0,61,135);"></td>\n' +
    '        <td>&nbsp;55-100cm</td>\n' +
    '    </tr>\n' +
    '    <tr>\n' +
    '        <td style="width:35px;height:20px;background-color:rgb(0,7,68);"></td>\n' +
    '        <td>&nbsp;>100cm</td>\n' +
    '    </tr>\n' +
    '</table>';

var ColorbyLagendTable2 =
    [
            "case",
            ["<", ["get", "depth"], 5],
            "#c7e6f2",//0-5
            ["<", ["get", "depth"], 20],
            "#54c5ed",//5-20
            ["<", ["get", "depth"], 55],
            "#258ace",//20-55
            ["<", ["get", "depth"], 100],
            "#003d87",//55-100
            [">=", ["get", "depth"], 100],
            "#000744",//>100
            "#000000"
    ];