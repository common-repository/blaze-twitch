( function () {
	// alert(1);
	tinymce.create( "tinymce.plugins.blaze_twitch_plugin", {
		init: function ( ed, url ) {
			var redBorder = 'rgb(255, 0, 0)';
			var redShadow = 'rgba(255, 13, 13, 0.8) 0px 0px 2px 0px';
			var channelRegex = /^[a-z0-9_]{3,25}$/i;
			var numberRegex = /^[1-9]+[0-9]*$/;

			// Add Twitch player button
			ed.addButton( "blaze_twitch_player", {
				title: 'Insert Twitch Stream',
				cmd: "blaze_insert_twitch_player",
				image: blazeTwitch.pluginUrl + "/assets/GlitchIcon_Purple_24px.png"
			} );

			function redBorderTest(target, regex) {
				var value = jQuery(target).val().trim();
				var valid = regex.test(value);
				jQuery(target).css({
					'borderColor': valid ? '' : redBorder,
					'boxShadow': valid ? '' : redShadow
				});

				return valid;
			}
			function redBorderChannelField(target) {
				return redBorderTest(target, channelRegex);
			}
			function redBorderNumberField(target) {
				return redBorderTest(target, numberRegex);
			}

			ed.addCommand( "blaze_insert_twitch_player", function () {
				ed.windowManager.open({
						title: 'Insert Twitch Stream',
						body: [{
							type: 'textbox',
							name: 'channel',
							label: 'Channel name',
							onkeyup: function(event) {
								redBorderChannelField(event.target);
							}
						},{
							type: 'textbox',
							name: 'width',
							label: 'Width (pixels)',
							value: '600',
							onkeyup: function(event) {
								redBorderNumberField(event.target);
							}
						},{
							type: 'textbox',
							name: 'height',
							label: 'Height (pixels)',
							value: '400',
							onkeyup: function(event) {
								redBorderNumberField(event.target);
							}
						},{
							type: 'checkbox',
							name: 'muted',
							label: 'Start muted'
						},{
							type: 'checkbox',
							name: 'paused',
							label: 'Start paused'
						}],
						onsubmit: function(event) {
							var allValid = true;
							var fields = event.target.$el.find('input');

							// channel field
							var valid = redBorderChannelField(fields[0]);
							if (! valid && allValid) {
								allValid = false;
							}
							// width field
							if (! redBorderNumberField(fields[1]) && allValid) {
								allValid = false;
							}
							// height field
							if (! redBorderNumberField(fields[2]) && allValid) {
								allValid = false;
							}

							if (! allValid) {
								event.preventDefault();
								return false;
							}

							var d = event.data;
							var selected_text = ed.selection.getContent();
							var return_text = '<iframe \
								    src="https://player.twitch.tv/?channel=' + d.channel.trim() + (d.muted ? '&muted=true' : '') + (d.paused ? '&autoplay=false' : '') + '" \
								    width="' + d.width.trim() + '" \
								    height="' + d.height.trim() + '" \
								    frameborder="0" \
								    scrolling="0" \
								    allowfullscreen="true"> \
								</iframe>';
							ed.execCommand( "mceInsertRawHTML", 0, return_text );
						}
					});

			});

		},
		createControl: function ( n, cm ) {
			return null;
		},
		getInfo: function () {
			return {
				longname: "Twitch Embed by Blaze Gaming",
				author: "Blaze Gaming",
				version: "1.0.0"
			};
		}
	} );

	tinymce.PluginManager.add( "blaze_twitch_plugin", tinymce.plugins.blaze_twitch_plugin );
} )();