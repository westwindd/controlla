// add hovered class to selected list item

window.onload = function() {
  var currencySymbol = 'R$';
  var ctx = document.getElementById('financialChart').getContext('2d');
  var financialChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'], // Example months
          datasets: [
              // Assuming this is your profits dataset
              {
                  label: 'Profits',
                  data: [25.90, 700, 550, 800, 650, 900], // Example profit data
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.3)',
                  fill: true,
                  tension: 0.4
              },
              // Assuming this is your spending dataset
              {
                  label: 'Spending',
                  data: [300, 400, 350, 500, 450, 600], // Example spending data
                  borderColor: 'rgba(255, 99, 132, 1)',
                  backgroundColor: 'rgba(255, 99, 132, 0.3)',
                  fill: true,
                  tension: 0.4
              }
              // Add other datasets as needed
          ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                mode: 'index',
                callbacks: {
                    afterBody: function(tooltipItems) {
                        let profit = tooltipItems[0].parsed.y;
                        let spending = tooltipItems[1].parsed.y;
                        let balance = profit - spending;
                        let balanceFormatted = balance.toFixed(2); // Ensures two decimal places
                        let balanceDisplay = balance >= 0 ? `Positive (${currencySymbol}${balanceFormatted})` : `Negative (${currencySymbol}${Math.abs(balanceFormatted)})`;
                        
                        return `Balance: ${balanceDisplay}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return currencySymbol + value.toFixed(2);
                    }
                }
            }
        }
    }
});
};
let list = document.querySelectorAll(".navigation li");
// script.js
// Adjusted to directly target the .brand-name class
document.addEventListener('DOMContentLoaded', function() {
  const brandNameElement = document.querySelector('.navigation .brand-name');
  if (brandNameElement) {
    brandNameElement.textContent = 'Controlla'; // Insert 'Controlla' as the brand name
  }
});



function activeLink() {

  list.forEach((item) => {

    item.classList.remove("hovered");

  });

  this.classList.add("hovered");

}



list.forEach((item) => item.addEventListener("mouseover", activeLink));



// Menu Toggle

let toggle = document.querySelector(".toggle");

let navigation = document.querySelector(".navigation");

let main = document.querySelector(".main");



toggle.onclick = function () {

  navigation.classList.toggle("active");

  main.classList.toggle("active");

};

