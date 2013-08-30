<?php
/**
 * @file d3map.admin.inc
 */

/**
 * Form builder function for module settings.
 */
function wwe_bullying_map_admin_settings() {

  $form = array();

  $variables = array(
    'lawColor' => "Color of States with Law Only",
    'policyColor' => "Color of States with Policy Only",
    'lawPolicyColor' => "Color of States with Both Law and Policy",
    'hiliteColor' => "Color of Hover State",
    'pathColor' => 'Color of State Borders',
  );

  foreach ($variables as $var => $desc) {
    $form['wwe_bullying_map_' . $var] = array(
      '#type' => 'textfield',
      '#title' => $desc,
      '#default_value' => variable_get('wwe_bullying_map_' . $var, ''),
      '#description' => t('Enter any Valid CSS color, either HEX or a known color value.'),
      '#required' => TRUE,
    );
  }

  return system_settings_form($form);
}
