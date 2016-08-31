'use strict';

var imagePaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg',
'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var images = [];
var currentImageIndices = [0, 1, 2];

for(var i = 0; i < imagePaths.length; i++){
  var path = imagePaths[i];
  var name = imagePaths[i].split('.')[0];
  new Image(name, path);
}
// console.log(images);

var imageList = document.getElementById('images');

imageList.addEventListener('click', clickHandler);

drawImage(0);
drawImage(1);
drawImage(2);

function clickHandler(event){
  var imageClick = event.target;
  var imageClick1 = imageClick.getAttribute('src');
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
  while (firstRandomIndex === secondRandomIndex){
    secondRandomIndex = Math.floor(Math.random() * images.length);
  }
  var thirdRandomIndex = Math.floor(Math.random() * images.length);
  while (thirdRandomIndex === firstRandomIndex || thirdRandomIndex === secondRandomIndex){
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

var label = [];
for( var m = 0; m < images.length; m++){
  label.push(images[m].name);
}

function clickData1(){
  var clickData = [];
  for ( var n = 0; n < images.length; n++){
    clickData.push(images[n].clicks);
    console.log(clickData1);
  }return clickData();
}

var ctx = document.getElementById('my_chart');

var myChart = new Chart(ctx,{
  type: 'bar',
  data: {
    labels: label,
    datasets: [{
      label: 'Number of Clicks',
      data: clickData,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
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
