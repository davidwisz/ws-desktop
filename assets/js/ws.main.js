window.onload = function() {

  /* GET CAROUSEL ARROWS AND ASSIGN THEM A CLICK HANDLER */
  const arrows = document.querySelectorAll('.carousel-arrow');
  Array.prototype.forEach.call(arrows, function(arrow) {
    arrow.addEventListener('click', ws.handleArrowClick);
  });

  /* CALL FUNCTION TO BEGIN KIDS SECTION PHOTO ROTATION */
  ws.cyclePhotos();
  
}

const ws = {

  /* BEGIN CAROUSEL FUNCTIONS */

  handleArrowClick: function(event) {
    let thisArrow = event.target;
    if (thisArrow.classList.contains('disabled')) {
      return false;
    }
    else {
      ws.slideTheCarousel(thisArrow.getAttribute('data-direction'))
    }
  },

  slideTheCarousel: function(direction) {
    let slideEl = document.getElementById('slides');
    let pos = ws.getSlidePosition(slideEl);
    let contentWidth = ws.getContentWidth();
    // 902 is the width of the viewer
    let xVal = pos - 902;
    if (direction === 'left') {
      if (pos >= 0 || pos === undefined) {
        return false;
      }
      else {
        xVal = pos + 902;
      }
    }
    else {

    }
    slideEl.style.transform = 'translateX(' + xVal + 'px)';
    ws.updateButtons(xVal);
  },

  getSlidePosition: function(slideEl) {
    let style = window.getComputedStyle(slideEl);
    let matrix = new WebKitCSSMatrix(style.transform);
    return matrix.m41;
  },

  getContentWidth: function() {
    let slides = document.querySelectorAll('#slides .slide');
    let contentWidth = slides.length * 295;
    return contentWidth;
  },

  updateButtons: function(xVal) {
    let contentWidth = ws.getContentWidth();
    let leftButton = document.querySelector('.left .carousel-arrow');
    let rightButton = document.querySelector('.right .carousel-arrow');
    
    if (xVal < 0) {
      // enable left button if carousel has been scrolled
      leftButton.classList.remove('disabled');
      if ((xVal * -1) >= contentWidth - 902) {
        // disable right button if scrolling has reached end of content
        rightButton.classList.add('disabled');
      }
      else {
        // otherwise, enable the right button
        rightButton.classList.remove('disabled');
      }
    }
    else {
      // if carousel has not been scrolled or is back at zero, disable the left button...
      leftButton.classList.add('disabled');
      // ...and enable the right button
      rightButton.classList.remove('disabled');
    }

  },

  /* END CAROUSEL FUNCTIONS */

  /* BEGIN PHOTO ROTATION FUNCTIONS */

    cyclePhotos: function() {
      let photos = document.querySelectorAll('.kids-photo');
      let photoCount = 1;
      setInterval(function(){
        let currentPhoto = ws.selectPhoto(photoCount);
        if (photoCount === photos.length) {
          photoCount = 1;
        }
        else {
          photoCount++;
        }
        // hide currently displayed photo
        currentPhoto.classList.add('hide');
        // show next photo
        let nextPhoto = ws.selectPhoto(photoCount);
        nextPhoto.classList.remove('hide');

      }, 5000);
    },

    selectPhoto: function(num) {
      return document.querySelector('.photo-' + num);
    }

  /* END PHOTO ROTATION FUNCTIONS */
}