const endPointURL = './event-handler';

function postRequest(endpoint, dataObject, successCallback, errorCallback) {
    $.ajax({
        type: "POST",
        dataType: 'json',
        url: endpoint,
        data: dataObject,
        success: function(result) {
            if(result.error_code=='200'){
                successCallback(result);
            } else {
                errorCallback();
            }
        },
        error: function(){
            errorCallback();
        }
    });
}