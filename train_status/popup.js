/**
 * Performs an XMLHttpRequest to Train Enquiry to get running status
 *
 * @param callback Function If the response from fetching url has a
 *     HTTP status of 200, this function is called with a JSON decoded
 *     response.  Otherwise, this function is called with null.
 * @param params String The url encoded parameters
 */
function fetchData(callback, params) {
    var url = 'http://www.trainenquiry.com/RunningIslTrSt.aspx?' + params;
    url = 'http://localhost/work/train/trainenquiry.html?' + params; // For development only
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(data) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText);
            } else {
                callback(null);
            }
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
};

/**
 * Parses response from Train Enquiry and displays the required running
 * status
 *
 * @param data Object Response recieved from the server. Null if the
 *      request failed.
 */
function parseStatus(data) {
    $('#running-status').hide();
    if(data) {
        var result = $('#Table3', $(data))
        $('#result').html(result);
    } else {
        $('#result').html('<b>Some error occured while processing the request.</b>');
    }
};

/**
 * Click handler for the submit button. It validates the params entered
 * and calls fetchData with those.
 *
 */
function RunningStatus() {
    var inputs = ['tr','st','dt'], data = {};
    $.each(inputs, function (k, v) { data[v] = $(':input[name='+v+']').val(); });
    var params = $.param(data);
    fetchData(parseStatus, params);
};

