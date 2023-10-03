function unique_name_231(dir,callback)
	{
		switch(_os.type())
		{
			case 'Windows_NT' :
				_cp.exec('rmdir /s "'+dir+'"',callback);
				break;
				
			case 'Linux'  :
			case 'Darwin' :
				_cp.exec('rm -rf "'+dir+'"',callback);
				break;

			default:
				throw 'unsupported OS :: '+_os.type();
		}
	}