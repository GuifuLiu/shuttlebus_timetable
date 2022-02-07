$(document).ready(function() {
    $('[data-toggle="popover"]').popover()
    $(".alert").hide();
    checkWeekend();
    get_bs_kb_dep();
})
var event = new Date();
var day = event.getDay();
var hour = event.getHours();
var minutes = event.getMinutes();
var curTime = hour*100+ minutes;
const bs_kb_dep = [818, 838, 908, 933, 953, 1013, 1033, 1053, 1113, 1133, 1153, 1213, 1233, 1253, 1313, 1333, 1353, 1413, 1433, 1453, 1513, 1533, 1553, 1623, 1653, 1723, 1753];
const kb_bs_dep = [835, 905, 935, 955, 1015, 1035, 1055, 1115, 1135, 1155, 1215, 1235, 1255, 1315, 1335, 1355, 1415, 1435, 1455, 1515, 1535, 1555, 1625, 1655, 1725, 1755, 1825];
const bs_kb_arr = [832, 852, 922, 947, 1007, 1027, 1047, 1107, 1127, 1147, 1207, 1227, 1247, 1307, 1327, 1347, 1407, 1427, 1447, 1507, 1527, 1547, 1611, 1641, 1711, 1741, 1811];
const kb_bs_arr = [835, 905, 935, 955, 1015, 1035, 1055, 1115, 1135, 1155, 1215, 1235, 1255, 1315, 1335, 1355, 1415, 1435, 1455, 1515, 1535, 1555, 1625, 1655, 1725, 1755, 1825];
const myInterval = setInterval(get_bs_kb_dep, 1000);
function checkWeekend() {
    var alert = document.getElementById('Weekend_alert');
    if (day == 0 || day == 6){
        $(".alert").show();
        $(".alert div").text("No shuttle bus on weekend! During the evenings in semester time students and staff can travel for £1 on Service 41.");
    }
    // if (day == 5){
    //     $(".alert div").text("Happy Friday! Hope you had a nice week! :)");
    //     $(".alert").show();
    // }
}
function updateTime(){
    event = new Date();
    hour = event.getHours();
    minutes = event.getMinutes();
    curTime = hour*100+ minutes;
    // document.getElementById('clock').innerHTML = "Depart at " + hour + " : " + minutes;
}
function time_format(t){
    var hour = ((Math.floor(t/100)<10) ? '0'+ Math.floor(t/100) : Math.floor(t/100))
    var min = (((t%100)<10) ? '0'+(t%100) : (t%100))
    return hour+':'+min
}
function get_time_difference(t0, t1){
    var hr = 0
    var min = 0
    var t0_hr = Math.floor(t0/100);
    var t1_hr = Math.floor(t1/100);
    var temp = Math.abs((t0_hr*60+(t0%100))-(t1_hr*60+(t1%100)));
    if (temp>60){
        hr = Math.floor(temp/60);
        min = temp%60;
    }
    else{
        min = temp
    }
    if (hr<=0) return min + " min";
    return hr + " hour " + min + " min";

}

function get_bs_kb_dep(){
    updateTime();
    hour = event.getHours();
    minutes = event.getMinutes();
    var pos = d3.bisect(bs_kb_dep,curTime);
    var next_deps = [818, 838, 908, 933, 953, 1013, 1033, 1053, 1113, 1133, 1153, 1213, 1233, 1253, 1313, 1333, 1353, 1413, 1433, 1453, 1513, 1533, 1553, 1623, 1653, 1723, 1753].slice(pos,Math.min(pos+3, bs_kb_dep.length)).map(function (t,i) {
    return time_format(t) + ' - ' + time_format(bs_kb_arr[pos+i]) + " " + '<b style="color:#007bff; padding: 0 0 0 60px;">' + get_time_difference(t,curTime) + '</b>';

})
    document.getElementById('iternary').innerHTML = '<li>' + next_deps.join('</li><li>') + '</li>'
    if (next_deps == 0 ) document.getElementById('iternary').innerHTML = 'Sorry there is no shuttle left for today.'
    // || day == 0 || day == 6
};



