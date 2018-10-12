'use strict';

//global variables for images in html
//tie images to events
var prodImgLeft = document.getElementById('image-a');
var prodImgCenter = document.getElementById('image-b');
var prodImgRight = document.getElementById('image-c');
var prodImgLeftArrayIndex = 0;
// counter for all of our select
var selectCounter = 0;

//====================================================
var allProdImgs = [];

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
var prodSelectHandler = function(eventObject) {
    do {
        var randomNumber = Math.floor(Math.random() * allProdImgs.length)
    } while(randomNumber === prodImgLeftArrayIndex);

    allProdImgs[prodImgLeftArrayIndex].likes++;
    allProdImgs[prodImgLeftArrayIndex].appeared++;

    prodImgLeftArrayIndex = randomNumber;
    eventObject.target.src = allProdImgs[randomNumber].src;
}

prodImgLeft.addEventListener()