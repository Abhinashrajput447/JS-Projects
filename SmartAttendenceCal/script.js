// Prevent negative input
document.querySelectorAll('#totalClasses, #attendedClasses, #leaveDays').forEach(input => {
  input.addEventListener('input', () => {
    if (input.value < 0) input.value = '';
  });
});

// ================================
// ⭐ INDIVIDUAL CLASS ATTENDANCE
// ================================
document.getElementById("attendanceForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const classType = document.getElementById("classType").value;
  const totalClasses = parseFloat(document.getElementById("totalClasses").value);
  const attendedClasses = parseFloat(document.getElementById("attendedClasses").value);
  const leaveDays = parseFloat(document.getElementById("leaveDays").value) || 0;

  const weights = {
    lecture: 1.0,
    tutorial: 0.5,
    practical: 0.25,
    skill: 0.25
  };

  const weight = weights[classType];
  const totalWithLeave = totalClasses + leaveDays;

  let attended = attendedClasses;
  if (attended > totalWithLeave) attended = totalWithLeave;

  const actualPercent = (attended / totalWithLeave) * 100;
  const weightedContribution = (actualPercent * weight);

  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "block";
  resultDiv.classList.add("show");

  resultDiv.innerHTML = `
    <h2>📚 ${classType.toUpperCase()} Attendance</h2>
    <p><strong>Actual Attendance:</strong> ${actualPercent.toFixed(2)}%</p>
    <p><strong>Weighted:</strong> ${weightedContribution.toFixed(2)}%</p>
  `;
});

// ================================
// ⭐ FIXED OVERALL L-T-P-S CALCULATOR
// ⭐ Uses ONLY available components
// ⭐ Empty inputs = not counted
// ================================
document.getElementById("overallForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Read values, empty = null (not 0)
  const lec = document.getElementById("lecPercent").value;
  const tut = document.getElementById("tutPercent").value;
  const prac = document.getElementById("pracPercent").value;
  const skill = document.getElementById("skillPercent").value;

  // Convert to numbers OR mark as null if empty
  const L = lec === "" ? null : parseFloat(lec);
  const T = tut === "" ? null : parseFloat(tut);
  const P = prac === "" ? null : parseFloat(prac);
  const S = skill === "" ? null : parseFloat(skill);

  // Weight system
  const weightMap = {
    L: 1.0,
    T: 0.5,
    P: 0.25,
    S: 0.25
  };

  // Compute total weight based only on non-null values
  let totalWeight = 0;
  let weightedSum = 0;

  if (L !== null) { totalWeight += weightMap.L; weightedSum += L * weightMap.L; }
  if (T !== null) { totalWeight += weightMap.T; weightedSum += T * weightMap.T; }
  if (P !== null) { totalWeight += weightMap.P; weightedSum += P * weightMap.P; }
  if (S !== null) { totalWeight += weightMap.S; weightedSum += S * weightMap.S; }

  const finalAttendance = (weightedSum / totalWeight).toFixed(2);

  const resultDiv = document.getElementById("overallResult");
  resultDiv.style.display = "block";
  resultDiv.classList.add("show");

  resultDiv.innerHTML = `
    <h2>📊 Overall Attendance</h2>
    <p><strong>Total Attendance:</strong> ${finalAttendance}%</p>
  `;
});
