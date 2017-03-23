(function(window) {
    'use strict';
    var App = window.App || {};

    var Validation = {
        isCompanyEmail: function(email) {
            return /.+@bignerdranch\.com$/.test(email);
        },
        isValidEmail: function(email, remoteDS) {
            remoteDS.get(email, function (serverResponse) {
                console.log(serverResponse);
                if (serverResponse === null) {
                    return true;
                } else {
                    return false;
                }
            });
            /*if(res.emailAddress === email) {
                return false;
            } else {
                return true;
            }*/
        }
    };
    App.Validation = Validation;
    window.App = App;
})(window);
