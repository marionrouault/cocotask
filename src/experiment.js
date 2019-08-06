function generate_block(trial, ntrial) {
    block = [];
    for (i = 1; i <= ntrial; i++) {
        block.push(trial);
    }
    return block.reduce(function(a, b) {
        return a.concat(b);
    });
}

function generate_sequence(config, trial) {
    sequence = [];
    for (j = 1; j <= config.nblock; j++) {
        block = generate_block(trial, config.ntrial);
        sequence.push(block);
        tbreak = generate_break(config);
        sequence.push([tbreak]);
        if (j === config.nblock) {
            // global task ability rating for each half of the experiment
            glob_rating = generate_global_rating(config);
            sequence.push([glob_rating]);
        }
    }
    return sequence.reduce(function(a, b) {
        return a.concat(b);
    });
}

function generate_trial(config) {

    var fullscreen = { //pb le montre tout le temps!!
        on_start: function() {
            show_cursor();
        },
        type: 'fullscreen',
        fullscreen_mode: true,
        check_fullscreen: false,
        on_finish: function() {
            remove_cursor();
        }
    };

    var stim = {
        type: 'double-dot-stim', // previously image-keyboard-reponse-edited2
        fixation_cue_height: config.fixation_cue_height,
        fixation_cue_width: config.fixation_cue_width,
        fixation_cue_thickness: config.fixation_cue_thickness,
        fixation_cue_color: jsPsych.timelineVariable('fixation_cue_color'),
        fixation_cue_duration: config.fixation_cue_duration,
        initial_dotdiff: config.initial_dotdiff,
        cellsize: config.cellsize,
        stim_background_color: config.stim_background_color,
        stim_color: config.stim_color,
        stim_size: config.practise.stim_size,
        numdots: config.numdots,
        feedback_size: config.stim_feedback_size,
        feedback_color: jsPsych.timelineVariable('fixation_cue_color'),
        prompt: `<p>Press ${config.practise.choices[0].toUpperCase()} if the box on the left had more dots. Press ${config.practise.choices[1].toUpperCase()} if the box on the right had more dots.</p>`,
        choices: config.choices,
        stimulus_duration: config.stimulus_duration,
        gap_endtrial: config.stim_feedback_duration,
        data: {
            condition_name: jsPsych.timelineVariable('condition_name')

        }
    };
    var rating = {
        type: "custom-likert",
        questions: [{
            prompt: "Rate your confidence:",
            labels: config.scale,
            required: true
        }],
        button_label: "Continue",
        on_start: function() {
            show_cursor();
        },
        scale_width: config.scale_width,
        on_finish: function() {
            var correct = jsPsych.data.get().filter({
                trial_type: 'double-dot-stim'
            }).last(1).values()[0].correct;
            var dist = 'yincorrect';
            if (correct) {
                dist = 'ycorrect';
            }

            //var reward = jsPsych.timelineVariable(dist, true);
            //reward = Array(reward).reverse().pop();
            var reward = jsPsych.timelineVariable(dist, true).reverse().pop();

            jsPsych.data.addDataToLastTrial({
                condition_name: jsPsych.timelineVariable('condition_name'),
                tag: "rating",
                reward: reward
            });
            remove_cursor();
        }
    };
    var feedback = {
        type: 'feedback',
        feedback: function() {
            var reward = jsPsych.data.get().filter({
                tag: 'rating'
            }).last(1).values()[0].reward;
            reward = `${reward}`
            return reward;
        },
        feedback_fontsize: config.feedback_fontsize,
        feedback_duration: config.feedback_duration,
        intertrial_interval: config.inter_trial_interval,
        convas_size: config.stim_size,
        convas_offset: config.stim_feedback_size,
        data: {
            tag: "feedback",
            condition_name: jsPsych.timelineVariable('condition_name')
        }
    };
    return [stim, rating, feedback];// add a trial by trial fullscreen
};

function generate_break(config) {
    return {
        type: 'instructions',
        pages: function() {
            var n = jsPsych.data.get().filter({
                trial_type: 'double-dot-stim',
                practise: false
            }).count();
            n = Math.floor(n / config.ntrial);
            var instruction = '<p>You can now pause for a break. You have completed ' + n + ' blocks out of ' + 2 * config.nblock + ' blocks.</p>';
            return [instruction + config.break_instruction];
        },
        key_forward: "space",
        show_clickable_nav: false,
        show_page_number: false,
        allow_backward: false
    };
}

function generate_global_rating(config) {
    return {
        type: "custom-likert",
        questions: [{
            prompt: "<strong>We would like you to rate your overall ability at the task over this half of the experiment.</strong> <br></br> After responding using the scale below, click ‘Continue’ to carry on with the next block.",
            labels: config.global_scale,
            required: true
        }],
        button_label: "Continue",
        on_start: function() {
            show_cursor();
        },
        scale_width: config.scale_width,
        on_finish: function() {
            jsPsych.data.addDataToLastTrial({
                condition_name: jsPsych.timelineVariable('condition_name'),
                tag: "globrating",
                reward: 999
            });
            remove_cursor();
        }
    };
}

// NB generate_full_sequence is run per half of experiment = per condition
function generate_full_sequence(config, timeline_variable) {
    var trial = generate_trial(config);
    var seq = generate_sequence(config, trial);// seq gives n blocks + one break
    var sequence = {
        timeline: seq,
        timeline_variables: [timeline_variable],
        repetitions: 1
    };
    return sequence;
}

function generate_practise_sequence(config) {
    var practise = [];
    if (config.practise.enable == false) {
        return practise;
    }
    practise.push({
        type: 'instructions',
        pages: config.practise.instruction_stim,
        key_forward: "space",
        show_clickable_nav: false,
        show_page_number: false,
        allow_backward: false
    });
    var stim = {
        type: 'double-dot-stim', // previously image-keyboard-reponse-edited2. No scale, no reward during the practise.
        practise: true,
        fixation_cue_duration: config.practise.fixation_cue_duration,
        fixation_cue_height: config.practise.fixation_cue_height,
        fixation_cue_width: config.practise.fixation_cue_width,
        fixation_cue_thickness: config.practise.fixation_cue_thickness,
        fixation_cue_color: config.practise.fixation_cue_color,
        initial_dotdiff: config.practise.initial_dotdiff,
        stim_size: config.practise.stim_size,
        cellsize: config.practise.cellsize,
        stim_background_color: config.practise.stim_background_color,
        stim_color: config.practise.stim_color,
        numdots: config.practise.numdots,
        feedback_size: config.practise.stim_feedback_size,
        feedback_color: config.practise.stim_feedback_color,
        prompt: `<p>Press ${config.practise.choices[0].toUpperCase()} if the box on the left had more dots. Press ${config.practise.choices[1].toUpperCase()} if the box on the right had more dots.</p>`,
        choices: config.practise.choices,
        stimulus_duration: config.practise.stimulus_duration,
        gap_endtrial: config.practise.stim_feedback_duration
    };
    var stims = generate_block([stim], config.practise.n);
    practise = practise.concat(stims);
    practise.push({
        type: 'instructions',
        data: {
            practise: true
        },
        pages: config.practise.instruction_survey,
        key_forward: "space",
        show_clickable_nav: false,
        show_page_number: false,
        allow_backward: false
    });
    for (i = 0; i < config.practise.survey_questions.length; i += 1) {
        practise.push({
            type: "custom-likert",
            on_start: function() {
                show_cursor();
            },
            data: {
                practise: true
            },
            questions: [config.practise.survey_questions[i]],
            scale_width: config.scale_width,
            button_label: "Continue",
            on_finish: function() {
                remove_cursor();
            }
        });
    }
    return practise;
}

function parse_timeline_variables(subject_id, config) {
    var conditions = Object.keys(config.conditions);
    var cues = Object.keys(config.fixation_cues);
    if (subject_id % 4 == 1) {
        conditions.reverse();
    } else if (subject_id % 4 == 2) {
        cues.reverse();
    } else if (subject_id % 4 == 3) {
        conditions.reverse();
        cues.reverse();
    }
    return zip([conditions, cues]).map(function(x) {
        var data = Object.assign(config.conditions[x[0]], config.fixation_cues[x[1]]);
        return data;
    });
}


function generate_timeline(config) {
    var subject_id = Math.floor(Math.random() * 9000000) + 1000000;
    var tvariables = parse_timeline_variables(subject_id, config);
    var starters = [];
    starters.push({
        type: 'fullscreen',
        fullscreen_mode: true,
        on_finish: function() {
            remove_cursor();
        }
    });

    starters.push({
        type:'external-html',
        url: 'consentpg_coco.html',
        cont_btn: 'startbutton',
        check_fn:function check_consent(elem) {
                if (document.getElementById('consent_checkbox').checked) {
                  return true;
                }
                else {
                alert('If you wish to participate, you must check the box next to the statement: I agree to participate in this study.');
                return false;
              }
        },
        on_start: function() {
                show_cursor();
            },
        on_finish: function() {
            remove_cursor();
        }
    });

    starters.push({
        type: 'instructions',
        pages: config.main_instruction,
        key_forward: "space",
        show_clickable_nav: false,
        show_page_number: false,
        allow_backward: false
    });
    var practise = generate_practise_sequence(config);
    var firsthalf = generate_full_sequence(config, tvariables[0]);
    var secondhalf = generate_full_sequence(config, tvariables[1]);
    var timeline = [starters, practise, firsthalf, secondhalf];
    timeline = timeline.reduce(function(a, b) {
        return a.concat(b);
    });
    timeline.push({
        type: 'instructions',
        pages: [config.end_instruction],
        key_forward: "space",
        show_clickable_nav: false,
        show_page_number: false,
        allow_backward: false,
        data: {
            tag: 'end',
            config: config,
            tvariables: tvariables
        },
        on_finish: function() {
            jsPsych.data.addProperties({
                subject_id: subject_id
            });
        }
    });
    return timeline;
};
