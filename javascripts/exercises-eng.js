
var Exercises = {
    numberExercises: function(firstExerciseIndex) {
	var toc_div = $('#tehtavat_toc');
	var ol_element = $('<ol start="' + firstExerciseIndex + '"/>');
	
	var exerciseNum = firstExerciseIndex;
	var subExerciseNum = 1;
	
	
	$('.tehtavat > h3').each(function() {
	    subExerciseNum = 1;
	    
	    var txt = $(this).text();
	    
	    $(this).attr('id', 'e'+exerciseNum);
	    $(this).text('Assignment '+exerciseNum+': '+txt);
	    
	    
	    var item = $('<li><a href="#e'+exerciseNum+'">'+txt+'</a></li>');
	    ol_element.append(item);
	    
	    $(this).nextUntil('h2, h3', 'h4').each(function() {
		
		if($(this).is('h4')) {
		    var txt = $(this).text();
		    $(this).text('Assignment '+exerciseNum+'.'+subExerciseNum+': '+txt);
		    subExerciseNum++;
		}
	    });

	    exerciseNum++;
	});
	
	toc_div.append(ol_element);
    }
}
	
