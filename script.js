const table = document.getElementById('rosterTable');

function fetchData(endpoint) {
  return fetch(endpoint)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      throw error;
    });
}

function fetchDataAndDisplay() {
  const dateInput = document.getElementById('date');
  const specificDate = dateInput.value;
  const rosterEndpoint = `http://localhost:4567/roster/${specificDate}`;
  const shiftsEndpoint = `http://localhost:4567/shift/${specificDate}`;

  Promise.all([fetchData(rosterEndpoint), fetchData(shiftsEndpoint)])
    .then(([rosterData, shiftsData]) => {
      console.log('Roster data:', rosterData);
      console.log('Shifts data:', shiftsData);
      const tbody = document.querySelector('tbody');
      const trow = document.createElement('tr');

      //date
      const date = document.createElement('td');
      date.textContent = rosterData[0].date;

      //rostered start
      const rStart = document.createElement('td');
      const rStartTime = rosterData[0].start.slice(11, 16);
      rStart.textContent = rStartTime;

      //actual start
      const aStart = document.createElement('td');
      const aStartTime = shiftsData[0].start.slice(11, 16);
      aStart.title = aStartTime;

      //check if they were ontime
      let ontime = true;
      let minutesLate = 0;
      if (aStartTime > rStartTime) {
        ontime = false;
        minutesLate =
          aStartTime.replaceAll(':', '') - rStartTime.replaceAll(':', '');
        //console.log("minutes late:", minutesLate)
      }

      //Change appeareance if late
      if (ontime === false) {
        aStart.innerHTML = `Late by ${minutesLate} minutes`;
        aStart.style.color = 'red';
      } else {
        aStart.textContent = 'On Time';
      }
      //console.log(ontime)

      //rostered finish
      const rFinish = document.createElement('td');
      const rFinishTime = rosterData[0].finish.slice(11, 16);
      rFinish.textContent = rFinishTime;

      //actual finish
      const aFinish = document.createElement('td');
      let aFinishTime = shiftsData[0].finish;

      if (shiftsData[0].finish === null) {
        aFinish.textContent = 'No finish time clocked';
        aFinish.title = 'No finish time clocked'
      } else {
        aFinishTime = shiftsData[0].finish.slice(11, 16);
        aFinish.title = aFinishTime;

        //Check if they left early
        let leftOntime = true;
        let minutesEarly = 0;
        if (aFinishTime < rFinishTime) {
          leftOntime = false;
          minutesEarly =
            rFinishTime.replaceAll(':', '') - aFinishTime.replaceAll(':', '');
          //console.log("minutes early:", minutesEarly)
        }

        //Change appeareance if left early...
        if (leftOntime === false) {
          if (minutesEarly < 60) {
            aFinish.innerHTML = `Left ${minutesEarly} minutes early.`;
            aFinish.style.color = 'red';
          } else {
            minutesEarly /= 60;
            aFinish.innerHTML = `Left ${minutesEarly} hours early.`;
            aFinish.style.color = 'red';
          }
        } else {
          aFinish.textContent = aFinishTime;
        }
      }

      //append to table
      trow.append(date, rStart, aStart, rFinish, aFinish);
      tbody.appendChild(trow);
    })
    .catch((error) => {
      console.error('Failed to fetch data:', error);
    });
}

document.getElementById('date').addEventListener('change', fetchDataAndDisplay);
