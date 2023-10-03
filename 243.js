row => {
          const divRow = document.createElement('div')
          divRow.className = 'item'
          // divRow.style.color = config.color;
          divRow.onmouseover = onMouseOver
          divRow.onmouseout = onMouseOut
          divRow.onmousedown = onMouseDown
          divRow.__hint = row
          divRow.innerHTML = row.substring(0, token.length) + '<b>' + row.substring(token.length) + '</b>'
          elem.appendChild(divRow)
          return divRow
        }