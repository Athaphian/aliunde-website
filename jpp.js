(function ($) {
  $.fn.jplayer = function () {
    return this.each(function () {
      var $this = $(this);
      var element_id = $this.attr("id");
      $this.addClass('jp-jplayer');
      $('<div id="' + element_id + '-container" class="jp-audio" role="application" aria-label="media player">' +
      '  <div class="jp-interface">' +
      '    <div class="jp-controls">' +
      '      <button class="jp-previous" role="button" tabindex="0">previous</button>' +
      '      <button class="jp-play" role="button" tabindex="0">play</button>' +
      '      <button class="jp-next" role="button" tabindex="0">next</button>' +
      '      <button class="jp-stop" role="button" tabindex="0">stop</button>' +
      '    </div>' +
      '    <div class="jp-volume-controls">' +
      '      <button class="jp-mute" role="button" tabindex="0">mute</button>' +
      '      <button class="jp-volume-max" role="button" tabindex="0">max volume</button>' +
      '      <div class="jp-volume-bar">' +
      '        <div class="jp-volume-bar-value"></div>' +
      '      </div>' +
      '    </div>' +
      '    <div class="jp-toggles">' +
      '      <button class="jp-repeat" role="button" tabindex="0">repeat</button>' +
      '      <button class="jp-shuffle" role="button" tabindex="0">shuffle</button>' +
      '    </div>' +
      '    <div class="jp-progress-bar">' +
      '      <div class="jp-progress">' +
      '        <div class="jp-seek-bar">' +
      '          <div class="jp-play-bar"></div>' +
      '        </div>' +
      '      </div>' +
      '      <div class="jp-time-holder">' +
      '        <div class="jp-current-time" role="timer" aria-label="time">&nbsp;</div>' +
      '        <div class="jp-duration" role="timer" aria-label="duration">&nbsp;</div>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '  <div class="jp-playlist">' +
      '    <ul>' +
      '      <li>&nbsp;</li>' +
      '    </ul>' +
      '  </div>' +
      '  <div class="jp-no-solution">' +
      '    <span>Update Required</span>' +
      '      To play the media you will need to either update your browser to a recent version or update your ' +
      '      <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.' +
      '  </div>' +
      '</div>').insertAfter($this);

      var list = $this.find('ul')[0], playlist = [];

      if (!list) {
        return;
      }

      $(list).find('li').each(function() {
        playlist.push({
          title: '<span>' + $(this).text() + '<span> <span class="duration">' + $(this).data('duration') + '</span>',
          mp3: $(this).data('src')
        });
      });

      var playlist = new jPlayerPlaylist({
        jPlayer: '#' + element_id,
        cssSelectorAncestor: '#' + element_id + '-container'
      }, playlist, {
        swfPath: "../../dist/jplayer",
        supplied: "mp3",
        wmode: "window",
        useStateClassSkin: true,
        autoBlur: false,
        smoothPlayBar: true,
        keyEnabled: true,
        playlistOptions: {
          displayTime: 'fast'
        }
      });

      $this.bind($.jPlayer.event.play, function(event) {
        var htmlTitle = playlist.playlist[playlist.current].title;
        var plainTextTitle = $(htmlTitle).text();
        document.title = plainTextTitle;
      });
    });
  }
})(jQuery);