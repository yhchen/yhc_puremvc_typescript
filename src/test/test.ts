module puremvc
{
	Facade.instance.notifyObservers(ENotify.CloseUI, {uiid:0});
	Facade.instance.notifyObservers(ENotify.StartUp, {frameRate:0});
	Facade.instance.notifyObservers(ENotify.StartUp);
	Facade.instance.sendNotification(ENotify.StartUp, {frameRate:0});
}