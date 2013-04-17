/**
 * Bootstro.js Simple way to show your user around, especially first time users 
 * Http://github.com/clu3/bootstro.js
 * 
 * Credit thanks to 
 * Revealing Module Pattern from 
 * http://enterprisejquery.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-1/
 * 
 * Bootstrap popover variable width workaround
 * http://stackoverflow.com/questions/10028218/twitter-bootstrap-popovers-multiple-widths-and-other-css-properties
 *
 * Lisence : MIT . See accompanied LICENSE file. 
 */

$(document).ready(function(){
    //Self-Executing Anonymous Func: Part 2 (Public & Private)
    (function( bootstro, $, undefined ) {
        var $elements; //jquery elements to be highlighted
        //var count;
        var popovers = []; //contains array of the popovers data
        var activeIndex = null; //index of active item
        var active = false;
   
        var defaults = {
            nextButton : '<button class="btn btn-primary btn-mini bootstro-next-btn">Next &raquo;</button>',
            prevButton : '<button class="btn btn-primary btn-mini bootstro-prev-btn">&laquo; Prev</button>',
            finishButton : '<button class="btn btn-mini btn-success bootstro-finish-btn"><i class="icon-ok"></i> Ok I got it, get back to the site</button>',
            stopOnBackdropClick : true,
            stopOnEsc : true
        };
        //var settings;
        var onCompleteFunc;
        var onExitFunc;
        var onStepFunc;
        
        
        //===================PRIVATE METHODS======================
        //add the nav buttons to the popover content;
        
        function add_nav_btn(content, i, settingsOverride)
        {
            
            var s = $.extend(bootstro.settings, settingsOverride);
            count = bootstro.count;
            content = content + "<div class='bootstro-nav-wrapper'>";
            if (count != 1)
            {
                if (i == 0)
                    content = content + s.nextButton;
                else if (i == count -1 )
                    content = content + s.prevButton;
                else 
                    content = content + s.nextButton + s.prevButton
            }
            content = content + '</div>';
              
            content = content +'<div class="bootstro-finish-btn-wrapper">' + s.finishButton + '</div>';
            return content;
        }
        
        bootstro.settings = {};
        bootstro.count = 0;
        //get the element to intro at stack i 
        get_element_from_storyboard = function(i)
        {
            var scene = bootstro.settings.storyboard[i];
          
            return $(scene.element);
        }
        
        //get the element to intro at stack i 
        get_element = function(i)
        {
            //get the element with data-bootstro-step=i 
            //or otherwise the the natural order of the set
            if ($elements.filter("[data-bootstro-step=" + i +"]").size() > 0)
                return $elements.filter("[data-bootstro-step=" + i +"]");
            else 
            {
                return $elements.eq(i);
                /*
                nrOfElementsWithStep = 0;
                $elements.filter("[data-bootstro-step!='']").each(function(j,e){
                    nrOfElementsWithStep ++;
                    if (j > i)
                        return $elements.filter(":not([data-bootstro-step])").eq(i - nrOfElementsWithStep);
                })
                */
            }
        }
        
        get_popup_from_storyboard = function(i)
        {
            var p = {};
            var scene = bootstro.settings.storyboard[i];
            var t = '';
            var count = bootstro.count;
            if (count > 1)
            {
                t = "<span class='label label-success'>" + (i +1)  + "/" + count + "</span>";
            }
            p.title = '';
            if (p.title != '' && t != '')
                p.title = t + ' - ' + p.title;
            else if (p.title == '') 
                p.title = t;

            p.content = scene.content || '';
            
            var settingsOverride = {};
            var buttons = ["nextButton", "prevButton", "finishButton"];
            for (var x in buttons)
            {
                if(buttons[x] in bootstro.settings.storyboard[i])
                    settingsOverride[buttons[x]] = bootstro.settings.storyboard[i][buttons[x]];
            }
            
            p.content = add_nav_btn(p.content, i, settingsOverride);
            p.placement = scene.placement|| 'top';
            
            var style = ''; 
            if (scene.width)
            {
                p.width = scene.width; 
                style = style + 'width:' + p.width + ';'
            }
            if (scene.height)
            {
                p.height = scene.height;
                style = style + 'height:' + p.height + ';'
            }
            p.trigger = 'manual'; //always set to manual.
           
            p.html = scene.html || 'top';
            
            //resize popover if it's explicitly specified
            //note: this is ugly. Could have been best if popover supports width & height
            p.template = '<div class="popover" style="' + style + '"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div>' +
             '</div>';
            
            return p;
        }
        
        get_popup = function(i)
        {
            var p = {};
            $el = get_element(i);
            //p.selector = selector;
            var t = '';
            var count = bootstro.count;
            if (count > 1)
            {
                t = "<span class='label label-success'>" + (i +1)  + "/" + count + "</span>";
            }
            p.title = $el.attr('data-bootstro-title') || '';
            if (p.title != '' && t != '')
                p.title = t + ' - ' + p.title;
            else if (p.title == '') 
                p.title = t;

            p.content = $el.attr('data-bootstro-content') || '';
            p.content = add_nav_btn(p.content, i);
            p.placement = $el.attr('data-bootstro-placement') || 'top';
            var style = ''; 
            if ($el.attr('data-bootstro-width'))
            {
                p.width = $el.attr('data-bootstro-width'); 
                style = style + 'width:' + $el.attr('data-bootstro-width') + ';'
            }
            if ($el.attr('data-bootstro-height'))
            {
                p.height = $el.attr('data-bootstro-height');
                style = style + 'height:' + $el.attr('data-bootstro-height') + ';'
            }
            p.trigger = 'manual'; //always set to manual.
           
            p.html = $el.attr('data-bootstro-html') || 'top';
            
            //resize popover if it's explicitly specified
            //note: this is ugly. Could have been best if popover supports width & height
            p.template = '<div class="popover" style="' + style + '"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div>' +
             '</div>';
            
            return p;
            
        }

        //===================PUBLIC METHODS======================
        //destroy popover at stack index i
        bootstro.destroy_popover = function(i)
        {
            i = i || 0;
            if (i != 'all')
            {
                if("storyboard" in bootstro.settings)
                    $el = get_element_from_storyboard(i);
                else
                    $el = get_element(i);
                $el.popover('destroy').removeClass('bootstro-highlight');
            }
            /*
            else //destroy all
            {
                $elements.each(function(e){
                    
                    $(e).popover('destroy').removeClass('bootstro-highlight');
                });
            }
            */
        };
        
        //destroy active popover and remove backdrop
        bootstro.stop = function()
        {
            
            if("storyboard" in bootstro.settings)
            {    
                for (var i in bootstro.settings.storyboard)
                {
                    console.log("scene");
                    $(bootstro.settings.storyboard[i].element)
                }
            }
            
            //call onExit callback function if needed
            if (this.onExitFunc != undefined) {
                this.onExitFunc.call(this);
            }
            bootstro.destroy_popover(activeIndex);
            bootstro.unbind();
            $("div.bootstro-backdrop").remove();
            this.active = false;
        };

        
        //go to the popover number idx starting from 0
        bootstro.go_to = function(idx) 
        {
            //call onStep callback function if needed
            if (this.onStepFunc != undefined) {
                this.onStepFunc.call(this);
            }
            //destroy current popover if any
            bootstro.destroy_popover(activeIndex);
            if (bootstro.count != 0)
            {
                if(bootstro.settings.storyboard)
                {
                    p = get_popup_from_storyboard(idx);
                    $el = get_element_from_storyboard(idx);
                }
                else
                {
                    p = get_popup(idx);
                    $el = get_element(idx);
                }

                $el.popover(p).popover('show');
                if( ("onShow" in bootstro.settings.storyboard[idx]) && (bootstro.settings.storyboard[idx].onShow instanceof Function) )
                    bootstro.settings.storyboard[idx].onShow();
                
                
                min = Math.min($(".popover.in").offset().top, $el.offset().top);
                $('html,body').animate({
                    scrollTop: min - 20},
                'slow');
                // html 
                  
                $el.addClass('bootstro-highlight');
                activeIndex = idx;
            }
        };
        bootstro.next = function()
        {
          
            if (activeIndex + 1 == count)
            {
                //call onComplete callback function if needed
                if (this.onCompleteFunc != undefined) {
                    this.onCompleteFunc.call(this);
                }
            }
            else 
                bootstro.go_to(activeIndex + 1);
        };
        
        bootstro.prev = function()
        {
            if (activeIndex == 0)
            {
                console.log('At start of intros');
            }
            else 
                bootstro.go_to(activeIndex -1);
        };
        
        bootstro.start = function(selector, options)
        {
            bootstro.active=true;
            bootstro.settings = $.extend(true, {}, defaults, bootstro.settings, options || {}); //deep copy

            if("storyboard" in bootstro.settings)
            {
                $elements = $(".bootstro");
                bootstro.count =  bootstro.settings.storyboard.length;
            }
            else
            {    
                selector = selector || '.bootstro';
                $elements = $(selector);
                bootstro.count  = $elements.size();
            }

            $('<div class="bootstro-backdrop"></div>').appendTo('body');
            bootstro.bind();
            bootstro.go_to(0);
        };
          
        //bind the nav buttons click event
        bootstro.bind = function()
        {
            bootstro.unbind();
       
            $("html").on('click.bootstro', ".bootstro-next-btn", function(e){
                bootstro.next();
                e.preventDefault();
                return false;
            });
            
            $("html").on('click.bootstro', ".bootstro-prev-btn", function(e){
                bootstro.prev();
                e.preventDefault();
                return false;
            });
      
            //end of show
            $("html").on('click.bootstro', ".bootstro-finish-btn", function(e){
                bootstro.stop();
            });        
            
            if (bootstro.settings.stopOnBackdropClick)
            {
                $("html").on('click.bootstro', 'div.bootstro-backdrop', function(e){
                    if ($(e.target).hasClass('bootstro-backdrop'))
                        bootstro.stop();
                });
            }
                
            //bind the key event
            $(document).on('keydown.bootstro', function(e){
                var code = (e.keyCode ? e.keyCode : e.which);
                if (code == 39 || code == 40)
                    bootstro.next();
                else if (code == 37 || code == 38)
                    bootstro.prev();
                else if(code == 27 && bootstro.settings.stopOnEsc)
                    bootstro.stop();
            })
        };
        
        bootstro.unbind = function()
        {
            $("html").off(".bootstro");
            $(document).off(".bootstro");
            $("html").unbind('.bootstro');
            $(document).unbind('.bootstro');
        };
           
        bootstro.on_complete = function(callbackFunction)
        {
            if (Object.prototype.toString.call(callbackFunction) == '[object Function]') {
                this.onCompleteFunc = callbackFunction;
            }
        };

        bootstro.on_exit = function(callbackFunction)
        {
            if (Object.prototype.toString.call(callbackFunction) == '[object Function]') {
                this.onExitFunc = callbackFunction;
            }
        };

        bootstro.on_step = function(callbackFunction)
        {
            if (Object.prototype.toString.call(callbackFunction) == '[object Function]') {
                this.onStepFunc = callbackFunction;
            }
        };
        
     }( window.bootstro = window.bootstro || {}, jQuery ));
});
