///<reference path='../interfaces/IView.ts'/>
///<reference path='../interfaces/IObserver.ts'/>
///<reference path='../interfaces/IMediator.ts'/>

module puremvc
{
	"use strict";

	/**
	 * The <code>View</code> class for PureMVC.
	 *
	 * A singleton <code>IView</code> implementation.
	 *
	 * In PureMVC, the <code>View</code> class assumes these responsibilities:
	 * <UL>
	 * <LI>Maintain a cache of <code>IMediator</code> instances.
	 * <LI>Provide methods for registering, retrieving, and removing <code>IMediator</code>s.
	 * <LI>Notifiying <code>IMediator</code>s when they are registered or removed.
	 * <LI>Managing the <code>Observer</code> lists for each <code>INotification</code> in the
	 * application.
	 * <LI>Providing a method for attaching <code>IObservers</code> to an
	 * <code>INotification</code>'s <code>Observer</code> list.
	 * <LI>Providing a method for broadcasting an <code>INotification</code>.
	 * <LI>Notifying the <code>IObserver</code>s of a given <code>INotification</code> when it
	 * broadcasts.
	 */
	export class View
		implements IView
	{
		/**
		 * Mapping of <code>Mediator</code> names to <code>Mediator</code> instances.
		 *
		 * @protected
		 */
		protected _mediatorMap = new Map<string, IMediator>();

		/**
		 * Mapping of <code>Notification</code> names to <code>Observers</code> lists.
		 *
		 * @protected
		 */
		protected _observerMap = new Map<ENotify, Array<IObserver>>();

		/**
		 * This <code>IView</code> implementation is a singleton, so you should not call the
		 * constructor directly, but instead call the static singleton Factory method
		 * <code>View.instance</code>.
		 *
		 * @throws Error
		 * 		Throws an error if an instance for this singleton has already been constructed.
		 */
		constructor()
		{
			this.initializeView();
		}

		/**
		 * Initialize the singleton <code>View</code> instance.
		 *
		 * Called automatically by the constructor. This is the opportunity to initialize the
		 * singleton instance in a subclass without overriding the constructor.
		 */
		initializeView():void
		{

		}

		/**
		 * Register an <code>IObserver</code> to be notified of <code>INotifications</code> with a
		 * given name.
		 *
		 * @param name
		 * 		The name of the <code>INotifications</code> to notify this <code>IObserver</code>
		 * 		of.
		 *
		 * @param observer
		 * 		The <code>IObserver</code> to register.
		 */
		registerObserver(name:ENotify, observer:IObserver):void
		{
			let observers = this._observerMap.get(name);
			if (observers)
				observers.push(observer);
			else
				this._observerMap.set(name, [ observer ]);
		}

		/**
		 * Remove a list of <code>Observer</code>s for a given <code>notifyContext</code> from an
		 * <code>Observer</code> list for a given <code>INotification</code> name.
		 *
		 * @param name
		 * 		Which <code>IObserver</code> list to remove from.
		 *
		 * @param notifyContext
		 * 		Remove the <code>IObserver</code> with this object as its
		 *		<code>notifyContext</code>.
		 */
		removeObserver(name:ENotify, notifyContext:any):void
		{
			//The observer list for the notification under inspection
			let observers = this._observerMap.get(name);

			//Find the observer for the notifyContext.
			if (observers)
			{
				let i:number = observers.length;
				while(i--)
				{
					let observer:IObserver = observers[i];
					if (observer.compareNotifyContext(notifyContext))
					{
						observers.splice(i, 1);
						break;
					}
				}
				/*
				 * Also, when a Notification's Observer list length falls to zero, delete the
				 * notification key from the observer map.
				 */
				if (observers.length == 0)
					this._observerMap.delete(name);
			}
		}

		/**
		 * Notify the <code>IObserver</code>s for a particular <code>INotification</code>.
		 *
		 * All previously attached <code>IObserver</code>s for this <code>INotification</code>'s
		 * list are notified and are passed a reference to the <code>INotification</code> in the
		 * order in which they were registered.
		 *
		 * @param notification
		 * 		The <code>INotification</code> to notify <code>IObserver</code>s of.
		 */
		notifyObservers(name:any, body?:any):void
		{
			let observersRef/*Array*/ = this._observerMap.get(name);
			if (observersRef)
			{
				// Copy the array.
				let observers/*Array*/ = observersRef.slice(0);
				let len/*Number*/ = observers.length;
				for (let i/*Number*/=0; i<len; i++)
				{
					let observer/*Observer*/ = observers[i];
					observer.notifyObserver(name, body);
				}
			}
		}

		/**
		 * Register an <code>IMediator</code> instance with the <code>View</code>.
		 *
		 * Registers the <code>IMediator</code> so that it can be retrieved by name, and further
		 * interrogates the <code>IMediator</code> for its <code>INotification</code> interests.
		 *
		 * If the <code>IMediator</code> returns any <code>INotification</code> names to be
		 * notified about, an <code>Observer</code> is created to encapsulate the
		 * <code>IMediator</code> instance's <code>handleNotification</code> method and register
		 * it as an <code>Observer</code> for all <code>INotification</code>s the
		 * <code>IMediator</code> is interested in.
		 *
		 * @param mediator
		 * 		A reference to an <code>IMediator</code> implementation instance.
		 */
		registerMediator(mediator:IMediator):void
		{
			let name:string = mediator.getMediatorName();

			//Do not allow re-registration (you must removeMediator first).
			if (this._mediatorMap.has(name))
				return;

			//Register the Mediator for retrieval by name.
			this._mediatorMap.set(name, mediator);

			//Get Notification interests, if any.
			let interests = mediator.listNotificationInterests();
			let len:Number = interests.length;
			if (len>0)
			{
				//Create Observer referencing this mediator's handlNotification method.
				let observer:IObserver = new Observer(mediator.handleNotification, mediator);

				//Register Mediator as Observer for its list of Notification interests.
				for (let i:number=0;  i<len; i++)
					this.registerObserver(interests[i],  observer);
			}

			//Alert the mediator that it has been registered.
			mediator.onRegister();
		}

		/**
		 * Retrieve an <code>IMediator</code> from the <code>View</code>.
		 *
		 * @param mediatorName
		 * 		The name of the <code>IMediator</code> instance to retrieve.
		 *
		 * @return
		 * 		The <code>IMediator</code> instance previously registered with the given
		 *		<code>mediatorName</code> or an explicit <code>null</code> if it doesn't exists.
		 */
		retrieveMediator(mediatorName:string):IMediator|undefined
		{
			//Return a strict null when the mediator doesn't exist
			return this._mediatorMap.get(mediatorName);
		}

		/**
		 * Remove an <code>IMediator</code> from the <code>View</code>.
		 *
		 * @param mediatorName
		 * 		Name of the <code>IMediator</code> instance to be removed.
		 *
		 * @return
		 *		The <code>IMediator</code> that was removed from the <code>View</code> or a
		 *		strict <code>null</null> if the <code>Mediator</code> didn't exist.
		 */
		removeMediator(mediatorName:string):IMediator|undefined
		{
			// Retrieve the named mediator
			let mediator = this._mediatorMap.get(mediatorName);
			if (!mediator)
				return undefined;

			//Get Notification interests, if any.
			let interests = mediator.listNotificationInterests();

			//For every notification this mediator is interested in...
			let i:number = interests.length;
			while(i--)
				this.removeObserver(interests[i], mediator);

			// remove the mediator from the map
			this._mediatorMap.delete(mediatorName);

			//Alert the mediator that it has been removed
			mediator.onRemove();

			return mediator;
		}

		/**
		 * Check if a <code>IMediator</code> is registered or not.
		 *
		 * @param mediatorName
		 * 		The <code>IMediator</code> name to check whether it is registered.
		 *
		 * @return
		 *		A <code>Mediator</code> is registered with the given <code>mediatorName</code>.
		 */
		hasMediator(mediatorName:string):boolean
		{
			return this._mediatorMap.has(mediatorName);
		}

		/**
		 * Singleton instance local reference.
		 *
		 * @protected
		 */
		public static readonly instance:IView = new View();
	}
}