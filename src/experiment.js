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
    }
    return sequence.reduce(function(a, b) {
        return a.concat(b);
    });
}

function generate_trial(config) {
    var stim = {
        type: 'double-dot-stim', // previously image-keyboard-reponse-edited2
        fixation_cue: jsPsych.timelineVariable('fixation_cue'),
        fixation_cue_duration: config.fixation_cue_duration,
        initial_dotdiff: config.initial_dotdiff,
        cellsize: config.cellsize,
        stim_background_color: config.stim_background_color,
        stim_color: config.stim_color,
        numdots: config.numdots,
        feedback_size: config.stim_feedback_size,
        feedback_color: jsPsych.timelineVariable('fixation_cue_color'),
        prompt: "<p>Presser " + config.choices[0] + " si l'image de gauche contient plus de point. Presser " + config.choices[1] + " si l'image the droite contient plus de plus.</p>",
        choices: config.choices,
        stimulus_duration: config.stimulus_duration,
        gap_endtrial: config.stim_feedback_duration,
        data: {
            condition_name: jsPsych.timelineVariable('condition_name')
        }
    };
    var rating = {
        type: "survey-likert",
        questions: [{
            prompt: "Evaluez votre confiance.",
            labels: config.scale,
            required: true
        }],
        scale_width: config.scale_width,
        on_finish: function() {
            var correct = jsPsych.data.get().filter({
                trial_type: 'double-dot-stim'
            }).last(1).values()[0].correct;
            var dist = 'yincorrect';
            if (correct) {
                dist = 'ycorrect';
            }
            var reward = jsPsych.timelineVariable(dist, true).reverse().pop();
            jsPsych.data.addDataToLastTrial({
                condition_name: jsPsych.timelineVariable('condition_name'),
                tag: "rating",
                reward: reward
            });
        }
    };
    var feedback = {
        type: 'feedback',
        feedback: function() {
            var reward = jsPsych.data.get().filter({
                tag: 'rating'
            }).last(1).values()[0].reward;
            return `<p class='reward'> ${reward} </p>`;
        },
        feedback_duration: config.feedback_duration,
        data: {
            tag: "feedback",
            condition_name: jsPsych.timelineVariable('condition_name')
        }
    };
    return [stim, rating, feedback];
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
            var instruction = '<p>Vous avez termine ' + n + ' blocs sur ' + 2 * config.nblock + '.</p>';
            return [instruction + config.break_instruction];
        },
        key_forward: "space",
        show_clickable_nav: false,
        show_page_number: false,
        allow_backward: false
    };
}

function generate_full_sequence(config, timeline_variable) {
    var trial = generate_trial(config);
    var seq = generate_sequence(config, trial);
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
        type: 'double-dot-stim', // previously image-keyboard-reponse-edited2
        practise: true,
        fixation_cue: config.practise.fixation_cue,
        fixation_cue_duration: config.practise.fixation_cue_duration,
        initial_dotdiff: config.practise.initial_dotdiff,
        cellsize: config.practise.cellsize,
        stim_background_color: config.practise.stim_background_color,
        stim_color: config.practise.stim_color,
        numdots: config.practise.numdots,
        feedback_size: config.practise.stim_feedback_size,
        feedback_color: config.practise.stim_feedback_color,
        prompt: `<p>Presser ${config.practise.choices[0]} si l'image de gauche contient plus de point. Presser ${config.practise.choices[1]} si l'image the droite contient plus de plus.</p>`,
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
            type: "survey-likert",
            data: {
                practise: true
            },
            questions: [config.practise.survey_questions[i]],
            scale_width: config.scale_width
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
        fullscreen_mode: true
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
