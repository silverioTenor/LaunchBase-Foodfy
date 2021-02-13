const AddInputRecipe = {
  ingredient: document.querySelector('.add-ingredient'),
  step: document.querySelector('.add-step'),
  init() {
    AddInputRecipe.ingredient.addEventListener('click', () => {
      AddInputRecipe.addIngredient();
    });

    AddInputRecipe.step.addEventListener('click', () => {
      AddInputRecipe.addStep();
    });
  },
  addIngredient() {
    const ingredients = document.querySelector("#ingredients");
    const inputs = document.querySelectorAll(".ingredient");

    AddInputRecipe.creatInputElement(ingredients, inputs);
  },
  addStep() {
    const steps = document.querySelector("#steps");
    const inputs = document.querySelectorAll(".step");

    AddInputRecipe.creatInputElement(steps, inputs);
  },
  creatInputElement(container, elements) {
    const lastField = elements[elements.length - 1].cloneNode(true);

    const newField = lastField.children[0];

    if (newField.children[0].value === '') return false;

    newField.children[0].value = '';
    container.appendChild(lastField);
  },
}

AddInputRecipe.init();