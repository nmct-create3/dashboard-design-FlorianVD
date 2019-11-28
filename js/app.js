let daySelect, graph;
const endpoint = 'https://iotcloud-nmct.azurewebsites.net/api/visitors/$$day$$';

const renderChart = (values) => {
  console.log(values);
  let ctx = graph.getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: generateWeeks(),
      datasets: [{
        label: "# of visitors",
        borderColor: '#A3A0FB',
        backgroundColor: '#F0F0F7B3',
        data: values
      }]
    },
    options: {
      scales: {
        yAxes: [{
            ticks: {
                min: 0,
                max: 50
            }
        }]
      }
    }
  });
}

const generateWeeks = () => {
  const weeks = [];
  for (let i = 1; i < 8; i++) {
    weeks.push('Week ' + i);
  }
  return weeks;
}

const parseData = (raw) => {
  const tmp = [];

  for (let obj of raw) {
    tmp.push(obj.AantalBezoekers);
  }

  return tmp;
}

const getVisitorsByDay = () => {
  const day = daySelect.value.toLowerCase();

  fetch(endpoint.replace('$$day$$', day))
    .then(res => {
      if (res.ok)
        return res.json();
    })
    .then(data => {
      const processed = parseData(data);
      renderChart(processed);
    })
}

const init = () => {
  daySelect = document.querySelector('.js-select-day');
  graph = document.querySelector('.js-graph');

  daySelect.addEventListener('change', getVisitorsByDay);
  getVisitorsByDay();
}

document.addEventListener('DOMContentLoaded', init);