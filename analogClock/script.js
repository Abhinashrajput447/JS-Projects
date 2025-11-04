setInterval(() => {
    let d = new Date();

    // Get hours, minutes, seconds
    let htime = d.getHours();
    let mtime = d.getMinutes();
    let stime = d.getSeconds();

    // Convert 24-hour format to 12-hour
    htime = htime % 12;

    // Calculate rotations
    let hrotation = 30 * htime + mtime / 2;        // 30° per hour + 0.5° per minute
    let mrotation = 6 * mtime + stime / 10;        // 6° per minute + 0.1° per second (smooth minute hand)
    let srotation = 6 * stime;                     // 6° per second

    // Apply rotations
    document.getElementById("hour").style.transform = `rotate(${hrotation}deg)`;
    document.getElementById("minute").style.transform = `rotate(${mrotation}deg)`;
    document.getElementById("second").style.transform = `rotate(${srotation}deg)`;
}, 1000);
