<script>
export default {
  mounted() {
    // Function to generate wavy data
    function generateWavyData(length, amplitude, frequency, delay) {
      var data = [];
      for (var i = 1; i < length; i++) {
        var angle = ((i + delay) / length) * Math.PI * frequency;
        var value = Math.sin(angle) * amplitude + 50;
        data.push(value.toFixed(2));
      }
      return data;
    }

    // Chart data
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

    // Get canvas context
    var ctx = document.getElementById('myChart').getContext('2d');

    // Create Chart instance
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
  }
}
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="statistics bg-gray">
          <div class="statistics-block d-flex align-items-center">
            <span class="circle red"></span>
            <span><router-link to="subscription">Абонемент</router-link></span>
            <span class="circle orange"></span>
            <span>Курсы (групповые)</span>
            <span class="circle yellow"></span>
            <span>Курсы (индивидуальные)</span>
            <span class="circle lim"></span>
            <span>Новые пользователи</span>
            <span class="circle blue"></span>
            <span>Услуги</span>
          </div>
          <canvas id="myChart" style="min-width: 100%;min-height: 330px;max-height: 330px" ></canvas>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="statistics bg-gray">
          <div class="d-flex justify-content-between">
            <div class="load-title">Нагруженность зала</div>
            <div class="d-flex">
              <div class="load-info text-center">
                <div class="time">08:00</div>
                <div class="load-level">Мин. нагруженность</div>
              </div>
            </div>
            <div class="d-flex">
              <div class="load-info text-center">
                <div class="time">15:00</div>
                <div class="load-level">Мин. нагруженность</div>
              </div>
            </div>
            <div class="d-flex">
              <div class="load-info text-center">
                <div class="time high-load">13:00</div>
                <div class="load-level">Мин. нагруженность</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>