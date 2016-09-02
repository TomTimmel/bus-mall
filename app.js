'use strict';

var imagePaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg',
'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var images = [];
var currentImageIndices = [0, 1, 2];
var totalClicks = 0;

for(var i = 0; i < imagePaths.length; i++){
  var path = imagePaths[i];
  var name = imagePaths[i].split('.')[0];
  new Image(name, path);
}

if (localStorage.length !== 0){
  var imagesValue = localStorage.getItem('images');
  var imagesValue1 = JSON.parse(imagesValue);
  images = imagesValue1;
}

var imageList = document.getElementById('images');

imageList.addEventListener('click', clickHandler);

drawImage(0);
drawImage(1);
drawImage(2);

function clickHandler(event){
  var imageClick = event.target;
  var imageClick1 = imageClick.getAttribute('src');
  if (totalClicks >= 25) {
    var chartButton = document.getElementById('show_chart');
    chartButton.setAttribute('class', '');
    return;
  }
  if (!imageClick1){
    alert('Please click and actual photo...');
    return;
  }
  totalClicks += 1;

  var arrayOfRandomIndices = randomIndices();
  // console.log(imageClick, typeof imageClick);

  for (var k = 0; k < currentImageIndices.length; k++){
    var currentIndex = currentImageIndices[k];
    var displayedObject = images[currentIndex];
    displayedObject.views += 1;
  }
  // console.log(imageClick1);
  for (var j = 0; j < images.length; j++){
    // console.log(images[j].path === imageClick1);
    if(images[j].path === imageClick1){
      images[j].clicks += 1;
    }
  }

  currentImageIndices = arrayOfRandomIndices;
  imageList.textContent = '';
  drawImage(arrayOfRandomIndices[0]);
  drawImage(arrayOfRandomIndices[1]);
  drawImage(arrayOfRandomIndices[2]);
  // console.log(images);
}

function randomIndices(){
  var firstRandomIndex = Math.floor(Math.random() * images.length);
  var secondRandomIndex = Math.floor(Math.random() * images.length);
  while (currentImageIndices.indexOf(firstRandomIndex) !== -1) {
    firstRandomIndex = Math.floor(Math.random() * images.length);
  }
  while (firstRandomIndex === secondRandomIndex || currentImageIndices.indexOf(secondRandomIndex) !== -1){
    secondRandomIndex = Math.floor(Math.random() * images.length);
  }
  var thirdRandomIndex = Math.floor(Math.random() * images.length);
  while (thirdRandomIndex === firstRandomIndex || thirdRandomIndex === secondRandomIndex || currentImageIndices.indexOf(thirdRandomIndex) !== -1){
    thirdRandomIndex = Math.floor(Math.random() * images.length);
  }
  return [firstRandomIndex, secondRandomIndex, thirdRandomIndex];
}
function drawImage(index) {
  var img = document.createElement('img');
  var li = document.createElement('li');
  var imageList = document.getElementById('images');
  var randomPath = images[index].path;

  img.setAttribute('src', randomPath);

  li.appendChild(img);
  imageList.appendChild(li);
}


function Image(name, path) {
  this.views = 0;
  this.clicks = 0;
  this.name = name;
  this.path = 'imgs/' + path;

  images.push(this);
}

var chartbutton = document.getElementById('show_chart');
chartbutton.addEventListener('click', chartClickHandler);

var chartClicked = false;

function chartClickHandler(){
  if (chartClicked) return;

  chartClicked = true;

  var label = [];
  var chartClicks = [];
  var imageViews = [];
  var viewPercentage = [];

  for( var m = 0; m < images.length; m++){
    label.push(images[m].name);
    chartClicks.push(images[m].clicks);
    imageViews.push(images[m].views);
    viewPercentage.push(Math.round((chartClicks[m] / imageViews[m]) * 100));
    console.log(viewPercentage);
  }
  JSON.stringify(images);
  var jsonImages = JSON.stringify(images);
  localStorage.setItem('images', jsonImages);

  var ctx = document.getElementById('my_chart');

  var myChart = new Chart(ctx,{
    type: 'bar',
    data: {
      labels: label,
      datasets: [{
        label: 'Number of Image Clicks',
        data: chartClicks,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
  var ctx1 = document.getElementById('my_chart1');

  var myChartViews = new Chart(ctx1,{
    type: 'bar',
    data: {
      labels: label,
      datasets: [{
        label: 'Percentage of Clicks to Image Views',
        data: viewPercentage,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}
