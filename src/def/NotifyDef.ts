
module puremvc
{
    export enum ENotify
    {
        Invaild = 0,
        StartUp = 1,
        Shutdown = 2,
        OpenUI = 3,
        CloseUI = 4,

        // User Define Type...
        CustomBegin = 10000,

        // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ add cutom notify type below ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    }

    export type TNotifyL =
    {
        [ENotify.StartUp]: {
            frameRate: number,
        },
        [ENotify.OpenUI]: {
            uiid: number,
            params: any,
        },
    }

    export type TNotifyLKey = keyof TNotifyL;
}
