const updateMainContent = (html) => {
    document.getElementById('main-content').innerHTML = html;
};
 
const fetchMemberships = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/memberships');
        const memberships = await response.json();
        console.log(memberships);
        const container = document.getElementById('membershipContainer');
        container.innerHTML = '';
        memberships.forEach(membership => {
            addMembershipCard(membership);
        });
    } catch (error) {
        console.error('Error fetching memberships:', error);
    }
};


document.addEventListener('DOMContentLoaded', () => {
  const brandNameElement = document.querySelector('.navigation .brand-name');
  if (brandNameElement) {
      brandNameElement.textContent = 'Controlla';
  }

  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
          themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
          themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }
  });

  renderMembershipPage();
});
// Function to handle opening the update/delete modal
const handleUpdateDeleteModal = (membershipId) => {
  const modal = document.getElementById('updateDeleteModal');
  modal.style.display = 'block';

  // Handle edit membership button click
  document.getElementById('editMembershipButton').addEventListener('click', () => {
      handleUpdateMembership(membershipId);
      modal.style.display = 'none';
  });

  // Handle delete membership button click
  document.getElementById('deleteMembershipButton').addEventListener('click', () => {
      handleDeleteMembership(membershipId);
      modal.style.display = 'none';
  });
};

window.addEventListener("load", function() {
  document.getElementById('membershipContainer').addEventListener('click', (event) => {
      const card = event.target.closest('.membership-card');
      if (card) {
          const membershipId = card.dataset.id;
          const menu = card.querySelector('.membership-card-menu');
          if (menu.contains(event.target)) {
              handleUpdateDeleteModal(membershipId);
          }
      }
  });

  // Close modal when the close button is clicked
  document.querySelector('.close-button').addEventListener('click', () => {
      document.getElementById('updateDeleteModal').style.display = 'none';
  });
});

const handleUpdateMembership = async (membershipId) => {
  // Fetch membership data using its ID
  try {
      const response = await fetch(`http://localhost:3000/api/memberships/${membershipId}`);
      const membershipData = await response.json();

      // Populate update modal fields with membership data
      document.getElementById('updateMembershipName').value = membershipData.name;
      document.getElementById('updateMembershipValue').value = membershipData.value;
      document.getElementById('updateMembershipImage').value = membershipData.imageUrl;
      document.getElementById('updateMembershipColor').value = membershipData.color;

      // Show the update modal
      document.getElementById('updateMembershipModal').style.display = 'block';
  } catch (error) {
      console.error('Error fetching membership data:', error);
  }

  // Handle form submission for updating membership
  document.getElementById('updateMembershipForm').addEventListener('submit', async (event) => {
      event.preventDefault();

      // Gather updated membership data from the form
      const updatedMembershipData = {
          name: document.getElementById('updateMembershipName').value,
          value: document.getElementById('updateMembershipValue').value,
          imageUrl: document.getElementById('updateMembershipImage').value,
          color: document.getElementById('updateMembershipColor').value,
      };

      try {
          // Send updated membership data to server to update the membership
          const response = await fetch(`http://localhost:3000/api/memberships/${membershipId}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedMembershipData),
          });
          const updatedMembership = await response.json();
          console.log('Membership updated:', updatedMembership);
          document.getElementById('updateMembershipModal').style.display = 'none';
      } catch (error) {
          console.error('Error updating membership:', error);
      }
  });
};
const handleDeleteMembership = (membershipId) => {
  // Show confirmation modal
  const confirmation = confirm('Are you sure you want to delete this membership?');
  if (confirmation) {
      // Send delete request to server
      fetch(`http://localhost:3000/api/memberships/${membershipId}`, {
          method: 'DELETE',
      })
      .then((response) => response.json())
      .then((deletedMembership) => {
          console.log('Membership deleted:', deletedMembership);
          // Optionally remove the deleted membership card from the UI
          // removeMembershipCard(deletedMembership.id);
      })
      .catch((error) => {
          console.error('Error deleting membership:', error);
      });
  }
};


window.addEventListener("load", function() {
  document.getElementById('membershipContainer').addEventListener('click', (event) => {
      console.log('Clicked on membership card');
      const card = event.target.closest('.membership-card');
      console.log('Card:', card);
      if (card) {
          const membershipId = card.dataset.id;
          console.log('Membership ID:', membershipId);
          const menu = card.querySelector('.membership-card-menu');
          if (menu.contains(event.target)) {
              // Clicked on the menu
              console.log('Clicked on the menu');
              const action = event.target.dataset.action;
              console.log('Action:', action);
              if (action === 'update') {
                  handleUpdateMembership(membershipId);
              } else if (action === 'delete') {
                  handleDeleteMembership(membershipId);
              }
          } else {
              // Clicked on the card itself, handle other actions if needed
          }
      }
  });
});



const renderMembershipPage = () => {
    updateMainContent(`
        <div id="membershipModal" class="modal" style="display:none;">
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <form id="membershipForm">
                    <label for="membershipName">Name:</label>
                    <input type="text" id="membershipName" name="membershipName"><br><br>
                    <label for="membershipValue">Value:</label>
                    <input type="text" id="membershipValue" name="membershipValue"><br><br>
                    <label for="membershipImage">Image URL:</label>
                    <input type="text" id="membershipImage" name="membershipImage"><br><br>
                    <label for="membershipColor">Background Color:</label>
                    <input type="color" id="membershipColor" name="membershipColor"><br><br>
                    <input type="submit" value="Submit">
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
            <button id="addMembershipButton" class="add-membership-button">
                <ion-icon name="add"></ion-icon>
            </button>
        </div>
    `);

    fetchMemberships();

    document.getElementById('addMembershipButton').addEventListener('click', () => {
        document.getElementById('membershipModal').style.display = 'block';
    });

    document.querySelector('.close-button').addEventListener('click', () => {
        document.getElementById('membershipModal').style.display = 'none';
    });

    document.getElementById('membershipForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const color = document.getElementById('membershipColor').value;
        addMembershipCard({
            name: document.getElementById('membershipName').value,
            value: document.getElementById('membershipValue').value,
            imageUrl: document.getElementById('membershipImage').value,
            color: color,
        });
        document.getElementById('membershipModal').style.display = 'none';
        this.reset();
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const brandNameElement = document.querySelector('.navigation .brand-name');
    if (brandNameElement) {
        brandNameElement.textContent = 'Controlla';
    }

    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    renderMembershipPage();
});

const addMembershipCard = async (membershipData) => {
  if (!membershipData) return;

  if (!membershipData._id) {
      try {
          await fetch('http://localhost:3000/api/memberships', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(membershipData),
          });
          fetchMemberships();
      } catch (error) {
          console.error('Error adding membership:', error);
          return;
      }
  }
  let imageSectionContent;

  if (membershipData.imageUrl) {
      imageSectionContent = `<img src="${membershipData.imageUrl}" alt="Membership" style="width:100%;">`;
  } else {
      const backgroundColor = membershipData.color || 'hsla(0, 0%, 0%, 0)';
      imageSectionContent = `<div style="width:100%; border-radius: 10px;height:100px; background-color:${backgroundColor};"></div>`;
  }

  const cardHTML = `
      <div class="membership-card work" data-id="${membershipData._id}"> <!-- Add data-id attribute -->
          <div class="membership-img-section">
              ${imageSectionContent}  
          </div>
          <div class="membership-card-desc">
              <div class="membership-card-header">
                  <div class="membership-card-title">${membershipData.name}</div>
                  <div class="membership-card-menu">
                  <div id="updateDeleteModal" class="modal" style="display:none;">
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2>Update or Delete Membership</h2>
        <button id="editMembershipButton">Edit Membership</button>
        <button id="deleteMembershipButton">Delete Membership</button>
    </div>
</div>

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
  container.insertAdjacentHTML('beforeend', cardHTML);
};

