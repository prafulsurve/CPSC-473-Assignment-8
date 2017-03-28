(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });

            console.log(data);
            fn(data)
            .then(function () {
                this.reset();
                this.elements[0].focus();
            }.bind(this));
        });
    };

    FormHandler.prototype.addInputHandler = function (fn) {
        this.$formElement.on('input', '[name="emailAddress"]', function (event) {
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
        });
    };

    FormHandler.prototype.addAfterInputHandler = function (fn, remoteDS) {
        this.$formElement.on('blur', '[name="emailAddress"]', function (event) {
            var emailAddress = event.target.value;
            var message = '';
            fn(emailAddress, remoteDS)
            .then(function () {
                if (App.validEmail) {
                    event.target.setCustomValidity('');
                } else {
                    message = 'Order with Email- ' + emailAddress + ' is already available!';
                    console.log(message);
                    event.target.setCustomValidity(message);
                }
            });
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
