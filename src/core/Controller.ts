///<reference path='../def/CommonDef.ts'/>
///<reference path='../interfaces/IController.ts'/>
///<reference path='../interfaces/IView.ts'/>
///<reference path='../interfaces/ICommand.ts'/>
///<reference path='../patterns/observer/Observer.ts'/>
///<reference path='../core/View.ts'/>

module puremvc
{
	"use strict";

	/**
	 * The <code>Controller</code> class for PureMVC.
	 *
	 * A singleton <code>IController</code> implementation.
	 *
	 * In PureMVC, the <code>Controller</code> class follows the 'Command and Controller' strategy,
	 * and assumes these responsibilities:
	 *
	 * <UL>
	 * <LI>Remembering which <code>ICommand</code>s are intended to handle which
	 * <code>INotification</code>s.
	 * <LI>Registering itself as an <code>IObserver</code> with the <code>View</code> for each
	 * <code>INotification</code> that it has an <code>ICommand</code> mapping for.
	 * <LI>Creating a new instance of the proper <code>ICommand</code> to handle a given
	 * <code>INotification</code> when notified by the <code>View</code>.
	 * <LI>Calling the <code>ICommand</code>'s <code>execute</code> method, passing in the
	 * <code>INotification</code>.
	 *
	 * Your application must register <code>ICommand</code>s with the <code>Controller</code>.
	 *
 	 * The simplest way is to subclass </code>Facade</code>, and use its
	 * <code>initializeController</code> method to add your registrations.
	 */
	export class Controller
		implements IController
	{
		/**
		 * Local reference to the <code>View</code> singleton.
		 *
		 * @protected
		 */
		view:IView = NullView;

		/**
		 * Mapping of <code>Notification<code> names to <code>Command</code> constructors references.
		 *
		 * @protected
		 */
		commandMap = new Map<ENotify, Function>();

		/**
		/**
		 * Constructs a <code>Controller</code> instance.
		 *
		 * This <code>IController</code> implementation is a singleton, so you should not call the
		 * constructor directly, but instead call the static singleton Factory method
		 * <code>Controller.instance</code>.
		 *
		 * @throws Error
		 * 		Throws an error if an instance for this singleton has already been constructed.
		 */
		constructor()
		{
			this.initializeController();
		}

		/**
		 * Initialize the singleton <code>Controller</code> instance.
		 *
		 * Called automatically by the constructor.
		 *
		 * Note that if you are using a subclass of <code>View</code> in your application, you
		 * should <i>also</i> subclass <code>Controller</code> and override the
		 * <code>initializeController</code> method in the following way:
		 *
		 * <pre>
		 *		// ensure that the Controller is talking to my IView implementation
		 *		initializeController():void
		 *		{
		 *			this.view = MyView.instance;
		 *		}
		 * </pre>
		 *
		 * @protected
		 */
		initializeController():void
		{
			this.view = View.instance;
		}

		/**
		 * If an <code>ICommand</code> has previously been registered to handle the given
		 * <code>INotification</code>, then it is executed.
		 *
		 * @param notification
		 * 		The <code>INotification</code> the command will receive as parameter.
		 */
		executeCommand(name:any, body?:any):void
		{
			/*
			 * Typed any here instead of <code>Function</code> (won't compile if set to Function
			 * because today the compiler consider that <code>Function</code> is not newable and
			 * doesn't have a <code>Class</code> type)
			 */
			let commandClassRef:any = this.commandMap.get(name);
			if (commandClassRef)
			{
				let command:ICommand = <ICommand> /*</>*/ new commandClassRef();
				command.execute(name, body);
			}
		}

		/**
		 * Register a particular <code>ICommand</code> class as the handler for a particular
		 * <code>INotification</code>.
		 *
		 * If an <code>ICommand</code> has already been registered to handle
		 * <code>INotification</code>s with this name, it is no longer used, the new
		 * <code>ICommand</code> is used instead.
		 *
		 * The <code>Observer</code> for the new <code>ICommand</code> is only created if this the
		 * first time an <code>ICommand</code> has been registered for this
		 * <code>Notification</code> name.
		 *
		 * @param notificationName
		 * 		The name of the <code>INotification</code>.
		 *
		 * @param commandClassRef
		 * 		The constructor of the <code>ICommand</code>.
		 */
		registerCommand(notificationName:ENotify, commandClassRef:Function):void
		{
			if (!this.commandMap.has(notificationName))
				this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));

			this.commandMap.set(notificationName, commandClassRef);
		}

		/**
		 * Check if an <code>ICommand</code> is registered for a given <code>Notification</code>.
		 *
		 * @param notificationName
		 * 		Name of the <code>Notification</code> to check wheter an <code>ICommand</code> is
		 * 		registered for.
		 *
		 * @return
		 * 		An <code>ICommand</code> is currently registered for the given
		 * 		<code>notificationName</code>.
		 */
		hasCommand(notificationName:ENotify):boolean
		{
			return this.commandMap.has(notificationName);
		}

		/**
		 * Remove a previously registered <code>ICommand</code> to <code>INotification</code>
		 * mapping.
		 *
		 * @param notificationName
		 * 		The name of the <code>INotification</code> to remove the <code>ICommand</code>
		 * 		mapping for.
		 */
		removeCommand(notificationName:ENotify):void
		{
			// if the Command is registered...
			if (this.hasCommand(notificationName))
			{
				this.view.removeObserver(notificationName, this);
				this.commandMap.delete(notificationName);
			}
		}

		/**
		 * Singleton instance local reference.
		 *
		 * @protected
		 */
		static readonly instance:IController = new Controller();
	}
}