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
        var count;
        var popovers = []; //contains array of the popovers data
        var activeIndex = null; //index of active item

        var defaults = {
            nextButton : '<button class="btn btn-primary btn-mini bootstro-next-btn">Next &raquo;</button>',
            prevButton : '<button class="btn btn-primary btn-mini bootstro-prev-btn">&laquo; Prev</button>',
            finishButton : '<button class="btn btn-mini btn-success bootstro-finish-btn"><i class="icon-ok"></i> Ok I got it, get back to the site</button>',
            stopOnBackdropClick : true,
            stopOnEsc : true
        };
        var settings;
        
        
        //===================PRIVATE METHODS======================
        //add the nav buttons to the popover content;
        
        function add_nav_btn(content, i)
        {
            count = $elements.size();
            content = content + "<div class='bootstro-nav-wrapper'>";
            if (count != 1)
            {
                if (i == 0)
                    content = content + settings.nextButton;
                else if (i == count -1 )
                    content = content + settings.prevButton;
                else 
                    content = content + settings.nextButton + settings.prevButton
            }
            content = content + '</div>';
              
            content = content +'<div class="bootstro-finish-btn-wrapper">' + settings.finishButton + '</div>';
            return content;
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
        
        get_popup = function(i)
        {
            var p = {};
            $el = get_element(i);
            //p.selector = selector;
            var t = '';
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
                $el = get_element(i);//$elements.eq(i); 
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
            bootstro.destroy_popover(activeIndex);
            bootstro.unbind();
            $("div.bootstro-backdrop").remove();
        };

        
        //go to the popover number idx starting from 0
        bootstro.go_to = function(idx) 
        {
            //destroy current popover if any
            bootstro.destroy_popover(activeIndex);
            if (count != 0)
            {
                p = get_popup(idx);
                $el = get_element(idx);
                
                $el.popover(p).popover('show');
                  
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
                alert('End of introduction');
            }
            else 
                bootstro.go_to(activeIndex + 1);
        };
        
        bootstro.prev = function()
        {
            if (activeIndex == 0)
            {
                alert('At start of intros');
            }
            else 
                bootstro.go_to(activeIndex -1);
        };
        
        bootstro.start = function(selector, options)
        {
            
            settings = $.extend(true, {}, defaults); //deep copy
            //TODO: if options specifies a URL, get the intro text array from URL
            $.extend(settings, options || {});
            
            selector = selector || '.bootstro';
            $elements = $(selector);
            count  = $elements.size();
              
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
            
            if (settings.stopOnBackdropClick)
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
                else if(code == 27 && settings.stopOnEsc)
                    bootstro.stop();
            })
        };
        
        bootstro.unbind = function()
        {
            $("html").unbind('click.bootstro');
            $(document).unbind('keydown.bootstro');
        }
           
     }( window.bootstro = window.bootstro || {}, jQuery ));
});
