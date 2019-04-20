let results = {
    keep: [],
    highlighted: []
}; //the data i want to keep
let page = 1;
let toFilter;

//NOTE
//I noticed that the data from this API contains a lot of wrong or 'fake' data, presumably
//placeholder data that I dont know how I cant work out from my wanted data.
//I know my last mockup included videos, but I cant come up with a good way to grab an exercise video
//for all exercises.

while(page <= 18) { 
    fetch('https://wger.de/api/v2/exercise/?format=json&language=2&page=' + page)  //fetch data (18 pages)
        .then(function(response) {  //parse promise
            return response.json();  
            
        })
        .then(function(data) {   //workable data
            /*let exerciseArray = data.results; //array of exercises
            exerciseArray.forEach(function(element) {
                toFilter.forEach(function(filters) {
                    if (element.muscles.includes(filters)) {
                        results.push(element); //push data im interested in to results
                        console.log('pushed');
                    }
                });
            });
            //return results;*/
            results.keep.push.apply(results.keep, data.results); //array of exercises;
        })
        .then(function() {
            buildCardDeck(results.keep);
        })
        .catch(function(err) {
            console.log('error in fetch!')
        });;
    page++;
}

//initialize filtering buttons
let currentPage = "misc";
let armButton = document.getElementById("arms");
let legButton = document.getElementById("legs");
let coreButton = document.getElementById("core");
let chestButton = document.getElementById("chest");
let backButton = document.getElementById("back");
let miscButton = document.getElementById("misc");
let searchButton = document.getElementById("searchsubmit");
let searchBar = document.getElementById("searchbox");
let deleteButton = document.getElementById("deletebutton");



armButton.addEventListener('click', function(buttonPress) {
    if (currentPage != 'arms') {
        let toFilter = [1, 2, 11, 13, 5];
        $('#' + currentPage + ' button').removeClass('disabled'); //remove disabled button
        $('#' + currentPage + ' button').removeClass('btn-primary');
        $('#' + currentPage + ' button').addClass('btn-info');
        $('#arms button').addClass('disabled'); //change this to be disabled
        $('#arms button').removeClass('btn-info'); 
        $('#arms button').addClass('btn-primary');
        currentPage = 'arms';
        filterWorkouts(toFilter);
    }
});

legButton.addEventListener('click', function(buttonPress) {
    if (currentPage != 'legs') {
        let toFilter = [7, 8, 10, 15];
        $('#' + currentPage + ' button').removeClass('disabled');//remove disabled button
        $('#' + currentPage + ' button').removeClass('btn-primary');
        $('#' + currentPage + ' button').addClass('btn-info');
        $('#legs button').addClass('disabled'); //change this to be diabled.
        $('#legs button').removeClass('btn-info'); 
        $('#legs button').addClass('btn-primary');
        currentPage = 'legs';
        filterWorkouts(toFilter);
    }
});

coreButton.addEventListener('click', function(buttonPress) {
    if (currentPage != 'core') { // do not do anything if current page is already selected
        let toFilter = [6];
        $('#' + currentPage + ' button').removeClass('disabled'); //remove disabled button
        $('#' + currentPage + ' button').removeClass('btn-primary');
        $('#' + currentPage + ' button').addClass('btn-info');
        $('#core button').addClass('disabled'); //change this to be disabled
        $('#core button').removeClass('btn-info'); 
        $('#core button').addClass('btn-primary');
        currentPage = 'core';
        filterWorkouts(toFilter);
    }
});

chestButton.addEventListener('click', function(buttonPress) {
    if (currentPage != 'chest') { // do not do anything if current page is already selected
        let toFilter = [4, 3];
        $('#' + currentPage + ' button').removeClass('disabled'); //remove disabled button
        $('#' + currentPage + ' button').removeClass('btn-primary');
        $('#' + currentPage + ' button').addClass('btn-info');
        $('#chest button').addClass('disabled'); //change this to be disabled
        $('#chest button').removeClass('btn-info'); 
        $('#chest button').addClass('btn-primary');
        currentPage = 'chest';
        filterWorkouts(toFilter);
    }
});
backButton.addEventListener('click', function(buttonPress) {
    if (currentPage != 'back') { // do not do anything if current page is already selected
        let toFilter = [9, 3, 12];
        $('#' + currentPage + ' button').removeClass('disabled'); //remove disabled button
        $('#' + currentPage + ' button').removeClass('btn-primary');
        $('#' + currentPage + ' button').addClass('btn-info');
        $('#back button').addClass('disabled'); //change this to be disabled
        $('#back button').removeClass('btn-info'); 
        $('#back button').addClass('btn-primary');
        currentPage = 'back';
        filterWorkouts(toFilter);
    }
});
miscButton.addEventListener('click', function(buttonPress) {
    if (currentPage != 'misc') { // do not do anything if current page is already selected
        $('#' + currentPage + ' button').removeClass('disabled'); //remove disabled button
        $('#' + currentPage + ' button').removeClass('btn-primary');
        $('#' + currentPage + ' button').addClass('btn-info');
        $('#misc button').addClass('disabled'); //change this to be disabled
        $('#misc button').removeClass('btn-info'); 
        $('#misc button').addClass('btn-primary');
        currentPage = 'misc';
        buildCardDeck(results.keep);
    }
});


function filterWorkouts(toFilter) {
    final = [];
    results.keep.forEach(function(exercises) {
        toFilter.forEach(function(interests) {
            if (exercises.muscles.includes(interests) && final.indexOf(exercises.id) == -1) {
                final.push(exercises);
            }
        });
    });
    buildCardDeck(final);
}

function buildCardDeck(filtered) {
    $('#cardDeck').empty(); //empty whats rendered.
    let i = 1;
    let j = 1;
    $('#cardDeck').append('<div id=deck' + j +' class="card-deck mb-3 text-center">');
    for (i = 1; i < filtered.length; i++){
        $('#deck' + j).append('<div id=card' + i +  ' class="card mb-4 box-shadow">');
        $('#card' + i).append('<div id=header' + i + ' class="card-header">');
        $('#header' + i).append('<h2>' + filtered[i].name + '</h2>');
        $('#header' + i).append('</div>');
        $('#card' + i).append('<div id=body' + i + ' class="card-body">')
        $('#body' + i).append(filtered[i].description);
        $('#body' + i).append('</div>');
        $('#card' + i).append('</div>');
        if (i % 3 == 0) {
            $('#cardDeck').append('</div>');
            j++;
            $('#cardDeck').append('<div id=deck' + j +' class="card-deck mb-3 text-center">');
        }
    }
}

let element;
//for adding workouts to modal
//get Card Element
let currentWorkouts = 0;
$('#cardDeck').dblclick(function(event) {
    element = $(event.target);
    if (element[0].className != 'card-deck mb-3 text-center') {
        while (!element[0].id.includes('card')) {
            element[0] = element[0].parentElement;
        }
    }
    element.children('.card-header').addClass('bg-info');
    element.children('.card-header').addClass('highlighted');
    element.children('.card-header').css('color', 'white');
    let html = element[0].innerHTML;
    console.log(html);
    $('.modal-body').append(html);
    $('.modal-body').append('<hr>');
    results.highlighted.push(element.children('.card-header'));
    addWorkoutCount(currentWorkouts);
 });


 function addWorkoutCount() {
    currentWorkouts++;
    $('#ex-count').text(currentWorkouts);
 }

 let highlights;
 deleteButton.addEventListener('click', function(buttonPress) {
    $('.modal-body').empty();
    currentWorkouts = 0;
    $('#ex-count').text(currentWorkouts);
    results.highlighted.forEach(function(element) {
        element.removeClass('bg-info');
        element.removeClass('highlighted');
        element.css('color', 'black');
    });

});

//code for loader: taken from stackOverflow, edited for my use https://stackoverflow.com/questions/1853662/how-to-show-page-loading-div-until-the-page-has-finished-loading
$('#cardDeck').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
$(document).ready(function(){
//$(window).on('load', function(){
    setTimeout(removeLoader, 5500); //wait for page load PLUS two seconds.
});

function removeLoader(){
    $( "#loadingDiv" ).fadeOut(1000, function() {
      // fadeOut complete. Remove the loading div
      $( "#loadingDiv" ).remove(); //makes page more lightweight 
  });  
}
//end code for loader
 

