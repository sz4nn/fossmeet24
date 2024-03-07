

var originalFontSize = 90;
var originalTopPosition = 35;
var backgroundChanged = false; 
var isVisible = true; 

var scrollCn = function (quantity) {
  var scrollTop = window.pageYOffset || document.scrollTop || 0;
  var newSize = originalFontSize - scrollTop / quantity;
  var newPosition = originalTopPosition - scrollTop / 2;

  if (newSize <= 50) newSize = 50;
  if (newPosition <= 0) newPosition = 0;

  document.querySelector('.centered-text').style.fontSize = newSize + 'px';
  document.querySelector('.centered-text').style.top = newPosition + '%';

  
  var backgroundColor = calculateBackgroundColor(newSize);
  document.body.style.backgroundColor = backgroundColor;

  
  if (backgroundColor === 'rgba(255, 255, 255, 1)') {
    backgroundChanged = true;
  } else {
    backgroundChanged = false;
  }

 
  toggleFossMeetVisibility();

  
  toggleHiddenElements();
};

function toggleFossMeetVisibility() {
  const fossMeetElement = document.querySelector('.centered-text');
  if (backgroundChanged && isVisible) {
  
    fossMeetElement.style.opacity = 0;
    isVisible = false; 
  } else if (!backgroundChanged && !isVisible) {
    
    fossMeetElement.style.opacity = 1;
    isVisible = true; 
  }
}

function toggleHiddenElements() {
  const hiddenElements = document.querySelectorAll('.hidden');
  if (backgroundChanged && !isVisible) {
   
    hiddenElements.forEach((el) => (el.style.opacity = 1));
  } else if (!backgroundChanged && isVisible) {
   
    hiddenElements.forEach((el) => (el.style.opacity = 0));
  }
}

window.addEventListener('scroll', function () {
  scrollCn(10);
});



window.addEventListener('scroll', function () {
  var scrollTop = window.pageYOffset || document.scrollTop || 0;
  if (scrollTop <= 0) {
    document.querySelector('.centered-text').style.fontSize = originalFontSize + 'px';
    document.querySelector('.centered-text').style.top = originalTopPosition + '%';
    document.body.style.backgroundColor = '';
    backgroundChanged = false; 
    toggleHiddenElements(); 
  }
});

function calculateBackgroundColor(fontSize) {
  var darkness = Math.min((originalFontSize - fontSize) / 40, 1);
  var startColor = [84, 81, 76] 
  var endColor = [255, 255, 255]; 
  var interpolatedColor = startColor.map((start, i) => Math.round(start + (endColor[i] - start) * darkness));
  return `rgba(${interpolatedColor[0]}, ${interpolatedColor[1]}, ${interpolatedColor[2]}, 1)`;
}
