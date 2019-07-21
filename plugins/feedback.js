/*
 * Example plugin template
 */

jsPsych.plugins["feedback"] = (function() {

    var plugin = {};

    plugin.info = {
        name: "feedback",
        parameters: {
            feedback_duration: {
                type: jsPsych.plugins.parameterType.INT,
                default: 200
            },
            feedback: {
                type: jsPsych.plugins.parameterType.STRING,
                default: ""
            },
            canvas_size: {
                type: jsPsych.plugins.parameterType.INT,
                default: 250
            },
            canvas_offset: {
                type: jsPsych.plugins.parameterType.INT,
                default: 10
            },
            feedback_fontsize: {
                type: jsPsych.plugins.parameterType.INT,
                default: "20"
            }
        }
    };

    plugin.trial = function(display_element, trial) {
        let squaresize = trial.canvas_size;
        let reward = drawReward();
        reward = `<img src=${reward} style="width:${squaresize}px"></img>`;
        var html = `<div class="doublestim-container"><div id="reward" class="stim">${reward}</div></div><div class="prompt" id="prompt"><p><\p></div>`;
        display_element.innerHTML = html;

        var trial_data = {};
        jsPsych.pluginAPI.setTimeout(function() {
            jsPsych.finishTrial(trial_data);
        }, trial.feedback_duration);

        function getCanvas(background_color = "#FFFFFF") {
            var canvas = document.createElement('canvas');
            canvas.width = trial.canvas_size + 2 * trial.canvas_offset;
            canvas.height = trial.canvas_size + 2 * trial.canvas_offset;
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = background_color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            return canvas;
        }

        function drawReward() {
            var canvas = getCanvas();
            var ctx = canvas.getContext('2d');
            //Horizontal line
            ctx.font = `${trial.feedback_fontsize}px Verdana`;
            ctx.fillStyle = "#000000"
            ctx.fillText(`${trial.feedback}`, canvas.width / 2 - trial.canvas_offset-10, canvas.height / 2 + trial.canvas_offset);
            var reward = canvas.toDataURL();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return reward;
        }

    };

    return plugin;
})();
