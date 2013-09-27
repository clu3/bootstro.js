Bootstro.js
========
Tiny JS library taking advantage of bootstrap's popover to help guide your users around. <a href='http://clu3.github.com/bootstro.js'>Demo</a>

Latest update and TODOs (2003/09/26)
========
Thanks a lot for the project stars. I've been so busy with project deadlines that I didn't have time/energy to reply to the issues/comments. So a few quick notes and things I will do in the near future

 - <a href='http://linkedin.github.io/hopscotch/'>hopscotch<a/> by linkedin is a good alternative. It supports multi-page slideshows by writing stuff to localStorage/cookie
 - Change documentation to encourage making slideshow data from a JS variable or via ajax, rather than injecting data-bootstro-* attributes into HTML. Currenty bootstro.js already supports both methods but the documentation/demo page makes it sound like users should inject slideshow data into HTML. This is not only making HTML dirty but also causes bugs like <a href='https://github.com/clu3/bootstro.js/pull/24'>this unmerged pull request</a>
 - Supports multi-page slideshows like hopscotch
 - Branch and Upgrade to Bootstrap 3
 - Make this project a proper test-driven JS library, like test cases, automatic minify stuff...
 
Please log issues/comments/pull requests.

Requires
========
Bootstrap 2.3.1 + jQuery. 
There's an <a href='https://github.com/clu3/bootstro.js/issues/6'>issue</a> that it doesn't work with Bootstrap 2.0.4. 
My development setup is always latest bootstrap (currently 2.3.1, as of 20th March, 2013) so I can't really tell.
If you don't want to work with Bootstrap, check out <a href='https://github.com/usablica/intro.js'>intro.js</a>. 

Bootstrap 3 support is on the way

Documentation
========

I'm not so much into markdown so please see <a href='http://clu3.github.com/bootstro.js'>Documentation</a> on the demo page

License 
========
<a href='http://opensource.org/licenses/MIT'>MIT</a>

Contributors
========
Thanks a lot to those who have helped me (in no particular order)

   <a href='https://github.com/bglick'>Brian Glick</a>
   
   <a href='https://github.com/tsrivishnu'>Sri Vishnu Totakura</a>
   
   <a href='https://github.com/edmenendez'>Ed Menendez</a>
   
   <a href='https://github.com/crzrcn'>crnrcn</a>
   
   <a href='https://github.com/chackley'>Chance Ackley</a>
   
   <a href='https://github.com/isuftin'>Ivan Suftin</a>
   
   <a href='https://github.com/TalAter'>Tal Ater</a>
   
   <a href='https://github.com/TalAter'>Tal Ater</a>
   
   <a href='https://github.com/silviomoreto'>Silvio Moreto</a>
  
tl;dr
========

For the concerned/curious about stealing idea of intro.js or copyright or anything like that: Bootstro.js was conceived about 2 months before it was released and 
publicly discussed (by me) <a href='http://irc.jquery.org/%23jquery/%23jquery_20130309.log.html#t00:06:34'>1 day before</a> intro.js's <a href='https://github.com/usablica/intro.js/commit/804ea9494c906503dc5602b1205bde5d937f7cf7'>first commit</a>.

A spaghetti working version was also finished few days before that as part of SandPHP (private repo), but Bootstro.js was made opensourced after intro.js's debut in HN
Just so you get the picture. 

I'm an advocate for opensource, but I hate licences, copyright and all that shit. Seriously, if it's opensource it should be completely free, no lisence or liability or whatsoever attached. I hate to put a license to this tiny utility, it's too small and simple to have one. Bootstrap already does like 99% of the work. But sigh, that's the way it currently is so as advised I add to put MIT license to this "library", basically that's the most "free" license around.
