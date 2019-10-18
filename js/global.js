( function( $ ) {

	'use strict';
	
	// Scroll to comments	
	function wpexCommentScroll() {
		$( '.comment-scroll a' ).click( function(event) {		
			event.preventDefault();
			$( 'html,body' ).animate( {
				scrollTop: $( this.hash ).offset().top
				}, 'normal' );
		} );
	}
	
	// Toggle sidebar
	function wpexMobileToggle() {
		$( 'a#toggle-btn' ).click( function() {
			$( 'div#toggle-wrap' ).toggleClass( 'visible' );
			$( this ).find( '.fa' ).toggleClass( 'fa-bars fa-remove' );
			return false;
		} );
	}
	
	// Masonry Widths
	function wpexMasonry() {
		$( '.grid' ).masonry( {
			itemSelector : '.loop-entry',
			gutter       : 30,
			columnWidth  : 280,
			isAnimated   : true,
			fitWidth     : true,
			animationOptions : {
				duration : 200,
				easing   : 'easeInOutCirc',
				queue    : true
			} ,
		} );
	}
	
	$( document ).ready(function() {
		wpexMobileToggle();
		wpexCommentScroll();
		wpexMasonry();
	} );
	
	$( window ).load(function() {
		wpexMasonry();
	} );
	
	
	$( window ).resize(function() {
   		wpexMasonry();
	} );
	
	if ( document.addEventListener ) {
		window.addEventListener( 'orientationchange', function() {
			wpexMasonry();
		} );
		window.addEventListener( 'resize', function() {
			wpexMasonry();
		} );
	}

	// Nui infinity scroll
	var nui_page_current = 1;
	var nui_page_is_end = false;
	var nui_page_loading = false;
	var nui_elem_loading = $('#nui-loading');

	function nui_onscroll() {
		var elem = $('#infinite-wrap');
		var th = elem.offset().top + elem.outerHeight() - window.innerHeight - 50;
		if ($(window).scrollTop() >= th) {
			nui_load_page();
		}
	}
	if (window.nui_infinity_scroll) {
		$(window).scroll(nui_onscroll);
		nui_onscroll();
	}

	function nui_get_page_url(idx) {
		const href = window.location.href;
		return href + (href.endsWith('/') ? 'page/' : '/page/') + idx + '/?infscroll=1';
	}

	function nui_load_page() {
		if (nui_page_is_end) {
			return;
		} else if (!nui_page_loading) {
			nui_page_loading = true;
			nui_elem_loading.show();
			console.log('page' + (nui_page_current + 1));
			$.get(nui_get_page_url(nui_page_current + 1)).done(function(html) {
				nui_page_loading = false;
				nui_elem_loading.hide();
				nui_page_current++;
				$('#infinite-wrap')
					.append(html)
					.masonry('reloadItems').masonry('layout');
				wpexMasonry();
			}).fail(function(err) {
				if (err && err.status === 404) {
					nui_page_is_end = true;
					nui_elem_loading.html('No more posts');
				} else {
					setTimeout(function() {
						nui_page_loading = false;
						nui_load_page();
					}, 3000);
				}
			});
		}
	}
} ) ( jQuery );
