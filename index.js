// Global Variables

var stepperState = {
  currentStep: 1,
  validated: [false, false, false, false, false]
};

// Selectors

var stepForms = $("form.body-form");

var headerSteps = $(".header-step");
var bodySteps = $(".body-step");

var backButton = $("#step-back-button");
var continueButton = $("#step-continue-button");

function getCurrentForm() {
  return $('form[data-step="' + stepperState.currentStep + '"]');
}

function getStepHeader(stepNum) {
  return $('h6[data-step="' + stepNum + '"]');
}

var stepOneInput = $("#username-input");
var stepTwoInput = $("#mailing-city-input");

// Listeners

headerSteps.click(handleStepClick);
backButton.click(handleBackClick);
continueButton.click(handleContinueClick);
stepForms.on("submit", handleContinueClick);

// Event Handlers

function handleContinueClick(e) {
  e.preventDefault();
  validateStepForward(e);
}

function handleBackClick(e) {
  e.preventDefault();
  stepBack();
}

function handleStepClick() {
  var step = $(this).data().step;
  validateStepClick(step);
}

// Navigation

function stepForward() {
  console.log("stepForward reached");
  setCurrentStepValidated();
  step = stepperState.currentStep + 1;
  applyCurrentStep(step);
}

function stepBack() {
  step = stepperState.currentStep - 1;
  applyCurrentStep(step);
}

function setCurrentStep(step) {
  stepperState.currentStep = step;
}

function applyCurrentStep(step) {
  setCurrentStep(step);
  headerSteps.each(applyStepStyling);
  bodySteps.each(applyStepStyling);
}

function applyStepStyling() {
  $(this).data().step === stepperState.currentStep
    ? $(this).addClass("current-step")
    : $(this).removeClass("current-step");
  manageButtonsDisplay();
  focusFirstInput();
}

function manageButtonsDisplay() {
  stepperState.currentStep > 1
    ? backButton.addClass("show-button")
    : backButton.removeClass("show-button");
  stepperState.currentStep < 5
    ? continueButton.addClass("show-button")
    : continueButton.removeClass("show-button");
}

function focusFirstInput() {
  switch (stepperState.currentStep) {
    case 1:
      stepOneInput.focus();
    case 2:
      stepTwoInput.focus();
  }
}

// Validation

function validateStepForward() {
  var currentForm = getCurrentForm()[0];
  currentForm.checkValidity() ? stepForward() : invalidateStep(currentForm);
}

function invalidateStep(target) {
  setCurrentStepInvalidated();
  target.classList.add("was-validated");
}

function validateStepClick(step) {
  currentForm = getCurrentForm()[0];
  currentForm.checkValidity() ? clickStep(step) : invalidateStep(currentForm);
}

function clickStep(step) {
  setCurrentStepValidated();
  var previousSteps = stepperState.validated.slice(step);
  !previousSteps.includes(false)
    ? applyCurrentStep(step)
    : outlineInvalidSteps();
}

function outlineInvalidSteps() {
  stepperState.validated.forEach(function(step, i) {
    if (!step) getStepHeader(i + 1).addClass("step-header-invalid");
  });
}

function setCurrentStepValidated() {
  stepperState.validated[stepperState.currentStep - 1] = true;
}

function setCurrentStepInvalidated() {
  stepperState.validated[stepperState.currentStep - 1] = false;
}

// Initialize

stepOneInput.focus();
