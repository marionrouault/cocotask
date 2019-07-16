/**
 * jspsych-image-keyboard-response
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/

jsPsych.plugins["double-dot-stim"] = (function() {

    var plugin = {};

    jsPsych.pluginAPI.registerPreload('image-keyboard-response', 'stimulus', 'image');

    plugin.info = {
        name: 'double-dot-stim',
        description: '',
        parameters: {
            fixation_cue: {
                type: jsPsych.plugins.parameterType.IMAGE,
                pretty_name: 'fixation_cue',
                default: undefined,
                description: 'Fixation cue to be displayed'
            },
            fixation_cue_duration: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'fixation_cue',
                default: undefined,
                description: 'Fixation cue duration to be displayed'
            },
            num_dots: {
                type: jsPsych.plugins.parameterType.ARRAY,
                pretty_name: 'number_dots',
                default: undefined,
                description: 'Num of dots [stim_left,stim_right] to be display'
            },
            stim_size: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'stim_size',
                default: 300,
                description: 'The size of the square in which the dots are drawed'
            },
            choices: {
                type: jsPsych.plugins.parameterType.KEYCODE,
                array: true,
                pretty_name: 'Choices',
                default: jsPsych.ALL_KEYS,
                description: 'The keys the subject is allowed to press to respond to the stimulus.'
            },
            prompt: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Prompt',
                default: '<p></p>',
                description: 'Any content here will be displayed below the stimulus.'
            },
            stimulus_duration: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Stimulus duration',
                default: null,
                description: 'How long to hide the stimulus.'
            },
            border_color: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Border color',
                default: "#FF9005",
                description: 'How long to wait before the user answer and the end of the trial.'
            },
            gap_endtrial: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Gap to before we end the trial after response selected',
                default: 500,
                description: 'How long to wait before the user answer and the end of the trial.'
            }
        }
    };

    plugin.trial = function(display_element, trial) {
        function showFixationCue(fixation_cue) {
            var img = '<img src="' + trial.fixation_cue + '" id="fixation_cue"></img>';
            display_element.innerHTML = img;
        };

        function showStims(left, right) {
            var stim0 = '<img src="' + left + '" id="stim0"></img>';
            var stim1 = '<img src="' + right + '" id="stim1"></img>';
            display_element.innerHTML = stim0 + stim1 + trial.prompt;
        }

        showFixationCue();
        jsPsych.pluginAPI.setTimeout(function() {
            var stim0 = drawStimulus(trial.num_dots[0], trial.stim_size, id="stim0");
            var stim1 = drawStimulus(trial.num_dots[1], trial.stim_size, id="stim1");
            showStims(stim0, stim1);
        }, trial.fixation_cue_duration);

        var timeout = trial.fixation_cue_duration + trial.stimulus_duration;
        jsPsych.pluginAPI.setTimeout(function() {
            var blankstim = drawStimulus(0, trial.stim_size);
            showStims(blankstim, blankstim);
            var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
                callback_function: after_response,
                valid_responses: trial.choices,
                rt_method: 'performance',
                persist: false,
                allow_held_key: false
            });
        }, timeout);

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
                "stimulus": trial.leftstim,
                "stimulus2": trial.rightstim,
                "key_press": response.key,
                "response": 999,
                "start_point": 999
            };

            // clear the display
            display_element.innerHTML = '';
            // move on to the next trial
            jsPsych.finishTrial(trial_data);
        };

        // function to handle responses by the subject
        var after_response = function(info) {
            // only record the first response
            if (response.key == null) {
                response = info;
            }
            var key = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(response.key);
            if (key == 'e') {
                document.querySelector("#stim0").className += "imgframe";
                document.querySelector("#stim0").style.background = trial.border_color;
            } else {
                document.querySelector("#stim1").className += "imgframe";
                document.querySelector("#stim1").style.background = trial.border_color;
            }
            jsPsych.pluginAPI.setTimeout(function() {
                end_trial();
            }, trial.gap_endtrial);
        };
    };

    return plugin;
})();
