function staircase(dots_diff, answers, trialNum) {
    var dummy = {
        correct: true
    };
    if (answers[0] == undefined) {
        answers[0] = dummy;
    }
    if (answers[1] == undefined) {
        answers[1] = dummy;
    }
    if (answers[1].correct) // If the last trial was correct
    {
        if (answers[0].correct) // AND two trials ago were correct
        {
            if (trialNum < 7)
                dots_diff -= 0.4;
            // for 0==trial and for the second half of the practice
            else if (trialNum > 6 && trialNum < 12)
                dots_diff -= 0.2;
            // for the first 5 trials of the practice
            else if (trialNum > 11)
                dots_diff -= 0.1;
            // for next 5 trials of the practice
        }
        // If the last trial was correct and two trials ago were wrong, do nothing.
    } else // If the last trial was wrong
    {
        if (trialNum < 7)
            dots_diff += 0.4;
        // for 0==trial and for the second half of the practice
        else if (trialNum > 6 && trialNum < 12)
            dots_diff += 0.2;
        // for the first 5 trials of the practice
        else if (trialNum > 11)
            dots_diff += 0.1;
    }
    // Set limits on dots_diff s.t. it remains in the range of [0,50] inclusive
    //if (dots_diff >= 4.25)
    //  dots_diff = 4.25;
    if (dots_diff <= 1)
        dots_diff = 1;
    return dots_diff;
}
