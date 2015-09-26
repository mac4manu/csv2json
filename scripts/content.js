"use strict";
var beautify = require("js-beautify").js_beautify;
module.exports = (function() {
    var reader = new FileReader(),
        str_data = "",
        jsonFile = null,
        jsonData = '{"data":[';

    function replaceAt(index, character) {
        return str_data.substr(0, index) + character + str_data.substr(index + 1);
    };

    function makeJSONFile(jsonData) {
        var data = new Blob([jsonData], {
            type: 'application/json'
        });
        window.URL = window.URL || window.webkitURL;
        if (jsonFile !== null) {
            window.URL = window.URL.revokeObjectURL(jsonFile);
        }
        jsonFile = window.URL.createObjectURL(data);
        return jsonFile;
    };
    return {
        readFile: function(element) {
            reader.onload = function(element) {
                var csvval = element.target.result.split("\n"),
                    data_length = csvval.length,
                    header = csvval[0].split(",");
                for (var i = 0; i < data_length; i++) {
                    if (i > 0) {
                        str_data += "{";
                        var rows = csvval[i].split(",");
                        for (var j = 0; j < header.length; j++) {
                            str_data += '"' + header[j].trim() + '":"' + rows[j].trim() + '"';
                            str_data += ',';
                        }
                        str_data = replaceAt(str_data.lastIndexOf(","), "},");

                    }
                }
                str_data = replaceAt(str_data.lastIndexOf(","), "");
                jsonData += str_data;
                jsonData += ']}';
                return false;
            }
            reader.onloadend = function() {
                jsonData = beautify(jsonData, {
                    indent_size: 4
                });
                document.getElementById("filecontent").innerText = jsonData
                var link = document.getElementById('download_link');
                link.href = makeJSONFile(jsonData);
                link.style.display = 'inline-block';
                return jsonData;
            }
            if (element.target.files[0].type === "text/csv") {
                reader.readAsText(element.target.files.item(0));
            } else {
                alert("Please upload csv");
                return false;
            }
            return jsonData;
        }
    };
})();
