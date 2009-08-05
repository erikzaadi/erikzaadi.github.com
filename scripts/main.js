$(document).ready(function(){
	var user = "erikzaadi";
	$("#GithubBadge").GitHubBadge(user);
	InitTwitter(user);
});

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