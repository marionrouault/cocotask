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
        gap_endtrial: config.stim_feedback_duration
    };
    var rating = {
        type: "survey-likert",
        questions: [{
            prompt: "Evaluez votre confiance.",
            labels: config.scale,
            required: true
        }],
        scale_width: config.scale_width
    };
    var feedback = {
        type: 'instructions',
        pages: function() {
            var correct = jsPsych.data.get().filter({
                trial_type: 'double-dot-stim'
            }).last(1).values()[0].correct;
            var dist = 'yincorrect';
            if (correct) {
                dist = 'ycorrect';
            }
            var reward = jsPsych.timelineVariable(dist, true).pop();
            return [`<p class='reward'> ${reward} </p>`];
        },
        key_forward: "space",
        show_clickable_nav: false,
        show_page_number: false,
        allow_backward: false
    };
    return [stim, rating, feedback];
};

function generate_break(config) {
    return {
        type: 'instructions',
        pages: function() {
            var n = jsPsych.data.get().filter({
                trial_type: 'double-dot-stim'
            }).count();
            n = Math.floor(n / config.ntrial);
            var instruction = '<p class="instructions">Vous avez termine ' + n + ' blocs sur ' + 2 * config.nblock + '.</p>';
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
        data.subject_id = subject_id;
        return data;
    });
}

function generate_timeline(config) {
    var subject_id = Math.floor(Math.random() * 9000000) + 1000000;
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
    var tvariables = parse_timeline_variables(subject_id, config);
    var firsthalf = generate_full_sequence(config, tvariables[0]);
    var secondhalf = generate_full_sequence(config, tvariables[1]);
    var timeline = [starters, firsthalf, secondhalf];
    return timeline.reduce(function(a, b) {
        return a.concat(b);
    });
};
