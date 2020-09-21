const btn = document.getElementById('btn');
const BASE_URL = `https://cors-anywhere.herokuapp.com/https://status.dev.azure.com/_apis/status/health?api-version=6.0-preview.1`;
const gridOutput = document.getElementById('grid');
const generalStatusOutput = document.getElementById('general-status');

function showLoader(message) {
  const loader = document.getElementById('loading-img');
  if (message === 'true') {
    loader.style.display = 'block';
  } else if (message === 'false') {
    loader.style.display = 'none';
  }
}

async function fetchGeneralStatus() {
  showLoader('true');
  const response = await fetch(BASE_URL);
  const json = await response.json();
  showStatus(json);
}

function showStatus(json) {
  showLoader('false');
  let statusOutput = '';
  statusOutput += `
  <p>LAST UPDATED: ${json.lastUpdated} </p>
<p>Health: ${
    json.status.health === 'advisory' || !'healthy'
      ? `<span class="unhealthy">${json.status.health}</span>`
      : `<span class="healthy">${json.status.health}</span>`
  }</p>
<p>Message: ${
    json.status.message === 'Service maintenance is in effect' ||
    'Availability Degradation'
      ? `<span class="unhealthy">${json.status.message}</span>`
      : `<span class="healthy">${json.status.message}</span>`
  }  </p>
  `;
  generalStatusOutput.innerHTML = statusOutput;
}

async function fetchStatus() {
  showLoader('true')
  const res = await fetch(BASE_URL);
  const data = await res.json();
  showDataDOM(data);
}

function showDataDOM(data) {
  showLoader('false')

  let output = '';
  data.services.forEach((item, i) => {
    output += `
  <div class="card">
  <ul class="list">
    <li> SERVICE: ${item.id}</li>
    <li> COUNTRY: ${item.geographies[i].name}</li>
    <li> REGION: ${item.geographies[i].id}</li>
    <li> STATUS: ${
      item.geographies[i].health === 'healthy'
        ? `<span class='healthy'>${item.geographies[i].health}</span>`
        : `<span class='unhealthy'>${item.geographies[i].health}</span>`
    }</li>
  </ul>
</div>
  
  `;
  });
  gridOutput.innerHTML = output;
}

// EVENT LISTENERS
btn.addEventListener('click', fetchStatus);
document.addEventListener('DOMContentLoaded', fetchGeneralStatus);
