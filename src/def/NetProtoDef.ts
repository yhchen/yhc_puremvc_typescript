
module puremvc {

/**
	* 递归将 “T” 中及其子对象所有属性设置为只读
	* Make all properties recursive in T readonly
	*/
type _DeepReadonly<T> = {
	readonly [P in keyof T]: _DeepReadonly<T[P]>;
};

//Proto Msg Check
export type IMsgMap = {
	// Login
	'0x0101': Login.ILoginReq,
	'0x0102': Login.ILoginRsp,
	'0x0103': Login.ITest,
	// Player
	'0x0201': Player.IInfo,
	'0x0202': Player.ITest,

};

//Proto Msg Handler
const _SCHandlerMap = {
	// Login
	'0x0101': Login.LoginReq,
	'0x0102': Login.LoginRsp,
	'0x0103': Login.Test,
	// Player
	'0x0201': Player.Info,
	'0x0202': Player.Test,

};

export interface IHandler<T extends keyof IMsgMap> {
	readonly sid: T;//		package_id for index(string)
	readonly id: number;//	package_id for speed up send proto(number)
	readonly pt: any,//		protobuf-static class pointer
};
const _HandlerMap = {
	// Login
	// Login package
	Login: {
		// login request proto
		LoginReq: <IHandler<'0x0101'>>{sid: '0x0101', id: 257, pt: Login.LoginReq },
		// login response proto
		LoginRsp: <IHandler<'0x0102'>>{sid: '0x0102', id: 258, pt: Login.LoginRsp },
		// test script
		Test: <IHandler<'0x0103'>>{sid: '0x0103', id: 259, pt: Login.Test },
	},
	// Player
	// Player Package
	Player: {
		Info: <IHandler<'0x0201'>>{sid: '0x0201', id: 513, pt: Player.Info },
		Test: <IHandler<'0x0202'>>{sid: '0x0202', id: 514, pt: Player.Test },
	},

};
export const HandlerMap = _HandlerMap as _DeepReadonly<typeof _HandlerMap>;

export function EncodeH<T extends keyof IMsgMap>(_handler: IHandler<T>, proto: IMsgMap[T]) : Uint8Array|undefined {
	try {
		let buffer: protobuf.Writer = _handler.pt.encode(proto);
		return buffer.finish();
	} catch (ex) {
		console.error(`Encode package_id:${_handler.sid} failure. error:${ex}`);
	}
	return undefined;
}

export function DecodeH<T extends keyof IMsgMap>(_handler: IHandler<T>, buffer: Uint8Array) : IMsgMap[T]|undefined {
	try {
		return _handler.pt.decode(buffer);
	} catch (ex) {
		console.error(`Decode package_id:${_handler.sid} failure. error:${ex}`);
	}
	return undefined;
}

export function EncodeSC<T extends keyof IMsgMap>(package_id: T, proto: IMsgMap[T]) : Uint8Array|undefined {
	const package_handler = _SCHandlerMap[package_id];
	if (package_handler == null || (<any>package_handler).encode == null) {
		console.error(`Encode Proto failure. package type package_id:[${package_id}] not found.`);
		return undefined;
	}
	try {
		let buffer: protobuf.Writer = (<any>package_handler).encode(proto);
		return buffer.finish();
	} catch (ex) {
		console.error(`Encode package_id:${package_id} failure. error:${ex}`);
	}
	return undefined;
}

export function DecodeSC<T extends keyof IMsgMap>(package_id: T, buffer: Uint8Array) : IMsgMap[T]|undefined {
	const package_handler = _SCHandlerMap[package_id];
	if (package_handler == null) {
		console.error(`Decode Proto failure. package type package_id:[${package_id}] not found.`);
		return undefined;
	}
	try {
		return package_handler.decode(buffer);
	} catch (ex) {
		console.error(`Decode package_id:${package_id} failure. error:${ex}`);
	}
	return undefined;
}

}

