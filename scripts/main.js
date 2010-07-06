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
    $(".accordionme").accordion({collapsible: true, active:false});
    setTimeout(function() {
        var user = "erikzaadi";
        $('#switcher').themeswitcher();
          InitTwitter(user);		  
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