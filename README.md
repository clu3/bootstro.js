Updates
=======

Updated bootstro to make it so you don't have to use attributes to draw up your story board. Reason for this is that when you want an introduction, often you don't want to kruft up your markup permanently for an introduction that you are likely to only show your visitors once or twice.

Now the storyboard is controlled via the "storyboard" object which is passed in through the settings.

<pre><code>
boostro.start({
    storyboard: [
        {   //a scene
            title: "Title",
            content: "My Content Here",
            placement: "top",
            element: ".whatever input",
            onShow: function(scene) { },
            onStop: function(scene) { },
            nextButton: ""
        },
        {

        }
    ]
});
</code></pre>

You can input "scene's" into the storyboard array. You can also use this method for late bindings - the element is only bound after the next button is clicked - which works well when you need to ajax in contents.

onShow is triggered when the popup is shown and can be used to add extra event handlers, for example when you want to give instructions like "Click new product" and then hide the next button (effectively making the 'new product' button the next button). If you namespace your objects, hanging off $("html") as ".bootstro" they will be removed during the bootstro.stop(). However, if you can't do that - for example sometimes previous click handlers turn off event bubbling (`e.preventDefault()`) then just use onStop function to clean it up.

Bootstro.js
========

Tiny JS library taking advantage of bootstrap's popover to help guide your users around. <a href='http://clu3.github.com/bootstro.js'>Demo</a>




Requires
========

Bootstrap 2.3.1 + jQuery. 
There's an <a href='https://github.com/clu3/bootstro.js/issues/6'>issue</a> that it doesn't work with Bootstrap 2.0.4. 
My development setup is always latest bootstrap (currently 2.3.1, as of 20th March, 2013) so I can't really tell.
If you don't want to work with Bootstrap, check out <a href='https://github.com/usablica/intro.js'>intro.js</a>. 

Documentation
========

I'm not so much into markdown so please see <a href='http://clu3.github.com/bootstro.js'>Documentation</a> on the demo page

License 
========
<a href='http://opensource.org/licenses/MIT'>MIT</a>

tl;dr
----

For the concerned/curious about stealing idea of intro.js or copyright or anything like that: Bootstro.js was conceived about 2 months before it was released and 
publicly discussed (by me) <a href='http://irc.jquery.org/%23jquery/%23jquery_20130309.log.html#t00:06:34'>1 day before</a> intro.js's <a href='https://github.com/usablica/intro.js/commit/804ea9494c906503dc5602b1205bde5d937f7cf7'>first commit</a>.

A spaghetti working version was also finished few days before that as part of SandPHP (private repo), but Bootstro.js was made opensourced after intro.js's debut in HN
Just so you get the picture. 

I'm an advocate for opensource, but I hate licences, copyright and all that shit. Seriously, if it's opensource it should be completely free, no lisence or liability or whatsoever attached. I hate to put a license to this tiny utility, it's too small and simple to have one. Bootstrap already does like 99% of the work. But sigh, that's the way it currently is so as advised I add to put MIT license to this "library", basically that's the most "free" license around.
