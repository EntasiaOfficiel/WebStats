let CHART

function changePage(page){
	window.history.pushState({}, {}, "/"+page);
}

function round(int, n=2){
	return Math.round(int*10**n)/10**n
}

function zero(int){
	let s = String(int)
	if(s.length==1)return "0"+s
	else return s
}

var config = {
	labels: [],
	datasets : [{
		label : 'RAM',
		fillColor : "rgba(0,0,0,0.4)",
		strokeColor : "#000000",
		pointColor : "#000000",
		pointStrokeColor : "#000000",
		pointRadius: 50,
		pointHoverRadius: 10,
		pointStyle: new Image(40, 40),
		data: []
	}]
}
for(let i=0;i<=288;i++){
	config.labels.push(i)
}

var options = {
	tooltips: {
		callbacks: {
			title : (a)=>{
				let result = config.datasets[0].data[a[0].xLabel].x
				return zero(Math.floor(result/12))+":"+zero(result%12*5)
			},
			label : (a)=>{
				return [round(a.yLabel, 2)+ "Go libres", round(a.yLabel*1024, 0)+" Mo libres"]
			}
		}
	},
	scales: {
		xAxes: [{
			display: true,
			ticks: {
				autoSkip: false,
				callback : (a, b)=>{
					if(b%12==0){
						return b/12
					}
				}
			}
		}],

		yAxes: [{
			ticks:{
				min: 0,
				max: 8,
				stepSize: 0.5,
				callback : (a)=>{
					if(a==MAXGO)return "Vide"
					else if(a==0)return "Crash"
					else return a+"Go"
				}
			},
			display: true,
			scaleLabel: {
				display: true,
				labelString: 'RAM'
			}
		}]
	}
}

window.onload = function(){
	var rice = document.getElementById('chart').getContext('2d');
	CHART = new Chart(rice, {
		type: 'line',
		data: config,
		options: options
	})
}

const MAXRAM = 8594128896
const MAXGO = 8
const requ = new XMLHttpRequest()
const url = "http://localhost/api.php?chart=06.01"

requ.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		let json = JSON.parse(this.responseText)
		let d = []

		for(let i=0;i<json.time.length;i++){
			let x = Number(json.time[i])
			let y = round(json.ram[i]*MAXGO/MAXRAM)
			d.push({x:x, y:y})
		}
		config.datasets[0].data = d
		CHART.update()
	}
}

requ.open("GET", url, true)
requ.send()