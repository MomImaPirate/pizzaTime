;(function() {
    if (window.matchMedia('(max-width: 992px)').matches) {
        return;
    }

    var headerPage = document.querySelector('.header-page');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 0) {
            headerPage.classList.add('is-active');
        } else {
            headerPage.classList.remove('is-active');
        }
    });
})();

;(function() {
    var body = document.querySelector('body');
    //необходимо закрывать popup родителя, на случай, если у нас открыто 2 popup
    var closestItemByClass = function(item, className) {
        var node = item;

        while(node) {
            //если содержит className то возврщаем элемент
            if (node.classList.contains(className)) {
                return node;
            }
            
            node = node.parentElement;
        }
        return null;
    };
    //прыгаем с самого нижнего атрибута к родителю и проверяем есть ли у него атрибут popup-menu
    var closestAttr = function(item, attr) {
        var node = item;

        while(node) {
            var attrValue = node.getAttribute(attr);
            if (attrValue) {
                return attrValue;
            }

            node = node.parentElement;
        }
        return null;
    };

    var showPopup = function(target) {
        target.classList.add('is-active');
    };

    var closePopup = function(target) {
        target.classList.remove('is-active');
    };
    //если есть класс no-scroll мы его удаляем и наоборот
    var toggleScroll = function() {
        body.classList.toggle('no-scroll');
    };

    body.addEventListener('click', function(e) {
        var target = e.target;
        // console.log(target);
        var popupClass = closestAttr(target, 'data-popup');

        if (popupClass === null) {
            return;
        }
        //если ничего не происходит - убираем стандартное поведение у элемента
        e.preventDefault();
        //ищем по селектору
        var popup = document.querySelector('.' + popupClass);
        //если показывается popup убираем скролл body
        if (popup) {
            showPopup(popup);
            toggleScroll();
        }
    });
    //выключаем popup при клике на кнопку
    body.addEventListener('click', function(e) {
        var target = e.target;
        //если таргет содержит класс popup__button-close или popup__inner
        if (target.classList.contains('popup-close') || target.classList.contains('popup__inner')) {
            //первым передаем наш элемент, а вторым класс
            var popup = closestItemByClass(target, 'popup-menu');
            closePopup(popup);
            toggleScroll();
        }
    });

    //вешаем обработку по нажатию кнопки esc
    body.addEventListener('keydown', function(e) {
        console.log(e.keyCode);
        //ели код клавиши не соответсвует - ничего не делаем
        if (e.keyCode !== 27) {
            return;
        }
        //находим активный popup и возвращаем скролл
        var popup = document.querySelector('.popup-menu.is-active');
        //и если есть popup
        if (popup) {
            closePopup(popup);
            toggleScroll();
        }
    });
})();

;(function() {
    var closestAttr = function(item, attr) {
        var node = item;

        while(node) {
            var attrValue = node.getAttribute(attr);
            if (attrValue) {
                return attrValue;
            }

            node = node.parentElement;
        }
        return null;
    };

    var scroll = function(target) {
        //от нас до элемента
        var targetTop = target.getBoundingClientRect().top;
        var scrollTop = window.pageYOffset;
        var targetOffsetTop = targetTop + scrollTop;
        var headerOffset = document.querySelector('.header-page').clientHeight;

        window.scrollTo(0, targetOffsetTop - headerOffset + 15);
    }

    var body = document.querySelector('body');
    body.addEventListener('click', function(e) {
        var target = e.target;
        var scrollToItemClass = closestAttr(target, 'data-scroll-to');

        if (scrollToItemClass === null) {
            return;
        }
        e.preventDefault();
        var scrollToItem = document.querySelector('.' + scrollToItemClass);

        if (scrollToItem) {
            scroll(scrollToItem);
        }
    });
})();