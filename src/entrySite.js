//yam
if ( $(".paper").exists() ) {
    if ( $(".paper").is(":contains('TVBS')") ) {
        $(".paper:contains('TVBS')").css( "border", "5px solid red" );
        draw("<TVBS>");
    }
}
//yahoo
else if ( $(".provider.org").exists() ) {
    if ( $(".provider.org").is(":contains('中時電子報')") ) {
        $(".provider.org:contains('中時電子報')").css( "border", "5px solid red" );
        draw("<中時>");
    }
    else if( $(".provider.org").is(":contains('TVBS')") ) {
        $(".provider.org:contains('TVBS')").css( "border", "5px solid red" );
        draw("<TVBS>");
    }
}
//msn
else if ( $(".news-partner").exists() ) {
    if ( $(".news-partner > a[href*='chinatimes.com']").exists() ) {
        $(".news-partner").css( "border", "5px solid red" );
        $(".article-from > a:contains('中時電子報')").css( "border", "5px solid red" );
        draw("<中時>");
    }
    else if ( $(".news-partner > a[href*='TVBS.com']").exists() || 
            $(".news-partner > a[href*='tvbs.com']").exists() ) {
        $(".news-partner").css( "border", "5px solid red" );
        $(".article-from > a:contains('TVBS')").css( "border", "5px solid red" );
        draw("<TVBS>");
    }
}