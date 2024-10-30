<?php
/**
 * @package Blaze_Twitch
 * @version 1.0.0
 */
/*
Plugin Name: Twitch Embed by Blaze Gaming
Plugin URI: https://wordpress.org/plugins/blaze-twitch/
Description: Easily add a Twitch broadcast to posts and pages.
Author: Blaze Gaming
Version: 1.0.0
Author URI: https://www.myblazegaming.com
Text Domain: blaze-twitch
*/

define( 'BLAZE_TWITCH_VER', '1.0.0' );
define( 'BLAZE_TWITCH_URL', plugins_url( '/' . basename( dirname( __FILE__ ) ) ) );

add_filter( 'mce_external_plugins', 'blaze_twitch_register_tinymce_javascript' );

function blaze_twitch_register_tinymce_javascript( $plugin_array ) {
   $plugin_array['blaze_twitch_plugin'] = plugins_url( '/js/tinymce-plugin.js',__FILE__ );
   return $plugin_array;
}

function blaze_twitch_get_js_vars() {
  return array(
	'pluginUrl' => BLAZE_TWITCH_URL,
  );
}

add_action( 'admin_enqueue_scripts', function() {
  wp_register_script( 'blaze_twitch_admin', BLAZE_TWITCH_URL . '/js/tinymce-admin.js', array(), BLAZE_TWITCH_VER, true );
  wp_localize_script( 'blaze_twitch_admin', 'blazeTwitch', blaze_twitch_get_js_vars() );
  wp_enqueue_script( 'blaze_twitch_admin' );
} );

add_filter("mce_buttons", function( $buttons ) {
  array_push($buttons, "blaze_twitch_player");
  return $buttons;
});
