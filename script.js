document.addEventListener('DOMContentLoaded', function() {
    function updateTime() {
        const timeElement = document.getElementById('time');
        const now = new Date();
        const formattedTime = now.toLocaleString();
        timeElement.textContent = formattedTime;
        highlightTimes(now);
    }

    function populateTable() {
        const tbody = document.querySelector('tbody');
        const data = [
            { chaharrah: '7:35 AM', daneshgah: '0:00 AM' },
            { chaharrah: '8:40 AM', daneshgah: '8:20 AM' },
            { chaharrah: '9:05 AM', daneshgah: '8:45 AM' },
            { chaharrah: '9:55 AM', daneshgah: '9:35 AM' },
            { chaharrah: '10:35 AM', daneshgah: '10:15 AM' },
            { chaharrah: '11:20 AM', daneshgah: '11:00 AM' },
            { chaharrah: '11:50 AM', daneshgah: '11:30 AM' },
            { chaharrah: '12:20 PM', daneshgah: '12:00 PM' },
            { chaharrah: '0:00 PM', daneshgah: '12:30 PM' },
            { chaharrah: '1:20 PM', daneshgah: '1:00 PM' },
            { chaharrah: '1:40 PM', daneshgah: '1:20 PM' },
            { chaharrah: '2:10 PM', daneshgah: '1:50 PM' },
            { chaharrah: '2:50 PM', daneshgah: '2:30 PM' },
            { chaharrah: '3:30 PM', daneshgah: '3:10 PM' },
            { chaharrah: '3:50 PM', daneshgah: '3:30 PM' },
            { chaharrah: '4:10 PM', daneshgah: '3:50 PM' },
            { chaharrah: '4:35 PM', daneshgah: '4:15 PM' },
            { chaharrah: '5:05 PM', daneshgah: '4:45 PM' },
            { chaharrah: '0:00 PM', daneshgah: '5:40 PM' },
            { chaharrah: '0:00 PM', daneshgah: '6:15 PM' },
            { chaharrah: '0:00 PM', daneshgah: '7:10 PM' },
        ];

        data.forEach(item => {
            const row = document.createElement('tr');
            const cell1 = document.createElement('td');
            const cell2 = document.createElement('td');
            
            cell1.textContent = item.chaharrah;
            cell2.textContent = item.daneshgah;
            
            row.appendChild(cell1);
            row.appendChild(cell2);
            tbody.appendChild(row);
        });
    }

    function highlightTimes(now) {
        const rows = document.querySelectorAll('tbody tr');
        const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes
        rows.forEach(row => {
            const chaharrahTime = getMinutesFromTime(row.cells[0].textContent);
            const daneshgahTime = getMinutesFromTime(row.cells[1].textContent);
            
            const highlightCell = (cellTime, cell) => {
                const diff = cellTime - currentTime;
                if (diff > 0) { // Future time
                    cell.style.backgroundColor = 'green';
                } else if (diff <= 0 && diff >= -15) { // Within 15 minutes or less
                    cell.style.backgroundColor = 'yellow';
                } else { // Past time
                    cell.style.backgroundColor = 'lightgrey';
                }
            };
            
            highlightCell(chaharrahTime, row.cells[0]);
            highlightCell(daneshgahTime, row.cells[1]);
        });
    }

    function getMinutesFromTime(timeString) {
        const [time, modifier] = timeString.split(' ');
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours, 10);
        minutes = parseInt(minutes, 10);
        if (modifier === 'PM' && hours !== 12) {
            hours += 12;
        }
        if (modifier === 'AM' && hours === 12) {
            hours = 0;
        }
        return hours * 60 + minutes; // Convert time to minutes
    }
    function refreshTable() { populateTable(); updateTime(); }

    setInterval(updateTime, 1000);
    updateTime(); // Initial call to display the time immediately
    populateTable(); // Call to populate the table
});
