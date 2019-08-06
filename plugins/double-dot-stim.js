/**
 * double-dot-stim
 * Mae
 *
 * plugin for double stim with staircase
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
            fixation_cue_color: {
		            type: jsPsych.plugins.parameterType.STRING,
		            pretty_name: "Fixation cross color",
		            default: "#000000",
		            description: "The color of the fixation cross"
		        },
            fixation_cue_width: {
		            type: jsPsych.plugins.parameterType.INT,
		            pretty_name: "Fixation cross width",
		            default: 20,
		            description: "The width of the fixation cross in pixels"
		        },
		        fixation_cue_height: {
		            type: jsPsych.plugins.parameterType.INT,
		            pretty_name: "Fixation cross height",
		            default: 20,
		            description: "The height of the fixation cross in pixels"
		        },
		        fixation_cue_thickness: {
		            type: jsPsych.plugins.parameterType.INT,
		            pretty_name: "Fixation cross thickness",
		            default: 1,
		            description: "The thickness of the fixation cross"
		        },
            fixation_cue_duration: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'fixation_cue',
                default: undefined,
                description: 'Fixation cue duration to be displayed'
            },
            numdots: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'number_dots',
                default: 300,
                description: 'Base number of dots to use during staircase. Not that the number of dots max is (stim_size/cellsize)**2'
            },
            initial_dotdiff: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'initial_dotdiff',
                default: 100,
                description: 'Base number of dots to use during staircase'
            },
            stim_size: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'stim_size',
                default: 300,
                description: 'The size of the square in which the dots are drawed'
            },
            stim_color: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'stim_color',
                default: "#FFFFFF",
                description: 'The color of the dots'
            },
            stim_cell_size: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'stim_cellsize',
                default: "10",
                description: 'Diameter of the stim dots'
            },
            stim_background_color: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'stim_background_color',
                default: "#000000",
                description: 'The size of the square in which the dots are drawed'
            },
            choices: {
                type: jsPsych.plugins.parameterType.KEYCODE,
                array: true,
                pretty_name: 'Choices',
                default: ["z", "e"],
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
            feedback_color: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'feedback_color',
                default: "#FF9005",
                description: 'Color of the image border for the feedback'
            },
            feedback_size: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'feedback_size',
                default: 15,
                description: 'Size of the image border for the feedback'
            },
            gap_endtrial: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Gap to before we end the trial after response selected',
                default: 500,
                description: 'How long to wait before the user answer and the end of the trial.'
            },
            practise: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'practise_enable',
                default: false,
                description: 'True if you want the practise mode'
            }
        }
    };

    plugin.trial = function(display_element, trial) {
        showFixationCue();

        function showFixationCue() {
            let squaresize = trial.stim_size;
            let fixation = drawFixationCue();
            fixation = `<img src=${fixation} style="width:${squaresize}px"></img>`;
            var html = `<div class="doublestim-container"><div id="fixation" class="stim">${fixation}</div></div><div class="prompt" id="prompt"><p><\p></div>`;
            display_element.innerHTML = html;
        };

        function showStims(left, right, prompt) {
            let squaresize = trial.stim_size;
            let stim0 = `<img src=${left} class="stim" id="stim0""></img>`;
            let stim1 = `<img src=${right} class="stim" id="stim1""></img>`;
            var html = `<div class="doublestim-container">${stim0}${stim1}</div><div class="prompt" id="prompt">${prompt}</div>`;
            display_element.innerHTML = html;
        }

        function get_numdots() {
            var fstims = jsPsych.data.get().filter({
                trial_type: 'double-dot-stim'
            });
            var answers = fstims.last(2).values();
            var trial_idx = fstims.count();
            var pdiff = fstims.last(1).values();
            if (pdiff[0] == undefined) {
                pdiff = [{
                    dotdiff: Math.log(trial.initial_dotdiff)
                }];
            }
            var dotdiff = staircase(pdiff[0].dotdiff, answers, trial_idx);
            var nbdiff = Math.round(Math.exp(dotdiff));
            var prob = Math.random() > 0.5;
            var ldots = trial.numdots + prob * nbdiff;
            var rdots = trial.numdots + (1 - prob) * nbdiff;
            return {
                dotdiff: dotdiff,
                ldots: ldots,
                rdots: rdots
            };
        }
        var params = get_numdots();

        jsPsych.pluginAPI.setTimeout(function() {
            var stim0 = drawStimulus(params.ldots);
            var stim1 = drawStimulus(params.rdots);
            showStims(stim0, stim1, trial.prompt);
        }, trial.fixation_cue_duration);

        var timeout = trial.fixation_cue_duration + trial.stimulus_duration;
        jsPsych.pluginAPI.setTimeout(function() {
            var blankstim = drawStimulus(0);
            showStims(blankstim, blankstim, trial.prompt);
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
                rt: response.rt,
                key_press: response.key,
                response: 999,
                practise: trial.practise,
                correct: get_result(response),
                start_point: 999
            };
            trial_data = Object.assign(trial_data, params);

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
            var blankstim = drawStimulus(0);
            var feedback_color = trial.feedback_color;
            var prompt = trial.prompt;
            if (trial.practise) {
                feedback_color = "#FF0000";
                prompt = '<p style = "text-align:center">Incorrect</p><br>';
                if (get_result(response)) {
                    feedback_color = "#008000";
                    prompt = '<p style = "text-align:center">Correct</p><br>';
                };
            }
            var chosenstim = drawStimulus(0, feedback_color);
            if (key == trial.choices[0]) {
                showStims(chosenstim, blankstim, prompt);
            } else {
                showStims(blankstim, chosenstim, prompt);
            }
            jsPsych.pluginAPI.setTimeout(function() {
                end_trial();
            }, trial.gap_endtrial);
        };

        function get_result(response) {
            var correct = false;
            if (jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(response.key) == config.choices[0]) {
                correct = params.ldots > params.rdots;// if participant responded Left
            } else {
                correct = params.ldots < params.rdots;// if participant responded Right
            }
            return correct;
        }

        function getCanvas(background_color="#FFFFFF") {
            var canvas = document.createElement('canvas');
            canvas.width = trial.stim_size + 2 * trial.feedback_size;
            canvas.height = trial.stim_size + 2 * trial.feedback_size;
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = background_color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            return canvas;
        }

        function drawFixationCue() {
            var canvas = getCanvas();
            var ctx = canvas.getContext('2d');
            //Horizontal line
            ctx.beginPath();
            ctx.lineWidth = trial.fixation_cue_thickness;
            ctx.moveTo(canvas.width / 2 - trial.fixation_cue_width, canvas.height / 2);
            ctx.lineTo(canvas.width / 2 + trial.fixation_cue_width, canvas.height / 2);
            ctx.strokeStyle = trial.fixation_cue_color;
            ctx.stroke();

            //Vertical line
            ctx.beginPath();
            ctx.lineWidth = trial.fixation_cue_thickness;
            ctx.moveTo(canvas.width / 2, canvas.height / 2 - trial.fixation_cue_height);
            ctx.lineTo(canvas.width / 2, canvas.height / 2 + trial.fixation_cue_height);
            ctx.strokeStyle = trial.fixation_cue_color;
            ctx.stroke();

            var fixation_cue = canvas.toDataURL();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return fixation_cue;
        }

        function drawStimulus(numDots, border_color = "#FFFFFF") {
            var canvas = getCanvas(border_color);
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = trial.stim_background_color;
            ctx.fillRect(trial.feedback_size, trial.feedback_size, trial.stim_size, trial.stim_size);
            //specification
            if (numDots != 0) {
                var cellsize = trial.cellsize;
                var size_grid = trial.stim_size / trial.cellsize;
                var ncells = (size_grid) ** 2;
                var dots = jsPsych.randomization.repeat([1], numDots);
                dots = dots.concat(jsPsych.randomization.repeat([0], ncells - numDots));
                dots = jsPsych.randomization.shuffle(dots);
                for (i = 0; i < dots.length; i += 1) {
                    if (dots[i] == 1) {
                        var ix = Math.floor(i / size_grid) * trial.cellsize + trial.feedback_size;
                        var iy = (i % size_grid) * trial.cellsize + trial.feedback_size;
                        ctx.beginPath();
                        ctx.arc(ix + (trial.cellsize / 2), iy + (trial.cellsize / 2), 2, 0, 2 * Math.PI);
                        ctx.fillStyle = trial.stim_color;
                        ctx.fill();
                    }
                }
            }
            var string4stimulus = canvas.toDataURL();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return string4stimulus;
        }

    };

    return plugin;
})();
