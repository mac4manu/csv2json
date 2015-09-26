(function() {
	require("../css/style.css");
    var main = require("./content.js");
    var ele = document.getElementById("filename");
    ele.addEventListener("change", convertToJson, false);

    function convertToJson(element) {
        var jsonData = main.readFile(element);
    }
})();
