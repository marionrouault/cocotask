function generate_block(trial, ntrial) {
    block = [];
    for (i = 1; i <= ntrial; i++) {
        block.push(trial);
    }
    return block.reduce(function(a, b) {
        return a.concat(b);
    });
}

function generate_sequence(trial, ntrial, nblock) {
    sequence = [];
    for (j = 1; j <= nblock; j++) {
        block = generate_block(trial, ntrial);
        sequence.push(block);
        tbreak = generate_break(nblock, ntrial);
        sequence.push([tbreak]);
    }
    return sequence.reduce(function(a, b) {
        return a.concat(b);
    });
}

function generate_trial() {
    var stim = {
        type: 'double-dot-stim', // previously image-keyboard-reponse-edited2
        fixation_cue: jsPsych.timelineVariable('fixation_cue'),
        fixation_cue_duration: 500,
        num_dots: function() {
            return [50, 100];
        },
        border_color: "#FF9005",
        prompt: "<p>Press E if you see more points on the left. Press R if you see more points on the right.</p>",
        choices: ['e', 'r'],
        stimulus_duration: 500,
        gap_endtrial: 500
    };
    var scale = ["Au hasard", " ", " ", " ", " ", "Very confidence"];
    var rating = {
        type: "survey-likert",
        questions: [{
            prompt: "Evaluate your confidence.",
            labels: scale,
            required: true
        }],
        scale_width: 500
    };
    var feedback = {
        type: 'html-keyboard-response',
        stimulus: function() {
            last_trial_correct = jsPsych.data.get().last(2).values()[0].correct;
            if (last_trial_correct) {
                dist = 'ycorrect';
            } else {
                dist = 'yincorrect';
            };
            reward = jsPsych.timelineVariable(dist, true).pop();
            return "<p class='stimulus'> Congrast buddy, you just made" + reward + " $</p>";
        },
        data: jsPsych.timelineVariable('data')
    };
    return [stim, rating, feedback];
};

function generate_break(nblock, ntrial, nseq) {
    var tbreak = {
        type: "html-keyboard-response",
        stimulus: function() {
            n = jsPsych.data.get().filter({
                trial_type: 'fixation'
            }).count();
            n = Math.floor(n / ntrial);
            total = nblock;
            return '<p class="instructions">Vous avez termine ' + n + ' blocs sur ' + total + '.</p>' +
                '<p class="instructions">Rappel : <br>Si la boîte de <strong>gauche</strong> contient le plus de points, appuyez sur <strong>Z</strong>.<br> Si la boîte de <strong>droite</strong> contient le plus de points, appuyez sur <strong>E</strong>.</p>' + '<p class="instructions"><br>Appuyez sur la barre espace pour continuer.</p>';
        },
        data: {
            trial_type: 0,
            label: 'intruct',
            trialType: 'intruc',
            block_nb: 9
        },
        cont_key: 32
    };
    return tbreak;
}

function generate_full_sequence(condition, ntrial, nblock) {
    var trial = generate_trial();
    var seq = generate_sequence(trial, ntrial, nblock);
    var sequence = {
        timeline: seq,
        timeline_variables: condition,
        repetitions: 1
    };
    return sequence;
}

function generate_timeline(conditions, ntrial, nblock) {
    var subject_id = Math.floor(Math.random() * 9000000) + 1000000;
}
