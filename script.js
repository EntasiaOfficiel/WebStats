function changePage(page){
    window.history.pushState({}, {}, "/"+page);
}

window.onload = function(){
    var rice = document.getElementById('chart').getContext('2d');
    new Chart(rice, {
        type: 'line',
        data: data,
        options: {
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Temps en heure'
                    }
                }],

                yAxes: [{
                    ticks:{
                        min: 0,
                        max: 8,
                        stepSize: 0.5
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'RAM'
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
            x: 10,
            y: 5
        },
        {
            x: 15,
            y: 2
        }]
    }]
}
for(let i=0;i<=24;i++)data.labels.push(i)


var xmlhttp = new XMLHttpRequest()
var url = "http://localhost/code/test.txt"

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText)
    }
}

xmlhttp.open("GET", url, true)
xmlhttp.send()