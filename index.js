const loadPhone = async (searchText='iphone', showAll) => {
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
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.innerHTML = '';

  //show all button hide and unhide acording to phone length 
  const showAllButton = document.getElementById("show-all-container");
  if (phones.length > 12 && !showAll) {
    showAllButton.classList.remove('hidden');
  } else {
    showAllButton.classList.add('hidden');
  }
  //hiding show all button after showing all the phones
  if (!showAll) {
    phones = phones.slice(0, 12);
  }
  //looping through phones to set the cards
  phones.forEach(phone => {
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-gray-100 p-4 shadow-lg m-2`;
    phoneCard.innerHTML = `
      <figure><img src="${phone.image}" alt="Shoes" /></figure>
      <div class="card-body">
        <h2 class="font-bold text-gray-900 text-center">${phone.phone_name}</h2>
        <p class="font-medium text-gray-900 text-center">By clicking the details button you can see the individual phone details.</p>
        <div class="card-actions justify-center">
        <button onclick="modalHandler('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
      </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
  //after showing result disable the loading and showAll button
  loading(false);

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

let modalCounter = 0; // Initialize a counter for unique modal IDs

const modalHandler = async (id) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const details = await response.json();
  const detail = details.data;
  
  // Generate a unique modal ID
  const modalId = `my_modal_${modalCounter}`;
  modalCounter++;

  const modalContainer = document.getElementById("modal-container");
  const modalDiv = document.createElement("div");
  modalDiv.innerHTML = `
    <dialog id="${modalId}" class="modal modal-bottom sm:modal-middle">
      <form method="dialog" class="modal-box">
      <div class="flex justify-center"> 
      <img src="${detail.image}" alt="" />
      </div>
        <div class="flex justify-center">
          <div>
            <h3 class="text-left font-semibold text-base"><span class="font-bold text-lg">Name :</span> ${detail?.name}</h3>
            <h3 class="text-left font-semibold text-base"><span class="font-bold text-lg">Brand :</span> ${detail?.brand}</h3>
            <h3 class="text-left font-semibold text-base"><span class="font-bold text-lg">Storage :</span> ${detail?.mainFeatures?.storage}</h3>
            <h3 class="text-left font-semibold text-base"><span class="font-bold text-lg">Memory :</span> ${detail?.mainFeatures?.memory}</h3>
            <h3 class="text-left font-semibold text-base"><span class="font-bold text-lg">Chipset :</span> ${detail?.mainFeatures?.chipSet}</h3>
            <h3 class="text-left font-semibold text-base"><span class="font-bold text-lg">Display Size :</span> ${detail?.mainFeatures?.displaySize}</h3>
            <h3 class="text-left font-semibold text-base"><span class="font-bold text-lg">GPS :</span> ${detail.others?.GPS || 'No GPS available'}</h3>
            <h3 class="text-left font-semibold text-base"><span class="font-bold text-lg">Release data :</span> ${detail?.releaseDate || 'No Data available'}</h3>
          </div>
        </div>
        <div class="flex justify-center my-2"> 
        <button onclick="closeModal('${modalId}')" class="btn w-[200px] bg-[#DC3545] text-white">Close</button>
        </div>
      </form>
    </dialog>
  `;
  modalContainer.appendChild(modalDiv);

  const modal = document.getElementById(modalId);
  modal.showModal();
};

const closeModal = (modalId) => {
  const modal = document.getElementById(modalId);
  modal.close();
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = '';
};

loadPhone();