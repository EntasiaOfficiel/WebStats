let CHART

function changePage(page){
    window.history.pushState({}, {}, "/"+page);
}

window.onload = function(){
    var rice = document.getElementById('chart').getContext('2d');
    CHART = new Chart(rice, {
        type: 'line',
        data: data,
        options: {
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
                    // scaleLabel: {
                    //     display: true,
                    //     labelString: 'Temps en heure'
                    // }
                }],

                yAxes: [{
                    ticks:{
                        min: 0,
                        max: 8,
                        stepSize: 0.5,
                        callback : (a)=>{
                            return a+"Go"
                        }
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'RAMa'
                    }
                }]
            }
        }
    })
}
var data = {
    labels: [],
    datasets : [{
        label : 'RAM',
        fillColor : "rgba(172,194,132,0.4)",
        strokeColor : "#ACC26D",
        pointColor : "#fff",
        pointStrokeColor : "#9DB86D",
        data: [{
            x: 0,
            y: 5
        },
        {
            x: 17,
            y: 2
        }]
    }]
}
for(let i=0;i<=288;i++){
    data.labels.push(i)
}

const MAXRAM = 8594128896
const requ = new XMLHttpRequest()
const url = "http://localhost/api.php?chart=06.01"

// requ.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         // console.log(this.responseText)
//         let json = JSON.parse(this.responseText)
//         let d = []

//         for(let i=0;i<json.time.length;i++){
//             let x = Number(json.time[i])
//             let y = r(json.ram[i]*8/MAXRAM)
//             d.push({x:x, y:y})
//         }
        
//         // d.push({x:0, y:2})
//         // d.push({x:2, y:4})
//         // d.push({x:3, y:2})
//         // d.push({x:5, y:6})
//         // d.push({x:9, y:2})
//         // d.push({x:12, y:5})
//         console.log(d)
//         data.datasets[0].data = d
//         CHART.update()
//     }
// }

// requ.open("GET", url, true)
// requ.send()