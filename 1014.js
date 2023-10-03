function unique_name_554($sanitize, $document, taFixChrome){
	// Uses for this are textarea or input with ng-model and ta-bind='text' OR any non-form element with contenteditable="contenteditable" ta-bind="html|text" ng-model
	return {
		require: 'ngModel',
		scope: {'taBind': '@'},
		link: function(scope, element, attrs, ngModel){
			var isContentEditable = element[0].tagName.toLowerCase() !== 'textarea' && element[0].tagName.toLowerCase() !== 'input' && element.attr('contenteditable') !== undefined && element.attr('contenteditable');
			var isReadonly = false;
			// in here we are undoing the converts used elsewhere to prevent the < > and & being displayed when they shouldn't in the code.
			var compileHtml = function(){
				var result = taFixChrome(element).html();
				if(scope.taBind === 'html' && isContentEditable) result = result.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, '&');
				return result;
			};
			
			scope.$parent['updateTaBind' + scope.taBind] = function(){//used for updating when inserting wrapped elements
				var compHtml = compileHtml();
				var tempParsers = ngModel.$parsers;
				ngModel.$parsers = []; // temp disable of the parsers
				ngModel.$oldViewValue = compHtml;
				ngModel.$setViewValue(compHtml);
				ngModel.$parsers = tempParsers;
			};
			
			//this code is used to update the models when data is entered/deleted
			if(isContentEditable){
				element.on('keyup', function(e){
					if(!isReadonly) ngModel.$setViewValue(compileHtml());
				});
			}
			
			ngModel.$parsers.push(function(value){
				// all the code here takes the information from the above keyup function or any other time that the viewValue is updated and parses it for storage in the ngModel
				if(ngModel.$oldViewValue === undefined) ngModel.$oldViewValue = value;
				try{
					$sanitize(value); // this is what runs when ng-bind-html is used on the variable
				}catch(e){
					return ngModel.$oldViewValue; //prevents the errors occuring when we are typing in html code
				}
				ngModel.$oldViewValue = value;
				return value;
			});
			
			// changes to the model variable from outside the html/text inputs
			ngModel.$render = function() {
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
			};
			
			if(!!attrs.taReadonly){
				//set initial value
				if(scope.$parent.$eval(attrs.taReadonly)){ // we changed to readOnly mode (taReadonly='true')
					if(element[0].tagName.toLowerCase() === 'textarea' || element[0].tagName.toLowerCase() === 'input') element.attr('disabled', 'disabled');
					if(element.attr('contenteditable') !== undefined && element.attr('contenteditable')) element.removeAttr('contenteditable');
				}else{ // we changed to NOT readOnly mode (taReadonly='false')
					if(element[0].tagName.toLowerCase() === 'textarea' || element[0].tagName.toLowerCase() === 'input') element.removeAttr('disabled');
					else if(isContentEditable) element.attr('contenteditable', 'true');
				}
				scope.$parent.$watch(attrs.taReadonly, function(newVal, oldVal){ // taReadonly only has an effect if the taBind element is an input or textarea or has contenteditable='true' on it. Otherwise it is readonly by default
					if(oldVal === newVal) return;
					if(newVal){ // we changed to readOnly mode (taReadonly='true')
						if(element[0].tagName.toLowerCase() === 'textarea' || element[0].tagName.toLowerCase() === 'input') element.attr('disabled', 'disabled');
						if(element.attr('contenteditable') !== undefined && element.attr('contenteditable')) element.removeAttr('contenteditable');
					}else{ // we changed to NOT readOnly mode (taReadonly='false')
						if(element[0].tagName.toLowerCase() === 'textarea' || element[0].tagName.toLowerCase() === 'input') element.removeAttr('disabled');
						else if(isContentEditable) element.attr('contenteditable', 'true');
					}
					isReadonly = newVal;
				});
			}
		}
	};
}