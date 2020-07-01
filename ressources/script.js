let selectedChart = ""
let selectedNode

for(let i of window.location.search.substring(1).split("&")){
	let s = i.split("=")
	if(s[0]=="chart"){
		selectedChart = s[1]
		break
	}
}

function select(node, update){
	// return
	if(selectedNode){
		selectedNode.className = "unselected"
	}
	selectedNode = node
	selectedNode.className = "selected"
	selectedChart = selectedNode.text

	let requ = new XMLHttpRequest()
	requ.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let json = JSON.parse(this.responseText)
			let ram = []
			let cpu = []
			if(json.ok){
				for(let i=0;i<json.time.length;i++){
					let x = Number(json.time[i])
					let y = round(json.ram[i]*MAXGO/MAXRAM)
					ram.push({x:x, y:y})
					cpu.push({x:x, y:json.cpu[i]})
				}
				config.datasets[0].data = ram
				config.datasets[1].data = cpu
				CHART.update()
			}else{
				console.log(json)
				alert("Graphique demandé invalide !")
			}
		}
	}
	
	requ.open("GET", "api.php?chart="+selectedChart, true)
	requ.send()

	if(update){
		let normal = document.URL.substr(8).split("/")
		normal.pop()	
		normal.shift()
		console.log(normal)	
		window.history.pushState({}, {}, "?chart="+selectedChart)
	}
}


addEventListener('load',() => { // load tree
	loadChart()

	let a = document.getElementById("menu").children[0]
	a.onclick = clickCheck
	a.children[0].style["border-left"] = "1px solid gray"

	for(let i of a.children){
		if(i.children[0].text==selectedChart){
			select(i.children[0])
		}else{
			i.children[0].className = "unselected"
		}
	}
})

function clickCheck(e){
	if(e.target.nodeName=="A"&&e.target.text!=selectedChart){
		select(e.target, true)
	}
}
