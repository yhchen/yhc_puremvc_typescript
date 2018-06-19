
/** Namespace Login. */
declare namespace Login {

    /** Properties of a LoginReq. */
    interface ILoginReq {

        /** LoginReq account */
        account: string;

        /** LoginReq token */
        token: string;

        /** LoginReq version */
        version: string;

        /** LoginReq platform */
        platform?: (string|null);
    }

    /** Represents a LoginReq. */
    class LoginReq implements ILoginReq {

        /**
         * Constructs a new LoginReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Login.ILoginReq);

        /** LoginReq account. */
        public account: string;

        /** LoginReq token. */
        public token: string;

        /** LoginReq version. */
        public version: string;

        /** LoginReq platform. */
        public platform: string;

        /**
         * Encodes the specified LoginReq message. Does not implicitly {@link Login.LoginReq.verify|verify} messages.
         * @param message LoginReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Login.ILoginReq, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a LoginReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Login.LoginReq;
    }

    /** Properties of a LoginRsp. */
    interface ILoginRsp {

        /** LoginRsp code */
        code: number;
    }

    /** Represents a LoginRsp. */
    class LoginRsp implements ILoginRsp {

        /**
         * Constructs a new LoginRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: Login.ILoginRsp);

        /** LoginRsp code. */
        public code: number;

        /**
         * Encodes the specified LoginRsp message. Does not implicitly {@link Login.LoginRsp.verify|verify} messages.
         * @param message LoginRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Login.ILoginRsp, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a LoginRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Login.LoginRsp;
    }

    /** Properties of a Test. */
    interface ITest {

        /** Test code */
        code: ((number|protobuf.Long));

        /** Test test */
        test: ((number|protobuf.Long));
    }

    /** Represents a Test. */
    class Test implements ITest {

        /**
         * Constructs a new Test.
         * @param [properties] Properties to set
         */
        constructor(properties?: Login.ITest);

        /** Test code. */
        public code: ((number|protobuf.Long));

        /** Test test. */
        public test: ((number|protobuf.Long));

        /**
         * Encodes the specified Test message. Does not implicitly {@link Login.Test.verify|verify} messages.
         * @param message Test message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Login.ITest, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Test message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Test
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Login.Test;
    }
}

/** Namespace Player. */
declare namespace Player {

    /** Properties of an Info. */
    interface IInfo {

        /** Info uid */
        uid: number;

        /** Info name */
        name: string;
    }

    /** Represents an Info. */
    class Info implements IInfo {

        /**
         * Constructs a new Info.
         * @param [properties] Properties to set
         */
        constructor(properties?: Player.IInfo);

        /** Info uid. */
        public uid: number;

        /** Info name. */
        public name: string;

        /**
         * Encodes the specified Info message. Does not implicitly {@link Player.Info.verify|verify} messages.
         * @param message Info message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Player.IInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an Info message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Info
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Player.Info;
    }

    /** Properties of a Test. */
    interface ITest {

        /** Test avator */
        avator: number;
    }

    /** Represents a Test. */
    class Test implements ITest {

        /**
         * Constructs a new Test.
         * @param [properties] Properties to set
         */
        constructor(properties?: Player.ITest);

        /** Test avator. */
        public avator: number;

        /**
         * Encodes the specified Test message. Does not implicitly {@link Player.Test.verify|verify} messages.
         * @param message Test message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Player.ITest, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Test message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Test
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Player.Test;
    }
}
