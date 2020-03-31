
var countryPositionResult = countryResult[0];
var CSPList='';
var NSPList='';
var map;
var markers = [];
var isMetroSelected="";
var curBaseUrl = countryPositionResult.curBaseUrl;
// This global polygon variable is to ensure only ONE polygon is rendered.
var polygon = null;
var icon_highlight ='';
var icon_disable = curBaseUrl+'images/service_off_marker.png';

var icon_metro_populate_on= curBaseUrl+'images/metro_on_marker.png';
var icon_metro_populate_off= curBaseUrl+'images/metro_off_marker.png';
//console.log(icon_metro_populate_off);
 //console.log('Metro Icon'+icon_metro_populate_on);
 var clickedMetro='';
function resetMetroSelectionMap(){
  clickedMetro= '';
  initialize();
  
}

function updateMetroLocations(index,metroCode){
  clickedMetro=metroCode;
  var metroObject = locations.find(el => el.metroCode === metroCode);
  var sCSP=metroObject.description;
  var sTitle=metroObject.title;
  var sposition = metroObject.location;
  var metroDesCSPAppendData='';
  var metroDesNSPAppendData='';
  var sNSP =  metroObject.NSP_DATA;

  var sortNSPData=sNSP.split(",").sort();
 

var sCBP_DataArray=sCSP.split(','),sci,sni;

for(sci=0;sci<sCBP_DataArray.length;sci++)
{ 
     if(sCBP_DataArray[sci]!='' && sCBP_DataArray[sci]!='VERIZON' && sCBP_DataArray[sci]!='SAP' )
	  {
        var scspImagePath = curBaseUrl+'images/'+sCBP_DataArray[sci]+'.png';
        switch (sCBP_DataArray[sci]) {
          case 'GOOGLE':  scspImagePath = "metro_google"; break;
          case 'Microsoft':  scspImagePath = "metro_microsoft"; break;
          case 'Amazon':  scspImagePath = "metro_amazon"; break;
          case 'Oracle':  scspImagePath = "metro_oracle"; break;
          case 'AWS':  scspImagePath = "metro_amazon"; break;
          case 'Google':  scspImagePath = "metro_google"; break;
          case 'ORACLE':  scspImagePath = "metro_oracle"; break;
          case 'SAP':  scspImagePath = "metro_sap"; break;
          case 'VERIZON':  scspImagePath = "metro_verizon"; break;
          
        }
        var FinalscspImagePath = curBaseUrl+'images/'+scspImagePath+'.png';
        //metroDesCSPAppendData+='<div style="display:flex;"><div style="flex:1"><img style="margin-bottom:12px;" src="'+scspImagePath+'"></div></div>';
        metroDesCSPAppendData+="<li><span class='cspIcon'><img src='"+FinalscspImagePath+"' alt=''></span></li>";
    }
 }

 for(sni=0;sni<sortNSPData.length;sni++)
 {
    if(sortNSPData[sni]!=''){
      metroDesNSPAppendData+="<li style='padding-left: 1.1em;'><span style='padding-left: 1em;'>"+sortNSPData[sni]+"</span></li>";
    }
 }
 var MetroShortDesc = "";
 if(metroCode =="AT") { MetroShortDesc = "Vital communications hub with low-latency connections to Washington, D.C., Miami and Dallas.";}
 if(metroCode ==  "ME") { MetroShortDesc = "Purpose-built International Business Exchange™ (IBX®) data centers offering direct access to multiple networks and the Australia Singapore Cable (ASC).";}
 if(metroCode ==  "RJ") { MetroShortDesc = "Interconnection within a premium colocation network offering dense concentrations of top global networks and enterprise service providers";}
 if(metroCode ==  "HO") { MetroShortDesc = "Direct access to diverse groups of users in a densely populated metro.";}
 if(metroCode ==  "JK") { MetroShortDesc = "Colocate within 39,000+ square meters of campus with 2,400 square meters of colocation space..";}
 if(metroCode ==  "CH") { MetroShortDesc = "Strategic Midwest location ideal for business continuity and disaster recovery operations.";}
 if(metroCode ==  "CU") { MetroShortDesc = "Most secure and technologically sophisticated data centers on the East Coast.";}
 if(metroCode ==  "BO") { MetroShortDesc = "Dense concentration of technology, biotech and educational institutions, as well as connections to twelve high-capacity, low-latency routes to New York.";}
 if(metroCode ==  "DA") { MetroShortDesc = "Largest hub for communications and internet exchange points in south central United States.";}
 if(metroCode ==  "DC") { MetroShortDesc = "Hosts a mature financial ecosystem for Americas’ largest multi-asset trading community.";}
 if(metroCode ==  "LA") { MetroShortDesc = "Interconnection to a rich ecosystem of media and entertainment creators, producers and content delivery network.";}
 if(metroCode ==  "MI") { MetroShortDesc = "Direct interconnection to 600+ companies colocated in the metropolitan area";}
 if(metroCode ==  "NY") { MetroShortDesc = "Largest hub for financial services, one of the world’s largest internet exchanges and peering solutions.";}
 if(metroCode ==  "PH") { MetroShortDesc = "Dense concentrations of enterprises, as well as network, cloud and IT service providers.";}
 if(metroCode ==  "SE") { MetroShortDesc = "Low-latency connections to Asian markets via transoceanic cable landings";}
 if(metroCode ==  "SV") { MetroShortDesc = "Locations reflect a high concentration of tech companies including top software, IT, and engineering companies.";}
 if(metroCode ==  "HE") { MetroShortDesc = "Ideal for high speed connectivity across Scandinavia, the Baltic regions and Russia.";}
 if(metroCode ==  "PA") { MetroShortDesc = "One of Europe's largest consumer markets and a  strategic hub to access subsea cable connections to MENA.";}
 if(metroCode ==  "MU") { MetroShortDesc = "Industrial powerhouse supporting a dense concentration of automotive, engineering, and media enterprises.";}
 if(metroCode ==  "DB") { MetroShortDesc = "Leading digital city attracting the world's leading technology providers and enterprises.";}
 if(metroCode ==  "ML") { MetroShortDesc = "The economic and financial heart of Italy and  center of digital business in Southern Europe.";}
 if(metroCode ==  "AM") { MetroShortDesc = "Europe's most cloud-dense and highly connected city, offering low-latency connectivity to the rest of the world.";}
 if(metroCode ==  "WA") { MetroShortDesc = "Business capital of Poland and Eastern Europe's second-largest economy and a strategic gateway connecting east and west.";}
 if(metroCode ==  "SK") { MetroShortDesc = "Europe's biggest mobile market and one of the world's most digitally interconnected economies.";}
 if(metroCode ==  "ZH") { MetroShortDesc = "One of the world's largest financial markets. Centrally and strategically located with access to 80% of Europe within 30ms round trip.";}
 if(metroCode ==  "GV") { MetroShortDesc = "A critical location for multinational corporations and European banks.";}
 if(metroCode ==  "DX") { MetroShortDesc = "Commercial hub for international business in the MENA region and a natural aggregation point for regional and international activity.";}
 if(metroCode ==  "MA") { MetroShortDesc = "Fast-growing business centre for technology and media, and the  most connected city in the UK outside London.";}
 if(metroCode ==  "AE") { MetroShortDesc = "Direct connections to multiple local and international carriers to scale your business and drive digital transformation.";}
 if(metroCode ==  "IL") { MetroShortDesc = "Strategic subsea cable interconnection point connecting Europe and Asia.Strategic subsea cable interconnection point connecting Europe and Asia.";}
 if(metroCode ==  "BR") { MetroShortDesc = "Colocation space situated close to central business district, with the highest levels of security and operational reliability.";}
 if(metroCode ==  "CA") { MetroShortDesc = "Carrier-neutral facility with multiple network options, including Australia's Intra Government Communications Network(ICON)";}
 if(metroCode ==  "PE") { MetroShortDesc = "Data centers hosting multiple network providers with direct access to the ASC that connects to Singapore via Indonesia.";}
 if(metroCode ==  "SY") { MetroShortDesc = "Australia's most interconnected data center campus with direct links to submarine cable landing stations for global connectivity.";}
 if(metroCode ==  "SP") { MetroShortDesc = "Integration with 1,000+ companies including a rich ecosystem of financial services firms, cloud service providers, digital content providers and social media platforms";}
 if(metroCode ==  "SO") { MetroShortDesc = "Major outsourcing location and digital hub linking Eastern Europe to the Middle East and Asia.";}
 if(metroCode ==  "TR") { MetroShortDesc = "Provides in-country location to accommodate data sovereignty requirements and acts as the preferred global on-ramp to the cloud";}
 if(metroCode ==  "SH") { MetroShortDesc = "Vendor-agnostic data center with connectivity to all major domestic connection providers, including China Telecom, China Unicom and China Mobile, plus the main VPN providers in China.";}
 if(metroCode ==  "BG") { MetroShortDesc = "Ideal location for companies looking to expand within Latin America and connect easily to the United States with high-capacity bandwidth.";}
 if(metroCode ==  "DU") { MetroShortDesc = "Transport hub between Netherlands, Belgium, and the rest of Germany and a major industrial region.";}
 if(metroCode ==  "FR") { MetroShortDesc = "Leading European financial center and hub for commerce and manufacturing.";}
 if(metroCode ==  "HH") { MetroShortDesc = "Leading maritime and logistics hub and a top interconnection point for subsea  cables connecting to Frankfurt.";}
 if(metroCode ==  "HK") { MetroShortDesc = "Citywide connected campus that enables efficient resource allocation and resiliency.";}
 if(metroCode ==  "OS") { MetroShortDesc = "Direct connection to the Dojima area communications network core, with state-of-the-art seismic protection features.";}
 if(metroCode ==  "TY") { MetroShortDesc = "Richest, most expansive digital ecosystem in Asia with a significant number of network and cloud service providers as well as major internet and peering exchanges.";}
 if(metroCode ==  "EN") { MetroShortDesc = "Regional hub supporting domestic and international applications including business continuity and data management compliance.";}
 if(metroCode ==  "ZW") { MetroShortDesc = "Direct connectivity to Equinix Data Centers in Amsterdam and Enschede make Zwolle an ideal backup location.";}
 if(metroCode ==  "SL") { MetroShortDesc = "First carrier-neutral IBX data center in South Korea, one of the most digitally connected countries in Asia.";}
 if(metroCode ==  "LS") { MetroShortDesc = "Our Lisbon International Business Exchange&trade; (IBX&reg;) data center is the main hub for Portugal. It is strategically located near subsea cables connecting the Iberian Peninsula, Africa and South America, and hosts a growing community of cloud and network service providers.";}
 if(metroCode ==  "SG") { MetroShortDesc = "Widest range of reliable connectivity options between Southeast Asia and the rest of the world.";}
 if(metroCode ==  "BA") { MetroShortDesc = "Our International Business Exchange&trade; (IBX&reg;) data center is powered by 100% renewable energy and is strategically located in Barcelona, a renowned innovation hub rich with technical expertise.";}
 if(metroCode ==  "MD") { MetroShortDesc = "The most connected city in the Iberian region with a vibrant ecosystem of cloud, network service providers and large enterprises.";}
 if(metroCode ==  "SA") { MetroShortDesc = "Seville is an important commercial center for southern Spain, with subsea cable connections to Morocco and the Canary Islands. Our International Business Exchange&trade; (IBX&reg;) data center is ideally located for business continuity operations. With 100% renewable energy, it will help reduce your carbon footprint.";}
 if(metroCode ==  "AD") { MetroShortDesc = "Important regional center of commerce and expansion location for domestic and international businesses serving the growing MENA market.";}
 if(metroCode ==  "LD") { MetroShortDesc = "One of the world's most important financial and business centers, served by excellent communication links and offering unrivalled access to European markets.";}
 if(metroCode ==  "DE") { MetroShortDesc = "Low risk for natural disasters, making it ideal for business continuity and disaster recovery operations.";}
  var metroDescriptionContent="";
      metroDescriptionContent+="<div class='' id='detailsOfSubmap'>";
      metroDescriptionContent+="<div><span onclick='resetMetroSelection()' style='cursor:pointer;'><img style='height: 20px;' src='"+curBaseUrl+"images/arrow_left.png' alt=''></span><h3 style='font-weight: bold; margin-top: -25px; margin-left: 25px;'>"+sTitle+"</h3>";
      metroDescriptionContent+="<img src='"+curBaseUrl+"'images/equinix_metro_thumb.png' alt='' style='display:none;'></div>";
      metroDescriptionContent+="<div><hr style='margin: 0px 15px;'><ul class='metroMapData'><li>"+MetroShortDesc+"</li></ul></div>";
      metroDescriptionContent+="<div><p style='color: grey; margin-left: 30px;'><strong> CLOUD SERVICE PROVIDERS </strong></p><hr style='margin-left: 30px;'><ul class='tickMark' style='padding-left: 11% !important;'>"+metroDesCSPAppendData+"</ul></div>";
      metroDescriptionContent+="<div><p style='margin-left: 25px;'><strong> NETWORK PROVIDERS </strong></p><hr style='margin-left: 30px;'><ul class='tickMark tickMarkNSP' style='padding-left: 6%;'>"+metroDesNSPAppendData+"</ul></div>";
      metroDescriptionContent+="<div><p style='color: grey; margin-left: 30px;'><strong> USEFUL LINKS </strong></p><hr style='margin-left: 30px;'><p style='color: red; margin-left: 30px;'><a href='"+metroObject.dataSheetLink+"' target='_blank' style='text-Decoration:none;color:#f1545a;'>Download Metro Data Sheet</a></p><p style='color: red; margin-left: 30px;'><a href='"+metroObject.metroSheetLink+"' target='_blank' style='text-Decoration:none;color:#f1545a;'>Equinix.com Metro site</a></p></div>";
      metroDescriptionContent+="</div>";

      if(document.getElementById('dispMetroJS')){
        document.getElementById('dispMetroJS').innerHTML="";
        document.getElementById('dispMetroJS').innerHTML=metroDescriptionContent;
      }
      initialize();
      cpqUpdateMetroJS(metroCode);
}


function setMetroCodeBack(metroCode){
   
      clickedMetro=metroCode;
     //  console.log('Map -Auto setup');
	   if(clickedMetro !=null && clickedMetro !=''){
		  setTimeout(function(){ updateSideBar(metroCode) },2000); 
	   }
          
     /* if($("#saveBtn").is(":disabled") ==  true)
      {
        console.log('Map - Reset button disabled');
        resetMetroSelectionMap();
      }
      else
      {
         console.log('Map -Auto setup');
          setTimeout(function(){ updateSideBar(metroCode) },2000);
      }*/
}

function updateSideBar(metroCode)
{
	//console.log('Update Side bar'+metroCode);
  var metroObject = locations.find(el => el.metroCode === metroCode);
  //console.log(metroObject);
  var sCSP=metroObject.description;
  var sTitle=metroObject.title;
  var sposition = metroObject.location;
  var metroDesCSPAppendData='';
  var metroDesNSPAppendData='';
  var sNSP =  metroObject.NSP_DATA;

  var sortNSPData=sNSP.split(",").sort();
 

var sCBP_DataArray=sCSP.split(','),sci,sni;

for(sci=0;sci<sCBP_DataArray.length;sci++)
{ 
    if(sCBP_DataArray[sci]!='' && sCBP_DataArray[sci]!='VERIZON' && sCBP_DataArray[sci]!='SAP' )
	  {
        var scspImagePath = curBaseUrl+'images/'+sCBP_DataArray[sci]+'.png';
        switch (sCBP_DataArray[sci]) {
          case 'GOOGLE':  scspImagePath = "metro_google"; break;
          case 'Microsoft':  scspImagePath = "metro_microsoft"; break;
          case 'Amazon':  scspImagePath = "metro_amazon"; break;
          case 'Oracle':  scspImagePath = "metro_oracle"; break;
          case 'AWS':  scspImagePath = "metro_amazon"; break;
          case 'Google':  scspImagePath = "metro_google"; break;
          case 'ORACLE':  scspImagePath = "metro_oracle"; break;
          case 'SAP':  scspImagePath = "metro_sap"; break;
          case 'VERIZON':  scspImagePath = "metro_verizon"; break;
          
        }
        var FinalscspImagePath = curBaseUrl+'images/'+scspImagePath+'.png';
        //metroDesCSPAppendData+='<div style="display:flex;"><div style="flex:1"><img style="margin-bottom:12px;" src="'+scspImagePath+'"></div></div>';
        metroDesCSPAppendData+="<li><span class='cspIcon'><img src='"+FinalscspImagePath+"' alt=''></span></li>";
    }
 }

 for(sni=0;sni<sortNSPData.length;sni++)
 {
    if(sortNSPData[sni]!=''){
      metroDesNSPAppendData+="<li style='padding-left: 1.1em;'><span style='padding-left: 1em;'>"+sortNSPData[sni]+"</span></li>";
    }
 }
 var MetroShortDesc = "";
 if(metroCode =="AT") { MetroShortDesc = "Vital communications hub with low-latency connections to Washington, D.C., Miami and Dallas.";}
 if(metroCode ==  "ME") { MetroShortDesc = "Purpose-built International Business Exchange™ (IBX®) data centers offering direct access to multiple networks and the Australia Singapore Cable (ASC).";}
 if(metroCode ==  "RJ") { MetroShortDesc = "Interconnection within a premium colocation network offering dense concentrations of top global networks and enterprise service providers";}
 if(metroCode ==  "HO") { MetroShortDesc = "Direct access to diverse groups of users in a densely populated metro.";}
 if(metroCode ==  "JK") { MetroShortDesc = "Colocate within 39,000+ square meters of campus with 2,400 square meters of colocation space..";}
 if(metroCode ==  "CH") { MetroShortDesc = "Strategic Midwest location ideal for business continuity and disaster recovery operations.";}
 if(metroCode ==  "CU") { MetroShortDesc = "Most secure and technologically sophisticated data centers on the East Coast.";}
 if(metroCode ==  "BO") { MetroShortDesc = "Dense concentration of technology, biotech and educational institutions, as well as connections to twelve high-capacity, low-latency routes to New York.";}
 if(metroCode ==  "DA") { MetroShortDesc = "Largest hub for communications and internet exchange points in south central United States.";}
 if(metroCode ==  "DC") { MetroShortDesc = "Hosts a mature financial ecosystem for Americas’ largest multi-asset trading community.";}
 if(metroCode ==  "LA") { MetroShortDesc = "Interconnection to a rich ecosystem of media and entertainment creators, producers and content delivery network.";}
 if(metroCode ==  "MI") { MetroShortDesc = "Direct interconnection to 600+ companies colocated in the metropolitan area";}
 if(metroCode ==  "NY") { MetroShortDesc = "Largest hub for financial services, one of the world’s largest internet exchanges and peering solutions.";}
 if(metroCode ==  "PH") { MetroShortDesc = "Dense concentrations of enterprises, as well as network, cloud and IT service providers.";}
 if(metroCode ==  "SE") { MetroShortDesc = "Low-latency connections to Asian markets via transoceanic cable landings";}
 if(metroCode ==  "SV") { MetroShortDesc = "Locations reflect a high concentration of tech companies including top software, IT, and engineering companies.";}
 if(metroCode ==  "HE") { MetroShortDesc = "Ideal for high speed connectivity across Scandinavia, the Baltic regions and Russia.";}
 if(metroCode ==  "PA") { MetroShortDesc = "One of Europe's largest consumer markets and a  strategic hub to access subsea cable connections to MENA.";}
 if(metroCode ==  "MU") { MetroShortDesc = "Industrial powerhouse supporting a dense concentration of automotive, engineering, and media enterprises.";}
 if(metroCode ==  "DB") { MetroShortDesc = "Leading digital city attracting the world's leading technology providers and enterprises.";}
 if(metroCode ==  "ML") { MetroShortDesc = "The economic and financial heart of Italy and  center of digital business in Southern Europe.";}
 if(metroCode ==  "AM") { MetroShortDesc = "Europe's most cloud-dense and highly connected city, offering low-latency connectivity to the rest of the world.";}
 if(metroCode ==  "WA") { MetroShortDesc = "Business capital of Poland and Eastern Europe's second-largest economy and a strategic gateway connecting east and west.";}
 if(metroCode ==  "SK") { MetroShortDesc = "Europe's biggest mobile market and one of the world's most digitally interconnected economies.";}
 if(metroCode ==  "ZH") { MetroShortDesc = "One of the world's largest financial markets. Centrally and strategically located with access to 80% of Europe within 30ms round trip.";}
 if(metroCode ==  "GV") { MetroShortDesc = "A critical location for multinational corporations and European banks.";}
 if(metroCode ==  "DX") { MetroShortDesc = "Commercial hub for international business in the MENA region and a natural aggregation point for regional and international activity.";}
 if(metroCode ==  "MA") { MetroShortDesc = "Fast-growing business centre for technology and media, and the  most connected city in the UK outside London.";}
 if(metroCode ==  "AE") { MetroShortDesc = "Direct connections to multiple local and international carriers to scale your business and drive digital transformation.";}
 if(metroCode ==  "IL") { MetroShortDesc = "Strategic subsea cable interconnection point connecting Europe and Asia.Strategic subsea cable interconnection point connecting Europe and Asia.";}
 if(metroCode ==  "BR") { MetroShortDesc = "Colocation space situated close to central business district, with the highest levels of security and operational reliability.";}
 if(metroCode ==  "CA") { MetroShortDesc = "Carrier-neutral facility with multiple network options, including Australia's Intra Government Communications Network(ICON)";}
 if(metroCode ==  "PE") { MetroShortDesc = "Data centers hosting multiple network providers with direct access to the ASC that connects to Singapore via Indonesia.";}
 if(metroCode ==  "SY") { MetroShortDesc = "Australia's most interconnected data center campus with direct links to submarine cable landing stations for global connectivity.";}
 if(metroCode ==  "SP") { MetroShortDesc = "Integration with 1,000+ companies including a rich ecosystem of financial services firms, cloud service providers, digital content providers and social media platforms";}
 if(metroCode ==  "SO") { MetroShortDesc = "Major outsourcing location and digital hub linking Eastern Europe to the Middle East and Asia.";}
 if(metroCode ==  "TR") { MetroShortDesc = "Provides in-country location to accommodate data sovereignty requirements and acts as the preferred global on-ramp to the cloud";}
 if(metroCode ==  "SH") { MetroShortDesc = "Vendor-agnostic data center with connectivity to all major domestic connection providers, including China Telecom, China Unicom and China Mobile, plus the main VPN providers in China.";}
 if(metroCode ==  "BG") { MetroShortDesc = "Ideal location for companies looking to expand within Latin America and connect easily to the United States with high-capacity bandwidth.";}
 if(metroCode ==  "DU") { MetroShortDesc = "Transport hub between Netherlands, Belgium, and the rest of Germany and a major industrial region.";}
 if(metroCode ==  "FR") { MetroShortDesc = "Leading European financial center and hub for commerce and manufacturing.";}
 if(metroCode ==  "HH") { MetroShortDesc = "Leading maritime and logistics hub and a top interconnection point for subsea  cables connecting to Frankfurt.";}
 if(metroCode ==  "HK") { MetroShortDesc = "Citywide connected campus that enables efficient resource allocation and resiliency.";}
 if(metroCode ==  "OS") { MetroShortDesc = "Direct connection to the Dojima area communications network core, with state-of-the-art seismic protection features.";}
 if(metroCode ==  "TY") { MetroShortDesc = "Richest, most expansive digital ecosystem in Asia with a significant number of network and cloud service providers as well as major internet and peering exchanges.";}
 if(metroCode ==  "EN") { MetroShortDesc = "Regional hub supporting domestic and international applications including business continuity and data management compliance.";}
 if(metroCode ==  "ZW") { MetroShortDesc = "Direct connectivity to Equinix Data Centers in Amsterdam and Enschede make Zwolle an ideal backup location.";}
 if(metroCode ==  "SL") { MetroShortDesc = "First carrier-neutral IBX data center in South Korea, one of the most digitally connected countries in Asia.";}
 if(metroCode ==  "LS") { MetroShortDesc = "Our Lisbon International Business Exchange&trade; (IBX&reg;) data center is the main hub for Portugal. It is strategically located near subsea cables connecting the Iberian Peninsula, Africa and South America, and hosts a growing community of cloud and network service providers.";}
 if(metroCode ==  "SG") { MetroShortDesc = "Widest range of reliable connectivity options between Southeast Asia and the rest of the world.";}
 if(metroCode ==  "BA") { MetroShortDesc = "Our International Business Exchange&trade; (IBX&reg;) data center is powered by 100% renewable energy and is strategically located in Barcelona, a renowned innovation hub rich with technical expertise.";}
 if(metroCode ==  "MD") { MetroShortDesc = "The most connected city in the Iberian region with a vibrant ecosystem of cloud, network service providers and large enterprises.";}
 if(metroCode ==  "SA") { MetroShortDesc = "Seville is an important commercial center for southern Spain, with subsea cable connections to Morocco and the Canary Islands. Our International Business Exchange&trade; (IBX&reg;) data center is ideally located for business continuity operations. With 100% renewable energy, it will help reduce your carbon footprint.";}
 if(metroCode ==  "AD") { MetroShortDesc = "Important regional center of commerce and expansion location for domestic and international businesses serving the growing MENA market.";}
 if(metroCode ==  "LD") { MetroShortDesc = "One of the world's most important financial and business centers, served by excellent communication links and offering unrivalled access to European markets.";}
 if(metroCode ==  "DE") { MetroShortDesc = "Low risk for natural disasters, making it ideal for business continuity and disaster recovery operations.";}
  var metroDescriptionContent="";
      metroDescriptionContent+="<div class='' id='detailsOfSubmap'>";
      metroDescriptionContent+="<div><span onclick='resetMetroSelection()' style='cursor:pointer;'><img style='height: 20px;' src='"+curBaseUrl+"images/arrow_left.png' alt=''></span><h3 style='font-weight: bold; margin-top: -25px; margin-left: 25px;'>"+sTitle+"</h3>";
      metroDescriptionContent+="<img src='"+curBaseUrl+"'images/equinix_metro_thumb.png' alt='' style='display:none;'></div>";
      metroDescriptionContent+="<div><hr style='margin: 0px 15px;'><ul class='metroMapData'><li>"+MetroShortDesc+"</li></ul></div>";
      metroDescriptionContent+="<div><p style='color: grey; margin-left: 30px;'><strong> CLOUD SERVICE PROVIDERS </strong></p><hr style='margin-left: 30px;'><ul class='tickMark' style='padding-left: 11% !important;'>"+metroDesCSPAppendData+"</ul></div>";
      metroDescriptionContent+="<div><p style='margin-left: 25px;'><strong> NETWORK PROVIDERS </strong></p><hr style='margin-left: 30px;'><ul class='tickMark tickMarkNSP' style='padding-left: 6%;'>"+metroDesNSPAppendData+"</ul></div>";
      metroDescriptionContent+="<div><p style='color: grey; margin-left: 30px;'><strong> USEFUL LINKS </strong></p><hr style='margin-left: 30px;'><p style='color: red; margin-left: 30px;'><a href='"+metroObject.dataSheetLink+"' target='_blank' style='text-Decoration:none;color:#f1545a;'>Download Metro Data Sheet</a></p><p style='color: red; margin-left: 30px;'><a href='"+metroObject.metroSheetLink+"' target='_blank' style='text-Decoration:none;color:#f1545a;'>Equinix.com Metro site</a></p></div>";
      metroDescriptionContent+="</div>";
      document.getElementById('dispMetroJS').innerHTML=metroDescriptionContent;
}


function initialize(){
hideListings();
    $('.gm-style-iw.gm-style-iw-c').attr('style', 'min-width: 0 !important;');
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
  var defaultMarkerIcon = curBaseUrl+'Icons/marker-circle.png';
   
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
    markerIcon = defaultMarkerIcon;
  }
  
  /* Replacing the Declined CSP list with jQuery */
  const metroReplacementData = [
  { 'VERIZON': '' },
  { 'SAP':'' },
  { 'Amazon':'AWS' },
  { 'amazon':'AWS' },
  ];
  
  var titleWithComma = metroReplacementData.reduce((f, s) => `${f}`.replace(Object.keys(s)[0], s[Object.keys(s)[0]]), metroCSPData); 
  var titleCommaReplace = titleWithComma.replace(",,",",");
  var titleA = titleCommaReplace.replace(/(.+),$/, '$1');
  var title = titleA.replace(new RegExp(',', 'g'), ', ');
   var filterCSP = titleCommaReplace;
/*Gray out related module code start */
if(CSPList !='' && NSPList !=''){
  console.log('Two way Seachr');
    var combinationData= CSPList+','+NSPList;
    var serverResponse = filterCSP+','+NSPData;
    var o_string=serverResponse;
      var o_lower = o_string.toLowerCase();
      var o_finalData_string= o_lower.split(',').sort();
     var o_finalData = $.trim(o_finalData_string);
      var i_string=combinationData;
      if(i_string !=''){
      var i_lower = i_string.toLowerCase();
      var i_finalData_string= i_lower.split(',').sort();
        var i_finalData = $.trim(i_finalData_string);
      }
if(i_string !='' && i_finalData.length > 0)
    {
      if(JSON.stringify(o_finalData)==JSON.stringify(i_finalData))
      {
        markerIcon = defaultMarkerIcon;
        
      }
      else{
        var ci,ii;
        var unMatchingStatus=0;
        for(ii=0;ii<i_finalData.length;ii++)
        {
            var curInput = i_finalData[ii];
            
            if(o_finalData.includes(curInput)!=true){
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
          markerIcon = defaultMarkerIcon;
          //console.log(dispTitle+ '=> Matched Icon = >' + unMatchingStatus);
        }
    }
    }
console.log('Two way Seachr end');
}else if(CSPList !='')
{
      var o_string=filterCSP;
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
        markerIcon = defaultMarkerIcon;
        
      }
      else{
        var ci,ii;
        var unMatchingStatus=0;
        for(ii=0;ii<i_finalData.length;ii++)
        {
            var curInput = i_finalData[ii];
            
            if(o_finalData.includes(curInput)!=true){
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
           markerIcon = defaultMarkerIcon;
          //console.log(dispTitle+ '=> Matched Icon = >' + unMatchingStatus);
        }
    }
    }
  }else if(NSPList !='')
{
 // console.log('NSP Entry came...');
    
      var o_string=NSPData;
      var o_lower = o_string.toLowerCase();
      var o_finalData_string= o_lower.split(',').sort();
        var o_finalData = $.trim(o_finalData_string);
      var i_string=NSPList;
      if(i_string !=''){
      var i_lower = i_string.toLowerCase();
      var i_finalData_string= i_lower.split(',').sort();
          var i_finalData = $.trim(i_finalData_string);
      }
    //alert(i_finalData.length);
    if(i_string !='' && i_finalData.length > 0)
    {
         
      if(JSON.stringify(o_finalData)==JSON.stringify(i_finalData))
      {
           
        markerIcon = markerIcon;
         
      }
      else{
           
        var ci,ii;
        var unMatchingStatus=0;
          //alert(i_finalData.length);
          var inputDataLength = i_finalData.split(',');
          console.log(inputDataLength + "  #####  "+ inputDataLength.length);
          
        for(ii=0;ii<inputDataLength.length;ii++)
        {
            var curInput = inputDataLength[ii];
            //alert(curInput);
            if(curInput !='bt')
            {
                   if(o_finalData.includes(curInput)!=true) {
                           unMatchingStatus++;
                        } 
            }else{
                var checkStatus = o_finalData.indexOf(curInput) != -1;
                
                if(checkStatus!= true)
                    {
                         unMatchingStatus++;
                    }
            }
            
        }
       // console.log(dispTitle+'==Disp'+unMatchingStatus);
        if(unMatchingStatus > 0){
            
         // console.log(dispTitle+ '=> Update Marker icon = >' + unMatchingStatus);
          markerIcon =icon_disable;
          metroSClassName = 'metroNotFill';
        }
    }
    }
    
     
  }
   //alert(metroSClassName);
    
    if(clickedMetro !=''){
      if(clickedMetro ==  metroCode){
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
    }else{
      pointerExp = '-';
      pointerPlus =  -2;
    }
    switch(dispTitle)
    {
      case 'Silicon Valley': pointerExp = '+';pointerPlus =  4;break;
      case 'Seattle': pointerExp = '+';pointerPlus =  11;break;
      case 'Los Angeles': pointerExp = '+';pointerPlus =  11;break;
      case 'Atlanta': pointerExp = '-';pointerPlus = 3;break;
      case 'Washington, D.C.': pointerExp = '-';pointerPlus =  10;break;
      case 'Rio de Janeiro': pointerExp = '-';pointerPlus =  6;break;
      case 'Helsinki': pointerExp = '-';pointerPlus =  6;break;
      case 'Paris': pointerExp = '-';pointerPlus =  1;break;
      case 'Zurich': pointerExp = '-';pointerPlus =  1;break;
      case 'Istanbul': pointerExp = '-';pointerPlus =  1;break;
      case 'Abu Dhabi': pointerExp = '-';pointerPlus =  1;break;
      case 'Manchester': pointerExp = '-';pointerPlus =  1;break;
      case 'Dusseldorf': pointerExp = '+';pointerPlus =  11;break;
      case 'Amsterdam': pointerExp = '+';pointerPlus =  19;break;
      case 'Warsaw': pointerExp = '+';pointerPlus = 20;break;
      case 'Seville': pointerExp = '+';pointerPlus = 11;break;
      case 'Frankfurt': pointerExp = '+';pointerPlus = 11;break;
      case 'Perth': pointerExp = '+';pointerPlus = 15;break;
      case 'Sao Paulo': pointerExp = '-';pointerPlus =3;break;
      case 'Sofia': pointerExp = '+';pointerPlus =14;break;
      case 'Lisbon': pointerExp = '+';pointerPlus =22;break;
            
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
  
 if(isMetroSelected =='' && document.getElementById('dispMetroJS') && clickedMetro==''){
    document.getElementById('dispMetroJS').innerHTML=ulsideBarDispMetroList;
  }
}




   /*function setMetroCodeInCPQ(mertoData) {
  //alert(mertoData);
    var Metro_Input =  mertoData.metroCode;
    updateMetroLocations(Metro_Input);
}*/




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
        keyboardShortcuts: false,
        disableDefaultUI: true,
        disableAutoPan: true,
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
		  {
    "featureType": "all",
    "elementType": "labels.text",
    "stylers": [
      {
    "visibility": "off"
      }
    ]
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [{
      visibility: 'off'
    }]
  },
  {
    featureType: "administrative.province",
    elementType: "all",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "road",
    elementType: "all",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "transit",
    elementType: "all",
    stylers: [
      { visibility: "off" }
    ]
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
   
  //  $('.gm-style-iw.gm-style-iw-c').show();
   //$('.gm-style-iw.gm-style-iw-c').css({'display','block !import'});
//$(".gm-style-iw.gm-style-iw-c").css("display:block !important;");
   // $('.gm-style .gm-style-iw-t').hide();
  var cAppendData='';
  var CBP_DATA=marker.title;
    
  var CBP_DataArray=CBP_DATA.split(','),ci,ni;
  var M_NSP_Input =  marker.nspData;
  var M_NSP_Input_Count = 0;
  if(M_NSP_Input !=''){
    M_NSP_Input_Count = M_NSP_Input.split(',').length;
  }
  for(ci=0;ci<CBP_DataArray.length;ci++){ 
    var cspImgLink = CBP_DataArray[ci].trim();
    if(cspImgLink!='' && cspImgLink!='VERIZON' && cspImgLink!='SAP' ){
      
      var cspImagePath = curBaseUrl+'images/'+cspImgLink+'.png';
    cAppendData+='<div style="display:flex;"><div style="flex:1"><img style="margin-bottom:12px;" src="'+cspImagePath+'"></div></div>';
    }
    }
    if(M_NSP_Input_Count > 0){
      //console.log(M_NSP_Input);
      var removeSpace = M_NSP_Input.replace(new RegExp(', ', 'g'), ',');
      var sortNSPData=removeSpace.split(",").sort();
      
      var finalNspData=' '+sortNSPData;
      //console.log('After Sort'+finalNspData);
      var LfinalNspData = finalNspData.replace(new RegExp(',', 'g'), ', ');
      //console.log('Final'+LfinalNspData);
      cAppendData+='<br/><div style="color:#ccc;" title="'+LfinalNspData+'">+'+M_NSP_Input_Count+' Network Providers</div>';
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
            var timeOutLevel=200;
            //$('.gm-style .gm-style-iw-t').hide();
            
            var metroTooltipClass="defaultClass";
            switch(marker.metroName)
            {
              case 'Seattle': metroTooltipClass = "seattleClass"; timeOutLevel="1000"; break;
              case 'Silicon Valley': metroTooltipClass = "siliconValley"; break;
              case 'Los Angeles': metroTooltipClass = "siliconValley"; break;
              case 'Chicago': metroTooltipClass = "chicagoClass"; break;
              case 'Boston': metroTooltipClass = "bostanClass"; break;
              case 'New York': metroTooltipClass = "newyorkClass"; break;
              case 'Philadelphia': metroTooltipClass = "PhiladelphiaClass"; break;
              case 'Washington, D.C.': metroTooltipClass = "WashingtonClass"; break;
              case 'Culpeper': metroTooltipClass = "CulpeperClass"; break;
              case 'Philadelphia': metroTooltipClass = "PhiladelphiaClass"; break;
              case 'Miami': metroTooltipClass = "MiamiClass"; break;
              case 'Sao Paulo': metroTooltipClass = "Sao-PauloClass"; break;
              case 'Rio de Janeiro': metroTooltipClass = "riodeJaneiroClass"; break;
              case 'Bogota': metroTooltipClass = "bogotaClass"; break;
            //  case 'Perth': metroTooltipClass = "perthClass"; break;
            case 'Hong Kong': metroTooltipClass = "hongkongClass"; break;
            case 'Tokyo': metroTooltipClass = "tokyoClass"; break;
            case 'Singapore': metroTooltipClass = "singaporeClass"; break;
            case 'Sofia': metroTooltipClass = "sofiaClass"; break;
            case 'Paris': metroTooltipClass = "parisClass"; break;
            case 'Dusseldorf': metroTooltipClass = "dusseldorfClass"; break;
            case 'Frankfurt': metroTooltipClass = "frankfurtClass"; break;
            case 'Munich': metroTooltipClass = "munichClass"; break;
            case 'Dublin': metroTooltipClass = "dublinClass"; break;
            case 'Milan': metroTooltipClass = "milanClass"; break;
            case 'Zwolle': metroTooltipClass = "zwolleClass"; break;
            case 'Amsterdam': metroTooltipClass = "amsterdamClass"; break;
            case 'Enschede': metroTooltipClass = "enschedeClass"; break;
            case 'Warsaw': metroTooltipClass = "warsawClass"; break;
            case 'Barcelona': metroTooltipClass = "barcelonaClass"; break;
            case 'Madrid': metroTooltipClass = "madridClass"; break;
            case 'Zurich': metroTooltipClass = "zurichClass";break;
            case 'Istanbul': metroTooltipClass = "istanbulClass";break;
            case 'Abu Dhabi':metroTooltipClass = "abudhabiClass";break;
            case 'Dubai' :metroTooltipClass = "dubaiClass";break;
            case 'Manchester' :metroTooltipClass = "manchesterClass";break;
            case 'London' :metroTooltipClass = "londonClass";break;
            case 'Houston' :metroTooltipClass = "houstonClass";break;
            case 'Denver' :metroTooltipClass = "denverClass";break;
            case 'Dallas' :metroTooltipClass = "dallasClass";break;
            case 'Atlanta' :metroTooltipClass = "atlantaClass";break;
            }
            if(metroTooltipClass !='defaultClass'){
            var finalMetroTootlTipClass = metroTooltipClass=='' ? '' : " "+metroTooltipClass;
            var x = document.getElementsByClassName("gm-style-iw")[0].className += finalMetroTootlTipClass;
         
        setTimeout(function(){
           $('.gm-style-iw.gm-style-iw-c').attr('style', 'opacity:1');
           
            //$('.gm-style-iw.gm-style-iw-c').attr('style', 'display: block !important');
          
            if(marker.metroName == "Houston"){
              var ele = document.querySelector('.gm-style .gm-style-iw-t');
            ele.pseudoStyle("after","visibility", "visible !important");
            }
            if(marker.metroName == "Denver"){
              var ele = document.querySelector('.gm-style .gm-style-iw-t');
            ele.pseudoStyle("after","visibility", "visible !important");
            }
            if(marker.metroName == "Dallas"){
              var ele = document.querySelector('.gm-style .gm-style-iw-t');
            ele.pseudoStyle("after","visibility", "visible !important");
            }
            if(marker.metroName == "Atlanta"){
              var ele = document.querySelector('.gm-style .gm-style-iw-t');
            ele.pseudoStyle("after","visibility", "visible !important");
            }
          if(marker.metroName == "Seattle"){
            var ele = document.querySelector('.gm-style .gm-style-iw-t');
            ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "18px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(48deg) !important");
          $('.gm-style-iw.gm-style-iw-c.seattleClass').show();
          }

          if(marker.metroName == "Silicon Valley" || marker.metroName == "Los Angeles"){
            var ele = document.querySelector('.gm-style .gm-style-iw-t');
            ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "18px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(48deg) !important");
            $('.gm-style-iw.gm-style-iw-c.siliconValley').show();
            }

            if(marker.metroName == "Chicago"){
              var ele = document.querySelector('.gm-style .gm-style-iw-t');
                ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "-19px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(223deg) !important");
              $('.gm-style-iw.gm-style-iw-c.chicagoClass').show();
              }

              if(marker.metroName == "Boston"){
                var ele = document.querySelector('.gm-style .gm-style-iw-t');
              ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "-19px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(223deg) !important");
                $('.gm-style-iw.gm-style-iw-c.bostanClass').show();
                }


                if(marker.metroName == "New York"){
                  var ele = document.querySelector('.gm-style .gm-style-iw-t');
              ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "-19px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(223deg) !important");
                  $('.gm-style-iw.gm-style-iw-c.newyorkClass').show();
                  }

                  if(marker.metroName == "Philadelphia"){
                    var ele = document.querySelector('.gm-style .gm-style-iw-t');
              ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "-19px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(223deg) !important");
                      $('.gm-style-iw.gm-style-iw-c.PhiladelphiaClass').show();
                  }
                    if(marker.metroName == "Washington, D.C."){
                      var ele = document.querySelector('.gm-style .gm-style-iw-t');
              ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "-19px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(223deg) !important");
                      $('.gm-style-iw.gm-style-iw-c.WashingtonClass').show();
                    }
                      if(marker.metroName == "Culpeper"){
                        var ele = document.querySelector('.gm-style .gm-style-iw-t');
              ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "-19px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(223deg) !important");
                        $('.gm-style-iw.gm-style-iw-c.CulpeperClass').show();
                      } 

                        if(marker.metroName == "Miami"){
                          var ele = document.querySelector('.gm-style .gm-style-iw-t');
              ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "-19px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(223deg) !important");
                          $('.gm-style-iw.gm-style-iw-c.MiamiClass').show();
                        }

                        if(marker.metroName == "Sao Paulo"){
                          var ele = document.querySelector('.gm-style .gm-style-iw-t');
              ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "-19px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(223deg) !important");
                          $('.gm-style-iw.gm-style-iw-c.Sao-PauloClass').show();
                        }

                        if(marker.metroName == "Rio de Janeiro"){
                          var ele = document.querySelector('.gm-style .gm-style-iw-t');
              ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "-19px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(223deg) !important");
                          $('.gm-style-iw.gm-style-iw-c.riodeJaneiroClass').show();
                        }

                        if(marker.metroName == "Bogota"){
                          var ele = document.querySelector('.gm-style .gm-style-iw-t');
                          ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "18px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(48deg) !important");
                          $('.gm-style-iw.gm-style-iw-c.bogotaClass').show();
                        }

                       /* if(marker.metroName == "Perth"){
                          var ele = document.querySelector('.gm-style .gm-style-iw-t');
                          ele.pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "18px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(48deg) !important");
                          $('.gm-style-iw.gm-style-iw-c.perthClass').show();
                        }*/
                        if(marker.metroName == "Hong Kong"){
                          var ele = document.querySelector('.gm-style .gm-style-iw-t');
                            ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "-19px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(223deg) !important");
                          $('.gm-style-iw.gm-style-iw-c.hongkongClass').show();
                          }

                          if(marker.metroName == "Tokyo"){
                            var ele = document.querySelector('.gm-style .gm-style-iw-t');
                              ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "-19px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(223deg) !important");
                            $('.gm-style-iw.gm-style-iw-c.tokyoClass').show();
                            }
                            if(marker.metroName == "Singapore"){
                              var ele = document.querySelector('.gm-style .gm-style-iw-t');
                                ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "-19px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(223deg) !important");
                              $('.gm-style-iw.gm-style-iw-c.singaporeClass').show();
                              }

                              if(marker.metroName == "Sofia"){
                                var ele = document.querySelector('.gm-style .gm-style-iw-t');
                                ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "18px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(48deg) !important");
                                $('.gm-style-iw.gm-style-iw-c.sofiaClass').show();
                                }

                                if(marker.metroName == "Paris" ){
                                  var ele = document.querySelector('.gm-style .gm-style-iw-t');
                                  ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "18px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(48deg) !important");
                                  $('.gm-style-iw.gm-style-iw-c.parisClass').show();
                                  }

                                  if(marker.metroName == "Dusseldorf"){
                                    var ele = document.querySelector('.gm-style .gm-style-iw-t');
                                    ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "18px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(48deg) !important");
                                    $('.gm-style-iw.gm-style-iw-c.dusseldorfClass').show();
                                    }
                                    if(marker.metroName == "Frankfurt"){
                                      var ele = document.querySelector('.gm-style .gm-style-iw-t');
                                      ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "18px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(48deg) !important");
                                      $('.gm-style-iw.gm-style-iw-c.frankfurtClass').show();
                                      }

                                      if(marker.metroName == "Munich"){
                                        var ele = document.querySelector('.gm-style .gm-style-iw-t');
                                        ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "18px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(48deg) !important");
                                        $('.gm-style-iw.gm-style-iw-c.munichClass').show();
                                        }


                                        if(marker.metroName == "Dublin"){
                                          var ele = document.querySelector('.gm-style .gm-style-iw-t');
                                            ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "-19px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(223deg) !important");
                                          $('.gm-style-iw.gm-style-iw-c.dublinClass').show();
                                          }
                            
                                          if(marker.metroName == "Milan"){
                                            var ele = document.querySelector('.gm-style .gm-style-iw-t');
                                            ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "18px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(48deg) !important");
                                            $('.gm-style-iw.gm-style-iw-c.milanClass').show();
                                            } 

                                            if(marker.metroName == "Zwolle"){
                                              var ele = document.querySelector('.gm-style .gm-style-iw-t');
                                              ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "-19px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(223deg) !important");
                                              $('.gm-style-iw.gm-style-iw-c.zwolleClass').show();
                                              }

                                              if(marker.metroName == "Amsterdam"){
                                                var ele = document.querySelector('.gm-style .gm-style-iw-t');
                                                ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "18px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(48deg) !important");
                                                $('.gm-style-iw.gm-style-iw-c.amsterdamClass').show();
                                                }

                                                if(marker.metroName == "Enschede"){
                                                  var ele = document.querySelector('.gm-style .gm-style-iw-t');
                                                  ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "-19px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(223deg) !important");
                                                  $('.gm-style-iw.gm-style-iw-c.enschedeClass').show();
                                                  } 
                                                  if(marker.metroName == "Warsaw"){
                                                    var ele = document.querySelector('.gm-style .gm-style-iw-t');
                                                    ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "-19px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(223deg) !important");
                                                    $('.gm-style-iw.gm-style-iw-c.warsawClass').show();
                                                    } 

                                                    if(marker.metroName == "Madrid"){
                                                      var ele = document.querySelector('.gm-style .gm-style-iw-t');
                                                      ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "18px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(48deg) !important");
                                                      $('.gm-style-iw.gm-style-iw-c.madridClass').show();
                                                      }
                                          
                                                      if(marker.metroName == "Barcelona"){
                                                        var ele = document.querySelector('.gm-style .gm-style-iw-t');
                                                          ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "-19px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(223deg) !important");
                                                        $('.gm-style-iw.gm-style-iw-c.barcelonaClass').show();
                                                        }
                        
                                                        if(marker.metroName == "Zurich"){
                                                          var ele = document.querySelector('.gm-style .gm-style-iw-t');
                                                            ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "-19px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(223deg) !important");
                                                          $('.gm-style-iw.gm-style-iw-c.zurichClass').show();
                                                          }

                                                          if(marker.metroName == "Istanbul"){
                                                            var ele = document.querySelector('.gm-style .gm-style-iw-t');
                                                            ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "18px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(48deg) !important");
                                                            $('.gm-style-iw.gm-style-iw-c.istanbulClass').show();
                                                            }

                                                            if(marker.metroName == "Abu Dhabi"){
                                                              var ele = document.querySelector('.gm-style .gm-style-iw-t');
                                                                ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "-19px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(223deg) !important");
                                                              $('.gm-style-iw.gm-style-iw-c.abudhabiClass').show();
                                                              }
                                                              if(marker.metroName == "Dubai"){
                                                                var ele = document.querySelector('.gm-style .gm-style-iw-t');
                                                                  ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "-19px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(223deg) !important");
                                                                $('.gm-style-iw.gm-style-iw-c.dubaiClass').show();
                                                                }


                                                                if(marker.metroName == "Manchester"){
                                                                  var ele = document.querySelector('.gm-style .gm-style-iw-t');
                                                                  ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "18px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(48deg) !important");
                                                                  $('.gm-style-iw.gm-style-iw-c.manchesterClass').show();
                                                                  }

                                                                  if(marker.metroName == "London"){
                                                                    var ele = document.querySelector('.gm-style .gm-style-iw-t');
                                                                    ele.pseudoStyle("after","visibility", "visible !important").pseudoStyle("after","top", "19px !important").pseudoStyle("after","left", "18px !important").pseudoStyle("after","transform", "translate(-50%,-50%) rotate(48deg) !important");
                                                                    $('.gm-style-iw.gm-style-iw-c.londonClass').show();
                                                                    }
                          
          
        },timeOutLevel);
            }else{
                //$('.gm-style-iw.gm-style-iw-c').attr('style', 'display: block !important');
                 $('.gm-style-iw.gm-style-iw-c').attr('style', 'opacity:1');
            }
        }
       // 
        // Use streetview service to get the closest streetview image within
        // 50 meters of the markers position
        streetViewService.getPanoramaByLocation(marker.position,
            radius, getStreetView);
        // Open the infowindow on the correct marker.
        infowindow.open(map, marker);
    }
}

function setMetroCodeInCPQ(mertoData) {
    var Metro_Input =  mertoData.metroCode;
    updateMetroLocations(mertoData.id,Metro_Input);
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





