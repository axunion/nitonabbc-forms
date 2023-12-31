import * as components from "@/components";
import { loaderState } from "@/store";

// -----------------------------------------------------------------------------
// Custom Element
// -----------------------------------------------------------------------------

for (const component of [...Object.values(components)]) {
  customElements.define(component.componentName, component);
}

// -----------------------------------------------------------------------------
// Loader
// -----------------------------------------------------------------------------

const loaderComponent = document.querySelector("loader-component");

if (loaderComponent) {
  loaderState.addSubscriber(({ state }) => {
    if (state) {
      loaderComponent.classList.remove("hidden");
    } else {
      loaderComponent.classList.add("hidden");
    }
  });
}

// -----------------------------------------------------------------------------
// Form
// -----------------------------------------------------------------------------

const form = document.querySelector("form") as HTMLFormElement;

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    loaderState.update(() => true);
    loaderState.update(() => false);
  });
}
