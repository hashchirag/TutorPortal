'use strict';

/**
 * @ngdoc function
 * @name angularPortalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularPortalApp
 */

 
 angular.module('angularPortalApp')
 .controller('CommunicationtestCtrl', function ($scope,$location,$route,$http) {(function($) {
  $.fn.emc = function(options) {


    var countDownTime = 5;

    var defaults = {
      key: [],
      scoring: "normal",
      progress: true
    },
    settings = $.extend(defaults, options),
    $quizItems = $('[data-quiz-item]'),
    $choices = $('[data-choices]'),
    itemCount = $quizItems.length,
    chosen = [],
    $option = null,
    $label = null;

    var username = "";
    var jee_test = "";
    var cookie = "";
    var count = 0;
    // function init() {
    //   username = getParameterByName('username');
    //   jee_test = getParameterByName('jee_test');
    //   console.log(username + jee_test);
    // }
    //
    // function getParameterByName(name, url) {
    //   if (!url) url = window.location.href;
    //   name = name.replace(/[\[\]]/g, "\\$&");
    //   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    //     results = regex.exec(url);
    //   if (!results) return null;
    //   if (!results[2]) return '';
    //   return decodeURIComponent(results[2].replace(/\+/g, " "));
    // }



    emcInit();

    function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      return "";
    }

    function checkCookie() {
      cookie = getCookie("values");


      if (cookie != "") {
        var res = cookie.split(",");
        console.log("Welcome again " + res[0]);

        console.log(res[0]);
        console.log(res[1]);
        username = res[0];
      } else {
        alert("Enable cookies and restart");
      }
    }

    // checkCookie();

    //Timer part
    function CountDown(container, time) {
      this.container = container;
      this.display = container.querySelector('.timer-display');
      this.bar = container.querySelector('.timer-bar');
      this.time = time;
      this.remainingTime = this.time;
      this.elapsedTime = 0;

      this.updateDisplay();
    }

    CountDown.fn = CountDown.prototype;

    CountDown.fn.updateCounters = function() {
      this.remainingTime -= 1;
      this.elapsedTime += 1;

    //Case of time ended. Display Results
    if (this.remainingTime == -1) {
      scoreNormal();
    }

  };

  CountDown.fn.updateDisplay = function() {
    this.display.innerText = parseInt(this.remainingTime / 60, 10) + ':' + ('0' + (this.remainingTime % 60)).substr(-2);
  };

  CountDown.fn.updateCanvasColor = function() {
    var remainingTimePercentage = this.remainingTime / this.time;
    var transition, duration;

    if (remainingTimePercentage <= 0.7) {
      transition = 'green-to-orange';
      duration = 0.2 * this.time;
    }

    if (remainingTimePercentage <= 0.5) {
      transition = 'orange-to-yellow';
      duration = 0.1 * this.time;
    }

    if (remainingTimePercentage <= 0.4) {
      transition = 'yellow-to-red';
      duration = 0.4 * this.time;
    }

    if (transition && duration) {
      this.container.style['-webkit-animation-duration'] = duration + 's';
      this.container.classList.add(transition);
    }
  };

  CountDown.fn.updateBarWidth = function() {
    this.bar.style.width = (this.elapsedTime / this.time * 100) + '%';
  };

  CountDown.fn.checkFinalTime = function() {
    if (this.remainingTime === 10) {
      this.display.classList.add('finishing');
    }
  };

  CountDown.fn.init = function() {
    var tid = setInterval(function() {
      if (this.remainingTime === -1) {
        return clearInterval(tid);
      }

      this.updateCounters();
      this.updateDisplay();
      this.updateCanvasColor();
      this.updateBarWidth();
      this.checkFinalTime();
    }.bind(this), 1000);

    // this.button.innerText = 'Done!';
  };


  var mCountDownTimer = new CountDown(document.querySelector('.canvas'),countDownTime);
  mCountDownTimer.init();
  //End of timer

  if (settings.progress) {
    var $bar = $('#emc-progress'),
    $inner = $('<div id="emc-progress_inner"></div>'),
    $perc = $('<span id="emc-progress_ind">0/' + itemCount + '</span>');
    $bar.append($inner).prepend($perc);
  }

  function emcInit() {
    $quizItems.each(function(index, value) {
      var $this = $(this),
      $choiceEl = $this.find('.choices'),
      choices = $choiceEl.data('choices');
      for (var i = 0; i < choices.length; i++) {
        $option = $('<input name="' + index + '" id="' + index + '_' + i + '" type="radio">');
        $label = $('<label for="' + index + '_' + i + '">' + choices[i] + '</label>');
        $choiceEl.append($option).append($label);

        $option.on('change', function() {
          return getChosen();
        });
      }
    });
  }

  function getChosen() {
    chosen = [];
    $choices.each(function() {
      var $inputs = $(this).find('input[type="radio"]');
      $inputs.each(function(index, value) {
        if ($(this).is(':checked')) {
          chosen.push(index + 1);
        }
      });
    });
    getProgress();
  }

  function getProgress() {
    var prog = (chosen.length / itemCount) * 100 + "%",
    $submit = $('#emc-submit');
    if (settings.progress) {
      $perc.text(chosen.length + '/' + itemCount);
      $inner.css({
        height: prog
      });
    }
    if (chosen.length === itemCount) {
      $submit.addClass('ready-show');
      $submit.click(function() {
        return scoreNormal();
      });
    }
  }

  function scoreNormal() {
    var wrong = [],
    score = null,
    $scoreEl = $('#emc-score');
    for (var i = 0; i < itemCount; i++) {
      if (chosen[i] != settings.key[i]) {
        wrong.push(i);
      }
    }
    $quizItems.each(function(index) {
      var $this = $(this);
      if ($.inArray(index, wrong) !== -1) {
        $this.removeClass('item-correct').addClass('item-incorrect');
      } else {
        $this.removeClass('item-incorrect').addClass('item-correct');
      }
    });
    score = ((itemCount - wrong.length) / itemCount).toFixed(2) * 100 + "%";

    if( wrong.length >=5 ){
      $scoreEl.html("You scored a " + score + "<br />" + "<a class = 'next'>Proceed</a>").addClass('new-score');
      $scoreEl.click(function(){

        $location.path('/'+ 'sorry');
        $route.reload();
      });
    }
    else{
      $scoreEl.html("You scored a " + score + "<br />" + "<a class = 'next'>Take the communication Test</a>").addClass('new-score');
      $scoreEl.click(function(){
        $location.path('/'+ 'iittest');
        $route.reload();
      });
    }

    $('html,body').animate({
      scrollTop: 0
    }, 50);
    if (count == 0) {
        //Post
        var http = new XMLHttpRequest();
        var url = "http://now.hashlearn.com:80/api/users/tutor/testResult/";
        // var params = "lorem=ipsum&name=binny";
        var correct = (itemCount - wrong.length);
        var params = "username=" + username + "&questions_attempted=15&questions_correct=" + correct + "&test_type=communication";
        console.log(" The params are - username=" + username + "&questions_attempted=15&questions_correct=" + correct + "test_type=communication");

        http.open("POST", url, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // http.setRequestHeader("Content-length", params.length);
        // http.setRequestHeader("Connection", "close");

        http.onreadystatechange = function() { //Call a function when the state changes.
          if (http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
          }
          else{
            // alert("An error occured. Please contact the admin.");

          }
        }
        http.send(params);
        //End Post
        count = count + 1;
      }
      $submit = $('#emc-submit');

      $submit.removeClass('ready-show');

    }

  }
}(jQuery));


$(document).emc({
  key: ["2", "2", "3", "2", "3", "3", "1", "2", "3", "2", "4", "1", "3", "3", "1", "3", "2", "2", "1", "2"]
});
});