///<reference path='../../interfaces/ICommand.ts'/>
///<reference path='../../interfaces/INotifier.ts'/>
///<reference path='../../interfaces/INotification.ts'/>
///<reference path='../../patterns/observer/Notifier.ts'/>

module puremvc
{
	"use strict";

	/**
	 * A base <code>ICommand</code> implementation that executes other <code>ICommand</code>s.
	 *
	 * A <code>MacroCommand</code> maintains an list of <code>ICommand</code> constructor references
	 * called <i>SubCommand</i>s.
	 *
	 * When <code>execute</code> is called, the <code>MacroCommand</code> instantiates and calls
	 * <code>execute</code> on each of its <i>SubCommands</i> turn. Each <i>SubCommand</i> will be
	 * passed a reference to the original <code>INotification</code> that was passed to the
	 * <code>MacroCommand</code>'s <code>execute</code> method.
	 *
	 * Unlike <code>SimpleCommand</code>, your subclass should not override <code>execute</code>,
	 * but instead, should override the <code>initializeMacroCommand</code> method, calling
	 * <code>addSubCommand</code> once for each <i>SubCommand</i> to be executed.
	 */
	export class MacroCommand
		extends Notifier
		implements ICommand, INotifier
	{
		/**
		 * An array of <code>ICommand</code>s.
		 *
		 * @protected
		 */
		protected _subCommands = new Array<Function>();

		/**
		 * Constructs a <code>MacroCommand</code> instance.
		 *
		 * You should not need to define a constructor in your subclasses, instead, override the
		 * <code>initializeMacroCommand</code> method.
		 *
		 * If your subclass does define a constructor, be  sure to call <code>super()</code>.
		 */
		constructor()
		{
			super();
			this.initializeMacroCommand();
		}

		/**
		 * Initialize the <code>MacroCommand</code>.
		 *
		 * In your subclass, override this method to  initialize the <code>MacroCommand</code>'s
		 * <i>SubCommand</i> list with <code>ICommand</code> class references like this:
		 *
		 * <pre>
		 *		// Initialize MyMacroCommand
		 *		initializeMacroCommand():void
		 *		{
		 *			this.addSubCommand(FirstCommand);
		 *			this.addSubCommand(SecondCommand);
		 *			this.addSubCommand(ThirdCommand);
		 *		}
		 * </pre>
		 *
		 * Note that <i>subCommand</i>s may be any <code>ICommand</code> implementor so
		 * <code>MacroCommand</code>s or <code>SimpleCommand</code>s are both acceptable.
		 */
		initializeMacroCommand():void
		{

		}

		/**
		 * Add an entry to the <i>subCommands</i> list.
		 *
		 * The <i>subCommands</i> will be called in First In/First Out (FIFO) order.
		 *
		 * @param commandClassRef
		 *		A reference to the constructor of the <code>ICommand</code>.
		 */
		public addSubCommand(commandClassRef:Function):void
		{
			this._subCommands.push(commandClassRef);
		}

		/**
		 * Execute this <code>MacroCommand</code>'s <i>SubCommands</i>.
		 *
		 * The <i>SubCommands</i> will be called in First In/First Out (FIFO)
		 * order.
		 *
		 * @param notification
		 *		The <code>INotification</code> object to be passed to each <i>SubCommand</i> of
		 *		the list.
		 *
		 * @final
		 */
		public execute(notification:any):void
		{
			let subCommands:Function[] = this._subCommands.slice(0);
			let len = this._subCommands.length;
			for (let i=0; i<len; i++)
			{
				/*
				 * Typed any here instead of <code>Function</code> (won't compile if set to Function
				 * because today the compiler consider that <code>Function</code> is not newable and
				 * doesn't have a <code>Class</code> type)
				 */
				let commandClassRef:any = subCommands[i];
				let commandInstance:ICommand = <ICommand> /*</>*/ new commandClassRef();
				commandInstance.execute(notification);
			}

			this._subCommands.splice(0);
		}
	}
}