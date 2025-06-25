let timers = [0, 0];
let intervals = [null, null];

function updateDisplay(index) {
  const hours = String(Math.floor(timers[index - 1] / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((timers[index - 1] % 3600) / 60)).padStart(2, '0');
  const seconds = String(timers[index - 1] % 60).padStart(2, '0');
  document.getElementById('timer' + index).textContent = `${hours}:${minutes}:${seconds}`;
}

function startTimer(index) {
  if (intervals[index - 1]) return;
  intervals[index - 1] = setInterval(() => {
    timers[index - 1]++;
    updateDisplay(index);
  }, 1000);
}

function pauseTimer(index) {
  clearInterval(intervals[index - 1]);
  intervals[index - 1] = null;
}

function resetTimer(index) {
  pauseTimer(index);
  timers[index - 1] = 0;
  updateDisplay(index);
}

function registerTime(index) {
  const title = document.getElementById('title' + index).value || 'Untitled';
  const activity = document.getElementById('activity' + index).value;
  const time = document.getElementById('timer' + index).textContent;
  const row = document.createElement('tr');
  row.innerHTML = `<td>${title}</td><td>${activity}</td><td>${time}</td>`;
  document.getElementById('logTable').appendChild(row);

  // Show table container on first record
  document.getElementById('tableContainer').style.display = 'block';
}

function clearTableRows() {
  const tbody = document.getElementById('logTable');
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
  // Reset both timers to 0 and update display
  timers[0] = 0;
  timers[1] = 0;
  updateDisplay(1);
  updateDisplay(2);

  // Hide table container when cleared
  document.getElementById('tableContainer').style.display = 'none';
}

// Add this function for clearing input fields
function clearInput(inputId) {
  document.getElementById(inputId).value = '';
  toggleClearBtn(inputId);
}

// Show/hide clear button based on input value
function toggleClearBtn(inputId) {
  const input = document.getElementById(inputId);
  const btn = document.getElementById('clear-btn-' + inputId);
  if (input.value && input.value.length > 0) {
    btn.style.display = 'flex';
  } else {
    btn.style.display = 'none';
  }
}

// Initialize clear button visibility on page load
window.addEventListener('DOMContentLoaded', () => {
  toggleClearBtn('title1');
  toggleClearBtn('title2');
});