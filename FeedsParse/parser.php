<?php
/**
 * Created by JetBrains PhpStorm.
 * User: moldy
 * Date: 1/23/13
 * Time: 3:35 PM
 * To change this template use File | Settings | File Templates.
 */

    // Scrapes Metallica Discography wiki page and stores the full HTML locally

/*    $fw = fopen('dump.html', 'w');
    $ch = curl_init('http://en.wikipedia.org/wiki/Metallica_discography');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FILE, $fw);
    $html = curl_exec($ch);*/

    // Processes HTML contents into digestable and friendly array structure

/*    $file = fopen("dump.html", "r");
    $i = 0;
    $members = [];

    while(!feof($file)){
        $tempLine = fgets($file);
        $members[$i] = explode('\n', $tempLine);
        $i++;
    }

    fclose($file);

    // Further refinement of the Metallica ore, down to the tables of data we want to pull

    $flag = false;

    for($k = 0; $k < count($members); $k++){
        $tempString = $members[$k][0];

        if(preg_match("/wikitable/", $tempString)){
            $flag = true;
        }

        if($flag){
            print($members[$k][0]);
        }

        if(preg_match("#</table>#", $tempString) && $flag == true){
            break;
        }*/
    //}


    $band_id = '65f4f0c5-ef9e-490c-aee3-909e7ae6b2ab';

    $temp = file_get_contents('http://www.musicbrainz.org/ws/2/release-group/?query=arid:' . $band_id);
    $temp = simplexml_load_string($temp);
    print_r('<pre>');
//    print_r($temp->{'release-group-list'});

    $count = $temp->{'release-group-list'}->attributes()->count;
    $discography = array();

    for($i = 0; $i < $count; $i++){
        $title = $temp->{'release-group-list'}->{'release-group'}[$i]->{'title'};
        $id = $temp->{'release-group-list'}->{'release-group'}[$i]->attributes()->id;
//        $p_type = $temp->{'release-group-list'}->{'release-group'}[$i]->{'primary-type'};
//        $s_type = $temp->{'release-group-list'}->{'release-group'}[$i]->{'release-list'}->{'release'}->{'status'};
//        $r_type = $temp->{'release-group-list'}->{'release-group'}[$i]->attributes()->type;
//
//        print_r($title . '<br>' . $p_type . '<br>' . $s_type . '<br>' . $r_type . '<br><br>');

        $discography[$i]->title = $title;
        $discography[$i]->id = $id;
    }

    for($k = 0; $k < count($discography); $k++){
        print_r($discography[$k]->title . '<br>');
        print_r($discography[$k]->id . '<br>');
        print_r('<br>');
    }

    print_r('</pre>');

//Artist Name for Album
//$temp->{'release-group-list'}->{'release-group'}[0]->{'artist-credit'}->{'name-credit'}->{'artist'}->{'name'}

//Artist ID
//$temp->{'release-group-list'}->{'release-group'}[0]->{'artist-credit'}->{'name-credit'}->{'artist'}->attributes()->id

//Album Title (And Release Date, incidentally)
//$temp->{'release-group-list'}->{'release-group'}[0]->{'title'}

//Album ID
//$temp->{'release-group-list'}->{'release-group'}[0]->attributes()->id

//Release Medium
//$temp->{'release-group-list'}->{'release-group'}[0]->{'primary-type'}

//Release Type
//$temp->{'release-group-list'}->{'release-group'}[0]->{'release-list'}->{'release'}->{'status'}

//Recording Type
//$temp->{'release-group-list'}->{'release-group'}[0]->attributes()->type

/*
 *
 * Array of Objects
 *
 * Object: Title, Release Date, Label, Chart position (Object), Certifications (Array of Objects)
 *
 * Discography [
 *      Album {
 *        Title:
 *        Release:
 *        Label:
 *        Chart {
 *          US:
 *          UK:
 *          etc
 *        }
 *        Certification [
 *          1 {
 *              Country:
 *              NumAwards:
 *              Award:
 *          }
 *        ]
 *     }
 * ]
 *
 * */

?>