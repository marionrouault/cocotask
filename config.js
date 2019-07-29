function load_config() {
    var config = {};
    config.show_progress_bar = false;
    config.exclusions = {
        min_width: 800,
        min_height: 600
    };

    // general
    config.ntrial = 1;//40;//per block
    config.nblock = 1;//4;//per condition
    config.inter_trial_interval = 300;
    config.fixation_cue_duration = 500;//800;
    config.fixation_cue_width = 20;
    config.fixation_cue_height = 20;
    config.fixation_cue_thickness = 5;
    config.stim_size = 250;
    config.cellsize = 10;
    config.stim_color = '#FFFFFF';
    config.stim_background_color = '#000000';
    config.initial_dotdiff = 50;
    config.numdots = 313;
    config.scale = ["Au hasard", " ", " ", " ", " ", "Certain"];
    config.choices = ["z", "e"];
    config.stimulus_duration = 300;
    config.stim_feedback_size = 20;
    config.stim_feedback_duration = 500;
    config.feedback_duration = 1000;
    config.feedback_fontsize = 32;
    config.scale_width = 500;

    // conditions
    config.conditions = {
        high: {
            condition_name: "high",
            ycorrect: [63, 76, 65, 64, 72, 58, 60, 57, 70, 66, 66, 69, 56, 81, 57, 75, 55, 73, 66, 72, 68, 79, 58, 55, 55, 79, 80, 77, 68, 57, 67, 62, 68, 59, 87, 56, 71, 68, 62, 74, 62, 63, 73, 74, 58, 71, 68, 66, 62, 57, 54, 59, 58, 59, 79, 66, 66, 59, 70, 52, 56, 67, 75, 62, 70, 74, 55, 61, 79, 65, 72, 73, 69, 78, 68, 55, 60, 58, 57, 60, 59, 58, 64, 60, 60, 55, 74, 57, 67, 49, 74, 64, 77, 52, 68, 70, 67, 65, 64, 62, 64, 60, 57, 74, 58, 63, 61, 74, 71, 51, 65, 62, 53, 62, 62, 74, 59, 81, 64, 71, 58, 58, 74, 69, 69, 62, 68, 62, 83, 64, 62, 55, 72, 67, 61, 68, 60, 57, 60, 56, 83, 71],
            yincorrect: [49, 48, 52, 41, 36, 44, 46, 59, 44, 38, 40, 47, 54, 36, 42, 44, 57, 61, 57, 57, 45, 46, 48, 55, 57, 51, 46, 41, 44, 53, 52, 50, 54, 49, 47, 51, 51, 34, 37, 39, 39, 40, 57, 40, 49, 57, 50, 45, 62, 57, 52, 40, 45, 38, 50, 57, 51, 49]
        },
        low: {
            condition_name: "low",
            ycorrect: [65, 56, 67, 59, 66, 60, 54, 51, 69, 72, 60, 53, 51, 74, 57, 69, 63, 70, 59, 63, 71, 69, 73, 64, 70, 78, 69, 50, 55, 69, 52, 81, 70, 86, 59, 69, 71, 61, 62, 65, 69, 66, 59, 71, 69, 57, 63, 54, 53, 67, 51, 56, 72, 65, 67, 80, 71, 69, 70, 58, 61, 58, 56, 58, 67, 62, 64, 56, 65, 70, 50, 84, 66, 81, 72, 48, 62, 59, 54, 73, 60, 61, 75, 61, 62, 74, 67, 67, 70, 71, 59, 43, 75, 52, 73, 79, 73, 67, 64, 62, 59, 51, 59, 72, 51, 54, 58, 71, 64, 59, 70, 73, 65, 64, 68, 59, 77, 53, 70, 59, 53, 64, 66, 65, 69, 55, 70, 70, 72, 64, 65, 57, 63, 85, 54, 59, 45, 71, 68, 71, 61, 71],
            yincorrect: [56, 64, 55, 56, 34, 61, 45, 47, 45, 53, 53, 57, 59, 47, 64, 49, 45, 46, 43, 54, 55, 47, 54, 49, 57, 49, 52, 46, 51, 55, 41, 44, 44, 41, 56, 53, 59, 50, 54, 47, 54, 64, 54, 71, 35, 51, 52, 57, 56, 73, 47, 53, 39, 47, 53, 52, 48, 43]
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
    config.main_instruction = ['<p >Bienvenue !</p><p >Votre tâche sera de juger laquelle de deux boîtes contient le plus de points, puis de donner une évaluation de votre confiance en chaque jugement.</p><p >Au début de chaque essai, une croix sera présentée au centre de l’écran. Focalisez votre attention dessus. Ensuite, deux boîtes noires contenant un certain nombre de points blancs seront présentées très rapidement et vous devrez juger laquelle des deux boîtes contient le plus de points.</p><p >Si la boîte de <strong>gauche</strong> contient le plus de points, <strong>appuyez sur Z</strong>.<br> Si la boîte de <strong>droite</strong> contient le plus de points, <strong> appuyez sur E</strong>.</p><p >Merci de répondre rapidement et le mieux possible.</p><p >Vous devrez ensuite évaluer votre confiance en votre réponse sur une échelle avec la souris.</p><p >Merci de faire de votre mieux pour évaluer votre confiance le plus précisement possible, et tirer profit de l’ensemble de l’échelle.</p><p >Appuyez sur la barre espace pour continuer.</p>'];
    config.break_instruction = '<p >Rappel : <br>Si la boîte de <strong>gauche</strong> contient le plus de points, appuyez sur <strong>Z</strong>.<br> Si la boîte de <strong>droite</strong> contient le plus de points, appuyez sur <strong>E</strong>.</p><p ><br>Appuyez sur la barre espace pour continuer.</p>';
    config.end_instruction = "<p>Bravo ! C’est terminé.<br></br>Appuyez sur la barre espace pour terminer l’expérience et enregistrer vos réponses.</p>";

    // practise
    config.practise = {};
    config.practise.enable = false;
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
    config.practise.choices = ["z", "e"];
    config.practise.stimulus_duration = 300;
    config.practise.stim_feedback_size = 20;
    config.practise.stim_feedback_color = "#32CD32";
    config.practise.stim_feedback_duration = 500;
    config.practise.instruction_stim = ['<p>Vous avez maintenant quelques essais pour vous entraîner. Merci de répondre seulement après que les points aient disparu de l’écran.</p><p >Pendant cette phase d’entraînement, on vous dira à chaque essai si votre réponse était correcte. <br></br>Si votre réponse était <strong>correcte</strong>, la boîte que vous avez choisie apparaîtra en <font color="green"><strong>vert</strong></font>. <br>Si votre réponse était <strong>incorrecte</strong>, la boîte que vous avez choisie apparaîtra en <font color="red"><strong>rouge</strong></font>.</p><p >Vous n’aurez pas besoin d’évaluer votre confiance pour ces essais d’entraînement.</p><p ><strong>C’est normal que la tâche soit difficile. Essayez simplement de faire de votre mieux.</strong></p><p >Appuyez sur la barre espace pour continuer.</p>'];
    config.practise.instruction_survey = ['<p>Pendant l’expérience elle-même, on ne vous dira pas si votre réponse était correcte ou incorrecte, mais la boîte que vous avez choisie sera indiquée.</p><p >Vous devrez ensuite évaluer votre confiance en votre réponse sur une échelle d’évaluation, à chaque essai, ce que nous allons maintenant expliquer plus en détail.</p><p >Appuyez sur la barre espace pour continuer.</p>'];
    config.practise.survey_questions = [{
            prompt: '<p>Voici l’échelle d’évaluation qui sera employée pour tous les essais. Vous pourrez évaluer votre confiance en votre réponse en choisissant un point le long de l’échelle avec la souris. <br></br>Cliquez sur ‘Continuer’.</p><br>',
            required: false,
            labels: config.scale
        },
        {
            prompt: '<p>Pendant la tâche, si vous êtes <strong>très sûr(e)</strong> d avoir choisi la bonne boîte, où est-ce que vous répondriez sur l’échelle ?</p>',
            required: true,
            labels: config.scale
        },
        {
            prompt: '<p>Pendant la tâche, si vous n’êtes <strong>pas sûr(e) du tout</strong> d’avoir choisi la bonne boîte, où est-ce que vous répondriez sur l’échelle ? </p>',
            required: true,
            labels: config.scale
        },
        {
            prompt: '<p>Si vous êtes <strong>très sûr(e)</strong> d’avoir choisi la bonne boîte, vous auriez dû répondre <strong>Certain</strong>.</p><p>Si vous n’êtes <strong>pas sûr(e) du tout</strong> d’avoir choisi la bonne boîte, vous auriez dû répondre <strong>Au hasard</strong>.</p><p>Appuyez sur continuer.</p>',
            required: false,
            labels: config.scale
        },
        {
            prompt: '<p>Si vous êtes <strong>peu sûr(e)</strong> de votre réponse, vous devrez choisir un point entre ces deux descriptions en fonction de votre confiance.</p><p>Essayez d’utiliser l’ensemble de l’échelle, en gardant à l’esprit que l’échelle représente une confiance relative. Sachant que la tâche est difficile, vous serez rarement complètement sûr(e)s que votre réponse est correcte.</p><p>Si vous avez bien compris comment utiliser et exploiter l’ensemble de l’échelle, cliquez sur ‘Continuer’.</p><br>',
            required: false,
            labels: config.scale
        }

    ];

    return config;

}
