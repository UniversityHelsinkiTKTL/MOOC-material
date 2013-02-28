function showWeek(week) {
    if ( week == 1) {
        $('.viikko1').toggle()
    } else if ( week == 2) {
        $('.viikko2').toggle()
    } else if ( week == 3) {
        $('.viikko3').toggle()
    } else if ( week == 4) {
        $('.viikko4').toggle()
    } else if ( week == 5) {
        $('.viikko5').toggle()
    } else if ( week == 6) {
        $('.viikko6').toggle()
    }
}

function showAll(){
    showWeek(1);
    showWeek(2);
    showWeek(3);
    showWeek(4);
    showWeek(5);
    showWeek(6);
}

var Exercises = {
    total:null,
    required:null,
    additional:null,
    bonus:null,

    countExercises:function (container) {
        this.total = $('h3').size();
        this.required = $('h3.req').size() + $('h3.show').size();
        this.bonus = $('h3.bonus').size();
        this.additional = this.total - this.required - this.bonus;
    },

    writeCounts:function () {
        var required_span = $('span#required_exercises_count');
        var additional_span = $('span#additional_exercises_count');
        var bonus_span = $('span#bonus_exercises_count');

        required_span.text(this.required);
        additional_span.text(this.additional);
        bonus_span.text(this.bonus);
    },

    numberExercises:function () {

        var exerciseNum = 0;
        var subExerciseNum = 0;
        var week = 0;

        var exerciseDivs = document.getElementsByClassName("tehtavat")[0];

        var toc_div = $('#tehtavat_toc');

        var div_element = $('<div/>');
		div_element.addClass("viikko0")

        var div_all_weeks = $('<div/>');
        div_all_weeks.addClass("toc_exercises")

        div_all_weeks.append("<br/>&nbsp;<a href='' TITLE='klikkaamalla kaikki näkyviin/pois' onclick='showAll(); return false;'><b>Tehtävät</b></a> <br/>");

        while (exerciseDivs != null) {

            if (!exerciseDivs.style.display) {
                var exerciseElement = exerciseDivs.children[0];

                while (exerciseElement != null) {
                    if (!exerciseElement.style.display) {

                        switch (exerciseElement.nodeName) {
                            case "NEXTWEEK":
                                div_all_weeks.append(div_element)

                                week++;
                                div_element = $('<div/>');
                                div_element.addClass("viikko"+week)

                                formatted = null;
                                div_all_weeks.append("<br/><a href='' TITLE='klikkaamalla viikko näkyviin/pois' onclick='showWeek("+week+"); return false;'><b>Viikko "+week+"</b></a> <br/>");
                                //div_element.append("<br/><b>Viikko " + week + "</b><br/>");
                                break;

                            case "H3":
                                subExerciseNum = 0;
                                exerciseNum++;
                                formatted = 'Tehtävä ' + exerciseNum + ': ';
                                break;

                            case "H4":
                                subExerciseNum++;
                                formatted =  exerciseNum + '.' + subExerciseNum + ': ';
                                break;

                            default:
                                formatted = null;
                        }

                        if (formatted) {

                            var txt = $(exerciseElement).text();
                            $(exerciseElement).text(formatted + ' ' + $(exerciseElement).text());

                            if (subExerciseNum == 0) {
                                exerciseElement.id = 'w' + week + 'e' + exerciseNum;
                                var item = $('<span>' + exerciseNum + '. <a href="#w' + week + 'e' + exerciseNum + '">' + txt + '</a></span><br/>');
                                div_element.append(item);
                            }
                        }
                    }


                    do {
                        exerciseElement = exerciseElement.nextSibling;
                    } while (exerciseElement && exerciseElement.nodeType != 1);
                }
            }


            div_all_weeks.append(div_element)

            $('.viikko1').hide()
            $('.viikko2').hide()
            $('.viikko3').hide()
            $('.viikko4').hide()
            $('.viikko5').hide()
            $('.viikko6').hide()

            toc_div.append(div_all_weeks);

            do {
                exerciseDivs = exerciseDivs.nextSibling;
            } while (exerciseDivs && exerciseDivs.nodeType != 1);

        }
    }
}