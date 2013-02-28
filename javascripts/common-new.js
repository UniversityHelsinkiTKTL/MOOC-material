function showAllContent(){
	$('.toc_content').toggle()
}

var LatteX = {
    containerElement: null,
    
    generateToc: function(container, firstChapterIndex) {
	var toc_div = $('#'+container);
	var fl_menu_items = $('#fl_menu_items');

	var topics = $('h2');
	var ol_element = $('<ol start="' + firstChapterIndex + '"/>');
   ol_element.addClass("toc_content");

	$.each(topics, function(i, n) {
	    fl_menu_items.append('<a href="#'+(firstChapterIndex+i)+'" class="menu_item">'+$(n).text()+'</a>');
	    var item = $('<li><a href="#'+(firstChapterIndex+i)+'">'+$(n).text()+'</a></li>');
	    ol_element.append(item);
	});
	
   toc_div.append("<br/><a href='' TITLE='klikkaamalla materiaalin sisällysluettelo näkyviin/pois' onclick='showAllContent(); return false;'><b>Sisällysluettelo</b></a> <br/>");

   $('.toc_content').hide();
   ol_element.hide();
	toc_div.append(ol_element);
	this.containerElement = toc_div;
    },
    
    showToc: function() {
	this.containerElement.show();
    },
    
    numberHeadings: function(firstChapterIndex) {
	var chapter = firstChapterIndex;
	var section = 1;
	var subsection = 1;
	
	$('h2').each(function() {
	    section = 1;

	    var txt = $(this).text();
	    $(this).attr('id', chapter);
	    $(this).text(chapter + '. ' + txt);

	    $(this).nextUntil('h2', 'h3').each(function() {
		if($(this).is('h3')) {
		    subsection = 1;
		    var txt = $(this).text();
		    $(this).text(chapter + '.' + section + ' ' + txt);

		    $(this).nextUntil('h2, h3', 'h4').each(function() {
			if($(this).is('h4')) {
			    var txt = $(this).text();
			    $(this).text(chapter + '.' + section + '.' + subsection + ' ' + txt);
			    subsection++;
			}
		    });
		    section++;
		}
	    });

	    chapter++;
	});
    },
    
    scrollToAnchor: function() {
	// If the URL had an anchor, scroll to it.
	// We need to do this manually because we generate IDs for titles programmatically.
	var anchorPos = window.location.href.search(/#.*$/);
	if (anchorPos != -1) {
	    var anchor = $(window.location.href.substr(anchorPos))[0];
	    if (anchor) {
		var offset = $(anchor).offset();
		window.scrollTo(offset.left, offset.top);
	    }
	}
    }    
}

$(document).ready(function() {
    if (typeof(langToHide) != "undefined")
	$(document).find('*[lang='+langToHide+']').css("display","none");

    var firstChapterIndex = 1;
    var firstExerciseIndex = 1;

    var firstChapterIndexElement = $.find("[data-first-chapter-index]");
    if (firstChapterIndexElement) {
	firstChapterIndex = parseInt($(firstChapterIndexElement).attr("data-first-chapter-index"));
    }
    var firstExerciseIndexElement = $.find("[data-first-exercise-index]");
    if (firstExerciseIndexElement) {
	firstExerciseIndex = parseInt($(firstExerciseIndexElement).attr("data-first-exercise-index"));
    }
    
    LatteX.generateToc("materiaali_toc", firstChapterIndex);
    LatteX.numberHeadings(firstChapterIndex);
    LatteX.scrollToAnchor();
    
    Exercises.numberExercises(firstExerciseIndex);
    sh_highlightDocument();
    $('.amooc').hide()
});
