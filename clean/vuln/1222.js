function unique_name_711 (key, value) {
                    value = (value === null) ? 'null' : value;

                    if (key == 'type' && value.toLowerCase() == 'all') {
                        value = '<span class="attention">' + value + '</span>';
                    }
                    if (key == 'Extra') {
                        value = value.replace(/(using (temporary|filesort))/gi, '<span class="attention">$1</span>');
                    }
                    explain += key + ': ' + value + '<br />';
                }