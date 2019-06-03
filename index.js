'use strict';
const state = {
  dogs: [],
  error: null,
  // formReady: false
};
function getDogImage(dogNum, dogBreed) {
  fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random/${dogNum}`)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson)
      if (responseJson.code === '404') {
        state.error = responseJson.message;
      }
      addDogsToState(responseJson);
      render();
    })
    .catch(error => {
      $('.error-message').html(`<p>${state.error}</p>`)
      $('#dog-breed-select').empty();
      alert(`Sorry. ${state.error}`);
      console.log(error);
    });
}

function addDogsToState(dogs) {
  state.dogs = dogs.message;
}

function render() {
  const html = state.dogs.map(dogImg => {
    return `
      <li>
        <img src="${dogImg}">
      </li>
    `;
  });

  if (state.error) {
    $('.error-message').html(`<p>${state.error}</p>`)
  } else {
    $('.error-message').empty();
  }

  // if (state.formReady === false) {
  //   $('#number-choice').find('input[type=submit]').attr('disabled',true);
  // } else {
  //   $('#number-choice').find('input[type=submit]').attr('disabled',false);
  // }
  $('.results').removeClass('hidden').html(html);
}

// function getBreedListAndPopulate() {
//   return fetch('https://dog.ceo/api/breeds/list/all')
//     .then(res => res.json())
//     .then(data => {
//       const breedObj = data.message;
//       const breedList = Object.keys(breedObj).map(breed => `<option value="${breed}">${breed}</option>`);
//       $('#dog-breed-select').html(breedList);
//       state.formReady = true;
//       render();
//     });
// }
// The above code was done with the instructor, but results in a failing grade. Removing to pass the revision requests.
function watchForm() {
  $('#number-choice').submit(event => {
    event.preventDefault();
    let dogNum = event.target.dogNum.value;
    let dogBreed = event.target.breed.value;  
    getDogImage(dogNum, dogBreed);
  });
}

$(function() {
  watchForm();
  // getBreedListAndPopulate();
  render();
});
