<?php
/**
 * Created by JetBrains PhpStorm.
 * User: moldy
 * Date: 1/23/13
 * Time: 3:35 PM
 * To change this template use File | Settings | File Templates.
 */

    // Retrieve contents of Metallic Wikipedia page and store in string
//    $fw = fopen('dump.txt', 'w');
//    $ch = curl_init('http://en.wikipedia.org/wiki/Metallica_discography');
//    //curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//    //curl_setopt($ch, CURLOPT_FILE, $fw);
//    $html = curl_exec($ch);
//
//    // Parse local file for all HTML elements with the wiki-table class and save to array
//    $pattern = "wikitable";
//    preg_match($pattern, $html, $matches);
//    print($matches);

    // Convert array to JSON object and print to file

$file_string = file_get_contents('http://en.wikipedia.org/wiki/Metallica_discography');
print($file_string);

?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <script type="text/javascript" src="http://code.jquery.com/jquery-1.9.0.min.js"></script>
        <script type="text/javascript" src="parser.js"></script>
    </head>
    <body>
        <div id="tableOne">
        </div>
    </body>
</html>