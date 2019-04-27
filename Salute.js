;(function(obj_global, $) {

    var Salute = function(str_first_name, str_last_name, str_title, str_language) {
        return new Salute.init(str_first_name, str_last_name, str_title, str_language);
    }

    var obj_supported_langs = ['en', 'fi'];

    var obj_informal_greetings = {
        en: 'Hello',
        fi: 'Moi'
    };

    var obj_formal_greetings = {
        en: 'Greetings',
        fi: 'Terve'
    };


    var obj_log_messages = {
        en: 'Logged in',
        fi: 'Kirjautunut sisaan'
    };

    Salute.prototype = {

        full_name: function() {
            return this.str_title + ' ' + this.str_first_name + ' ' + this.str_last_name;
        },

        validate: function() {

            if (obj_supported_langs.indexOf(this.str_language) === -1) {
                throw "Invalid str_language";
            }
        },

        greeting: function() {
            return obj_informal_greetings[this.str_language] + ' ' + this.str_first_name + '!';
        },

        formal_salute: function() {
            return obj_formal_greetings[this.str_language] + ', ' + this.full_name();
        },

        greet: function(bol_formal, str_greeting) {
            var str_msg;

            if (bol_formal) {
                str_msg = this.formal_salute();
            } else {
                str_msg = this.greeting();
            }

            if (str_greeting) {
                str_msg = this.set_greeting(str_greeting);
            }

            if (console) {
                console.log(str_msg);
            }

            return this;
        },

        log: function() {
            if (console) {
                console.log(obj_log_messages[this.str_language] + ': ' + this.full_name());
            }

            return this;
        },

        set_lang: function(str_lang) {

            this.str_language = str_lang;

            this.validate();

            return this;
        },

        html_greeting: function(arr_selector, bol_formal, str_greeting) {
            if (!$) {
                throw 'jQuery not loaded';
            }

            if (!arr_selector) {
                throw 'Missing jQuery selector';
            }

            var str_msg;

            if (bol_formal) {
                str_msg = this.formal_salute();
            } else {
                str_msg = this.greeting();
            }

            if (str_greeting) {
                str_msg = this.set_greeting(str_greeting);
            }

            $(arr_selector).html(str_msg);

            return this;
        },

        set_greeting: function(str_greeting) {
            return str_greeting + ' ' + this.full_name();
        },

        set_html_full_name: function(arr_selector) {

            if (!$) {
                throw 'jQuery not loaded';
            }

            if (arr_selector.length < 0) {
                throw "Invalid number of arguments";
            }

            for (var i = 0; i <= arr_selector.length; i++) {
                this.str_first_name = arr_selector[0] ? $(arr_selector[0]).val() : '';
                this.str_last_name = arr_selector[1] ? $(arr_selector[1]).val() : '';
            }

            return this;
        }

    };

    Salute.init = function(str_first_name, str_last_name, str_title, str_language) {

        var self = this;
        self.str_first_name = str_first_name || '';
        self.str_last_name = str_last_name || '';
        self.str_language = str_language || 'en';
        self.str_title = str_title || '';

        self.validate();

    }

    Salute.init.prototype = Salute.prototype;

    obj_global.Salute = obj_global.S$ = Salute;

}(window, jQuery));