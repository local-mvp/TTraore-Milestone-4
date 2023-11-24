let count = 3;

const addSignature = () => {
  const person = {
    name: document.getElementById("name").value,
    hometown: document.getElementById("hometown").value,
  }

  // Create a new paragraph for the signature
  const signatureParagraph = document.createElement("p");
  signatureParagraph.textContent = `🖊️ ${person.name} from ${person.hometown} supports this.`;

  // Find the signatures section and append the new signature
  const signaturesSection = document.querySelector(".signatures");
  signaturesSection.appendChild(signatureParagraph);

  // Reset form inputs
  document.getElementById("name").value = "";
  document.getElementById("hometown").value = "";

  // Remove the old counter
  const oldCounter = document.getElementById("counter");
  if (oldCounter) {
    oldCounter.remove();
  }

  // Increase the count
  count += 1;

  
  const counterParagraph = document.createElement("p");
  counterParagraph.id = "counter";
  counterParagraph.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;

  
  signaturesSection.appendChild(counterParagraph);

  toggleModal(person);
};


function updateCounter() {
  document.getElementById("counter").textContent = `🖊️ ${count} people have signed this petition and support this cause.`;
}

const themeButton = document.getElementById("theme-button");
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
};

themeButton.addEventListener("click", toggleDarkMode);

const signNowButton = document.getElementById("sign-now-button");

const validateForm = () => {
  let containsErrors = false;
  const petitionInputs = document.querySelectorAll('.petition-input');
  const emailInput = document.getElementById('email');

  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      containsErrors = true;
      petitionInputs[i].classList.add('error');
    } else {
      petitionInputs[i].classList.remove('error');
    }
  }

  // Check the email input for '.com'
  if (!emailInput.value.includes('.com')) {
    containsErrors = true;
    emailInput.classList.add('error');
  } else {
    emailInput.classList.remove('error');
  }

  if (!containsErrors) {
    addSignature();
  }
};

signNowButton.addEventListener("click", validateForm);

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease',
};


let isReducedMotion = false;

function reduceMotion() {
  isReducedMotion = !isReducedMotion;

  if (isReducedMotion) {
    
    animation.revealDistance = 0;
    animation.transitionDuration = "0s";
  } else {
    
    animation.revealDistance = 150;
    animation.transitionDuration = '2s';
  }

  
  for (let i = 0; i < revealableContainers.length; i++) {
    revealableContainers[i].style.transitionDelay = animation.transitionDelay;
    
  }
}


const revealableContainers = document.querySelectorAll('.revealable');


function reveal() {
  let windowHeight = window.innerHeight;

  for (let i = 0; i < revealableContainers.length; i++) {
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
    } else {
      revealableContainers[i].classList.remove('active');
    }
  }
}


window.addEventListener('scroll', reveal);


const reduceMotionButton = document.createElement("button");
reduceMotionButton.id = "reduce-motion-button";
reduceMotionButton.textContent = "Reduce Motion";


const navigationMenu = document.querySelector('.navbar ul');
const reduceMotionListItem = document.createElement("li");
reduceMotionListItem.appendChild(reduceMotionButton);
navigationMenu.appendChild(reduceMotionListItem);

reduceMotionButton.addEventListener("click", reduceMotion);


function toggleModal(person) {
  // Select modal elements
  const modal = document.getElementById("thanks-modal");
  const modalContent = document.getElementById("thanks-modal-content");
  const modalImage = document.querySelector("#thanks-modal img"); // Add this line to select the image

  // Display the modal
  modal.style.display = "flex";

  // Set the thank you message with the user's name
  modalContent.textContent = `Thank you so much ${person.name}!`;

  // Initialize the scaleFactor
  let scaleFactor = 1;

  // Created a new variable called intervalId and set it to a call to setInterval
  const intervalId = setInterval(() => {
    // Toggled the image size between a factor of 1 and 0.8
    if (scaleFactor === 1) {
      scaleFactor = 0.8;
    } else {
      scaleFactor = 1;
    }

    // Applied the scaleFactor to the image
    modalImage.style.transform = `scale(${scaleFactor})`;
  }, 500); // Call scaleImage every 0.5 seconds

  // Hid the modal after a few seconds (e.g., 4000 milliseconds)
  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId); // Stop the animation
  }, 4000); // 4000 milliseconds (4 seconds)
}


function scaleImage() {
  // Toggle the image size between a factor of 1 and 0.8
  if (scaleFactor === 1) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }
  // Apply the scaleFactor to the image
  modalImage.style.transform = `scale(${scaleFactor})`;
}

const closeModalButton = document.getElementById("close-modal-button");
const modal = document.getElementById("thanks-modal");

closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});