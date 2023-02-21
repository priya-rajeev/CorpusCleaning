function chooseRandom(arr, num) {
    if (num >= arr.length) {
        return arr;
    }
    var shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
};

async function getEntriesForReview() {
    //     fetch('http://localhost:3000/api/getAll')
    //     .then( res => res.json())
    //     .then((data) => {
    //         database = data;
    //     });
    var db = await fetch('http://localhost:3000/api/getAll');
    db = await db.json();
    var entries = [];

    db.forEach(row => {
        if (row['sentence_segmentation'] == ' ') {
            entries.push(row);
        }
    });
    return entries;
}

function collectData() {
    //get id/name

    //get sentence breakdowns and pos

    //post to db
};

async function getCleaningTask(seg_container) {

    //identify rows in which segmentation has not been completed yet
    entries = await getEntriesForReview();
    
    //randomly select 10 choices
    to_review = chooseRandom(entries, 10);

    //display 10 sentences
    var output = [];
    output.push('<form class="quiz-container">');

    //for each randomly selected task
    for(var i=0; i<to_review.length; i++){
        var curr_task = [];
        curr_task.push('<div class="form-group">' +
                          '<label for="sentence_num_'+i+'">' +
                            '<strong>Text: </strong>' + to_review[i]['sentence']+
                            '</label>'+
                            '<textarea class="form-control" id="response_num_' +i+ '" rows="4"></textarea>');
       //add the current task to the output
        output.push(curr_task);
    }

    var submit_btn = '<div class="container" id="check_button">' +
                        '<button id="check_btn" type="button" class="btn btn-primary">Check</button>' +
                    '</div>';
    
    output.push(submit_btn);
    output.push('</form>');

    console.log(output);
    seg_container.innerHTML = output.join('');
}