import { rovingIndex } from 'https://cdn.skypack.dev/roving-ux';
$(document).ready(function(){
	let teamNumber = $('#teamNumber');
	let limitedTime = $('#limitedTime');
	let teamNumberError = $('#teamNumberError');
	let limitedTimeError = $('#limitedTimeError');
	let limitedReasoning = $('#limitedReasoning');
	let limitedReasoningError = $('#limitedReasoningError')
    localStorage.clear();
    function setConfigData(){
        const configData = {
			teamNumber: teamNumber.val(),
            timeLimit: limitedTime.val(),
            reasonLimit: limitedReasoning.val()
        }
        localStorage.setItem("configData", JSON.stringify(configData));
    }
    function setTeamsInfo(){
        const teams = [];
        for (let i = 0; i < parseInt(teamNumber.val()); i++) {
            const teamName = $(`#teamName${i}`).val();
            teams.push({name: teamName, roundsPlayed: 0, score: 0});
        }
        localStorage.setItem("teamsData", JSON.stringify(teams));
    }
    let currentPage = 1;
    $('#nextBtn').on('click', function(){
		let isValid = true;
			if(teamNumber.val() ==="" ){
				teamNumberError.show();
				teamNumberError.text("Vui lòng nhập số đội chơi.")
				isValid = false;
			}else if(teamNumber.val() < 1 || teamNumber.val() > 5){
				teamNumberError.show();
				teamNumberError.text("Số đội chơi chỉ từ 1 đến 5.");
				isValid = false;
			}else{
				teamNumberError.hide();
			}
			if(limitedTime.val() === "" ){
				limitedTimeError.show();
				limitedTimeError.text("Vui lòng nhập thời gian.")
				isValid = false;
			}else if(limitedTime.val() < 1 || limitedTime.val() > 10){
				limitedTimeError.show();
				limitedTimeError.text("Giới hạn thời gian phải từ 1 đến 10 phút");
				isValid = false;
			}else{
				limitedTimeError.hide();
			}
			if(limitedReasoning.val() === ""){
				limitedReasoningError.show();
				limitedReasoningError.text("Vui lòng nhập số lần suy đoán không chính xác")
				isValid = false;
			}else if(limitedReasoning.val() < 3 || limitedReasoning.val() > 9){
				limitedReasoningError.show();
				limitedReasoningError.text("Số lần suy đoán không chính xác phải từ 3 lần đến 9 lần")
				isValid = false;
			}else{
				limitedReasoningError.hide();
			}
        if(isValid){
			if(currentPage === 1){
				$('#page-one').addClass('d-none');
				$('#page-two').removeClass('d-none');
				$('#backBtn').removeClass('d-none');
				$('#nextBtn').addClass('d-none');
				$('#startBtn').removeClass('d-none');
				setConfigData();
				currentPage++;
			}
		}
    });
    $('#backBtn').on('click', function(){
        if(currentPage === 2){
            $('#page-two').addClass('d-none');
            $('#page-one').removeClass('d-none');
            $('#backBtn').addClass('d-none');
            $('#nextBtn').removeClass('d-none');
			$('#startBtn').addClass('d-none');
            currentPage--;
        }
    });
    teamNumber.on('input', function(){
        let teamNumber = parseInt($(this).val());
        let teamNameFields = $('#teamNameFields');
        teamNameFields.empty();

        for (let i = 0; i < teamNumber; i++) {
            let field = $('<div class="form-group m-3"></div>');
            let label = $('<label for="teamName' + i + '">Tên đội chơi ' + (i + 1) + '</label>');
            let input = $('<input type="text" class="form-control" id="teamName' + i + '" placeholder="Nhập tên đội chơi '+ (i+1) +'">');
			let error = $('<div class="error" id="teamNameError' + i +'" ">Vui lòng nhập tên đội chơi ' + (i + 1) + '</div>');
            field.append(label);
            field.append(input);
			field.append(error);
            teamNameFields.append(field);
        }
    });
	$('#startBtn').on('click', function(){
		let isValid = true;
		let config = JSON.parse(localStorage.getItem('configData')) || [];
		for(let i = 0; i < config.teamNumber; i++){
			let teamName = $(`#teamName${i}`).val();
			let errorElement = $(`#teamNameError${i}`);
			console.log(teamName)
			if(teamName === ""){
				errorElement.show();
				errorElement.text(`Vui lòng nhập tên đội chơi ${i + 1}.`);
				isValid = false;
			}else if(teamName.length > 255){
				errorElement.show();
				errorElement.text('"Vui lòng nhập tên đội ' + i +' 255 kí tự."');
				isValid = false;
			}else{
				$(`#teamNameError + i`).hide();
			}
			console.log(teamName);
		}
		console.log(isValid)
		if(isValid){
			if(currentPage === 2){
				setTeamsInfo();
				window.location.href = "index.html";
			}
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
let characters_up = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
	"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];
let characters_low = [
	"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
	"q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
];
let title = ["*", "*", "*", "*", "*","*","*", " ", "*", "*", "*", "*"];
let myFuncUpper = function (char_num, num) {
	let i = 0;
	let character0 = 0;
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

const myFuncLower = function (char_num, num) {
	let i = 0;
	let character0 = 0;
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

let complete = 0;
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
        document.getElementById("title").style.padding = "5px";
		// document.getElementById("start").style.top = "10%";
	}, 3400);
}
document.onload = intro();
function update_txt(title) {
	let string = "";
	title.forEach((element) => {
		string += element;
	});
	document.getElementById("title").innerHTML = string;
}

function start() {
	// if (complete === 3) {
		// document.getElementById("align").style.top = "40%";
		// document.getElementById("align").style.opacity = "0%";
		setInterval(function () {
			//put the start location here
			//location = "";
            if(complete === 3){
				intro();
			}
		}, 5000);
	// }
}
start();
const menu = document.querySelector('.threeD-button-set');
// let menuRect = menu.getBoundingClientRect();

// window.addEventListener('resize', () => {
// 	menuRect = menu.getBoundingClientRect();
// });
// Kiểm tra nếu người dùng không yêu cầu giảm chuyển động
const { matches: motionOK } = window.matchMedia('(prefers-reduced-motion: reduce)');

rovingIndex({
	element: document.querySelector('.threeD-button-set'),
	target: 'button',
});

if (!motionOK) {
	window.addEventListener('mousemove', ({ clientX, clientY }) => {
		const menuRect = menu.getBoundingClientRect();
			const { dx, dy } = getAngles(clientX, clientY, menuRect);
			// Cập nhật giá trị --x và --y cho góc xoay trong CSS
			menu.style.setProperty('--x', `${dy / 20}deg`);
			menu.style.setProperty('--y', `${dx / 20}deg`);
	});
}
// Hàm tính toán góc theo vị trí chuột
function getAngles(clientX, clientY ,rect) {
	const { x, y, width, height } = rect;

	const dx = clientX - (x + width / 2);
	const dy = clientY - (y + height / 2);

	return { dx, dy };
}



// document.getElementById("body").addEventListener("click", start);