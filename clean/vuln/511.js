(value) => {
            if (props.suggestionText) {
              return `<div><strong>${props.suggestionText}</strong> ${value[props.displayKey]}</div>`;
            }
            return `<div>${value.value}</div>`;
          }