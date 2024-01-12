window.onload = init;

var apiurl = "http://openapi.seoul.go.kr:8088/5a766f4a76657365313132777177506b/json/bikeList/1/5/";

function init() {
    setOption();
    var todayDate = new Date();
    $('#date').text("오늘 날짜 : " + todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-"+todayDate.getDate());
    $('#searchButton').button();
    // 조회 버튼 클릭시
    $('#searchButton').click(function(event){        
        if($('#serchstation').val()!=""){
            findBicycleInfo($('#serchstation').val());
        } else {
            alert("대여소를 선택해주세요!")
        }
    })
    $('#clickMe_1').click(function(){
        $('p').fadeIn(1000);
        $('#mapInfo').slideToggle("slow");
    });

    $(document).button().on("click", "[id^='reload']",function(event){
        reloadInfo($(this).attr('id'));
    });
    $(document).button().on("click", "[id^='delete']",function(event){
        deleteCard($(this).attr('id'));
    });

}

function setOption() {
    var request = new XMLHttpRequest();
    request.open("GET", apiurl);
    request.onload = function() {
        if (request.status == 200){
            getOption(request.responseText);
        }
    }
    request.send(null);
}
function getOption(responseText){
    var stations = JSON.parse(responseText).rentBikeStatus.row;
    for(var index =0; index < stations.length; index++){
        var station = stations[index];
        var option = $("<option>"+"</option>").val(station.stationName);
        $('#stationlist').append(option);
    }
}

function findBicycleInfo(stationName){
    var request = new XMLHttpRequest();
    request.open("GET", apiurl);
    request.onload = function() {
        if (request.status == 200){
            addBicycleInfo(request.responseText,stationName)
        }
    }
    request.send(null);
}
function addBicycleInfo(responseText,stationName){
    var stations = JSON.parse(responseText).rentBikeStatus.row;
    var find = false;
    for(var index =0; index <stations.length; index++){
        var station=stations[index];
        if(station.stationName == stationName){
            var card = {
                date : new Date(),
                name : stationName,
                stationId : station.stationId,
                Latitude : station.stationLatitude,
                Longitude : station.stationLongitude,
                rackTotCnt : station.rackTotCnt,
                parkingBikeTotCnt : station.parkingBikeTotCnt,
                shared : station.shared,
            };
            find = true;
            break;
        } 
    }
    var newcard = $("<div class='card-body'>"+"<h3>"+card.name.slice(4)+"</h3>"+"</div>").addClass('cards').attr('id',card.stationId);
    if($.contains(document.getElementById('cardslist'), document.getElementById(newcard.attr('id')))==false&&find == true){
        $('#cardslist').append(newcard);
        var div = document.createElement('div');
        div.setAttribute('class', 'detailInfo');
        div.innerHTML = "<strong>조회한 시간 : </strong>"+ card.date.getHours()+"시 "+card.date.getMinutes()+"분 "+ card.date.getSeconds()+"초 "+ "<br><strong>현재 대여소에서 거치되어 있는 자전거 수(개) : </strong>" + card.parkingBikeTotCnt +"<br><strong>거치율(거치된 자전거 대수 / 총 거치대수량) : </strong>" + card.shared;
        var newcarddiv = document.getElementById(card.stationId);
        newcarddiv.appendChild(div);
        makebutton(card);
        $('#latelystation').html('<br>* 최근 조회한 대여소는'+station.stationName.slice(4)+'입니다.');
        showmap(card.Latitude, card.Longitude, card.name);
    }  else {
        alert("이미 추가한 대여소 정보입니다!");
    }
}
function reloadInfo(buttonId){
    var id = buttonId.slice(6);
    var request = new XMLHttpRequest();
    request.open("GET", apiurl);
    request.onload = function() {
        if (request.status == 200){
            updateInfo(request.responseText, id);
        }
    }
    request.send(null);
}

function updateInfo(responseText, id){
    var stations = JSON.parse(responseText).rentBikeStatus.row;
    var date = new Date();
    var reloadDiv = document.getElementById(id).getElementsByClassName("detailInfo")[0];
    for(var index =0; index <stations.length; index++){
        var station=stations[index];
        if(id == station.stationId){
            reloadDiv.innerHTML = "<strong>조회한 시간 : </strong>"+ date.getHours()+"시 "+ date.getMinutes()+"분 "+ date.getSeconds()+"초 "+"<br><strong>현재 대여소에서 거치되어 있는 자전거 수(개) : </strong>" + station.parkingBikeTotCnt +"<br><strong>거치율(거치된 자전거 대수 / 총 거치대수량) : </strong>" + station.shared;
            $('#latelystation').html('<br>* 최근 조회한 대여소는'+station.stationName.slice(4)+'입니다.');
            showmap(station.stationLatitude, station.stationLongitude, station.stationName);
            break;
        } 
    }
    alert(station.stationName + "의 정보를 다시 불러왔습니다!")
}

function deleteCard(buttonId){
    var id = buttonId.slice(6)
    var card = document.getElementById(id);
    card.remove();
}
function makebutton(card){
    // 클릭하면 해당 대여소의 데이터 다시 불러오는 핸들러를 실행하게 될 버튼 생성 
    var newcarddiv = document.getElementById(card.stationId);
    var button = document.createElement('input');
    button.setAttribute('type','button');
    var button_id = 'reload'+ card.stationId;
    button.setAttribute('class','btn btn-primary');
    button.setAttribute('id', button_id);
    button.value = 'RELOAD';
    newcarddiv.appendChild(button);
    // 클릭하면 해당 카드를 지우는 핸들러를 실행하게 될 버튼 생성
    var deleteButton = document.createElement('input');
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('class','btn btn-outline-primary');
    var deleteButton_id = 'delete'+card.stationId;
    deleteButton.setAttribute('id', deleteButton_id);
    deleteButton.value='DELETE';
    newcarddiv.appendChild(deleteButton);
}
var map;
function showmap(Latitude, Longitude, stationName){
    var googleLatAndLong = new google.maps.LatLng(Latitude, Longitude);
    var mapOptions = {
        zoom:17,
        center: googleLatAndLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);
    
    var title = stationName.slice(4);
    var content = "대여소의 위치(latitude, longitude) : ("+Latitude+", "+Longitude+" )";
    addMarker(map, googleLatAndLong, title, content);
}
function addMarker(map, latlong, title, content) {
    var markerOptions = {
        position : latlong,
        map: map,
        title: title,
        clickable:true
    };
    var marker = new google.maps.Marker(markerOptions);

    var infoWindowOptions = {
        content: content,
        position: latlong
    };
    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

    google.maps.event.addListener(marker, "click", function(){
        infoWindow.open(map);
    });
}