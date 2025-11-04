// Prevent negative input in real time
document.querySelectorAll('#totalClasses, #attendedClasses, #leaveDays').forEach(input => {
  input.addEventListener('input', () => {
    if (input.value < 0) input.value = ''; // clear invalid entry immediately
  });
});

document.getElementById("attendanceForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const classType = document.getElementById("classType").value;
  const totalClasses = parseFloat(document.getElementById("totalClasses").value);
  const attendedClasses = parseFloat(document.getElementById("attendedClasses").value);
  const leaveDays = parseFloat(document.getElementById("leaveDays").value) || 0;

  if (!classType || isNaN(totalClasses) || totalClasses <= 0 || isNaN(attendedClasses)) {
    return; // stop silently if invalid
  }

  const maxPossible = totalClasses + leaveDays;
  let attended = attendedClasses;
  let capWarning = "";
  if (attended > maxPossible) {
    capWarning = `⚠️ Note: attended (${attended}) is greater than total+leave (${maxPossible}). Using attended = ${maxPossible} for calculations.`;
    attended = maxPossible;
  }

  const weights = {
    lecture: 1.0,
    tutorial: 0.5,
    practical: 0.25,
    skill: 0.25
  };

  const weight = weights[classType];

  const totalWithLeave = maxPossible;
  const actualPercent = (attended / totalWithLeave) * 100;
  const weightedContribution = (actualPercent * weight);
  const missed = totalClasses - attendedClasses >= 0 ? (totalClasses - attendedClasses) : 0;

  const title = classType.charAt(0).toUpperCase() + classType.slice(1);
  const resultDiv = document.getElementById("result");

  let badgeClass = "badge.good";
  let badgeText = "Good";
  if (actualPercent < 60) { badgeClass = "badge.bad"; badgeText = "Critical"; }
  else if (actualPercent < 75) { badgeClass = "badge.warn"; badgeText = "Below 75%"; }

  resultDiv.style.display = "block";
  resultDiv.classList.add("show");
  resultDiv.innerHTML = `
    <h2>📚 ${title} Attendance</h2>
    <p><strong>Total Classes Conducted:</strong> ${totalClasses}</p>
    <p><strong>Classes Attended:</strong> ${attendedClasses}</p>
    <p><strong>Planned Leaves:</strong> ${leaveDays}</p>
    <p><strong>Effective Total (total + leave):</strong> ${totalWithLeave}</p>
    <p><strong>Classes Missed (from total):</strong> ${missed}</p>
    <hr style="margin:10px 0; opacity:0.08;">
    <p><strong>Actual Attendance:</strong> <span style="font-weight:800; color:#062021">${actualPercent.toFixed(2)}%</span></p>
    <p><strong>Weighted Contribution (${(weight*100).toFixed(0)}% weight):</strong> <span style="font-weight:800; color:#062021">${weightedContribution.toFixed(2)}%</span></p>
    <p style="margin-top:8px;">
      <span class="badge ${badgeText === 'Good' ? 'good' : badgeText === 'Below 75%' ? 'warn' : 'bad'}">${badgeText}</span>
    </p>
    ${capWarning ? `<p style="margin-top:8px;color:#b45309">${capWarning}</p>` : ""}
    <p style="margin-top:8px;font-size:0.95rem;color:#0b3b37">Tip: Combine weighted contributions of different types to get your overall L-T-P-S attendance score.</p>
  `;

  // ✅ Smooth scroll to show result automatically
  resultDiv.scrollIntoView({ behavior: "smooth", block: "center" });
});
