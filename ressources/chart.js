function round(int, n=2){
	return Math.round(int*10**n)/10**n
}

function zero(int){
	let s = String(int)
	if(s.length==1)return "0"+s
	else return s
}

let CHART

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


function loadChart() {
	var element = document.getElementById('chart').getContext('2d');
	CHART = new Chart(element, {
		type: 'line',
		data: config,
		options: options
	})
}