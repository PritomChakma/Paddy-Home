let sortData = [];

// create loadCategories
const loadCategories = () => {
  // fetch the data
  fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// create loadPets
const loadPets = () => {
  // fetch the data
  fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((res) => res.json())
    .then((data) => {
      sortData = data.pets;
      displayPets(data.pets);
    })
    .catch((error) => console.log(error));
};

// create loadCategoriesImages
const loadCategoriesImages = (id) => {
  // fetch the data
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      sortData = data.data;
      displayPets(data.data);
    })
    .catch((error) => console.log(error));
};

// create shortByPrice
document.getElementById("sortByPrice").addEventListener("click", () => {
  shortByPrice();
});
const shortByPrice = () => {
  // sorting
  sortData?.sort((a, b) => b.price - a.price);
  // function call
  displayPets(sortData);
};

// create likeButton
const likeButton = async (petId) => {
  // fetch the data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await res.json();
  //   console.log(data.petData);

  const { image } = data.petData;
  const likeButtonContainer = document.getElementById("like-btn");
  const likeBtn = document.createElement("div");
  likeBtn.innerHTML = `
    <img src="${image}" alt="" />
  `;
  likeButtonContainer.append(likeBtn);
};

// create imageDetails
const imageDetails = async (petId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await res.json();
  //   console.log(data.petData);

  const { image, pet_name, breed, gender, date_of_birth, price, pet_details } =
    data.petData;
  const modalContainer = document.getElementById("modal-container");

  modalContainer.innerHTML = `
     <dialog id="my_modal_1" class="modal">
          <div class="modal-box">
       
  
           <img class="flex justify-center items-center w-full" src="${image}" alt="" /> 
       <h2 class="py-2 font-black text-xl">${pet_name}</h2></h2>
        <div class="flex gap-5">
        <div>
        <div class="flex gap-2 text-gray-600">
  <div font-base><i class="fa-solid fa-list"></i></div>
  <div>${breed}</div>
  </div>

    <div class="flex gap-2 text-gray-600">
  <div font-base><i class="fa-solid fa-neuter"></i></div>
  <div>${gender}</div>
  </div>
        </div>
        <div>
         <div class="flex gap-2 text-gray-600">
  <div font-base><i class="fa-solid fa-calendar-days"></i></div>
  <div>${date_of_birth}</div>
  </div>

   <div class="flex gap-2 text-gray-600">
  <div font-base><i class="fa-solid fa-dollar-sign"></i></div>
  <div>${price} $</div>
  </div>
        </div>
        </div>

        <h2 class="font-black py-2">Details Information</h2>

        <p class="">${pet_details}</p>


          
            <div class="modal-action ">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn flex items-center gap-1 lg:px-8 lg:py-y rounded-xl bg-white border-2 hover:bg-gray-300  border-[#0E7A81]">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>
  `;

  my_modal_1.showModal();
};

// create displayPets
const displayPets = (pets) => {
  const petsContainer = document.getElementById("pets");
  petsContainer.innerHTML = "";

  if (pets.length == 0) {
    petsContainer.classList.remove("grid");
    petsContainer.innerHTML = `
    <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center mb-20">
 <img src="error.webp" alt="" srcset="" />
 <h2 class="font-black md:text-4xl">No Information Available</h2>
 <p class="md:text-xl md:w-8/12 text-center"> It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>
    `;
    return;
  }
  pets.forEach((pet) => {
    console.log(pet);
    const card = document.createElement("div");
    card.innerHTML = `
    <figure className="px-10 pt-10 h-[80px]">
      <img
        src="${pet.image}"
        alt="Shoes"
        class="h-full w-full object-cover " />
    </figure>
    <div class=" px-5 py-1 border-2 ">
      <h1 class="font-bold text-lg">${pet.pet_name}</h1>

  <div class="flex gap-2 text-gray-600">
  <div font-base><i class="fa-solid fa-list"></i></div>
  <div>${pet.breed}</div>
  </div>

  <div class="flex gap-2 text-gray-600">
  <div font-base><i class="fa-solid fa-calendar-days"></i></div>
  <div>${pet.date_of_birth}</div>
  </div>

  <div class="flex gap-2 text-gray-600">
  <div font-base><i class="fa-solid fa-neuter"></i></div>
  <div>${pet.gender}</div>
  </div>

  <div class="flex gap-2 text-gray-600">
  <div font-base><i class="fa-solid fa-dollar-sign"></i></div>
  <div>${pet.price} $</div>
  </div>
      <div class="flex gap-3 md:gap-5  ">
        <div><button onclick="likeButton('${pet.petId}')" class="btn"><i class="fa-regular fa-thumbs-up"></i></button></div>
       <div><button class="btn text-[#0E7A81]">Adopt</button></div>
  <div>
  
  <button onclick="imageDetails('${pet.petId}')" class="btn text-[#0E7A81]">Details</button></div>
      </div>
    </div>
`;
    petsContainer.append(card);
  });
};

// create displayCategories
const displayCategories = (categori) => {
  const categoriesContainer = document.getElementById("categories");

  categori.forEach((item) => {
    // console.log(item);

    // create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
   <button  onclick="loadCategoriesImages('${item.category}')" class="btn flex items-center gap-1 lg:px-8  rounded-xl bg-white border-2 hover:bg-gray-300 my-5 md:my-20 border-[#0E7A81] ">
    <img class="w-8 h-8" src="${item.category_icon}"/> ${item.category}</button>

`;
    // add button
    categoriesContainer.append(buttonContainer);
  });
};

// sort by price
const sort = (prices) => {
  const sortContainer = document.getElementById("sortByPrice");

  prices.sort(shortByPrice());
};

// call the function
loadCategories();
loadPets();
likeButton();
