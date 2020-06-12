$(function () {

    var subMenuItems = $('[data-menu-item-has-submenu]');

    function clearMenuTimer(menuTimer) {
        if (menuTimer) {
            clearTimeout(menuTimer);
            menuTimer = null;
        }
    }

    function delayedOpenSubMenu(menuItem, force) {
        clearMenuTimer(getItemTimer(menuItem, 'close'));
        clearMenuTimer(getItemTimer(menuItem, 'open'));
        if (!force) {
            setItemTimer(menuItem, 'open', setTimeout(function () {
                openSubMenu(menuItem);
            }, 200));
        } else {
            openSubMenu(menuItem);
        }
    }

    function delayedCloseSubMenu(menuItem, force) {
        clearMenuTimer(getItemTimer(menuItem, 'close'));
        clearMenuTimer(getItemTimer(menuItem, 'open'));
        if (!force) {
            setItemTimer(menuItem, 'close', setTimeout(function () {
                closeSubMenu(menuItem);
            }, 1000));
        } else {
            closeSubMenu(menuItem);
        }


    }

    function openSubMenu(menuItem) {
        menuItem.addClass('hover');
        subMenuItems.each(function () {
            if (menuItem[0] !== this) {
                delayedCloseSubMenu($(this), true);
            }
        });
    }

    function closeSubMenu(menuItem) {
        menuItem.removeClass('hover');
    }

    function getItemTimer(menuItem, code) {
        return menuItem.data('timer-' + code);
    }

    function setItemTimer(menuItem, code, timer) {
        return menuItem.data('timer-' + code, timer);
    }

    subMenuItems
        .on('mouseenter', function () {
            console.log(this);
            console.log($(this));
            delayedOpenSubMenu($(this));
        })
        .on('mouseleave', function () {
            //closeSubMenu($(this));
            delayedCloseSubMenu($(this));
        });

    function closeAll (){
        subMenuItems.each(function () {
            delayedCloseSubMenu($(this), true);
        });
    }
    $(document).on('keydown', function (event) {
        if (event.which === 27) {
            closeAll();
        }
    });
});
