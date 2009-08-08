---
layout: nil
---
$(document).ready(function() {
    $(".ui-state-default").hover(function() {
        fadeAndChange(this, true);
    },
		function() {
		    fadeAndChange(this, false);
		})
		.mousedown(function(){ setActive(this,true);})
		.mouseup(function(){setActive(this,false);})
		.mouseout(function(){setActive(this,false);})
		.focus(function(){ setFocus(this, true);})
		.blur(function() { setFocus(this, false); setSelected(this, false);})
		.select(function(){ setSelected(this, true);})
		.fadeTo('fast', 0.8);
    //Separate things that load scripts..
    $(".accordionme").accordion({collapsible: true});
    setTimeout(function() {
        var user = "erikzaadi";
        $('#switcher').themeswitcher();
        {% if site.localmode %}
        GotTwitter([{"text":"LocalTweet!","in_reply_to_status_id":null,"user":{"profile_background_image_url":"http:\/\/s3.amazonaws.com\/twitter_production\/profile_background_images\/13383768\/znagUberSmall.jpg","followers_count":35,"description":"If it's interesting, I'll learn it!","utc_offset":7200,"profile_link_color":"1F98C7","screen_name":"erikzaadi","verified":false,"profile_background_tile":true,"friends_count":44,"profile_background_color":"C6E2EE","favourites_count":0,"url":"http:\/\/erikzaadi.blogspot.com\/","name":"Erik Zaadi","created_at":"Tue Apr 21 16:41:30 +0000 2009","profile_sidebar_fill_color":"DAECF4","protected":false,"time_zone":"Jerusalem","profile_sidebar_border_color":"C6E2EE","notifications":null,"following":null,"statuses_count":182,"location":"","id":33958650,"profile_text_color":"663B12","profile_image_url":"http:\/\/s3.amazonaws.com\/twitter_production\/profile_images\/150720288\/msn_normal.JPG"},"in_reply_to_user_id":null,"favorited":false,"created_at":"Thu Aug 06 11:15:17 +0000 2009","in_reply_to_screen_name":null,"id":3164876436,"truncated":false,"source":"<a href=\"http:\/\/www.twhirl.org\/\">twhirl<\/a>"}]);
        $("#GithubBadge").html('<div class="GithubBadge"><div class="GithubBadgeTitle"><a target="_blank" href="http://github.com/erikzaadi">My Github Homepage</a></div><div class="GithubBadgeTitle">My Repositories</div><div class="GithubBadgeRepo"><a target="_blank" href="http://github.com/erikzaadi/YUIConsoleUtility" title="Small console application that uses the YUI Compression library to compress css stylesheets and javascript files. Uses http://yuicompressor.codeplex.com/ .net YUI Compressor library">YUIConsoleUtility</a></div><div class="GithubBadgeRepo"><a target="_blank" href="http://github.com/erikzaadi/jQueryPlugins" title="Collection of jQuery plugins">jQueryPlugins</a></div><div class="GithubBadgeRepo"><a target="_blank" href="http://github.com/erikzaadi/MVCUIHelpers" title="Collection of UI helpers for ASP.NET MVC">MVCUIHelpers</a></div><div class="GithubBadgeRepo"><a target="_blank" href="http://github.com/erikzaadi/ConvertToEncodingTool" title="Library that converts the encoding of text based files (either per single file or per root folder). Filtering according to file extensions is also possible..">ConvertToEncodingTool</a></div><div class="GithubBadgeTitle">Forked Repositories</div><div class="GithubBadgeRepo GithubBadgeFork"><a target="_blank" href="http://github.com/erikzaadi/jquery.silver" title="not much like quicksilver, but it adds a quicksilver-like dialog for links in webpages">jquery.silver</a></div></div>');
        {% else %}
        InitTwitter(user);
        $("#GithubBadge").GitHubBadge(user);
        {% endif %}    
    }, 25);

});

function setSelected($elem, toggle){
    $($elem).toggleClass("ui-state-highlight", toggle);
}

function setFocus($elem, toggle){
    $($elem).toggleClass("ui-state-focus", toggle);
}

function setActive($elem, toggle){
    $($elem).toggleClass("ui-state-active", toggle);
}

function fadeAndChange($elem, toggle) {
    $($elem).stop().toggleClass("ui-state-hover", toggle).fadeTo('slow', toggle ? 1.0 : 0.8);
}

function InitTwitter(user) {
    var url = "http://twitter.com/status/user_timeline/" + user + ".json?count=1&callback=?";
    $.getJSON(url, GotTwitter);
}
function GotTwitter(data) {
    if (!data || !data[0])
        return;
    var tweetDate = new Date(Date.parse(data[0].created_at.replace(" +0000", "")));
    var followers = data[0].user.followers_count;
    $("#Twitter").addClass("TwitterFollowerLink").append('<div class="TwitterFollowerDiv"><a class="TwitterFollowerLink" href="http://twitter.com/erikzaadi" alt="Twitter"><div><span class="TwitterFollowerSpanContainer"><span class="TwitterFollowerSpanAmount">' + followers + '</span>&nbsp;followers</span></div></a><div class="TwitterFollowerBy">by znag</div></div>');
    tweetDate.setHours(tweetDate.getHours() + 3);
    var msg = '<div class="TwitterToolTip">' +
        '<div class="TwitterTitle">' +
        tweetDate.toString() +
        '</div>' +
        '<div class="TwitterMessage">' +
        data[0].text +
        '</div>' +
        '</div>';
    $("#Twitter").tooltip({
        fade: 500,
        delay: 0,
        showURL: false,
        bodyHandler: function() {
            return $(msg);
        }
    });
}