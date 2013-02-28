function showWeek(week) {
    if ( week == 1) {
        $('div.viikko1').toggle()
    } else if ( week == 2) {
        $('div.viikko2').toggle()
    } else if ( week == 3) {
        $('div.viikko3').toggle()
    } else if ( week == 4) {
        $('div.viikko4').toggle()
    } else if ( week == 5) {
        $('div.viikko5').toggle()
    } else if ( week == 6) {
        $('div.viikko6').toggle()
    } else if ( week == 7) {
        $('div.viikko7').toggle()
    }
}

function showAll(){
    showWeek(1);
    showWeek(2);
    showWeek(3);
    showWeek(4);
    showWeek(5);
    showWeek(6);
    showWeek(7);//tyhjä
}


var Exercises = {

    numberExercises: function(firstExerciseIndex) {
				//var toc_div = $('#tehtavat_toc');
				//var ol_element = $('<ol start="' + firstExerciseIndex + '"/>');
				
				var exerciseNum = firstExerciseIndex;
				var subExerciseNum = 1;
				var weekNum = -1;


				var toc_div_new = $('#tehtavat_toc2');


				$('section.viikkoraja').each(function(){  	
					weekNum++;
					  if (weekNum != 0){
                toc_div_new.append("<a class='toc_title viikko"+weekNum+"' onclick=\"$('div.viikko"+weekNum+"').toggle()\" >Viikko "+weekNum+"</a></br>");
    						toc_div_new.append("<div class=\"toc_viikko viikko"+weekNum+"\">");
					  }
					$(this).find('.tehtava > h3').each(function() {
							subExerciseNum = 1;
			        var txt = $(this).text();
			        
					    txt = ('Tehtävä '+exerciseNum+': '+txt);
					    $(this).hide();
					    
			        $(this).parent().before("<p class=\"heading\" id=\"e"+ exerciseNum+"\" >"+txt+"</p>");
			     		$(this).attr('id', 'e'+exerciseNum);
					    
					    var item = $('<span><a href="#e'+exerciseNum+'">'+txt+'</a></span><br>');
					    $("div.viikko"+weekNum).append(item);
					    
					    $(this).nextUntil('h2, h3', 'h4').each(function() {
						
								if($(this).is('h4')) {
								    var txt = $(this).text();
								    $(this).text('Tehtävä '+exerciseNum+'.'+subExerciseNum+': '+txt);
								    subExerciseNum++;
								}
							    });

					    exerciseNum++;
				});});
    }
}
	