$(document).ready(function(){
	// Перевод радианов в градусы
	function inRad(num) {
		return num * Math.PI / 180;
	}

	// Определяем, где будем рисовать
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		ruler = document.getElementById("ruler");

	// Условие задачи
	var a = Math.floor(Math.random() * 4) + 6;
	var a_plus_b = Math.floor(Math.random() * 4) + 11;

	var b = a_plus_b - a;

	var zeroZero = [35.5, 220.5];	// Начало координат
	var rulerIndent = 39;			// Цена деления линейки
	var lineColor = "#cc3333";		// Цвет стрелочки
	var finishLine = [zeroZero[0] + rulerIndent * a, zeroZero[1]];			// Определение конца первой стрелки
	var finishLine2 = [zeroZero[0] + rulerIndent * a_plus_b, zeroZero[1]];	// Определение конца второй стрелки
	var line1Height = 100;			// Высота первой линии
	var line2Height = 70;			// Высота второй линии

	function inputPositioning() {
		// Расположение инпутов
		$("#input1").css({
			"left": (zeroZero[0] + (finishLine[0] - zeroZero[0])/2 + 8) + "px",
			"top": (finishLine[1] - (line1Height + 10)) + "px"
		});
		$("#input2").css({
			"left": (finishLine[0] + (finishLine2[0] - finishLine[0])/2 + 5) + "px",
			"top": (finishLine2[1] - (line2Height + 15)) + "px"
		});
	}

	context.drawImage(ruler, 0, 200);

	inputPositioning();

	// Условие задачи
	$("#a").html(a);
	$("#b").html(b);

	// // Сетка
	// // Горизонтальные прямые
	// for (var x = zeroZero[0]; x < canvas.width; x += rulerIndent) {
	// 	context.moveTo(x, 0);
	// 	context.lineTo(x, 375);
	// }

	// // Вертикальные прямые
	// for (var y = zeroZero[1]; y > 0; y -= rulerIndent) {
	// 	context.moveTo(0, y);
	// 	context.lineTo(canvas.width, y);
	// }

	// context.strokeStyle = "#999";
	// context.stroke();

	// context.fillStyle = "#000";
	// context.font = "bold 30px Arial";
	// context.fillText(a + " + " + b + " = ?", 370, 60);	// Условие задачи

	// Рисуем первую линию
	context.beginPath();
	context.moveTo(zeroZero[0],zeroZero[1]);
	context.bezierCurveTo(
		zeroZero[0] + 50, zeroZero[1] - line1Height,
		finishLine[0] - 50, finishLine[1] - line1Height,
		finishLine[0], finishLine[1]
	);
	context.strokeStyle = lineColor;
	context.lineWidth = 3;
	context.stroke();
	// Рисуем стрелочку
	// Ориентируем её в соответствии с изгибом линии
	context.translate(finishLine[0], finishLine[1]);
	context.rotate(inRad(-30));
	// В виде треугольника
	context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(5, -10);
		context.lineTo(-5, -10);
	context.closePath();
	// И закрашиваем красным
	context.fillStyle = lineColor;
	context.fill();
	// Поворачиваем СК обратно
	context.rotate(inRad(30));
	context.translate(-finishLine[0], -finishLine[1]);

	$('#input1').bind('input',function(){
		if($(this).val() == a) {
			$("#input1").remove();
			$("#content").append("<div id='input1'>" + a + "</div>");
			inputPositioning();
			$("#a").css("background-color", "white");

			$("#content").append('<input type="text" id="input2">');
			inputPositioning();

			// Рисуем вторую линию
			context.bezierCurveTo(
				finishLine[0] + 20, finishLine[1] - line2Height,
				finishLine2[0] - 20, finishLine2[1] - line2Height,
				finishLine2[0], finishLine2[1]
			);
			context.strokeStyle = lineColor;
			context.lineWidth = 3;
			context.stroke();
			// Стрелка
			context.translate(finishLine2[0], finishLine2[1]);
			context.rotate(inRad(-20));
			context.beginPath();
				context.moveTo(0, 0);
				context.lineTo(5, -10);
				context.lineTo(-5, -10);
			context.closePath();
			context.fillStyle = lineColor;
			context.fill();
			// Поворачиваем СК обратно
			context.rotate(inRad(20));
			context.translate(-finishLine2[0], -finishLine2[1]);

			$('#input2').bind('input',function(){
				if($(this).val() == b) {
					$("#input2").remove();
					$("#content").append("<div id='input2'>" + b + "</div>");
					inputPositioning();
					$("#b").css("background-color", "white");

					$("#question").hide();
					$("#input3").show();

					$('#input3').bind('input',function(){
						if($(this).val() == a_plus_b) {
							$("#input3").remove();
							$("#question").show().html(a_plus_b);
							$("#input3").css("color", "black");
						} else {
							$("#input3").css("color", "red");
						}
					});
				} else {
					$("#input2").css("color", "red");
					$("#b").css("background-color", "yellow");
					}
			});
		} else {
			$("#input1").css("color", "red");
			$("#a").css("background-color", "yellow");
		}
	});
});