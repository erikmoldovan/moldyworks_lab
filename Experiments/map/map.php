<!DOCTYPE html>
<?php
/*
    Stuff left to do:

    Make IE8 fallback (based on image mapping)
    Add blocks to select small $states
    Add map key
    Add state acronyms to map
*/

    $map = json_decode(file_get_contents('readme.json'), true);
    $orig = 'tt=State+Anti-Bullying+Laws+%26+Policies&amp;ttn=+&amp;tft=+&amp;up=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2F&amp;us=%2Findex.html&amp;utg=_self&amp;hct=on&amp;sets=3&amp;cn1=63a100&amp;cnt1=ffffff&amp;ch1=fff200&amp;cht1=000000&amp;cd1=dddddd&amp;cdt1=eeeeee&amp;cc1=ff0000&amp;cn2=5ffa44&amp;cnt2=424242&amp;ch2=fff200&amp;cht2=000000&amp;cd2=dddddd&amp;cdt2=eeeeee&amp;cc2=ff0000&amp;cn3=0055b5&amp;cnt3=ffffff&amp;ch3=fff200&amp;cht3=000000&amp;cd3=dddddd&amp;cdt3=eeeeee&amp;cc3=ff0000&amp;cb=424242&amp;tl1=Law+Only&amp;tl2=Policy+Only&amp;tl3=Both+Law+and+Policy+&amp;ss_al=3&amp;su_al=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Falabama%2Findex.html&amp;ss_ak=3&amp;su_ak=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Falaska%2Findex.html&amp;ss_az=1&amp;su_az=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Farizona%2Findex.html&amp;ss_ar=3&amp;su_ar=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Farkansas%2Findex.html&amp;ss_ca=3&amp;su_ca=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fcalifornia%2Findex.html&amp;ss_co=3&amp;su_co=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fcolorado%2Findex.html&amp;ss_ct=3&amp;su_ct=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fconnecticut%2Findex.html&amp;ss_de=3&amp;su_de=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fdelaware%2Findex.html&amp;ss_dc=3&amp;su_dc=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fdistrict-columbia%2Findex.html&amp;ss_fl=3&amp;su_fl=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fflorida%2Findex.html&amp;ss_ga=3&amp;su_ga=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fgeorgia%2Findex.html&amp;ss_hi=3&amp;su_hi=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fhawaii%2Findex.html&amp;ss_id=3&amp;su_id=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fidaho%2Findex.html&amp;ss_il=1&amp;su_il=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fillinois%2Findex.html&amp;ss_in=1&amp;su_in=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Findiana%2Findex.html&amp;ss_ia=3&amp;su_ia=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fiowa%2Findex.html&amp;ss_ks=1&amp;su_ks=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fkansas%2Findex.html&amp;ss_ky=3&amp;su_ky=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fkentucky%2Findex.html&amp;ss_la=3&amp;su_la=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Flouisiana%2Findex.html&amp;ss_me=3&amp;su_me=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fmaine%2Findex.html&amp;ss_md=3&amp;su_md=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fmaryland%2Findex.html&amp;ss_ma=3&amp;su_ma=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fmassachusetts%2Findex.html&amp;ss_mi=3&amp;su_mi=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fmichigan%2Findex.html&amp;ss_mn=1&amp;su_mn=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fminnesota%2Findex.html&amp;ss_ms=3&amp;su_ms=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fmississippi%2Findex.html&amp;ss_mo=3&amp;su_mo=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fmissouri%2Findex.html&amp;ss_mt=2&amp;su_mt=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fmontana%2Findex.html&amp;ss_ne=3&amp;su_ne=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fnebraska%2Findex.html&amp;ss_nv=3&amp;su_nv=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fnevada%2Findex.html&amp;ss_nh=3&amp;su_nh=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fnew-hampshire%2Findex.html&amp;ss_nj=3&amp;su_nj=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fnew-jersey%2Findex.html&amp;ss_nm=3&amp;su_nm=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fnew-mexico%2Findex.html&amp;ss_ny=3&amp;su_ny=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fnew-york%2Findex.html&amp;ss_nc=3&amp;su_nc=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fnorth-carolina%2Findex.html&amp;ss_nd=1&amp;su_nd=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fnorth-dakota/index.html&amp;ss_oh=3&amp;su_oh=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fohio%2Findex.html&amp;ss_ok=3&amp;su_ok=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Foklahoma%2Findex.html&amp;ss_or=3&amp;su_or=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Foregon%2Findex.html&amp;ss_pa=3&amp;su_pa=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fpennsylvania%2Findex.html&amp;ss_ri=3&amp;su_ri=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Frhode-island%2Findex.html&amp;ss_sc=3&amp;su_sc=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fsouth-carolina%2Findex.html&amp;ss_sd=3&amp;su_sd=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fsouth-dakota%2Findex.html&amp;ss_tn=1&amp;su_tn=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Ftennessee%2Findex.html&amp;ss_tx=1&amp;su_tx=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Ftexas%2Findex.html&amp;ss_ut=3&amp;su_ut=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Futah%2Findex.html&amp;ss_vt=3&amp;su_vt=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fvermont%2Findex.html&amp;ss_va=3&amp;su_va=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fvirginia%2Findex.html&amp;ss_wa=3&amp;su_wa=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fwashington%2Findex.html&amp;ss_wv=3&amp;su_wv=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fwest-virginia%2Findex.html&amp;ss_wi=3&amp;su_wi=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fwisconsin%2Findex.html&amp;ss_wy=3&amp;su_wy=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fwyoming%2Findex.html&amp;ss_as=3&amp;sd_as=on&amp;ss_fm=3&amp;sd_fm=on&amp;ss_gu=3&amp;sd_gu=on&amp;ss_mh=3&amp;sd_mh=on&amp;ss_mp=3&amp;sd_mp=on&amp;ss_pw=3&amp;sd_pw=on&amp;ss_pr=3&amp;su_pr=http%3A%2F%2Fwww.stopbullying.gov%2Flaws%2Fpuerto-rico.html&amp;ss_vi=3&amp;sd_vi=on&amp;fid=flash-state-map&amp;fnm=flash-state-map&amp;fcl=clearfix&amp;fbg=%23ffffff&amp;fw=640&amp;fh=480&amp;cns3=al,ak,ar,ca,co,ct,de,dc,fl,ga,hi,id,ia,ky,la,me,md,ma,mi,ms,mo,ne,nv,nh,nj,nm,ny,nc,oh,ok,or,pa,ri,sc,sd,ut,vt,va,wa,wv,wi,wy,as,fm,gu,mh,mp,pw,pr,vi&amp;cns1=az,il,in,ks,mn,nd,tn,tx&amp;cns2=mt&amp;';
    $states = explode('&', urldecode(html_entity_decode($orig)));

    // We want an array that looks like this:
    // $var[state_key] = array([url][code]);
    $output = array();
    foreach ($states as $elem) {
        // our array children start with "ss_" or "su_", catch these
        if (strpos($elem, "ss_") === 0 || strpos($elem, "su_") === 0) {
            list($key, $value) = explode("=", $elem);
            list($type, $state) = explode("_", $key);

            if ($type == 'ss') {
                $output[$state]['code'] = $value;
            }
            elseif ($type == 'su') {
                $output[$state]['url'] = substr_replace($value, '.html', -11);
            }
        }
    }

    $final = array();
    $final["type"] = "FeatureCollection";
    $i = 0;

    foreach ($map['features'] as $value) {
        $current_state = str_replace(" ", "-", strtolower($value['properties']['name']));

        foreach ($output as $state_key => $state_values) {
            $processor = strpos($state_values['url'], "/" . $current_state . ".html");
            if ($processor !== FALSE) {
                $final["features"][$i] = $state_values + $value;
                $i++;
                continue;
            }
        }
    }

    $fp = fopen('states_final.json', 'w');
    fwrite($fp, json_encode($final));
    fclose($fp);
?>
<meta charset="utf-8">
<title>Albers Projection</title>
<style>
    body {
        background-color: #ccc;
    }
    path {
        fill: #ccc;
        stroke: #fff;
        stroke-width: 1px;
    }
</style>
<svg width="960" height="500"></svg>
<script src="http://d3js.org/d3.v2.js?2.9.1"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script>
    d3.json("states_final.json", function(collection) {
        d3.select("svg").selectAll("path")
            .data(collection.features)
            .enter().append("path")
            .attr("d", d3.geo.path().projection(d3.geo.albersUsa()))
            .style("fill", fillStates)
            .on("click", click)
            .on("mouseover", hoverOnState)
            .on("mouseout", hoverOutState);
    });

    function fillStates(d){
        if(d.code == 3){
            return "blue";
        } else if(d.code == 2){
            return "red";
        } else if(d.code == 1){
            return "green";
        }
    }

    function hoverOnState(d){
        d3.select(this).style("fill", "yellow");
    }

    function hoverOutState(d){
        d3.select(this).style("fill", fillStates(d));
    }

    function click(d){
        window.open(d.url);
    }
</script>