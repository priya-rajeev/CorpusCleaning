//chooses random elements in an array
function chooseRandom(arr, num) {
    if (num >= arr.length) {
        return arr;
    }
    var shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
};

//fetches entries from the database
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

//dynamically adjusts height of text areas
function adjustHeight(inputField) {
    inputField.style.height = "1px";
    inputField.style.height = (25+inputField.scrollHeight)+"px";
}

//posts data to the database
function postData(sentences) {
    var text_areas = Array.from(document.getElementsByTagName("textarea"));

    //get id/name
    var id = text_areas.shift().value;
    console.log('id number: ', id);

    sentence_segmentations = [];
    //get sentence segmentations
    text_areas.forEach(ta => {
        sentence_segmentations.push(ta.value);
    })

    for(var i=0; i < sentences.length; i++) {
        sentences[i]['sentence_segmentation'] = sentence_segmentations[i];
        sentences[i]['reviewer_id'] = id.toString();
    }

    //post to db
    console.log('reviewed: ', sentences);
};

//renders the page
async function getCleaningTask(seg_container) {

    //identify rows in which segmentation has not been completed yet
    entries = await getEntriesForReview();
    
    //randomly select 10 choices
    to_review = chooseRandom(entries, 10);
    console.log('to review: ', to_review);

    //display 10 sentences
    var output = [];
    output.push('<form class="quiz-container">');

    //ask for id number
    var id_prompt = '<div class="form-group" id="id_prompt">' +
                        '<label for="reviewer_id">' +
                            '<strong> Please enter your ID number below: </strong>'+
                        '</label>'+
                        '<textarea onkeyup="adjustHeight(this)" class="form-control" role="textbox" id="response_num_' +i+ '" rows="1"></textarea>'+
                    '</div>';
    output.push(id_prompt);

    //for each randomly selected task
    for(var i=0; i<to_review.length; i++){
        var curr_task = [];
        curr_task.push('<div class="form-group">' +
                            '<label for="sentence_num_'+i+'">' +
                                '<strong>Text: </strong>' + to_review[i]['sentence']+
                            '</label>'+
                            '<textarea onkeyup="adjustHeight(this)" class="form-control" role="textbox" id="response_num_' +i+ '" rows="4"></textarea>'+
                        '</div>');
       //add the current task to the output
        output.push(curr_task);
    }

    var submit_btn = '<div class="container" id="check_button">' +
                        '<button id="sub_btn" type="button" class="btn btn-primary">Submit</button>' +
                    '</div>';
    
    output.push(submit_btn);
    output.push('</form>');
    seg_container.innerHTML = output.join('');

    submit_btn = document.getElementById("sub_btn");
    submit_btn.onclick = function(){
        postData(to_review);
    };
}