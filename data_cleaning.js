function chooseRandom(arr, num) {
    var shuffled = arr.sort(() => 0.5 - Math.random());
    // console.log(shuffled.slice(0, num));
    return shuffled.slice(0, num);
}

function getCleaningTask(sample_container) {
    //pull all rows from database
    fetch('/getAll')
    .then( res => res.json())
    .then((data) => {
    //we are actually using the returned data from the API here
    // data.results contains an array of objects so we can use an array method here to iterate
        // data.results.forEach( (imageObj) =>{
        //   createImage(imageObj);
        // });
        console.log(data.length)
    });

    //identify rows in which the second id column is empty 

    //randomly select 10 choices

    //display 10 choices 
}

function collectData() {
    //get id/name

    //get sentence breakdowns and pos

    //post to db
}