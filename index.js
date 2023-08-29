const loadPhone = async (searchText) => {
  const res = await fetch(` https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
}

const displayPhones = phones => {

  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.innerHTML = '';
  const showAll = document.getElementById("show-all-container");
  if(phones.length > 12){
    showAll.classList.remove('hidden');
  }else{
    showAll.classList.add('hidden');
  }

  phones = phones.slice(0, 12);
  // const filteredPhones = phones.filter(phone => phone.mobile_id > 10);
  phones.forEach(phone => {
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

}
const handleSearch = () => {
  const searchField = document.getElementById("search-field")
  const searchText = searchField.value;
  loadPhone(searchText);
}

// const searchPhone = async () => {
//   const res = await fetch(" https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089");
//   const data = await res.json();
//   console.log(data.data);
//   // const phones = data.data;
//   // displayPhones(phones);
// }
// searchPhone();