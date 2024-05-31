function generateWavyData(length, amplitude, frequency, delay) {
    var data = [];
    for (var i = 1; i < length; i++) {
        var angle = ((i + delay) / length) * Math.PI * frequency;
        var value = Math.sin(angle) * amplitude + 50;
        data.push(value.toFixed(2));
    }
    return data;
}

var chartData = {
    labels: Array.from(Array(31).keys()),
    datasets: [{
        borderColor: '#FF2424',
        borderWidth: 2,
        data: generateWavyData(32, 10, 2, 10)
    }, {
        borderColor: '#F1972E',
        borderWidth: 2,
        data: generateWavyData(32, 15, 1.5, 15)
    }, {
        borderColor: '#FDDE3E',
        borderWidth: 2,
        data: generateWavyData(32, 15, 1.5, 9)
    }, {
        borderColor: '#D0FD3E',
        borderWidth: 2,
        data: generateWavyData(32, 15, 1.5, 4)
    }, {
        borderColor: '#49CCCC',
        borderWidth: 2,
        data: generateWavyData(32, 15, 1.5, 24)
    }]
};

var ctx = document.getElementById('myChart').getContext("2d");

var myChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
        elements: {
            point: {
                radius: 0,
                hoverRadius: 0,
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        scales: {
            y: {
                position: 'right'
            }
        }
    }
});