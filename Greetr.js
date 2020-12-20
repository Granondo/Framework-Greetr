;(function(global, $) {
    
    // 'new' an object
    var Greetr = function(firstName, lastName, language) {
        return new Greetr.init(firstName,lastName,language);
    }
    
    // hidden within the scope of the IIFE and never directly accessible
    var supportedLangs = ['en', 'ru'];
    
    var greetings = {
        en: 'Hello',
        ru: 'Privet'
    };
    
    var formalGreetings = {
        en: 'Greetings',
        ru: 'Zdravstvuite'
    };
    
    var logMessages = {
        en: 'Logged in',
        ru: 'Voshel v sistemu'
    };
    
    // prototype holds methods (to save memory space)
    Greetr.prototype = {
        
        // 'this' refers to the calling object at execution time
        fullname: function(){
            return this.firstName + ' ' + this.lastName;
        },
        
        validate: function(){
            // check that is a valid language
            // references the externally inaccessible 'supportedLangs' within the closure
            if (supportedLangs.indexOf(this.language) === -1) { 
                throw 'Invalid Message';
            }
        },
        
        // retrieve messages from object by referring to properties using [] syntax
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!'; 
        },
        
        formalGreeting: function() {
            return formalGreetings[this.language] + ' ' + this.lastName + '!'; 
        },
        
        // chainable methods return their own containing object
        greet: function(formal) {
            var msg;
            
            // if undefined or null it will be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }
            if (console) {
                console.log(msg)
            }
            
            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },
        log: function() {
        if (console) {
            console.log(logMessages[this.language] + ': ' + this.fullname());
        }
            
        // make chainable
        return this;   
    },
        setLang: function(lang) {
        this.language = lang;
            
        this.validate();
            
        return this;
    },
        HTMLGreeting: function(selector, formal) {
            if (!$) {
                throw 'JQuery not loaded';
            }
            if (!selector) {
                throw 'Missing Jquery Selector';
            }
            
            // determine the message
            var msg;
            if (formal) {
                 msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }
            // inject the message in the chosen place in the DOM
            $(selector).html(msg);
            
            // make chainable
            return this;
        }
 };
    
    // the actual object is created here, allowing us to 'new' an object without calling 'new'
    Greetr.init = function(firstName, lastName, language) {
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
    }
    
    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;
        
    // attach our Greetr to the global object, and provide a shorthand '$G' for ease our poor fingers
    global.Greetr = global.G$ = Greetr;
        
}(window, jQuery));


