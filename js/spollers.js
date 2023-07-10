
const spollersArray = document.querySelectorAll('[data-spollers]');

if(spollersArray.length > 0){
    //Получение обычных спойлеров
    const spollersRegular = Array.from(spollersArray).filter(function(item, index, self){
        return !item.dataset.spollers.split(",")[0];
    });
    //Инициализация обычных спойлеров
    if(spollersRegular.length > 0){
        initSpollers(spollersRegular);
    }

    // Получение спойлеров с медиа запросами
    const spollersMedia = Array.from(spollersArray).filter(function(item, index, self){
        return item.dataset.spollers.split(",")[0];
        
    });
    
    //Инициализация спойлеров с медиа запросами
    if(spollersMedia.length > 0){
        const breakpointsArray = [];
        spollersMedia.forEach(item => {
            const params = item.dataset.spollers // '650,max'
            const breakpoint = {};
            const paramsArray = params.split(",");// [650, max]
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
            breakpoint.item = item;
            breakpointsArray.push(breakpoint)
        });

        //Получаем уникальные брейкпоинты
        let mediaQueries = breakpointsArray.map(function(item){
            return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
        });
        mediaQueries = mediaQueries.filter(function(item, index, self){
            return self.indexOf(item) === index
            
        });
        //Роботаем с каждым брейкпоинтом
        mediaQueries.forEach(breakpoint => {
            const paramsArray = breakpoint.split(",");
            const mediaBreakpoint = paramsArray[1];
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);
        
            //Обьекты с нужными условиями
            const spollersArray = breakpointsArray.filter(function(item){
                if (item.value === mediaBreakpoint && item.type === mediaType){
                    return true;
                }
               
            });
            // Событие
            matchMedia.addEventListener("change", function() {
                initSpollers(spollersArray, matchMedia);
            });
            initSpollers(spollersArray, matchMedia);
        });
    }
    // Инициализация
    function initSpollers(spollersArray, matchMedia = false){
        spollersArray.forEach(spollersBlock => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
            if (matchMedia.matches || !matchMedia){
                spollersBlock.classList.add('_init');
                initSpollersBody(spollersBlock);
                spollersBlock.addEventListener("click", setSpollerAction)
            } else{
                spollersBlock.classList.remove('_init');
                initSpollersBody(spollersBlock, false);
                spollersBlock.removeEventListener("click", setSpollerAction)
            }
        });
        
        
    }
    // Работа с контентом
    function initSpollersBody(spollersBlock, hideSpollerBody = true) {
        const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
        if (spollerTitles.length > 0 ) {
            spollerTitles.forEach(spollerTitle => {
                if (hideSpollerBody){
                    spollerTitle.removeAttribute('tabindex');
                    if (!spollerTitle.classList.contains('_spoller-active')) {
                        spollerTitle.nextElementSibling.hidden = true;
                    }    
                } else {
                        spollerTitle.setAttribute('tabindex', '-1');
                        spollerTitle.nextElementSibling.hidden = false;
                }
            });
            
        }

    }
    
    function setSpollerAction(e) {
        const el = e.target;
        if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
            const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
            const spollersBlock = spollerTitle.closest('[data-spollers]');
            const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
            if (!spollersBlock.querySelectorAll('._slide').length) {
                if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) {
                    hideSpollersBody(spollersBlock);
                }
                spollerTitle.classList.toggle('_spoller-active');
                _slideToggle(spollerTitle.nextElementSibling, 500);
               
            }
            e.preventDefault();
        }
    }
    function hideSpollersBody(spollersBlock) {
        const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._spoller-active');
        if (spollerActiveTitle) {
            spollerActiveTitle.classList.remove('_spoller-active');
            _slideUp(spollerActiveTitle.nextElementSibling, 500);
            
        }
    }

    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = duration + 'ms';
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout(() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty('height') : null;
                target.style.removeProperty('padding-top');
                target.style.removeProperty('padding-bottom');
                target.style.removeProperty('margin-top');
                target.style.removeProperty('margin-bottom');
                !showmore ? target.style.removeProperty('overflow') : null;
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.classList.remove('_slide');
            }, duration);
        }
    }
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty('height') : null;
            let height = target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + 'ms';
            target.style.height = height + 'px';
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            window.setTimeout(() => {
                target.style.removeProperty('height');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.classList.remove('_slide');
            }, duration);
        }
    }
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) {
            return _slideDown(target, duration);
        } else {
            return _slideUp(target, duration);
        }
    }
    
}

// https://www.youtube.com/watch?v=0fg9bZcL1RM&t=109s
        