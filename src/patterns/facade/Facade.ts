///<reference path='../../def/NotifyDef.ts'/>
///<reference path='../../interfaces/IFacade.ts'/>
///<reference path='../../interfaces/IModel.ts'/>
///<reference path='../../interfaces/IView.ts'/>
///<reference path='../../interfaces/IController.ts'/>
///<reference path='../../interfaces/IProxy.ts'/>
///<reference path='../../interfaces/IMediator.ts'/>
///<reference path='../../core/Controller.ts'/>
///<reference path='../../core/Model.ts'/>
///<reference path='../../core/View.ts'/>

module puremvc
{
	"use strict";

	/**
	 * A base singleton <code>IFacade</code> implementation.
	 *
	 * In PureMVC, the <code>Facade</code> class assumes these responsibilities:
	 *
	 * <UL>
	 * <LI>Initializing the <code>Model</code>, <code>View</code> and <code>Controller</code>
	 * singletons.
	 * <LI>Providing all the methods defined by the <code>IModel</code>, <code>IView</code>, &
	 * <code>IController</code> interfaces.
	 * <LI>Providing the ability to override the specific <code>Model</code>, <code>View</code> and
	 * <code>Controller</code> singletons created.
	 * <LI>Providing a single point of contact to the application for registering
	 * <code>Commands</code> and notifying <code>Observer</code>s.
	 *
	 * This <code>Facade</code> implementation is a singleton and cannot be instantiated directly,
	 * but instead calls the static singleton factory method <code>Facade.getInstance()</code>.
	 */
	export class Facade
		implements IFacade
	{
		/**
		 * Local reference to the <code>Model</code> singleton.
		 *
		 * @protected
		 */
		protected _model:IModel = NullModel;

		/**
		 * Local reference to the <code>View</code> singleton.
		 *
		 * @protected
		 */
		protected _view:IView = NullView;

		/**
		 * Local reference to the <code>Controller</code> singleton.
		 *
		 * @protected
		 */
		protected _controller:IController = NullController;

		/**
		 * Constructs a <code>Controller</code> instance.
		 *
		 * This <code>IFacade</code> implementation is a singleton, so you should not call the
		 * constructor directly, but instead call the static singleton Factory method
		 * <code>Facade.getInstance()</code>.
		 *
		 * @throws Error
		 *		Throws an error if an instance of this singleton has already been constructed.
		 */
		protected constructor()
		{
			this.initializeFacade();
		}

		/**
		 * Called automatically by the constructor.
		 * Initialize the singleton <code>Facade</code> instance.
		 *
		 * Override in your subclass to do any subclass specific initializations. Be sure to
		 * extend the <code>Facade</code> with the methods and properties on your implementation
		 * and call <code>Facade.initializeFacade()</code>.
		 *
		 * @protected
		 */
		protected initializeFacade():void
		{
			this.initializeModel();
			this.initializeController();
			this.initializeView();
		}

		/**
		 * Initialize the <code>Model</code>.
		 *
		 * Called by the <code>initializeFacade</code> method. Override this method in your
		 * subclass of <code>Facade</code> if one or both of the following are true:
		 *
		 * <UL>
		 * <LI> You wish to initialize a different <code>IModel</code>.
		 * <LI> You have <code>Proxy</code>s to register with the <code>Model</code> that do not
		 * retrieve a reference to the <code>Facade</code> at construction time.
		 *
		 * If you don't want to initialize a different <code>IModel</code>, call
		 * <code>super.initializeModel()</code> at the beginning of your method, then register
		 * <code>Proxy</code>s.
		 *
		 * Note: This method is <i>rarely</i> overridden; in practice you are more likely to use a
		 * <code>Command</code> to create and register <code>Proxy</code>s with the
		 * <code>Model</code>, since <code>Proxy</code>s with mutable data will likely need to send
		 * <code>INotification</code>s and thus will likely want to fetch a reference to the
		 * <code>Facade</code> during their construction.
		 *
		 * @protected
		 */
		protected initializeModel():void
		{
			if (!this._model)
				this._model = Model.instance;
		}

		/**
		 * Initialize the <code>Controller</code>.
		 *
		 * Called by the <code>initializeFacade</code> method. Override this method in your
		 * subclass of <code>Facade</code> if one or both of the following are true:
		 *
		 * <UL>
		 * <LI>You wish to initialize a different <code>IController</code>.
		 * <LI>You have <code>ICommand</code>s to register with the <code>Controller</code> at
		 * startup.
		 *
		 * If you don't want to initialize a different <code>IController</code>, call
		 * <code>super.initializeController()</code> at the beginning of your method, then register
		 * <code>Command</code>s.
		 *
		 * @protected
		 */
		protected initializeController():void
		{
			if (!this._controller)
				this._controller = Controller.instance;
		}

		/**
		 * Initialize the <code>View</code>.
		 *
		 * Called by the <code>initializeFacade</code> method. Override this method in your
		 * subclass of <code>Facade</code> if one or both of the following are true:
		 * <UL>
		 * <LI> You wish to initialize a different <code>IView</code>.
		 * <LI> You have <code>Observers</code> to register with the <code>View</code>
		 *
		 * If you don't want to initialize a different <code>IView</code>, call
		 * <code>super.initializeView()</code> at the beginning of your method, then register
		 * <code>IMediator</code> instances.
		 *
		 * Note: This method is <i>rarely</i> overridden; in practice you are more likely to use a
		 * <code>Command</code> to create and register <code>Mediator</code>s with the
		 * <code>View</code>, since <code>IMediator</code> instances will need to send
		 * <code>INotification</code>s and thus will likely want to fetch a reference to the
		 * <code>Facade</code> during their construction.
		 *
		 * @protected
		 */
		protected initializeView():void
		{
			if (!this._view)
				this._view = View.instance;
		}

		/**
		 * Register an <code>ICommand</code> with the <code>IController</code> associating it to a
		 * <code>INotification</code> name.
		 *
		 * @param notificationName
		 *		The name of the <code>INotification</code> to associate the <code>ICommand</code>
		 *		with.

		 * @param commandClassRef
		 * 		A reference to the constructor of the <code>ICommand</code>.
		 */
		registerCommand(notificationName:ENotify, commandClassRef:Function):void
		{
			this._controller.registerCommand(notificationName, <any>commandClassRef);
		}

		/**
		 * Remove a previously registered <code>ICommand</code> to <code>INotification</code>
		 * mapping from the <code>Controller</code>.
		 *
		 * @param notificationName
		 *		The name of the <code>INotification</code> to remove the <code>ICommand</code>
		 *		mapping for.
		 */
		removeCommand(notificationName:ENotify):void
		{
			this._controller.removeCommand(notificationName);
		}

		/**
		 * Check if an <code>ICommand</code> is registered for a given <code>Notification</code>.
		 *
		 * @param notificationName
		 * 		The name of the <code>INotification</code> to verify for the existence of an
		 * 		<code>ICommand</code> mapping for.
		 *
		 * @return
		 * 		A <code>Command</code> is currently registered for the given
		 *		<code>notificationName</code>.
		 */
		hasCommand(notificationName:ENotify):boolean
		{
			return this._controller.hasCommand(notificationName);
		}

		/**
		 * Register an <code>IProxy</code> with the <code>Model</code> by name.
		 *
		 * @param proxy
		 *		The <code>IProxy</code> to be registered with the <code>Model</code>.
		 */
		registerProxy(proxy:IProxy):void
		{
			this._model.registerProxy(proxy);
		}

		/**
		 * Retrieve an <code>IProxy</code> from the <code>Model</code> by name.
		 *
		 * @param proxyName
		 * 		The name of the <code>IProxy</code> to be retrieved.
		 *
		 * @return
		 * 		The <code>IProxy</code> previously registered with the given
		 *		<code>proxyName</code>.
		 */
		retrieveProxy(proxyName:string):IProxy|undefined
		{
			return this._model.retrieveProxy(proxyName);
		}

		/**
		 * Remove an <code>IProxy</code> from the <code>Model</code> by name.
		 *
		 * @param proxyName
		 *		The <code>IProxy</code> to remove from the <code>Model</code>.
		 *
		 * @return
		 *		The <code>IProxy</code> that was removed from the <code>Model</code>
		 */
		removeProxy (proxyName:string):IProxy|undefined
		{
			let proxy;
			if (this._model)
				proxy = this._model.removeProxy(proxyName);

			return proxy
		}

		/**
		 * Check if a <code>Proxy</code> is registered.
		 *
		 * @param proxyName
		 * 		The <code>IProxy</code> to verify the existence of a registration with the
		 *		<code>IModel</code>.
		 *
		 * @return
		 * 		A <code>Proxy</code> is currently registered with the given	<code>proxyName</code>.
		 */
		hasProxy(proxyName:string):boolean
		{
			return this._model.hasProxy(proxyName);
		}

		/**
		 * Register a <code>IMediator</code> with the <code>IView</code>.
		 *
		 * @param mediator
		 		A reference to the <code>IMediator</code>.
		 */
		registerMediator(mediator:IMediator):void
		{
			if (this._view)
				this._view.registerMediator(mediator);
		}

		/**
		 * Retrieve an <code>IMediator</code> from the <code>IView</code>.
		 *
		 * @param mediatorName
		 * 		The name of the registered <code>Mediator</code> to retrieve.
		 *
		 * @return
		 *		The <code>IMediator</code> previously registered with the given
		 *		<code>mediatorName</code>.
		 */
		retrieveMediator(mediatorName:string):IMediator|undefined
		{
			return this._view.retrieveMediator(mediatorName);
		}

		/**
		 * Remove an <code>IMediator</code> from the <code>IView</code>.
		 *
		 * @param mediatorName
		 * 		Name of the <code>IMediator</code> to be removed.
		 *
		 * @return
		 *		The <code>IMediator</code> that was removed from the <code>IView</code>
		 */
		removeMediator(mediatorName:string):IMediator|undefined
		{
			let mediator;
			if (this._view)
				mediator = this._view.removeMediator(mediatorName);

			return mediator;
		}

		/**
		 * Check if a <code>Mediator</code> is registered or not
		 *
		 * @param mediatorName
		 * 		The name of the <code>IMediator</code> to verify the existence of a registration
		 *		for.
		 *
		 * @return
		 * 		An <code>IMediator</code> is registered with the given <code>mediatorName</code>.
		 */
		hasMediator(mediatorName:string):boolean
		{
			return this._view.hasMediator(mediatorName);
		}

		/**
		 * Notify the <code>IObservers</code> for a particular <code>INotification</code>.
		 *
		 * This method is left public mostly for backward compatibility, and to allow you to
		 * send custom notification classes using the <code>Facade</code>.
		 *
		 *
		 * Usually you should just call <code>sendNotification</code> and pass the parameters,
		 * never having to construct the <code>INotification</code> yourself.
		 *
		 * @param notification
		 * 		The <code>INotification</code> to have the <code>IView</code> notify
		 *		<code>IObserver</code>s	of.
		 */
		notifyObservers(name: any, body?: any):void
		{
			if (this._view)
				this._view.notifyObservers(name, body);
		}

		/**
		 * Create and send an <code>INotification</code>.
		 *
		 * Keeps us from having to construct new notification instances in our implementation code.
		 *
		 * @param name
		 *		The name of the notification to send.
		 *
		 * @param body
		 *		The body of the notification to send.
		 */
		sendNotification(name:any, body?:any):void
		{
			this.notifyObservers(name, body);
		}

		/**
		 * The singleton <code>Facade</code> instance.
		 *
		 * @protected
		 */
		public static readonly instance:IFacade = new Facade();
	}
}