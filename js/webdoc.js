$(document).ready(function(){

  var $vid = $('#webdoc-video')[0],
  $body = $('body'),
  pause = $('#webdoc-part1').data('to'),
  $points = $('.webdoc-pointVideo'),
  $first = $('#webdoc-part1'),
  $partContainerText = $('#webdoc-content'),
  $partText = $('#webdoc-text'),
  $partTitle = $('#webdoc-title'),
  classHidden = 'webdoc-hidden',
  classBodyHidden = 'webdoc-inactive';

  var bindVideo = function($point,text,title){
    $('#webdoc-video').bind('timeupdate',function(evt){
      setText(title,text);
      var pointActive = $('.webdoc-pointActive');
      console.log('Time',$(this)[0].currentTime,' & pause : ',pause);
      if($(this)[0].currentTime >= pause) {
        $(this)[0].pause();
        $(this).unbind(evt);
        var next = $($point).next('.webdoc-pointVideo');
        if(next.length){
          activePoint(next);
        }else{
          console.log('end');
        }
      }
    });
  }

  var toggle = function(status){
    var $ele = $partContainerText;
    console.log($partContainerText);
    if(status == 'hide' && !$ele.hasClass(classHidden)){
      $ele.addClass(classHidden);
    }else if(status == 'show' && $ele.hasClass(classHidden)){
      $ele.removeClass(classHidden);
    }else if(status == 'toggle'){
      if(!$ele.hasClass(classHidden)){
        $ele.addClass(classHidden);
        $body.addClass(classBodyHidden);
      }else{
        $ele.removeClass(classHidden);
      }
    }
  }

  var activePoint = function($point){
    
    $points.removeClass('webdoc-pointActive');
    $point.addClass('webdoc-pointActive');

    var id = $point.attr('id'),
    text = $point.data('text'),
    title = $point.data('title'),
    from = $point.data('from');
    info = $point.data('info');
    pause = $point.data('to');

    $vid.currentTime = parseInt(from);
    bindVideo($point,text,title);
    if($vid.paused) {
      $vid.play();
    }
  }

  var setText = function(title,text){
    $partText.html(text);
    $partTitle.html(title);
  }

  $(document).on('click','#webdoc-overlay',function(event){
    var $target = $(event.target);
    if(!$target.hasClass('webdoc-timelineContainer') && !$target.hasClass('webdoc-pointVideo')){
      toggle('toggle');
    }
  });

  $('.webdoc-pointVideo').on('click',function(){
    activePoint($(this));
  });

  bindVideo($first,$first.data('text'),$first.data('title'));

});