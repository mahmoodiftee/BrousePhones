const loadPhone = async (searchText, showAll) => {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, showAll); // Pass showAll as an argument
  } catch (error) {
    console.error("API request error:", error);
  }
}

let allPhonesDisplayed = false;
const displayPhones = (phones, showAll) => {
  // console.log("displayPhones called with showAll:", showAll);
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.innerHTML = '';
  const showAllButton = document.getElementById("show-all-container");
  if (phones.length > 12) {
    showAllButton.classList.remove('hidden');
  } else {
    showAllButton.classList.add('hidden');
  }

  let phonesToDisplay;

  if (showAll) {
    phonesToDisplay = phones;
    showAllButton.classList.add('hidden');
  } else {
    phonesToDisplay = phones.slice(0, 12);
  }

  // const filteredPhones = phones.filter(phone => phone.mobile_id > 10);
  phonesToDisplay.forEach(phone => {
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-gray-100 p-4 shadow-lg m-2`;
    phoneCard.innerHTML = `
      <figure><img src="${phone.image}" alt="Shoes" /></figure>
      <div class="card-body">
        <h2 class="font-bold text-gray-900 text-center">${phone.phone_name}</h2>
        <p class="font-medium text-gray-900 text-center">By clicking the details button you can see the individual phone details.</p>
        <div class="card-actions justify-center">
        <button class="btn btn-primary">Show Details</button>
        </div>
      </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
  loading(false);
  allPhonesDisplayed = false;

}
const handleSearch = () => {
  loading(true);
  const searchField = document.getElementById("search-field")
  const searchText = searchField.value;
  loadPhone(searchText);
}
const handleShowAll = () => {
   allPhonesDisplayed = true;
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, allPhonesDisplayed);
}

const loading = (isloading) => {
  const loadingToggle = document.getElementById("loading-spinner");
  if (isloading) {
    loadingToggle.classList.remove('hidden')
  } else {
    loadingToggle.classList.add('hidden')
  }
}
