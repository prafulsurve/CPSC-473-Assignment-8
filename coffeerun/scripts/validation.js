(function(window) {
    'use strict';
    var App = window.App || {};
    var validEmail = App.validEmail;

    var Validation = {
        isCompanyEmail: function(email) {
            return /.+@bignerdranch\.com$/.test(email);
        },
        isValidEmail: function(email, remoteDS) {
            App.validEmail = true;
            return remoteDS.get(email, function (serverResponse) {
                if (serverResponse === null) {
                    App.validEmail = true;
                }
                else {
                    if (serverResponse.emailAddress === email) {
                        App.validEmail = false;
                    }
                }
            });
        }
    };
    App.Validation = Validation;
    App.validEmail = validEmail;
    window.App = App;
})(window);
