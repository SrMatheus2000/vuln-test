function(pinNumber, direction) {
	var _self = this;
	_self.pinNumber = pinNumber;
	_self.direction = direction;
	currentValue = -1;

	proc.exec([gpio, 'mode', pinNumber, direction].join(' '), function(error, stdout, stderr) {
		if (error) throw new Error(stderr);
		_self.emit(gpioEventNames.ready);
		if (_self.direction === 'in') {
			setInterval(function() {
				_self.read(function(value) {
					if (currentValue !== value) {
						currentValue = value;
						_self.emit(gpioEventNames.change, currentValue);
						if (parseInt(currentValue,10)) {
							_self.emit(gpioEventNames.rise);
						}
						else {
							_self.emit(gpioEventNames.fall);
						}
					}
				});
			}, 100);
		}
	});
}