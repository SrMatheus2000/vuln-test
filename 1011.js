function unique_name_551(value){
				// all the code here takes the information from the above keyup function or any other time that the viewValue is updated and parses it for storage in the ngModel
				if(ngModel.$oldViewValue === undefined) ngModel.$oldViewValue = value;
				try{
					$sanitize(value); // this is what runs when ng-bind-html is used on the variable
				}catch(e){
					return ngModel.$oldViewValue; //prevents the errors occuring when we are typing in html code
				}
				ngModel.$oldViewValue = value;
				return value;
			}