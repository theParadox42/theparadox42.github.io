function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var body = document.querySelector("body");
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    body.appendChild(script);
};
function doneLoading(){
    var $nav = $('#navbar');
    $nav.load("/html-templates/navcontents.html");
    if(active){
        console.log($("#"+active));
        var $active = $("#"+active).addClass("active");
        $active.addClass("active");
        $active.children()
    }
};
function loadBootstrap(){
    loadScript("/assets/libraries/bootstrap/js/bootstrap.min.js",doneLoading);
};
function loadPopper() {
    loadScript("/assets/libraries/popper.min.js", loadBootstrap)
};
loadScript("/assets/libraries/jquery-3.4.0.min.js", loadPopper);
