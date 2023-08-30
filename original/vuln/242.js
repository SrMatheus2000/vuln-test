function(placeholder) {
  // Set the placeholder
  placeholder = placeholder || this.config.placeholder || this.el.getAttribute("placeholder");

  if (!this.options.length) {
    placeholder = "No options available";
  }

  this.placeEl.innerHTML = placeholder;
}