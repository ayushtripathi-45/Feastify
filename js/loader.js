

(function () {

    function hideLoader() {

        var loader = document.getElementById("preloader");
        if (!loader || loader.dataset.hidden) return;
        loader.dataset.hidden = "1";
        loader.classList.add("preloader-hide");
        setTimeout(function () {
            if (loader && loader.parentNode) loader.remove();
        }, 1000);
    }

    window.addEventListener("load", function () {
        setTimeout(hideLoader, 1600);
    });

    
    document.addEventListener("DOMContentLoaded", function () {
        setTimeout(hideLoader, 4000);
    });

    
    setTimeout(hideLoader, 6000);

})();
