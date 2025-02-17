export default class GuideEffects {
  constructor(guide, countryDetails) {
    this.guide = guide;
    this.choiceButtons = [];
    this.countryDetails = countryDetails;

    this.initializeDOMElements();
    this.closeOptionalAnswers();
  }

  initializeDOMElements() {
    this.introContainer = document.querySelector(".travel-help-intro");
    this.introContent = document.querySelector(".travel-help-intro-content");
    this.stepContainer = document.querySelector(".travel-help-step");
    this.progressBar = document.querySelector(".travel-help-step-progress");
    this.answersContainer = document.querySelector(".final-step-answers");
    this.optionalContainer = document.querySelector(
      ".final-step-optional-answers"
    );
    this.optionalContainerButton = document.querySelector(
      ".final-step-all-answers-button"
    );
    this.choiceWindow = document.querySelector(".travel-help-choice-window");

    this.optionalContainerButton.addEventListener("click", () => {
      if (this.optionalContainer.classList.contains("hidden")) {
        this.openOptionalAnswers();
      } else {
        this.closeOptionalAnswers();
      }
    });
  }

  applyStartEffects() {
    this.introContainer.style.opacity = "0";

    this.stepContainer.style.display = "flex";
    this.progressBar.style.display = "flex";

    this.progressBar.style.transform = "translateY(-66px)";
    this.progressBar.style.opacity = "0";

    setTimeout(() => {
      this.introContainer.style.display = "none";
      this.stepContainer.style.opacity = "1";
    }, 300);

    setTimeout(() => {
      this.progressBar.style.opacity = "1";
      this.progressBar.style.transform = "translateY(0)";
    }, 500);

    setTimeout(() => {
      this.introContainer.style.opacity = "1";
    }, 800);
  }

  applyBannerCarouselEffectsForward() {
    const images = Array.from(
      document.querySelectorAll(".travel-help-banner-carousel img")
    );

    let currentIndex = images.findIndex((img) =>
      img.classList.contains("current")
    );

    if (!this.guide.containersManagement.getIsFinal()) {
      images[currentIndex].classList.remove("current");
      images[currentIndex].classList.add("prev");

      images[currentIndex + 1].classList.remove("next");
      images[currentIndex + 1].classList.add("current");
    }
  }

  applyBannerCarouselEffectsBackward() {
    const images = Array.from(
      document.querySelectorAll(".travel-help-banner-carousel img")
    );

    let currentIndex = images.findIndex((img) =>
      img.classList.contains("current")
    );

    images[currentIndex].classList.remove("current");
    images[currentIndex].classList.add("next");

    images[currentIndex - 1].classList.remove("prev");
    images[currentIndex - 1].classList.add("current");
  }

  closeOptionalAnswers() {
    this.optionalContainer.classList.add("hidden");
    this.answersContainer.classList.add("hidden");

    this.optionalContainerButton.innerHTML = `
    Visi atsakymai<svg
    class="arrow-icon-down"
    width="21"
    height="21"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    >
    <path
    d="M3 6L8 11L13 6"
    stroke="#000"
    stroke-linejoin="round"
    ></path></svg>`;
  }

  openOptionalAnswers() {
    this.optionalContainer.classList.remove("hidden");
    this.answersContainer.classList.remove("hidden");

    this.optionalContainerButton.textContent = "Uždaryti";
  }

  storeChoiceButton(button) {
    this.choiceButtons.push(button);
  }

  hideUnavailableChoices() {
    this.checkIfAvailable();

    this.choiceButtons.forEach(button => {
      if (button.classList.contains("grid")) {
        if (button.dataset.available === "true") {
          button.classList.remove("disabled");
          button.removeEventListener("click", this.preventClick);
        } else {
          button.classList.add("disabled");
          this.guide.containersManagement.countryChoice = "";
          button.addEventListener("click", this.preventClick);
        }
      }
    });
  }

  checkIfAvailable() {
    const season = this.guide.containersManagement.getSeasonChoice();

    this.choiceButtons.forEach(button => {
      let isAvailable = false;

      this.countryDetails.forEach(countryDetail => {
        if (countryDetail.availableSeasons.includes(season) && countryDetail.userSelected === button.dataset.choice) {
          isAvailable = true;
        }
      });

      button.dataset.available = isAvailable ? "true" : "false";
    });
  }

  preventClick(event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
