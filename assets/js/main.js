const updateMainContent = (html) => {
  document.getElementById('main-content').innerHTML = html;
};

const renderMembershipPage = () => {

  updateMainContent(`
    <div class="topbar">
    <div class="toggle">
      <ion-icon name="menu-outline"></ion-icon>
    </div>
    <div class="search">
      <label>
        <input type="text" placeholder="Search here">
        <ion-icon name="search-outline"></ion-icon>
      </label>
    </div>
    <div class="user">
      <img src="assets/imgs/customer01.jpg" alt="">
    </div>
  </div>
    <div class="membership-page">
  <h1>Memberships</h1>
  <p>Here you can manage your memberships.</p>
  <div class="membership-cards-container" id="membershipCardsContainer">
    <!-- Membership cards will be dynamically inserted before the button -->
<button id="addMembershipButton" class="button">
<span class="button_lg">
  <span class="button_sl"></span>
  <span class="button_text">+</span> <!-- Changed text to match functionality -->
</span>
</button>
</div>
</div>

    `);

  // Add the initial membership card
  addMembershipCard();

  // Event listener for the "Add" button
  document.getElementById('addMembershipButton').addEventListener('click', addMembershipCard);
};

const addMembershipCard = () => {
  const cardHTML = `
    <div class="membership-card work">
      <div class="membership-img-section">
      <svg xmlns="http://www.w3.org/2000/svg" height="77" width="76"><path fill-rule="nonzero" fill="#3F9CBB" d="m60.91 71.846 12.314-19.892c3.317-5.36 3.78-13.818-2.31-19.908l-26.36-26.36c-4.457-4.457-12.586-6.843-19.908-2.31L4.753 15.69c-5.4 3.343-6.275 10.854-1.779 15.35a7.773 7.773 0 0 0 7.346 2.035l7.783-1.945a3.947 3.947 0 0 1 3.731 1.033l22.602 22.602c.97.97 1.367 2.4 1.033 3.732l-1.945 7.782a7.775 7.775 0 0 0 2.037 7.349c4.49 4.49 12.003 3.624 15.349-1.782Zm-24.227-46.12-1.891-1.892-1.892 1.892a2.342 2.342 0 0 1-3.312-3.312l1.892-1.892-1.892-1.891a2.342 2.342 0 0 1 3.312-3.312l1.892 1.891 1.891-1.891a2.342 2.342 0 0 1 3.312 3.312l-1.891 1.891 1.891 1.892a2.342 2.342 0 0 1-3.312 3.312Zm14.19 14.19a2.343 2.343 0 1 1 3.315-3.312 2.343 2.343 0 0 1-3.314 3.312Zm0 7.096a2.343 2.343 0 0 1 3.313-3.312 2.343 2.343 0 0 1-3.312 3.312Zm7.096-7.095a2.343 2.343 0 1 1 3.312 0 2.343 2.343 0 0 1-3.312 0Zm0 7.095a2.343 2.343 0 0 1 3.312-3.312 2.343 2.343 0 0 1-3.312 3.312Z"></path></svg>   
      </div>
      <div class="membership-card-desc">
        <div class="membership-card-header">
          <div class="membership-card-title">Play</div>
          <div class="membership-card-menu">
            <div class="membership-dot"></div>
            <div class="membership-dot"></div>
            <div class="membership-dot"></div>
          </div>
        </div>
        <div class="membership-card-time">32hrs</div>
        <p class="membership-recent">Last Week-36hrs</p>
      </div>
    </div>
  `;

  // Append the new card to the container

  // Select the "Add" button
  const addButton = document.getElementById('addMembershipButton');

  // Insert the new card before the "Add" button
  addButton.insertAdjacentHTML('beforebegin', cardHTML);
};

function renderDashBoard() {

  document.getElementById('main-content').innerHTML = `
    <div class="topbar">
    <div class="toggle">
      <ion-icon name="menu-outline"></ion-icon>
    </div>
    <div class="search">
      <label>
        <input type="text" placeholder="Search here">
      </label>
    </div>
    <div class="user">
      <img src="assets/imgs/customer01.jpg" alt="">
    </div>
  </div>
    <!-- ======================= Cards ================== -->
    <div class="cardBox">
      <div class="card">
        <div>
          <div class="numbers">1,504</div>
          <div class="cardName">Alerts</div>
        </div>
        <div class="iconBx">
          <ion-icon name="eye-outline"></ion-icon>
        </div>
      </div>
      <div class="card">
        <div>
          <div class="numbers">80</div>
          <div class="cardName">Memberships</div>
        </div>
        <div class="iconBx">
          <ion-icon name="cart-outline"></ion-icon>
        </div>
      </div>
      <div class="card">
        <div>
          <div class="numbers">284</div>
          <div class="cardName">Due Bills</div>
        </div>
        <div class="iconBx">
          <ion-icon name="chatbubbles-outline"></ion-icon>
        </div>
      </div>
      <div class="card">
        <div>
          <div class="numbers">R$7,842</div>
          <div class="cardName">Current Balance</div>
        </div>
        <div class="iconBx">
          <ion-icon name="cash-outline"></ion-icon>
        </div>
      </div>
    </div>
      <!-- Canvas element where the chart will be rendered -->
<div class = "chart-container">
  <canvas id="financialChart"></canvas>
</div>
    <!-- ================ Order Details List ================= -->
    <div class="details">
      <div class="recentOrders">
        <div class="cardHeader">
          <h2>All Bills</h2>
          <a href="#" class="btn">View All</a>
        </div>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Price</td>
              <td>Payment</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Star Refrigerator</td>
              <td>$1200</td>
              <td>Paid</td>
            </tr>
            <tr>
              <td>Dell Laptop</td>
              <td>$110</td>
              <td>Due</td>
            </tr>
            <tr>
              <td>Apple Watch</td>
              <td>$1200</td>
              <td>Paid</td>
            </tr>
            <tr>
              <td>Addidas Shoes</td>
              <td>$620</td>
              <td>Due</td>
            </tr>
            <tr>
              <td>Star Refrigerator</td>
              <td>$1200</td>
              <td>Paid</td>
            </tr>
            <tr>
              <td>Dell Laptop</td>
              <td>$110</td>
              <td>Due</td>
            </tr>
            <tr>
              <td>Apple Watch</td>
              <td>$1200</td>
              <td>Paid</td>
            </tr>
            <tr>
              <td>Addidas Shoes</td>
              <td>$620</td>
              <td>Due</td>
            </tr>
          </tbody>
        </table>
      </div>
    
    `;
  initializeChart();
};

const initializeChart = () => {
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
            afterBody: function (tooltipItems) {
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
            callback: function (value) {
              return currencySymbol + value.toFixed(2);
            }
          }
        }
      }
    }
  });
};

const navigationLinks = document.querySelectorAll(".navigation li");

const activeLink = (e) => {
  navigationLinks.forEach((item) => item.classList.remove("hovered"));
  e.currentTarget.classList.add("hovered");
};

navigationLinks.forEach((item) => item.addEventListener("mouseover", activeLink));
window.onload = renderDashBoard()

const toggle = document.querySelector(".toggle");
const navigation = document.querySelector(".navigation");
const main = document.querySelector(".main");

// Event delegation for toggle functionality
document.addEventListener('click', function (event) {
  // Check if the clicked element has the class 'toggle' or is inside an element with the class 'toggle'
  const toggleElement = event.target.closest('.toggle');

  // If a toggle element was clicked, execute the toggle logic
  if (toggleElement) {
    navigation.classList.toggle("active");
    main.classList.toggle("active");
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const brandNameElement = document.querySelector('.navigation .brand-name');
  if (brandNameElement) {
    brandNameElement.textContent = 'Controlla'; // Customize as needed
  }
  
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode'); // Toggle dark mode class on body
    
    // Change the icon based on the current theme
    if (document.body.classList.contains('dark-mode')) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
    }
  });
});

// Since the content is dynamically loaded, ensure your scripts run after the content is updated
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the dashboard or any other start-up logic
  renderDashBoard();

  // Now that content is loaded, you can safely query for elements like '.navigation .brand-name'
  const brandNameElement = document.querySelector('.navigation .brand-name');
  if (brandNameElement) {
    brandNameElement.textContent = 'Controlla'; // Customize as needed
  }
});

