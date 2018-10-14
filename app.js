'use strict';

//global variables for images in html
//tie images to events
var ProdImgLeft = document.getElementById('left');
var ProdImgCenter = document.getElementById('center');
var ProdImgRight = document.getElementById('right');
var imageSection = document.getElementById('select-boxes');

// counter for all of our select
var clickCounter = 0;
//retrieves html element for display
var ctx = document.getElementById("myChart").getContext('2d');
var colorChange = ['red', 'aqua', 'aquamarine', 'blue', 'blueviolet', 'brown', 'cadetblue', 'chartreuse', 'darkblue', 'deeppink', 'gold', 'green', 'yellow']
//====================================================
var allProdImgs = [];
var pastImgs = [];

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
    prodImgLeft.src = this.src;
};

//event listeners and handlers
var prodClickHandler = function(event) {
    if(event.target.id === 'left' || event.target.id === 'center' || event.target.id === 'right') {

        do {
            var randomNumberLeft = Math.floor(Math.random() * allProdImgs.length)
            var randomNumberCenter = Math.floor(Math.random() * allProdImgs.length)
            var randomNumberRight = Math.floor(Math.random() * allProdImgs.length)
          
            pastImgs.push(randomNumberLeft); //stores random numbers to compare new numbers to old
            
        } while(randomNumberLeft === pastImgs[randomNumberLeft] || randomNumberLeft === pastImgs[randomNumberCenter] || randomNumberLeft === pastImgs[randomNumberRight]  || randomNumberCenter === pastImgs[randomNumberCenter] || randomNumberCenter === pastImgs[randomNumberLeft] || randomNumberCenter === pastImgs[randomNumberRight] || randomNumberRight === pastImgs[randomNumberRight] || randomNumberRight === pastImgs[randomNumberLeft] || randomNumberLeft === pastImgs[randomNumberCenter]);

        if(event.target.id === 'left') {
            allProdImgs[randomNumberLeft].likes++;
            
        } else if(event.target.id === 'center') {
            allProdImgs[randomNumberCenter].likes++;

        } else {
        allProdImgs[randomNumberRight].likes++;
    }
}
clickCounter++;
//25 tries max
if(clickCounter === 25) {
    myChart.width = 200;
    myChart.height = 60;
    console.log(myChart);
    renderChart();
    imageSection.removeEventListener('click', prodClickHandler);
    document.getElementById("results").innerHTML += 'Results:';
    for(var i = 0; i < allProdImgs.length; i++) {
        document.getElementById("results").innerHTML += ' <br> ' + ' *' + allProdImgs[i].name + ' has ' + allProdImgs[i].likes + ' likes';
    }
}

//all three images appeared on screen 
allProdImgs[randomNumberLeft].appeared++;
allProdImgs[randomNumberCenter].appeared++;
allProdImgs[randomNumberRight].appeared++;

document.getElementById("left").src = allProdImgs[randomNumberLeft].src;
document.getElementById("nameA").textContent = allProdImgs[randomNumberLeft].name;

document.getElementById("center").src = allProdImgs[randomNumberCenter].src;
document.getElementById("nameB").textContent = allProdImgs[randomNumberCenter].name;

document.getElementById("right").src = allProdImgs[randomNumberRight].src;
document.getElementById("nameC").textContent = allProdImgs[randomNumberRight].name;

//to avoid duplicate images displayed
var i = 0;
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

imageSection.addEventListener('click', prodClickHandler);

//this fills the images array with new objects with properties src and name
new ProdImg('./img/bag.jpg', 'droid bag');
new ProdImg('./img/banana.jpg', 'banana cutter');
new ProdImg(' ./img/bathroom.jpg', 'ipad stand');
new ProdImg(' ./img/boots.jpg', 'rain boots');
new ProdImg(' ./img/breakfast.jpg', 'coffee-maker/toaster');
new ProdImg(' ./img/bubblegum.jpg', 'meatball gum');
new ProdImg('./img/chair.jpg', 'chair');
new ProdImg('./img/cthulhu.jpg', 'cthulhu figure');
new ProdImg('./img/dog-duck.jpg', 'dog duck bill');
new ProdImg('./img/dragon.jpg', 'dragon meat');
new ProdImg('./img/pen.jpg', 'pen');
new ProdImg('./img/pet-sweep.jpg', 'dust boots');
new ProdImg('./img/scissors.jpg', 'scissors');
new ProdImg('./img/shark.jpg', 'shark sleeping bag');
new ProdImg('./img/sweep.png', 'dust baby onesie');
new ProdImg('./img/tauntaun.jpg', 'tauntaun sleeping bag');
new ProdImg('./img/unicorn.jpg', 'unicorn meat');
new ProdImg('./img/usb.gif', 'tentacle usb');
new ProdImg('./img/water-can.jpg', 'water can');
new ProdImg('./img/wine-glass.jpg', 'wine glass');

var shuffleColors = function() {
    for(var i in colorChange) {
        var rando = Math.floor(Math.random() * colorChange.length);
        document.getElementById("tabs").style.background = colorChange[rando];
        rando = Math.floor(Math.random() * colorChange.length);
        document.getElementById("select-boxes").style.background = colorChange[rando];
        rando = Math.floor(Math.random() * colorChange.length);
        document.getElementById("results").style.background = colorChange[rando];
        rando = Math.floor(Math.random() * colorChange.length);
        document.getElementById("text").style.background = colorChange[rando];
        rando = Math.floor(Math.random() * colorChange.length);
        document.getElementById("background").style.background = colorChange[rando];
    }
}

function refresh() {
    location.reload();
}

//===================================================
//Chart JS
//===================================================
var renderChart = function() {
var prodNames = [];
var prodLikes = [];
var colors = [];
    
    for(var i in allProdImgs) { //goes over every element in the array and collects names and likes and gives them color
        prodNames.push(allProdImgs[i].name);
        prodLikes.push(allProdImgs[i].likes);
        //colors.push('red');
    }

var chartData = {
    labels: prodNames,
    datasets: [{ //takes in many data sets
    label: '# of likes' ,
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
//change bar color randomly every 10 seconds
// var myVar = setInterval(renderChart, 10000);

// var shuffle = function() {
//     for(var i in colorChange) {
//     var rando = Math.floor(Math.random() * colorChange.length);
//     chartData.datasets[0].backgroundColor.splice(rando, 1);
//     chartData.datasets[0].backgroundColor.push(colorChange[rando]);
//     }
// } 

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

