var $protobuf = window.protobuf;
$protobuf.roots.default=window;
/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.Login = (function() {
    
        /**
         * Namespace Login.
         * @exports Login
         * @namespace
         */
        var Login = {};
    
        Login.LoginReq = (function() {
    
            /**
             * Properties of a LoginReq.
             * @memberof Login
             * @interface ILoginReq
             * @property {string} account LoginReq account
             * @property {string} token LoginReq token
             * @property {string} version LoginReq version
             * @property {string|null} [platform] LoginReq platform
             */
    
            /**
             * Constructs a new LoginReq.
             * @memberof Login
             * @classdesc Represents a LoginReq.
             * @implements ILoginReq
             * @constructor
             * @param {Login.ILoginReq=} [properties] Properties to set
             */
            function LoginReq(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * LoginReq account.
             * @member {string} account
             * @memberof Login.LoginReq
             * @instance
             */
            LoginReq.prototype.account = "";
    
            /**
             * LoginReq token.
             * @member {string} token
             * @memberof Login.LoginReq
             * @instance
             */
            LoginReq.prototype.token = "";
    
            /**
             * LoginReq version.
             * @member {string} version
             * @memberof Login.LoginReq
             * @instance
             */
            LoginReq.prototype.version = "";
    
            /**
             * LoginReq platform.
             * @member {string} platform
             * @memberof Login.LoginReq
             * @instance
             */
            LoginReq.prototype.platform = "";
    
            /**
             * Encodes the specified LoginReq message. Does not implicitly {@link Login.LoginReq.verify|verify} messages.
             * @function encode
             * @memberof Login.LoginReq
             * @static
             * @param {Login.ILoginReq} message LoginReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoginReq.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.account);
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.token);
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.version);
                if (message.platform != null && message.hasOwnProperty("platform"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.platform);
                return writer;
            };
    
            /**
             * Decodes a LoginReq message from the specified reader or buffer.
             * @function decode
             * @memberof Login.LoginReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Login.LoginReq} LoginReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoginReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Login.LoginReq();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.account = reader.string();
                        break;
                    case 2:
                        message.token = reader.string();
                        break;
                    case 3:
                        message.version = reader.string();
                        break;
                    case 4:
                        message.platform = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("account"))
                    throw $util.ProtocolError("missing required 'account'", { instance: message });
                if (!message.hasOwnProperty("token"))
                    throw $util.ProtocolError("missing required 'token'", { instance: message });
                if (!message.hasOwnProperty("version"))
                    throw $util.ProtocolError("missing required 'version'", { instance: message });
                return message;
            };
    
            return LoginReq;
        })();
    
        Login.LoginRsp = (function() {
    
            /**
             * Properties of a LoginRsp.
             * @memberof Login
             * @interface ILoginRsp
             * @property {number} code LoginRsp code
             */
    
            /**
             * Constructs a new LoginRsp.
             * @memberof Login
             * @classdesc Represents a LoginRsp.
             * @implements ILoginRsp
             * @constructor
             * @param {Login.ILoginRsp=} [properties] Properties to set
             */
            function LoginRsp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * LoginRsp code.
             * @member {number} code
             * @memberof Login.LoginRsp
             * @instance
             */
            LoginRsp.prototype.code = 0;
    
            /**
             * Encodes the specified LoginRsp message. Does not implicitly {@link Login.LoginRsp.verify|verify} messages.
             * @function encode
             * @memberof Login.LoginRsp
             * @static
             * @param {Login.ILoginRsp} message LoginRsp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoginRsp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
                return writer;
            };
    
            /**
             * Decodes a LoginRsp message from the specified reader or buffer.
             * @function decode
             * @memberof Login.LoginRsp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Login.LoginRsp} LoginRsp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoginRsp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Login.LoginRsp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.code = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("code"))
                    throw $util.ProtocolError("missing required 'code'", { instance: message });
                return message;
            };
    
            return LoginRsp;
        })();
    
        Login.Test = (function() {
    
            /**
             * Properties of a Test.
             * @memberof Login
             * @interface ITest
             * @property {number|Long} code Test code
             * @property {number|Long} test Test test
             */
    
            /**
             * Constructs a new Test.
             * @memberof Login
             * @classdesc Represents a Test.
             * @implements ITest
             * @constructor
             * @param {Login.ITest=} [properties] Properties to set
             */
            function Test(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Test code.
             * @member {number|Long} code
             * @memberof Login.Test
             * @instance
             */
            Test.prototype.code = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * Test test.
             * @member {number|Long} test
             * @memberof Login.Test
             * @instance
             */
            Test.prototype.test = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Encodes the specified Test message. Does not implicitly {@link Login.Test.verify|verify} messages.
             * @function encode
             * @memberof Login.Test
             * @static
             * @param {Login.ITest} message Test message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Test.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.code);
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.test);
                return writer;
            };
    
            /**
             * Decodes a Test message from the specified reader or buffer.
             * @function decode
             * @memberof Login.Test
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Login.Test} Test
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Test.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Login.Test();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.code = reader.int64();
                        break;
                    case 2:
                        message.test = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("code"))
                    throw $util.ProtocolError("missing required 'code'", { instance: message });
                if (!message.hasOwnProperty("test"))
                    throw $util.ProtocolError("missing required 'test'", { instance: message });
                return message;
            };
    
            return Test;
        })();
    
        return Login;
    })();
    
    $root.Player = (function() {
    
        /**
         * Namespace Player.
         * @exports Player
         * @namespace
         */
        var Player = {};
    
        Player.Info = (function() {
    
            /**
             * Properties of an Info.
             * @memberof Player
             * @interface IInfo
             * @property {number} uid Info uid
             * @property {string} name Info name
             */
    
            /**
             * Constructs a new Info.
             * @memberof Player
             * @classdesc Represents an Info.
             * @implements IInfo
             * @constructor
             * @param {Player.IInfo=} [properties] Properties to set
             */
            function Info(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Info uid.
             * @member {number} uid
             * @memberof Player.Info
             * @instance
             */
            Info.prototype.uid = 0;
    
            /**
             * Info name.
             * @member {string} name
             * @memberof Player.Info
             * @instance
             */
            Info.prototype.name = "";
    
            /**
             * Encodes the specified Info message. Does not implicitly {@link Player.Info.verify|verify} messages.
             * @function encode
             * @memberof Player.Info
             * @static
             * @param {Player.IInfo} message Info message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Info.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                return writer;
            };
    
            /**
             * Decodes an Info message from the specified reader or buffer.
             * @function decode
             * @memberof Player.Info
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Player.Info} Info
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Info.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Player.Info();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.int32();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("uid"))
                    throw $util.ProtocolError("missing required 'uid'", { instance: message });
                if (!message.hasOwnProperty("name"))
                    throw $util.ProtocolError("missing required 'name'", { instance: message });
                return message;
            };
    
            return Info;
        })();
    
        Player.Test = (function() {
    
            /**
             * Properties of a Test.
             * @memberof Player
             * @interface ITest
             * @property {number} avator Test avator
             */
    
            /**
             * Constructs a new Test.
             * @memberof Player
             * @classdesc Represents a Test.
             * @implements ITest
             * @constructor
             * @param {Player.ITest=} [properties] Properties to set
             */
            function Test(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Test avator.
             * @member {number} avator
             * @memberof Player.Test
             * @instance
             */
            Test.prototype.avator = 0;
    
            /**
             * Encodes the specified Test message. Does not implicitly {@link Player.Test.verify|verify} messages.
             * @function encode
             * @memberof Player.Test
             * @static
             * @param {Player.ITest} message Test message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Test.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.avator);
                return writer;
            };
    
            /**
             * Decodes a Test message from the specified reader or buffer.
             * @function decode
             * @memberof Player.Test
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Player.Test} Test
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Test.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Player.Test();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.avator = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("avator"))
                    throw $util.ProtocolError("missing required 'avator'", { instance: message });
                return message;
            };
    
            return Test;
        })();
    
        return Player;
    })();

    return $root;
});
