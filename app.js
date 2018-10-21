'use strict';

//global variables for images in html
//tie images to events
var ProdImgLeft = document.getElementById('left');
var ProdImgCenter = document.getElementById('center');
var ProdImgRight = document.getElementById('right');
var imageSection = document.getElementById('images-container');
// counter for all of our selected data
var clickCounter = 0;
//retrieves html element for display
var canvas = document.getElementById("myChart");
var ctx = canvas.getContext('2d');

var colorChange = ['red', 'aqua', 'aquamarine', 'blue', 'blueviolet', 'brown', 'cadetblue', 'chartreuse', 'darkblue', 'deeppink', 'gold', 'green', 'yellow'];

var allProdImgs = [];

var randomNumberLeftArr = [];
var randomNumberCenterArr = [];
var randomNumberRightArr = [];

var pastImgs = [];
//numbers match array images to page hard-coded images
var randomNumberLeft = 0;
var randomNumberCenter = 1;
var randomNumberRight = 2;

var prodNames = [];
var prodLikes = [];
var colors = [];

var savedNames = [];
var savedLikes = [];
var savedTotal = []; //array/s for displaying saved data
//=======================================================
//constructor for building product images on page
var ProdImg = function(src, name) {
    this.likes = 0;
    this.src = src;
    this.name = name;
    this.appeared = 0;

    allProdImgs.push(this);
}
//prototype
ProdImg.prototype.renderProduct = function() {
    ProdImgLeft.src = this.src;
    ProdImgCenter.src = this.src;
    ProdImgRight.src = this.src;
}

//listening and handling images clicked
var prodClickHandler = function (event) {

//to start counting likes
if(event.target.id === 'left') {
    
    randomNumberLeftArr.push(allProdImgs[randomNumberLeft]);
    allProdImgs[randomNumberLeft].likes++;
    
} else if(event.target.id === 'center') {
    randomNumberCenterArr.push(allProdImgs[randomNumberCenter]);
    allProdImgs[randomNumberCenter].likes++;
    
} else {
    randomNumberRightArr.push(allProdImgs[randomNumberRight]);
    allProdImgs[randomNumberRight].likes++;
    
}

allProdImgs[randomNumberLeft].appeared++;
allProdImgs[randomNumberCenter].appeared++;
allProdImgs[randomNumberRight].appeared++;

if(event.target.id === 'left' || event.target.id === 'center' || event.target.id === 'right') {
    do {
        randomNumberLeft = Math.floor(Math.random() * allProdImgs.length)
        pastImgs.push(randomNumberLeft); //stores random numbers to compare new numbers to old
        
        //posts random images w/names on page
        document.getElementById("left").src = allProdImgs[randomNumberLeft].src;
        document.getElementById("nameA").textContent = allProdImgs[randomNumberLeft].name;

        randomNumberCenter = Math.floor(Math.random() * allProdImgs.length)
        pastImgs.push(randomNumberCenter);
        document.getElementById("center").src = allProdImgs[randomNumberCenter].src;
        document.getElementById("nameB").textContent = allProdImgs[randomNumberCenter].name;

        randomNumberRight = Math.floor(Math.random() * allProdImgs.length)
        pastImgs.push(randomNumberRight);
        document.getElementById("right").src = allProdImgs[randomNumberRight].src;
        document.getElementById("nameC").textContent = allProdImgs[randomNumberRight].name;
        
    } while(randomNumberLeft === pastImgs[0] || randomNumberLeft === pastImgs[1] || randomNumberLeft === pastImgs[2]  || randomNumberCenter === pastImgs[0] || randomNumberCenter === pastImgs[1] || randomNumberCenter === pastImgs[2] || randomNumberRight === pastImgs[0] || randomNumberRight === pastImgs[1] || randomNumberLeft === pastImgs[2]);
}

//to avoid duplicate images displayed
for(var i = 0; i < allProdImgs.length - 1; i++) {
    if(randomNumberLeft === randomNumberCenter || randomNumberLeft === randomNumberRight || randomNumberCenter === randomNumberRight) {
        i++;
        document.getElementById("left").src = allProdImgs[i].src;
        document.getElementById("nameA").textContent = allProdImgs[i].name;
        i++;
        document.getElementById("center").src = allProdImgs[i].src;
        document.getElementById("nameB").textContent = allProdImgs[i].name;
        i++;
        document.getElementById("right").src = allProdImgs[i].src;
        document.getElementById("nameC").textContent = allProdImgs[i].name;
        }
    }

clickCounter++;
//25 tries max, renders chart afterwards and posts results to aside 
if(clickCounter === 25) {
    localStorage.setItem('allProdImgs', JSON.stringify(allProdImgs)); //goes thru array with all data and stores it in local
    showSaved();
    myChart.width = 200;
    myChart.height = 80;
    imageSection.removeEventListener('click', prodClickHandler);
    document.onclick = "";
    renderChart();
    document.getElementById("results").innerHTML += 'Results:';
    for(var i = 0; i < allProdImgs.length; i++) {
        document.getElementById("results").innerHTML += ' <br> ' + ' *' + allProdImgs[i].name + ' has ' + allProdImgs[i].likes + ' likes';
        }
    }
}

//once any image is clicked the handler fires off
imageSection.addEventListener('click', prodClickHandler);

//this fills the images array with new objects with properties src and name
new ProdImg('./images/bag.jpg', 'r2d2 droid bag');
new ProdImg('./images/banana.jpg', 'banana shaped cutter');
new ProdImg(' ./images/bathroom.jpg', 'ipad-stand tp-perch');
new ProdImg(' ./images/boots.jpg', 'open-toed rain boots');
new ProdImg(' ./images/breakfast.jpg', 'coffee-maker/toaster');
new ProdImg(' ./images/bubblegum.jpg', 'meatball gum');
new ProdImg('./images/chair.jpg', 'comfy chair');
new ProdImg('./images/cthulhu.jpg', 'cthulhu figure');
new ProdImg('./images/dog-duck.jpg', 'dog duck bill');
new ProdImg('./images/dragon.jpg', 'dragon meat');
new ProdImg('./images/pen.jpg', 'utensil pen');
new ProdImg('./images/pet-sweep.jpg', 'dust boots');
new ProdImg('./images/scissors.jpg', 'stencil scissors');
new ProdImg('./images/shark.jpg', 'shark sleeping bag');
new ProdImg('./images/sweep.png', 'dust baby onesie');
new ProdImg('./images/tauntaun.jpg', 'tauntaun sleeping bag');
new ProdImg('./images/unicorn.jpg', 'unicorn meat');
new ProdImg('./images/usb.gif', 'tentacle usb');
new ProdImg('./images/water-can.jpg', 'water can');
new ProdImg('./images/wine-glass.jpg', 'fancy wine glass');

//displays random colors on page
var shuffleColors = function() {
    for(var i in colorChange) {
        rando = Math.floor(Math.random() * colorChange.length);
        document.getElementById("text").style.background = colorChange[rando];
        rando = Math.floor(Math.random() * colorChange.length);
        document.getElementById("background").style.background = colorChange[rando];
        var rando = Math.floor(Math.random() * colorChange.length);
        rando = Math.floor(Math.random() * colorChange.length);
        document.getElementById("results").style.background = colorChange[rando];
    }
}
//when reset button is pressed to refresh page
function refresh() {
    document.getElementById("text").style.background =  'rgb(80, 151, 151)';
    document.getElementById("background").style.backgroundImage = 'url("images/bus.jpg")';
    document.getElementById("results").style.background = 'beige';
}

//===================================================
//Chart JS
//===================================================
var showSaved = function() { //function for displaying saved data
    for(var i in allProdImgs) { //goes over every element in the array and collects names and likes 
        prodNames.push(allProdImgs[i].name);
        prodLikes.push(allProdImgs[i].likes);
    }
}

savedTotal = (JSON.parse(window.localStorage.getItem('allProdImgs')));
    for(var i in savedTotal) { //goes over every element in the array and collects names and likes 
        savedNames.push(savedTotal[i].name);
        savedLikes.push(savedTotal[i].likes);
    }


//render function starts below
//===================================================
var renderChart = function() {   

var chartData = {
    labels: prodNames,
    datasets: [{ //takes in many data sets
    label: 'number of likes' ,
    data: prodLikes, //all array values
    backgroundColor: [
        'red',
        'aqua', 
        'aquamarine', 
        'blue', 
        'blueviolet', 
        'brown', 
        'cadetblue', 
        'chartreuse', 
        'darkblue', 
        'deeppink', 
        'gold', 
        'green', 
        'yellow',
        'brown', 
        'cadetblue', 
        'chartreuse', 
        'darkblue', 
        'deeppink', 
        'gold', 
        'green', 
        'yellow'
    ],
    borderColor: [
        'red',
        'aqua', 
        'aquamarine', 
        'blue', 
        'blueviolet', 
        'brown', 
        'cadetblue', 
        'chartreuse', 
        'darkblue', 
        'deeppink', 
        'gold', 
        'green', 
        'yellow',
        'brown', 
        'cadetblue', 
        'chartreuse', 
        'darkblue', 
        'deeppink', 
        'gold', 
        'green', 
        'yellow'
    ],
    borderWidth: 1
    }]
}; 

var chartOptions = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
            }
        }]
    },
    responsive: true,
}
var barChart = {
    type: 'bar', //type of chart
    data: chartData,
    options: chartOptions,
}
var myChart = new Chart(ctx, barChart);
    
}

new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
      labels: savedNames,
      datasets: [
        {
          label: "Saved Data",
          backgroundColor: ['red', 'aqua', 'aquamarine', 'blue', 'blueviolet', 'brown', 'cadetblue', 'chartreuse', 'darkblue', 'deeppink', 'gold', 'green', 'yellow','red', 'aqua', 'aquamarine', 'blue', 'blueviolet', 'brown', 'cadetblue'],
          data: savedLikes
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Saved Data From LocalStorage'
      }
    }
});





