//chooses random elements in an array
function chooseRandom(arr, num) {
    if (num >= arr.length) {
        return arr;
    }
    var shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
};

//dynamically adjusts height of text areas
function adjustHeight(inputField) {
    inputField.style.height = "1px";
    inputField.style.height = (25+inputField.scrollHeight)+"px";
}

//checks if any item in the list is null, returns false if there is a null
function nullCheck(list) {
    var check = true;
    list.forEach(l => {
        if (l.value == '') {
            check = false;
        }
    })
    return check;
}

//fetches entries from the database
async function getEntriesForReview() {
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

//updates data in the database
function putData(sentences) {
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

    sentences.forEach(async s => {
        id = s['_id']; //the text sample's id in the database
        var url_update = 'http://localhost:3000/api/update/'+id.toString();
        // var url_post = 'http://localhost:3000/api/post/';
        // var url_del = 'http://localhost:3000/api/delete/'+id.toString(); //the url contains id

        var str_body = JSON.stringify({
            reviewer_id: s['reviewer_id'].toString(),
            sentence_segmentation: s['sentence_segmentation'].toString(),
            sentence: s['sentence'].toString(),
            thread_id: s['thread_id'].toString()
        });

        // var request_optns_post = {
        //     method: 'POST',
        //     body: str_body,
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     }        
        // };

        // var request_optns_del = {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     }
        // };

        var request_optns_update = {
            method: 'PATCH',
            body: str_body,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }        
        };

        //first delete original from database
            // var response_del = await fetch(url_del, request_optns_del);
            // var resp = await response_del.json();
            // console.log('deleted: ', resp);

        //then post new response
            // var response_post = await fetch(url_post, request_optns_post);
            // resp = await response_post.json();
            // console.log('posted: ', resp);

        var response_update = await fetch(url_update, request_optns_update);
        resp = await response_update.json();
        console.log('updated: ', resp);
    });
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
                        '<textarea onkeyup="adjustHeight(this)" class="form-control" role="textbox" id="response_num_' +i+ '" rows="1" required="true"></textarea>'+
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

    var cont_btn = '<div class="container" id="continue_button"></div>';
    
    output.push(submit_btn);
    output.push(cont_btn);
    output.push('</form>');
    seg_container.innerHTML = output.join('');

    submit_btn = document.getElementById("sub_btn");
    submit_btn.onclick = function(){
        var text_areas = Array.from(document.getElementsByTagName("textarea"));
        segs = []
        text_areas.forEach(ta => {
            segs.push(ta);
        });
        console.log('segs: ', segs);
        console.log('null check: ', nullCheck(text_areas));
        if (nullCheck(text_areas)) {
            putData(to_review);

            //allow users to finish page
            cont_btn_container = document.getElementById("continue_button");
            cont_btn_container.innerHTML = '<a id="cnt_btn" type="button" class="btn btn-success" href="finish_page.html">Continue</a>';
        } else {
            //don't allow submission without a response for every text field
            alert('Some required fields are not filled in!');
        }
    };
}