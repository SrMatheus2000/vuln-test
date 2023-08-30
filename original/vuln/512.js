(props) {
    this.fieldInput = this.refs.fieldInput.getInputDOMNode();
    this.fieldFormGroup = ReactDOM.findDOMNode(this.refs.fieldInput);

    const $fieldInput = $(this.fieldInput);

    $fieldInput.typeahead({
      hint: true,
      highlight: true,
      minLength: 1,
    },
      {
        name: 'dataset-name',
        displayKey: props.displayKey,
        source: UniversalSearch.substringMatcher(props.suggestions, props.displayKey, 6),
        templates: {
          suggestion: (value) => {
            if (props.suggestionText) {
              return `<div><strong>${props.suggestionText}</strong> ${value[props.displayKey]}</div>`;
            }
            return `<div>${value.value}</div>`;
          },
        },
      });

    if (typeof props.onTypeaheadLoaded === 'function') {
      props.onTypeaheadLoaded();
      $fieldInput.typeahead('close');
    }

    $(this.fieldFormGroup).on('typeahead:select typeahead:autocomplete', (event, suggestion) => {
      if (props.onSuggestionSelected) {
        props.onSuggestionSelected(event, suggestion);
      }
    });
  }