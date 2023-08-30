function unique_name_552() {
				// if the editor isn't focused it needs to be updated, otherwise it's receiving user input
				if ($document[0].activeElement !== element[0]) {
					var val = ngModel.$viewValue || ''; // in case model is null
					ngModel.$oldViewValue = val;
					if(scope.taBind === 'text'){ //WYSIWYG Mode
						try{
							angular.element(val).find('script').remove(); // to prevent JS XSS insertion executing arbritrary code
						}catch(e){}; // catches when no HTML tags are present errors.
						element.html(val);
						element.find('a').on('click', function(e){
							e.preventDefault();
							return false;
						});
					}else if(isContentEditable || (element[0].tagName.toLowerCase() !== 'textarea' && element[0].tagName.toLowerCase() !== 'input')) // make sure the end user can SEE the html code.
						element.html(val.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, '&gt;'));
					else element.val(val); // only for input and textarea inputs
				}else if(!isContentEditable) element.val(val); // only for input and textarea inputs
			}