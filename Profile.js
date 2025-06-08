// DOM Elements
const languageBtn = document.getElementById("languageBtn");
const languageDropdown = document.getElementById("languageDropdown");
const editProfileBtn = document.getElementById("editProfileBtn");
const editProfileModal = document.getElementById("editProfileModal");
const closeModal = document.getElementById("closeModal");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const profileForm = document.getElementById("profileForm");
const donationHistoryBody = document.getElementById("donationHistoryBody");
const certificatesContainer = document.getElementById("certificatesContainer");
const profilePictureInput = document.getElementById("profilePictureInput");
const themeToggle = document.getElementById("themeToggle");

// Sample data (replace with real data from your backend)
const currentUserId = 1;
let userData = {
  firstName: "Pratham",
  lastName: "Taikar",
  email: "gmail@example.com",
  phone: "+91 7709917835",
  city: "India",
  country: "USA",
  dateOfBirth: "2006-03-15",
  gender: "male",
  bloodType: "A+",
  address: "India",
  emergencyContact: "Jane Doe (Wife) - +1 (555) 987-6543",
  totalDonations: 12,
  lastDonation: "2023-05-15",
  profilePicture:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYP-KKtRJXm9qK7k2_PA1utxbxWdpzGIdulQ&s",
};

const donationHistory = [
  {
    date: "2023-05-15",
    location: "NY Blood Center",
    type: "Whole Blood",
    status: "completed",
  },
  {
    date: "2023-03-10",
    location: "Community Drive",
    type: "Whole Blood",
    status: "completed",
  },
  {
    date: "2023-01-05",
    location: "NY Blood Center",
    type: "Plasma",
    status: "completed",
  },
  {
    date: "2023-07-20",
    location: "Mobile Unit - Central Park",
    type: "Whole Blood",
    status: "upcoming",
  },
];

// Certificate data
const certificates = [
  { title: "Blood Donor", date: "Jan 2025" },
  { title: "Top Volunteer", date: "Oct 2024" },
  { title: "Platinum Donor", date: "Dec 2023" },
  { title: "Emergency Responder", date: "Aug 2023" },
];

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
  }

  updateProfileUI(userData);
  renderDonationHistory();
  renderCertificates();
  setupEventListeners();
});

function setupEventListeners() {
  // Theme toggle
  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
      localStorage.setItem("theme", "light");
      themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }
  });

  // Language selector
  languageBtn.addEventListener("click", function () {
    languageDropdown.classList.toggle("show");
  });

  // Close language dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (!languageBtn.contains(e.target)) {
      languageDropdown.classList.remove("show");
    }
  });

  // Language selection
  document.querySelectorAll(".language-option").forEach((option) => {
    option.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang");
      languageBtn.innerHTML = `<i class="fas fa-globe"></i> ${this.textContent}`;
      languageDropdown.classList.remove("show");
      // Here you would implement language change logic
    });
  });

  // Edit profile modal
  editProfileBtn.addEventListener("click", function () {
    populateEditForm(userData);
    editProfileModal.classList.add("show");
  });

  closeModal.addEventListener("click", function () {
    editProfileModal.classList.remove("show");
  });

  cancelEditBtn.addEventListener("click", function () {
    editProfileModal.classList.remove("show");
  });
}

function populateEditForm(data) {
  document.getElementById("firstNameInput").value = data.firstName;
  document.getElementById("lastNameInput").value = data.lastName;
  document.getElementById("emailInput").value = data.email;
  document.getElementById("phoneInput").value = data.phone;
  document.getElementById("dobInput").value = data.dateOfBirth;
  document.getElementById("genderInput").value = data.gender;
  document.getElementById("bloodTypeInput").value = data.bloodType;
  document.getElementById("addressInput").value = data.address;
  document.getElementById("emergencyContactInput").value =
    data.emergencyContact;
}

function renderDonationHistory() {
  donationHistoryBody.innerHTML = "";

  donationHistory.forEach((donation) => {
    const row = document.createElement("tr");

    row.innerHTML = `
                    <td>${donation.date}</td>
                    <td>${donation.location}</td>
                    <td>${donation.type}</td>
                    <td><span class="status-badge status-${donation.status}">${
      donation.status === "completed" ? "Completed" : "Upcoming"
    }</span></td>
                `;

    donationHistoryBody.appendChild(row);
  });
}

function renderCertificates() {
  certificatesContainer.innerHTML = "";

  certificates.forEach((cert) => {
    const certElement = document.createElement("div");
    certElement.className = "certificate-card";

    certElement.innerHTML = `
                    <div class="certificate-info">
                        <div class="certificate-title">${cert.title}</div>
                        <div class="certificate-date">${cert.date}</div>
                        <button class="download-btn" onclick="downloadCertificate('${cert.title}')">
                            <i class="fas fa-download"></i> Download
                        </button>
                    </div>
                `;
    certificatesContainer.appendChild(certElement);
  });
}

function downloadCertificate(title) {
  alert(`Downloading ${title} certificate...`);
  // In a real app, this would download the actual certificate file
  // window.location.href = `/download-certificate?title=${encodeURIComponent(title)}`;
}

// Update the form submission handler
profileForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Show loading state
  const submitBtn = profileForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

  try {
    // Handle profile picture upload
    if (profilePictureInput.files[0]) {
      const file = profilePictureInput.files[0];

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        throw new Error("Profile picture must be less than 2MB");
      }

      // Create a preview of the new image and update userData
      const reader = new FileReader();
      reader.onload = function (e) {
        userData.profilePicture = e.target.result; // Save the new image data
        document.getElementById("profilePicture").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    // Simulate API call (replace with actual fetch)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update user data object (in a real app, this would come from the API response)
    const updatedUser = {
      ...userData,
      firstName: document.getElementById("firstNameInput").value,
      lastName: document.getElementById("lastNameInput").value,
      email: document.getElementById("emailInput").value,
      phone: document.getElementById("phoneInput").value,
      dateOfBirth: document.getElementById("dobInput").value,
      gender: document.getElementById("genderInput").value,
      bloodType: document.getElementById("bloodTypeInput").value,
      address: document.getElementById("addressInput").value,
      emergencyContact: document.getElementById("emergencyContactInput").value,
    };

    // Update the userData with the new information
    userData = updatedUser;

    // Update the UI with the new data
    updateProfileUI(userData);

    // Close modal
    editProfileModal.classList.remove("show");

    // Show success message
    showAlert("Profile updated successfully!", "success");
  } catch (error) {
    console.error("Update error:", error);
    showAlert("Failed to update profile: " + error.message, "error");
  } finally {
    // Reset button state
    submitBtn.disabled = false;
    submitBtn.innerHTML = "Save Changes";
  }
});

function showAlert(message, type) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;

  document.body.appendChild(alertDiv);

  // Remove after animation
  setTimeout(() => {
    alertDiv.remove();
  }, 3000);
}

function updateProfileUI(userData) {
  document.getElementById(
    "profileName"
  ).textContent = `${userData.firstName} ${userData.lastName}`;
  document.getElementById("profileEmail").textContent = userData.email;
  document.getElementById("profilePhone").textContent = userData.phone;
  document.getElementById(
    "profileLocation"
  ).textContent = `${userData.city}, ${userData.country}`;
  document.getElementById("profileAge").textContent = calculateAge(
    userData.dateOfBirth
  );
  document.getElementById("profileGender").textContent = capitalizeFirstLetter(
    userData.gender
  );
  document.getElementById("profileBloodType").textContent = userData.bloodType;
  document.getElementById(
    "profileFullName"
  ).textContent = `${userData.firstName} ${userData.lastName}`;
  document.getElementById("profileDob").textContent = new Date(
    userData.dateOfBirth
  )
    .toISOString()
    .split("T")[0];
  document.getElementById("profileAddress").textContent = userData.address;
  document.getElementById("profileEmergencyContact").textContent =
    userData.emergencyContact;
  document.getElementById("profileDonations").textContent =
    userData.totalDonations;
  document.getElementById("profileLastDonation").textContent =
    userData.lastDonation
      ? new Date(userData.lastDonation).toISOString().split("T")[0]
      : "Never";

  if (userData.profilePicture) {
    document.getElementById("profilePicture").src = userData.profilePicture;
  }
}

function calculateAge(dateString) {
  const birthDate = new Date(dateString);
  const diff = Date.now() - birthDate.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
