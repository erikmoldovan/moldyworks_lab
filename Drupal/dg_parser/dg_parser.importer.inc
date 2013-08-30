<?php
/**
 * dg-parser.importer.inc
 *
 * This file controls the actual functional logic of the parsing feature.
 */

/**
 * The almighty Director function, generator of JSON callback URLs that all Retrieval functions rely on
 *
 * @param string $call_type
 * @param string $resource
 * @return string $url
 */
function dg_parser_director($call_type, $resource)
{
    $base_url = 'http://ws.spotify.com/';
    $fmt = 'json';

    switch ($call_type) {
        case 'artist':
            $api_call = 'search';
            break;
        case 'album':
            $api_call = 'lookup';
            break;
        case 'track':
            $api_call = 'lookup';
            break;
    }

    switch ($api_call) {
        case 'search':
            $query = '?q=';
            $extras = '';
            break;
        case 'lookup':
            if ($call_type == 'album') {
                $uri = 'artist';
                $extras = '&extras=albumdetail';
            } elseif ($call_type == 'track') {
                $uri = 'album';
                $extras = '&extras=trackdetail';
            }
            $query = '?uri=spotify:' . $uri . ':';
            $call_type = '';
            break;
    }

    $url = $base_url . $api_call . '/1/' . $call_type . '.' . $fmt . $query . $resource . $extras;
    return $url;
}

/**
 * Retrieves the JSON feed for the Artist, calls node_create for it and then forwards to retrieve_albums
 *
 * @param string $artist_name
 */
function dg_parser_retrieve_artist($artist_name)
{
    // Variable declaration
    $call_type = 'artist';

    // JSON retrieval
    $url = dg_parser_director($call_type, $artist_name);
    $feed = json_decode(file_get_contents($url));

    // Node creation
    $artist_obj = $feed->artists[0];
    $artist_obj->title = $artist_obj->name;
    $artist_obj->artist_name = $artist_obj->name;
    $artist_obj->artist_id = substr($artist_obj->href, 15);

    dg_parser_node_create($artist_obj, $call_type);

    if ($artist_obj != NULL) {
        drupal_set_message('Found ' . urldecode($artist_name), 'status');
        dg_parser_retrieve_albums($artist_obj->artist_id);
    } else {
        drupal_set_message('No matching artist found', 'error');
    }
}

/**
 * Retrieves the JSON feed for the Albums associated with the Artist, calls node_create for each one and then forwards to retrieve_tracks
 *
 * @param string $artist_id
 */
function dg_parser_retrieve_albums($artist_id)
{
    //Variable declaration
    $call_type = 'album';
    $i = 0;

    // JSON retrieval
    $url = dg_parser_director($call_type, $artist_id);
    $feed = json_decode(file_get_contents($url));

    // Node creation
    $albums_list = array();
    $albums = $feed->artist->albums;

    foreach ($albums as $value) {
    // Associate data with variables in new object for node_create
        $album_entry = new stdClass();
        $album_entry->title = $value->album->name;
        $album_entry->album_name = $album_entry->title;
        $album_entry->album_id = substr($value->album->href, 14);
        $album_entry->artist_id = $artist_id;
        $album_entry->release_date = $value->album->released;

    // Add album ID to new array for retrieve_tracks
        array_push($albums_list, $album_entry->album_id);

    // Pump object into node_create
        dg_parser_node_create($album_entry, $call_type);
        $i++;
    }

    if ($i != 0) {
        drupal_set_message('Found ' . $i . ' albums', 'status');
        dg_parser_retrieve_tracks($albums_list, $artist_id);
    } else {
        drupal_set_message('No albums found. Aborting.', 'error');
    }
}

/**
 * Retrieves JSON feed for the Tracks associated with the Albums and calls node_create for each one  This is the last retrieval step.
 *
 * @param array $albums_list
 * @param string $artist_id
 */
function dg_parser_retrieve_tracks($albums_list, $artist_id)
{
    // Variable declaration
    $call_type = 'track';
    $i = 0;

    // JSON retrieval
    foreach ($albums_list as $value) {
        $url = dg_parser_director($call_type, $value);
        $feed = json_decode(file_get_contents($url));
        $album_id = $value;

        // Node creation
        $track_list = $feed->album->tracks;

        foreach ($track_list as $val) {
            // Associate data with variables in new object for node_create
            $track_entry = new stdClass();
            $track_entry->title = $val->name;
            $track_entry->track_name = $val->name;
            $track_entry->track_id = substr($val->href, 14);
            $track_entry->track_number = $val->{'track-number'};
            $track_entry->track_length = $val->length;
            $track_entry->album_id = $album_id;
            $track_entry->artist_id = $artist_id;

            dg_parser_node_create($track_entry, $call_type);
            $i++;
        }
    }

    if ($i != 0) {
        drupal_set_message('Found ' . $i . ' tracks', 'status');
    } else {
        drupal_set_message('No tracks found. Aborting.', 'error');
    }
}

/**
 * Generates nodes based on data passed to it
 *
 * @param object $music_obj
 * @param string $call_type
 */
function dg_parser_node_create(&$music_obj, $call_type)
{
    // Generic node creation code
    $node = new stdClass();
    $node->type = $call_type;
    $node->title = $music_obj->title;
    $node->language = LANGUAGE_NONE;
    node_object_prepare($node);

    $node->field_artist_id['und'][0]['value'] = $music_obj->artist_id;

    if ($call_type == 'artist') {
        $node->field_artist_name['und'][0]['value'] = $music_obj->artist_name;
    } elseif ($call_type == 'album') {
        $node->field_album_name['und'][0]['value'] = $music_obj->album_name;
        $node->field_album_id['und'][0]['value'] = $music_obj->album_id;
        $node->field_release_date['und'][0]['value'] = $music_obj->release_date;
    } elseif ($call_type == 'track') {
        $node->field_track_name['und'][0]['value'] = $music_obj->track_name;
        $node->field_track_id['und'][0]['value'] = $music_obj->track_id;
        $node->field_track_number['und'][0]['value'] = $music_obj->track_number;
        $node->field_track_length['und'][0]['value'] = $music_obj->track_length;
        $node->field_album_id['und'][0]['value'] = $music_obj->album_id;
    } else {
        drupal_set_message(t('An error occurred and processing did not complete.'), 'error');
    }

    $node = node_submit($node);
    node_save($node);
}