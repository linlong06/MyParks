(function(){
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(var letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question">Which national park matches the following picture?</div>
            <div class="thumbnail"><img src="${currentQuestion.question}"></div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;
    myQuestions.forEach( (currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        numCorrect++;
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      else{
        answerContainers[questionNumber].style.color = 'red';
      }
    });
    if (numCorrect / myQuestions.length >= 0.8) {
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}\n
      Congratulations! You are a master of national parks!`;
    } else {
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}\n
      It's okay. Check out more pictures of national park <a href="/parks">Here</a>.`;
    }
    
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "https://i.ytimg.com/vi/kQZ3L2YFBug/maxresdefault.jpg",
      answers: {
        a: "Zion National Park",
        b: "Grand Canyon National Park",
        c: "Yosemite National Park",
        d: "Glacier National Park"
      },
      correctAnswer: "c"
    },
    {
      question: "https://i.ytimg.com/vi/2QtdEq2tsh8/maxresdefault.jpg",
      answers: {
        a: "Grand Teton National Park",
        b: "Yellowstone National Park",
        c: "Grand Teton National Park",
        d: "Sequoia National Park"
      },
      correctAnswer: "b"
    },
    {
      question: "https://www.doi.gov/sites/doi.gov/files/blog-post/thumbnail-images/olympic_national_park_mountains._photo_by_jason_horstman._ste.jpeg",
      answers: {
        a: "Death Valley National Park",
        b: "Big Bend National Park",
        c: "Denali National Park",
        d: "Olympic National Park"
      },
      correctAnswer: "d"
    },
    {
      question: "https://cdn.shortpixel.ai/client/q_lossy,ret_img,w_1280/https://www.travel-experience-live.com/wp-content/uploads/2018/05/Alligators-in-Everglades-National-Park-Florida.jpg",
      answers: {
        a: "Everglades National Park",
        b: "Shenandoah National Park",
        c: "Crater Lake National Park",
        d: "Rocky Mountain National Park"
      },
      correctAnswer: "a"
    },
    {
      question: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Dawn_on_the_S_rim_of_the_Grand_Canyon_%288645178272%29.jpg",
      answers: {
        a: "Kings Canyon National Park",
        b: "Grand Canyon National Park",
        c: "Mesa Verde National Park",
        d: "Canyonlands National Park"
      },
      correctAnswer: "b"
    },
    {
      question: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Delicatearch1.jpg/300px-Delicatearch1.jpg",
      answers: {
        a: "Arches National Park",
        b: "Capitol Reef National Park",
        c: "Guadalupe Mountains National Park",
        d: "Pinnacles National Park"
      },
      correctAnswer: "a"
    },
    {
      question: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Lake_Clark_National_Park.jpg/300px-Lake_Clark_National_Park.jpg",
      answers: {
        a: "Crater Lake National Park",
        b: "Zion National Park",
        c: "Lake Clark National Park",
        d: "Yellowstone National Park"
      },
      correctAnswer: "c"
    },
    {
      question: "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=1600&h=1067&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2020%2F01%2Fglacier-national-park-GLACIERSIGNS0120.jpg",
      answers: {
        a: "Grand Teton National Park",
        b: "Denali National Park",
        c: "Glacier Bay National Park",
        d: "Glacier National Park"
      },
      correctAnswer: "d"
    },
    {
      question: "https://cdn.britannica.com/99/94199-050-72320332/Manly-Beacon-Death-Valley-National-Park-California.jpg",
      answers: {
        a: "Death Valley National Park",
        b: "Great Sand Dunes National Park",
        c: "Joshua Tree National Park",
        d: "White Sands National Park"
      },
      correctAnswer: "a"
    },
    {
      question: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Mount_McKinley_and_Denali_National_Park_Road_2048px.jpg/300px-Mount_McKinley_and_Denali_National_Park_Road_2048px.jpg",
      answers: {
        a: "Gates of the Arctic National Park",
        b: "Kenai Fjords National Park",
        c: "Denali National Park",
        d: "Wrangell–St. Elias National Park"
      },
      correctAnswer: "c"
    },
    {
      question: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Redwood_National_Park%2C_fog_in_the_forest.jpg/1200px-Redwood_National_Park%2C_fog_in_the_forest.jpg",
      answers: {
        a: "Yosemite National Park",
        b: "Sequoia National Park",
        c: "Shenandoah National Park",
        d: "Redwood National Park"
      },
      correctAnswer: "d"
    },
    {
      question: "https://www.gannett-cdn.com/-mm-/c09164e22ed6ca7cb98e1def4341317c30929f22/c=0-153-1497-999/local/-/media/2016/08/05/USATODAY/USATODAY/636060128185669450-GreatSmokyMountainsNPChrisMobleysmall.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp",
      answers: {
        a: "Rocky Mountain National Park",
        b: "Great Smoky Mountains National Park",
        c: "Guadalupe Mountains National Park",
        d: "Zion National Park"
      },
      correctAnswer: "b"
    }
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
