function load_config() {
    var config = {};
    config.show_progress_bar = false;
    config.exclusions = {
        min_width: 800,
        min_height: 600
    };

    // general
    config.ntrial = 2;//40;//per block
    config.nblock = 4;//per condition
    config.inter_trial_interval = 300;
    config.fixation_cue_duration = 800;
    config.fixation_cue_width = 20;
    config.fixation_cue_height = 20;
    config.fixation_cue_thickness = 5;
    config.stim_size = 250;
    config.cellsize = 10;
    config.stim_color = '#FFFFFF';
    config.stim_background_color = '#000000';
    config.initial_dotdiff = 50;
    config.numdots = 313;
    config.scale = ["Guessing", " ", " ", " ", " ", "Certainly correct"];
    config.global_scale = ["50 % (chance)", "60 %", "70 %", "80 %", "90 %", "100 % (perfect)"];
    config.choices = ["w", "e"];
    config.stimulus_duration = 300;
    config.stim_feedback_size = 20;
    config.stim_feedback_duration = 500;
    config.feedback_duration = 1000;
    config.feedback_fontsize = 32;
    config.scale_width = 500;

    // conditions: plan more trials than necessary
    config.conditions = {
        high: {
            condition_name: "high",
            ycorrect: [65,67,65,68,64,86,59,56,56,55,62,63,61,70,66,70,77,81,58,57,68,56,64,64,73,63,62,67,69,64,61,57,65,59,54,69,59,63,68,61,69,62,68,68,63,53,61,62,60,58,71,62,74,62,70,62,71,69,61,59,70,78,61,67,63,72,70,58,73,84,64,74,65,57,58,62,69,72,70,60,64,56,56,57,67,64,58,64,57,55,72,65,76,68,65,71,74,84,48,73,66,84,64,63,71,59,64,75,65,72,69,65,59,67,56,66,67,69,74,82,70,65,76,65,53,57,73,63,72,58,65,66,54,66,61,55,64,58,57,58,57,58,54,66,60,64,68,64,64,63,57,64,73,73,60,58,65,67,62,58,78,56,56,57,58,66,65,55,77,69,69,55,73,77,83,73,70,64,58,62,57],
            yincorrect: [36,56,46,46,47,49,51,36,54,50,54,47,49,38,44,51,47,55,42,58,50,52,63,46,48,49,53,53,41,44,47,39,50,47,44,45,55,52,49,55,41,52,52,50,44,51,46,42,45,55,40,45,38,49,33,55,44,41,47,49,41,60,47,46,39,46,38,50,53,51,41,40,53,55]
        },
        low: {
            condition_name: "low",
            ycorrect: [64,52,71,59,58,69,44,49,67,65,64,68,68,70,58,67,64,61,50,70,59,65,69,52,53,64,63,74,70,69,49,51,52,70,77,67,53,68,53,53,66,59,66,69,65,69,57,69,80,73,51,60,60,67,65,70,60,56,51,70,56,60,64,57,66,63,54,70,52,58,57,64,52,61,52,53,70,58,65,79,61,67,69,61,67,53,77,55,58,70,63,70,61,58,48,67,61,62,65,50,59,70,68,53,53,52,43,61,67,68,64,52,66,53,54,52,54,55,56,59,59,56,57,74,68,64,55,56,51,75,68,64,59,55,66,84,55,57,61,51,67,61,82,61,66,54,60,54,69,73,60,67,58,64,72,65,59,58,62,61,60,64,69,61,61,53,46,58,59,66,79,77,62,57,69,69,69,69,52,67,62],
            yincorrect: [46,42,60,45,44,56,63,53,57,44,66,53,56,37,59,58,43,53,49,53,50,50,45,47,35,64,55,65,44,64,59,54,51,47,58,46,40,58,56,57,55,51,50,60,48,60,59,61,52,55,66,51,39,61,55,49,76,46,55,54,50,43,36,51,45,57,50,61,57,54,45,67,47,64]
        }
    };
    // cues
    config.fixation_cues = {
        blue: {
            fixation_cue_color: "#6682FE"
        },
        orange: {
            fixation_cue_color: "#FD780A"
        }
    };
    // instructions
    config.main_instruction = ['<p>Welcome to the task!</p>' +
    '<p>We will now ask you to judge which of two images contains more dots, before asking you to rate your confidence in your judgement.</p>' +
    '<p>At the beginning of each trial, you will be presented with a black cross in the middle of the screen. Focus your attention on it. Then, two black boxes with a number of white dots will be flashed and you will be asked to judge which box had a higher number of dots.</p>' +
    `<p>If the box on the <strong>left</strong> had more dots, <strong>press ${config.choices[0].toUpperCase()}</strong>.<br> If the box on the <strong>right</strong> had more dots, <strong>press ${config.choices[1].toUpperCase()}</strong>.</p>` +
    '<p>Please respond quickly and to the best of your ability.</p>' +
    '<p>You will then rate your confidence in your judgement on a scale with the mouse.</p>' +
    '<p>Please do your best to rate your confidence accurately and do take advantage of the whole rating scale.</p>' +
    '<p>Press spacebar to continue.</p>'];
    config.consentpg = ['here needs text for consent form'];
    config.break_instruction = '<p>As a reminder: <br>If the box on the <strong>left</strong> had more dots, press <strong>W</strong>.<br> If the box on the <strong>right</strong> had more dots, press <strong>E</strong>.</p>' +
    '<p><br>Press spacebar to continue the task.</p>';
    config.end_instruction = '<p>Thank you for your participation!<br></br>Your code is <strong>0ITPRF15</strong>.<br></br>Press spacebar to record your responses and finish.</p>';

    // practise
    config.practise = {};
    config.practise.enable = false;//true;
    config.practise.n = 26;
    config.practise.fixation_cue_duration = 1000;
    config.practise.fixation_cue_height = 20;
    config.practise.fixation_cue_width = 20;
    config.practise.fixation_cue_thickness = 5;
    config.practise.fixation_cue_color = "#000000";
    config.practise.stim_size = 250;
    config.practise.cellsize = 10;
    config.practise.stim_color = '#FFFFFF';
    config.practise.stim_background_color = '#000000';
    config.practise.initial_dotdiff = 50;
    config.practise.numdots = 313;
    config.practise.choices = ["w", "e"];
    config.practise.stimulus_duration = 300;
    config.practise.stim_feedback_size = 20;
    config.practise.stim_feedback_color = "#32CD32";
    config.practise.stim_feedback_duration = 500;
    config.practise.instruction_stim = ['<p>We will now ask you to carry out some practice trials. Please respond only when the dots have disappeared.</p>' +  
    '<p>In this practice phase we will tell you whether your judgements are right or wrong. <br></br>If you are <strong>correct</strong>, the box that you selected will be outlined in <font color="green"><strong>green</strong></font>. <br>If you are <strong>incorrect</strong>, the box that you selected will be outlined in <font color="red"><strong>red</strong></font>.</p>' +
    '<p>You will not need to rate your confidence of your judgements on these trials.</p>' +
    '<p>It is expected that the judgements are difficult. Please just do your very best.</p>' +
    '<p>Press spacebar to continue.</p>'];
    config.practise.instruction_survey = ['<p>In the task proper, you will not be provided accuracy feedback on your judgements, but the box you selected will be outlined.</p>' +
    '<p>You will be asked to rate your confidence in your judgement on a rating scale after each trial, which will be explained next.</p>' +
    '<p>Press spacebar to continue.</p>'];


    config.practise.survey_questions = [{
            prompt: '<p>A rating scale as shown below is used throughout the task. You will be able to rate your confidence of your judgements by choosing any point along the rating scale with your mouse. <br></br>Click ‘Continue’.</p><br>',
            required: false,
            labels: config.scale
        },
        {
            prompt: 'During the task, if you are <strong>very sure</strong> that you made the correct judgement, where on the scale would you choose?',
            required: true,
            labels: config.scale
        },
        {
            prompt: 'During the task, if you are <strong>very unsure</strong> that you made the correct judgement, where on the scale would you choose?</p>',
            required: true,
            labels: config.scale
        },
        {
            prompt: '<p>If you are <strong>very sure</strong> that you made the correct judgement, you should have responded <strong>Certainly Correct</strong>.</p>' +                         
            '<p>If you are <strong>very unsure</strong> you made the correct judgement, you should have responded <strong>Guessing</strong>.</p>' + 
            '<p>Click ‘Continue’.</p>',
            required: false,
            labels: config.scale
        },
        {
            prompt: '<p>If you are <strong>somewhat sure</strong> about being correct, you should select a rating between the two descriptions.</p>' +
            '<p>If you understand how to use and take advantage of the whole rating scale, choose any point on the rating scale and click ‘Continue’.</p><br>',
            required: true,
            labels: config.scale
        }

    ];

    return config;

}
