const btn = document.getElementById('btn');
const BASE_URL = `https://status.dev.azure.com/_apis/status/health?api-version=6.0-preview.1`;
const gridOutput = document.getElementById('grid');
async function fetchStatus() {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  showDataDOM(data);
}

function showDataDOM(data) {
  let output = '';
  data.services.forEach((item, i) => {
    output += `
  <div class="card">
  <p>id:</p>
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
