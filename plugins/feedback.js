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
            }
        }
    };

    plugin.trial = function(display_element, trial) {
        display_element.innerHTML = trial.feedback;
        var trial_data = {};
        jsPsych.pluginAPI.setTimeout(function() {
            jsPsych.finishTrial(trial_data);
        }, trial.feedback_duration);
    };

    return plugin;
})();
