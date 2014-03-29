//yam
if ( $(".paper").exists() ) {
    if ( $(".paper").is(":contains('TVBS')") ) {
        $(".paper:contains('TVBS')").css( "border", "5px solid red" );
        var mediaName = getDiv("_mediaName");
        mediaName.name = "旺中：TVBS";
        draw(mediaName.name);
        //document.title = '小心！您可能是旺中媒體的受害者！';
    }
}
//yahoo
else if ( $(".provider.org").exists() ) {

    if ( $(".provider.org").is(":contains('中時電子報')") ) {
        $(".provider.org:contains('中時電子報')").css( "border", "5px solid red" );
        var mediaName = getDiv("_mediaName");
        mediaName.name = "旺中：中時";
        draw(mediaName.name);
    }
    else if( $(".provider.org").is(":contains('TVBS')") ) {
        $(".provider.org:contains('TVBS')").css( "border", "5px solid red" );
        var mediaName = getDiv("_mediaName");
        mediaName.name = "旺中：TVBS";
        draw(mediaName.name);
    }
    /*
    else if( $(".provider.org").is(":contains('聯合新聞網')") ) {
        $(".provider.org:contains('聯合新聞網')").css( "border", "5px solid red" );
        var mediaName = getDiv("_mediaName");
        mediaName.name = "聯合新聞網";
        draw(mediaName.name);
    }*/
}
//msn
else if ( $(".news-partner").exists() ) {
    if ( $(".news-partner > a[href*='chinatimes.com']").exists() ) {
        $(".news-partner").css( "border", "5px solid red" );
        $(".article-from > a:contains('中時電子報')").css( "border", "5px solid red" );
        var mediaName = getDiv("_mediaName");
        mediaName.name = "旺中：中時";
        draw(mediaName.name);
    }
    else if ( $(".news-partner > a[href*='TVBS.com']").exists() || 
            $(".news-partner > a[href*='tvbs.com']").exists() ) {
        $(".news-partner").css( "border", "5px solid red" );
        $(".article-from > a:contains('TVBS')").css( "border", "5px solid red" );
        var mediaName = getDiv("_mediaName");
        mediaName.name = "旺中：TVBS";
        draw(mediaName.name);
    }
}