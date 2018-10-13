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

//====================================================
var allProdImgs = [];
var currentImgs = [];

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
        } while(randomNumberLeft === allProdImgs[randomNumberLeft] || randomNumberLeft === allProdImgs[randomNumberCenter] || randomNumberLeft === allProdImgs[randomNumberRight]  || randomNumberCenter === allProdImgs[randomNumberCenter] || randomNumberCenter === allProdImgs[randomNumberLeft] || randomNumberCenter === allProdImgs[randomNumberRight] || randomNumberRight === allProdImgs[randomNumberRight] || randomNumberRight === allProdImgs[randomNumberLeft] || randomNumberLeft === allProdImgs[randomNumberCenter]);
      
    if(event.target.id === 'left') {
        allProdImgs[randomNumberLeft].likes++; 
        
    } else if(event.target.id === 'center') {
        allProdImgs[randomNumberCenter].likes++;

    } else {
    allProdImgs[randomNumberRight].likes++;
    }
}
clickCounter++;

if(clickCounter === 25) {
    renderChart();
    imageSection.removeEventListener('click', prodClickHandler);
    for(var i = 0; i < allProdImgs.length; i++) {
        document.getElementById("results").innerHTML += '<br>Results: ' + allProdImgs[i].name + ' has ' + allProdImgs[i].likes + ' likes';
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

if(document.getElementById("left").src === document.getElementById("center").src || document.getElementById("left").src === document.getElementById("right").src || document.getElementById("center").src === document.getElementById("right").src) {
    
    document.getElementById("left").src = allProdImgs[0].src;
    document.getElementById("center").src = allProdImgs[1].src;
    document.getElementById("right").src = allProdImgs[2].src;
}

//event.target.src = 
event.target.src = allProdImgs[randomNumberLeft].src;
event.target.src = allProdImgs[randomNumberCenter].src;
event.target.src = allProdImgs[randomNumberRight].src;

}

imageSection.addEventListener('click', prodClickHandler);


new ProdImg('./img/bag.jpg', 'droid bag');
new ProdImg('./img/banana.jpg', 'banana cutter');
new ProdImg(' ./img/bathroom.jpg', 'ipad stand');
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
        colors.push('red');

    }console.log(prodLikes);

var chartData = {
    labels: prodNames,
    datasets: [{ //takes in many data sets
    label: '# of likes' ,
    data: prodLikes, //all array values
    backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
    ],
    borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
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
