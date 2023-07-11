// popup

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

const videoYoutube = document.querySelector(".youtube-video")
const popupdisplayed = sessionStorage.getItem('popupdisplayed');




let unlock  = true;

const timeout = 800;


if(popupdisplayed === null){
  let popupName = 'popup'
  const curentPopup = document.getElementById(popupName);
  popupOpen(curentPopup)
  sessionStorage.setItem('popupdisplayed', true);
}


if (popupLinks.length > 0){
  for (let index = 0; index < popupLinks.length; index++){
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function(e){
      const popupName = popupLink.getAttribute('href').replace('#','');
      console.log(popupName);
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0){
  for (let index = 0; index < popupCloseIcon.length; index++){
    const el = popupCloseIcon[index];
    el.addEventListener('click', function (e){
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  }
}

function popupOpen(curentPopup){
  console.log(curentPopup);
  if (curentPopup && unlock){
    const popupActive = document.querySelector('.popup.open');
    if (popupActive){
      popupClose(popupActive, false);
    }else{
      bodyLock();
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener("click", function (e){
      if (!e.target.closest('.popup__content')){
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true){
  if (unlock){
    let videoSrc = videoYoutube.src
    videoYoutube.src=videoSrc
    popupActive.classList.remove('open');
    if (doUnlock){
      bodyUnLock();
    }
  }
}

function bodyLock(){
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
  
  for (let index = 0; index < lockPadding.length; index++){
    const el = lockPadding[index];
    el.style.paddingRight = lockPaddingValue;
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('_lock');

  unlock = false;
  setTimeout(function (){
    unlock = true;
  }, timeout);
}


function bodyUnLock (){
  setTimeout(function (){
    if (lockPadding.length > 0){
      for (let index = 0; index < lockPadding.length; index++){
        const e1 = lockPadding[index];
        e1.style.paddingRight = '0px';
      }
    }
    body.style.paddingRight = '0px';
    body.classList.remove('_lock');
  }, timeout);

  unlock = false;
  setTimeout(function (){
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function (e){
  if (e.which === 27){
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});
