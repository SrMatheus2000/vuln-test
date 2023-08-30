function()
	{
		var color = input.value;
		ColorDialog.addRecentColor(color, 12);
		
		if (color != 'none' && color.charAt(0) != '#')
		{
			color = '#' + color;
		}

		applyFunction(color);
		editorUi.hideDialog();
	}