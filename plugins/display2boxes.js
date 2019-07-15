/**
 * jspsych-image-keyboard-response
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/

jsPsych.plugins["display2boxes"] = (function() {

    var plugin = {};

    jsPsych.pluginAPI.registerPreload('image-keyboard-response', 'stimulus', 'image');

    plugin.info = {
        name: 'image-keyboard-response-edited',
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
            stimuli: {
                type: jsPsych.plugins.parameterType.ARRAY,
                pretty_name: 'stimuli',
                default: undefined,
                description: 'Stim to be display'
            },
            blankstim: {
                type: jsPsych.plugins.parameterType.IMAGE,
                pretty_name: 'blankstim',
                default: undefined,
                description: ''
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
            showStims(trial.stimuli[0], trial.stimuli[1]);
        }, trial.fixation_cue_duration);

        var timeout = trial.fixation_cue_duration + trial.stimulus_duration;
        jsPsych.pluginAPI.setTimeout(function() {
            showStims(trial.blankstim, trial.blankstim);
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
