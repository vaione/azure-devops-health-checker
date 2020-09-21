const btn = document.getElementById('btn');
const BASE_URL = `https://status.dev.azure.com/_apis/status/health?api-version=6.0-preview.1`;
const gridOutput = document.getElementById('grid')
async function fetchStatus() {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  showDataDOM(data);
}

function showDataDOM(data) {
  let output = '';
  data.services.forEach((item) => {
    output += `
  <div class="card">
  <p>id:</p>
  <ul class="list">
    <li>${item.id}</li>
    <li>${item.geographies.name}</li>
    <li>${item.geographies.health}</li>
  </ul>
</div>
  
  `;
  });
  gridOutput.innerHTML = output;
}

// EVENT LISTENERS
btn.addEventListener('click', fetchStatus);
