const updateMainContent = (html) => {
  document.getElementById('main-content').innerHTML = html;
};
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('addMembershipButton').addEventListener('click', () => {
    document.getElementById('membershipModal').style.display = 'block';
  });
});
const fetchMemberships = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/memberships');
    const memberships = await response.json();
    console.log(memberships)
    const container = document.getElementById('membershipContainer'); // Corrected id
    container.innerHTML = ''; // Clear the container before adding new content
    memberships.forEach(membership => {
      addMembershipCard(membership); // Use your existing function to add each card
      console.log("ENTROU AQUI")
    });
  } catch (error) {
    console.error('Error fetching memberships:', error);
  }
};

const renderMembershipPage = () => {
  updateMainContent(`
    <div id="membershipModal" class="modal" style="display:none;"> <!-- Initially hidden -->
      <div class="modal-content">
        <span class="close-button">&times;</span>
        <form id="membershipForm">
          <label for="membershipName">Name:</label>
          <input type="text" id="membershipName" name="membershipName"><br><br>
          <label for="membershipValue">Value:</label>
          <input type="text" id="membershipValue" name="membershipValue"><br><br>
          <label for="membershipImage">Image URL:</label>
          <input type="text" id="membershipImage" name="membershipImage"><br><br>
          <input type="submit" value="Submit">
          <label for="membershipColor">Background Color:</label>
          <input type="color" id="membershipColor" name="membershipColor"><br><br>
        </form>
      </div>
    </div>
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
      <div class="membership-cards-container" id="membershipContainer">
        <!-- Membership cards will be dynamically inserted here -->
      </div>
      <button id="addMembershipButton" class="add-membership-button"> <!-- Button for adding membership -->
        <ion-icon name="add"></ion-icon>
      </button> <!-- End of button for adding membership -->
    </div>
  `);

  fetchMemberships();

  // Event listeners for modal and form submission
  document.getElementById('addMembershipButton').addEventListener('click', () => {
    document.getElementById('membershipModal').style.display = 'block';
  });

  document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('membershipModal').style.display = 'none';
  });

  document.getElementById('membershipForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    const color = document.getElementById('membershipColor').value;
    addMembershipCard({
      name: document.getElementById('membershipName').value,
      value: document.getElementById('membershipValue').value,
      imageUrl: document.getElementById('membershipImage').value,
      color: color, // Include the background color
    });
    document.getElementById('membershipModal').style.display = 'none'; // Hide the modal
    this.reset(); // Reset form fields for the next input
  });
};


const addMembershipCard = async (membershipData) => {
  if (!membershipData) return;

  // Post the new membership to the API
  if (!membershipData._id) { // Assuming that an existing membership has an _id
    try {
      await fetch('http://localhost:3000/api/memberships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(membershipData),
      });
      fetchMemberships(); // Refresh the list after adding
    } catch (error) {
      console.error('Error adding membership:', error);
      return; // Exit if the fetch operation fails
    }
  }
  let imageSectionContent;

  // Check if an imageUrl is provided, if not use backgroundColor
  if (membershipData.imageUrl) {
    imageSectionContent = `<img src="${membershipData.imageUrl}" alt="Membership" style="width:100%;">`;
  } else {
    // Use the provided background color or a default color if none is provided
    const backgroundColor = membershipData.color || 'hsla(0, 0%, 0%, 0)'; // Example default color: fully transparent
    imageSectionContent = `<div style="width:100%; border-radius: 10px;height:100px; background-color:${backgroundColor};"></div>`;
  }

  const cardHTML = `
    <div class="membership-card work">
      <div class="membership-img-section">
        ${imageSectionContent}  
      </div>
      <div class="membership-card-desc">
        <div class="membership-card-header">
          <div class="membership-card-title">${membershipData.name}</div>
          <div class="membership-card-menu">
            <div class="membership-dot"></div>
            <div class="membership-dot"></div>
            <div class="membership-dot"></div>
          </div>
        </div>
        <div class="membership-card-time">${membershipData.value}</div>
      </div>
    </div>
  `;

  const container = document.getElementById('membershipContainer');
  container.insertAdjacentHTML('beforeend', cardHTML); // Insert new card at the end of container
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
  const clickedItem = e.currentTarget;
  
  const isAlreadyActive = clickedItem.classList.contains("hovered");

  // Remove "hovered" class from all navigation links
  navigationLinks.forEach((item) => item.classList.remove("hovered"));

  // If the clicked item was not already active, activate it
  if (!isAlreadyActive) {
      clickedItem.classList.add("hovered");
  }
};



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
  renderDashBoard();
  //fetchMemberships(); // Fetch memberships and display them

  // Now that content is loaded, you can safely query for elements like '.navigation .brand-name'
  const brandNameElement = document.querySelector('.navigation .brand-name');
  if (brandNameElement) {
    brandNameElement.textContent = 'Controlla'; // Customize as needed
  }
});

