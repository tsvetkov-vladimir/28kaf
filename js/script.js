let wingSpan;
let middleChord;
let area = 0;
let workLoad = 0;
let wingAngleAll = document.querySelectorAll('.given-wing_angle-radio');
let calculationButton = document.querySelectorAll('.button')[0];
let resetButton = document.querySelectorAll('.button')[1];
let forecastButton = document.querySelectorAll('.button')[2];
let refineForecastButton = document.querySelectorAll('.button')[3];
let counter = 0;
let normMass = 0;
let counterPropability = 0;
let wingAngle = 0;
let propabilityFirst = 0;
let propabilitySecond = 0;
let propabilityThird = 0;
let propabilityFourth = 0;
let jointProbabilityFirst = 0;
let jointProbabilitySecond = 0;
let jointProbabilityThird = 0;
let jointProbabilityFourth = 0;
let mass;



function setWingAngel() {
	for (let i of wingAngleAll) {
		if (i.checked) {
			wingAngle = i.value;
		}
	}
}

function setParameter() {
	setWingAngel();
	wingSpan = document.querySelector('.given-wingspan-value');
	middleChord = document.querySelector('.given-middle_chord-value');
}

function setArea() {
	area = wingSpan.value * middleChord.value;
	document.querySelector('.calculation-area-value').innerHTML = area;
	document.querySelector('.calculation-area-value').classList.add('color');
}

function setWorkload() {
	if ((wingSpan.value == 7) || (wingSpan.value == 8) || (wingSpan.value == 9)) {
		workLoad = 4300;
	} else {
		if ((wingSpan.value == 10) || (wingSpan.value == 11) || (wingSpan.value == 12)) {
			workLoad = 4200;
		} else {
			workLoad = 4100;
		}
	}

	document.querySelector('.calculation-workload-value').innerHTML = workLoad;
	document.querySelector('.calculation-workload-value').classList.add('color');
}

function setMass() {
	normMass = (workLoad * area) / 9.81;
	document.querySelector('.calculation-mass-value').innerHTML = normMass.toFixed(1);
	document.querySelector('.calculation-mass-value').classList.add('color');
}

function resetColorTable() {
	for (let i = 1; i < document.querySelectorAll('td').length; i++) {
		document.querySelectorAll('td')[i].style.backgroundColor = "";
	}
	for (let i = 1; i < document.querySelectorAll('th').length; i++) {
		document.querySelectorAll('th')[i].style.backgroundColor = "";
	}
}

function resetColorTd() {
	for (let i = 0; i < document.querySelectorAll('td').length; i = i + 11) {
		document.querySelectorAll('td')[i].style.backgroundColor = ""
	}
}

function resetParametrs() {
	document.querySelector('.calculation-area-value').innerHTML = "00";
	document.querySelector('.calculation-area-value').classList.remove('color');
	document.querySelector('.calculation-workload-value').innerHTML = "00";
	document.querySelector('.calculation-workload-value').classList.remove('color');
	document.querySelector('.calculation-mass-value').innerHTML = "00";
	document.querySelector('.calculation-mass-value').classList.remove('color');
	resetColorTable();
	document.querySelector('.forecast-propability-value').classList.remove('color');
	document.querySelector('.forecast-propability-value').innerHTML = "00";
	for (let i = 0; i < document.querySelectorAll('.par-value').length; i++) {
		document.querySelectorAll('.par-value')[i].classList.remove('color');
		document.querySelectorAll('.par-value')[i].innerHTML = "00";
	}
	counter = 0;
}

function getPropability(counter, step) {
	if (step == 1) {
		propabilityFirst = Number((1 / counter).toFixed(3));
		console.log(propabilityFirst);
		document.querySelector('.forecast-propability-value').innerHTML = (propabilityFirst * 100).toFixed(2);
		jointProbabilityFirst = propabilityFirst;
	} else {
		if (step == 2) {
			propabilitySecond = Number((1 / counter).toFixed(3));
			console.log(propabilitySecond);
			jointProbabilitySecond = propabilityFirst + propabilitySecond - propabilityFirst * propabilitySecond;
			document.querySelector('.forecast-propability-value').innerHTML = (jointProbabilitySecond * 100).toFixed(2);
		} else {
			if (step == 3) {
				propabilityThird = Number((1 / counter).toFixed(3));
				console.log(propabilityThird)
				jointProbabilityThird = propabilityFirst + propabilitySecond + propabilityThird
					- propabilityFirst * propabilitySecond - propabilityFirst * propabilityThird - propabilitySecond * propabilityThird
					+ propabilityFirst * propabilitySecond * propabilityThird;
				document.querySelector('.forecast-propability-value').innerHTML = (jointProbabilityThird * 100).toFixed(2);
			} else {
				propabilityFourth = Number((1 / counter).toFixed(3));
				console.log(propabilityFourth);
				jointProbabilityFourth = 1 - propabilityFirst * propabilitySecond * propabilityThird * propabilityFourth;
				document.querySelector('.forecast-propability-value').innerHTML = (jointProbabilityFourth * 100).toFixed(2);
			}
		}
	}
}

function forecast() {
	document.querySelectorAll('th')[6].style.backgroundColor = "lightgreen";
	document.querySelector('.forecast-propability-value').classList.add('color');
	for (let i = 6; i < document.querySelectorAll('td').length; i = i + 11) {
		if ((Number(document.querySelectorAll('td')[i].textContent) > normMass * 0.9) && (Number(document.querySelectorAll('td')[i].textContent) < normMass * 1.1)) {
			document.querySelectorAll('td')[i].style.backgroundColor = "lightgreen";
			document.querySelectorAll('td')[i - 6].style.backgroundColor = "lightgreen";
			counterPropability++;
		}
	}
	if (counterPropability != 0) {
		getPropability(counterPropability, 1);
		counterPropability = 0;
	}
}

function refineForecast() {
	if (counter == 0) {
		let relativeWeightPowerPlant = 1846.2 / normMass;
		document.querySelectorAll('.par-value')[0].classList.add('color');
		document.querySelectorAll('.par-value')[0].innerHTML = relativeWeightPowerPlant.toFixed(3);
		document.querySelectorAll('th')[8].style.backgroundColor = "lightgreen";
		resetColorTd();
		for (let i = 8; i < document.querySelectorAll('td').length; i = i + 11) {
			if (((Number(document.querySelectorAll('td')[i].textContent) > relativeWeightPowerPlant * 0.95) &&
				(Number(document.querySelectorAll('td')[i].textContent) < relativeWeightPowerPlant * 1.05)) &&
				(document.querySelectorAll('td')[i - 2].style.backgroundColor == "lightgreen")) {
				document.querySelectorAll('td')[i].style.backgroundColor = "lightgreen";
				document.querySelectorAll('td')[i - 8].style.backgroundColor = "lightgreen";
				counterPropability++;
			}
		}
		if (counterPropability != 0) {
			getPropability(counterPropability, 2);
			counterPropability = 0;
		}
		counter = 1;
	} else {
		if (counter == 1) {
			let relativeMassFuel = 3260 / normMass;
			document.querySelectorAll('.par-value')[1].classList.add('color');
			document.querySelectorAll('.par-value')[1].innerHTML = relativeMassFuel.toFixed(3);
			document.querySelectorAll('th')[9].style.backgroundColor = "lightgreen";
			resetColorTd();
			for (let i = 9; i < document.querySelectorAll('td').length; i = i + 11) {
				if (((Number(document.querySelectorAll('td')[i].textContent) > relativeMassFuel * 0.97) &&
					(Number(document.querySelectorAll('td')[i].textContent) < relativeMassFuel * 1.03)) &&
					(document.querySelectorAll('td')[i - 1].style.backgroundColor == "lightgreen")) {
					document.querySelectorAll('td')[i].style.backgroundColor = "lightgreen";
					document.querySelectorAll('td')[i - 9].style.backgroundColor = "lightgreen";
					counterPropability++;
				}
			}
			if (counterPropability != 0) {
				getPropability(counterPropability, 3);
				counterPropability = 0;
			}
			counter = 2;
		} else {
			let relativeMassSystems = 857.592 / normMass;
			document.querySelectorAll('.par-value')[2].classList.add('color');
			document.querySelectorAll('.par-value')[2].innerHTML = relativeMassSystems.toFixed(3);
			document.querySelectorAll('th')[10].style.backgroundColor = "lightgreen";
			resetColorTd();
			for (let i = 10; i < document.querySelectorAll('td').length; i = i + 11) {
				if (((Number(document.querySelectorAll('td')[i].textContent) > relativeMassSystems * 0.95) &&
					(Number(document.querySelectorAll('td')[i].textContent) < relativeMassSystems * 1.05)) &&
					(document.querySelectorAll('td')[i - 1].style.backgroundColor == "lightgreen")) {
					document.querySelectorAll('td')[i].style.backgroundColor = "lightgreen";
					document.querySelectorAll('td')[i - 10].style.backgroundColor = "lightgreen";
					counterPropability++;
				}
			}
			if (counterPropability != 0) {
				getPropability(counterPropability, 4);
				counterPropability = 0;
			}
			mass = [[1, jointProbabilityFirst], [2, jointProbabilitySecond], [3, jointProbabilityThird], [4, jointProbabilityFourth]];
			console.log(mass);
		}
	}
}

function calculation() {
	setParameter();
	setArea();
	setWorkload();
	setMass();
	// calculationButton.setAttribute('disabled', true);
}

calculationButton.addEventListener("click", calculation);
resetButton.addEventListener("click", resetParametrs)
forecastButton.addEventListener("click", forecast);
refineForecastButton.addEventListener("click", refineForecast);




let selection = d3.selectAll(".graf-content");
console.log(selection);


var height = 500, 
    width = 500, 
    margin=30,
    rawData = [
        {x: 10, y: 67}, {x: 20, y: 74},{x: 30, y: 63},
        {x: 40, y: 56}, {x: 50, y: 24}, {x: 60, y: 26},
        {x: 70, y: 19}, {x: 80, y: 42}, {x: 90, y: 88}
    ],
    data=[];
     
// создание объекта svg

var svg = d3.select("div.graf-content").append("svg")
        .attr("class", "axis")
        .attr("width", width)
        .attr("height", height);
 

console.log(svg);
// длина оси X= ширина контейнера svg - отступ слева и справа
var xAxisLength = width - 2 * margin;     
  
// длина оси Y = высота контейнера svg - отступ сверху и снизу
var yAxisLength = height - 2 * margin;
    
// функция интерполяции значений на ось Х  
var scaleX = d3.scale.linear()
            .domain([0, 100])
            .range([0, xAxisLength]);
             
// функция интерполяции значений на ось Y
var scaleY = d3.scale.linear()
            .domain([100, 0])
            .range([0, yAxisLength]);
// масштабирование реальных данных в данные для нашей координатной системы
for(i=0; i<rawData.length; i++)
    data.push({x: scaleX(rawData[i].x)+margin, y: scaleY(rawData[i].y) + margin});
             
// создаем ось X   
var xAxis = d3.svg.axis()
             .scale(scaleX)
             .orient("bottom");
// создаем ось Y             
var yAxis = d3.svg.axis()
             .scale(scaleY)
             .orient("left");
              
 // отрисовка оси Х             
svg.append("g")       
     .attr("class", "x-axis")
     .attr("transform",  // сдвиг оси вниз и вправо
         "translate(" + margin + "," + (height - margin) + ")")
    .call(xAxis);
 
 // отрисовка оси Y 
svg.append("g")       
    .attr("class", "y-axis")
    .attr("transform", // сдвиг оси вниз и вправо на margin
            "translate(" + margin + "," + margin + ")")
    .call(yAxis);
 
// создаем набор вертикальных линий для сетки   
d3.selectAll("g.x-axis g.tick")
    .append("line")
    .classed("grid-line", true)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", - (yAxisLength));
     
// рисуем горизонтальные линии координатной сетки
d3.selectAll("g.y-axis g.tick")
    .append("line")
    .classed("grid-line", true)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", xAxisLength)
    .attr("y2", 0);
 
// функция, создающая по массиву точек линии
var line = d3.svg.line()
            .x(function(d){return d.x;})
            .y(function(d){return d.y;});
// добавляем путь
svg.append("g").append("path")
.attr("d", line(data))
.style("stroke", "steelblue")
.style("stroke-width", 2);
