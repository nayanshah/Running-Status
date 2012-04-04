/**
 * Performs an XMLHttpRequest (AJAX)
 *
 * @param callback Function If the response from fetching url has a
 *     HTTP status of 200, this function is called with response text.
 *     Otherwise, this function is called with null.
 * @param url String The url encoded parameters
 * @param type String Type of request : GET or POST. Default is GET.
 */
function ajax(callback, url, type) {
    var xhr = new XMLHttpRequest(),
        type = type || 'GET';

    xhr.onreadystatechange = function(data) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText);
            } else {
                callback(null);
            }
        }
    }
    xhr.open(type, url, true);
    xhr.send();
};

/**
 * Parses response an HTML string and returns a Document Fragment
 *
 * @param HTMLString String The string of HTML to be parsed.
 */
function parseHTML(HTMLString) {
    var range = document.createRange();
    range.selectNode(document.body);

    // Parse the html string
    // Not sure if its part of DOM spec but works.
    var parsedHTML = range.createContextualFragment(HTMLString);

    return parsedHTML;
};

/**
 * Show the running status
 *
 * @param data Object Response recieved from the server. Null if the
 *      request failed.
 */
function showStatus(data) {
    var result = document.getElementById('result');

    if(data) {
        var status = parseHTML(data).querySelector('#Table3');
        result.appendChild(status);
    } else {
        result = document.getElementById('error');
    }

    // Show status and hide the form
    result.classList.remove('hidden');
    document.getElementById('running-status').classList.add('hidden');
};

/**
 * Click handler for the submit button. It validates the params entered
 * and calls fetchData with those.
 *
 */
function getRunningStatus() {
    var inputs = document.getElementsByClassName('inp'), params = [];

    // TODO add validation logic
    for(var i = 0; i<inputs.length; i++) {
        var inp = inputs[i],
            str = inp.name + '=' + inp.value;
        params.push(str);
    }

    var url = 'http://www.trainenquiry.com/RunningIslTrSt.aspx?' + params.join('&');
    ajax(showStatus, url);
};
