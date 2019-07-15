
jsPsych.plugins["drawblankstimulus"] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'html-keyboard-response',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The first HTML string to be displayed'
      },
      stimulus2: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus2',
        default: undefined,
        description: 'The second HTML string to be displayed'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        array: true,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      sizesquare: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Size of the squares',
        default: 250,
        description: 'What is the size of the squares in px.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },
      center_x: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: "Aperture center X",
        default: window.innerWidth/2,
        description: "The x-coordinate of the center of the aperture"
      },
      center_y: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: "Aperture center Y",
        default: window.innerHeight/2,
        description: "The y-coordinate of the center of the aperture"
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial before it ends.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when subject makes a response.'
      },

    }
  }

//  trial.center_x
//  trial.center_y
//var horizontalAxis;
//var verticalAxis;

//ctx.fillStyle = "black";
//ctx.fillRect(apertureCenterX-horizontalAxis, apertureCenterY-verticalAxis,apertureWidth, apertureHeight);

  plugin.trial = function(display_element, trial) {

    var new_html = '<div style="display: block; float: right; background-color: #000000; '+
      'width: '+trial.sizesquare+'; height: '+trial.sizesquare+';"></div>';
    var new_html2 = '<div style="display: block; float: left; background-color: #000000; '+
      'width: '+trial.sizesquare+'; height: '+trial.sizesquare+';"></div>';


    // add prompt
    if(trial.prompt !== null){
      new_html += trial.prompt;
    }

//    center_x: [window.innerWidth/2 + 125, window.innerWidth/2 - 125],
//    center_y: [window.innerHeight/2, window.innerHeight/2],
// 	ctx.fillStyle = "black";
//    ctx.fillRect(apertureCenterX-horizontalAxis, apertureCenterY-verticalAxis,apertureWidth, apertureHeight);


    // draw
    display_element.innerHTML = [new_html + '<div style="width: 450px"></div>'+ new_html2];
  //  [new_html + '' + new_html2]

  // info for dots
//  var sqystartpoint= (stimCanvas.height - squareWidth)/2;
//  var sqxstartpoint= (stimCanvas.width - squareWidth)/2;

    // store response
    var response = {
      rt: null,
      key: null
    };

    // function to end trial when it is time
    var end_trial = function() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      // gather the data to store for the trial
      var trial_data = {
        "rt": response.rt,
        "stimulus": trial.stimulus,
        "stimulus2": trial.stimulus2,
        "key_press": response.key
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // function to handle responses by the subject
    var after_response = function(info) {

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded


      // only record the first response
      if (response.key == null) {
        response = info;
      }

      if (trial.response_ends_trial) {
        end_trial();
      }
    };

    // start the response listener
    if (trial.choices != jsPsych.NO_KEYS) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'date',
        persist: false,
        allow_held_key: false
      });
    }

    // hide stimulus if stimulus_duration is set


    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

  };

  return plugin;
})();
