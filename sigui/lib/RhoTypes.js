/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/

const $protobuf = protobuf; // ISSUE: global. but powerless, right?

const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const Par = $root.Par = (() => {

    function Par(properties) {
        this.sends = [];
        this.receives = [];
        this.news = [];
        this.exprs = [];
        this.matches = [];
        this.ids = [];
        this.bundles = [];
        this.connectives = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    Par.prototype.sends = $util.emptyArray;
    Par.prototype.receives = $util.emptyArray;
    Par.prototype.news = $util.emptyArray;
    Par.prototype.exprs = $util.emptyArray;
    Par.prototype.matches = $util.emptyArray;
    Par.prototype.ids = $util.emptyArray;
    Par.prototype.bundles = $util.emptyArray;
    Par.prototype.connectives = $util.emptyArray;
    Par.prototype.locallyFree = $util.newBuffer([]);
    Par.prototype.connectiveUsed = false;

    Par.create = function create(properties) {
        return new Par(properties);
    };

    Par.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sends != null && message.sends.length)
            for (let i = 0; i < message.sends.length; ++i)
                $root.Send.encode(message.sends[i], writer.uint32(10).fork()).ldelim();
        if (message.receives != null && message.receives.length)
            for (let i = 0; i < message.receives.length; ++i)
                $root.Receive.encode(message.receives[i], writer.uint32(18).fork()).ldelim();
        if (message.news != null && message.news.length)
            for (let i = 0; i < message.news.length; ++i)
                $root.New.encode(message.news[i], writer.uint32(34).fork()).ldelim();
        if (message.exprs != null && message.exprs.length)
            for (let i = 0; i < message.exprs.length; ++i)
                $root.Expr.encode(message.exprs[i], writer.uint32(42).fork()).ldelim();
        if (message.matches != null && message.matches.length)
            for (let i = 0; i < message.matches.length; ++i)
                $root.Match.encode(message.matches[i], writer.uint32(50).fork()).ldelim();
        if (message.ids != null && message.ids.length)
            for (let i = 0; i < message.ids.length; ++i)
                $root.GPrivate.encode(message.ids[i], writer.uint32(58).fork()).ldelim();
        if (message.connectives != null && message.connectives.length)
            for (let i = 0; i < message.connectives.length; ++i)
                $root.Connective.encode(message.connectives[i], writer.uint32(66).fork()).ldelim();
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            writer.uint32(74).bytes(message.locallyFree);
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            writer.uint32(80).bool(message.connectiveUsed);
        if (message.bundles != null && message.bundles.length)
            for (let i = 0; i < message.bundles.length; ++i)
                $root.Bundle.encode(message.bundles[i], writer.uint32(90).fork()).ldelim();
        return writer;
    };

    Par.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    Par.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Par();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.sends && message.sends.length))
                    message.sends = [];
                message.sends.push($root.Send.decode(reader, reader.uint32()));
                break;
            case 2:
                if (!(message.receives && message.receives.length))
                    message.receives = [];
                message.receives.push($root.Receive.decode(reader, reader.uint32()));
                break;
            case 4:
                if (!(message.news && message.news.length))
                    message.news = [];
                message.news.push($root.New.decode(reader, reader.uint32()));
                break;
            case 5:
                if (!(message.exprs && message.exprs.length))
                    message.exprs = [];
                message.exprs.push($root.Expr.decode(reader, reader.uint32()));
                break;
            case 6:
                if (!(message.matches && message.matches.length))
                    message.matches = [];
                message.matches.push($root.Match.decode(reader, reader.uint32()));
                break;
            case 7:
                if (!(message.ids && message.ids.length))
                    message.ids = [];
                message.ids.push($root.GPrivate.decode(reader, reader.uint32()));
                break;
            case 11:
                if (!(message.bundles && message.bundles.length))
                    message.bundles = [];
                message.bundles.push($root.Bundle.decode(reader, reader.uint32()));
                break;
            case 8:
                if (!(message.connectives && message.connectives.length))
                    message.connectives = [];
                message.connectives.push($root.Connective.decode(reader, reader.uint32()));
                break;
            case 9:
                message.locallyFree = reader.bytes();
                break;
            case 10:
                message.connectiveUsed = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    Par.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    Par.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sends != null && message.hasOwnProperty("sends")) {
            if (!Array.isArray(message.sends))
                return "sends: array expected";
            for (let i = 0; i < message.sends.length; ++i) {
                let error = $root.Send.verify(message.sends[i]);
                if (error)
                    return "sends." + error;
            }
        }
        if (message.receives != null && message.hasOwnProperty("receives")) {
            if (!Array.isArray(message.receives))
                return "receives: array expected";
            for (let i = 0; i < message.receives.length; ++i) {
                let error = $root.Receive.verify(message.receives[i]);
                if (error)
                    return "receives." + error;
            }
        }
        if (message.news != null && message.hasOwnProperty("news")) {
            if (!Array.isArray(message.news))
                return "news: array expected";
            for (let i = 0; i < message.news.length; ++i) {
                let error = $root.New.verify(message.news[i]);
                if (error)
                    return "news." + error;
            }
        }
        if (message.exprs != null && message.hasOwnProperty("exprs")) {
            if (!Array.isArray(message.exprs))
                return "exprs: array expected";
            for (let i = 0; i < message.exprs.length; ++i) {
                let error = $root.Expr.verify(message.exprs[i]);
                if (error)
                    return "exprs." + error;
            }
        }
        if (message.matches != null && message.hasOwnProperty("matches")) {
            if (!Array.isArray(message.matches))
                return "matches: array expected";
            for (let i = 0; i < message.matches.length; ++i) {
                let error = $root.Match.verify(message.matches[i]);
                if (error)
                    return "matches." + error;
            }
        }
        if (message.ids != null && message.hasOwnProperty("ids")) {
            if (!Array.isArray(message.ids))
                return "ids: array expected";
            for (let i = 0; i < message.ids.length; ++i) {
                let error = $root.GPrivate.verify(message.ids[i]);
                if (error)
                    return "ids." + error;
            }
        }
        if (message.bundles != null && message.hasOwnProperty("bundles")) {
            if (!Array.isArray(message.bundles))
                return "bundles: array expected";
            for (let i = 0; i < message.bundles.length; ++i) {
                let error = $root.Bundle.verify(message.bundles[i]);
                if (error)
                    return "bundles." + error;
            }
        }
        if (message.connectives != null && message.hasOwnProperty("connectives")) {
            if (!Array.isArray(message.connectives))
                return "connectives: array expected";
            for (let i = 0; i < message.connectives.length; ++i) {
                let error = $root.Connective.verify(message.connectives[i]);
                if (error)
                    return "connectives." + error;
            }
        }
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            if (!(message.locallyFree && typeof message.locallyFree.length === "number" || $util.isString(message.locallyFree)))
                return "locallyFree: buffer expected";
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            if (typeof message.connectiveUsed !== "boolean")
                return "connectiveUsed: boolean expected";
        return null;
    };

    Par.fromObject = function fromObject(object) {
        if (object instanceof $root.Par)
            return object;
        let message = new $root.Par();
        if (object.sends) {
            if (!Array.isArray(object.sends))
                throw TypeError(".Par.sends: array expected");
            message.sends = [];
            for (let i = 0; i < object.sends.length; ++i) {
                if (typeof object.sends[i] !== "object")
                    throw TypeError(".Par.sends: object expected");
                message.sends[i] = $root.Send.fromObject(object.sends[i]);
            }
        }
        if (object.receives) {
            if (!Array.isArray(object.receives))
                throw TypeError(".Par.receives: array expected");
            message.receives = [];
            for (let i = 0; i < object.receives.length; ++i) {
                if (typeof object.receives[i] !== "object")
                    throw TypeError(".Par.receives: object expected");
                message.receives[i] = $root.Receive.fromObject(object.receives[i]);
            }
        }
        if (object.news) {
            if (!Array.isArray(object.news))
                throw TypeError(".Par.news: array expected");
            message.news = [];
            for (let i = 0; i < object.news.length; ++i) {
                if (typeof object.news[i] !== "object")
                    throw TypeError(".Par.news: object expected");
                message.news[i] = $root.New.fromObject(object.news[i]);
            }
        }
        if (object.exprs) {
            if (!Array.isArray(object.exprs))
                throw TypeError(".Par.exprs: array expected");
            message.exprs = [];
            for (let i = 0; i < object.exprs.length; ++i) {
                if (typeof object.exprs[i] !== "object")
                    throw TypeError(".Par.exprs: object expected");
                message.exprs[i] = $root.Expr.fromObject(object.exprs[i]);
            }
        }
        if (object.matches) {
            if (!Array.isArray(object.matches))
                throw TypeError(".Par.matches: array expected");
            message.matches = [];
            for (let i = 0; i < object.matches.length; ++i) {
                if (typeof object.matches[i] !== "object")
                    throw TypeError(".Par.matches: object expected");
                message.matches[i] = $root.Match.fromObject(object.matches[i]);
            }
        }
        if (object.ids) {
            if (!Array.isArray(object.ids))
                throw TypeError(".Par.ids: array expected");
            message.ids = [];
            for (let i = 0; i < object.ids.length; ++i) {
                if (typeof object.ids[i] !== "object")
                    throw TypeError(".Par.ids: object expected");
                message.ids[i] = $root.GPrivate.fromObject(object.ids[i]);
            }
        }
        if (object.bundles) {
            if (!Array.isArray(object.bundles))
                throw TypeError(".Par.bundles: array expected");
            message.bundles = [];
            for (let i = 0; i < object.bundles.length; ++i) {
                if (typeof object.bundles[i] !== "object")
                    throw TypeError(".Par.bundles: object expected");
                message.bundles[i] = $root.Bundle.fromObject(object.bundles[i]);
            }
        }
        if (object.connectives) {
            if (!Array.isArray(object.connectives))
                throw TypeError(".Par.connectives: array expected");
            message.connectives = [];
            for (let i = 0; i < object.connectives.length; ++i) {
                if (typeof object.connectives[i] !== "object")
                    throw TypeError(".Par.connectives: object expected");
                message.connectives[i] = $root.Connective.fromObject(object.connectives[i]);
            }
        }
        if (object.locallyFree != null)
            if (typeof object.locallyFree === "string")
                $util.base64.decode(object.locallyFree, message.locallyFree = $util.newBuffer($util.base64.length(object.locallyFree)), 0);
            else if (object.locallyFree.length)
                message.locallyFree = object.locallyFree;
        if (object.connectiveUsed != null)
            message.connectiveUsed = Boolean(object.connectiveUsed);
        return message;
    };

    Par.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults) {
            object.sends = [];
            object.receives = [];
            object.news = [];
            object.exprs = [];
            object.matches = [];
            object.ids = [];
            object.connectives = [];
            object.bundles = [];
        }
        if (options.defaults) {
            if (options.bytes === String)
                object.locallyFree = "";
            else {
                object.locallyFree = [];
                if (options.bytes !== Array)
                    object.locallyFree = $util.newBuffer(object.locallyFree);
            }
            object.connectiveUsed = false;
        }
        if (message.sends && message.sends.length) {
            object.sends = [];
            for (let j = 0; j < message.sends.length; ++j)
                object.sends[j] = $root.Send.toObject(message.sends[j], options);
        }
        if (message.receives && message.receives.length) {
            object.receives = [];
            for (let j = 0; j < message.receives.length; ++j)
                object.receives[j] = $root.Receive.toObject(message.receives[j], options);
        }
        if (message.news && message.news.length) {
            object.news = [];
            for (let j = 0; j < message.news.length; ++j)
                object.news[j] = $root.New.toObject(message.news[j], options);
        }
        if (message.exprs && message.exprs.length) {
            object.exprs = [];
            for (let j = 0; j < message.exprs.length; ++j)
                object.exprs[j] = $root.Expr.toObject(message.exprs[j], options);
        }
        if (message.matches && message.matches.length) {
            object.matches = [];
            for (let j = 0; j < message.matches.length; ++j)
                object.matches[j] = $root.Match.toObject(message.matches[j], options);
        }
        if (message.ids && message.ids.length) {
            object.ids = [];
            for (let j = 0; j < message.ids.length; ++j)
                object.ids[j] = $root.GPrivate.toObject(message.ids[j], options);
        }
        if (message.connectives && message.connectives.length) {
            object.connectives = [];
            for (let j = 0; j < message.connectives.length; ++j)
                object.connectives[j] = $root.Connective.toObject(message.connectives[j], options);
        }
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            object.locallyFree = options.bytes === String ? $util.base64.encode(message.locallyFree, 0, message.locallyFree.length) : options.bytes === Array ? Array.prototype.slice.call(message.locallyFree) : message.locallyFree;
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            object.connectiveUsed = message.connectiveUsed;
        if (message.bundles && message.bundles.length) {
            object.bundles = [];
            for (let j = 0; j < message.bundles.length; ++j)
                object.bundles[j] = $root.Bundle.toObject(message.bundles[j], options);
        }
        return object;
    };

    Par.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Par;
})();

export const TaggedContinuation = $root.TaggedContinuation = (() => {

    function TaggedContinuation(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    TaggedContinuation.prototype.parBody = null;
    TaggedContinuation.prototype.scalaBodyRef = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    let $oneOfFields;

    Object.defineProperty(TaggedContinuation.prototype, "taggedCont", {
        get: $util.oneOfGetter($oneOfFields = ["parBody", "scalaBodyRef"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    TaggedContinuation.create = function create(properties) {
        return new TaggedContinuation(properties);
    };

    TaggedContinuation.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.parBody != null && message.hasOwnProperty("parBody"))
            $root.ParWithRandom.encode(message.parBody, writer.uint32(10).fork()).ldelim();
        if (message.scalaBodyRef != null && message.hasOwnProperty("scalaBodyRef"))
            writer.uint32(16).int64(message.scalaBodyRef);
        return writer;
    };

    TaggedContinuation.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    TaggedContinuation.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.TaggedContinuation();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.parBody = $root.ParWithRandom.decode(reader, reader.uint32());
                break;
            case 2:
                message.scalaBodyRef = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    TaggedContinuation.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    TaggedContinuation.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.parBody != null && message.hasOwnProperty("parBody")) {
            properties.taggedCont = 1;
            {
                let error = $root.ParWithRandom.verify(message.parBody);
                if (error)
                    return "parBody." + error;
            }
        }
        if (message.scalaBodyRef != null && message.hasOwnProperty("scalaBodyRef")) {
            if (properties.taggedCont === 1)
                return "taggedCont: multiple values";
            properties.taggedCont = 1;
            if (!$util.isInteger(message.scalaBodyRef) && !(message.scalaBodyRef && $util.isInteger(message.scalaBodyRef.low) && $util.isInteger(message.scalaBodyRef.high)))
                return "scalaBodyRef: integer|Long expected";
        }
        return null;
    };

    TaggedContinuation.fromObject = function fromObject(object) {
        if (object instanceof $root.TaggedContinuation)
            return object;
        let message = new $root.TaggedContinuation();
        if (object.parBody != null) {
            if (typeof object.parBody !== "object")
                throw TypeError(".TaggedContinuation.parBody: object expected");
            message.parBody = $root.ParWithRandom.fromObject(object.parBody);
        }
        if (object.scalaBodyRef != null)
            if ($util.Long)
                (message.scalaBodyRef = $util.Long.fromValue(object.scalaBodyRef)).unsigned = false;
            else if (typeof object.scalaBodyRef === "string")
                message.scalaBodyRef = parseInt(object.scalaBodyRef, 10);
            else if (typeof object.scalaBodyRef === "number")
                message.scalaBodyRef = object.scalaBodyRef;
            else if (typeof object.scalaBodyRef === "object")
                message.scalaBodyRef = new $util.LongBits(object.scalaBodyRef.low >>> 0, object.scalaBodyRef.high >>> 0).toNumber();
        return message;
    };

    TaggedContinuation.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (message.parBody != null && message.hasOwnProperty("parBody")) {
            object.parBody = $root.ParWithRandom.toObject(message.parBody, options);
            if (options.oneofs)
                object.taggedCont = "parBody";
        }
        if (message.scalaBodyRef != null && message.hasOwnProperty("scalaBodyRef")) {
            if (typeof message.scalaBodyRef === "number")
                object.scalaBodyRef = options.longs === String ? String(message.scalaBodyRef) : message.scalaBodyRef;
            else
                object.scalaBodyRef = options.longs === String ? $util.Long.prototype.toString.call(message.scalaBodyRef) : options.longs === Number ? new $util.LongBits(message.scalaBodyRef.low >>> 0, message.scalaBodyRef.high >>> 0).toNumber() : message.scalaBodyRef;
            if (options.oneofs)
                object.taggedCont = "scalaBodyRef";
        }
        return object;
    };

    TaggedContinuation.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return TaggedContinuation;
})();

export const ParWithRandom = $root.ParWithRandom = (() => {

    function ParWithRandom(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    ParWithRandom.prototype.body = null;
    ParWithRandom.prototype.randomState = $util.newBuffer([]);

    ParWithRandom.create = function create(properties) {
        return new ParWithRandom(properties);
    };

    ParWithRandom.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.body != null && message.hasOwnProperty("body"))
            $root.Par.encode(message.body, writer.uint32(10).fork()).ldelim();
        if (message.randomState != null && message.hasOwnProperty("randomState"))
            writer.uint32(18).bytes(message.randomState);
        return writer;
    };

    ParWithRandom.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    ParWithRandom.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ParWithRandom();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.body = $root.Par.decode(reader, reader.uint32());
                break;
            case 2:
                message.randomState = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    ParWithRandom.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    ParWithRandom.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.body != null && message.hasOwnProperty("body")) {
            let error = $root.Par.verify(message.body);
            if (error)
                return "body." + error;
        }
        if (message.randomState != null && message.hasOwnProperty("randomState"))
            if (!(message.randomState && typeof message.randomState.length === "number" || $util.isString(message.randomState)))
                return "randomState: buffer expected";
        return null;
    };

    ParWithRandom.fromObject = function fromObject(object) {
        if (object instanceof $root.ParWithRandom)
            return object;
        let message = new $root.ParWithRandom();
        if (object.body != null) {
            if (typeof object.body !== "object")
                throw TypeError(".ParWithRandom.body: object expected");
            message.body = $root.Par.fromObject(object.body);
        }
        if (object.randomState != null)
            if (typeof object.randomState === "string")
                $util.base64.decode(object.randomState, message.randomState = $util.newBuffer($util.base64.length(object.randomState)), 0);
            else if (object.randomState.length)
                message.randomState = object.randomState;
        return message;
    };

    ParWithRandom.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.body = null;
            if (options.bytes === String)
                object.randomState = "";
            else {
                object.randomState = [];
                if (options.bytes !== Array)
                    object.randomState = $util.newBuffer(object.randomState);
            }
        }
        if (message.body != null && message.hasOwnProperty("body"))
            object.body = $root.Par.toObject(message.body, options);
        if (message.randomState != null && message.hasOwnProperty("randomState"))
            object.randomState = options.bytes === String ? $util.base64.encode(message.randomState, 0, message.randomState.length) : options.bytes === Array ? Array.prototype.slice.call(message.randomState) : message.randomState;
        return object;
    };

    ParWithRandom.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ParWithRandom;
})();

export const Channel = $root.Channel = (() => {

    function Channel(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    Channel.prototype.quote = null;
    Channel.prototype.chanVar = null;

    let $oneOfFields;

    Object.defineProperty(Channel.prototype, "channelInstance", {
        get: $util.oneOfGetter($oneOfFields = ["quote", "chanVar"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    Channel.create = function create(properties) {
        return new Channel(properties);
    };

    Channel.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.quote != null && message.hasOwnProperty("quote"))
            $root.Par.encode(message.quote, writer.uint32(10).fork()).ldelim();
        if (message.chanVar != null && message.hasOwnProperty("chanVar"))
            $root.Var.encode(message.chanVar, writer.uint32(18).fork()).ldelim();
        return writer;
    };

    Channel.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    Channel.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Channel();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.quote = $root.Par.decode(reader, reader.uint32());
                break;
            case 2:
                message.chanVar = $root.Var.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    Channel.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    Channel.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.quote != null && message.hasOwnProperty("quote")) {
            properties.channelInstance = 1;
            {
                let error = $root.Par.verify(message.quote);
                if (error)
                    return "quote." + error;
            }
        }
        if (message.chanVar != null && message.hasOwnProperty("chanVar")) {
            if (properties.channelInstance === 1)
                return "channelInstance: multiple values";
            properties.channelInstance = 1;
            {
                let error = $root.Var.verify(message.chanVar);
                if (error)
                    return "chanVar." + error;
            }
        }
        return null;
    };

    Channel.fromObject = function fromObject(object) {
        if (object instanceof $root.Channel)
            return object;
        let message = new $root.Channel();
        if (object.quote != null) {
            if (typeof object.quote !== "object")
                throw TypeError(".Channel.quote: object expected");
            message.quote = $root.Par.fromObject(object.quote);
        }
        if (object.chanVar != null) {
            if (typeof object.chanVar !== "object")
                throw TypeError(".Channel.chanVar: object expected");
            message.chanVar = $root.Var.fromObject(object.chanVar);
        }
        return message;
    };

    Channel.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (message.quote != null && message.hasOwnProperty("quote")) {
            object.quote = $root.Par.toObject(message.quote, options);
            if (options.oneofs)
                object.channelInstance = "quote";
        }
        if (message.chanVar != null && message.hasOwnProperty("chanVar")) {
            object.chanVar = $root.Var.toObject(message.chanVar, options);
            if (options.oneofs)
                object.channelInstance = "chanVar";
        }
        return object;
    };

    Channel.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Channel;
})();

export const PCost = $root.PCost = (() => {

    function PCost(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    PCost.prototype.cost = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    PCost.prototype.iterations = 0;

    PCost.create = function create(properties) {
        return new PCost(properties);
    };

    PCost.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.cost != null && message.hasOwnProperty("cost"))
            writer.uint32(8).uint64(message.cost);
        if (message.iterations != null && message.hasOwnProperty("iterations"))
            writer.uint32(16).int32(message.iterations);
        return writer;
    };

    PCost.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    PCost.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PCost();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.cost = reader.uint64();
                break;
            case 2:
                message.iterations = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    PCost.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    PCost.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.cost != null && message.hasOwnProperty("cost"))
            if (!$util.isInteger(message.cost) && !(message.cost && $util.isInteger(message.cost.low) && $util.isInteger(message.cost.high)))
                return "cost: integer|Long expected";
        if (message.iterations != null && message.hasOwnProperty("iterations"))
            if (!$util.isInteger(message.iterations))
                return "iterations: integer expected";
        return null;
    };

    PCost.fromObject = function fromObject(object) {
        if (object instanceof $root.PCost)
            return object;
        let message = new $root.PCost();
        if (object.cost != null)
            if ($util.Long)
                (message.cost = $util.Long.fromValue(object.cost)).unsigned = true;
            else if (typeof object.cost === "string")
                message.cost = parseInt(object.cost, 10);
            else if (typeof object.cost === "number")
                message.cost = object.cost;
            else if (typeof object.cost === "object")
                message.cost = new $util.LongBits(object.cost.low >>> 0, object.cost.high >>> 0).toNumber(true);
        if (object.iterations != null)
            message.iterations = object.iterations | 0;
        return message;
    };

    PCost.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.cost = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.cost = options.longs === String ? "0" : 0;
            object.iterations = 0;
        }
        if (message.cost != null && message.hasOwnProperty("cost"))
            if (typeof message.cost === "number")
                object.cost = options.longs === String ? String(message.cost) : message.cost;
            else
                object.cost = options.longs === String ? $util.Long.prototype.toString.call(message.cost) : options.longs === Number ? new $util.LongBits(message.cost.low >>> 0, message.cost.high >>> 0).toNumber(true) : message.cost;
        if (message.iterations != null && message.hasOwnProperty("iterations"))
            object.iterations = message.iterations;
        return object;
    };

    PCost.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PCost;
})();

export const ListChannelWithRandom = $root.ListChannelWithRandom = (() => {

    function ListChannelWithRandom(properties) {
        this.channels = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    ListChannelWithRandom.prototype.channels = $util.emptyArray;
    ListChannelWithRandom.prototype.randomState = $util.newBuffer([]);
    ListChannelWithRandom.prototype.cost = null;

    ListChannelWithRandom.create = function create(properties) {
        return new ListChannelWithRandom(properties);
    };

    ListChannelWithRandom.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.channels != null && message.channels.length)
            for (let i = 0; i < message.channels.length; ++i)
                $root.Channel.encode(message.channels[i], writer.uint32(10).fork()).ldelim();
        if (message.randomState != null && message.hasOwnProperty("randomState"))
            writer.uint32(18).bytes(message.randomState);
        if (message.cost != null && message.hasOwnProperty("cost"))
            $root.PCost.encode(message.cost, writer.uint32(26).fork()).ldelim();
        return writer;
    };

    ListChannelWithRandom.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    ListChannelWithRandom.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ListChannelWithRandom();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.channels && message.channels.length))
                    message.channels = [];
                message.channels.push($root.Channel.decode(reader, reader.uint32()));
                break;
            case 2:
                message.randomState = reader.bytes();
                break;
            case 3:
                message.cost = $root.PCost.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    ListChannelWithRandom.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    ListChannelWithRandom.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.channels != null && message.hasOwnProperty("channels")) {
            if (!Array.isArray(message.channels))
                return "channels: array expected";
            for (let i = 0; i < message.channels.length; ++i) {
                let error = $root.Channel.verify(message.channels[i]);
                if (error)
                    return "channels." + error;
            }
        }
        if (message.randomState != null && message.hasOwnProperty("randomState"))
            if (!(message.randomState && typeof message.randomState.length === "number" || $util.isString(message.randomState)))
                return "randomState: buffer expected";
        if (message.cost != null && message.hasOwnProperty("cost")) {
            let error = $root.PCost.verify(message.cost);
            if (error)
                return "cost." + error;
        }
        return null;
    };

    ListChannelWithRandom.fromObject = function fromObject(object) {
        if (object instanceof $root.ListChannelWithRandom)
            return object;
        let message = new $root.ListChannelWithRandom();
        if (object.channels) {
            if (!Array.isArray(object.channels))
                throw TypeError(".ListChannelWithRandom.channels: array expected");
            message.channels = [];
            for (let i = 0; i < object.channels.length; ++i) {
                if (typeof object.channels[i] !== "object")
                    throw TypeError(".ListChannelWithRandom.channels: object expected");
                message.channels[i] = $root.Channel.fromObject(object.channels[i]);
            }
        }
        if (object.randomState != null)
            if (typeof object.randomState === "string")
                $util.base64.decode(object.randomState, message.randomState = $util.newBuffer($util.base64.length(object.randomState)), 0);
            else if (object.randomState.length)
                message.randomState = object.randomState;
        if (object.cost != null) {
            if (typeof object.cost !== "object")
                throw TypeError(".ListChannelWithRandom.cost: object expected");
            message.cost = $root.PCost.fromObject(object.cost);
        }
        return message;
    };

    ListChannelWithRandom.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.channels = [];
        if (options.defaults) {
            if (options.bytes === String)
                object.randomState = "";
            else {
                object.randomState = [];
                if (options.bytes !== Array)
                    object.randomState = $util.newBuffer(object.randomState);
            }
            object.cost = null;
        }
        if (message.channels && message.channels.length) {
            object.channels = [];
            for (let j = 0; j < message.channels.length; ++j)
                object.channels[j] = $root.Channel.toObject(message.channels[j], options);
        }
        if (message.randomState != null && message.hasOwnProperty("randomState"))
            object.randomState = options.bytes === String ? $util.base64.encode(message.randomState, 0, message.randomState.length) : options.bytes === Array ? Array.prototype.slice.call(message.randomState) : message.randomState;
        if (message.cost != null && message.hasOwnProperty("cost"))
            object.cost = $root.PCost.toObject(message.cost, options);
        return object;
    };

    ListChannelWithRandom.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ListChannelWithRandom;
})();

export const Var = $root.Var = (() => {

    function Var(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    Var.prototype.boundVar = 0;
    Var.prototype.freeVar = 0;
    Var.prototype.wildcard = null;

    let $oneOfFields;

    Object.defineProperty(Var.prototype, "varInstance", {
        get: $util.oneOfGetter($oneOfFields = ["boundVar", "freeVar", "wildcard"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    Var.create = function create(properties) {
        return new Var(properties);
    };

    Var.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.boundVar != null && message.hasOwnProperty("boundVar"))
            writer.uint32(8).sint32(message.boundVar);
        if (message.freeVar != null && message.hasOwnProperty("freeVar"))
            writer.uint32(16).sint32(message.freeVar);
        if (message.wildcard != null && message.hasOwnProperty("wildcard"))
            $root.Var.WildcardMsg.encode(message.wildcard, writer.uint32(26).fork()).ldelim();
        return writer;
    };

    Var.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    Var.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Var();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.boundVar = reader.sint32();
                break;
            case 2:
                message.freeVar = reader.sint32();
                break;
            case 3:
                message.wildcard = $root.Var.WildcardMsg.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    Var.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    Var.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.boundVar != null && message.hasOwnProperty("boundVar")) {
            properties.varInstance = 1;
            if (!$util.isInteger(message.boundVar))
                return "boundVar: integer expected";
        }
        if (message.freeVar != null && message.hasOwnProperty("freeVar")) {
            if (properties.varInstance === 1)
                return "varInstance: multiple values";
            properties.varInstance = 1;
            if (!$util.isInteger(message.freeVar))
                return "freeVar: integer expected";
        }
        if (message.wildcard != null && message.hasOwnProperty("wildcard")) {
            if (properties.varInstance === 1)
                return "varInstance: multiple values";
            properties.varInstance = 1;
            {
                let error = $root.Var.WildcardMsg.verify(message.wildcard);
                if (error)
                    return "wildcard." + error;
            }
        }
        return null;
    };

    Var.fromObject = function fromObject(object) {
        if (object instanceof $root.Var)
            return object;
        let message = new $root.Var();
        if (object.boundVar != null)
            message.boundVar = object.boundVar | 0;
        if (object.freeVar != null)
            message.freeVar = object.freeVar | 0;
        if (object.wildcard != null) {
            if (typeof object.wildcard !== "object")
                throw TypeError(".Var.wildcard: object expected");
            message.wildcard = $root.Var.WildcardMsg.fromObject(object.wildcard);
        }
        return message;
    };

    Var.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (message.boundVar != null && message.hasOwnProperty("boundVar")) {
            object.boundVar = message.boundVar;
            if (options.oneofs)
                object.varInstance = "boundVar";
        }
        if (message.freeVar != null && message.hasOwnProperty("freeVar")) {
            object.freeVar = message.freeVar;
            if (options.oneofs)
                object.varInstance = "freeVar";
        }
        if (message.wildcard != null && message.hasOwnProperty("wildcard")) {
            object.wildcard = $root.Var.WildcardMsg.toObject(message.wildcard, options);
            if (options.oneofs)
                object.varInstance = "wildcard";
        }
        return object;
    };

    Var.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    Var.WildcardMsg = (function() {

        function WildcardMsg(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        WildcardMsg.create = function create(properties) {
            return new WildcardMsg(properties);
        };

        WildcardMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        WildcardMsg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        WildcardMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Var.WildcardMsg();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        WildcardMsg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        WildcardMsg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        WildcardMsg.fromObject = function fromObject(object) {
            if (object instanceof $root.Var.WildcardMsg)
                return object;
            return new $root.Var.WildcardMsg();
        };

        WildcardMsg.toObject = function toObject() {
            return {};
        };

        WildcardMsg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return WildcardMsg;
    })();

    return Var;
})();

export const Bundle = $root.Bundle = (() => {

    function Bundle(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    Bundle.prototype.body = null;
    Bundle.prototype.writeFlag = false;
    Bundle.prototype.readFlag = false;

    Bundle.create = function create(properties) {
        return new Bundle(properties);
    };

    Bundle.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.body != null && message.hasOwnProperty("body"))
            $root.Par.encode(message.body, writer.uint32(10).fork()).ldelim();
        if (message.writeFlag != null && message.hasOwnProperty("writeFlag"))
            writer.uint32(16).bool(message.writeFlag);
        if (message.readFlag != null && message.hasOwnProperty("readFlag"))
            writer.uint32(24).bool(message.readFlag);
        return writer;
    };

    Bundle.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    Bundle.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Bundle();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.body = $root.Par.decode(reader, reader.uint32());
                break;
            case 2:
                message.writeFlag = reader.bool();
                break;
            case 3:
                message.readFlag = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    Bundle.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    Bundle.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.body != null && message.hasOwnProperty("body")) {
            let error = $root.Par.verify(message.body);
            if (error)
                return "body." + error;
        }
        if (message.writeFlag != null && message.hasOwnProperty("writeFlag"))
            if (typeof message.writeFlag !== "boolean")
                return "writeFlag: boolean expected";
        if (message.readFlag != null && message.hasOwnProperty("readFlag"))
            if (typeof message.readFlag !== "boolean")
                return "readFlag: boolean expected";
        return null;
    };

    Bundle.fromObject = function fromObject(object) {
        if (object instanceof $root.Bundle)
            return object;
        let message = new $root.Bundle();
        if (object.body != null) {
            if (typeof object.body !== "object")
                throw TypeError(".Bundle.body: object expected");
            message.body = $root.Par.fromObject(object.body);
        }
        if (object.writeFlag != null)
            message.writeFlag = Boolean(object.writeFlag);
        if (object.readFlag != null)
            message.readFlag = Boolean(object.readFlag);
        return message;
    };

    Bundle.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.body = null;
            object.writeFlag = false;
            object.readFlag = false;
        }
        if (message.body != null && message.hasOwnProperty("body"))
            object.body = $root.Par.toObject(message.body, options);
        if (message.writeFlag != null && message.hasOwnProperty("writeFlag"))
            object.writeFlag = message.writeFlag;
        if (message.readFlag != null && message.hasOwnProperty("readFlag"))
            object.readFlag = message.readFlag;
        return object;
    };

    Bundle.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Bundle;
})();

export const Send = $root.Send = (() => {

    function Send(properties) {
        this.data = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    Send.prototype.chan = null;
    Send.prototype.data = $util.emptyArray;
    Send.prototype.persistent = false;
    Send.prototype.locallyFree = $util.newBuffer([]);
    Send.prototype.connectiveUsed = false;

    Send.create = function create(properties) {
        return new Send(properties);
    };

    Send.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.chan != null && message.hasOwnProperty("chan"))
            $root.Channel.encode(message.chan, writer.uint32(10).fork()).ldelim();
        if (message.data != null && message.data.length)
            for (let i = 0; i < message.data.length; ++i)
                $root.Par.encode(message.data[i], writer.uint32(18).fork()).ldelim();
        if (message.persistent != null && message.hasOwnProperty("persistent"))
            writer.uint32(24).bool(message.persistent);
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            writer.uint32(42).bytes(message.locallyFree);
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            writer.uint32(48).bool(message.connectiveUsed);
        return writer;
    };

    Send.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    Send.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Send();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.chan = $root.Channel.decode(reader, reader.uint32());
                break;
            case 2:
                if (!(message.data && message.data.length))
                    message.data = [];
                message.data.push($root.Par.decode(reader, reader.uint32()));
                break;
            case 3:
                message.persistent = reader.bool();
                break;
            case 5:
                message.locallyFree = reader.bytes();
                break;
            case 6:
                message.connectiveUsed = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    Send.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    Send.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.chan != null && message.hasOwnProperty("chan")) {
            let error = $root.Channel.verify(message.chan);
            if (error)
                return "chan." + error;
        }
        if (message.data != null && message.hasOwnProperty("data")) {
            if (!Array.isArray(message.data))
                return "data: array expected";
            for (let i = 0; i < message.data.length; ++i) {
                let error = $root.Par.verify(message.data[i]);
                if (error)
                    return "data." + error;
            }
        }
        if (message.persistent != null && message.hasOwnProperty("persistent"))
            if (typeof message.persistent !== "boolean")
                return "persistent: boolean expected";
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            if (!(message.locallyFree && typeof message.locallyFree.length === "number" || $util.isString(message.locallyFree)))
                return "locallyFree: buffer expected";
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            if (typeof message.connectiveUsed !== "boolean")
                return "connectiveUsed: boolean expected";
        return null;
    };

    Send.fromObject = function fromObject(object) {
        if (object instanceof $root.Send)
            return object;
        let message = new $root.Send();
        if (object.chan != null) {
            if (typeof object.chan !== "object")
                throw TypeError(".Send.chan: object expected");
            message.chan = $root.Channel.fromObject(object.chan);
        }
        if (object.data) {
            if (!Array.isArray(object.data))
                throw TypeError(".Send.data: array expected");
            message.data = [];
            for (let i = 0; i < object.data.length; ++i) {
                if (typeof object.data[i] !== "object")
                    throw TypeError(".Send.data: object expected");
                message.data[i] = $root.Par.fromObject(object.data[i]);
            }
        }
        if (object.persistent != null)
            message.persistent = Boolean(object.persistent);
        if (object.locallyFree != null)
            if (typeof object.locallyFree === "string")
                $util.base64.decode(object.locallyFree, message.locallyFree = $util.newBuffer($util.base64.length(object.locallyFree)), 0);
            else if (object.locallyFree.length)
                message.locallyFree = object.locallyFree;
        if (object.connectiveUsed != null)
            message.connectiveUsed = Boolean(object.connectiveUsed);
        return message;
    };

    Send.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.data = [];
        if (options.defaults) {
            object.chan = null;
            object.persistent = false;
            if (options.bytes === String)
                object.locallyFree = "";
            else {
                object.locallyFree = [];
                if (options.bytes !== Array)
                    object.locallyFree = $util.newBuffer(object.locallyFree);
            }
            object.connectiveUsed = false;
        }
        if (message.chan != null && message.hasOwnProperty("chan"))
            object.chan = $root.Channel.toObject(message.chan, options);
        if (message.data && message.data.length) {
            object.data = [];
            for (let j = 0; j < message.data.length; ++j)
                object.data[j] = $root.Par.toObject(message.data[j], options);
        }
        if (message.persistent != null && message.hasOwnProperty("persistent"))
            object.persistent = message.persistent;
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            object.locallyFree = options.bytes === String ? $util.base64.encode(message.locallyFree, 0, message.locallyFree.length) : options.bytes === Array ? Array.prototype.slice.call(message.locallyFree) : message.locallyFree;
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            object.connectiveUsed = message.connectiveUsed;
        return object;
    };

    Send.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Send;
})();

export const ReceiveBind = $root.ReceiveBind = (() => {

    function ReceiveBind(properties) {
        this.patterns = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    ReceiveBind.prototype.patterns = $util.emptyArray;
    ReceiveBind.prototype.source = null;
    ReceiveBind.prototype.remainder = null;
    ReceiveBind.prototype.freeCount = 0;

    ReceiveBind.create = function create(properties) {
        return new ReceiveBind(properties);
    };

    ReceiveBind.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.patterns != null && message.patterns.length)
            for (let i = 0; i < message.patterns.length; ++i)
                $root.Channel.encode(message.patterns[i], writer.uint32(10).fork()).ldelim();
        if (message.source != null && message.hasOwnProperty("source"))
            $root.Channel.encode(message.source, writer.uint32(18).fork()).ldelim();
        if (message.remainder != null && message.hasOwnProperty("remainder"))
            $root.Var.encode(message.remainder, writer.uint32(26).fork()).ldelim();
        if (message.freeCount != null && message.hasOwnProperty("freeCount"))
            writer.uint32(32).int32(message.freeCount);
        return writer;
    };

    ReceiveBind.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    ReceiveBind.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ReceiveBind();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.patterns && message.patterns.length))
                    message.patterns = [];
                message.patterns.push($root.Channel.decode(reader, reader.uint32()));
                break;
            case 2:
                message.source = $root.Channel.decode(reader, reader.uint32());
                break;
            case 3:
                message.remainder = $root.Var.decode(reader, reader.uint32());
                break;
            case 4:
                message.freeCount = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    ReceiveBind.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    ReceiveBind.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.patterns != null && message.hasOwnProperty("patterns")) {
            if (!Array.isArray(message.patterns))
                return "patterns: array expected";
            for (let i = 0; i < message.patterns.length; ++i) {
                let error = $root.Channel.verify(message.patterns[i]);
                if (error)
                    return "patterns." + error;
            }
        }
        if (message.source != null && message.hasOwnProperty("source")) {
            let error = $root.Channel.verify(message.source);
            if (error)
                return "source." + error;
        }
        if (message.remainder != null && message.hasOwnProperty("remainder")) {
            let error = $root.Var.verify(message.remainder);
            if (error)
                return "remainder." + error;
        }
        if (message.freeCount != null && message.hasOwnProperty("freeCount"))
            if (!$util.isInteger(message.freeCount))
                return "freeCount: integer expected";
        return null;
    };

    ReceiveBind.fromObject = function fromObject(object) {
        if (object instanceof $root.ReceiveBind)
            return object;
        let message = new $root.ReceiveBind();
        if (object.patterns) {
            if (!Array.isArray(object.patterns))
                throw TypeError(".ReceiveBind.patterns: array expected");
            message.patterns = [];
            for (let i = 0; i < object.patterns.length; ++i) {
                if (typeof object.patterns[i] !== "object")
                    throw TypeError(".ReceiveBind.patterns: object expected");
                message.patterns[i] = $root.Channel.fromObject(object.patterns[i]);
            }
        }
        if (object.source != null) {
            if (typeof object.source !== "object")
                throw TypeError(".ReceiveBind.source: object expected");
            message.source = $root.Channel.fromObject(object.source);
        }
        if (object.remainder != null) {
            if (typeof object.remainder !== "object")
                throw TypeError(".ReceiveBind.remainder: object expected");
            message.remainder = $root.Var.fromObject(object.remainder);
        }
        if (object.freeCount != null)
            message.freeCount = object.freeCount | 0;
        return message;
    };

    ReceiveBind.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.patterns = [];
        if (options.defaults) {
            object.source = null;
            object.remainder = null;
            object.freeCount = 0;
        }
        if (message.patterns && message.patterns.length) {
            object.patterns = [];
            for (let j = 0; j < message.patterns.length; ++j)
                object.patterns[j] = $root.Channel.toObject(message.patterns[j], options);
        }
        if (message.source != null && message.hasOwnProperty("source"))
            object.source = $root.Channel.toObject(message.source, options);
        if (message.remainder != null && message.hasOwnProperty("remainder"))
            object.remainder = $root.Var.toObject(message.remainder, options);
        if (message.freeCount != null && message.hasOwnProperty("freeCount"))
            object.freeCount = message.freeCount;
        return object;
    };

    ReceiveBind.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ReceiveBind;
})();

export const BindPattern = $root.BindPattern = (() => {

    function BindPattern(properties) {
        this.patterns = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    BindPattern.prototype.patterns = $util.emptyArray;
    BindPattern.prototype.remainder = null;
    BindPattern.prototype.freeCount = 0;

    BindPattern.create = function create(properties) {
        return new BindPattern(properties);
    };

    BindPattern.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.patterns != null && message.patterns.length)
            for (let i = 0; i < message.patterns.length; ++i)
                $root.Channel.encode(message.patterns[i], writer.uint32(10).fork()).ldelim();
        if (message.remainder != null && message.hasOwnProperty("remainder"))
            $root.Var.encode(message.remainder, writer.uint32(18).fork()).ldelim();
        if (message.freeCount != null && message.hasOwnProperty("freeCount"))
            writer.uint32(24).int32(message.freeCount);
        return writer;
    };

    BindPattern.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    BindPattern.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BindPattern();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.patterns && message.patterns.length))
                    message.patterns = [];
                message.patterns.push($root.Channel.decode(reader, reader.uint32()));
                break;
            case 2:
                message.remainder = $root.Var.decode(reader, reader.uint32());
                break;
            case 3:
                message.freeCount = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    BindPattern.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    BindPattern.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.patterns != null && message.hasOwnProperty("patterns")) {
            if (!Array.isArray(message.patterns))
                return "patterns: array expected";
            for (let i = 0; i < message.patterns.length; ++i) {
                let error = $root.Channel.verify(message.patterns[i]);
                if (error)
                    return "patterns." + error;
            }
        }
        if (message.remainder != null && message.hasOwnProperty("remainder")) {
            let error = $root.Var.verify(message.remainder);
            if (error)
                return "remainder." + error;
        }
        if (message.freeCount != null && message.hasOwnProperty("freeCount"))
            if (!$util.isInteger(message.freeCount))
                return "freeCount: integer expected";
        return null;
    };

    BindPattern.fromObject = function fromObject(object) {
        if (object instanceof $root.BindPattern)
            return object;
        let message = new $root.BindPattern();
        if (object.patterns) {
            if (!Array.isArray(object.patterns))
                throw TypeError(".BindPattern.patterns: array expected");
            message.patterns = [];
            for (let i = 0; i < object.patterns.length; ++i) {
                if (typeof object.patterns[i] !== "object")
                    throw TypeError(".BindPattern.patterns: object expected");
                message.patterns[i] = $root.Channel.fromObject(object.patterns[i]);
            }
        }
        if (object.remainder != null) {
            if (typeof object.remainder !== "object")
                throw TypeError(".BindPattern.remainder: object expected");
            message.remainder = $root.Var.fromObject(object.remainder);
        }
        if (object.freeCount != null)
            message.freeCount = object.freeCount | 0;
        return message;
    };

    BindPattern.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.patterns = [];
        if (options.defaults) {
            object.remainder = null;
            object.freeCount = 0;
        }
        if (message.patterns && message.patterns.length) {
            object.patterns = [];
            for (let j = 0; j < message.patterns.length; ++j)
                object.patterns[j] = $root.Channel.toObject(message.patterns[j], options);
        }
        if (message.remainder != null && message.hasOwnProperty("remainder"))
            object.remainder = $root.Var.toObject(message.remainder, options);
        if (message.freeCount != null && message.hasOwnProperty("freeCount"))
            object.freeCount = message.freeCount;
        return object;
    };

    BindPattern.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return BindPattern;
})();

export const ListBindPatterns = $root.ListBindPatterns = (() => {

    function ListBindPatterns(properties) {
        this.patterns = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    ListBindPatterns.prototype.patterns = $util.emptyArray;

    ListBindPatterns.create = function create(properties) {
        return new ListBindPatterns(properties);
    };

    ListBindPatterns.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.patterns != null && message.patterns.length)
            for (let i = 0; i < message.patterns.length; ++i)
                $root.BindPattern.encode(message.patterns[i], writer.uint32(10).fork()).ldelim();
        return writer;
    };

    ListBindPatterns.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    ListBindPatterns.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ListBindPatterns();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.patterns && message.patterns.length))
                    message.patterns = [];
                message.patterns.push($root.BindPattern.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    ListBindPatterns.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    ListBindPatterns.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.patterns != null && message.hasOwnProperty("patterns")) {
            if (!Array.isArray(message.patterns))
                return "patterns: array expected";
            for (let i = 0; i < message.patterns.length; ++i) {
                let error = $root.BindPattern.verify(message.patterns[i]);
                if (error)
                    return "patterns." + error;
            }
        }
        return null;
    };

    ListBindPatterns.fromObject = function fromObject(object) {
        if (object instanceof $root.ListBindPatterns)
            return object;
        let message = new $root.ListBindPatterns();
        if (object.patterns) {
            if (!Array.isArray(object.patterns))
                throw TypeError(".ListBindPatterns.patterns: array expected");
            message.patterns = [];
            for (let i = 0; i < object.patterns.length; ++i) {
                if (typeof object.patterns[i] !== "object")
                    throw TypeError(".ListBindPatterns.patterns: object expected");
                message.patterns[i] = $root.BindPattern.fromObject(object.patterns[i]);
            }
        }
        return message;
    };

    ListBindPatterns.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.patterns = [];
        if (message.patterns && message.patterns.length) {
            object.patterns = [];
            for (let j = 0; j < message.patterns.length; ++j)
                object.patterns[j] = $root.BindPattern.toObject(message.patterns[j], options);
        }
        return object;
    };

    ListBindPatterns.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ListBindPatterns;
})();

export const Receive = $root.Receive = (() => {

    function Receive(properties) {
        this.binds = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    Receive.prototype.binds = $util.emptyArray;
    Receive.prototype.body = null;
    Receive.prototype.persistent = false;
    Receive.prototype.bindCount = 0;
    Receive.prototype.locallyFree = $util.newBuffer([]);
    Receive.prototype.connectiveUsed = false;

    Receive.create = function create(properties) {
        return new Receive(properties);
    };

    Receive.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.binds != null && message.binds.length)
            for (let i = 0; i < message.binds.length; ++i)
                $root.ReceiveBind.encode(message.binds[i], writer.uint32(10).fork()).ldelim();
        if (message.body != null && message.hasOwnProperty("body"))
            $root.Par.encode(message.body, writer.uint32(18).fork()).ldelim();
        if (message.persistent != null && message.hasOwnProperty("persistent"))
            writer.uint32(24).bool(message.persistent);
        if (message.bindCount != null && message.hasOwnProperty("bindCount"))
            writer.uint32(32).int32(message.bindCount);
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            writer.uint32(50).bytes(message.locallyFree);
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            writer.uint32(56).bool(message.connectiveUsed);
        return writer;
    };

    Receive.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    Receive.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Receive();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.binds && message.binds.length))
                    message.binds = [];
                message.binds.push($root.ReceiveBind.decode(reader, reader.uint32()));
                break;
            case 2:
                message.body = $root.Par.decode(reader, reader.uint32());
                break;
            case 3:
                message.persistent = reader.bool();
                break;
            case 4:
                message.bindCount = reader.int32();
                break;
            case 6:
                message.locallyFree = reader.bytes();
                break;
            case 7:
                message.connectiveUsed = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    Receive.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    Receive.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.binds != null && message.hasOwnProperty("binds")) {
            if (!Array.isArray(message.binds))
                return "binds: array expected";
            for (let i = 0; i < message.binds.length; ++i) {
                let error = $root.ReceiveBind.verify(message.binds[i]);
                if (error)
                    return "binds." + error;
            }
        }
        if (message.body != null && message.hasOwnProperty("body")) {
            let error = $root.Par.verify(message.body);
            if (error)
                return "body." + error;
        }
        if (message.persistent != null && message.hasOwnProperty("persistent"))
            if (typeof message.persistent !== "boolean")
                return "persistent: boolean expected";
        if (message.bindCount != null && message.hasOwnProperty("bindCount"))
            if (!$util.isInteger(message.bindCount))
                return "bindCount: integer expected";
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            if (!(message.locallyFree && typeof message.locallyFree.length === "number" || $util.isString(message.locallyFree)))
                return "locallyFree: buffer expected";
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            if (typeof message.connectiveUsed !== "boolean")
                return "connectiveUsed: boolean expected";
        return null;
    };

    Receive.fromObject = function fromObject(object) {
        if (object instanceof $root.Receive)
            return object;
        let message = new $root.Receive();
        if (object.binds) {
            if (!Array.isArray(object.binds))
                throw TypeError(".Receive.binds: array expected");
            message.binds = [];
            for (let i = 0; i < object.binds.length; ++i) {
                if (typeof object.binds[i] !== "object")
                    throw TypeError(".Receive.binds: object expected");
                message.binds[i] = $root.ReceiveBind.fromObject(object.binds[i]);
            }
        }
        if (object.body != null) {
            if (typeof object.body !== "object")
                throw TypeError(".Receive.body: object expected");
            message.body = $root.Par.fromObject(object.body);
        }
        if (object.persistent != null)
            message.persistent = Boolean(object.persistent);
        if (object.bindCount != null)
            message.bindCount = object.bindCount | 0;
        if (object.locallyFree != null)
            if (typeof object.locallyFree === "string")
                $util.base64.decode(object.locallyFree, message.locallyFree = $util.newBuffer($util.base64.length(object.locallyFree)), 0);
            else if (object.locallyFree.length)
                message.locallyFree = object.locallyFree;
        if (object.connectiveUsed != null)
            message.connectiveUsed = Boolean(object.connectiveUsed);
        return message;
    };

    Receive.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.binds = [];
        if (options.defaults) {
            object.body = null;
            object.persistent = false;
            object.bindCount = 0;
            if (options.bytes === String)
                object.locallyFree = "";
            else {
                object.locallyFree = [];
                if (options.bytes !== Array)
                    object.locallyFree = $util.newBuffer(object.locallyFree);
            }
            object.connectiveUsed = false;
        }
        if (message.binds && message.binds.length) {
            object.binds = [];
            for (let j = 0; j < message.binds.length; ++j)
                object.binds[j] = $root.ReceiveBind.toObject(message.binds[j], options);
        }
        if (message.body != null && message.hasOwnProperty("body"))
            object.body = $root.Par.toObject(message.body, options);
        if (message.persistent != null && message.hasOwnProperty("persistent"))
            object.persistent = message.persistent;
        if (message.bindCount != null && message.hasOwnProperty("bindCount"))
            object.bindCount = message.bindCount;
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            object.locallyFree = options.bytes === String ? $util.base64.encode(message.locallyFree, 0, message.locallyFree.length) : options.bytes === Array ? Array.prototype.slice.call(message.locallyFree) : message.locallyFree;
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            object.connectiveUsed = message.connectiveUsed;
        return object;
    };

    Receive.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Receive;
})();

export const New = $root.New = (() => {

    function New(properties) {
        this.uri = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    New.prototype.bindCount = 0;
    New.prototype.p = null;
    New.prototype.uri = $util.emptyArray;
    New.prototype.locallyFree = $util.newBuffer([]);

    New.create = function create(properties) {
        return new New(properties);
    };

    New.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.bindCount != null && message.hasOwnProperty("bindCount"))
            writer.uint32(8).sint32(message.bindCount);
        if (message.p != null && message.hasOwnProperty("p"))
            $root.Par.encode(message.p, writer.uint32(18).fork()).ldelim();
        if (message.uri != null && message.uri.length)
            for (let i = 0; i < message.uri.length; ++i)
                writer.uint32(26).string(message.uri[i]);
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            writer.uint32(34).bytes(message.locallyFree);
        return writer;
    };

    New.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    New.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.New();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.bindCount = reader.sint32();
                break;
            case 2:
                message.p = $root.Par.decode(reader, reader.uint32());
                break;
            case 3:
                if (!(message.uri && message.uri.length))
                    message.uri = [];
                message.uri.push(reader.string());
                break;
            case 4:
                message.locallyFree = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    New.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    New.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.bindCount != null && message.hasOwnProperty("bindCount"))
            if (!$util.isInteger(message.bindCount))
                return "bindCount: integer expected";
        if (message.p != null && message.hasOwnProperty("p")) {
            let error = $root.Par.verify(message.p);
            if (error)
                return "p." + error;
        }
        if (message.uri != null && message.hasOwnProperty("uri")) {
            if (!Array.isArray(message.uri))
                return "uri: array expected";
            for (let i = 0; i < message.uri.length; ++i)
                if (!$util.isString(message.uri[i]))
                    return "uri: string[] expected";
        }
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            if (!(message.locallyFree && typeof message.locallyFree.length === "number" || $util.isString(message.locallyFree)))
                return "locallyFree: buffer expected";
        return null;
    };

    New.fromObject = function fromObject(object) {
        if (object instanceof $root.New)
            return object;
        let message = new $root.New();
        if (object.bindCount != null)
            message.bindCount = object.bindCount | 0;
        if (object.p != null) {
            if (typeof object.p !== "object")
                throw TypeError(".New.p: object expected");
            message.p = $root.Par.fromObject(object.p);
        }
        if (object.uri) {
            if (!Array.isArray(object.uri))
                throw TypeError(".New.uri: array expected");
            message.uri = [];
            for (let i = 0; i < object.uri.length; ++i)
                message.uri[i] = String(object.uri[i]);
        }
        if (object.locallyFree != null)
            if (typeof object.locallyFree === "string")
                $util.base64.decode(object.locallyFree, message.locallyFree = $util.newBuffer($util.base64.length(object.locallyFree)), 0);
            else if (object.locallyFree.length)
                message.locallyFree = object.locallyFree;
        return message;
    };

    New.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.uri = [];
        if (options.defaults) {
            object.bindCount = 0;
            object.p = null;
            if (options.bytes === String)
                object.locallyFree = "";
            else {
                object.locallyFree = [];
                if (options.bytes !== Array)
                    object.locallyFree = $util.newBuffer(object.locallyFree);
            }
        }
        if (message.bindCount != null && message.hasOwnProperty("bindCount"))
            object.bindCount = message.bindCount;
        if (message.p != null && message.hasOwnProperty("p"))
            object.p = $root.Par.toObject(message.p, options);
        if (message.uri && message.uri.length) {
            object.uri = [];
            for (let j = 0; j < message.uri.length; ++j)
                object.uri[j] = message.uri[j];
        }
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            object.locallyFree = options.bytes === String ? $util.base64.encode(message.locallyFree, 0, message.locallyFree.length) : options.bytes === Array ? Array.prototype.slice.call(message.locallyFree) : message.locallyFree;
        return object;
    };

    New.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return New;
})();

export const MatchCase = $root.MatchCase = (() => {

    function MatchCase(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    MatchCase.prototype.pattern = null;
    MatchCase.prototype.source = null;
    MatchCase.prototype.freeCount = 0;

    MatchCase.create = function create(properties) {
        return new MatchCase(properties);
    };

    MatchCase.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.pattern != null && message.hasOwnProperty("pattern"))
            $root.Par.encode(message.pattern, writer.uint32(10).fork()).ldelim();
        if (message.source != null && message.hasOwnProperty("source"))
            $root.Par.encode(message.source, writer.uint32(18).fork()).ldelim();
        if (message.freeCount != null && message.hasOwnProperty("freeCount"))
            writer.uint32(24).int32(message.freeCount);
        return writer;
    };

    MatchCase.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    MatchCase.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.MatchCase();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.pattern = $root.Par.decode(reader, reader.uint32());
                break;
            case 2:
                message.source = $root.Par.decode(reader, reader.uint32());
                break;
            case 3:
                message.freeCount = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    MatchCase.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    MatchCase.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.pattern != null && message.hasOwnProperty("pattern")) {
            let error = $root.Par.verify(message.pattern);
            if (error)
                return "pattern." + error;
        }
        if (message.source != null && message.hasOwnProperty("source")) {
            let error = $root.Par.verify(message.source);
            if (error)
                return "source." + error;
        }
        if (message.freeCount != null && message.hasOwnProperty("freeCount"))
            if (!$util.isInteger(message.freeCount))
                return "freeCount: integer expected";
        return null;
    };

    MatchCase.fromObject = function fromObject(object) {
        if (object instanceof $root.MatchCase)
            return object;
        let message = new $root.MatchCase();
        if (object.pattern != null) {
            if (typeof object.pattern !== "object")
                throw TypeError(".MatchCase.pattern: object expected");
            message.pattern = $root.Par.fromObject(object.pattern);
        }
        if (object.source != null) {
            if (typeof object.source !== "object")
                throw TypeError(".MatchCase.source: object expected");
            message.source = $root.Par.fromObject(object.source);
        }
        if (object.freeCount != null)
            message.freeCount = object.freeCount | 0;
        return message;
    };

    MatchCase.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.pattern = null;
            object.source = null;
            object.freeCount = 0;
        }
        if (message.pattern != null && message.hasOwnProperty("pattern"))
            object.pattern = $root.Par.toObject(message.pattern, options);
        if (message.source != null && message.hasOwnProperty("source"))
            object.source = $root.Par.toObject(message.source, options);
        if (message.freeCount != null && message.hasOwnProperty("freeCount"))
            object.freeCount = message.freeCount;
        return object;
    };

    MatchCase.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MatchCase;
})();

export const Match = $root.Match = (() => {

    function Match(properties) {
        this.cases = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    Match.prototype.target = null;
    Match.prototype.cases = $util.emptyArray;
    Match.prototype.locallyFree = $util.newBuffer([]);
    Match.prototype.connectiveUsed = false;

    Match.create = function create(properties) {
        return new Match(properties);
    };

    Match.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.target != null && message.hasOwnProperty("target"))
            $root.Par.encode(message.target, writer.uint32(10).fork()).ldelim();
        if (message.cases != null && message.cases.length)
            for (let i = 0; i < message.cases.length; ++i)
                $root.MatchCase.encode(message.cases[i], writer.uint32(18).fork()).ldelim();
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            writer.uint32(34).bytes(message.locallyFree);
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            writer.uint32(40).bool(message.connectiveUsed);
        return writer;
    };

    Match.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    Match.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Match();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.target = $root.Par.decode(reader, reader.uint32());
                break;
            case 2:
                if (!(message.cases && message.cases.length))
                    message.cases = [];
                message.cases.push($root.MatchCase.decode(reader, reader.uint32()));
                break;
            case 4:
                message.locallyFree = reader.bytes();
                break;
            case 5:
                message.connectiveUsed = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    Match.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    Match.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.target != null && message.hasOwnProperty("target")) {
            let error = $root.Par.verify(message.target);
            if (error)
                return "target." + error;
        }
        if (message.cases != null && message.hasOwnProperty("cases")) {
            if (!Array.isArray(message.cases))
                return "cases: array expected";
            for (let i = 0; i < message.cases.length; ++i) {
                let error = $root.MatchCase.verify(message.cases[i]);
                if (error)
                    return "cases." + error;
            }
        }
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            if (!(message.locallyFree && typeof message.locallyFree.length === "number" || $util.isString(message.locallyFree)))
                return "locallyFree: buffer expected";
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            if (typeof message.connectiveUsed !== "boolean")
                return "connectiveUsed: boolean expected";
        return null;
    };

    Match.fromObject = function fromObject(object) {
        if (object instanceof $root.Match)
            return object;
        let message = new $root.Match();
        if (object.target != null) {
            if (typeof object.target !== "object")
                throw TypeError(".Match.target: object expected");
            message.target = $root.Par.fromObject(object.target);
        }
        if (object.cases) {
            if (!Array.isArray(object.cases))
                throw TypeError(".Match.cases: array expected");
            message.cases = [];
            for (let i = 0; i < object.cases.length; ++i) {
                if (typeof object.cases[i] !== "object")
                    throw TypeError(".Match.cases: object expected");
                message.cases[i] = $root.MatchCase.fromObject(object.cases[i]);
            }
        }
        if (object.locallyFree != null)
            if (typeof object.locallyFree === "string")
                $util.base64.decode(object.locallyFree, message.locallyFree = $util.newBuffer($util.base64.length(object.locallyFree)), 0);
            else if (object.locallyFree.length)
                message.locallyFree = object.locallyFree;
        if (object.connectiveUsed != null)
            message.connectiveUsed = Boolean(object.connectiveUsed);
        return message;
    };

    Match.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.cases = [];
        if (options.defaults) {
            object.target = null;
            if (options.bytes === String)
                object.locallyFree = "";
            else {
                object.locallyFree = [];
                if (options.bytes !== Array)
                    object.locallyFree = $util.newBuffer(object.locallyFree);
            }
            object.connectiveUsed = false;
        }
        if (message.target != null && message.hasOwnProperty("target"))
            object.target = $root.Par.toObject(message.target, options);
        if (message.cases && message.cases.length) {
            object.cases = [];
            for (let j = 0; j < message.cases.length; ++j)
                object.cases[j] = $root.MatchCase.toObject(message.cases[j], options);
        }
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            object.locallyFree = options.bytes === String ? $util.base64.encode(message.locallyFree, 0, message.locallyFree.length) : options.bytes === Array ? Array.prototype.slice.call(message.locallyFree) : message.locallyFree;
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            object.connectiveUsed = message.connectiveUsed;
        return object;
    };

    Match.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Match;
})();

export const Expr = $root.Expr = (() => {

    function Expr(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    Expr.prototype.gBool = false;
    Expr.prototype.gInt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    Expr.prototype.gString = "";
    Expr.prototype.gUri = "";
    Expr.prototype.gByteArray = $util.newBuffer([]);
    Expr.prototype.eNotBody = null;
    Expr.prototype.eNegBody = null;
    Expr.prototype.eMultBody = null;
    Expr.prototype.eDivBody = null;
    Expr.prototype.ePlusBody = null;
    Expr.prototype.eMinusBody = null;
    Expr.prototype.eLtBody = null;
    Expr.prototype.eLteBody = null;
    Expr.prototype.eGtBody = null;
    Expr.prototype.eGteBody = null;
    Expr.prototype.eEqBody = null;
    Expr.prototype.eNeqBody = null;
    Expr.prototype.eAndBody = null;
    Expr.prototype.eOrBody = null;
    Expr.prototype.eVarBody = null;
    Expr.prototype.eListBody = null;
    Expr.prototype.eTupleBody = null;
    Expr.prototype.eSetBody = null;
    Expr.prototype.eMapBody = null;
    Expr.prototype.eMethodBody = null;
    Expr.prototype.eEvalBody = null;
    Expr.prototype.eMatchesBody = null;
    Expr.prototype.ePercentPercentBody = null;
    Expr.prototype.ePlusPlusBody = null;
    Expr.prototype.eMinusMinusBody = null;

    let $oneOfFields;

    Object.defineProperty(Expr.prototype, "exprInstance", {
        get: $util.oneOfGetter($oneOfFields = ["gBool", "gInt", "gString", "gUri", "gByteArray", "eNotBody", "eNegBody", "eMultBody", "eDivBody", "ePlusBody", "eMinusBody", "eLtBody", "eLteBody", "eGtBody", "eGteBody", "eEqBody", "eNeqBody", "eAndBody", "eOrBody", "eVarBody", "eListBody", "eTupleBody", "eSetBody", "eMapBody", "eMethodBody", "eEvalBody", "eMatchesBody", "ePercentPercentBody", "ePlusPlusBody", "eMinusMinusBody"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    Expr.create = function create(properties) {
        return new Expr(properties);
    };

    Expr.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.gBool != null && message.hasOwnProperty("gBool"))
            writer.uint32(8).bool(message.gBool);
        if (message.gInt != null && message.hasOwnProperty("gInt"))
            writer.uint32(16).sint64(message.gInt);
        if (message.gString != null && message.hasOwnProperty("gString"))
            writer.uint32(26).string(message.gString);
        if (message.gUri != null && message.hasOwnProperty("gUri"))
            writer.uint32(34).string(message.gUri);
        if (message.eNotBody != null && message.hasOwnProperty("eNotBody"))
            $root.ENot.encode(message.eNotBody, writer.uint32(42).fork()).ldelim();
        if (message.eNegBody != null && message.hasOwnProperty("eNegBody"))
            $root.ENeg.encode(message.eNegBody, writer.uint32(50).fork()).ldelim();
        if (message.eMultBody != null && message.hasOwnProperty("eMultBody"))
            $root.EMult.encode(message.eMultBody, writer.uint32(58).fork()).ldelim();
        if (message.eDivBody != null && message.hasOwnProperty("eDivBody"))
            $root.EDiv.encode(message.eDivBody, writer.uint32(66).fork()).ldelim();
        if (message.ePlusBody != null && message.hasOwnProperty("ePlusBody"))
            $root.EPlus.encode(message.ePlusBody, writer.uint32(74).fork()).ldelim();
        if (message.eMinusBody != null && message.hasOwnProperty("eMinusBody"))
            $root.EMinus.encode(message.eMinusBody, writer.uint32(82).fork()).ldelim();
        if (message.eLtBody != null && message.hasOwnProperty("eLtBody"))
            $root.ELt.encode(message.eLtBody, writer.uint32(90).fork()).ldelim();
        if (message.eLteBody != null && message.hasOwnProperty("eLteBody"))
            $root.ELte.encode(message.eLteBody, writer.uint32(98).fork()).ldelim();
        if (message.eGtBody != null && message.hasOwnProperty("eGtBody"))
            $root.EGt.encode(message.eGtBody, writer.uint32(106).fork()).ldelim();
        if (message.eGteBody != null && message.hasOwnProperty("eGteBody"))
            $root.EGte.encode(message.eGteBody, writer.uint32(114).fork()).ldelim();
        if (message.eEqBody != null && message.hasOwnProperty("eEqBody"))
            $root.EEq.encode(message.eEqBody, writer.uint32(122).fork()).ldelim();
        if (message.eNeqBody != null && message.hasOwnProperty("eNeqBody"))
            $root.ENeq.encode(message.eNeqBody, writer.uint32(130).fork()).ldelim();
        if (message.eAndBody != null && message.hasOwnProperty("eAndBody"))
            $root.EAnd.encode(message.eAndBody, writer.uint32(138).fork()).ldelim();
        if (message.eOrBody != null && message.hasOwnProperty("eOrBody"))
            $root.EOr.encode(message.eOrBody, writer.uint32(146).fork()).ldelim();
        if (message.eVarBody != null && message.hasOwnProperty("eVarBody"))
            $root.EVar.encode(message.eVarBody, writer.uint32(154).fork()).ldelim();
        if (message.eListBody != null && message.hasOwnProperty("eListBody"))
            $root.EList.encode(message.eListBody, writer.uint32(162).fork()).ldelim();
        if (message.eTupleBody != null && message.hasOwnProperty("eTupleBody"))
            $root.ETuple.encode(message.eTupleBody, writer.uint32(170).fork()).ldelim();
        if (message.eSetBody != null && message.hasOwnProperty("eSetBody"))
            $root.ESet.encode(message.eSetBody, writer.uint32(178).fork()).ldelim();
        if (message.eMapBody != null && message.hasOwnProperty("eMapBody"))
            $root.EMap.encode(message.eMapBody, writer.uint32(186).fork()).ldelim();
        if (message.eMethodBody != null && message.hasOwnProperty("eMethodBody"))
            $root.EMethod.encode(message.eMethodBody, writer.uint32(194).fork()).ldelim();
        if (message.gByteArray != null && message.hasOwnProperty("gByteArray"))
            writer.uint32(202).bytes(message.gByteArray);
        if (message.eEvalBody != null && message.hasOwnProperty("eEvalBody"))
            $root.Channel.encode(message.eEvalBody, writer.uint32(210).fork()).ldelim();
        if (message.eMatchesBody != null && message.hasOwnProperty("eMatchesBody"))
            $root.EMatches.encode(message.eMatchesBody, writer.uint32(218).fork()).ldelim();
        if (message.ePercentPercentBody != null && message.hasOwnProperty("ePercentPercentBody"))
            $root.EPercentPercent.encode(message.ePercentPercentBody, writer.uint32(226).fork()).ldelim();
        if (message.ePlusPlusBody != null && message.hasOwnProperty("ePlusPlusBody"))
            $root.EPlusPlus.encode(message.ePlusPlusBody, writer.uint32(234).fork()).ldelim();
        if (message.eMinusMinusBody != null && message.hasOwnProperty("eMinusMinusBody"))
            $root.EMinusMinus.encode(message.eMinusMinusBody, writer.uint32(242).fork()).ldelim();
        return writer;
    };

    Expr.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    Expr.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Expr();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.gBool = reader.bool();
                break;
            case 2:
                message.gInt = reader.sint64();
                break;
            case 3:
                message.gString = reader.string();
                break;
            case 4:
                message.gUri = reader.string();
                break;
            case 25:
                message.gByteArray = reader.bytes();
                break;
            case 5:
                message.eNotBody = $root.ENot.decode(reader, reader.uint32());
                break;
            case 6:
                message.eNegBody = $root.ENeg.decode(reader, reader.uint32());
                break;
            case 7:
                message.eMultBody = $root.EMult.decode(reader, reader.uint32());
                break;
            case 8:
                message.eDivBody = $root.EDiv.decode(reader, reader.uint32());
                break;
            case 9:
                message.ePlusBody = $root.EPlus.decode(reader, reader.uint32());
                break;
            case 10:
                message.eMinusBody = $root.EMinus.decode(reader, reader.uint32());
                break;
            case 11:
                message.eLtBody = $root.ELt.decode(reader, reader.uint32());
                break;
            case 12:
                message.eLteBody = $root.ELte.decode(reader, reader.uint32());
                break;
            case 13:
                message.eGtBody = $root.EGt.decode(reader, reader.uint32());
                break;
            case 14:
                message.eGteBody = $root.EGte.decode(reader, reader.uint32());
                break;
            case 15:
                message.eEqBody = $root.EEq.decode(reader, reader.uint32());
                break;
            case 16:
                message.eNeqBody = $root.ENeq.decode(reader, reader.uint32());
                break;
            case 17:
                message.eAndBody = $root.EAnd.decode(reader, reader.uint32());
                break;
            case 18:
                message.eOrBody = $root.EOr.decode(reader, reader.uint32());
                break;
            case 19:
                message.eVarBody = $root.EVar.decode(reader, reader.uint32());
                break;
            case 20:
                message.eListBody = $root.EList.decode(reader, reader.uint32());
                break;
            case 21:
                message.eTupleBody = $root.ETuple.decode(reader, reader.uint32());
                break;
            case 22:
                message.eSetBody = $root.ESet.decode(reader, reader.uint32());
                break;
            case 23:
                message.eMapBody = $root.EMap.decode(reader, reader.uint32());
                break;
            case 24:
                message.eMethodBody = $root.EMethod.decode(reader, reader.uint32());
                break;
            case 26:
                message.eEvalBody = $root.Channel.decode(reader, reader.uint32());
                break;
            case 27:
                message.eMatchesBody = $root.EMatches.decode(reader, reader.uint32());
                break;
            case 28:
                message.ePercentPercentBody = $root.EPercentPercent.decode(reader, reader.uint32());
                break;
            case 29:
                message.ePlusPlusBody = $root.EPlusPlus.decode(reader, reader.uint32());
                break;
            case 30:
                message.eMinusMinusBody = $root.EMinusMinus.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    Expr.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    Expr.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.gBool != null && message.hasOwnProperty("gBool")) {
            properties.exprInstance = 1;
            if (typeof message.gBool !== "boolean")
                return "gBool: boolean expected";
        }
        if (message.gInt != null && message.hasOwnProperty("gInt")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            if (!$util.isInteger(message.gInt) && !(message.gInt && $util.isInteger(message.gInt.low) && $util.isInteger(message.gInt.high)))
                return "gInt: integer|Long expected";
        }
        if (message.gString != null && message.hasOwnProperty("gString")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            if (!$util.isString(message.gString))
                return "gString: string expected";
        }
        if (message.gUri != null && message.hasOwnProperty("gUri")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            if (!$util.isString(message.gUri))
                return "gUri: string expected";
        }
        if (message.gByteArray != null && message.hasOwnProperty("gByteArray")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            if (!(message.gByteArray && typeof message.gByteArray.length === "number" || $util.isString(message.gByteArray)))
                return "gByteArray: buffer expected";
        }
        if (message.eNotBody != null && message.hasOwnProperty("eNotBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.ENot.verify(message.eNotBody);
                if (error)
                    return "eNotBody." + error;
            }
        }
        if (message.eNegBody != null && message.hasOwnProperty("eNegBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.ENeg.verify(message.eNegBody);
                if (error)
                    return "eNegBody." + error;
            }
        }
        if (message.eMultBody != null && message.hasOwnProperty("eMultBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.EMult.verify(message.eMultBody);
                if (error)
                    return "eMultBody." + error;
            }
        }
        if (message.eDivBody != null && message.hasOwnProperty("eDivBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.EDiv.verify(message.eDivBody);
                if (error)
                    return "eDivBody." + error;
            }
        }
        if (message.ePlusBody != null && message.hasOwnProperty("ePlusBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.EPlus.verify(message.ePlusBody);
                if (error)
                    return "ePlusBody." + error;
            }
        }
        if (message.eMinusBody != null && message.hasOwnProperty("eMinusBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.EMinus.verify(message.eMinusBody);
                if (error)
                    return "eMinusBody." + error;
            }
        }
        if (message.eLtBody != null && message.hasOwnProperty("eLtBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.ELt.verify(message.eLtBody);
                if (error)
                    return "eLtBody." + error;
            }
        }
        if (message.eLteBody != null && message.hasOwnProperty("eLteBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.ELte.verify(message.eLteBody);
                if (error)
                    return "eLteBody." + error;
            }
        }
        if (message.eGtBody != null && message.hasOwnProperty("eGtBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.EGt.verify(message.eGtBody);
                if (error)
                    return "eGtBody." + error;
            }
        }
        if (message.eGteBody != null && message.hasOwnProperty("eGteBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.EGte.verify(message.eGteBody);
                if (error)
                    return "eGteBody." + error;
            }
        }
        if (message.eEqBody != null && message.hasOwnProperty("eEqBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.EEq.verify(message.eEqBody);
                if (error)
                    return "eEqBody." + error;
            }
        }
        if (message.eNeqBody != null && message.hasOwnProperty("eNeqBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.ENeq.verify(message.eNeqBody);
                if (error)
                    return "eNeqBody." + error;
            }
        }
        if (message.eAndBody != null && message.hasOwnProperty("eAndBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.EAnd.verify(message.eAndBody);
                if (error)
                    return "eAndBody." + error;
            }
        }
        if (message.eOrBody != null && message.hasOwnProperty("eOrBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.EOr.verify(message.eOrBody);
                if (error)
                    return "eOrBody." + error;
            }
        }
        if (message.eVarBody != null && message.hasOwnProperty("eVarBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.EVar.verify(message.eVarBody);
                if (error)
                    return "eVarBody." + error;
            }
        }
        if (message.eListBody != null && message.hasOwnProperty("eListBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.EList.verify(message.eListBody);
                if (error)
                    return "eListBody." + error;
            }
        }
        if (message.eTupleBody != null && message.hasOwnProperty("eTupleBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.ETuple.verify(message.eTupleBody);
                if (error)
                    return "eTupleBody." + error;
            }
        }
        if (message.eSetBody != null && message.hasOwnProperty("eSetBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.ESet.verify(message.eSetBody);
                if (error)
                    return "eSetBody." + error;
            }
        }
        if (message.eMapBody != null && message.hasOwnProperty("eMapBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.EMap.verify(message.eMapBody);
                if (error)
                    return "eMapBody." + error;
            }
        }
        if (message.eMethodBody != null && message.hasOwnProperty("eMethodBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.EMethod.verify(message.eMethodBody);
                if (error)
                    return "eMethodBody." + error;
            }
        }
        if (message.eEvalBody != null && message.hasOwnProperty("eEvalBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.Channel.verify(message.eEvalBody);
                if (error)
                    return "eEvalBody." + error;
            }
        }
        if (message.eMatchesBody != null && message.hasOwnProperty("eMatchesBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.EMatches.verify(message.eMatchesBody);
                if (error)
                    return "eMatchesBody." + error;
            }
        }
        if (message.ePercentPercentBody != null && message.hasOwnProperty("ePercentPercentBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.EPercentPercent.verify(message.ePercentPercentBody);
                if (error)
                    return "ePercentPercentBody." + error;
            }
        }
        if (message.ePlusPlusBody != null && message.hasOwnProperty("ePlusPlusBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.EPlusPlus.verify(message.ePlusPlusBody);
                if (error)
                    return "ePlusPlusBody." + error;
            }
        }
        if (message.eMinusMinusBody != null && message.hasOwnProperty("eMinusMinusBody")) {
            if (properties.exprInstance === 1)
                return "exprInstance: multiple values";
            properties.exprInstance = 1;
            {
                let error = $root.EMinusMinus.verify(message.eMinusMinusBody);
                if (error)
                    return "eMinusMinusBody." + error;
            }
        }
        return null;
    };

    Expr.fromObject = function fromObject(object) {
        if (object instanceof $root.Expr)
            return object;
        let message = new $root.Expr();
        if (object.gBool != null)
            message.gBool = Boolean(object.gBool);
        if (object.gInt != null)
            if ($util.Long)
                (message.gInt = $util.Long.fromValue(object.gInt)).unsigned = false;
            else if (typeof object.gInt === "string")
                message.gInt = parseInt(object.gInt, 10);
            else if (typeof object.gInt === "number")
                message.gInt = object.gInt;
            else if (typeof object.gInt === "object")
                message.gInt = new $util.LongBits(object.gInt.low >>> 0, object.gInt.high >>> 0).toNumber();
        if (object.gString != null)
            message.gString = String(object.gString);
        if (object.gUri != null)
            message.gUri = String(object.gUri);
        if (object.gByteArray != null)
            if (typeof object.gByteArray === "string")
                $util.base64.decode(object.gByteArray, message.gByteArray = $util.newBuffer($util.base64.length(object.gByteArray)), 0);
            else if (object.gByteArray.length)
                message.gByteArray = object.gByteArray;
        if (object.eNotBody != null) {
            if (typeof object.eNotBody !== "object")
                throw TypeError(".Expr.eNotBody: object expected");
            message.eNotBody = $root.ENot.fromObject(object.eNotBody);
        }
        if (object.eNegBody != null) {
            if (typeof object.eNegBody !== "object")
                throw TypeError(".Expr.eNegBody: object expected");
            message.eNegBody = $root.ENeg.fromObject(object.eNegBody);
        }
        if (object.eMultBody != null) {
            if (typeof object.eMultBody !== "object")
                throw TypeError(".Expr.eMultBody: object expected");
            message.eMultBody = $root.EMult.fromObject(object.eMultBody);
        }
        if (object.eDivBody != null) {
            if (typeof object.eDivBody !== "object")
                throw TypeError(".Expr.eDivBody: object expected");
            message.eDivBody = $root.EDiv.fromObject(object.eDivBody);
        }
        if (object.ePlusBody != null) {
            if (typeof object.ePlusBody !== "object")
                throw TypeError(".Expr.ePlusBody: object expected");
            message.ePlusBody = $root.EPlus.fromObject(object.ePlusBody);
        }
        if (object.eMinusBody != null) {
            if (typeof object.eMinusBody !== "object")
                throw TypeError(".Expr.eMinusBody: object expected");
            message.eMinusBody = $root.EMinus.fromObject(object.eMinusBody);
        }
        if (object.eLtBody != null) {
            if (typeof object.eLtBody !== "object")
                throw TypeError(".Expr.eLtBody: object expected");
            message.eLtBody = $root.ELt.fromObject(object.eLtBody);
        }
        if (object.eLteBody != null) {
            if (typeof object.eLteBody !== "object")
                throw TypeError(".Expr.eLteBody: object expected");
            message.eLteBody = $root.ELte.fromObject(object.eLteBody);
        }
        if (object.eGtBody != null) {
            if (typeof object.eGtBody !== "object")
                throw TypeError(".Expr.eGtBody: object expected");
            message.eGtBody = $root.EGt.fromObject(object.eGtBody);
        }
        if (object.eGteBody != null) {
            if (typeof object.eGteBody !== "object")
                throw TypeError(".Expr.eGteBody: object expected");
            message.eGteBody = $root.EGte.fromObject(object.eGteBody);
        }
        if (object.eEqBody != null) {
            if (typeof object.eEqBody !== "object")
                throw TypeError(".Expr.eEqBody: object expected");
            message.eEqBody = $root.EEq.fromObject(object.eEqBody);
        }
        if (object.eNeqBody != null) {
            if (typeof object.eNeqBody !== "object")
                throw TypeError(".Expr.eNeqBody: object expected");
            message.eNeqBody = $root.ENeq.fromObject(object.eNeqBody);
        }
        if (object.eAndBody != null) {
            if (typeof object.eAndBody !== "object")
                throw TypeError(".Expr.eAndBody: object expected");
            message.eAndBody = $root.EAnd.fromObject(object.eAndBody);
        }
        if (object.eOrBody != null) {
            if (typeof object.eOrBody !== "object")
                throw TypeError(".Expr.eOrBody: object expected");
            message.eOrBody = $root.EOr.fromObject(object.eOrBody);
        }
        if (object.eVarBody != null) {
            if (typeof object.eVarBody !== "object")
                throw TypeError(".Expr.eVarBody: object expected");
            message.eVarBody = $root.EVar.fromObject(object.eVarBody);
        }
        if (object.eListBody != null) {
            if (typeof object.eListBody !== "object")
                throw TypeError(".Expr.eListBody: object expected");
            message.eListBody = $root.EList.fromObject(object.eListBody);
        }
        if (object.eTupleBody != null) {
            if (typeof object.eTupleBody !== "object")
                throw TypeError(".Expr.eTupleBody: object expected");
            message.eTupleBody = $root.ETuple.fromObject(object.eTupleBody);
        }
        if (object.eSetBody != null) {
            if (typeof object.eSetBody !== "object")
                throw TypeError(".Expr.eSetBody: object expected");
            message.eSetBody = $root.ESet.fromObject(object.eSetBody);
        }
        if (object.eMapBody != null) {
            if (typeof object.eMapBody !== "object")
                throw TypeError(".Expr.eMapBody: object expected");
            message.eMapBody = $root.EMap.fromObject(object.eMapBody);
        }
        if (object.eMethodBody != null) {
            if (typeof object.eMethodBody !== "object")
                throw TypeError(".Expr.eMethodBody: object expected");
            message.eMethodBody = $root.EMethod.fromObject(object.eMethodBody);
        }
        if (object.eEvalBody != null) {
            if (typeof object.eEvalBody !== "object")
                throw TypeError(".Expr.eEvalBody: object expected");
            message.eEvalBody = $root.Channel.fromObject(object.eEvalBody);
        }
        if (object.eMatchesBody != null) {
            if (typeof object.eMatchesBody !== "object")
                throw TypeError(".Expr.eMatchesBody: object expected");
            message.eMatchesBody = $root.EMatches.fromObject(object.eMatchesBody);
        }
        if (object.ePercentPercentBody != null) {
            if (typeof object.ePercentPercentBody !== "object")
                throw TypeError(".Expr.ePercentPercentBody: object expected");
            message.ePercentPercentBody = $root.EPercentPercent.fromObject(object.ePercentPercentBody);
        }
        if (object.ePlusPlusBody != null) {
            if (typeof object.ePlusPlusBody !== "object")
                throw TypeError(".Expr.ePlusPlusBody: object expected");
            message.ePlusPlusBody = $root.EPlusPlus.fromObject(object.ePlusPlusBody);
        }
        if (object.eMinusMinusBody != null) {
            if (typeof object.eMinusMinusBody !== "object")
                throw TypeError(".Expr.eMinusMinusBody: object expected");
            message.eMinusMinusBody = $root.EMinusMinus.fromObject(object.eMinusMinusBody);
        }
        return message;
    };

    Expr.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (message.gBool != null && message.hasOwnProperty("gBool")) {
            object.gBool = message.gBool;
            if (options.oneofs)
                object.exprInstance = "gBool";
        }
        if (message.gInt != null && message.hasOwnProperty("gInt")) {
            if (typeof message.gInt === "number")
                object.gInt = options.longs === String ? String(message.gInt) : message.gInt;
            else
                object.gInt = options.longs === String ? $util.Long.prototype.toString.call(message.gInt) : options.longs === Number ? new $util.LongBits(message.gInt.low >>> 0, message.gInt.high >>> 0).toNumber() : message.gInt;
            if (options.oneofs)
                object.exprInstance = "gInt";
        }
        if (message.gString != null && message.hasOwnProperty("gString")) {
            object.gString = message.gString;
            if (options.oneofs)
                object.exprInstance = "gString";
        }
        if (message.gUri != null && message.hasOwnProperty("gUri")) {
            object.gUri = message.gUri;
            if (options.oneofs)
                object.exprInstance = "gUri";
        }
        if (message.eNotBody != null && message.hasOwnProperty("eNotBody")) {
            object.eNotBody = $root.ENot.toObject(message.eNotBody, options);
            if (options.oneofs)
                object.exprInstance = "eNotBody";
        }
        if (message.eNegBody != null && message.hasOwnProperty("eNegBody")) {
            object.eNegBody = $root.ENeg.toObject(message.eNegBody, options);
            if (options.oneofs)
                object.exprInstance = "eNegBody";
        }
        if (message.eMultBody != null && message.hasOwnProperty("eMultBody")) {
            object.eMultBody = $root.EMult.toObject(message.eMultBody, options);
            if (options.oneofs)
                object.exprInstance = "eMultBody";
        }
        if (message.eDivBody != null && message.hasOwnProperty("eDivBody")) {
            object.eDivBody = $root.EDiv.toObject(message.eDivBody, options);
            if (options.oneofs)
                object.exprInstance = "eDivBody";
        }
        if (message.ePlusBody != null && message.hasOwnProperty("ePlusBody")) {
            object.ePlusBody = $root.EPlus.toObject(message.ePlusBody, options);
            if (options.oneofs)
                object.exprInstance = "ePlusBody";
        }
        if (message.eMinusBody != null && message.hasOwnProperty("eMinusBody")) {
            object.eMinusBody = $root.EMinus.toObject(message.eMinusBody, options);
            if (options.oneofs)
                object.exprInstance = "eMinusBody";
        }
        if (message.eLtBody != null && message.hasOwnProperty("eLtBody")) {
            object.eLtBody = $root.ELt.toObject(message.eLtBody, options);
            if (options.oneofs)
                object.exprInstance = "eLtBody";
        }
        if (message.eLteBody != null && message.hasOwnProperty("eLteBody")) {
            object.eLteBody = $root.ELte.toObject(message.eLteBody, options);
            if (options.oneofs)
                object.exprInstance = "eLteBody";
        }
        if (message.eGtBody != null && message.hasOwnProperty("eGtBody")) {
            object.eGtBody = $root.EGt.toObject(message.eGtBody, options);
            if (options.oneofs)
                object.exprInstance = "eGtBody";
        }
        if (message.eGteBody != null && message.hasOwnProperty("eGteBody")) {
            object.eGteBody = $root.EGte.toObject(message.eGteBody, options);
            if (options.oneofs)
                object.exprInstance = "eGteBody";
        }
        if (message.eEqBody != null && message.hasOwnProperty("eEqBody")) {
            object.eEqBody = $root.EEq.toObject(message.eEqBody, options);
            if (options.oneofs)
                object.exprInstance = "eEqBody";
        }
        if (message.eNeqBody != null && message.hasOwnProperty("eNeqBody")) {
            object.eNeqBody = $root.ENeq.toObject(message.eNeqBody, options);
            if (options.oneofs)
                object.exprInstance = "eNeqBody";
        }
        if (message.eAndBody != null && message.hasOwnProperty("eAndBody")) {
            object.eAndBody = $root.EAnd.toObject(message.eAndBody, options);
            if (options.oneofs)
                object.exprInstance = "eAndBody";
        }
        if (message.eOrBody != null && message.hasOwnProperty("eOrBody")) {
            object.eOrBody = $root.EOr.toObject(message.eOrBody, options);
            if (options.oneofs)
                object.exprInstance = "eOrBody";
        }
        if (message.eVarBody != null && message.hasOwnProperty("eVarBody")) {
            object.eVarBody = $root.EVar.toObject(message.eVarBody, options);
            if (options.oneofs)
                object.exprInstance = "eVarBody";
        }
        if (message.eListBody != null && message.hasOwnProperty("eListBody")) {
            object.eListBody = $root.EList.toObject(message.eListBody, options);
            if (options.oneofs)
                object.exprInstance = "eListBody";
        }
        if (message.eTupleBody != null && message.hasOwnProperty("eTupleBody")) {
            object.eTupleBody = $root.ETuple.toObject(message.eTupleBody, options);
            if (options.oneofs)
                object.exprInstance = "eTupleBody";
        }
        if (message.eSetBody != null && message.hasOwnProperty("eSetBody")) {
            object.eSetBody = $root.ESet.toObject(message.eSetBody, options);
            if (options.oneofs)
                object.exprInstance = "eSetBody";
        }
        if (message.eMapBody != null && message.hasOwnProperty("eMapBody")) {
            object.eMapBody = $root.EMap.toObject(message.eMapBody, options);
            if (options.oneofs)
                object.exprInstance = "eMapBody";
        }
        if (message.eMethodBody != null && message.hasOwnProperty("eMethodBody")) {
            object.eMethodBody = $root.EMethod.toObject(message.eMethodBody, options);
            if (options.oneofs)
                object.exprInstance = "eMethodBody";
        }
        if (message.gByteArray != null && message.hasOwnProperty("gByteArray")) {
            object.gByteArray = options.bytes === String ? $util.base64.encode(message.gByteArray, 0, message.gByteArray.length) : options.bytes === Array ? Array.prototype.slice.call(message.gByteArray) : message.gByteArray;
            if (options.oneofs)
                object.exprInstance = "gByteArray";
        }
        if (message.eEvalBody != null && message.hasOwnProperty("eEvalBody")) {
            object.eEvalBody = $root.Channel.toObject(message.eEvalBody, options);
            if (options.oneofs)
                object.exprInstance = "eEvalBody";
        }
        if (message.eMatchesBody != null && message.hasOwnProperty("eMatchesBody")) {
            object.eMatchesBody = $root.EMatches.toObject(message.eMatchesBody, options);
            if (options.oneofs)
                object.exprInstance = "eMatchesBody";
        }
        if (message.ePercentPercentBody != null && message.hasOwnProperty("ePercentPercentBody")) {
            object.ePercentPercentBody = $root.EPercentPercent.toObject(message.ePercentPercentBody, options);
            if (options.oneofs)
                object.exprInstance = "ePercentPercentBody";
        }
        if (message.ePlusPlusBody != null && message.hasOwnProperty("ePlusPlusBody")) {
            object.ePlusPlusBody = $root.EPlusPlus.toObject(message.ePlusPlusBody, options);
            if (options.oneofs)
                object.exprInstance = "ePlusPlusBody";
        }
        if (message.eMinusMinusBody != null && message.hasOwnProperty("eMinusMinusBody")) {
            object.eMinusMinusBody = $root.EMinusMinus.toObject(message.eMinusMinusBody, options);
            if (options.oneofs)
                object.exprInstance = "eMinusMinusBody";
        }
        return object;
    };

    Expr.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Expr;
})();

export const EList = $root.EList = (() => {

    function EList(properties) {
        this.ps = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    EList.prototype.ps = $util.emptyArray;
    EList.prototype.locallyFree = $util.newBuffer([]);
    EList.prototype.connectiveUsed = false;
    EList.prototype.remainder = null;

    EList.create = function create(properties) {
        return new EList(properties);
    };

    EList.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.ps != null && message.ps.length)
            for (let i = 0; i < message.ps.length; ++i)
                $root.Par.encode(message.ps[i], writer.uint32(10).fork()).ldelim();
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            writer.uint32(26).bytes(message.locallyFree);
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            writer.uint32(32).bool(message.connectiveUsed);
        if (message.remainder != null && message.hasOwnProperty("remainder"))
            $root.Var.encode(message.remainder, writer.uint32(42).fork()).ldelim();
        return writer;
    };

    EList.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    EList.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EList();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.ps && message.ps.length))
                    message.ps = [];
                message.ps.push($root.Par.decode(reader, reader.uint32()));
                break;
            case 3:
                message.locallyFree = reader.bytes();
                break;
            case 4:
                message.connectiveUsed = reader.bool();
                break;
            case 5:
                message.remainder = $root.Var.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    EList.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    EList.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.ps != null && message.hasOwnProperty("ps")) {
            if (!Array.isArray(message.ps))
                return "ps: array expected";
            for (let i = 0; i < message.ps.length; ++i) {
                let error = $root.Par.verify(message.ps[i]);
                if (error)
                    return "ps." + error;
            }
        }
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            if (!(message.locallyFree && typeof message.locallyFree.length === "number" || $util.isString(message.locallyFree)))
                return "locallyFree: buffer expected";
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            if (typeof message.connectiveUsed !== "boolean")
                return "connectiveUsed: boolean expected";
        if (message.remainder != null && message.hasOwnProperty("remainder")) {
            let error = $root.Var.verify(message.remainder);
            if (error)
                return "remainder." + error;
        }
        return null;
    };

    EList.fromObject = function fromObject(object) {
        if (object instanceof $root.EList)
            return object;
        let message = new $root.EList();
        if (object.ps) {
            if (!Array.isArray(object.ps))
                throw TypeError(".EList.ps: array expected");
            message.ps = [];
            for (let i = 0; i < object.ps.length; ++i) {
                if (typeof object.ps[i] !== "object")
                    throw TypeError(".EList.ps: object expected");
                message.ps[i] = $root.Par.fromObject(object.ps[i]);
            }
        }
        if (object.locallyFree != null)
            if (typeof object.locallyFree === "string")
                $util.base64.decode(object.locallyFree, message.locallyFree = $util.newBuffer($util.base64.length(object.locallyFree)), 0);
            else if (object.locallyFree.length)
                message.locallyFree = object.locallyFree;
        if (object.connectiveUsed != null)
            message.connectiveUsed = Boolean(object.connectiveUsed);
        if (object.remainder != null) {
            if (typeof object.remainder !== "object")
                throw TypeError(".EList.remainder: object expected");
            message.remainder = $root.Var.fromObject(object.remainder);
        }
        return message;
    };

    EList.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.ps = [];
        if (options.defaults) {
            if (options.bytes === String)
                object.locallyFree = "";
            else {
                object.locallyFree = [];
                if (options.bytes !== Array)
                    object.locallyFree = $util.newBuffer(object.locallyFree);
            }
            object.connectiveUsed = false;
            object.remainder = null;
        }
        if (message.ps && message.ps.length) {
            object.ps = [];
            for (let j = 0; j < message.ps.length; ++j)
                object.ps[j] = $root.Par.toObject(message.ps[j], options);
        }
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            object.locallyFree = options.bytes === String ? $util.base64.encode(message.locallyFree, 0, message.locallyFree.length) : options.bytes === Array ? Array.prototype.slice.call(message.locallyFree) : message.locallyFree;
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            object.connectiveUsed = message.connectiveUsed;
        if (message.remainder != null && message.hasOwnProperty("remainder"))
            object.remainder = $root.Var.toObject(message.remainder, options);
        return object;
    };

    EList.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EList;
})();

export const ETuple = $root.ETuple = (() => {

    function ETuple(properties) {
        this.ps = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    ETuple.prototype.ps = $util.emptyArray;
    ETuple.prototype.locallyFree = $util.newBuffer([]);
    ETuple.prototype.connectiveUsed = false;

    ETuple.create = function create(properties) {
        return new ETuple(properties);
    };

    ETuple.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.ps != null && message.ps.length)
            for (let i = 0; i < message.ps.length; ++i)
                $root.Par.encode(message.ps[i], writer.uint32(10).fork()).ldelim();
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            writer.uint32(26).bytes(message.locallyFree);
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            writer.uint32(32).bool(message.connectiveUsed);
        return writer;
    };

    ETuple.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    ETuple.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ETuple();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.ps && message.ps.length))
                    message.ps = [];
                message.ps.push($root.Par.decode(reader, reader.uint32()));
                break;
            case 3:
                message.locallyFree = reader.bytes();
                break;
            case 4:
                message.connectiveUsed = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    ETuple.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    ETuple.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.ps != null && message.hasOwnProperty("ps")) {
            if (!Array.isArray(message.ps))
                return "ps: array expected";
            for (let i = 0; i < message.ps.length; ++i) {
                let error = $root.Par.verify(message.ps[i]);
                if (error)
                    return "ps." + error;
            }
        }
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            if (!(message.locallyFree && typeof message.locallyFree.length === "number" || $util.isString(message.locallyFree)))
                return "locallyFree: buffer expected";
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            if (typeof message.connectiveUsed !== "boolean")
                return "connectiveUsed: boolean expected";
        return null;
    };

    ETuple.fromObject = function fromObject(object) {
        if (object instanceof $root.ETuple)
            return object;
        let message = new $root.ETuple();
        if (object.ps) {
            if (!Array.isArray(object.ps))
                throw TypeError(".ETuple.ps: array expected");
            message.ps = [];
            for (let i = 0; i < object.ps.length; ++i) {
                if (typeof object.ps[i] !== "object")
                    throw TypeError(".ETuple.ps: object expected");
                message.ps[i] = $root.Par.fromObject(object.ps[i]);
            }
        }
        if (object.locallyFree != null)
            if (typeof object.locallyFree === "string")
                $util.base64.decode(object.locallyFree, message.locallyFree = $util.newBuffer($util.base64.length(object.locallyFree)), 0);
            else if (object.locallyFree.length)
                message.locallyFree = object.locallyFree;
        if (object.connectiveUsed != null)
            message.connectiveUsed = Boolean(object.connectiveUsed);
        return message;
    };

    ETuple.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.ps = [];
        if (options.defaults) {
            if (options.bytes === String)
                object.locallyFree = "";
            else {
                object.locallyFree = [];
                if (options.bytes !== Array)
                    object.locallyFree = $util.newBuffer(object.locallyFree);
            }
            object.connectiveUsed = false;
        }
        if (message.ps && message.ps.length) {
            object.ps = [];
            for (let j = 0; j < message.ps.length; ++j)
                object.ps[j] = $root.Par.toObject(message.ps[j], options);
        }
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            object.locallyFree = options.bytes === String ? $util.base64.encode(message.locallyFree, 0, message.locallyFree.length) : options.bytes === Array ? Array.prototype.slice.call(message.locallyFree) : message.locallyFree;
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            object.connectiveUsed = message.connectiveUsed;
        return object;
    };

    ETuple.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ETuple;
})();

export const ESet = $root.ESet = (() => {

    function ESet(properties) {
        this.ps = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    ESet.prototype.ps = $util.emptyArray;
    ESet.prototype.locallyFree = $util.newBuffer([]);
    ESet.prototype.connectiveUsed = false;
    ESet.prototype.remainder = null;

    ESet.create = function create(properties) {
        return new ESet(properties);
    };

    ESet.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.ps != null && message.ps.length)
            for (let i = 0; i < message.ps.length; ++i)
                $root.Par.encode(message.ps[i], writer.uint32(10).fork()).ldelim();
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            writer.uint32(26).bytes(message.locallyFree);
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            writer.uint32(32).bool(message.connectiveUsed);
        if (message.remainder != null && message.hasOwnProperty("remainder"))
            $root.Var.encode(message.remainder, writer.uint32(42).fork()).ldelim();
        return writer;
    };

    ESet.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    ESet.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ESet();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.ps && message.ps.length))
                    message.ps = [];
                message.ps.push($root.Par.decode(reader, reader.uint32()));
                break;
            case 3:
                message.locallyFree = reader.bytes();
                break;
            case 4:
                message.connectiveUsed = reader.bool();
                break;
            case 5:
                message.remainder = $root.Var.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    ESet.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    ESet.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.ps != null && message.hasOwnProperty("ps")) {
            if (!Array.isArray(message.ps))
                return "ps: array expected";
            for (let i = 0; i < message.ps.length; ++i) {
                let error = $root.Par.verify(message.ps[i]);
                if (error)
                    return "ps." + error;
            }
        }
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            if (!(message.locallyFree && typeof message.locallyFree.length === "number" || $util.isString(message.locallyFree)))
                return "locallyFree: buffer expected";
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            if (typeof message.connectiveUsed !== "boolean")
                return "connectiveUsed: boolean expected";
        if (message.remainder != null && message.hasOwnProperty("remainder")) {
            let error = $root.Var.verify(message.remainder);
            if (error)
                return "remainder." + error;
        }
        return null;
    };

    ESet.fromObject = function fromObject(object) {
        if (object instanceof $root.ESet)
            return object;
        let message = new $root.ESet();
        if (object.ps) {
            if (!Array.isArray(object.ps))
                throw TypeError(".ESet.ps: array expected");
            message.ps = [];
            for (let i = 0; i < object.ps.length; ++i) {
                if (typeof object.ps[i] !== "object")
                    throw TypeError(".ESet.ps: object expected");
                message.ps[i] = $root.Par.fromObject(object.ps[i]);
            }
        }
        if (object.locallyFree != null)
            if (typeof object.locallyFree === "string")
                $util.base64.decode(object.locallyFree, message.locallyFree = $util.newBuffer($util.base64.length(object.locallyFree)), 0);
            else if (object.locallyFree.length)
                message.locallyFree = object.locallyFree;
        if (object.connectiveUsed != null)
            message.connectiveUsed = Boolean(object.connectiveUsed);
        if (object.remainder != null) {
            if (typeof object.remainder !== "object")
                throw TypeError(".ESet.remainder: object expected");
            message.remainder = $root.Var.fromObject(object.remainder);
        }
        return message;
    };

    ESet.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.ps = [];
        if (options.defaults) {
            if (options.bytes === String)
                object.locallyFree = "";
            else {
                object.locallyFree = [];
                if (options.bytes !== Array)
                    object.locallyFree = $util.newBuffer(object.locallyFree);
            }
            object.connectiveUsed = false;
            object.remainder = null;
        }
        if (message.ps && message.ps.length) {
            object.ps = [];
            for (let j = 0; j < message.ps.length; ++j)
                object.ps[j] = $root.Par.toObject(message.ps[j], options);
        }
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            object.locallyFree = options.bytes === String ? $util.base64.encode(message.locallyFree, 0, message.locallyFree.length) : options.bytes === Array ? Array.prototype.slice.call(message.locallyFree) : message.locallyFree;
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            object.connectiveUsed = message.connectiveUsed;
        if (message.remainder != null && message.hasOwnProperty("remainder"))
            object.remainder = $root.Var.toObject(message.remainder, options);
        return object;
    };

    ESet.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ESet;
})();

export const EMap = $root.EMap = (() => {

    function EMap(properties) {
        this.kvs = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    EMap.prototype.kvs = $util.emptyArray;
    EMap.prototype.locallyFree = $util.newBuffer([]);
    EMap.prototype.connectiveUsed = false;

    EMap.create = function create(properties) {
        return new EMap(properties);
    };

    EMap.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.kvs != null && message.kvs.length)
            for (let i = 0; i < message.kvs.length; ++i)
                $root.KeyValuePair.encode(message.kvs[i], writer.uint32(10).fork()).ldelim();
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            writer.uint32(26).bytes(message.locallyFree);
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            writer.uint32(32).bool(message.connectiveUsed);
        return writer;
    };

    EMap.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    EMap.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EMap();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.kvs && message.kvs.length))
                    message.kvs = [];
                message.kvs.push($root.KeyValuePair.decode(reader, reader.uint32()));
                break;
            case 3:
                message.locallyFree = reader.bytes();
                break;
            case 4:
                message.connectiveUsed = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    EMap.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    EMap.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.kvs != null && message.hasOwnProperty("kvs")) {
            if (!Array.isArray(message.kvs))
                return "kvs: array expected";
            for (let i = 0; i < message.kvs.length; ++i) {
                let error = $root.KeyValuePair.verify(message.kvs[i]);
                if (error)
                    return "kvs." + error;
            }
        }
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            if (!(message.locallyFree && typeof message.locallyFree.length === "number" || $util.isString(message.locallyFree)))
                return "locallyFree: buffer expected";
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            if (typeof message.connectiveUsed !== "boolean")
                return "connectiveUsed: boolean expected";
        return null;
    };

    EMap.fromObject = function fromObject(object) {
        if (object instanceof $root.EMap)
            return object;
        let message = new $root.EMap();
        if (object.kvs) {
            if (!Array.isArray(object.kvs))
                throw TypeError(".EMap.kvs: array expected");
            message.kvs = [];
            for (let i = 0; i < object.kvs.length; ++i) {
                if (typeof object.kvs[i] !== "object")
                    throw TypeError(".EMap.kvs: object expected");
                message.kvs[i] = $root.KeyValuePair.fromObject(object.kvs[i]);
            }
        }
        if (object.locallyFree != null)
            if (typeof object.locallyFree === "string")
                $util.base64.decode(object.locallyFree, message.locallyFree = $util.newBuffer($util.base64.length(object.locallyFree)), 0);
            else if (object.locallyFree.length)
                message.locallyFree = object.locallyFree;
        if (object.connectiveUsed != null)
            message.connectiveUsed = Boolean(object.connectiveUsed);
        return message;
    };

    EMap.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.kvs = [];
        if (options.defaults) {
            if (options.bytes === String)
                object.locallyFree = "";
            else {
                object.locallyFree = [];
                if (options.bytes !== Array)
                    object.locallyFree = $util.newBuffer(object.locallyFree);
            }
            object.connectiveUsed = false;
        }
        if (message.kvs && message.kvs.length) {
            object.kvs = [];
            for (let j = 0; j < message.kvs.length; ++j)
                object.kvs[j] = $root.KeyValuePair.toObject(message.kvs[j], options);
        }
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            object.locallyFree = options.bytes === String ? $util.base64.encode(message.locallyFree, 0, message.locallyFree.length) : options.bytes === Array ? Array.prototype.slice.call(message.locallyFree) : message.locallyFree;
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            object.connectiveUsed = message.connectiveUsed;
        return object;
    };

    EMap.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EMap;
})();

export const EMethod = $root.EMethod = (() => {

    function EMethod(properties) {
        this["arguments"] = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    EMethod.prototype.methodName = "";
    EMethod.prototype.target = null;
    EMethod.prototype["arguments"] = $util.emptyArray;
    EMethod.prototype.locallyFree = $util.newBuffer([]);
    EMethod.prototype.connectiveUsed = false;

    EMethod.create = function create(properties) {
        return new EMethod(properties);
    };

    EMethod.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.methodName != null && message.hasOwnProperty("methodName"))
            writer.uint32(10).string(message.methodName);
        if (message.target != null && message.hasOwnProperty("target"))
            $root.Par.encode(message.target, writer.uint32(18).fork()).ldelim();
        if (message["arguments"] != null && message["arguments"].length)
            for (let i = 0; i < message["arguments"].length; ++i)
                $root.Par.encode(message["arguments"][i], writer.uint32(26).fork()).ldelim();
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            writer.uint32(42).bytes(message.locallyFree);
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            writer.uint32(48).bool(message.connectiveUsed);
        return writer;
    };

    EMethod.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    EMethod.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EMethod();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.methodName = reader.string();
                break;
            case 2:
                message.target = $root.Par.decode(reader, reader.uint32());
                break;
            case 3:
                if (!(message["arguments"] && message["arguments"].length))
                    message["arguments"] = [];
                message["arguments"].push($root.Par.decode(reader, reader.uint32()));
                break;
            case 5:
                message.locallyFree = reader.bytes();
                break;
            case 6:
                message.connectiveUsed = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    EMethod.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    EMethod.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.methodName != null && message.hasOwnProperty("methodName"))
            if (!$util.isString(message.methodName))
                return "methodName: string expected";
        if (message.target != null && message.hasOwnProperty("target")) {
            let error = $root.Par.verify(message.target);
            if (error)
                return "target." + error;
        }
        if (message["arguments"] != null && message.hasOwnProperty("arguments")) {
            if (!Array.isArray(message["arguments"]))
                return "arguments: array expected";
            for (let i = 0; i < message["arguments"].length; ++i) {
                let error = $root.Par.verify(message["arguments"][i]);
                if (error)
                    return "arguments." + error;
            }
        }
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            if (!(message.locallyFree && typeof message.locallyFree.length === "number" || $util.isString(message.locallyFree)))
                return "locallyFree: buffer expected";
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            if (typeof message.connectiveUsed !== "boolean")
                return "connectiveUsed: boolean expected";
        return null;
    };

    EMethod.fromObject = function fromObject(object) {
        if (object instanceof $root.EMethod)
            return object;
        let message = new $root.EMethod();
        if (object.methodName != null)
            message.methodName = String(object.methodName);
        if (object.target != null) {
            if (typeof object.target !== "object")
                throw TypeError(".EMethod.target: object expected");
            message.target = $root.Par.fromObject(object.target);
        }
        if (object["arguments"]) {
            if (!Array.isArray(object["arguments"]))
                throw TypeError(".EMethod.arguments: array expected");
            message["arguments"] = [];
            for (let i = 0; i < object["arguments"].length; ++i) {
                if (typeof object["arguments"][i] !== "object")
                    throw TypeError(".EMethod.arguments: object expected");
                message["arguments"][i] = $root.Par.fromObject(object["arguments"][i]);
            }
        }
        if (object.locallyFree != null)
            if (typeof object.locallyFree === "string")
                $util.base64.decode(object.locallyFree, message.locallyFree = $util.newBuffer($util.base64.length(object.locallyFree)), 0);
            else if (object.locallyFree.length)
                message.locallyFree = object.locallyFree;
        if (object.connectiveUsed != null)
            message.connectiveUsed = Boolean(object.connectiveUsed);
        return message;
    };

    EMethod.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object["arguments"] = [];
        if (options.defaults) {
            object.methodName = "";
            object.target = null;
            if (options.bytes === String)
                object.locallyFree = "";
            else {
                object.locallyFree = [];
                if (options.bytes !== Array)
                    object.locallyFree = $util.newBuffer(object.locallyFree);
            }
            object.connectiveUsed = false;
        }
        if (message.methodName != null && message.hasOwnProperty("methodName"))
            object.methodName = message.methodName;
        if (message.target != null && message.hasOwnProperty("target"))
            object.target = $root.Par.toObject(message.target, options);
        if (message["arguments"] && message["arguments"].length) {
            object["arguments"] = [];
            for (let j = 0; j < message["arguments"].length; ++j)
                object["arguments"][j] = $root.Par.toObject(message["arguments"][j], options);
        }
        if (message.locallyFree != null && message.hasOwnProperty("locallyFree"))
            object.locallyFree = options.bytes === String ? $util.base64.encode(message.locallyFree, 0, message.locallyFree.length) : options.bytes === Array ? Array.prototype.slice.call(message.locallyFree) : message.locallyFree;
        if (message.connectiveUsed != null && message.hasOwnProperty("connectiveUsed"))
            object.connectiveUsed = message.connectiveUsed;
        return object;
    };

    EMethod.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EMethod;
})();

export const KeyValuePair = $root.KeyValuePair = (() => {

    function KeyValuePair(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    KeyValuePair.prototype.key = null;
    KeyValuePair.prototype.value = null;

    KeyValuePair.create = function create(properties) {
        return new KeyValuePair(properties);
    };

    KeyValuePair.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.key != null && message.hasOwnProperty("key"))
            $root.Par.encode(message.key, writer.uint32(10).fork()).ldelim();
        if (message.value != null && message.hasOwnProperty("value"))
            $root.Par.encode(message.value, writer.uint32(18).fork()).ldelim();
        return writer;
    };

    KeyValuePair.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    KeyValuePair.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.KeyValuePair();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.key = $root.Par.decode(reader, reader.uint32());
                break;
            case 2:
                message.value = $root.Par.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    KeyValuePair.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    KeyValuePair.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.key != null && message.hasOwnProperty("key")) {
            let error = $root.Par.verify(message.key);
            if (error)
                return "key." + error;
        }
        if (message.value != null && message.hasOwnProperty("value")) {
            let error = $root.Par.verify(message.value);
            if (error)
                return "value." + error;
        }
        return null;
    };

    KeyValuePair.fromObject = function fromObject(object) {
        if (object instanceof $root.KeyValuePair)
            return object;
        let message = new $root.KeyValuePair();
        if (object.key != null) {
            if (typeof object.key !== "object")
                throw TypeError(".KeyValuePair.key: object expected");
            message.key = $root.Par.fromObject(object.key);
        }
        if (object.value != null) {
            if (typeof object.value !== "object")
                throw TypeError(".KeyValuePair.value: object expected");
            message.value = $root.Par.fromObject(object.value);
        }
        return message;
    };

    KeyValuePair.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.key = null;
            object.value = null;
        }
        if (message.key != null && message.hasOwnProperty("key"))
            object.key = $root.Par.toObject(message.key, options);
        if (message.value != null && message.hasOwnProperty("value"))
            object.value = $root.Par.toObject(message.value, options);
        return object;
    };

    KeyValuePair.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return KeyValuePair;
})();

export const EVar = $root.EVar = (() => {

    function EVar(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    EVar.prototype.v = null;

    EVar.create = function create(properties) {
        return new EVar(properties);
    };

    EVar.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.v != null && message.hasOwnProperty("v"))
            $root.Var.encode(message.v, writer.uint32(10).fork()).ldelim();
        return writer;
    };

    EVar.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    EVar.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EVar();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.v = $root.Var.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    EVar.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    EVar.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.v != null && message.hasOwnProperty("v")) {
            let error = $root.Var.verify(message.v);
            if (error)
                return "v." + error;
        }
        return null;
    };

    EVar.fromObject = function fromObject(object) {
        if (object instanceof $root.EVar)
            return object;
        let message = new $root.EVar();
        if (object.v != null) {
            if (typeof object.v !== "object")
                throw TypeError(".EVar.v: object expected");
            message.v = $root.Var.fromObject(object.v);
        }
        return message;
    };

    EVar.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.v = null;
        if (message.v != null && message.hasOwnProperty("v"))
            object.v = $root.Var.toObject(message.v, options);
        return object;
    };

    EVar.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EVar;
})();

export const ENot = $root.ENot = (() => {

    function ENot(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    ENot.prototype.p = null;

    ENot.create = function create(properties) {
        return new ENot(properties);
    };

    ENot.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.p != null && message.hasOwnProperty("p"))
            $root.Par.encode(message.p, writer.uint32(10).fork()).ldelim();
        return writer;
    };

    ENot.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    ENot.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ENot();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.p = $root.Par.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    ENot.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    ENot.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.p != null && message.hasOwnProperty("p")) {
            let error = $root.Par.verify(message.p);
            if (error)
                return "p." + error;
        }
        return null;
    };

    ENot.fromObject = function fromObject(object) {
        if (object instanceof $root.ENot)
            return object;
        let message = new $root.ENot();
        if (object.p != null) {
            if (typeof object.p !== "object")
                throw TypeError(".ENot.p: object expected");
            message.p = $root.Par.fromObject(object.p);
        }
        return message;
    };

    ENot.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.p = null;
        if (message.p != null && message.hasOwnProperty("p"))
            object.p = $root.Par.toObject(message.p, options);
        return object;
    };

    ENot.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ENot;
})();

export const ENeg = $root.ENeg = (() => {

    function ENeg(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    ENeg.prototype.p = null;

    ENeg.create = function create(properties) {
        return new ENeg(properties);
    };

    ENeg.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.p != null && message.hasOwnProperty("p"))
            $root.Par.encode(message.p, writer.uint32(10).fork()).ldelim();
        return writer;
    };

    ENeg.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    ENeg.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ENeg();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.p = $root.Par.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    ENeg.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    ENeg.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.p != null && message.hasOwnProperty("p")) {
            let error = $root.Par.verify(message.p);
            if (error)
                return "p." + error;
        }
        return null;
    };

    ENeg.fromObject = function fromObject(object) {
        if (object instanceof $root.ENeg)
            return object;
        let message = new $root.ENeg();
        if (object.p != null) {
            if (typeof object.p !== "object")
                throw TypeError(".ENeg.p: object expected");
            message.p = $root.Par.fromObject(object.p);
        }
        return message;
    };

    ENeg.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.p = null;
        if (message.p != null && message.hasOwnProperty("p"))
            object.p = $root.Par.toObject(message.p, options);
        return object;
    };

    ENeg.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ENeg;
})();

export const EMult = $root.EMult = (() => {

    function EMult(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    EMult.prototype.p1 = null;
    EMult.prototype.p2 = null;

    EMult.create = function create(properties) {
        return new EMult(properties);
    };

    EMult.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.p1 != null && message.hasOwnProperty("p1"))
            $root.Par.encode(message.p1, writer.uint32(10).fork()).ldelim();
        if (message.p2 != null && message.hasOwnProperty("p2"))
            $root.Par.encode(message.p2, writer.uint32(18).fork()).ldelim();
        return writer;
    };

    EMult.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    EMult.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EMult();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.p1 = $root.Par.decode(reader, reader.uint32());
                break;
            case 2:
                message.p2 = $root.Par.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    EMult.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    EMult.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.p1 != null && message.hasOwnProperty("p1")) {
            let error = $root.Par.verify(message.p1);
            if (error)
                return "p1." + error;
        }
        if (message.p2 != null && message.hasOwnProperty("p2")) {
            let error = $root.Par.verify(message.p2);
            if (error)
                return "p2." + error;
        }
        return null;
    };

    EMult.fromObject = function fromObject(object) {
        if (object instanceof $root.EMult)
            return object;
        let message = new $root.EMult();
        if (object.p1 != null) {
            if (typeof object.p1 !== "object")
                throw TypeError(".EMult.p1: object expected");
            message.p1 = $root.Par.fromObject(object.p1);
        }
        if (object.p2 != null) {
            if (typeof object.p2 !== "object")
                throw TypeError(".EMult.p2: object expected");
            message.p2 = $root.Par.fromObject(object.p2);
        }
        return message;
    };

    EMult.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.p1 = null;
            object.p2 = null;
        }
        if (message.p1 != null && message.hasOwnProperty("p1"))
            object.p1 = $root.Par.toObject(message.p1, options);
        if (message.p2 != null && message.hasOwnProperty("p2"))
            object.p2 = $root.Par.toObject(message.p2, options);
        return object;
    };

    EMult.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EMult;
})();

export const EDiv = $root.EDiv = (() => {

    function EDiv(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    EDiv.prototype.p1 = null;
    EDiv.prototype.p2 = null;

    EDiv.create = function create(properties) {
        return new EDiv(properties);
    };

    EDiv.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.p1 != null && message.hasOwnProperty("p1"))
            $root.Par.encode(message.p1, writer.uint32(10).fork()).ldelim();
        if (message.p2 != null && message.hasOwnProperty("p2"))
            $root.Par.encode(message.p2, writer.uint32(18).fork()).ldelim();
        return writer;
    };

    EDiv.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    EDiv.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EDiv();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.p1 = $root.Par.decode(reader, reader.uint32());
                break;
            case 2:
                message.p2 = $root.Par.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    EDiv.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    EDiv.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.p1 != null && message.hasOwnProperty("p1")) {
            let error = $root.Par.verify(message.p1);
            if (error)
                return "p1." + error;
        }
        if (message.p2 != null && message.hasOwnProperty("p2")) {
            let error = $root.Par.verify(message.p2);
            if (error)
                return "p2." + error;
        }
        return null;
    };

    EDiv.fromObject = function fromObject(object) {
        if (object instanceof $root.EDiv)
            return object;
        let message = new $root.EDiv();
        if (object.p1 != null) {
            if (typeof object.p1 !== "object")
                throw TypeError(".EDiv.p1: object expected");
            message.p1 = $root.Par.fromObject(object.p1);
        }
        if (object.p2 != null) {
            if (typeof object.p2 !== "object")
                throw TypeError(".EDiv.p2: object expected");
            message.p2 = $root.Par.fromObject(object.p2);
        }
        return message;
    };

    EDiv.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.p1 = null;
            object.p2 = null;
        }
        if (message.p1 != null && message.hasOwnProperty("p1"))
            object.p1 = $root.Par.toObject(message.p1, options);
        if (message.p2 != null && message.hasOwnProperty("p2"))
            object.p2 = $root.Par.toObject(message.p2, options);
        return object;
    };

    EDiv.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EDiv;
})();

export const EPlus = $root.EPlus = (() => {

    function EPlus(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    EPlus.prototype.p1 = null;
    EPlus.prototype.p2 = null;

    EPlus.create = function create(properties) {
        return new EPlus(properties);
    };

    EPlus.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.p1 != null && message.hasOwnProperty("p1"))
            $root.Par.encode(message.p1, writer.uint32(10).fork()).ldelim();
        if (message.p2 != null && message.hasOwnProperty("p2"))
            $root.Par.encode(message.p2, writer.uint32(18).fork()).ldelim();
        return writer;
    };

    EPlus.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    EPlus.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EPlus();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.p1 = $root.Par.decode(reader, reader.uint32());
                break;
            case 2:
                message.p2 = $root.Par.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    EPlus.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    EPlus.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.p1 != null && message.hasOwnProperty("p1")) {
            let error = $root.Par.verify(message.p1);
            if (error)
                return "p1." + error;
        }
        if (message.p2 != null && message.hasOwnProperty("p2")) {
            let error = $root.Par.verify(message.p2);
            if (error)
                return "p2." + error;
        }
        return null;
    };

    EPlus.fromObject = function fromObject(object) {
        if (object instanceof $root.EPlus)
            return object;
        let message = new $root.EPlus();
        if (object.p1 != null) {
            if (typeof object.p1 !== "object")
                throw TypeError(".EPlus.p1: object expected");
            message.p1 = $root.Par.fromObject(object.p1);
        }
        if (object.p2 != null) {
            if (typeof object.p2 !== "object")
                throw TypeError(".EPlus.p2: object expected");
            message.p2 = $root.Par.fromObject(object.p2);
        }
        return message;
    };

    EPlus.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.p1 = null;
            object.p2 = null;
        }
        if (message.p1 != null && message.hasOwnProperty("p1"))
            object.p1 = $root.Par.toObject(message.p1, options);
        if (message.p2 != null && message.hasOwnProperty("p2"))
            object.p2 = $root.Par.toObject(message.p2, options);
        return object;
    };

    EPlus.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EPlus;
})();

export const EMinus = $root.EMinus = (() => {

    function EMinus(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    EMinus.prototype.p1 = null;
    EMinus.prototype.p2 = null;

    EMinus.create = function create(properties) {
        return new EMinus(properties);
    };

    EMinus.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.p1 != null && message.hasOwnProperty("p1"))
            $root.Par.encode(message.p1, writer.uint32(10).fork()).ldelim();
        if (message.p2 != null && message.hasOwnProperty("p2"))
            $root.Par.encode(message.p2, writer.uint32(18).fork()).ldelim();
        return writer;
    };

    EMinus.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    EMinus.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EMinus();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.p1 = $root.Par.decode(reader, reader.uint32());
                break;
            case 2:
                message.p2 = $root.Par.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    EMinus.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    EMinus.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.p1 != null && message.hasOwnProperty("p1")) {
            let error = $root.Par.verify(message.p1);
            if (error)
                return "p1." + error;
        }
        if (message.p2 != null && message.hasOwnProperty("p2")) {
            let error = $root.Par.verify(message.p2);
            if (error)
                return "p2." + error;
        }
        return null;
    };

    EMinus.fromObject = function fromObject(object) {
        if (object instanceof $root.EMinus)
            return object;
        let message = new $root.EMinus();
        if (object.p1 != null) {
            if (typeof object.p1 !== "object")
                throw TypeError(".EMinus.p1: object expected");
            message.p1 = $root.Par.fromObject(object.p1);
        }
        if (object.p2 != null) {
            if (typeof object.p2 !== "object")
                throw TypeError(".EMinus.p2: object expected");
            message.p2 = $root.Par.fromObject(object.p2);
        }
        return message;
    };

    EMinus.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.p1 = null;
            object.p2 = null;
        }
        if (message.p1 != null && message.hasOwnProperty("p1"))
            object.p1 = $root.Par.toObject(message.p1, options);
        if (message.p2 != null && message.hasOwnProperty("p2"))
            object.p2 = $root.Par.toObject(message.p2, options);
        return object;
    };

    EMinus.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EMinus;
})();

export const ELt = $root.ELt = (() => {

    function ELt(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    ELt.prototype.p1 = null;
    ELt.prototype.p2 = null;

    ELt.create = function create(properties) {
        return new ELt(properties);
    };

    ELt.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.p1 != null && message.hasOwnProperty("p1"))
            $root.Par.encode(message.p1, writer.uint32(10).fork()).ldelim();
        if (message.p2 != null && message.hasOwnProperty("p2"))
            $root.Par.encode(message.p2, writer.uint32(18).fork()).ldelim();
        return writer;
    };

    ELt.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    ELt.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ELt();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.p1 = $root.Par.decode(reader, reader.uint32());
                break;
            case 2:
                message.p2 = $root.Par.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    ELt.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    ELt.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.p1 != null && message.hasOwnProperty("p1")) {
            let error = $root.Par.verify(message.p1);
            if (error)
                return "p1." + error;
        }
        if (message.p2 != null && message.hasOwnProperty("p2")) {
            let error = $root.Par.verify(message.p2);
            if (error)
                return "p2." + error;
        }
        return null;
    };

    ELt.fromObject = function fromObject(object) {
        if (object instanceof $root.ELt)
            return object;
        let message = new $root.ELt();
        if (object.p1 != null) {
            if (typeof object.p1 !== "object")
                throw TypeError(".ELt.p1: object expected");
            message.p1 = $root.Par.fromObject(object.p1);
        }
        if (object.p2 != null) {
            if (typeof object.p2 !== "object")
                throw TypeError(".ELt.p2: object expected");
            message.p2 = $root.Par.fromObject(object.p2);
        }
        return message;
    };

    ELt.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.p1 = null;
            object.p2 = null;
        }
        if (message.p1 != null && message.hasOwnProperty("p1"))
            object.p1 = $root.Par.toObject(message.p1, options);
        if (message.p2 != null && message.hasOwnProperty("p2"))
            object.p2 = $root.Par.toObject(message.p2, options);
        return object;
    };

    ELt.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ELt;
})();

export const ELte = $root.ELte = (() => {

    function ELte(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    ELte.prototype.p1 = null;
    ELte.prototype.p2 = null;

    ELte.create = function create(properties) {
        return new ELte(properties);
    };

    ELte.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.p1 != null && message.hasOwnProperty("p1"))
            $root.Par.encode(message.p1, writer.uint32(10).fork()).ldelim();
        if (message.p2 != null && message.hasOwnProperty("p2"))
            $root.Par.encode(message.p2, writer.uint32(18).fork()).ldelim();
        return writer;
    };

    ELte.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    ELte.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ELte();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.p1 = $root.Par.decode(reader, reader.uint32());
                break;
            case 2:
                message.p2 = $root.Par.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    ELte.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    ELte.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.p1 != null && message.hasOwnProperty("p1")) {
            let error = $root.Par.verify(message.p1);
            if (error)
                return "p1." + error;
        }
        if (message.p2 != null && message.hasOwnProperty("p2")) {
            let error = $root.Par.verify(message.p2);
            if (error)
                return "p2." + error;
        }
        return null;
    };

    ELte.fromObject = function fromObject(object) {
        if (object instanceof $root.ELte)
            return object;
        let message = new $root.ELte();
        if (object.p1 != null) {
            if (typeof object.p1 !== "object")
                throw TypeError(".ELte.p1: object expected");
            message.p1 = $root.Par.fromObject(object.p1);
        }
        if (object.p2 != null) {
            if (typeof object.p2 !== "object")
                throw TypeError(".ELte.p2: object expected");
            message.p2 = $root.Par.fromObject(object.p2);
        }
        return message;
    };

    ELte.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.p1 = null;
            object.p2 = null;
        }
        if (message.p1 != null && message.hasOwnProperty("p1"))
            object.p1 = $root.Par.toObject(message.p1, options);
        if (message.p2 != null && message.hasOwnProperty("p2"))
            object.p2 = $root.Par.toObject(message.p2, options);
        return object;
    };

    ELte.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ELte;
})();

export const EGt = $root.EGt = (() => {

    function EGt(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    EGt.prototype.p1 = null;
    EGt.prototype.p2 = null;

    EGt.create = function create(properties) {
        return new EGt(properties);
    };

    EGt.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.p1 != null && message.hasOwnProperty("p1"))
            $root.Par.encode(message.p1, writer.uint32(10).fork()).ldelim();
        if (message.p2 != null && message.hasOwnProperty("p2"))
            $root.Par.encode(message.p2, writer.uint32(18).fork()).ldelim();
        return writer;
    };

    EGt.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    EGt.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EGt();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.p1 = $root.Par.decode(reader, reader.uint32());
                break;
            case 2:
                message.p2 = $root.Par.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    EGt.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    EGt.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.p1 != null && message.hasOwnProperty("p1")) {
            let error = $root.Par.verify(message.p1);
            if (error)
                return "p1." + error;
        }
        if (message.p2 != null && message.hasOwnProperty("p2")) {
            let error = $root.Par.verify(message.p2);
            if (error)
                return "p2." + error;
        }
        return null;
    };

    EGt.fromObject = function fromObject(object) {
        if (object instanceof $root.EGt)
            return object;
        let message = new $root.EGt();
        if (object.p1 != null) {
            if (typeof object.p1 !== "object")
                throw TypeError(".EGt.p1: object expected");
            message.p1 = $root.Par.fromObject(object.p1);
        }
        if (object.p2 != null) {
            if (typeof object.p2 !== "object")
                throw TypeError(".EGt.p2: object expected");
            message.p2 = $root.Par.fromObject(object.p2);
        }
        return message;
    };

    EGt.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.p1 = null;
            object.p2 = null;
        }
        if (message.p1 != null && message.hasOwnProperty("p1"))
            object.p1 = $root.Par.toObject(message.p1, options);
        if (message.p2 != null && message.hasOwnProperty("p2"))
            object.p2 = $root.Par.toObject(message.p2, options);
        return object;
    };

    EGt.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EGt;
})();

export const EGte = $root.EGte = (() => {

    function EGte(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    EGte.prototype.p1 = null;
    EGte.prototype.p2 = null;

    EGte.create = function create(properties) {
        return new EGte(properties);
    };

    EGte.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.p1 != null && message.hasOwnProperty("p1"))
            $root.Par.encode(message.p1, writer.uint32(10).fork()).ldelim();
        if (message.p2 != null && message.hasOwnProperty("p2"))
            $root.Par.encode(message.p2, writer.uint32(18).fork()).ldelim();
        return writer;
    };

    EGte.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    EGte.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EGte();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.p1 = $root.Par.decode(reader, reader.uint32());
                break;
            case 2:
                message.p2 = $root.Par.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    EGte.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    EGte.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.p1 != null && message.hasOwnProperty("p1")) {
            let error = $root.Par.verify(message.p1);
            if (error)
                return "p1." + error;
        }
        if (message.p2 != null && message.hasOwnProperty("p2")) {
            let error = $root.Par.verify(message.p2);
            if (error)
                return "p2." + error;
        }
        return null;
    };

    EGte.fromObject = function fromObject(object) {
        if (object instanceof $root.EGte)
            return object;
        let message = new $root.EGte();
        if (object.p1 != null) {
            if (typeof object.p1 !== "object")
                throw TypeError(".EGte.p1: object expected");
            message.p1 = $root.Par.fromObject(object.p1);
        }
        if (object.p2 != null) {
            if (typeof object.p2 !== "object")
                throw TypeError(".EGte.p2: object expected");
            message.p2 = $root.Par.fromObject(object.p2);
        }
        return message;
    };

    EGte.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.p1 = null;
            object.p2 = null;
        }
        if (message.p1 != null && message.hasOwnProperty("p1"))
            object.p1 = $root.Par.toObject(message.p1, options);
        if (message.p2 != null && message.hasOwnProperty("p2"))
            object.p2 = $root.Par.toObject(message.p2, options);
        return object;
    };

    EGte.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EGte;
})();

export const EEq = $root.EEq = (() => {

    function EEq(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    EEq.prototype.p1 = null;
    EEq.prototype.p2 = null;

    EEq.create = function create(properties) {
        return new EEq(properties);
    };

    EEq.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.p1 != null && message.hasOwnProperty("p1"))
            $root.Par.encode(message.p1, writer.uint32(10).fork()).ldelim();
        if (message.p2 != null && message.hasOwnProperty("p2"))
            $root.Par.encode(message.p2, writer.uint32(18).fork()).ldelim();
        return writer;
    };

    EEq.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    EEq.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EEq();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.p1 = $root.Par.decode(reader, reader.uint32());
                break;
            case 2:
                message.p2 = $root.Par.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    EEq.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    EEq.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.p1 != null && message.hasOwnProperty("p1")) {
            let error = $root.Par.verify(message.p1);
            if (error)
                return "p1." + error;
        }
        if (message.p2 != null && message.hasOwnProperty("p2")) {
            let error = $root.Par.verify(message.p2);
            if (error)
                return "p2." + error;
        }
        return null;
    };

    EEq.fromObject = function fromObject(object) {
        if (object instanceof $root.EEq)
            return object;
        let message = new $root.EEq();
        if (object.p1 != null) {
            if (typeof object.p1 !== "object")
                throw TypeError(".EEq.p1: object expected");
            message.p1 = $root.Par.fromObject(object.p1);
        }
        if (object.p2 != null) {
            if (typeof object.p2 !== "object")
                throw TypeError(".EEq.p2: object expected");
            message.p2 = $root.Par.fromObject(object.p2);
        }
        return message;
    };

    EEq.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.p1 = null;
            object.p2 = null;
        }
        if (message.p1 != null && message.hasOwnProperty("p1"))
            object.p1 = $root.Par.toObject(message.p1, options);
        if (message.p2 != null && message.hasOwnProperty("p2"))
            object.p2 = $root.Par.toObject(message.p2, options);
        return object;
    };

    EEq.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EEq;
})();

export const ENeq = $root.ENeq = (() => {

    function ENeq(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    ENeq.prototype.p1 = null;
    ENeq.prototype.p2 = null;

    ENeq.create = function create(properties) {
        return new ENeq(properties);
    };

    ENeq.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.p1 != null && message.hasOwnProperty("p1"))
            $root.Par.encode(message.p1, writer.uint32(10).fork()).ldelim();
        if (message.p2 != null && message.hasOwnProperty("p2"))
            $root.Par.encode(message.p2, writer.uint32(18).fork()).ldelim();
        return writer;
    };

    ENeq.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    ENeq.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ENeq();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.p1 = $root.Par.decode(reader, reader.uint32());
                break;
            case 2:
                message.p2 = $root.Par.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    ENeq.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    ENeq.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.p1 != null && message.hasOwnProperty("p1")) {
            let error = $root.Par.verify(message.p1);
            if (error)
                return "p1." + error;
        }
        if (message.p2 != null && message.hasOwnProperty("p2")) {
            let error = $root.Par.verify(message.p2);
            if (error)
                return "p2." + error;
        }
        return null;
    };

    ENeq.fromObject = function fromObject(object) {
        if (object instanceof $root.ENeq)
            return object;
        let message = new $root.ENeq();
        if (object.p1 != null) {
            if (typeof object.p1 !== "object")
                throw TypeError(".ENeq.p1: object expected");
            message.p1 = $root.Par.fromObject(object.p1);
        }
        if (object.p2 != null) {
            if (typeof object.p2 !== "object")
                throw TypeError(".ENeq.p2: object expected");
            message.p2 = $root.Par.fromObject(object.p2);
        }
        return message;
    };

    ENeq.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.p1 = null;
            object.p2 = null;
        }
        if (message.p1 != null && message.hasOwnProperty("p1"))
            object.p1 = $root.Par.toObject(message.p1, options);
        if (message.p2 != null && message.hasOwnProperty("p2"))
            object.p2 = $root.Par.toObject(message.p2, options);
        return object;
    };

    ENeq.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ENeq;
})();

export const EAnd = $root.EAnd = (() => {

    function EAnd(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    EAnd.prototype.p1 = null;
    EAnd.prototype.p2 = null;

    EAnd.create = function create(properties) {
        return new EAnd(properties);
    };

    EAnd.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.p1 != null && message.hasOwnProperty("p1"))
            $root.Par.encode(message.p1, writer.uint32(10).fork()).ldelim();
        if (message.p2 != null && message.hasOwnProperty("p2"))
            $root.Par.encode(message.p2, writer.uint32(18).fork()).ldelim();
        return writer;
    };

    EAnd.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    EAnd.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EAnd();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.p1 = $root.Par.decode(reader, reader.uint32());
                break;
            case 2:
                message.p2 = $root.Par.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    EAnd.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    EAnd.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.p1 != null && message.hasOwnProperty("p1")) {
            let error = $root.Par.verify(message.p1);
            if (error)
                return "p1." + error;
        }
        if (message.p2 != null && message.hasOwnProperty("p2")) {
            let error = $root.Par.verify(message.p2);
            if (error)
                return "p2." + error;
        }
        return null;
    };

    EAnd.fromObject = function fromObject(object) {
        if (object instanceof $root.EAnd)
            return object;
        let message = new $root.EAnd();
        if (object.p1 != null) {
            if (typeof object.p1 !== "object")
                throw TypeError(".EAnd.p1: object expected");
            message.p1 = $root.Par.fromObject(object.p1);
        }
        if (object.p2 != null) {
            if (typeof object.p2 !== "object")
                throw TypeError(".EAnd.p2: object expected");
            message.p2 = $root.Par.fromObject(object.p2);
        }
        return message;
    };

    EAnd.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.p1 = null;
            object.p2 = null;
        }
        if (message.p1 != null && message.hasOwnProperty("p1"))
            object.p1 = $root.Par.toObject(message.p1, options);
        if (message.p2 != null && message.hasOwnProperty("p2"))
            object.p2 = $root.Par.toObject(message.p2, options);
        return object;
    };

    EAnd.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EAnd;
})();

export const EOr = $root.EOr = (() => {

    function EOr(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    EOr.prototype.p1 = null;
    EOr.prototype.p2 = null;

    EOr.create = function create(properties) {
        return new EOr(properties);
    };

    EOr.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.p1 != null && message.hasOwnProperty("p1"))
            $root.Par.encode(message.p1, writer.uint32(10).fork()).ldelim();
        if (message.p2 != null && message.hasOwnProperty("p2"))
            $root.Par.encode(message.p2, writer.uint32(18).fork()).ldelim();
        return writer;
    };

    EOr.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    EOr.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EOr();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.p1 = $root.Par.decode(reader, reader.uint32());
                break;
            case 2:
                message.p2 = $root.Par.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    EOr.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    EOr.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.p1 != null && message.hasOwnProperty("p1")) {
            let error = $root.Par.verify(message.p1);
            if (error)
                return "p1." + error;
        }
        if (message.p2 != null && message.hasOwnProperty("p2")) {
            let error = $root.Par.verify(message.p2);
            if (error)
                return "p2." + error;
        }
        return null;
    };

    EOr.fromObject = function fromObject(object) {
        if (object instanceof $root.EOr)
            return object;
        let message = new $root.EOr();
        if (object.p1 != null) {
            if (typeof object.p1 !== "object")
                throw TypeError(".EOr.p1: object expected");
            message.p1 = $root.Par.fromObject(object.p1);
        }
        if (object.p2 != null) {
            if (typeof object.p2 !== "object")
                throw TypeError(".EOr.p2: object expected");
            message.p2 = $root.Par.fromObject(object.p2);
        }
        return message;
    };

    EOr.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.p1 = null;
            object.p2 = null;
        }
        if (message.p1 != null && message.hasOwnProperty("p1"))
            object.p1 = $root.Par.toObject(message.p1, options);
        if (message.p2 != null && message.hasOwnProperty("p2"))
            object.p2 = $root.Par.toObject(message.p2, options);
        return object;
    };

    EOr.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EOr;
})();

export const EMatches = $root.EMatches = (() => {

    function EMatches(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    EMatches.prototype.target = null;
    EMatches.prototype.pattern = null;

    EMatches.create = function create(properties) {
        return new EMatches(properties);
    };

    EMatches.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.target != null && message.hasOwnProperty("target"))
            $root.Par.encode(message.target, writer.uint32(10).fork()).ldelim();
        if (message.pattern != null && message.hasOwnProperty("pattern"))
            $root.Par.encode(message.pattern, writer.uint32(18).fork()).ldelim();
        return writer;
    };

    EMatches.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    EMatches.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EMatches();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.target = $root.Par.decode(reader, reader.uint32());
                break;
            case 2:
                message.pattern = $root.Par.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    EMatches.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    EMatches.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.target != null && message.hasOwnProperty("target")) {
            let error = $root.Par.verify(message.target);
            if (error)
                return "target." + error;
        }
        if (message.pattern != null && message.hasOwnProperty("pattern")) {
            let error = $root.Par.verify(message.pattern);
            if (error)
                return "pattern." + error;
        }
        return null;
    };

    EMatches.fromObject = function fromObject(object) {
        if (object instanceof $root.EMatches)
            return object;
        let message = new $root.EMatches();
        if (object.target != null) {
            if (typeof object.target !== "object")
                throw TypeError(".EMatches.target: object expected");
            message.target = $root.Par.fromObject(object.target);
        }
        if (object.pattern != null) {
            if (typeof object.pattern !== "object")
                throw TypeError(".EMatches.pattern: object expected");
            message.pattern = $root.Par.fromObject(object.pattern);
        }
        return message;
    };

    EMatches.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.target = null;
            object.pattern = null;
        }
        if (message.target != null && message.hasOwnProperty("target"))
            object.target = $root.Par.toObject(message.target, options);
        if (message.pattern != null && message.hasOwnProperty("pattern"))
            object.pattern = $root.Par.toObject(message.pattern, options);
        return object;
    };

    EMatches.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EMatches;
})();

export const EPercentPercent = $root.EPercentPercent = (() => {

    function EPercentPercent(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    EPercentPercent.prototype.p1 = null;
    EPercentPercent.prototype.p2 = null;

    EPercentPercent.create = function create(properties) {
        return new EPercentPercent(properties);
    };

    EPercentPercent.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.p1 != null && message.hasOwnProperty("p1"))
            $root.Par.encode(message.p1, writer.uint32(10).fork()).ldelim();
        if (message.p2 != null && message.hasOwnProperty("p2"))
            $root.Par.encode(message.p2, writer.uint32(18).fork()).ldelim();
        return writer;
    };

    EPercentPercent.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    EPercentPercent.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EPercentPercent();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.p1 = $root.Par.decode(reader, reader.uint32());
                break;
            case 2:
                message.p2 = $root.Par.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    EPercentPercent.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    EPercentPercent.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.p1 != null && message.hasOwnProperty("p1")) {
            let error = $root.Par.verify(message.p1);
            if (error)
                return "p1." + error;
        }
        if (message.p2 != null && message.hasOwnProperty("p2")) {
            let error = $root.Par.verify(message.p2);
            if (error)
                return "p2." + error;
        }
        return null;
    };

    EPercentPercent.fromObject = function fromObject(object) {
        if (object instanceof $root.EPercentPercent)
            return object;
        let message = new $root.EPercentPercent();
        if (object.p1 != null) {
            if (typeof object.p1 !== "object")
                throw TypeError(".EPercentPercent.p1: object expected");
            message.p1 = $root.Par.fromObject(object.p1);
        }
        if (object.p2 != null) {
            if (typeof object.p2 !== "object")
                throw TypeError(".EPercentPercent.p2: object expected");
            message.p2 = $root.Par.fromObject(object.p2);
        }
        return message;
    };

    EPercentPercent.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.p1 = null;
            object.p2 = null;
        }
        if (message.p1 != null && message.hasOwnProperty("p1"))
            object.p1 = $root.Par.toObject(message.p1, options);
        if (message.p2 != null && message.hasOwnProperty("p2"))
            object.p2 = $root.Par.toObject(message.p2, options);
        return object;
    };

    EPercentPercent.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EPercentPercent;
})();

export const EPlusPlus = $root.EPlusPlus = (() => {

    function EPlusPlus(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    EPlusPlus.prototype.p1 = null;
    EPlusPlus.prototype.p2 = null;

    EPlusPlus.create = function create(properties) {
        return new EPlusPlus(properties);
    };

    EPlusPlus.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.p1 != null && message.hasOwnProperty("p1"))
            $root.Par.encode(message.p1, writer.uint32(10).fork()).ldelim();
        if (message.p2 != null && message.hasOwnProperty("p2"))
            $root.Par.encode(message.p2, writer.uint32(18).fork()).ldelim();
        return writer;
    };

    EPlusPlus.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    EPlusPlus.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EPlusPlus();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.p1 = $root.Par.decode(reader, reader.uint32());
                break;
            case 2:
                message.p2 = $root.Par.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    EPlusPlus.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    EPlusPlus.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.p1 != null && message.hasOwnProperty("p1")) {
            let error = $root.Par.verify(message.p1);
            if (error)
                return "p1." + error;
        }
        if (message.p2 != null && message.hasOwnProperty("p2")) {
            let error = $root.Par.verify(message.p2);
            if (error)
                return "p2." + error;
        }
        return null;
    };

    EPlusPlus.fromObject = function fromObject(object) {
        if (object instanceof $root.EPlusPlus)
            return object;
        let message = new $root.EPlusPlus();
        if (object.p1 != null) {
            if (typeof object.p1 !== "object")
                throw TypeError(".EPlusPlus.p1: object expected");
            message.p1 = $root.Par.fromObject(object.p1);
        }
        if (object.p2 != null) {
            if (typeof object.p2 !== "object")
                throw TypeError(".EPlusPlus.p2: object expected");
            message.p2 = $root.Par.fromObject(object.p2);
        }
        return message;
    };

    EPlusPlus.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.p1 = null;
            object.p2 = null;
        }
        if (message.p1 != null && message.hasOwnProperty("p1"))
            object.p1 = $root.Par.toObject(message.p1, options);
        if (message.p2 != null && message.hasOwnProperty("p2"))
            object.p2 = $root.Par.toObject(message.p2, options);
        return object;
    };

    EPlusPlus.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EPlusPlus;
})();

export const EMinusMinus = $root.EMinusMinus = (() => {

    function EMinusMinus(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    EMinusMinus.prototype.p1 = null;
    EMinusMinus.prototype.p2 = null;

    EMinusMinus.create = function create(properties) {
        return new EMinusMinus(properties);
    };

    EMinusMinus.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.p1 != null && message.hasOwnProperty("p1"))
            $root.Par.encode(message.p1, writer.uint32(10).fork()).ldelim();
        if (message.p2 != null && message.hasOwnProperty("p2"))
            $root.Par.encode(message.p2, writer.uint32(18).fork()).ldelim();
        return writer;
    };

    EMinusMinus.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    EMinusMinus.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EMinusMinus();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.p1 = $root.Par.decode(reader, reader.uint32());
                break;
            case 2:
                message.p2 = $root.Par.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    EMinusMinus.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    EMinusMinus.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.p1 != null && message.hasOwnProperty("p1")) {
            let error = $root.Par.verify(message.p1);
            if (error)
                return "p1." + error;
        }
        if (message.p2 != null && message.hasOwnProperty("p2")) {
            let error = $root.Par.verify(message.p2);
            if (error)
                return "p2." + error;
        }
        return null;
    };

    EMinusMinus.fromObject = function fromObject(object) {
        if (object instanceof $root.EMinusMinus)
            return object;
        let message = new $root.EMinusMinus();
        if (object.p1 != null) {
            if (typeof object.p1 !== "object")
                throw TypeError(".EMinusMinus.p1: object expected");
            message.p1 = $root.Par.fromObject(object.p1);
        }
        if (object.p2 != null) {
            if (typeof object.p2 !== "object")
                throw TypeError(".EMinusMinus.p2: object expected");
            message.p2 = $root.Par.fromObject(object.p2);
        }
        return message;
    };

    EMinusMinus.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.p1 = null;
            object.p2 = null;
        }
        if (message.p1 != null && message.hasOwnProperty("p1"))
            object.p1 = $root.Par.toObject(message.p1, options);
        if (message.p2 != null && message.hasOwnProperty("p2"))
            object.p2 = $root.Par.toObject(message.p2, options);
        return object;
    };

    EMinusMinus.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EMinusMinus;
})();

export const Connective = $root.Connective = (() => {

    function Connective(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    Connective.prototype.connAndBody = null;
    Connective.prototype.connOrBody = null;
    Connective.prototype.connNotBody = null;
    Connective.prototype.varRefBody = null;
    Connective.prototype.connBool = false;
    Connective.prototype.connInt = false;
    Connective.prototype.connString = false;
    Connective.prototype.connUri = false;
    Connective.prototype.connByteArray = false;

    let $oneOfFields;

    Object.defineProperty(Connective.prototype, "connectiveInstance", {
        get: $util.oneOfGetter($oneOfFields = ["connAndBody", "connOrBody", "connNotBody", "varRefBody", "connBool", "connInt", "connString", "connUri", "connByteArray"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    Connective.create = function create(properties) {
        return new Connective(properties);
    };

    Connective.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.connAndBody != null && message.hasOwnProperty("connAndBody"))
            $root.ConnectiveBody.encode(message.connAndBody, writer.uint32(10).fork()).ldelim();
        if (message.connOrBody != null && message.hasOwnProperty("connOrBody"))
            $root.ConnectiveBody.encode(message.connOrBody, writer.uint32(18).fork()).ldelim();
        if (message.connNotBody != null && message.hasOwnProperty("connNotBody"))
            $root.Par.encode(message.connNotBody, writer.uint32(26).fork()).ldelim();
        if (message.varRefBody != null && message.hasOwnProperty("varRefBody"))
            $root.VarRef.encode(message.varRefBody, writer.uint32(34).fork()).ldelim();
        if (message.connBool != null && message.hasOwnProperty("connBool"))
            writer.uint32(40).bool(message.connBool);
        if (message.connInt != null && message.hasOwnProperty("connInt"))
            writer.uint32(48).bool(message.connInt);
        if (message.connString != null && message.hasOwnProperty("connString"))
            writer.uint32(56).bool(message.connString);
        if (message.connUri != null && message.hasOwnProperty("connUri"))
            writer.uint32(64).bool(message.connUri);
        if (message.connByteArray != null && message.hasOwnProperty("connByteArray"))
            writer.uint32(72).bool(message.connByteArray);
        return writer;
    };

    Connective.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    Connective.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Connective();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.connAndBody = $root.ConnectiveBody.decode(reader, reader.uint32());
                break;
            case 2:
                message.connOrBody = $root.ConnectiveBody.decode(reader, reader.uint32());
                break;
            case 3:
                message.connNotBody = $root.Par.decode(reader, reader.uint32());
                break;
            case 4:
                message.varRefBody = $root.VarRef.decode(reader, reader.uint32());
                break;
            case 5:
                message.connBool = reader.bool();
                break;
            case 6:
                message.connInt = reader.bool();
                break;
            case 7:
                message.connString = reader.bool();
                break;
            case 8:
                message.connUri = reader.bool();
                break;
            case 9:
                message.connByteArray = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    Connective.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    Connective.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.connAndBody != null && message.hasOwnProperty("connAndBody")) {
            properties.connectiveInstance = 1;
            {
                let error = $root.ConnectiveBody.verify(message.connAndBody);
                if (error)
                    return "connAndBody." + error;
            }
        }
        if (message.connOrBody != null && message.hasOwnProperty("connOrBody")) {
            if (properties.connectiveInstance === 1)
                return "connectiveInstance: multiple values";
            properties.connectiveInstance = 1;
            {
                let error = $root.ConnectiveBody.verify(message.connOrBody);
                if (error)
                    return "connOrBody." + error;
            }
        }
        if (message.connNotBody != null && message.hasOwnProperty("connNotBody")) {
            if (properties.connectiveInstance === 1)
                return "connectiveInstance: multiple values";
            properties.connectiveInstance = 1;
            {
                let error = $root.Par.verify(message.connNotBody);
                if (error)
                    return "connNotBody." + error;
            }
        }
        if (message.varRefBody != null && message.hasOwnProperty("varRefBody")) {
            if (properties.connectiveInstance === 1)
                return "connectiveInstance: multiple values";
            properties.connectiveInstance = 1;
            {
                let error = $root.VarRef.verify(message.varRefBody);
                if (error)
                    return "varRefBody." + error;
            }
        }
        if (message.connBool != null && message.hasOwnProperty("connBool")) {
            if (properties.connectiveInstance === 1)
                return "connectiveInstance: multiple values";
            properties.connectiveInstance = 1;
            if (typeof message.connBool !== "boolean")
                return "connBool: boolean expected";
        }
        if (message.connInt != null && message.hasOwnProperty("connInt")) {
            if (properties.connectiveInstance === 1)
                return "connectiveInstance: multiple values";
            properties.connectiveInstance = 1;
            if (typeof message.connInt !== "boolean")
                return "connInt: boolean expected";
        }
        if (message.connString != null && message.hasOwnProperty("connString")) {
            if (properties.connectiveInstance === 1)
                return "connectiveInstance: multiple values";
            properties.connectiveInstance = 1;
            if (typeof message.connString !== "boolean")
                return "connString: boolean expected";
        }
        if (message.connUri != null && message.hasOwnProperty("connUri")) {
            if (properties.connectiveInstance === 1)
                return "connectiveInstance: multiple values";
            properties.connectiveInstance = 1;
            if (typeof message.connUri !== "boolean")
                return "connUri: boolean expected";
        }
        if (message.connByteArray != null && message.hasOwnProperty("connByteArray")) {
            if (properties.connectiveInstance === 1)
                return "connectiveInstance: multiple values";
            properties.connectiveInstance = 1;
            if (typeof message.connByteArray !== "boolean")
                return "connByteArray: boolean expected";
        }
        return null;
    };

    Connective.fromObject = function fromObject(object) {
        if (object instanceof $root.Connective)
            return object;
        let message = new $root.Connective();
        if (object.connAndBody != null) {
            if (typeof object.connAndBody !== "object")
                throw TypeError(".Connective.connAndBody: object expected");
            message.connAndBody = $root.ConnectiveBody.fromObject(object.connAndBody);
        }
        if (object.connOrBody != null) {
            if (typeof object.connOrBody !== "object")
                throw TypeError(".Connective.connOrBody: object expected");
            message.connOrBody = $root.ConnectiveBody.fromObject(object.connOrBody);
        }
        if (object.connNotBody != null) {
            if (typeof object.connNotBody !== "object")
                throw TypeError(".Connective.connNotBody: object expected");
            message.connNotBody = $root.Par.fromObject(object.connNotBody);
        }
        if (object.varRefBody != null) {
            if (typeof object.varRefBody !== "object")
                throw TypeError(".Connective.varRefBody: object expected");
            message.varRefBody = $root.VarRef.fromObject(object.varRefBody);
        }
        if (object.connBool != null)
            message.connBool = Boolean(object.connBool);
        if (object.connInt != null)
            message.connInt = Boolean(object.connInt);
        if (object.connString != null)
            message.connString = Boolean(object.connString);
        if (object.connUri != null)
            message.connUri = Boolean(object.connUri);
        if (object.connByteArray != null)
            message.connByteArray = Boolean(object.connByteArray);
        return message;
    };

    Connective.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (message.connAndBody != null && message.hasOwnProperty("connAndBody")) {
            object.connAndBody = $root.ConnectiveBody.toObject(message.connAndBody, options);
            if (options.oneofs)
                object.connectiveInstance = "connAndBody";
        }
        if (message.connOrBody != null && message.hasOwnProperty("connOrBody")) {
            object.connOrBody = $root.ConnectiveBody.toObject(message.connOrBody, options);
            if (options.oneofs)
                object.connectiveInstance = "connOrBody";
        }
        if (message.connNotBody != null && message.hasOwnProperty("connNotBody")) {
            object.connNotBody = $root.Par.toObject(message.connNotBody, options);
            if (options.oneofs)
                object.connectiveInstance = "connNotBody";
        }
        if (message.varRefBody != null && message.hasOwnProperty("varRefBody")) {
            object.varRefBody = $root.VarRef.toObject(message.varRefBody, options);
            if (options.oneofs)
                object.connectiveInstance = "varRefBody";
        }
        if (message.connBool != null && message.hasOwnProperty("connBool")) {
            object.connBool = message.connBool;
            if (options.oneofs)
                object.connectiveInstance = "connBool";
        }
        if (message.connInt != null && message.hasOwnProperty("connInt")) {
            object.connInt = message.connInt;
            if (options.oneofs)
                object.connectiveInstance = "connInt";
        }
        if (message.connString != null && message.hasOwnProperty("connString")) {
            object.connString = message.connString;
            if (options.oneofs)
                object.connectiveInstance = "connString";
        }
        if (message.connUri != null && message.hasOwnProperty("connUri")) {
            object.connUri = message.connUri;
            if (options.oneofs)
                object.connectiveInstance = "connUri";
        }
        if (message.connByteArray != null && message.hasOwnProperty("connByteArray")) {
            object.connByteArray = message.connByteArray;
            if (options.oneofs)
                object.connectiveInstance = "connByteArray";
        }
        return object;
    };

    Connective.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Connective;
})();

export const VarRef = $root.VarRef = (() => {

    function VarRef(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    VarRef.prototype.index = 0;
    VarRef.prototype.depth = 0;

    VarRef.create = function create(properties) {
        return new VarRef(properties);
    };

    VarRef.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.index != null && message.hasOwnProperty("index"))
            writer.uint32(8).sint32(message.index);
        if (message.depth != null && message.hasOwnProperty("depth"))
            writer.uint32(16).sint32(message.depth);
        return writer;
    };

    VarRef.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    VarRef.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.VarRef();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.index = reader.sint32();
                break;
            case 2:
                message.depth = reader.sint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    VarRef.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    VarRef.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.index != null && message.hasOwnProperty("index"))
            if (!$util.isInteger(message.index))
                return "index: integer expected";
        if (message.depth != null && message.hasOwnProperty("depth"))
            if (!$util.isInteger(message.depth))
                return "depth: integer expected";
        return null;
    };

    VarRef.fromObject = function fromObject(object) {
        if (object instanceof $root.VarRef)
            return object;
        let message = new $root.VarRef();
        if (object.index != null)
            message.index = object.index | 0;
        if (object.depth != null)
            message.depth = object.depth | 0;
        return message;
    };

    VarRef.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.index = 0;
            object.depth = 0;
        }
        if (message.index != null && message.hasOwnProperty("index"))
            object.index = message.index;
        if (message.depth != null && message.hasOwnProperty("depth"))
            object.depth = message.depth;
        return object;
    };

    VarRef.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return VarRef;
})();

export const ConnectiveBody = $root.ConnectiveBody = (() => {

    function ConnectiveBody(properties) {
        this.ps = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    ConnectiveBody.prototype.ps = $util.emptyArray;

    ConnectiveBody.create = function create(properties) {
        return new ConnectiveBody(properties);
    };

    ConnectiveBody.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.ps != null && message.ps.length)
            for (let i = 0; i < message.ps.length; ++i)
                $root.Par.encode(message.ps[i], writer.uint32(10).fork()).ldelim();
        return writer;
    };

    ConnectiveBody.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    ConnectiveBody.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ConnectiveBody();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.ps && message.ps.length))
                    message.ps = [];
                message.ps.push($root.Par.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    ConnectiveBody.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    ConnectiveBody.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.ps != null && message.hasOwnProperty("ps")) {
            if (!Array.isArray(message.ps))
                return "ps: array expected";
            for (let i = 0; i < message.ps.length; ++i) {
                let error = $root.Par.verify(message.ps[i]);
                if (error)
                    return "ps." + error;
            }
        }
        return null;
    };

    ConnectiveBody.fromObject = function fromObject(object) {
        if (object instanceof $root.ConnectiveBody)
            return object;
        let message = new $root.ConnectiveBody();
        if (object.ps) {
            if (!Array.isArray(object.ps))
                throw TypeError(".ConnectiveBody.ps: array expected");
            message.ps = [];
            for (let i = 0; i < object.ps.length; ++i) {
                if (typeof object.ps[i] !== "object")
                    throw TypeError(".ConnectiveBody.ps: object expected");
                message.ps[i] = $root.Par.fromObject(object.ps[i]);
            }
        }
        return message;
    };

    ConnectiveBody.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.ps = [];
        if (message.ps && message.ps.length) {
            object.ps = [];
            for (let j = 0; j < message.ps.length; ++j)
                object.ps[j] = $root.Par.toObject(message.ps[j], options);
        }
        return object;
    };

    ConnectiveBody.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ConnectiveBody;
})();

export const GPrivate = $root.GPrivate = (() => {

    function GPrivate(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    GPrivate.prototype.id = $util.newBuffer([]);

    GPrivate.create = function create(properties) {
        return new GPrivate(properties);
    };

    GPrivate.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(10).bytes(message.id);
        return writer;
    };

    GPrivate.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    GPrivate.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GPrivate();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    GPrivate.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    GPrivate.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!(message.id && typeof message.id.length === "number" || $util.isString(message.id)))
                return "id: buffer expected";
        return null;
    };

    GPrivate.fromObject = function fromObject(object) {
        if (object instanceof $root.GPrivate)
            return object;
        let message = new $root.GPrivate();
        if (object.id != null)
            if (typeof object.id === "string")
                $util.base64.decode(object.id, message.id = $util.newBuffer($util.base64.length(object.id)), 0);
            else if (object.id.length)
                message.id = object.id;
        return message;
    };

    GPrivate.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            if (options.bytes === String)
                object.id = "";
            else {
                object.id = [];
                if (options.bytes !== Array)
                    object.id = $util.newBuffer(object.id);
            }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = options.bytes === String ? $util.base64.encode(message.id, 0, message.id.length) : options.bytes === Array ? Array.prototype.slice.call(message.id) : message.id;
        return object;
    };

    GPrivate.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GPrivate;
})();

export { $root as default };
