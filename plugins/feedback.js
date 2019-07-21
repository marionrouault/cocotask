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
            feedback_fontsize: {
                type: jsPsych.plugins.parameterType.INT,
                default: "20"
            }
        }
    };

    plugin.trial = function(display_element, trial) {
        var html = `<div id="reward"> ${trial.feedback}</div>`;
        display_element.innerHTML = html;
        document.getElementById('reward').style.fontSize = `${trial.feedback_fontsize}px`;
        var trial_data = {};
        jsPsych.pluginAPI.setTimeout(function() {
            jsPsych.finishTrial(trial_data);
        }, trial.feedback_duration);
    };

    return plugin;
})();
