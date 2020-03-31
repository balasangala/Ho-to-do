console.log('Map Loading');
/*var AllselectedCspList=csplist;
var AllselectedNspList=nsplist;
alert(AllselectedNspList);
console.log(countryResult[0]);*/
var countryPositionResult = countryResult[0];
/*
document.getElementById("loader_country_img").src=countryPositionResult.countryImage;
document.getElementById('mapLoader').style.display = "block";
document.getElementById('mapLoader').style.position = 'absolute';
document.getElementById('mapLoader').style.top = '-11px;';
document.getElementById('mapLoader').style.zIndex = '1';
*/
/*Country Map loader code end*/
var CSPList='';
var NSPList='';

var map;
var markers = [];

var isMetroSelected="";

// This global polygon variable is to ensure only ONE polygon is rendered.
var polygon = null;
var icon_highlight ='';
var icon_disable =curBaseUrl+'images/service_off_marker.png';
var icon_metro_populate_on=curBaseUrl+'images/metro_on_marker.png';
var icon_metro_populate_off=curBaseUrl+'images/metro_off_marker.png';

 

function initialize(){
hideListings();
 //marker.setMap(null);
  //achari();
  var cspArray=new Array();
  $('input[name^="cSBoolean"]:checked').each(function(){
    var seletedAttrname = $(this).attr('name'); 
   /* var cspRow= seletedAttrname.split("-");
    var cspRowID=(parseInt(cspRow[1])+1);
    var CSPDataValue=$('#cLOUDSERVICEPROVIDERS_T-arrayset-table').find('table').find('tr:nth-child('+cspRowID+')').find('td:nth-child(4)').find('span:nth-child(1)').attr('title');
     cspArray.push(CSPDataValue);
    */
   cspArray.push($(this).val());
  });
  var CSPList=''+cspArray;
  //console.log('CheckBox Selected CSP' + CSPList);

  var npArray=new Array();
  $('input[name^="nPBoolean"]:checked').each(function(){
    var seletedAttrname = $(this).attr('name'); 
   /* var cspRow= seletedAttrname.split("-");
    var cspRowID=(parseInt(cspRow[1])+1);
    var CSPDataValue=$('#cLOUDSERVICEPROVIDERS_T-arrayset-table').find('table').find('tr:nth-child('+cspRowID+')').find('td:nth-child(4)').find('span:nth-child(1)').attr('title');
     cspArray.push(CSPDataValue);
    */
   npArray.push($(this).val());
  });
  var NSPList=''+npArray;
  //alert(CSPList);
  var sideBarDispMetroList='';
  
  for (var i = 0; i < locations.length; i++) {
    var pictureLabel = document.createElement("img");
     pictureLabel.src = curBaseUrl+'javascript/google_location_markers_v1.js';
    var position = locations[i].location;
        var metroCSPData = locations[i].description;
        var tablemarkerIcon = locations[i].icon;
        var markerIcon = locations[i].icon;
    var dispTitle =locations[i].maintitle;
  //  var CSPList = locations[i].SelectedCSPList;
    var NSPData =  locations[i].NSP_DATA;
    var selectedNSPList =  locations[i].SelectedNSPList;
    var selectedMetro =  locations[i].selectedMetro;
    var metroCode =  locations[i].metroCode;
    var metroSClassName='metroFill';
  isMetroSelected = selectedMetro;
    var labelAlignment = locations[i].labelPosition;
  var goldenGatePosition = {lat: 40.023659,lng: -100.578470};
  if(tablemarkerIcon == ''){
    markerIcon = curBaseUrl+'Icons/marker-circle.png';
  }

  /* Replacing the Declined CSP list with jQuery */
  const metroReplacementData = [
  { 'VERIZON': '' },
  { 'SAP':'' },
  { 'Amazon':'AWS' },
  ];
  
  var titleWithComma = metroReplacementData.reduce((f, s) => `${f}`.replace(Object.keys(s)[0], s[Object.keys(s)[0]]), metroCSPData); 
  var titleCommaReplace = titleWithComma.replace(",,",",");
  var title = titleCommaReplace.replace(/(.+),$/, '$1');
/*Gray out related module code start */
if(CSPList !='' && NSPList !=''){
  console.log('Two way Seachr');
    var combinationData= CSPList+','+NSPList;
    var serverResponse = title+','+NSPData;
    var o_string=serverResponse;
      var o_lower = o_string.toLowerCase();
      var o_finalData= o_lower.split(',').sort();
      var i_string=combinationData;
      if(i_string !=''){
      var i_lower = i_string.toLowerCase();
      var i_finalData= i_lower.split(',').sort();
      }
if(i_string !='' && i_finalData.length > 0)
    {
      if(JSON.stringify(o_finalData)==JSON.stringify(i_finalData))
      {
        markerIcon = locations[i].icon;
        
      }
      else{
        var ci,ii;
        var unMatchingStatus=0;
        for(ii=0;ii<i_finalData.length;ii++)
        {
            var curInput = i_finalData[ii];
            if(o_finalData.includes(curInput)==true)
            {
               // console.log(curInput+'=>'+'Matched');
            }else{
               // console.log(curInput+'=>'+'Unmatched');
                unMatchingStatus++;
               }
        }
       // console.log(dispTitle+'==Disp'+unMatchingStatus);
        if(unMatchingStatus > 0){
         // console.log(dispTitle+ '=> Update Marker icon = >' + unMatchingStatus);
          markerIcon =icon_disable;
          metroSClassName = 'metroNotFill';
        }else{
          markerIcon = locations[i].icon;
          //console.log(dispTitle+ '=> Matched Icon = >' + unMatchingStatus);
        }
    }
    }
console.log('Two way Seachr end');
}else if(CSPList !='')
{
      var o_string=title;
      var o_lower = o_string.toLowerCase();
      var o_finalData= o_lower.split(',').sort();
      var i_string=CSPList;
      if(i_string !=''){
      var i_lower = i_string.toLowerCase();
      var i_finalData= i_lower.split(',').sort();
      }
    //alert(i_finalData.length);
    if(i_string !='' && i_finalData.length > 0)
    {
      if(JSON.stringify(o_finalData)==JSON.stringify(i_finalData))
      {
        markerIcon = locations[i].icon;
        
      }
      else{
        var ci,ii;
        var unMatchingStatus=0;
        for(ii=0;ii<i_finalData.length;ii++)
        {
            var curInput = i_finalData[ii];
            if(o_finalData.includes(curInput)==true)
            {
               // console.log(curInput+'=>'+'Matched');
            }else{
               // console.log(curInput+'=>'+'Unmatched');
                unMatchingStatus++;
               }
        }
       // console.log(dispTitle+'==Disp'+unMatchingStatus);
        if(unMatchingStatus > 0){
         // console.log(dispTitle+ '=> Update Marker icon = >' + unMatchingStatus);
          markerIcon =icon_disable;
          metroSClassName = 'metroNotFill';
        }else{
          markerIcon = locations[i].icon;
          //console.log(dispTitle+ '=> Matched Icon = >' + unMatchingStatus);
        }
    }
    }
  }else if(NSPList !='')
{
  console.log('NSP Entry came...');
      var o_string=NSPData;
      var o_lower = o_string.toLowerCase();
      var o_finalData= o_lower.split(',').sort();
      var i_string=NSPList;
      if(i_string !=''){
      var i_lower = i_string.toLowerCase();
      var i_finalData= i_lower.split(',').sort();
      }
    //alert(i_finalData.length);
    if(i_string !='' && i_finalData.length > 0)
    {
      if(JSON.stringify(o_finalData)==JSON.stringify(i_finalData))
      {
        markerIcon = locations[i].icon;
        
      }
      else{
        var ci,ii;
        var unMatchingStatus=0;
        for(ii=0;ii<i_finalData.length;ii++)
        {
            var curInput = i_finalData[ii];
            if(o_finalData.includes(curInput)==true)
            {
               // console.log(curInput+'=>'+'Matched');
            }else{
               // console.log(curInput+'=>'+'Unmatched');
                unMatchingStatus++;
               }
        }
       // console.log(dispTitle+'==Disp'+unMatchingStatus);
        if(unMatchingStatus > 0){
         // console.log(dispTitle+ '=> Update Marker icon = >' + unMatchingStatus);
          markerIcon =icon_disable;
          metroSClassName = 'metroNotFill';
        }else{
          markerIcon = locations[i].icon;
          //console.log(dispTitle+ '=> Matched Icon = >' + unMatchingStatus);
        }
    }
    }
  }
   
    
    if(selectedMetro !=''){
      if(selectedMetro ==  metroCode){
        markerIcon =  icon_metro_populate_on;
      }
    }
    sideBarDispMetroList+='<li class='+metroSClassName+' onclick="updateMetroLocations('+"'"+i+"'"+','+"'"+metroCode+"'"+')">'+dispTitle+'<li>';
    /*>> Side bar listing end */
    /* Marker Module code start */
    /*Pointers posiion code start */
    var pointerX =  '-22';
    var pointerY = 8;
    var pointerExp = '';
    var mapTitleLength=dispTitle.length;
    var pointerPlus =  0;
    /*if(mapTitleLength == 5){
      pointerX =  -38;
      pointerY =  8;
    }else  if(mapTitleLength == 8){
      pointerX =  -38;
      pointerY =  8;
    }*/
    
    if(labelAlignment == 'right'){
      pointerExp = '+';
      pointerPlus =  11;
    }
  else{
      pointerExp = '-';
      pointerPlus =  -2;
    }
  
  if(dispTitle == 'Silicon Valley'){
      pointerExp = '+';
      pointerPlus =  4;
    }
  if(dispTitle == 'Seattle'){
        pointerExp = '+';
        pointerPlus =  11;
  }

  if(dispTitle == 'Los Angeles'){
      pointerExp = '+';
      pointerPlus =  11;
    }
    pointerX = (pointerExp+(parseInt(mapTitleLength)*4));
  var finalPointerX = (parseInt(pointerX)+pointerPlus);
  if(dispTitle == 'Philadelphia'){
    finalPointerX=parseInt(-40);
  }
   
    /*Pointers posiion code end */
     var goldenGatePosition = {lat: 40.023659,lng: -100.578470};
       var marker = new google.maps.Marker({
        labelContent: pictureLabel,
          position: position,
          map: map,
         title: title,
             metroName:locations[i].maintitle,
            nspData:locations[i].NSP_DATA,
            metroCode:locations[i].metroCode,
             icon: {
                    url:markerIcon,
                   labelOrigin: new google.maps.Point(finalPointerX,parseInt(pointerY)),
                   //labelOrigin: new google.maps.Point(-37,8),
                  },
              id: i,
               labelStyle: {opacity: 0.75},
               label:{
                text:dispTitle,
            }    
            //animation: google.maps.Animation.DROP,
   /*marker.addListener('mouseover', function() {
          populateInfoWindow(this, largeInfowindow);
        });*/
         

        });
       
         markers.push(marker);
         var largeInfowindow = new google.maps.InfoWindow();
         marker.addListener('click', function() {
          //CPQJS.setAttributeVal('metros_Final','AT',1);
          setMetroCodeInCPQ(this);
        });
        
          marker.addListener('mouseover', function() {
          populateInfoWindow(this, largeInfowindow);
        });

  }
    /*>> For Loop End */


  var ulsideBarDispMetroList='';
    ulsideBarDispMetroList+='<ul class="metroClass">';
    ulsideBarDispMetroList+='<li class="metroLiHeaderClass">Metros</li>';
    ulsideBarDispMetroList+=sideBarDispMetroList;
    ulsideBarDispMetroList+='</ul>';
    //console.log(ulsideBarDispMetroList);
  
 if(isMetroSelected =='' && document.getElementById('dispMetroJS')){
    document.getElementById('dispMetroJS').innerHTML=ulsideBarDispMetroList;
  }
}




   function setMetroCodeInCPQ(mertoData) {
  //alert(mertoData);
    var Metro_Input =  mertoData.metroCode;
    updateMetroLocations(Metro_Input);
}


function updateMetroLocations(input,data){
  console.log(input);
  console.log(data);
  console.log(locations[input]);
}

function metroInitialize() {
 

  map = new google.maps.Map(document.getElementById('map'), {
     center: {
            lat:countryPositionResult.centerdetails.lat,
            lng:countryPositionResult.centerdetails.lng,
        },
        zoom: countryPositionResult.countryZoom,
         mapTypeControl: false,
        draggable: false,
        scaleControl: false,
        scrollwheel: false,
        navigationControl: false,
        streetViewControl: false,
        zoomControl: false,
        fullscreenControl: false,
    
        styles:[
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000"
              }
            ]
          },
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000"
              }
            ]
          },

          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "administrative.province",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
             "featureType" : "water",
            "elementType" : "geometry",
            "stylers" : [{
                "color" : "#ffffff"
            }, {
                "lightness" : 16
            }]
          },
        ]
  });
 
 
  /*--------------------------------------------------------------------------------
      MAP related Other Functions module code start 
    --------------------------------------------------------------------------------*/
 

/*--------------------------------------------------------------------------------
      MAP related Other Functions module code End 
    --------------------------------------------------------------------------------*/



 



 /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
 initialize();
  var geoXml = new geoXML3.parser({
    map: map,
    suppressInfoWindows: true,
    zoom: false,
  });
  // geoXml.parse("http://www.geocodezip.com/geoxml3_test/kml/Milano_inverted.kml");
  geoXml.parseKmlString(kmlStr);
 //setTimeout(function(){document.getElementById('mapLoader').style.display = "none";},1500);
 
}




function populateInfoWindow(marker, infowindow) {
  var cAppendData='';
  var CBP_DATA=marker.title;
  var CBP_DataArray=CBP_DATA.split(','),ci,ni;
  var M_NSP_Input =  marker.nspData;
  var M_NSP_Input_Count = 0;
  if(M_NSP_Input !=''){
    M_NSP_Input_Count = M_NSP_Input.split(',').length;
  }
  for(ci=0;ci<CBP_DataArray.length;ci++){ 
    if(CBP_DataArray[ci]!='' && CBP_DataArray[ci]!='VERIZON' && CBP_DataArray[ci]!='SAP' ){
      var cspImage = curBaseUrl+'images/'+CBP_DataArray[ci]+'.png';
    cAppendData+='<div style="display:flex;"><div style="flex:1"><img style="margin-bottom:12px;" src="'+cspImage+'"></div></div>';
    }
    }
    if(M_NSP_Input_Count > 0){
      cAppendData+='<br/><div style="color:#ccc;" title="'+M_NSP_Input+'">+'+M_NSP_Input_Count+' Network Providers</div>';
    }
    
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      
        // Clear the infowindow content to give the streetview time to load.
        infowindow.setContent('');
        infowindow.marker = marker;
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
        var streetViewService = new google.maps.StreetViewService();
        var radius = 50;
        // In case the status is OK, which means the pano was found, compute the
        // position of the streetview image, then calculate the heading, then get a
        // panorama from that and set the options
        function getStreetView(data, status) {
           
                infowindow.setContent('<div id="pano">'+
                '<div id="siteNotice">'+
                '</div>'+
                '<h3 id="firstHeading" class="firstHeading" style="border-bottom:1px solid #ccc;padding-right:10px;padding-left:10px;font-weight:bold !important;">'+marker.metroName+'</h3>'+
                '<div id="bodyContent">'+
                cAppendData+
                '</div>'+
                '</div>');
            
        }
        // Use streetview service to get the closest streetview image within
        // 50 meters of the markers position
        streetViewService.getPanoramaByLocation(marker.position,
            radius, getStreetView);
        // Open the infowindow on the correct marker.
        infowindow.open(map, marker);
    }
}

function setMetroCodeInCPQ(mertoData) {
  //alert(mertoData);
    var Metro_Input =  mertoData.metroCode;
    updateMetroLocations(Metro_Input);
}
// This function will loop through the markers array and display them all.

// This function will loop through the listings and hide them all.
function hideListings() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}
// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' +
        markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
}
// This shows and hides (respectively) the drawing options.
function toggleDrawing(drawingManager) {
    if (drawingManager.map) {
        drawingManager.setMap(null);
        // In case the user drew anything, get rid of the polygon
        if (polygon !== null) {
            polygon.setMap(null);
        }
    }
    else {
        drawingManager.setMap(map);
    }
}
// This function hides all markers outside the polygon,
// and shows only the ones within it. This is so that the
// user can specify an exact area of search.
function searchWithinPolygon() {
    for (var i = 0; i < markers.length; i++) {
        if (google.maps.geometry.poly.containsLocation(markers[i].position,
                polygon)) {
            markers[i].setMap(map);
        }
        else {
            markers[i].setMap(null);
        }
    }
}
// This function takes the input value in the find nearby area text input
// locates it, and then zooms into that area. This is so that the user can
// show all listings, then decide to focus on one area of the map.
function zoomToArea() {
    // Initialize the geocoder.
    var geocoder = new google.maps.Geocoder();
    // Get the address or place that the user entered.
    var address = document.getElementById('zoom-to-area-text').value;
    // Make sure the address isn't blank.
    if (address == '') {
        window.alert('You must enter an area, or address.');
    }
    else {
        // Geocode the address/area entered to get the center. Then, center the map
        // on it and zoom in
        geocoder.geocode({
            address: address,
            componentRestrictions: {
                locality: 'Toronto'
            }
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                map.setZoom(15);
            }
            else {
                window.alert(
                    'We could not find that location - try entering a more' +
                    ' specific place.');
            }
        });
    }
}