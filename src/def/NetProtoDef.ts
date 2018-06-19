module puremvc
{
	export enum ENetCmd
	{
		Login_Init = 0x0101,
		Login_Login = 0x0102,
	}

	export type TNetProtoT = {
		[ENetCmd.Login_Init]: {
			uid: number,
			name: string,
		},
	}
}
