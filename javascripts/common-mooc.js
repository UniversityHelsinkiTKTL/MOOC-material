function showAllContent(){
	$('.toc_content').toggle()
}

var LatteX = {
    containerElement: null,
    
    generateToc: function(container, firstChapterIndex) {
	var toc_div = $('#'+container);
	var fl_menu_items = $('#fl_menu_items');

	var topics = $('.viikkoraja-mooc h2');//JAMO
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
	
	$('.viikkoraja-mooc h2').each(function() {
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
    $('.ahy').remove()
    if (typeof(langToHide) != "undefined")
      	$(document).find('*[lang='+langToHide+']').css("display","none");

    var firstChapterIndex = 1;
    var firstExerciseIndex = 1;

    var firstChapterIndexElement = $.find("[data-first-chapter-index-mooc]");
    if (firstChapterIndexElement) {
      	firstChapterIndex = parseInt($(firstChapterIndexElement).attr("data-first-chapter-index-mooc"));
    }
    var firstExerciseIndexElement = $.find("[data-first-exercise-index-mooc]");
    if (firstExerciseIndexElement) {
      firstExerciseIndex = parseInt($(firstExerciseIndexElement).attr("data-first-exercise-index-mooc"));
    }
    
    LatteX.generateToc("materiaali_toc", firstChapterIndex);
    LatteX.numberHeadings(firstChapterIndex);
    LatteX.scrollToAnchor();
    
    Exercises.numberExercises(firstExerciseIndex);
    sh_highlightDocument();

    $(".tehtava").hide();
      $("div.toc_viikko").hide();
      $(".heading").click(function()      {
        $(this).next(".tehtava").slideToggle(200);
       });
    $('.mooc-pakollinen').css('background-color', '#FF1493')
    $('.mooc-pakollinen').css('border-radius','5px')
    $('.mooc-pakollinen').css('-moz-border-radius','5px')
    $('.mooc-pakollinen').css('-webkit-border-radius','5px')
    $('.mooc-pakollinen').css('margin-left','20px')
    $('.mooc-pakollinen').css('-webkit-box-shadow', 'rgba(0,0,0,0.2) 0 1px 0 0')
    $('.mooc-pakollinen').css('-moz-box-shadow','rgba(0,0,0,0.2) 0 1px 0 0')
    $('.mooc-pakollinen').css('box-shadow','rgba(0,0,0,0.2) 0 1px 0 0')
    $('.mooc-pakollinen').css('border','none')
    $('.mooc-pakollinen').css('height','100%')
    $('.mooc-pakollinen').css('padding-top','0.3em')
    $('.mooc-pakollinen').css('padding-bottom','0.3em')
    $('.mooc-pakollinen').css('margin-left','1.3em')
    $('.mooc-pakollinen').text("Allaoleva tehtävä on kaikille yliopistoon hakeville pakollinen")

});
