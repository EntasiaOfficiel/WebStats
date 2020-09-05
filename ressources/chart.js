const MAXRAM = 17179869184
const MAXGO = 16

function round(int, n=2){
	return Math.round(int*10**n)/10**n
}

function zero(int){
	let s = String(int)
	if(s.length==1)return "0"+s
	else return s
}

const colors = { // from Chart.js utils
	red: [255, 99, 132],
	orange: [255, 159, 64],
	yellow: [255, 205, 86],
	green: [75, 192, 192],
	blue: [54, 162, 235],
	purple: [53, 102, 255],
	grey: [201, 203, 20]
}

function color(color, alpha=0.6){
	let c = colors[color]
	console.log(c)
	if(c==null)return "rgb(0, 0, 0)"
	else{
		return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`
	}
}

let CHART

var config = {
	labels: [],
	datasets : [
	{
		label : 'RAM',
		backgroundColor: color("yellow"),
		borderColor: color("yellow", 1),
		pointRadius: 50,
		pointStyle: new Image(40, 40),
		yAxisID: 'ram',
		data: []
	},
	{
		label : '%CPU',
		backgroundColor: color("blue"),
		borderColor: color("blue", 1),
		pointRadius: 50,
		pointStyle: new Image(40, 40),
		yAxisID: 'cpu',
		data: []
	}
]
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
				if(a.datasetIndex==0){
					return [round(a.yLabel, 2)+ "Go utilisés", round(MAXGO-a.yLabel, 2)+"Go libres",
				]
				}else if(a.datasetIndex==1){
					return [round(a.yLabel, 2)+ "% utilisé", round(100-a.yLabel, 2)+"% disponibles"]
				}else return a.yLabel
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
			id: "ram",
			type: 'linear',
			display: true,
			position: 'left',
			ticks:{
				min: 0,
				max: MAXGO,
				stepSize: 0.5,
				callback : (a)=>{
					if(a==MAXGO)return "Crash"
					else if(a==0)return "Vide"
					else return a+"Go utilisés"
				}
			},
			display: true,
			scaleLabel: {
				display: true,
				labelString: 'RAM utilisée'
			}
		},{
			id: "cpu",
			type: 'linear',
			position: 'right',
			ticks:{
				min: 0,
				max: 100,
				stepSize: 10,
				callback : (a)=>{
					if(a==100)return "Crash"
					else if(a==0)return "Rien"
					else return a+"%"
				}
			},
			display: true,
			scaleLabel: {
				display: true,
				labelString: 'Pourcentage CPU utilisé'
			},


			gridLines: {
				drawOnChartArea: false,
			},
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