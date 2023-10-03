function prepare(_html)
	{
		// Free and null the old tooltip_div
		hide();

		//Generate the tooltip div, set it's text and append it to the body tag
		tooltip_div = jQuery(_wnd.document.createElement('div'));
		tooltip_div.hide();
		tooltip_div.append(_html);
		tooltip_div.addClass("egw_tooltip");
		jQuery(_wnd.document.body).append(tooltip_div);

		//The tooltip should automatically hide when the mouse comes over it
		tooltip_div.mouseenter(function() {
				hide();
		});
	}