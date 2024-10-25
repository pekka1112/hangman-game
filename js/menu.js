
$(document).ready(function(){
    function setConfigData(){
        const configData = {
            timeLimit: $('#limitedTime').val(),
            teamNumber: $('#teamNumber').val()
        }
        localStorage.setItem("configData", JSON.stringify(configData));
    }
    function setTeamsInfo(){
        const teams = [];
        for (let i = 0; i < parseInt($('#teamNumber').val()); i++) {
            const teamName = $(`#teamName${i}`).val();
            teams.push({name: teamName, roundsPlayed: 0, score: 0});
        }
        localStorage.setItem("teamsData", JSON.stringify(teams));
    }
    let currentPage = 1;
    $('#nextBtn').on('click', function(){
        if(currentPage === 1){
            $('#page-one').addClass('d-none');
            $('#page-two').removeClass('d-none');
            $('#backBtn').removeClass('d-none');
            $('#nextBtn').text('Xác nhận');
            setConfigData();
            currentPage++;
        }else{
            setTeamsInfo();
            $('#configurationModal').modal('hide');
        }
    });
    $('#backBtn').on('click', function(){
        if(currentPage === 2){
            $('#page-two').addClass('d-none');
            $('#page-one').removeClass('d-none');
            $('#backBtn').addClass('d-none');
            $('#nextBtn').text('Tiếp theo');
            currentPage--;
        }
    });
    $('#teamNumber').on('input', function(){
        let teamNumber = parseInt($(this).val());
        let teamNameFields = $('#teamNameFields');
        teamNameFields.empty();

        for (let i = 0; i < teamNumber; i++) {
            let field = $('<div class="form-group m-3"></div>');
            let label = $('<label for="teamName' + i + '">Tên đội chơi ' + (i + 1) + '</label>');
            let input = $('<input type="text" class="form-control" id="teamName' + i + '" placeholder="Nhập tên đội chơi '+ (i+1) +'">');
            field.append(label);
            field.append(input);
            teamNameFields.append(field);
        }
    });
});
$(document).ready(function() {
    $('.form-control').focus(function() {
        $(this).prev('label').addClass('label-focus');
    }).blur(function() {
        $(this).prev('label').removeClass('label-focus');
    });
    
});
var characters_up = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z"
];
var characters_low = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z"
];
var title = ["*", "*", "*", "*", "*","*","*", " ", "*", "*", "*", "*"];
var myFuncUpper = function (char_num, num) {
	var i = 0;
	var character0 = 0;
	while (i < char_num) {
		(function (i) {
			setTimeout(function () {
				character0 = characters_up[i];
				title[num] = character0;
				//console.log(i)
				update_txt(title);
			}, 100 * i);
		})(i++);
	}
	return true;
};

var myFuncLower = function (char_num, num) {
	var i = 0;
	var character0 = 0;
	while (i < char_num) {
		(function (i) {
			setTimeout(function () {
				character0 = characters_low[i];
				title[num] = character0;
				//console.log(i)
				update_txt(title);
			}, 100 * i);
		})(i++);
	}
	return true;
};

var complete = 0;
function intro() {
	complete = 1;
	setTimeout(function () {
		complete = 2;
		console.log("start");
		myFuncUpper(8, 0);
		myFuncUpper(1, 1);
		myFuncUpper(14, 2);
		myFuncUpper(7, 3);
		myFuncUpper(13, 4);
        myFuncUpper(1,5);
        myFuncUpper(14,6);
		//space between
		myFuncLower(7,8);
		myFuncLower(1,9);
        myFuncLower(13,10);
        myFuncLower(5,11);

        
	}, 1000);

	setTimeout(function () {
		complete = 3;
		console.log("done");
		document.getElementById("title").style.border = "solid 5px white";
        document.getElementById("title").style.padding = "10px";
		// document.getElementById("start").style.top = "10%";
	}, 3400);
}
document.onload = intro();

function update_txt(title) {
	var string = "";
	title.forEach((element) => {
		string += element;
	});
	document.getElementById("title").innerHTML = string;
}

function start() {
	if (complete == 3) {
		// document.getElementById("align").style.top = "40%";
		// document.getElementById("align").style.opacity = "0%";

		setInterval(function () {
			//put the start location here
			//location = "";
            intro();
		}, 4000);
	}
}

document.getElementById("body").addEventListener("click", start);