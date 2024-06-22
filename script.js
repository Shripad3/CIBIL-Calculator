document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const income = parseFloat(document.getElementById("income").value);
    const loan = parseFloat(document.getElementById("loan").value);
    const numberOfLoans = parseInt(document.getElementById("n-loans").value);
    const failedLoans = parseInt(document.getElementById("f-loans").value);

    console.log("Income:", income);
    console.log("Loan:", loan);
    console.log("Number of Loans:", numberOfLoans);
    console.log("Failed Loans:", failedLoans);

    const errorElement = document.getElementById("error-message");
    const resultElement = document.getElementById("result");

    errorElement.innerHTML = "";
    resultElement.innerHTML = "";

    if (
      isNaN(income) ||
      isNaN(loan) ||
      isNaN(numberOfLoans) ||
      isNaN(failedLoans)
    ) {
      errorElement.innerHTML = "Please enter valid numbers in all fields.";
      return;
    }

    const cibilScore = calculateCibilScore(
      income,
      loan,
      numberOfLoans,
      failedLoans
    );

    console.log("CIBIL Score:", cibilScore);

    resultElement.innerHTML = `Your CIBIL score is: ${cibilScore}`;
  });

  function calculateCibilScore(income, loan, numberOfLoans, failedLoans) {
    let score = 300;

    const incomeFactor = income / 100000;
    const loanFactor = loan / 50000;
    const loanRatio = loan / income;
    const failedLoanPenalty = failedLoans * 20;

    score += incomeFactor * 50;
    score -= loanFactor * 20;
    score -= loanRatio * 50;
    score -= numberOfLoans * 10;
    score -= failedLoanPenalty;

    if (score > 900) score = 900;
    if (score < 300) score = 300;

    return Math.round(score);
  }
});
