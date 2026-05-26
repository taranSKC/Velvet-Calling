
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "4.0.2";globalThis.nextVersion = "16.2.6";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/@opennextjs/aws/node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/@opennextjs/aws/node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream2({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream2({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream2({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          const cur = responseHeaders[key];
          if (cur === void 0) {
            responseHeaders[key] = value;
          } else if (Array.isArray(cur)) {
            cur.push(value);
          } else {
            responseHeaders[key] = [cur, value];
          }
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// .next/server/edge/chunks/[root-of-the-server]__0fq~heb._.js
var require_root_of_the_server_0fq_heb = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__0fq~heb._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__0fq~heb._.js", 51615, (e, r, o) => {
      r.exports = e.x("node:buffer", () => (init_node_buffer(), __toCommonJS(node_buffer_exports)));
    }, 78500, (e, r, o) => {
      r.exports = e.x("node:async_hooks", () => (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports)));
    }, 38022, (e, r, o) => {
      self._ENTRIES ||= {};
      let n = Promise.resolve().then(() => e.i(42738));
      n.catch(() => {
      }), self._ENTRIES.middleware_middleware = new Proxy(n, { get(e2, r2) {
        if ("then" === r2) return (r3, o3) => e2.then(r3, o3);
        let o2 = (...o3) => e2.then((e3) => (0, e3[r2])(...o3));
        return o2.then = (o3, n2) => e2.then((e3) => e3[r2]).then(o3, n2), o2;
      } });
    }]);
  }
});

// .next/server/edge/chunks/node_modules_0e~bjuu._.js
var require_node_modules_0e_bjuu = __commonJS({
  ".next/server/edge/chunks/node_modules_0e~bjuu._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/node_modules_0e~bjuu._.js", 74398, (e, t, r) => {
    }, 28042, (e, t, r) => {
      "use strict";
      var n = Object.defineProperty, i = Object.getOwnPropertyDescriptor, a = Object.getOwnPropertyNames, o = Object.prototype.hasOwnProperty, s = {}, l = { RequestCookies: () => g, ResponseCookies: () => m, parseCookie: () => d, parseSetCookie: () => p, stringifyCookie: () => u };
      for (var c in l) n(s, c, { get: l[c], enumerable: true });
      function u(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function d(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, i2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != i2 ? i2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function p(e2) {
        if (!e2) return;
        let [[t2, r2], ...n2] = d(e2), { domain: i2, expires: a2, httponly: o2, maxage: s2, path: l2, samesite: c2, secure: u2, partitioned: p2, priority: g2 } = Object.fromEntries(n2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          var m2, y, b = { name: t2, value: decodeURIComponent(r2), domain: i2, ...a2 && { expires: new Date(a2) }, ...o2 && { httpOnly: true }, ..."string" == typeof s2 && { maxAge: Number(s2) }, path: l2, ...c2 && { sameSite: h.includes(m2 = (m2 = c2).toLowerCase()) ? m2 : void 0 }, ...u2 && { secure: true }, ...g2 && { priority: f.includes(y = (y = g2).toLowerCase()) ? y : void 0 }, ...p2 && { partitioned: true } };
          let e3 = {};
          for (let t3 in b) b[t3] && (e3[t3] = b[t3]);
          return e3;
        }
      }
      t.exports = ((e2, t2, r2, s2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let l2 of a(t2)) o.call(e2, l2) || l2 === r2 || n(e2, l2, { get: () => t2[l2], enumerable: !(s2 = i(t2, l2)) || s2.enumerable });
        return e2;
      })(n({}, "__esModule", { value: true }), s);
      var h = ["strict", "lax", "none"], f = ["low", "medium", "high"], g = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const t2 = e2.get("cookie");
          if (t2) for (const [e3, r2] of d(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => u(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => u(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, m = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const i2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (const e3 of Array.isArray(i2) ? i2 : function(e4) {
            if (!e4) return [];
            var t3, r3, n3, i3, a2, o2 = [], s2 = 0;
            function l2() {
              for (; s2 < e4.length && /\s/.test(e4.charAt(s2)); ) s2 += 1;
              return s2 < e4.length;
            }
            for (; s2 < e4.length; ) {
              for (t3 = s2, a2 = false; l2(); ) if ("," === (r3 = e4.charAt(s2))) {
                for (n3 = s2, s2 += 1, l2(), i3 = s2; s2 < e4.length && "=" !== (r3 = e4.charAt(s2)) && ";" !== r3 && "," !== r3; ) s2 += 1;
                s2 < e4.length && "=" === e4.charAt(s2) ? (a2 = true, s2 = i3, o2.push(e4.substring(t3, n3)), t3 = s2) : s2 = n3 + 1;
              } else s2 += 1;
              (!a2 || s2 >= e4.length) && o2.push(e4.substring(t3, e4.length));
            }
            return o2;
          }(i2)) {
            const t3 = p(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, i2 = this._parsed;
          return i2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...n2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = u(r3);
              t3.append("set-cookie", e4);
            }
          }(i2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(u).join("; ");
        }
      };
    }, 90044, (e) => {
      "use strict";
      let t = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class r {
        disable() {
          throw t;
        }
        getStore() {
        }
        run() {
          throw t;
        }
        exit() {
          throw t;
        }
        enterWith() {
          throw t;
        }
        static bind(e2) {
          return e2;
        }
      }
      let n = "u" > typeof globalThis && globalThis.AsyncLocalStorage;
      e.s(["bindSnapshot", 0, function(e2) {
        return n ? n.bind(e2) : r.bind(e2);
      }, "createAsyncLocalStorage", 0, function() {
        return n ? new n() : new r();
      }, "createSnapshot", 0, function() {
        return n ? n.snapshot() : function(e2, ...t2) {
          return e2(...t2);
        };
      }]);
    }, 59110, (e, t, r) => {
      (() => {
        "use strict";
        let r2, n, i, a, o;
        var s, l, c, u, d, p, h, f, g, m, y, b, w, v, _, E, S = { 491: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ContextAPI = void 0;
          let n2 = r3(223), i2 = r3(172), a2 = r3(930), o2 = "context", s2 = new n2.NoopContextManager();
          class l2 {
            static getInstance() {
              return this._instance || (this._instance = new l2()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, i2.registerGlobal)(o2, e3, a2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t3, r4, ...n3) {
              return this._getContextManager().with(e3, t3, r4, ...n3);
            }
            bind(e3, t3) {
              return this._getContextManager().bind(e3, t3);
            }
            _getContextManager() {
              return (0, i2.getGlobal)(o2) || s2;
            }
            disable() {
              this._getContextManager().disable(), (0, i2.unregisterGlobal)(o2, a2.DiagAPI.instance());
            }
          }
          t2.ContextAPI = l2;
        }, 930: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagAPI = void 0;
          let n2 = r3(56), i2 = r3(912), a2 = r3(957), o2 = r3(172);
          class s2 {
            constructor() {
              function e3(e4) {
                return function(...t4) {
                  let r4 = (0, o2.getGlobal)("diag");
                  if (r4) return r4[e4](...t4);
                };
              }
              const t3 = this;
              t3.setLogger = (e4, r4 = { logLevel: a2.DiagLogLevel.INFO }) => {
                var n3, s3, l2;
                if (e4 === t3) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t3.error(null != (n3 = e5.stack) ? n3 : e5.message), false;
                }
                "number" == typeof r4 && (r4 = { logLevel: r4 });
                let c2 = (0, o2.getGlobal)("diag"), u2 = (0, i2.createLogLevelDiagLogger)(null != (s3 = r4.logLevel) ? s3 : a2.DiagLogLevel.INFO, e4);
                if (c2 && !r4.suppressOverrideMessage) {
                  let e5 = null != (l2 = Error().stack) ? l2 : "<failed to generate stacktrace>";
                  c2.warn(`Current logger will be overwritten from ${e5}`), u2.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, o2.registerGlobal)("diag", u2, t3, true);
              }, t3.disable = () => {
                (0, o2.unregisterGlobal)("diag", t3);
              }, t3.createComponentLogger = (e4) => new n2.DiagComponentLogger(e4), t3.verbose = e3("verbose"), t3.debug = e3("debug"), t3.info = e3("info"), t3.warn = e3("warn"), t3.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new s2()), this._instance;
            }
          }
          t2.DiagAPI = s2;
        }, 653: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.MetricsAPI = void 0;
          let n2 = r3(660), i2 = r3(172), a2 = r3(930), o2 = "metrics";
          class s2 {
            static getInstance() {
              return this._instance || (this._instance = new s2()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, i2.registerGlobal)(o2, e3, a2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, i2.getGlobal)(o2) || n2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t3, r4) {
              return this.getMeterProvider().getMeter(e3, t3, r4);
            }
            disable() {
              (0, i2.unregisterGlobal)(o2, a2.DiagAPI.instance());
            }
          }
          t2.MetricsAPI = s2;
        }, 181: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.PropagationAPI = void 0;
          let n2 = r3(172), i2 = r3(874), a2 = r3(194), o2 = r3(277), s2 = r3(369), l2 = r3(930), c2 = "propagation", u2 = new i2.NoopTextMapPropagator();
          class d2 {
            constructor() {
              this.createBaggage = s2.createBaggage, this.getBaggage = o2.getBaggage, this.getActiveBaggage = o2.getActiveBaggage, this.setBaggage = o2.setBaggage, this.deleteBaggage = o2.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new d2()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, n2.registerGlobal)(c2, e3, l2.DiagAPI.instance());
            }
            inject(e3, t3, r4 = a2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t3, r4);
            }
            extract(e3, t3, r4 = a2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t3, r4);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, n2.unregisterGlobal)(c2, l2.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, n2.getGlobal)(c2) || u2;
            }
          }
          t2.PropagationAPI = d2;
        }, 997: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceAPI = void 0;
          let n2 = r3(172), i2 = r3(846), a2 = r3(139), o2 = r3(607), s2 = r3(930), l2 = "trace";
          class c2 {
            constructor() {
              this._proxyTracerProvider = new i2.ProxyTracerProvider(), this.wrapSpanContext = a2.wrapSpanContext, this.isSpanContextValid = a2.isSpanContextValid, this.deleteSpan = o2.deleteSpan, this.getSpan = o2.getSpan, this.getActiveSpan = o2.getActiveSpan, this.getSpanContext = o2.getSpanContext, this.setSpan = o2.setSpan, this.setSpanContext = o2.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new c2()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t3 = (0, n2.registerGlobal)(l2, this._proxyTracerProvider, s2.DiagAPI.instance());
              return t3 && this._proxyTracerProvider.setDelegate(e3), t3;
            }
            getTracerProvider() {
              return (0, n2.getGlobal)(l2) || this._proxyTracerProvider;
            }
            getTracer(e3, t3) {
              return this.getTracerProvider().getTracer(e3, t3);
            }
            disable() {
              (0, n2.unregisterGlobal)(l2, s2.DiagAPI.instance()), this._proxyTracerProvider = new i2.ProxyTracerProvider();
            }
          }
          t2.TraceAPI = c2;
        }, 277: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.deleteBaggage = t2.setBaggage = t2.getActiveBaggage = t2.getBaggage = void 0;
          let n2 = r3(491), i2 = (0, r3(780).createContextKey)("OpenTelemetry Baggage Key");
          function a2(e3) {
            return e3.getValue(i2) || void 0;
          }
          t2.getBaggage = a2, t2.getActiveBaggage = function() {
            return a2(n2.ContextAPI.getInstance().active());
          }, t2.setBaggage = function(e3, t3) {
            return e3.setValue(i2, t3);
          }, t2.deleteBaggage = function(e3) {
            return e3.deleteValue(i2);
          };
        }, 993: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BaggageImpl = void 0;
          class r3 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t3 = this._entries.get(e3);
              if (t3) return Object.assign({}, t3);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t3]) => [e3, t3]);
            }
            setEntry(e3, t3) {
              let n2 = new r3(this._entries);
              return n2._entries.set(e3, t3), n2;
            }
            removeEntry(e3) {
              let t3 = new r3(this._entries);
              return t3._entries.delete(e3), t3;
            }
            removeEntries(...e3) {
              let t3 = new r3(this._entries);
              for (let r4 of e3) t3._entries.delete(r4);
              return t3;
            }
            clear() {
              return new r3();
            }
          }
          t2.BaggageImpl = r3;
        }, 830: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataSymbol = void 0, t2.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataFromString = t2.createBaggage = void 0;
          let n2 = r3(930), i2 = r3(993), a2 = r3(830), o2 = n2.DiagAPI.instance();
          t2.createBaggage = function(e3 = {}) {
            return new i2.BaggageImpl(new Map(Object.entries(e3)));
          }, t2.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (o2.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: a2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.context = void 0, t2.context = r3(491).ContextAPI.getInstance();
        }, 223: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopContextManager = void 0;
          let n2 = r3(780);
          t2.NoopContextManager = class {
            active() {
              return n2.ROOT_CONTEXT;
            }
            with(e3, t3, r4, ...n3) {
              return t3.call(r4, ...n3);
            }
            bind(e3, t3) {
              return t3;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          };
        }, 780: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ROOT_CONTEXT = t2.createContextKey = void 0, t2.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r3 {
            constructor(e3) {
              const t3 = this;
              t3._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t3.getValue = (e4) => t3._currentContext.get(e4), t3.setValue = (e4, n2) => {
                let i2 = new r3(t3._currentContext);
                return i2._currentContext.set(e4, n2), i2;
              }, t3.deleteValue = (e4) => {
                let n2 = new r3(t3._currentContext);
                return n2._currentContext.delete(e4), n2;
              };
            }
          }
          t2.ROOT_CONTEXT = new r3();
        }, 506: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.diag = void 0, t2.diag = r3(930).DiagAPI.instance();
        }, 56: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagComponentLogger = void 0;
          let n2 = r3(172);
          function i2(e3, t3, r4) {
            let i3 = (0, n2.getGlobal)("diag");
            if (i3) return r4.unshift(t3), i3[e3](...r4);
          }
          t2.DiagComponentLogger = class {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return i2("debug", this._namespace, e3);
            }
            error(...e3) {
              return i2("error", this._namespace, e3);
            }
            info(...e3) {
              return i2("info", this._namespace, e3);
            }
            warn(...e3) {
              return i2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return i2("verbose", this._namespace, e3);
            }
          };
        }, 972: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagConsoleLogger = void 0;
          let r3 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          t2.DiagConsoleLogger = class {
            constructor() {
              for (let e3 = 0; e3 < r3.length; e3++) this[r3[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t3) {
                  if (console) {
                    let r4 = console[e4];
                    if ("function" != typeof r4 && (r4 = console.log), "function" == typeof r4) return r4.apply(console, t3);
                  }
                };
              }(r3[e3].c);
            }
          };
        }, 912: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createLogLevelDiagLogger = void 0;
          let n2 = r3(957);
          t2.createLogLevelDiagLogger = function(e3, t3) {
            function r4(r5, n3) {
              let i2 = t3[r5];
              return "function" == typeof i2 && e3 >= n3 ? i2.bind(t3) : function() {
              };
            }
            return e3 < n2.DiagLogLevel.NONE ? e3 = n2.DiagLogLevel.NONE : e3 > n2.DiagLogLevel.ALL && (e3 = n2.DiagLogLevel.ALL), t3 = t3 || {}, { error: r4("error", n2.DiagLogLevel.ERROR), warn: r4("warn", n2.DiagLogLevel.WARN), info: r4("info", n2.DiagLogLevel.INFO), debug: r4("debug", n2.DiagLogLevel.DEBUG), verbose: r4("verbose", n2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagLogLevel = void 0, (r3 = t2.DiagLogLevel || (t2.DiagLogLevel = {}))[r3.NONE = 0] = "NONE", r3[r3.ERROR = 30] = "ERROR", r3[r3.WARN = 50] = "WARN", r3[r3.INFO = 60] = "INFO", r3[r3.DEBUG = 70] = "DEBUG", r3[r3.VERBOSE = 80] = "VERBOSE", r3[r3.ALL = 9999] = "ALL";
        }, 172: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.unregisterGlobal = t2.getGlobal = t2.registerGlobal = void 0;
          let n2 = r3(200), i2 = r3(521), a2 = r3(130), o2 = i2.VERSION.split(".")[0], s2 = Symbol.for(`opentelemetry.js.api.${o2}`), l2 = n2._globalThis;
          t2.registerGlobal = function(e3, t3, r4, n3 = false) {
            var a3;
            let o3 = l2[s2] = null != (a3 = l2[s2]) ? a3 : { version: i2.VERSION };
            if (!n3 && o3[e3]) {
              let t4 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r4.error(t4.stack || t4.message), false;
            }
            if (o3.version !== i2.VERSION) {
              let t4 = Error(`@opentelemetry/api: Registration of version v${o3.version} for ${e3} does not match previously registered API v${i2.VERSION}`);
              return r4.error(t4.stack || t4.message), false;
            }
            return o3[e3] = t3, r4.debug(`@opentelemetry/api: Registered a global for ${e3} v${i2.VERSION}.`), true;
          }, t2.getGlobal = function(e3) {
            var t3, r4;
            let n3 = null == (t3 = l2[s2]) ? void 0 : t3.version;
            if (n3 && (0, a2.isCompatible)(n3)) return null == (r4 = l2[s2]) ? void 0 : r4[e3];
          }, t2.unregisterGlobal = function(e3, t3) {
            t3.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${i2.VERSION}.`);
            let r4 = l2[s2];
            r4 && delete r4[e3];
          };
        }, 130: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.isCompatible = t2._makeCompatibilityCheck = void 0;
          let n2 = r3(521), i2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function a2(e3) {
            let t3 = /* @__PURE__ */ new Set([e3]), r4 = /* @__PURE__ */ new Set(), n3 = e3.match(i2);
            if (!n3) return () => false;
            let a3 = { major: +n3[1], minor: +n3[2], patch: +n3[3], prerelease: n3[4] };
            if (null != a3.prerelease) return function(t4) {
              return t4 === e3;
            };
            function o2(e4) {
              return r4.add(e4), false;
            }
            return function(e4) {
              if (t3.has(e4)) return true;
              if (r4.has(e4)) return false;
              let n4 = e4.match(i2);
              if (!n4) return o2(e4);
              let s2 = { major: +n4[1], minor: +n4[2], patch: +n4[3], prerelease: n4[4] };
              if (null != s2.prerelease || a3.major !== s2.major) return o2(e4);
              if (0 === a3.major) return a3.minor === s2.minor && a3.patch <= s2.patch ? (t3.add(e4), true) : o2(e4);
              return a3.minor <= s2.minor ? (t3.add(e4), true) : o2(e4);
            };
          }
          t2._makeCompatibilityCheck = a2, t2.isCompatible = a2(n2.VERSION);
        }, 886: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.metrics = void 0, t2.metrics = r3(653).MetricsAPI.getInstance();
        }, 901: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ValueType = void 0, (r3 = t2.ValueType || (t2.ValueType = {}))[r3.INT = 0] = "INT", r3[r3.DOUBLE = 1] = "DOUBLE";
        }, 102: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createNoopMeter = t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t2.NOOP_OBSERVABLE_GAUGE_METRIC = t2.NOOP_OBSERVABLE_COUNTER_METRIC = t2.NOOP_UP_DOWN_COUNTER_METRIC = t2.NOOP_HISTOGRAM_METRIC = t2.NOOP_COUNTER_METRIC = t2.NOOP_METER = t2.NoopObservableUpDownCounterMetric = t2.NoopObservableGaugeMetric = t2.NoopObservableCounterMetric = t2.NoopObservableMetric = t2.NoopHistogramMetric = t2.NoopUpDownCounterMetric = t2.NoopCounterMetric = t2.NoopMetric = t2.NoopMeter = void 0;
          class r3 {
            createHistogram(e3, r4) {
              return t2.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r4) {
              return t2.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r4) {
              return t2.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r4) {
              return t2.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t3) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t2.NoopMeter = r3;
          class n2 {
          }
          t2.NoopMetric = n2;
          class i2 extends n2 {
            add(e3, t3) {
            }
          }
          t2.NoopCounterMetric = i2;
          class a2 extends n2 {
            add(e3, t3) {
            }
          }
          t2.NoopUpDownCounterMetric = a2;
          class o2 extends n2 {
            record(e3, t3) {
            }
          }
          t2.NoopHistogramMetric = o2;
          class s2 {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t2.NoopObservableMetric = s2;
          class l2 extends s2 {
          }
          t2.NoopObservableCounterMetric = l2;
          class c2 extends s2 {
          }
          t2.NoopObservableGaugeMetric = c2;
          class u2 extends s2 {
          }
          t2.NoopObservableUpDownCounterMetric = u2, t2.NOOP_METER = new r3(), t2.NOOP_COUNTER_METRIC = new i2(), t2.NOOP_HISTOGRAM_METRIC = new o2(), t2.NOOP_UP_DOWN_COUNTER_METRIC = new a2(), t2.NOOP_OBSERVABLE_COUNTER_METRIC = new l2(), t2.NOOP_OBSERVABLE_GAUGE_METRIC = new c2(), t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new u2(), t2.createNoopMeter = function() {
            return t2.NOOP_METER;
          };
        }, 660: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NOOP_METER_PROVIDER = t2.NoopMeterProvider = void 0;
          let n2 = r3(102);
          class i2 {
            getMeter(e3, t3, r4) {
              return n2.NOOP_METER;
            }
          }
          t2.NoopMeterProvider = i2, t2.NOOP_METER_PROVIDER = new i2();
        }, 200: function(e2, t2, r3) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), e3[n3] = t3[r4];
          }), i2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || n2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), i2(r3(46), t2);
        }, 651: (t2, r3) => {
          Object.defineProperty(r3, "__esModule", { value: true }), r3._globalThis = void 0, r3._globalThis = "object" == typeof globalThis ? globalThis : e.g;
        }, 46: function(e2, t2, r3) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), e3[n3] = t3[r4];
          }), i2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || n2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), i2(r3(651), t2);
        }, 939: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.propagation = void 0, t2.propagation = r3(181).PropagationAPI.getInstance();
        }, 874: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTextMapPropagator = void 0, t2.NoopTextMapPropagator = class {
            inject(e3, t3) {
            }
            extract(e3, t3) {
              return e3;
            }
            fields() {
              return [];
            }
          };
        }, 194: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.defaultTextMapSetter = t2.defaultTextMapGetter = void 0, t2.defaultTextMapGetter = { get(e3, t3) {
            if (null != e3) return e3[t3];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t2.defaultTextMapSetter = { set(e3, t3, r3) {
            null != e3 && (e3[t3] = r3);
          } };
        }, 845: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.trace = void 0, t2.trace = r3(997).TraceAPI.getInstance();
        }, 403: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NonRecordingSpan = void 0;
          let n2 = r3(476);
          t2.NonRecordingSpan = class {
            constructor(e3 = n2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t3) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t3) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t3) {
            }
          };
        }, 614: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracer = void 0;
          let n2 = r3(491), i2 = r3(607), a2 = r3(403), o2 = r3(139), s2 = n2.ContextAPI.getInstance();
          t2.NoopTracer = class {
            startSpan(e3, t3, r4 = s2.active()) {
              var n3;
              if (null == t3 ? void 0 : t3.root) return new a2.NonRecordingSpan();
              let l2 = r4 && (0, i2.getSpanContext)(r4);
              return "object" == typeof (n3 = l2) && "string" == typeof n3.spanId && "string" == typeof n3.traceId && "number" == typeof n3.traceFlags && (0, o2.isSpanContextValid)(l2) ? new a2.NonRecordingSpan(l2) : new a2.NonRecordingSpan();
            }
            startActiveSpan(e3, t3, r4, n3) {
              let a3, o3, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t3 : 3 == arguments.length ? (a3 = t3, l2 = r4) : (a3 = t3, o3 = r4, l2 = n3);
              let c2 = null != o3 ? o3 : s2.active(), u2 = this.startSpan(e3, a3, c2), d2 = (0, i2.setSpan)(c2, u2);
              return s2.with(d2, l2, void 0, u2);
            }
          };
        }, 124: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracerProvider = void 0;
          let n2 = r3(614);
          t2.NoopTracerProvider = class {
            getTracer(e3, t3, r4) {
              return new n2.NoopTracer();
            }
          };
        }, 125: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracer = void 0;
          let n2 = new (r3(614)).NoopTracer();
          t2.ProxyTracer = class {
            constructor(e3, t3, r4, n3) {
              this._provider = e3, this.name = t3, this.version = r4, this.options = n3;
            }
            startSpan(e3, t3, r4) {
              return this._getTracer().startSpan(e3, t3, r4);
            }
            startActiveSpan(e3, t3, r4, n3) {
              let i2 = this._getTracer();
              return Reflect.apply(i2.startActiveSpan, i2, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : n2;
            }
          };
        }, 846: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracerProvider = void 0;
          let n2 = r3(125), i2 = new (r3(124)).NoopTracerProvider();
          t2.ProxyTracerProvider = class {
            getTracer(e3, t3, r4) {
              var i3;
              return null != (i3 = this.getDelegateTracer(e3, t3, r4)) ? i3 : new n2.ProxyTracer(this, e3, t3, r4);
            }
            getDelegate() {
              var e3;
              return null != (e3 = this._delegate) ? e3 : i2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t3, r4) {
              var n3;
              return null == (n3 = this._delegate) ? void 0 : n3.getTracer(e3, t3, r4);
            }
          };
        }, 996: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SamplingDecision = void 0, (r3 = t2.SamplingDecision || (t2.SamplingDecision = {}))[r3.NOT_RECORD = 0] = "NOT_RECORD", r3[r3.RECORD = 1] = "RECORD", r3[r3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
        }, 607: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.getSpanContext = t2.setSpanContext = t2.deleteSpan = t2.setSpan = t2.getActiveSpan = t2.getSpan = void 0;
          let n2 = r3(780), i2 = r3(403), a2 = r3(491), o2 = (0, n2.createContextKey)("OpenTelemetry Context Key SPAN");
          function s2(e3) {
            return e3.getValue(o2) || void 0;
          }
          function l2(e3, t3) {
            return e3.setValue(o2, t3);
          }
          t2.getSpan = s2, t2.getActiveSpan = function() {
            return s2(a2.ContextAPI.getInstance().active());
          }, t2.setSpan = l2, t2.deleteSpan = function(e3) {
            return e3.deleteValue(o2);
          }, t2.setSpanContext = function(e3, t3) {
            return l2(e3, new i2.NonRecordingSpan(t3));
          }, t2.getSpanContext = function(e3) {
            var t3;
            return null == (t3 = s2(e3)) ? void 0 : t3.spanContext();
          };
        }, 325: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceStateImpl = void 0;
          let n2 = r3(564);
          class i2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t3) {
              let r4 = this._clone();
              return r4._internalState.has(e3) && r4._internalState.delete(e3), r4._internalState.set(e3, t3), r4;
            }
            unset(e3) {
              let t3 = this._clone();
              return t3._internalState.delete(e3), t3;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t3) => (e3.push(t3 + "=" + this.get(t3)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t3) => {
                let r4 = t3.trim(), i3 = r4.indexOf("=");
                if (-1 !== i3) {
                  let a2 = r4.slice(0, i3), o2 = r4.slice(i3 + 1, t3.length);
                  (0, n2.validateKey)(a2) && (0, n2.validateValue)(o2) && e4.set(a2, o2);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new i2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t2.TraceStateImpl = i2;
        }, 564: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.validateValue = t2.validateKey = void 0;
          let r3 = "[_0-9a-z-*/]", n2 = `[a-z]${r3}{0,255}`, i2 = `[a-z0-9]${r3}{0,240}@[a-z]${r3}{0,13}`, a2 = RegExp(`^(?:${n2}|${i2})$`), o2 = /^[ -~]{0,255}[!-~]$/, s2 = /,|=/;
          t2.validateKey = function(e3) {
            return a2.test(e3);
          }, t2.validateValue = function(e3) {
            return o2.test(e3) && !s2.test(e3);
          };
        }, 98: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createTraceState = void 0;
          let n2 = r3(325);
          t2.createTraceState = function(e3) {
            return new n2.TraceStateImpl(e3);
          };
        }, 476: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.INVALID_SPAN_CONTEXT = t2.INVALID_TRACEID = t2.INVALID_SPANID = void 0;
          let n2 = r3(475);
          t2.INVALID_SPANID = "0000000000000000", t2.INVALID_TRACEID = "00000000000000000000000000000000", t2.INVALID_SPAN_CONTEXT = { traceId: t2.INVALID_TRACEID, spanId: t2.INVALID_SPANID, traceFlags: n2.TraceFlags.NONE };
        }, 357: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanKind = void 0, (r3 = t2.SpanKind || (t2.SpanKind = {}))[r3.INTERNAL = 0] = "INTERNAL", r3[r3.SERVER = 1] = "SERVER", r3[r3.CLIENT = 2] = "CLIENT", r3[r3.PRODUCER = 3] = "PRODUCER", r3[r3.CONSUMER = 4] = "CONSUMER";
        }, 139: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.wrapSpanContext = t2.isSpanContextValid = t2.isValidSpanId = t2.isValidTraceId = void 0;
          let n2 = r3(476), i2 = r3(403), a2 = /^([0-9a-f]{32})$/i, o2 = /^[0-9a-f]{16}$/i;
          function s2(e3) {
            return a2.test(e3) && e3 !== n2.INVALID_TRACEID;
          }
          function l2(e3) {
            return o2.test(e3) && e3 !== n2.INVALID_SPANID;
          }
          t2.isValidTraceId = s2, t2.isValidSpanId = l2, t2.isSpanContextValid = function(e3) {
            return s2(e3.traceId) && l2(e3.spanId);
          }, t2.wrapSpanContext = function(e3) {
            return new i2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanStatusCode = void 0, (r3 = t2.SpanStatusCode || (t2.SpanStatusCode = {}))[r3.UNSET = 0] = "UNSET", r3[r3.OK = 1] = "OK", r3[r3.ERROR = 2] = "ERROR";
        }, 475: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceFlags = void 0, (r3 = t2.TraceFlags || (t2.TraceFlags = {}))[r3.NONE = 0] = "NONE", r3[r3.SAMPLED = 1] = "SAMPLED";
        }, 521: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.VERSION = void 0, t2.VERSION = "1.6.0";
        } }, x = {};
        function k(e2) {
          var t2 = x[e2];
          if (void 0 !== t2) return t2.exports;
          var r3 = x[e2] = { exports: {} }, n2 = true;
          try {
            S[e2].call(r3.exports, r3, r3.exports, k), n2 = false;
          } finally {
            n2 && delete x[e2];
          }
          return r3.exports;
        }
        k.ab = "/ROOT/node_modules/next/dist/compiled/@opentelemetry/api/";
        var T = {};
        Object.defineProperty(T, "__esModule", { value: true }), T.trace = T.propagation = T.metrics = T.diag = T.context = T.INVALID_SPAN_CONTEXT = T.INVALID_TRACEID = T.INVALID_SPANID = T.isValidSpanId = T.isValidTraceId = T.isSpanContextValid = T.createTraceState = T.TraceFlags = T.SpanStatusCode = T.SpanKind = T.SamplingDecision = T.ProxyTracerProvider = T.ProxyTracer = T.defaultTextMapSetter = T.defaultTextMapGetter = T.ValueType = T.createNoopMeter = T.DiagLogLevel = T.DiagConsoleLogger = T.ROOT_CONTEXT = T.createContextKey = T.baggageEntryMetadataFromString = void 0, s = k(369), Object.defineProperty(T, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
          return s.baggageEntryMetadataFromString;
        } }), l = k(780), Object.defineProperty(T, "createContextKey", { enumerable: true, get: function() {
          return l.createContextKey;
        } }), Object.defineProperty(T, "ROOT_CONTEXT", { enumerable: true, get: function() {
          return l.ROOT_CONTEXT;
        } }), c = k(972), Object.defineProperty(T, "DiagConsoleLogger", { enumerable: true, get: function() {
          return c.DiagConsoleLogger;
        } }), u = k(957), Object.defineProperty(T, "DiagLogLevel", { enumerable: true, get: function() {
          return u.DiagLogLevel;
        } }), d = k(102), Object.defineProperty(T, "createNoopMeter", { enumerable: true, get: function() {
          return d.createNoopMeter;
        } }), p = k(901), Object.defineProperty(T, "ValueType", { enumerable: true, get: function() {
          return p.ValueType;
        } }), h = k(194), Object.defineProperty(T, "defaultTextMapGetter", { enumerable: true, get: function() {
          return h.defaultTextMapGetter;
        } }), Object.defineProperty(T, "defaultTextMapSetter", { enumerable: true, get: function() {
          return h.defaultTextMapSetter;
        } }), f = k(125), Object.defineProperty(T, "ProxyTracer", { enumerable: true, get: function() {
          return f.ProxyTracer;
        } }), g = k(846), Object.defineProperty(T, "ProxyTracerProvider", { enumerable: true, get: function() {
          return g.ProxyTracerProvider;
        } }), m = k(996), Object.defineProperty(T, "SamplingDecision", { enumerable: true, get: function() {
          return m.SamplingDecision;
        } }), y = k(357), Object.defineProperty(T, "SpanKind", { enumerable: true, get: function() {
          return y.SpanKind;
        } }), b = k(847), Object.defineProperty(T, "SpanStatusCode", { enumerable: true, get: function() {
          return b.SpanStatusCode;
        } }), w = k(475), Object.defineProperty(T, "TraceFlags", { enumerable: true, get: function() {
          return w.TraceFlags;
        } }), v = k(98), Object.defineProperty(T, "createTraceState", { enumerable: true, get: function() {
          return v.createTraceState;
        } }), _ = k(139), Object.defineProperty(T, "isSpanContextValid", { enumerable: true, get: function() {
          return _.isSpanContextValid;
        } }), Object.defineProperty(T, "isValidTraceId", { enumerable: true, get: function() {
          return _.isValidTraceId;
        } }), Object.defineProperty(T, "isValidSpanId", { enumerable: true, get: function() {
          return _.isValidSpanId;
        } }), E = k(476), Object.defineProperty(T, "INVALID_SPANID", { enumerable: true, get: function() {
          return E.INVALID_SPANID;
        } }), Object.defineProperty(T, "INVALID_TRACEID", { enumerable: true, get: function() {
          return E.INVALID_TRACEID;
        } }), Object.defineProperty(T, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
          return E.INVALID_SPAN_CONTEXT;
        } }), r2 = k(67), Object.defineProperty(T, "context", { enumerable: true, get: function() {
          return r2.context;
        } }), n = k(506), Object.defineProperty(T, "diag", { enumerable: true, get: function() {
          return n.diag;
        } }), i = k(886), Object.defineProperty(T, "metrics", { enumerable: true, get: function() {
          return i.metrics;
        } }), a = k(939), Object.defineProperty(T, "propagation", { enumerable: true, get: function() {
          return a.propagation;
        } }), o = k(845), Object.defineProperty(T, "trace", { enumerable: true, get: function() {
          return o.trace;
        } }), T.default = { context: r2.context, diag: n.diag, metrics: i.metrics, propagation: a.propagation, trace: o.trace }, t.exports = T;
      })();
    }, 71498, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/cookie/");
        var e2, r2, n, i, a = {};
        a.parse = function(t2, r3) {
          if ("string" != typeof t2) throw TypeError("argument str must be a string");
          for (var i2 = {}, a2 = t2.split(n), o = (r3 || {}).decode || e2, s = 0; s < a2.length; s++) {
            var l = a2[s], c = l.indexOf("=");
            if (!(c < 0)) {
              var u = l.substr(0, c).trim(), d = l.substr(++c, l.length).trim();
              '"' == d[0] && (d = d.slice(1, -1)), void 0 == i2[u] && (i2[u] = function(e3, t3) {
                try {
                  return t3(e3);
                } catch (t4) {
                  return e3;
                }
              }(d, o));
            }
          }
          return i2;
        }, a.serialize = function(e3, t2, n2) {
          var a2 = n2 || {}, o = a2.encode || r2;
          if ("function" != typeof o) throw TypeError("option encode is invalid");
          if (!i.test(e3)) throw TypeError("argument name is invalid");
          var s = o(t2);
          if (s && !i.test(s)) throw TypeError("argument val is invalid");
          var l = e3 + "=" + s;
          if (null != a2.maxAge) {
            var c = a2.maxAge - 0;
            if (isNaN(c) || !isFinite(c)) throw TypeError("option maxAge is invalid");
            l += "; Max-Age=" + Math.floor(c);
          }
          if (a2.domain) {
            if (!i.test(a2.domain)) throw TypeError("option domain is invalid");
            l += "; Domain=" + a2.domain;
          }
          if (a2.path) {
            if (!i.test(a2.path)) throw TypeError("option path is invalid");
            l += "; Path=" + a2.path;
          }
          if (a2.expires) {
            if ("function" != typeof a2.expires.toUTCString) throw TypeError("option expires is invalid");
            l += "; Expires=" + a2.expires.toUTCString();
          }
          if (a2.httpOnly && (l += "; HttpOnly"), a2.secure && (l += "; Secure"), a2.sameSite) switch ("string" == typeof a2.sameSite ? a2.sameSite.toLowerCase() : a2.sameSite) {
            case true:
            case "strict":
              l += "; SameSite=Strict";
              break;
            case "lax":
              l += "; SameSite=Lax";
              break;
            case "none":
              l += "; SameSite=None";
              break;
            default:
              throw TypeError("option sameSite is invalid");
          }
          return l;
        }, e2 = decodeURIComponent, r2 = encodeURIComponent, n = /; */, i = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, t.exports = a;
      })();
    }, 99734, (e, t, r) => {
      (() => {
        "use strict";
        let e2, r2, n, i, a;
        var o = { 993: (e3) => {
          var t2 = Object.prototype.hasOwnProperty, r3 = "~";
          function n2() {
          }
          function i2(e4, t3, r4) {
            this.fn = e4, this.context = t3, this.once = r4 || false;
          }
          function a2(e4, t3, n3, a3, o3) {
            if ("function" != typeof n3) throw TypeError("The listener must be a function");
            var s3 = new i2(n3, a3 || e4, o3), l2 = r3 ? r3 + t3 : t3;
            return e4._events[l2] ? e4._events[l2].fn ? e4._events[l2] = [e4._events[l2], s3] : e4._events[l2].push(s3) : (e4._events[l2] = s3, e4._eventsCount++), e4;
          }
          function o2(e4, t3) {
            0 == --e4._eventsCount ? e4._events = new n2() : delete e4._events[t3];
          }
          function s2() {
            this._events = new n2(), this._eventsCount = 0;
          }
          Object.create && (n2.prototype = /* @__PURE__ */ Object.create(null), new n2().__proto__ || (r3 = false)), s2.prototype.eventNames = function() {
            var e4, n3, i3 = [];
            if (0 === this._eventsCount) return i3;
            for (n3 in e4 = this._events) t2.call(e4, n3) && i3.push(r3 ? n3.slice(1) : n3);
            return Object.getOwnPropertySymbols ? i3.concat(Object.getOwnPropertySymbols(e4)) : i3;
          }, s2.prototype.listeners = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, n3 = this._events[t3];
            if (!n3) return [];
            if (n3.fn) return [n3.fn];
            for (var i3 = 0, a3 = n3.length, o3 = Array(a3); i3 < a3; i3++) o3[i3] = n3[i3].fn;
            return o3;
          }, s2.prototype.listenerCount = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, n3 = this._events[t3];
            return n3 ? n3.fn ? 1 : n3.length : 0;
          }, s2.prototype.emit = function(e4, t3, n3, i3, a3, o3) {
            var s3 = r3 ? r3 + e4 : e4;
            if (!this._events[s3]) return false;
            var l2, c2, u = this._events[s3], d = arguments.length;
            if (u.fn) {
              switch (u.once && this.removeListener(e4, u.fn, void 0, true), d) {
                case 1:
                  return u.fn.call(u.context), true;
                case 2:
                  return u.fn.call(u.context, t3), true;
                case 3:
                  return u.fn.call(u.context, t3, n3), true;
                case 4:
                  return u.fn.call(u.context, t3, n3, i3), true;
                case 5:
                  return u.fn.call(u.context, t3, n3, i3, a3), true;
                case 6:
                  return u.fn.call(u.context, t3, n3, i3, a3, o3), true;
              }
              for (c2 = 1, l2 = Array(d - 1); c2 < d; c2++) l2[c2 - 1] = arguments[c2];
              u.fn.apply(u.context, l2);
            } else {
              var p, h = u.length;
              for (c2 = 0; c2 < h; c2++) switch (u[c2].once && this.removeListener(e4, u[c2].fn, void 0, true), d) {
                case 1:
                  u[c2].fn.call(u[c2].context);
                  break;
                case 2:
                  u[c2].fn.call(u[c2].context, t3);
                  break;
                case 3:
                  u[c2].fn.call(u[c2].context, t3, n3);
                  break;
                case 4:
                  u[c2].fn.call(u[c2].context, t3, n3, i3);
                  break;
                default:
                  if (!l2) for (p = 1, l2 = Array(d - 1); p < d; p++) l2[p - 1] = arguments[p];
                  u[c2].fn.apply(u[c2].context, l2);
              }
            }
            return true;
          }, s2.prototype.on = function(e4, t3, r4) {
            return a2(this, e4, t3, r4, false);
          }, s2.prototype.once = function(e4, t3, r4) {
            return a2(this, e4, t3, r4, true);
          }, s2.prototype.removeListener = function(e4, t3, n3, i3) {
            var a3 = r3 ? r3 + e4 : e4;
            if (!this._events[a3]) return this;
            if (!t3) return o2(this, a3), this;
            var s3 = this._events[a3];
            if (s3.fn) s3.fn !== t3 || i3 && !s3.once || n3 && s3.context !== n3 || o2(this, a3);
            else {
              for (var l2 = 0, c2 = [], u = s3.length; l2 < u; l2++) (s3[l2].fn !== t3 || i3 && !s3[l2].once || n3 && s3[l2].context !== n3) && c2.push(s3[l2]);
              c2.length ? this._events[a3] = 1 === c2.length ? c2[0] : c2 : o2(this, a3);
            }
            return this;
          }, s2.prototype.removeAllListeners = function(e4) {
            var t3;
            return e4 ? (t3 = r3 ? r3 + e4 : e4, this._events[t3] && o2(this, t3)) : (this._events = new n2(), this._eventsCount = 0), this;
          }, s2.prototype.off = s2.prototype.removeListener, s2.prototype.addListener = s2.prototype.on, s2.prefixed = r3, s2.EventEmitter = s2, e3.exports = s2;
        }, 213: (e3) => {
          e3.exports = (e4, t2) => (t2 = t2 || (() => {
          }), e4.then((e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => e5), (e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => {
            throw e5;
          })));
        }, 574: (e3, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e4, t3, r3) {
            let n2 = 0, i2 = e4.length;
            for (; i2 > 0; ) {
              let a2 = i2 / 2 | 0, o2 = n2 + a2;
              0 >= r3(e4[o2], t3) ? (n2 = ++o2, i2 -= a2 + 1) : i2 = a2;
            }
            return n2;
          };
        }, 821: (e3, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let n2 = r3(574);
          t2.default = class {
            constructor() {
              this._queue = [];
            }
            enqueue(e4, t3) {
              let r4 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e4 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) return void this._queue.push(r4);
              let i2 = n2.default(this._queue, r4, (e5, t4) => t4.priority - e5.priority);
              this._queue.splice(i2, 0, r4);
            }
            dequeue() {
              let e4 = this._queue.shift();
              return null == e4 ? void 0 : e4.run;
            }
            filter(e4) {
              return this._queue.filter((t3) => t3.priority === e4.priority).map((e5) => e5.run);
            }
            get size() {
              return this._queue.length;
            }
          };
        }, 816: (e3, t2, r3) => {
          let n2 = r3(213);
          class i2 extends Error {
            constructor(e4) {
              super(e4), this.name = "TimeoutError";
            }
          }
          let a2 = (e4, t3, r4) => new Promise((a3, o2) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) return void a3(e4);
            let s2 = setTimeout(() => {
              if ("function" == typeof r4) {
                try {
                  a3(r4());
                } catch (e5) {
                  o2(e5);
                }
                return;
              }
              let n3 = "string" == typeof r4 ? r4 : `Promise timed out after ${t3} milliseconds`, s3 = r4 instanceof Error ? r4 : new i2(n3);
              "function" == typeof e4.cancel && e4.cancel(), o2(s3);
            }, t3);
            n2(e4.then(a3, o2), () => {
              clearTimeout(s2);
            });
          });
          e3.exports = a2, e3.exports.default = a2, e3.exports.TimeoutError = i2;
        } }, s = {};
        function l(e3) {
          var t2 = s[e3];
          if (void 0 !== t2) return t2.exports;
          var r3 = s[e3] = { exports: {} }, n2 = true;
          try {
            o[e3](r3, r3.exports, l), n2 = false;
          } finally {
            n2 && delete s[e3];
          }
          return r3.exports;
        }
        l.ab = "/ROOT/node_modules/next/dist/compiled/p-queue/";
        var c = {};
        Object.defineProperty(c, "__esModule", { value: true }), e2 = l(993), r2 = l(816), n = l(821), i = () => {
        }, a = new r2.TimeoutError(), c.default = class extends e2 {
          constructor(e3) {
            var t2, r3, a2, o2;
            if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = i, this._resolveIdle = i, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: n.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (r3 = null == (t2 = e3.intervalCap) ? void 0 : t2.toString()) ? r3 : ""}\` (${typeof e3.intervalCap})`);
            if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (o2 = null == (a2 = e3.interval) ? void 0 : a2.toString()) ? o2 : ""}\` (${typeof e3.interval})`);
            this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = e3.intervalCap === 1 / 0 || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
          }
          get _doesIntervalAllowAnother() {
            return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
          }
          get _doesConcurrentAllowAnother() {
            return this._pendingCount < this._concurrency;
          }
          _next() {
            this._pendingCount--, this._tryToStartAnother(), this.emit("next");
          }
          _resolvePromises() {
            this._resolveEmpty(), this._resolveEmpty = i, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = i, this.emit("idle"));
          }
          _onResumeInterval() {
            this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
          }
          _isIntervalPaused() {
            let e3 = Date.now();
            if (void 0 === this._intervalId) {
              let t2 = this._intervalEnd - e3;
              if (!(t2 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                this._onResumeInterval();
              }, t2)), true;
              this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
            }
            return false;
          }
          _tryToStartAnother() {
            if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
            if (!this._isPaused) {
              let e3 = !this._isIntervalPaused();
              if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                let t2 = this._queue.dequeue();
                return !!t2 && (this.emit("active"), t2(), e3 && this._initializeIntervalIfNeeded(), true);
              }
            }
            return false;
          }
          _initializeIntervalIfNeeded() {
            this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
              this._onInterval();
            }, this._interval), this._intervalEnd = Date.now() + this._interval);
          }
          _onInterval() {
            0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
          }
          _processQueue() {
            for (; this._tryToStartAnother(); ) ;
          }
          get concurrency() {
            return this._concurrency;
          }
          set concurrency(e3) {
            if (!("number" == typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
            this._concurrency = e3, this._processQueue();
          }
          async add(e3, t2 = {}) {
            return new Promise((n2, i2) => {
              let o2 = async () => {
                this._pendingCount++, this._intervalCount++;
                try {
                  let o3 = void 0 === this._timeout && void 0 === t2.timeout ? e3() : r2.default(Promise.resolve(e3()), void 0 === t2.timeout ? this._timeout : t2.timeout, () => {
                    (void 0 === t2.throwOnTimeout ? this._throwOnTimeout : t2.throwOnTimeout) && i2(a);
                  });
                  n2(await o3);
                } catch (e4) {
                  i2(e4);
                }
                this._next();
              };
              this._queue.enqueue(o2, t2), this._tryToStartAnother(), this.emit("add");
            });
          }
          async addAll(e3, t2) {
            return Promise.all(e3.map(async (e4) => this.add(e4, t2)));
          }
          start() {
            return this._isPaused && (this._isPaused = false, this._processQueue()), this;
          }
          pause() {
            this._isPaused = true;
          }
          clear() {
            this._queue = new this._queueClass();
          }
          async onEmpty() {
            if (0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveEmpty;
              this._resolveEmpty = () => {
                t2(), e3();
              };
            });
          }
          async onIdle() {
            if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveIdle;
              this._resolveIdle = () => {
                t2(), e3();
              };
            });
          }
          get size() {
            return this._queue.size;
          }
          sizeBy(e3) {
            return this._queue.filter(e3).length;
          }
          get pending() {
            return this._pendingCount;
          }
          get isPaused() {
            return this._isPaused;
          }
          get timeout() {
            return this._timeout;
          }
          set timeout(e3) {
            this._timeout = e3;
          }
        }, t.exports = c;
      })();
    }, 25085, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { getTestReqInfo: function() {
        return l;
      }, withRequest: function() {
        return s;
      } };
      for (var i in n) Object.defineProperty(r, i, { enumerable: true, get: n[i] });
      let a = new (e.r(78500)).AsyncLocalStorage();
      function o(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        let n2 = t2.url(e2);
        return { url: n2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function s(e2, t2, r2) {
        let n2 = o(e2, t2);
        return n2 ? a.run(n2, r2) : r2();
      }
      function l(e2, t2) {
        let r2 = a.getStore();
        return r2 || (e2 && t2 ? o(e2, t2) : void 0);
      }
    }, 28325, (e, t, r) => {
      "use strict";
      var n = e.i(51615);
      Object.defineProperty(r, "__esModule", { value: true });
      var i = { handleFetch: function() {
        return c;
      }, interceptFetch: function() {
        return u;
      }, reader: function() {
        return s;
      } };
      for (var a in i) Object.defineProperty(r, a, { enumerable: true, get: i[a] });
      let o = e.r(25085), s = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function l(e2, t2) {
        let { url: r2, method: i2, headers: a2, body: o2, cache: s2, credentials: l2, integrity: c2, mode: u2, redirect: d, referrer: p, referrerPolicy: h } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: i2, headers: [...Array.from(a2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: o2 ? n.Buffer.from(await t2.arrayBuffer()).toString("base64") : null, cache: s2, credentials: l2, integrity: c2, mode: u2, redirect: d, referrer: p, referrerPolicy: h } };
      }
      async function c(e2, t2) {
        let r2 = (0, o.getTestReqInfo)(t2, s);
        if (!r2) return e2(t2);
        let { testData: i2, proxyPort: a2 } = r2, c2 = await l(i2, t2), u2 = await e2(`http://localhost:${a2}`, { method: "POST", body: JSON.stringify(c2), next: { internal: true } });
        if (!u2.ok) throw Object.defineProperty(Error(`Proxy request failed: ${u2.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        let d = await u2.json(), { api: p } = d;
        switch (p) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(Error(`Proxy request aborted [${t2.method} ${t2.url}]`), "__NEXT_ERROR_CODE", { value: "E145", enumerable: false, configurable: true });
          case "fetch":
            return function(e3) {
              let { status: t3, headers: r3, body: i3 } = e3.response;
              return new Response(i3 ? n.Buffer.from(i3, "base64") : null, { status: t3, headers: new Headers(r3) });
            }(d);
          default:
            return p;
        }
      }
      function u(t2) {
        return e.g.fetch = function(e2, r2) {
          var n2;
          return (null == r2 || null == (n2 = r2.next) ? void 0 : n2.internal) ? t2(e2, r2) : c(t2, new Request(e2, r2));
        }, () => {
          e.g.fetch = t2;
        };
      }
    }, 94165, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { interceptTestApis: function() {
        return s;
      }, wrapRequestHandler: function() {
        return l;
      } };
      for (var i in n) Object.defineProperty(r, i, { enumerable: true, get: n[i] });
      let a = e.r(25085), o = e.r(28325);
      function s() {
        return (0, o.interceptFetch)(e.g.fetch);
      }
      function l(e2) {
        return (t2, r2) => (0, a.withRequest)(t2, o.reader, () => e2(t2, r2));
      }
    }, 54846, (e, t, r) => {
      !function() {
        "use strict";
        var e2 = { 114: function(e3) {
          function t2(e4) {
            if ("string" != typeof e4) throw TypeError("Path must be a string. Received " + JSON.stringify(e4));
          }
          function r3(e4, t3) {
            for (var r4, n3 = "", i = 0, a = -1, o = 0, s = 0; s <= e4.length; ++s) {
              if (s < e4.length) r4 = e4.charCodeAt(s);
              else if (47 === r4) break;
              else r4 = 47;
              if (47 === r4) {
                if (a === s - 1 || 1 === o) ;
                else if (a !== s - 1 && 2 === o) {
                  if (n3.length < 2 || 2 !== i || 46 !== n3.charCodeAt(n3.length - 1) || 46 !== n3.charCodeAt(n3.length - 2)) {
                    if (n3.length > 2) {
                      var l = n3.lastIndexOf("/");
                      if (l !== n3.length - 1) {
                        -1 === l ? (n3 = "", i = 0) : i = (n3 = n3.slice(0, l)).length - 1 - n3.lastIndexOf("/"), a = s, o = 0;
                        continue;
                      }
                    } else if (2 === n3.length || 1 === n3.length) {
                      n3 = "", i = 0, a = s, o = 0;
                      continue;
                    }
                  }
                  t3 && (n3.length > 0 ? n3 += "/.." : n3 = "..", i = 2);
                } else n3.length > 0 ? n3 += "/" + e4.slice(a + 1, s) : n3 = e4.slice(a + 1, s), i = s - a - 1;
                a = s, o = 0;
              } else 46 === r4 && -1 !== o ? ++o : o = -1;
            }
            return n3;
          }
          var n2 = { resolve: function() {
            for (var e4, n3, i = "", a = false, o = arguments.length - 1; o >= -1 && !a; o--) o >= 0 ? n3 = arguments[o] : (void 0 === e4 && (e4 = ""), n3 = e4), t2(n3), 0 !== n3.length && (i = n3 + "/" + i, a = 47 === n3.charCodeAt(0));
            if (i = r3(i, !a), a) if (i.length > 0) return "/" + i;
            else return "/";
            return i.length > 0 ? i : ".";
          }, normalize: function(e4) {
            if (t2(e4), 0 === e4.length) return ".";
            var n3 = 47 === e4.charCodeAt(0), i = 47 === e4.charCodeAt(e4.length - 1);
            return (0 !== (e4 = r3(e4, !n3)).length || n3 || (e4 = "."), e4.length > 0 && i && (e4 += "/"), n3) ? "/" + e4 : e4;
          }, isAbsolute: function(e4) {
            return t2(e4), e4.length > 0 && 47 === e4.charCodeAt(0);
          }, join: function() {
            if (0 == arguments.length) return ".";
            for (var e4, r4 = 0; r4 < arguments.length; ++r4) {
              var i = arguments[r4];
              t2(i), i.length > 0 && (void 0 === e4 ? e4 = i : e4 += "/" + i);
            }
            return void 0 === e4 ? "." : n2.normalize(e4);
          }, relative: function(e4, r4) {
            if (t2(e4), t2(r4), e4 === r4 || (e4 = n2.resolve(e4)) === (r4 = n2.resolve(r4))) return "";
            for (var i = 1; i < e4.length && 47 === e4.charCodeAt(i); ++i) ;
            for (var a = e4.length, o = a - i, s = 1; s < r4.length && 47 === r4.charCodeAt(s); ++s) ;
            for (var l = r4.length - s, c = o < l ? o : l, u = -1, d = 0; d <= c; ++d) {
              if (d === c) {
                if (l > c) {
                  if (47 === r4.charCodeAt(s + d)) return r4.slice(s + d + 1);
                  else if (0 === d) return r4.slice(s + d);
                } else o > c && (47 === e4.charCodeAt(i + d) ? u = d : 0 === d && (u = 0));
                break;
              }
              var p = e4.charCodeAt(i + d);
              if (p !== r4.charCodeAt(s + d)) break;
              47 === p && (u = d);
            }
            var h = "";
            for (d = i + u + 1; d <= a; ++d) (d === a || 47 === e4.charCodeAt(d)) && (0 === h.length ? h += ".." : h += "/..");
            return h.length > 0 ? h + r4.slice(s + u) : (s += u, 47 === r4.charCodeAt(s) && ++s, r4.slice(s));
          }, _makeLong: function(e4) {
            return e4;
          }, dirname: function(e4) {
            if (t2(e4), 0 === e4.length) return ".";
            for (var r4 = e4.charCodeAt(0), n3 = 47 === r4, i = -1, a = true, o = e4.length - 1; o >= 1; --o) if (47 === (r4 = e4.charCodeAt(o))) {
              if (!a) {
                i = o;
                break;
              }
            } else a = false;
            return -1 === i ? n3 ? "/" : "." : n3 && 1 === i ? "//" : e4.slice(0, i);
          }, basename: function(e4, r4) {
            if (void 0 !== r4 && "string" != typeof r4) throw TypeError('"ext" argument must be a string');
            t2(e4);
            var n3, i = 0, a = -1, o = true;
            if (void 0 !== r4 && r4.length > 0 && r4.length <= e4.length) {
              if (r4.length === e4.length && r4 === e4) return "";
              var s = r4.length - 1, l = -1;
              for (n3 = e4.length - 1; n3 >= 0; --n3) {
                var c = e4.charCodeAt(n3);
                if (47 === c) {
                  if (!o) {
                    i = n3 + 1;
                    break;
                  }
                } else -1 === l && (o = false, l = n3 + 1), s >= 0 && (c === r4.charCodeAt(s) ? -1 == --s && (a = n3) : (s = -1, a = l));
              }
              return i === a ? a = l : -1 === a && (a = e4.length), e4.slice(i, a);
            }
            for (n3 = e4.length - 1; n3 >= 0; --n3) if (47 === e4.charCodeAt(n3)) {
              if (!o) {
                i = n3 + 1;
                break;
              }
            } else -1 === a && (o = false, a = n3 + 1);
            return -1 === a ? "" : e4.slice(i, a);
          }, extname: function(e4) {
            t2(e4);
            for (var r4 = -1, n3 = 0, i = -1, a = true, o = 0, s = e4.length - 1; s >= 0; --s) {
              var l = e4.charCodeAt(s);
              if (47 === l) {
                if (!a) {
                  n3 = s + 1;
                  break;
                }
                continue;
              }
              -1 === i && (a = false, i = s + 1), 46 === l ? -1 === r4 ? r4 = s : 1 !== o && (o = 1) : -1 !== r4 && (o = -1);
            }
            return -1 === r4 || -1 === i || 0 === o || 1 === o && r4 === i - 1 && r4 === n3 + 1 ? "" : e4.slice(r4, i);
          }, format: function(e4) {
            var t3, r4;
            if (null === e4 || "object" != typeof e4) throw TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e4);
            return t3 = e4.dir || e4.root, r4 = e4.base || (e4.name || "") + (e4.ext || ""), t3 ? t3 === e4.root ? t3 + r4 : t3 + "/" + r4 : r4;
          }, parse: function(e4) {
            t2(e4);
            var r4, n3 = { root: "", dir: "", base: "", ext: "", name: "" };
            if (0 === e4.length) return n3;
            var i = e4.charCodeAt(0), a = 47 === i;
            a ? (n3.root = "/", r4 = 1) : r4 = 0;
            for (var o = -1, s = 0, l = -1, c = true, u = e4.length - 1, d = 0; u >= r4; --u) {
              if (47 === (i = e4.charCodeAt(u))) {
                if (!c) {
                  s = u + 1;
                  break;
                }
                continue;
              }
              -1 === l && (c = false, l = u + 1), 46 === i ? -1 === o ? o = u : 1 !== d && (d = 1) : -1 !== o && (d = -1);
            }
            return -1 === o || -1 === l || 0 === d || 1 === d && o === l - 1 && o === s + 1 ? -1 !== l && (0 === s && a ? n3.base = n3.name = e4.slice(1, l) : n3.base = n3.name = e4.slice(s, l)) : (0 === s && a ? (n3.name = e4.slice(1, o), n3.base = e4.slice(1, l)) : (n3.name = e4.slice(s, o), n3.base = e4.slice(s, l)), n3.ext = e4.slice(o, l)), s > 0 ? n3.dir = e4.slice(0, s - 1) : a && (n3.dir = "/"), n3;
          }, sep: "/", delimiter: ":", win32: null, posix: null };
          n2.posix = n2, e3.exports = n2;
        } }, r2 = {};
        function n(t2) {
          var i = r2[t2];
          if (void 0 !== i) return i.exports;
          var a = r2[t2] = { exports: {} }, o = true;
          try {
            e2[t2](a, a.exports, n), o = false;
          } finally {
            o && delete r2[t2];
          }
          return a.exports;
        }
        n.ab = "/ROOT/node_modules/next/dist/compiled/path-browserify/", t.exports = n(114);
      }();
    }, 68886, (e, t, r) => {
      t.exports = e.r(54846);
    }, 67914, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/path-to-regexp/");
        var e2 = {};
        (() => {
          function t2(e3, t3) {
            void 0 === t3 && (t3 = {});
            for (var r3 = function(e4) {
              for (var t4 = [], r4 = 0; r4 < e4.length; ) {
                var n3 = e4[r4];
                if ("*" === n3 || "+" === n3 || "?" === n3) {
                  t4.push({ type: "MODIFIER", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("\\" === n3) {
                  t4.push({ type: "ESCAPED_CHAR", index: r4++, value: e4[r4++] });
                  continue;
                }
                if ("{" === n3) {
                  t4.push({ type: "OPEN", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("}" === n3) {
                  t4.push({ type: "CLOSE", index: r4, value: e4[r4++] });
                  continue;
                }
                if (":" === n3) {
                  for (var i2 = "", a3 = r4 + 1; a3 < e4.length; ) {
                    var o3 = e4.charCodeAt(a3);
                    if (o3 >= 48 && o3 <= 57 || o3 >= 65 && o3 <= 90 || o3 >= 97 && o3 <= 122 || 95 === o3) {
                      i2 += e4[a3++];
                      continue;
                    }
                    break;
                  }
                  if (!i2) throw TypeError("Missing parameter name at ".concat(r4));
                  t4.push({ type: "NAME", index: r4, value: i2 }), r4 = a3;
                  continue;
                }
                if ("(" === n3) {
                  var s3 = 1, l2 = "", a3 = r4 + 1;
                  if ("?" === e4[a3]) throw TypeError('Pattern cannot start with "?" at '.concat(a3));
                  for (; a3 < e4.length; ) {
                    if ("\\" === e4[a3]) {
                      l2 += e4[a3++] + e4[a3++];
                      continue;
                    }
                    if (")" === e4[a3]) {
                      if (0 == --s3) {
                        a3++;
                        break;
                      }
                    } else if ("(" === e4[a3] && (s3++, "?" !== e4[a3 + 1])) throw TypeError("Capturing groups are not allowed at ".concat(a3));
                    l2 += e4[a3++];
                  }
                  if (s3) throw TypeError("Unbalanced pattern at ".concat(r4));
                  if (!l2) throw TypeError("Missing pattern at ".concat(r4));
                  t4.push({ type: "PATTERN", index: r4, value: l2 }), r4 = a3;
                  continue;
                }
                t4.push({ type: "CHAR", index: r4, value: e4[r4++] });
              }
              return t4.push({ type: "END", index: r4, value: "" }), t4;
            }(e3), n2 = t3.prefixes, a2 = void 0 === n2 ? "./" : n2, o2 = t3.delimiter, s2 = void 0 === o2 ? "/#?" : o2, l = [], c = 0, u = 0, d = "", p = function(e4) {
              if (u < r3.length && r3[u].type === e4) return r3[u++].value;
            }, h = function(e4) {
              var t4 = p(e4);
              if (void 0 !== t4) return t4;
              var n3 = r3[u], i2 = n3.type, a3 = n3.index;
              throw TypeError("Unexpected ".concat(i2, " at ").concat(a3, ", expected ").concat(e4));
            }, f = function() {
              for (var e4, t4 = ""; e4 = p("CHAR") || p("ESCAPED_CHAR"); ) t4 += e4;
              return t4;
            }, g = function(e4) {
              for (var t4 = 0; t4 < s2.length; t4++) {
                var r4 = s2[t4];
                if (e4.indexOf(r4) > -1) return true;
              }
              return false;
            }, m = function(e4) {
              var t4 = l[l.length - 1], r4 = e4 || (t4 && "string" == typeof t4 ? t4 : "");
              if (t4 && !r4) throw TypeError('Must have text between two parameters, missing text after "'.concat(t4.name, '"'));
              return !r4 || g(r4) ? "[^".concat(i(s2), "]+?") : "(?:(?!".concat(i(r4), ")[^").concat(i(s2), "])+?");
            }; u < r3.length; ) {
              var y = p("CHAR"), b = p("NAME"), w = p("PATTERN");
              if (b || w) {
                var v = y || "";
                -1 === a2.indexOf(v) && (d += v, v = ""), d && (l.push(d), d = ""), l.push({ name: b || c++, prefix: v, suffix: "", pattern: w || m(v), modifier: p("MODIFIER") || "" });
                continue;
              }
              var _ = y || p("ESCAPED_CHAR");
              if (_) {
                d += _;
                continue;
              }
              if (d && (l.push(d), d = ""), p("OPEN")) {
                var v = f(), E = p("NAME") || "", S = p("PATTERN") || "", x = f();
                h("CLOSE"), l.push({ name: E || (S ? c++ : ""), pattern: E && !S ? m(v) : S, prefix: v, suffix: x, modifier: p("MODIFIER") || "" });
                continue;
              }
              h("END");
            }
            return l;
          }
          function r2(e3, t3) {
            void 0 === t3 && (t3 = {});
            var r3 = a(t3), n2 = t3.encode, i2 = void 0 === n2 ? function(e4) {
              return e4;
            } : n2, o2 = t3.validate, s2 = void 0 === o2 || o2, l = e3.map(function(e4) {
              if ("object" == typeof e4) return new RegExp("^(?:".concat(e4.pattern, ")$"), r3);
            });
            return function(t4) {
              for (var r4 = "", n3 = 0; n3 < e3.length; n3++) {
                var a2 = e3[n3];
                if ("string" == typeof a2) {
                  r4 += a2;
                  continue;
                }
                var o3 = t4 ? t4[a2.name] : void 0, c = "?" === a2.modifier || "*" === a2.modifier, u = "*" === a2.modifier || "+" === a2.modifier;
                if (Array.isArray(o3)) {
                  if (!u) throw TypeError('Expected "'.concat(a2.name, '" to not repeat, but got an array'));
                  if (0 === o3.length) {
                    if (c) continue;
                    throw TypeError('Expected "'.concat(a2.name, '" to not be empty'));
                  }
                  for (var d = 0; d < o3.length; d++) {
                    var p = i2(o3[d], a2);
                    if (s2 && !l[n3].test(p)) throw TypeError('Expected all "'.concat(a2.name, '" to match "').concat(a2.pattern, '", but got "').concat(p, '"'));
                    r4 += a2.prefix + p + a2.suffix;
                  }
                  continue;
                }
                if ("string" == typeof o3 || "number" == typeof o3) {
                  var p = i2(String(o3), a2);
                  if (s2 && !l[n3].test(p)) throw TypeError('Expected "'.concat(a2.name, '" to match "').concat(a2.pattern, '", but got "').concat(p, '"'));
                  r4 += a2.prefix + p + a2.suffix;
                  continue;
                }
                if (!c) {
                  var h = u ? "an array" : "a string";
                  throw TypeError('Expected "'.concat(a2.name, '" to be ').concat(h));
                }
              }
              return r4;
            };
          }
          function n(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            var n2 = r3.decode, i2 = void 0 === n2 ? function(e4) {
              return e4;
            } : n2;
            return function(r4) {
              var n3 = e3.exec(r4);
              if (!n3) return false;
              for (var a2 = n3[0], o2 = n3.index, s2 = /* @__PURE__ */ Object.create(null), l = 1; l < n3.length; l++) !function(e4) {
                if (void 0 !== n3[e4]) {
                  var r5 = t3[e4 - 1];
                  "*" === r5.modifier || "+" === r5.modifier ? s2[r5.name] = n3[e4].split(r5.prefix + r5.suffix).map(function(e5) {
                    return i2(e5, r5);
                  }) : s2[r5.name] = i2(n3[e4], r5);
                }
              }(l);
              return { path: a2, index: o2, params: s2 };
            };
          }
          function i(e3) {
            return e3.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
          }
          function a(e3) {
            return e3 && e3.sensitive ? "" : "i";
          }
          function o(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            for (var n2 = r3.strict, o2 = void 0 !== n2 && n2, s2 = r3.start, l = r3.end, c = r3.encode, u = void 0 === c ? function(e4) {
              return e4;
            } : c, d = r3.delimiter, p = r3.endsWith, h = "[".concat(i(void 0 === p ? "" : p), "]|$"), f = "[".concat(i(void 0 === d ? "/#?" : d), "]"), g = void 0 === s2 || s2 ? "^" : "", m = 0; m < e3.length; m++) {
              var y = e3[m];
              if ("string" == typeof y) g += i(u(y));
              else {
                var b = i(u(y.prefix)), w = i(u(y.suffix));
                if (y.pattern) if (t3 && t3.push(y), b || w) if ("+" === y.modifier || "*" === y.modifier) {
                  var v = "*" === y.modifier ? "?" : "";
                  g += "(?:".concat(b, "((?:").concat(y.pattern, ")(?:").concat(w).concat(b, "(?:").concat(y.pattern, "))*)").concat(w, ")").concat(v);
                } else g += "(?:".concat(b, "(").concat(y.pattern, ")").concat(w, ")").concat(y.modifier);
                else {
                  if ("+" === y.modifier || "*" === y.modifier) throw TypeError('Can not repeat "'.concat(y.name, '" without a prefix and suffix'));
                  g += "(".concat(y.pattern, ")").concat(y.modifier);
                }
                else g += "(?:".concat(b).concat(w, ")").concat(y.modifier);
              }
            }
            if (void 0 === l || l) o2 || (g += "".concat(f, "?")), g += r3.endsWith ? "(?=".concat(h, ")") : "$";
            else {
              var _ = e3[e3.length - 1], E = "string" == typeof _ ? f.indexOf(_[_.length - 1]) > -1 : void 0 === _;
              o2 || (g += "(?:".concat(f, "(?=").concat(h, "))?")), E || (g += "(?=".concat(f, "|").concat(h, ")"));
            }
            return new RegExp(g, a(r3));
          }
          function s(e3, r3, n2) {
            if (e3 instanceof RegExp) {
              var i2;
              if (!r3) return e3;
              for (var l = /\((?:\?<(.*?)>)?(?!\?)/g, c = 0, u = l.exec(e3.source); u; ) r3.push({ name: u[1] || c++, prefix: "", suffix: "", modifier: "", pattern: "" }), u = l.exec(e3.source);
              return e3;
            }
            return Array.isArray(e3) ? (i2 = e3.map(function(e4) {
              return s(e4, r3, n2).source;
            }), new RegExp("(?:".concat(i2.join("|"), ")"), a(n2))) : o(t2(e3, n2), r3, n2);
          }
          Object.defineProperty(e2, "__esModule", { value: true }), e2.pathToRegexp = e2.tokensToRegexp = e2.regexpToFunction = e2.match = e2.tokensToFunction = e2.compile = e2.parse = void 0, e2.parse = t2, e2.compile = function(e3, n2) {
            return r2(t2(e3, n2), n2);
          }, e2.tokensToFunction = r2, e2.match = function(e3, t3) {
            var r3 = [];
            return n(s(e3, r3, t3), r3, t3);
          }, e2.regexpToFunction = n, e2.tokensToRegexp = o, e2.pathToRegexp = s;
        })(), t.exports = e2;
      })();
    }, 48086, (e, t, r) => {
      "use strict";
      r.parse = function(e2, t2) {
        if ("string" != typeof e2) throw TypeError("argument str must be a string");
        var r2 = {}, n2 = e2.length;
        if (n2 < 2) return r2;
        var i2 = t2 && t2.decode || u, a2 = 0, o2 = 0, s2 = 0;
        do {
          if (-1 === (o2 = e2.indexOf("=", a2))) break;
          if (-1 === (s2 = e2.indexOf(";", a2))) s2 = n2;
          else if (o2 > s2) {
            a2 = e2.lastIndexOf(";", o2 - 1) + 1;
            continue;
          }
          var d = l(e2, a2, o2), p = c(e2, o2, d), h = e2.slice(d, p);
          if (!r2.hasOwnProperty(h)) {
            var f = l(e2, o2 + 1, s2), g = c(e2, s2, f);
            34 === e2.charCodeAt(f) && 34 === e2.charCodeAt(g - 1) && (f++, g--);
            var m = e2.slice(f, g);
            r2[h] = function(e3, t3) {
              try {
                return t3(e3);
              } catch (t4) {
                return e3;
              }
            }(m, i2);
          }
          a2 = s2 + 1;
        } while (a2 < n2);
        return r2;
      }, r.serialize = function(e2, t2, r2) {
        var l2 = r2 && r2.encode || encodeURIComponent;
        if ("function" != typeof l2) throw TypeError("option encode is invalid");
        if (!i.test(e2)) throw TypeError("argument name is invalid");
        var c2 = l2(t2);
        if (!a.test(c2)) throw TypeError("argument val is invalid");
        var u2 = e2 + "=" + c2;
        if (!r2) return u2;
        if (null != r2.maxAge) {
          var d = Math.floor(r2.maxAge);
          if (!isFinite(d)) throw TypeError("option maxAge is invalid");
          u2 += "; Max-Age=" + d;
        }
        if (r2.domain) {
          if (!o.test(r2.domain)) throw TypeError("option domain is invalid");
          u2 += "; Domain=" + r2.domain;
        }
        if (r2.path) {
          if (!s.test(r2.path)) throw TypeError("option path is invalid");
          u2 += "; Path=" + r2.path;
        }
        if (r2.expires) {
          var p, h = r2.expires;
          if (p = h, "[object Date]" !== n.call(p) || isNaN(h.valueOf())) throw TypeError("option expires is invalid");
          u2 += "; Expires=" + h.toUTCString();
        }
        if (r2.httpOnly && (u2 += "; HttpOnly"), r2.secure && (u2 += "; Secure"), r2.partitioned && (u2 += "; Partitioned"), r2.priority) switch ("string" == typeof r2.priority ? r2.priority.toLowerCase() : r2.priority) {
          case "low":
            u2 += "; Priority=Low";
            break;
          case "medium":
            u2 += "; Priority=Medium";
            break;
          case "high":
            u2 += "; Priority=High";
            break;
          default:
            throw TypeError("option priority is invalid");
        }
        if (r2.sameSite) switch ("string" == typeof r2.sameSite ? r2.sameSite.toLowerCase() : r2.sameSite) {
          case true:
          case "strict":
            u2 += "; SameSite=Strict";
            break;
          case "lax":
            u2 += "; SameSite=Lax";
            break;
          case "none":
            u2 += "; SameSite=None";
            break;
          default:
            throw TypeError("option sameSite is invalid");
        }
        return u2;
      };
      var n = Object.prototype.toString, i = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/, a = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/, o = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, s = /^[\u0020-\u003A\u003D-\u007E]*$/;
      function l(e2, t2, r2) {
        do {
          var n2 = e2.charCodeAt(t2);
          if (32 !== n2 && 9 !== n2) return t2;
        } while (++t2 < r2);
        return r2;
      }
      function c(e2, t2, r2) {
        for (; t2 > r2; ) {
          var n2 = e2.charCodeAt(--t2);
          if (32 !== n2 && 9 !== n2) return t2 + 1;
        }
        return r2;
      }
      function u(e2) {
        return -1 !== e2.indexOf("%") ? decodeURIComponent(e2) : e2;
      }
    }, 64445, (e, t, r) => {
      var n = { 226: function(t2, r2) {
        !function(n2) {
          "use strict";
          var i2 = "function", a2 = "undefined", o = "object", s = "string", l = "major", c = "model", u = "name", d = "type", p = "vendor", h = "version", f = "architecture", g = "console", m = "mobile", y = "tablet", b = "smarttv", w = "wearable", v = "embedded", _ = "Amazon", E = "Apple", S = "ASUS", x = "BlackBerry", k = "Browser", T = "Chrome", A = "Firefox", R = "Google", C = "Huawei", P = "Microsoft", O = "Motorola", I = "Opera", N = "Samsung", U = "Sharp", D = "Sony", j = "Xiaomi", M = "Zebra", $ = "Facebook", L = "Chromium OS", H = "Mac OS", W = function(e2, t3) {
            var r3 = {};
            for (var n3 in e2) t3[n3] && t3[n3].length % 2 == 0 ? r3[n3] = t3[n3].concat(e2[n3]) : r3[n3] = e2[n3];
            return r3;
          }, K = function(e2) {
            for (var t3 = {}, r3 = 0; r3 < e2.length; r3++) t3[e2[r3].toUpperCase()] = e2[r3];
            return t3;
          }, B = function(e2, t3) {
            return typeof e2 === s && -1 !== q(t3).indexOf(q(e2));
          }, q = function(e2) {
            return e2.toLowerCase();
          }, F = function(e2, t3) {
            if (typeof e2 === s) return e2 = e2.replace(/^\s\s*/, ""), typeof t3 === a2 ? e2 : e2.substring(0, 350);
          }, J = function(e2, t3) {
            for (var r3, n3, a3, s2, l2, c2, u2 = 0; u2 < t3.length && !l2; ) {
              var d2 = t3[u2], p2 = t3[u2 + 1];
              for (r3 = n3 = 0; r3 < d2.length && !l2 && d2[r3]; ) if (l2 = d2[r3++].exec(e2)) for (a3 = 0; a3 < p2.length; a3++) c2 = l2[++n3], typeof (s2 = p2[a3]) === o && s2.length > 0 ? 2 === s2.length ? typeof s2[1] == i2 ? this[s2[0]] = s2[1].call(this, c2) : this[s2[0]] = s2[1] : 3 === s2.length ? typeof s2[1] !== i2 || s2[1].exec && s2[1].test ? this[s2[0]] = c2 ? c2.replace(s2[1], s2[2]) : void 0 : this[s2[0]] = c2 ? s2[1].call(this, c2, s2[2]) : void 0 : 4 === s2.length && (this[s2[0]] = c2 ? s2[3].call(this, c2.replace(s2[1], s2[2])) : void 0) : this[s2] = c2 || void 0;
              u2 += 2;
            }
          }, V = function(e2, t3) {
            for (var r3 in t3) if (typeof t3[r3] === o && t3[r3].length > 0) {
              for (var n3 = 0; n3 < t3[r3].length; n3++) if (B(t3[r3][n3], e2)) return "?" === r3 ? void 0 : r3;
            } else if (B(t3[r3], e2)) return "?" === r3 ? void 0 : r3;
            return e2;
          }, z = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, G = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [h, [u, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [h, [u, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [u, h], [/opios[\/ ]+([\w\.]+)/i], [h, [u, I + " Mini"]], [/\bopr\/([\w\.]+)/i], [h, [u, I]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [u, h], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [h, [u, "UC" + k]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [h, [u, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [h, [u, "WeChat"]], [/konqueror\/([\w\.]+)/i], [h, [u, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [h, [u, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [h, [u, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[u, /(.+)/, "$1 Secure " + k], h], [/\bfocus\/([\w\.]+)/i], [h, [u, A + " Focus"]], [/\bopt\/([\w\.]+)/i], [h, [u, I + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [h, [u, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [h, [u, "Dolphin"]], [/coast\/([\w\.]+)/i], [h, [u, I + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [h, [u, "MIUI " + k]], [/fxios\/([-\w\.]+)/i], [h, [u, A]], [/\bqihu|(qi?ho?o?|360)browser/i], [[u, "360 " + k]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[u, /(.+)/, "$1 " + k], h], [/(comodo_dragon)\/([\w\.]+)/i], [[u, /_/g, " "], h], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [u, h], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [u], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[u, $], h], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [u, h], [/\bgsa\/([\w\.]+) .*safari\//i], [h, [u, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [h, [u, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [h, [u, T + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[u, T + " WebView"], h], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [h, [u, "Android " + k]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [u, h], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [h, [u, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [h, u], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [u, [h, V, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [u, h], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[u, "Netscape"], h], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [h, [u, A + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [u, h], [/(cobalt)\/([\w\.]+)/i], [u, [h, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[f, "amd64"]], [/(ia32(?=;))/i], [[f, q]], [/((?:i[346]|x)86)[;\)]/i], [[f, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[f, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[f, "armhf"]], [/windows (ce|mobile); ppc;/i], [[f, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[f, /ower/, "", q]], [/(sun4\w)[;\)]/i], [[f, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[f, q]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [c, [p, N], [d, y]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [c, [p, N], [d, m]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [c, [p, E], [d, m]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [c, [p, E], [d, y]], [/(macintosh);/i], [c, [p, E]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [c, [p, U], [d, m]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [c, [p, C], [d, y]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [c, [p, C], [d, m]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[c, /_/g, " "], [p, j], [d, m]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[c, /_/g, " "], [p, j], [d, y]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [c, [p, "OPPO"], [d, m]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [c, [p, "Vivo"], [d, m]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [c, [p, "Realme"], [d, m]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [c, [p, O], [d, m]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [c, [p, O], [d, y]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [c, [p, "LG"], [d, y]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [c, [p, "LG"], [d, m]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [c, [p, "Lenovo"], [d, y]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[c, /_/g, " "], [p, "Nokia"], [d, m]], [/(pixel c)\b/i], [c, [p, R], [d, y]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [c, [p, R], [d, m]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [c, [p, D], [d, m]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[c, "Xperia Tablet"], [p, D], [d, y]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [c, [p, "OnePlus"], [d, m]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [c, [p, _], [d, y]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[c, /(.+)/g, "Fire Phone $1"], [p, _], [d, m]], [/(playbook);[-\w\),; ]+(rim)/i], [c, p, [d, y]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [c, [p, x], [d, m]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [c, [p, S], [d, y]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [c, [p, S], [d, m]], [/(nexus 9)/i], [c, [p, "HTC"], [d, y]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [p, [c, /_/g, " "], [d, m]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [c, [p, "Acer"], [d, y]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [c, [p, "Meizu"], [d, m]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [p, c, [d, m]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [p, c, [d, y]], [/(surface duo)/i], [c, [p, P], [d, y]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [c, [p, "Fairphone"], [d, m]], [/(u304aa)/i], [c, [p, "AT&T"], [d, m]], [/\bsie-(\w*)/i], [c, [p, "Siemens"], [d, m]], [/\b(rct\w+) b/i], [c, [p, "RCA"], [d, y]], [/\b(venue[\d ]{2,7}) b/i], [c, [p, "Dell"], [d, y]], [/\b(q(?:mv|ta)\w+) b/i], [c, [p, "Verizon"], [d, y]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [c, [p, "Barnes & Noble"], [d, y]], [/\b(tm\d{3}\w+) b/i], [c, [p, "NuVision"], [d, y]], [/\b(k88) b/i], [c, [p, "ZTE"], [d, y]], [/\b(nx\d{3}j) b/i], [c, [p, "ZTE"], [d, m]], [/\b(gen\d{3}) b.+49h/i], [c, [p, "Swiss"], [d, m]], [/\b(zur\d{3}) b/i], [c, [p, "Swiss"], [d, y]], [/\b((zeki)?tb.*\b) b/i], [c, [p, "Zeki"], [d, y]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[p, "Dragon Touch"], c, [d, y]], [/\b(ns-?\w{0,9}) b/i], [c, [p, "Insignia"], [d, y]], [/\b((nxa|next)-?\w{0,9}) b/i], [c, [p, "NextBook"], [d, y]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[p, "Voice"], c, [d, m]], [/\b(lvtel\-)?(v1[12]) b/i], [[p, "LvTel"], c, [d, m]], [/\b(ph-1) /i], [c, [p, "Essential"], [d, m]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [c, [p, "Envizen"], [d, y]], [/\b(trio[-\w\. ]+) b/i], [c, [p, "MachSpeed"], [d, y]], [/\btu_(1491) b/i], [c, [p, "Rotor"], [d, y]], [/(shield[\w ]+) b/i], [c, [p, "Nvidia"], [d, y]], [/(sprint) (\w+)/i], [p, c, [d, m]], [/(kin\.[onetw]{3})/i], [[c, /\./g, " "], [p, P], [d, m]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [c, [p, M], [d, y]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [c, [p, M], [d, m]], [/smart-tv.+(samsung)/i], [p, [d, b]], [/hbbtv.+maple;(\d+)/i], [[c, /^/, "SmartTV"], [p, N], [d, b]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[p, "LG"], [d, b]], [/(apple) ?tv/i], [p, [c, E + " TV"], [d, b]], [/crkey/i], [[c, T + "cast"], [p, R], [d, b]], [/droid.+aft(\w)( bui|\))/i], [c, [p, _], [d, b]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [c, [p, U], [d, b]], [/(bravia[\w ]+)( bui|\))/i], [c, [p, D], [d, b]], [/(mitv-\w{5}) bui/i], [c, [p, j], [d, b]], [/Hbbtv.*(technisat) (.*);/i], [p, c, [d, b]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[p, F], [c, F], [d, b]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[d, b]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [p, c, [d, g]], [/droid.+; (shield) bui/i], [c, [p, "Nvidia"], [d, g]], [/(playstation [345portablevi]+)/i], [c, [p, D], [d, g]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [c, [p, P], [d, g]], [/((pebble))app/i], [p, c, [d, w]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [c, [p, E], [d, w]], [/droid.+; (glass) \d/i], [c, [p, R], [d, w]], [/droid.+; (wt63?0{2,3})\)/i], [c, [p, M], [d, w]], [/(quest( 2| pro)?)/i], [c, [p, $], [d, w]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [p, [d, v]], [/(aeobc)\b/i], [c, [p, _], [d, v]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [c, [d, m]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [c, [d, y]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[d, y]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[d, m]], [/(android[-\w\. ]{0,9});.+buil/i], [c, [p, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [h, [u, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [h, [u, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [u, h], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [h, u]], os: [[/microsoft (windows) (vista|xp)/i], [u, h], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [u, [h, V, z]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[u, "Windows"], [h, V, z]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[h, /_/g, "."], [u, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[u, H], [h, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [h, u], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [u, h], [/\(bb(10);/i], [h, [u, x]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [h, [u, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [h, [u, A + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [h, [u, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [h, [u, "watchOS"]], [/crkey\/([\d\.]+)/i], [h, [u, T + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[u, L], h], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [u, h], [/(sunos) ?([\w\.\d]*)/i], [[u, "Solaris"], h], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [u, h]] }, X = function(e2, t3) {
            if (typeof e2 === o && (t3 = e2, e2 = void 0), !(this instanceof X)) return new X(e2, t3).getResult();
            var r3 = typeof n2 !== a2 && n2.navigator ? n2.navigator : void 0, g2 = e2 || (r3 && r3.userAgent ? r3.userAgent : ""), b2 = r3 && r3.userAgentData ? r3.userAgentData : void 0, w2 = t3 ? W(G, t3) : G, v2 = r3 && r3.userAgent == g2;
            return this.getBrowser = function() {
              var e3, t4 = {};
              return t4[u] = void 0, t4[h] = void 0, J.call(t4, g2, w2.browser), t4[l] = typeof (e3 = t4[h]) === s ? e3.replace(/[^\d\.]/g, "").split(".")[0] : void 0, v2 && r3 && r3.brave && typeof r3.brave.isBrave == i2 && (t4[u] = "Brave"), t4;
            }, this.getCPU = function() {
              var e3 = {};
              return e3[f] = void 0, J.call(e3, g2, w2.cpu), e3;
            }, this.getDevice = function() {
              var e3 = {};
              return e3[p] = void 0, e3[c] = void 0, e3[d] = void 0, J.call(e3, g2, w2.device), v2 && !e3[d] && b2 && b2.mobile && (e3[d] = m), v2 && "Macintosh" == e3[c] && r3 && typeof r3.standalone !== a2 && r3.maxTouchPoints && r3.maxTouchPoints > 2 && (e3[c] = "iPad", e3[d] = y), e3;
            }, this.getEngine = function() {
              var e3 = {};
              return e3[u] = void 0, e3[h] = void 0, J.call(e3, g2, w2.engine), e3;
            }, this.getOS = function() {
              var e3 = {};
              return e3[u] = void 0, e3[h] = void 0, J.call(e3, g2, w2.os), v2 && !e3[u] && b2 && "Unknown" != b2.platform && (e3[u] = b2.platform.replace(/chrome os/i, L).replace(/macos/i, H)), e3;
            }, this.getResult = function() {
              return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
            }, this.getUA = function() {
              return g2;
            }, this.setUA = function(e3) {
              return g2 = typeof e3 === s && e3.length > 350 ? F(e3, 350) : e3, this;
            }, this.setUA(g2), this;
          };
          if (X.VERSION = "1.0.35", X.BROWSER = K([u, h, l]), X.CPU = K([f]), X.DEVICE = K([c, p, d, g, m, b, y, w, v]), X.ENGINE = X.OS = K([u, h]), typeof r2 !== a2) t2.exports && (r2 = t2.exports = X), r2.UAParser = X;
          else if (typeof define === i2 && define.amd) e.r, void 0 !== X && e.v(X);
          else typeof n2 !== a2 && (n2.UAParser = X);
          var Y = typeof n2 !== a2 && (n2.jQuery || n2.Zepto);
          if (Y && !Y.ua) {
            var Q = new X();
            Y.ua = Q.getResult(), Y.ua.get = function() {
              return Q.getUA();
            }, Y.ua.set = function(e2) {
              Q.setUA(e2);
              var t3 = Q.getResult();
              for (var r3 in t3) Y.ua[r3] = t3[r3];
            };
          }
        }(this);
      } }, i = {};
      function a(e2) {
        var t2 = i[e2];
        if (void 0 !== t2) return t2.exports;
        var r2 = i[e2] = { exports: {} }, o = true;
        try {
          n[e2].call(r2.exports, r2, r2.exports, a), o = false;
        } finally {
          o && delete i[e2];
        }
        return r2.exports;
      }
      a.ab = "/ROOT/node_modules/next/dist/compiled/ua-parser-js/", t.exports = a(226);
    }, 52069, (e, t, r) => {
      "use strict";
      var n = { H: null, A: null };
      function i(e2) {
        var t2 = "https://react.dev/errors/" + e2;
        if (1 < arguments.length) {
          t2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var r2 = 2; r2 < arguments.length; r2++) t2 += "&args[]=" + encodeURIComponent(arguments[r2]);
        }
        return "Minified React error #" + e2 + "; visit " + t2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var a = Array.isArray;
      function o() {
      }
      var s = Symbol.for("react.transitional.element"), l = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), u = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), p = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), f = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), m = Symbol.for("react.activity"), y = Symbol.for("react.view_transition"), b = Symbol.iterator, w = Object.prototype.hasOwnProperty, v = Object.assign;
      function _(e2, t2, r2) {
        var n2 = r2.ref;
        return { $$typeof: s, type: e2, key: t2, ref: void 0 !== n2 ? n2 : null, props: r2 };
      }
      function E(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === s;
      }
      var S = /\/+/g;
      function x(e2, t2) {
        var r2, n2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, n2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return n2[e3];
        })) : t2.toString(36);
      }
      function k(e2, t2, r2) {
        if (null == e2) return e2;
        var n2 = [], c2 = 0;
        return !function e3(t3, r3, n3, c3, u2) {
          var d2, p2, h2, f2 = typeof t3;
          ("undefined" === f2 || "boolean" === f2) && (t3 = null);
          var m2 = false;
          if (null === t3) m2 = true;
          else switch (f2) {
            case "bigint":
            case "string":
            case "number":
              m2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case s:
                case l:
                  m2 = true;
                  break;
                case g:
                  return e3((m2 = t3._init)(t3._payload), r3, n3, c3, u2);
              }
          }
          if (m2) return u2 = u2(t3), m2 = "" === c3 ? "." + x(t3, 0) : c3, a(u2) ? (n3 = "", null != m2 && (n3 = m2.replace(S, "$&/") + "/"), e3(u2, r3, n3, "", function(e4) {
            return e4;
          })) : null != u2 && (E(u2) && (d2 = u2, p2 = n3 + (null == u2.key || t3 && t3.key === u2.key ? "" : ("" + u2.key).replace(S, "$&/") + "/") + m2, u2 = _(d2.type, p2, d2.props)), r3.push(u2)), 1;
          m2 = 0;
          var y2 = "" === c3 ? "." : c3 + ":";
          if (a(t3)) for (var w2 = 0; w2 < t3.length; w2++) f2 = y2 + x(c3 = t3[w2], w2), m2 += e3(c3, r3, n3, f2, u2);
          else if ("function" == typeof (w2 = null === (h2 = t3) || "object" != typeof h2 ? null : "function" == typeof (h2 = b && h2[b] || h2["@@iterator"]) ? h2 : null)) for (t3 = w2.call(t3), w2 = 0; !(c3 = t3.next()).done; ) f2 = y2 + x(c3 = c3.value, w2++), m2 += e3(c3, r3, n3, f2, u2);
          else if ("object" === f2) {
            if ("function" == typeof t3.then) return e3(function(e4) {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" == typeof e4.status ? e4.then(o, o) : (e4.status = "pending", e4.then(function(t4) {
                    "pending" === e4.status && (e4.status = "fulfilled", e4.value = t4);
                  }, function(t4) {
                    "pending" === e4.status && (e4.status = "rejected", e4.reason = t4);
                  })), e4.status) {
                    case "fulfilled":
                      return e4.value;
                    case "rejected":
                      throw e4.reason;
                  }
              }
              throw e4;
            }(t3), r3, n3, c3, u2);
            throw Error(i(31, "[object Object]" === (r3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : r3));
          }
          return m2;
        }(e2, n2, "", "", function(e3) {
          return t2.call(r2, e3, c2++);
        }), n2;
      }
      function T(e2) {
        if (-1 === e2._status) {
          var t2 = (0, e2._result)();
          t2.then(function(r2) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = r2, void 0 === t2.status && (t2.status = "fulfilled", t2.value = r2));
          }, function(r2) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = r2, void 0 === t2.status && (t2.status = "rejected", t2.reason = r2));
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function A() {
        return /* @__PURE__ */ new WeakMap();
      }
      function R() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      r.Activity = m, r.Children = { map: k, forEach: function(e2, t2, r2) {
        k(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return k(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return k(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!E(e2)) throw Error(i(143));
        return e2;
      } }, r.Fragment = c, r.Profiler = d, r.StrictMode = u, r.Suspense = h, r.ViewTransition = y, r.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = n, r.cache = function(e2) {
        return function() {
          var t2 = n.A;
          if (!t2) return e2.apply(null, arguments);
          var r2 = t2.getCacheForType(A);
          void 0 === (t2 = r2.get(e2)) && (t2 = R(), r2.set(e2, t2)), r2 = 0;
          for (var i2 = arguments.length; r2 < i2; r2++) {
            var a2 = arguments[r2];
            if ("function" == typeof a2 || "object" == typeof a2 && null !== a2) {
              var o2 = t2.o;
              null === o2 && (t2.o = o2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = o2.get(a2)) && (t2 = R(), o2.set(a2, t2));
            } else null === (o2 = t2.p) && (t2.p = o2 = /* @__PURE__ */ new Map()), void 0 === (t2 = o2.get(a2)) && (t2 = R(), o2.set(a2, t2));
          }
          if (1 === t2.s) return t2.v;
          if (2 === t2.s) throw t2.v;
          try {
            var s2 = e2.apply(null, arguments);
            return (r2 = t2).s = 1, r2.v = s2;
          } catch (e3) {
            throw (s2 = t2).s = 2, s2.v = e3, e3;
          }
        };
      }, r.cacheSignal = function() {
        var e2 = n.A;
        return e2 ? e2.cacheSignal() : null;
      }, r.captureOwnerStack = function() {
        return null;
      }, r.cloneElement = function(e2, t2, r2) {
        if (null == e2) throw Error(i(267, e2));
        var n2 = v({}, e2.props), a2 = e2.key;
        if (null != t2) for (o2 in void 0 !== t2.key && (a2 = "" + t2.key), t2) w.call(t2, o2) && "key" !== o2 && "__self" !== o2 && "__source" !== o2 && ("ref" !== o2 || void 0 !== t2.ref) && (n2[o2] = t2[o2]);
        var o2 = arguments.length - 2;
        if (1 === o2) n2.children = r2;
        else if (1 < o2) {
          for (var s2 = Array(o2), l2 = 0; l2 < o2; l2++) s2[l2] = arguments[l2 + 2];
          n2.children = s2;
        }
        return _(e2.type, a2, n2);
      }, r.createElement = function(e2, t2, r2) {
        var n2, i2 = {}, a2 = null;
        if (null != t2) for (n2 in void 0 !== t2.key && (a2 = "" + t2.key), t2) w.call(t2, n2) && "key" !== n2 && "__self" !== n2 && "__source" !== n2 && (i2[n2] = t2[n2]);
        var o2 = arguments.length - 2;
        if (1 === o2) i2.children = r2;
        else if (1 < o2) {
          for (var s2 = Array(o2), l2 = 0; l2 < o2; l2++) s2[l2] = arguments[l2 + 2];
          i2.children = s2;
        }
        if (e2 && e2.defaultProps) for (n2 in o2 = e2.defaultProps) void 0 === i2[n2] && (i2[n2] = o2[n2]);
        return _(e2, a2, i2);
      }, r.createRef = function() {
        return { current: null };
      }, r.forwardRef = function(e2) {
        return { $$typeof: p, render: e2 };
      }, r.isValidElement = E, r.lazy = function(e2) {
        return { $$typeof: g, _payload: { _status: -1, _result: e2 }, _init: T };
      }, r.memo = function(e2, t2) {
        return { $$typeof: f, type: e2, compare: void 0 === t2 ? null : t2 };
      }, r.use = function(e2) {
        return n.H.use(e2);
      }, r.useCallback = function(e2, t2) {
        return n.H.useCallback(e2, t2);
      }, r.useDebugValue = function() {
      }, r.useId = function() {
        return n.H.useId();
      }, r.useMemo = function(e2, t2) {
        return n.H.useMemo(e2, t2);
      }, r.version = "19.3.0-canary-3f0b9e61-20260317";
    }, 40049, (e, t, r) => {
      "use strict";
      t.exports = e.r(52069);
    }, 7754, 46478, 9939, 25753, 38174, 53835, 18368, 63072, 51564, 16852, 75982, (e) => {
      "use strict";
      var t, r, n = e.i(90044);
      let i = (0, n.createAsyncLocalStorage)();
      e.s(["workAsyncStorageInstance", 0, i], 46478), e.s([], 7754);
      let a = (0, n.createAsyncLocalStorage)();
      e.s(["workUnitAsyncStorageInstance", 0, a], 9939), e.s(["InvariantError", 0, class extends Error {
        constructor(e2, t2) {
          super(`Invariant: ${e2.endsWith(".") ? e2 : e2 + "."} This is a bug in Next.js.`, t2), this.name = "InvariantError";
        }
      }], 25753);
      var o = ((t = {})[t.Before = 1] = "Before", t[t.EarlyStatic = 2] = "EarlyStatic", t[t.Static = 3] = "Static", t[t.EarlyRuntime = 4] = "EarlyRuntime", t[t.Runtime = 5] = "Runtime", t[t.Dynamic = 6] = "Dynamic", t[t.Abandoned = 7] = "Abandoned", t);
      e.s(["RenderStage", 0, o], 38174), e.s(["getPrerenderResumeDataCache", 0, function(e2) {
        switch (e2.type) {
          case "prerender":
          case "prerender-runtime":
          case "prerender-ppr":
          case "prerender-client":
          case "validation-client":
            return e2.prerenderResumeDataCache;
          case "request":
            if (e2.prerenderResumeDataCache) return e2.prerenderResumeDataCache;
          case "prerender-legacy":
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "generate-static-params":
            return null;
          default:
            return e2;
        }
      }, "getRenderResumeDataCache", 0, function(e2) {
        switch (e2.type) {
          case "request":
          case "prerender":
          case "prerender-runtime":
          case "prerender-client":
          case "validation-client":
            if (e2.renderResumeDataCache) return e2.renderResumeDataCache;
          case "prerender-ppr":
            return e2.prerenderResumeDataCache ?? null;
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "prerender-legacy":
          case "generate-static-params":
            return null;
          default:
            return e2;
        }
      }, "isInEarlyRenderStage", 0, function(e2) {
        let t2 = e2.stagedRendering;
        return !!t2 && (t2.currentStage === o.EarlyStatic || t2.currentStage === o.EarlyRuntime);
      }, "throwForMissingRequestStore", 0, function(e2) {
        throw Object.defineProperty(Error(`\`${e2}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E251", enumerable: false, configurable: true });
      }], 53835);
      var s = e.i(40049);
      let l = "DYNAMIC_SERVER_USAGE";
      class c extends Error {
        constructor(e2) {
          super(`Dynamic server usage: ${e2}`), this.description = e2, this.digest = l;
        }
      }
      e.s(["DynamicServerError", 0, c, "isDynamicServerError", 0, function(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && "string" == typeof e2.digest && e2.digest === l;
      }], 18368);
      let u = "function" == typeof s.default.unstable_postpone;
      function d(e2, t2) {
        return `Route ${e2} needs to bail out of prerendering at this point because it used ${t2}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
      }
      function p(e2) {
        return e2.includes("needs to bail out of prerendering at this point because it used") && e2.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
      }
      if (false === p(d("%%%", "^^^"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      let h = "NEXT_PRERENDER_INTERRUPTED";
      function f(e2) {
        let t2 = Object.defineProperty(Error(e2), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        return t2.digest = h, t2;
      }
      RegExp("\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at __next_root_layout_boundary__ \\([^\\n]*\\)"), RegExp("\\n\\s+at __next_metadata_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_viewport_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_outlet_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_instant_validation_boundary__[\\n\\s]"), e.s(["abortAndThrowOnSynchronousRequestDataAccess", 0, function(e2, t2, r2, n2) {
        if (false === n2.controller.signal.aborted) {
          let i2, a2;
          i2 = f(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`), n2.controller.abort(i2), (a2 = n2.dynamicTracking) && a2.dynamicAccesses.push({ stack: a2.isDebugDynamicAccesses ? Error().stack : void 0, expression: t2 });
          let o2 = n2.dynamicTracking;
          o2 && null === o2.syncDynamicErrorWithStack && (o2.syncDynamicErrorWithStack = r2);
        }
        throw f(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`);
      }, "isDynamicPostpone", 0, function(e2) {
        return "object" == typeof e2 && null !== e2 && "string" == typeof e2.message && p(e2.message);
      }, "isPrerenderInterruptedError", 0, function(e2) {
        return "object" == typeof e2 && null !== e2 && e2.digest === h && "name" in e2 && "message" in e2 && e2 instanceof Error;
      }, "postponeWithTracking", 0, function(e2, t2, r2) {
        (function() {
          if (!u) throw Object.defineProperty(Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E224", enumerable: false, configurable: true });
        })(), r2 && r2.dynamicAccesses.push({ stack: r2.isDebugDynamicAccesses ? Error().stack : void 0, expression: t2 }), s.default.unstable_postpone(d(e2, t2));
      }, "throwToInterruptStaticGeneration", 0, function(e2, t2, r2) {
        let n2 = Object.defineProperty(new c(`Route ${t2.route} couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E558", enumerable: false, configurable: true });
        throw r2.revalidate = 0, t2.dynamicUsageDescription = e2, t2.dynamicUsageStack = n2.stack, n2;
      }, "trackDynamicDataInDynamicRender", 0, function(e2) {
        switch (e2.type) {
          case "cache":
          case "unstable-cache":
          case "private-cache":
            return;
        }
      }], 63072);
      let g = "HANGING_PROMISE_REJECTION";
      class m extends Error {
        constructor(e2, t2) {
          super(`During prerendering, ${t2} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${t2} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${e2}".`), this.route = e2, this.expression = t2, this.digest = g;
        }
      }
      let y = /* @__PURE__ */ new WeakMap();
      function b() {
      }
      e.s(["delayUntilRuntimeStage", 0, function(e2, t2) {
        let { stagedRendering: r2 } = e2;
        return r2 ? r2.waitForStage(r2.currentStage === o.EarlyStatic || r2.currentStage === o.EarlyRuntime ? o.EarlyRuntime : o.Runtime).then(() => t2) : t2;
      }, "isHangingPromiseRejectionError", 0, function(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && e2.digest === g;
      }, "makeDevtoolsIOAwarePromise", 0, function(e2, t2, r2) {
        return t2.stagedRendering ? t2.stagedRendering.delayUntilStage(r2, void 0, e2) : new Promise((t3) => {
          setTimeout(() => {
            t3(e2);
          }, 0);
        });
      }, "makeHangingPromise", 0, function(e2, t2, r2) {
        if (e2.aborted) return Promise.reject(new m(t2, r2));
        {
          let n2 = new Promise((n3, i2) => {
            let a2 = i2.bind(null, new m(t2, r2)), o2 = y.get(e2);
            if (o2) o2.push(a2);
            else {
              let t3 = [a2];
              y.set(e2, t3), e2.addEventListener("abort", () => {
                for (let e3 = 0; e3 < t3.length; e3++) t3[e3]();
              }, { once: true });
            }
          });
          return n2.catch(b), n2;
        }
      }], 51564);
      var w = ((r = {})[r.SeeOther = 303] = "SeeOther", r[r.TemporaryRedirect = 307] = "TemporaryRedirect", r[r.PermanentRedirect = 308] = "PermanentRedirect", r);
      e.s(["RedirectStatusCode", 0, w], 16852);
      let v = "NEXT_REDIRECT";
      e.s(["REDIRECT_ERROR_CODE", 0, v, "isRedirectError", 0, function(e2) {
        if ("object" != typeof e2 || null === e2 || !("digest" in e2) || "string" != typeof e2.digest) return false;
        let t2 = e2.digest.split(";"), [r2, n2] = t2, i2 = t2.slice(2, -2).join(";"), a2 = Number(t2.at(-2));
        return r2 === v && ("replace" === n2 || "push" === n2) && "string" == typeof i2 && !isNaN(a2) && a2 in w;
      }], 75982);
    }, 91375, (e) => {
      "use strict";
      let t = (0, e.i(90044).createAsyncLocalStorage)();
      e.s([], 92999), e.i(92999), e.s(["actionAsyncStorage", 0, t], 91375);
    }, 82748, (e) => {
      "use strict";
      var t = e.i(51564);
      let r = Symbol.for("react.postpone"), n = new Set(Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 }));
      var i = e.i(75982), a = e.i(63072), o = e.i(18368);
      e.s(["unstable_rethrow", 0, function e2(s) {
        if ((0, i.isRedirectError)(s) || function(e3) {
          if ("object" != typeof e3 || null === e3 || !("digest" in e3) || "string" != typeof e3.digest) return false;
          let [t2, r2] = e3.digest.split(";");
          return "NEXT_HTTP_ERROR_FALLBACK" === t2 && n.has(Number(r2));
        }(s) || "object" == typeof s && null !== s && "digest" in s && "BAILOUT_TO_CLIENT_SIDE_RENDERING" === s.digest || (0, o.isDynamicServerError)(s) || (0, a.isDynamicPostpone)(s) || "object" == typeof s && null !== s && s.$$typeof === r || (0, t.isHangingPromiseRejectionError)(s) || (0, a.isPrerenderInterruptedError)(s)) throw s;
        s instanceof Error && "cause" in s && e2(s.cause);
      }], 82748);
    }, 42738, (e) => {
      "use strict";
      let t, r, n, i, a, o, s, l;
      async function c() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      e.i(74398);
      let u = null;
      async function d() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        u || (u = c());
        let e10 = await u;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function p(...e10) {
        let t10 = await c();
        try {
          var r10;
          await (null == t10 || null == (r10 = t10.onRequestError) ? void 0 : r10.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let h = null;
      function f() {
        return h || (h = d()), h;
      }
      function g(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== e.g.process && (process.env = e.g.process.env, e.g.process = process);
      try {
        Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
          let t10 = new Proxy(function() {
          }, { get(t11, r10) {
            if ("then" === r10) return {};
            throw Object.defineProperty(Error(g(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, construct() {
            throw Object.defineProperty(Error(g(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, apply(r10, n10, i10) {
            if ("function" == typeof i10[0]) return i10[0](t10);
            throw Object.defineProperty(Error(g(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          } });
          return new Proxy({}, { get: () => t10 });
        }, enumerable: false, configurable: false });
      } catch {
      }
      f();
      class m extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class y extends Error {
        constructor() {
          super("The request.page has been deprecated in favour of `URLPattern`.\n  Read more: https://nextjs.org/docs/messages/middleware-request-page\n  ");
        }
      }
      class b extends Error {
        constructor() {
          super("The request.ua has been removed in favour of `userAgent` function.\n  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent\n  ");
        }
      }
      let w = "x-prerender-revalidate", v = ".meta", _ = "x-next-cache-tags", E = "x-next-revalidated-tags", S = "_N_T_", x = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function k(e10) {
        var t10, r10, n10, i10, a10, o10 = [], s10 = 0;
        function l2() {
          for (; s10 < e10.length && /\s/.test(e10.charAt(s10)); ) s10 += 1;
          return s10 < e10.length;
        }
        for (; s10 < e10.length; ) {
          for (t10 = s10, a10 = false; l2(); ) if ("," === (r10 = e10.charAt(s10))) {
            for (n10 = s10, s10 += 1, l2(), i10 = s10; s10 < e10.length && "=" !== (r10 = e10.charAt(s10)) && ";" !== r10 && "," !== r10; ) s10 += 1;
            s10 < e10.length && "=" === e10.charAt(s10) ? (a10 = true, s10 = i10, o10.push(e10.substring(t10, n10)), t10 = s10) : s10 = n10 + 1;
          } else s10 += 1;
          (!a10 || s10 >= e10.length) && o10.push(e10.substring(t10, e10.length));
        }
        return o10;
      }
      function T(e10) {
        let t10 = {}, r10 = [];
        if (e10) for (let [n10, i10] of e10.entries()) "set-cookie" === n10.toLowerCase() ? (r10.push(...k(i10)), t10[n10] = 1 === r10.length ? r10[0] : r10) : t10[n10] = i10;
        return t10;
      }
      function A(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Object.defineProperty(Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      ({ ...x, GROUP: { builtinReact: [x.reactServerComponents, x.actionBrowser], serverOnly: [x.reactServerComponents, x.actionBrowser, x.instrument, x.middleware], neutralTarget: [x.apiNode, x.apiEdge], clientOnly: [x.serverSideRendering, x.appPagesBrowser], bundled: [x.reactServerComponents, x.actionBrowser, x.serverSideRendering, x.appPagesBrowser, x.shared, x.instrument, x.middleware], appPages: [x.reactServerComponents, x.serverSideRendering, x.appPagesBrowser, x.actionBrowser] } });
      let R = Symbol("response"), C = Symbol("passThrough"), P = Symbol("waitUntil");
      class O {
        constructor(e10, t10) {
          this[C] = false, this[P] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[R] || (this[R] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[C] = true;
        }
        waitUntil(e10) {
          if ("external" === this[P].kind) return (0, this[P].function)(e10);
          this[P].promises.push(e10);
        }
      }
      class I extends O {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new m({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new m({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      function N(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function U(e10) {
        let t10 = e10.indexOf("#"), r10 = e10.indexOf("?"), n10 = r10 > -1 && (t10 < 0 || r10 < t10);
        return n10 || t10 > -1 ? { pathname: e10.substring(0, n10 ? r10 : t10), query: n10 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function D(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n10, hash: i10 } = U(e10);
        return `${t10}${r10}${n10}${i10}`;
      }
      function j(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n10, hash: i10 } = U(e10);
        return `${r10}${t10}${n10}${i10}`;
      }
      function M(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r10 } = U(e10);
        return r10 === t10 || r10.startsWith(t10 + "/");
      }
      let $ = /* @__PURE__ */ new WeakMap();
      function L(e10, t10) {
        let r10;
        if (!t10) return { pathname: e10 };
        let n10 = $.get(t10);
        n10 || (n10 = t10.map((e11) => e11.toLowerCase()), $.set(t10, n10));
        let i10 = e10.split("/", 2);
        if (!i10[1]) return { pathname: e10 };
        let a10 = i10[1].toLowerCase(), o10 = n10.indexOf(a10);
        return o10 < 0 ? { pathname: e10 } : (r10 = t10[o10], { pathname: e10 = e10.slice(r10.length + 1) || "/", detectedLocale: r10 });
      }
      let H = /^(?:127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)$/;
      function W(e10, t10) {
        let r10 = new URL(String(e10), t10 && String(t10));
        return H.test(r10.hostname) && (r10.hostname = "localhost"), r10;
      }
      let K = Symbol("NextURLInternal");
      class B {
        constructor(e10, t10, r10) {
          let n10, i10;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (n10 = t10, i10 = r10 || {}) : i10 = r10 || t10 || {}, this[K] = { url: W(e10, n10 ?? i10.base), options: i10, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r10, n10, i10;
          let a10 = function(e11, t11) {
            let { basePath: r11, i18n: n11, trailingSlash: i11 } = t11.nextConfig ?? {}, a11 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : i11 };
            r11 && M(a11.pathname, r11) && (a11.pathname = function(e12, t12) {
              if (!M(e12, t12)) return e12;
              let r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : `/${r12}`;
            }(a11.pathname, r11), a11.basePath = r11);
            let o11 = a11.pathname;
            if (a11.pathname.startsWith("/_next/data/") && a11.pathname.endsWith(".json")) {
              let e12 = a11.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              a11.buildId = e12[0], o11 = "index" !== e12[1] ? `/${e12.slice(1).join("/")}` : "/", true === t11.parseData && (a11.pathname = o11);
            }
            if (n11) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(a11.pathname) : L(a11.pathname, n11.locales);
              a11.locale = e12.detectedLocale, a11.pathname = e12.pathname ?? a11.pathname, !e12.detectedLocale && a11.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(o11) : L(o11, n11.locales)).detectedLocale && (a11.locale = e12.detectedLocale);
            }
            return a11;
          }(this[K].url.pathname, { nextConfig: this[K].options.nextConfig, parseData: true, i18nProvider: this[K].options.i18nProvider }), o10 = function(e11, t11) {
            let r11;
            if (t11?.host && !Array.isArray(t11.host)) r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          }(this[K].url, this[K].options.headers);
          this[K].domainLocale = this[K].options.i18nProvider ? this[K].options.i18nProvider.detectDomainLocale(o10) : function(e11, t11, r11) {
            if (e11) {
              for (let n11 of (r11 && (r11 = r11.toLowerCase()), e11)) if (t11 === n11.domain?.split(":", 1)[0].toLowerCase() || r11 === n11.defaultLocale.toLowerCase() || n11.locales?.some((e12) => e12.toLowerCase() === r11)) return n11;
            }
          }(null == (t10 = this[K].options.nextConfig) || null == (e10 = t10.i18n) ? void 0 : e10.domains, o10);
          let s10 = (null == (r10 = this[K].domainLocale) ? void 0 : r10.defaultLocale) || (null == (i10 = this[K].options.nextConfig) || null == (n10 = i10.i18n) ? void 0 : n10.defaultLocale);
          this[K].url.pathname = a10.pathname, this[K].defaultLocale = s10, this[K].basePath = a10.basePath ?? "", this[K].buildId = a10.buildId, this[K].locale = a10.locale ?? s10, this[K].trailingSlash = a10.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = function(e11, t11, r10, n10) {
            if (!t11 || t11 === r10) return e11;
            let i10 = e11.toLowerCase();
            return !n10 && (M(i10, "/api") || M(i10, `/${t11.toLowerCase()}`)) ? e11 : D(e11, `/${t11}`);
          }((e10 = { basePath: this[K].basePath, buildId: this[K].buildId, defaultLocale: this[K].options.forceLocale ? void 0 : this[K].defaultLocale, locale: this[K].locale, pathname: this[K].url.pathname, trailingSlash: this[K].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = N(t10)), e10.buildId && (t10 = j(D(t10, `/_next/data/${e10.buildId}`), "/" === e10.pathname ? "index.json" : ".json")), t10 = D(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : j(t10, "/") : N(t10);
        }
        formatSearch() {
          return this[K].url.search;
        }
        get buildId() {
          return this[K].buildId;
        }
        set buildId(e10) {
          this[K].buildId = e10;
        }
        get locale() {
          return this[K].locale ?? "";
        }
        set locale(e10) {
          var t10, r10;
          if (!this[K].locale || !(null == (r10 = this[K].options.nextConfig) || null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${e10}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[K].locale = e10;
        }
        get defaultLocale() {
          return this[K].defaultLocale;
        }
        get domainLocale() {
          return this[K].domainLocale;
        }
        get searchParams() {
          return this[K].url.searchParams;
        }
        get host() {
          return this[K].url.host;
        }
        set host(e10) {
          this[K].url.host = e10;
        }
        get hostname() {
          return this[K].url.hostname;
        }
        set hostname(e10) {
          this[K].url.hostname = e10;
        }
        get port() {
          return this[K].url.port;
        }
        set port(e10) {
          this[K].url.port = e10;
        }
        get protocol() {
          return this[K].url.protocol;
        }
        set protocol(e10) {
          this[K].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[K].url = W(e10), this.analyze();
        }
        get origin() {
          return this[K].url.origin;
        }
        get pathname() {
          return this[K].url.pathname;
        }
        set pathname(e10) {
          this[K].url.pathname = e10;
        }
        get hash() {
          return this[K].url.hash;
        }
        set hash(e10) {
          this[K].url.hash = e10;
        }
        get search() {
          return this[K].url.search;
        }
        set search(e10) {
          this[K].url.search = e10;
        }
        get password() {
          return this[K].url.password;
        }
        set password(e10) {
          this[K].url.password = e10;
        }
        get username() {
          return this[K].url.username;
        }
        set username(e10) {
          this[K].url.username = e10;
        }
        get basePath() {
          return this[K].basePath;
        }
        set basePath(e10) {
          this[K].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new B(String(this), this[K].options);
        }
      }
      var q = e.i(28042);
      let F = Symbol("internal request");
      class J extends Request {
        constructor(e10, t10 = {}) {
          const r10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          A(r10), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          const n10 = new B(r10, { headers: T(this.headers), nextConfig: t10.nextConfig });
          this[F] = { cookies: new q.RequestCookies(this.headers), nextUrl: n10, url: n10.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[F].cookies;
        }
        get nextUrl() {
          return this[F].nextUrl;
        }
        get page() {
          throw new y();
        }
        get ua() {
          throw new b();
        }
        get url() {
          return this[F].url;
        }
      }
      class V {
        static get(e10, t10, r10) {
          let n10 = Reflect.get(e10, t10, r10);
          return "function" == typeof n10 ? n10.bind(e10) : n10;
        }
        static set(e10, t10, r10, n10) {
          return Reflect.set(e10, t10, r10, n10);
        }
        static has(e10, t10) {
          return Reflect.has(e10, t10);
        }
        static deleteProperty(e10, t10) {
          return Reflect.deleteProperty(e10, t10);
        }
      }
      let z = Symbol("internal response"), G = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function X(e10, t10) {
        var r10;
        if (null == e10 || null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          let r11 = [];
          for (let [n10, i10] of e10.request.headers) t10.set("x-middleware-request-" + n10, i10), r11.push(n10);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class Y extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          const r10 = this.headers, n10 = new Proxy(new q.ResponseCookies(r10), { get(e11, n11, i10) {
            switch (n11) {
              case "delete":
              case "set":
                return (...i11) => {
                  let a10 = Reflect.apply(e11[n11], e11, i11), o10 = new Headers(r10);
                  return a10 instanceof q.ResponseCookies && r10.set("x-middleware-set-cookie", a10.getAll().map((e12) => (0, q.stringifyCookie)(e12)).join(",")), X(t10, o10), a10;
                };
              default:
                return V.get(e11, n11, i10);
            }
          } });
          this[z] = { cookies: n10, url: t10.url ? new B(t10.url, { headers: T(r10), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[z].cookies;
        }
        static json(e10, t10) {
          let r10 = Response.json(e10, t10);
          return new Y(r10.body, r10);
        }
        static redirect(e10, t10) {
          let r10 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!G.has(r10)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          let n10 = "object" == typeof t10 ? t10 : {}, i10 = new Headers(null == n10 ? void 0 : n10.headers);
          return i10.set("Location", A(e10)), new Y(null, { ...n10, headers: i10, status: r10 });
        }
        static rewrite(e10, t10) {
          let r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", A(e10)), X(t10, r10), new Y(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), X(e10, t10), new Y(null, { ...e10, headers: t10 });
        }
      }
      function Q(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, n10 = new URL(e10, t10), i10 = n10.origin === r10.origin;
        return { url: i10 ? n10.toString().slice(r10.origin.length) : n10.toString(), isRelative: i10 };
      }
      let Z = "next-router-prefetch", ee = ["rsc", "next-router-state-tree", Z, "next-hmr-refresh", "next-router-segment-prefetch"], et = "_rsc";
      function er(e10) {
        return e10.startsWith("/") ? e10 : `/${e10}`;
      }
      function en(e10) {
        return er(e10.split("/").reduce((e11, t10, r10, n10) => t10 ? "(" === t10[0] && t10.endsWith(")") || "@" === t10[0] || ("page" === t10 || "route" === t10) && r10 === n10.length - 1 ? e11 : `${e11}/${t10}` : e11, ""));
      }
      class ei extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new ei();
        }
      }
      class ea extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t10, r10, n10) {
            if ("symbol" == typeof r10) return V.get(t10, r10, n10);
            let i10 = r10.toLowerCase(), a10 = Object.keys(e10).find((e11) => e11.toLowerCase() === i10);
            if (void 0 !== a10) return V.get(t10, a10, n10);
          }, set(t10, r10, n10, i10) {
            if ("symbol" == typeof r10) return V.set(t10, r10, n10, i10);
            let a10 = r10.toLowerCase(), o10 = Object.keys(e10).find((e11) => e11.toLowerCase() === a10);
            return V.set(t10, o10 ?? r10, n10, i10);
          }, has(t10, r10) {
            if ("symbol" == typeof r10) return V.has(t10, r10);
            let n10 = r10.toLowerCase(), i10 = Object.keys(e10).find((e11) => e11.toLowerCase() === n10);
            return void 0 !== i10 && V.has(t10, i10);
          }, deleteProperty(t10, r10) {
            if ("symbol" == typeof r10) return V.deleteProperty(t10, r10);
            let n10 = r10.toLowerCase(), i10 = Object.keys(e10).find((e11) => e11.toLowerCase() === n10);
            return void 0 === i10 || V.deleteProperty(t10, i10);
          } });
        }
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "append":
              case "delete":
              case "set":
                return ei.callable;
              default:
                return V.get(e11, t10, r10);
            }
          } });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new ea(e10);
        }
        append(e10, t10) {
          let r10 = this.headers[e10];
          "string" == typeof r10 ? this.headers[e10] = [r10, t10] : Array.isArray(r10) ? r10.push(t10) : this.headers[e10] = t10;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t10 = this.headers[e10];
          return void 0 !== t10 ? this.merge(t10) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t10) {
          this.headers[e10] = t10;
        }
        forEach(e10, t10) {
          for (let [r10, n10] of this.entries()) e10.call(t10, n10, r10, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase(), r10 = this.get(t10);
            yield [t10, r10];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase();
            yield t10;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = this.get(e10);
            yield t10;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      e.i(7754);
      var eo = e.i(46478), eo = eo;
      class es extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new es();
        }
      }
      class el {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "clear":
              case "delete":
              case "set":
                return es.callable;
              default:
                return V.get(e11, t10, r10);
            }
          } });
        }
      }
      let ec = Symbol.for("next.mutated.cookies");
      class eu {
        static wrap(e10, t10) {
          let r10 = new q.ResponseCookies(new Headers());
          for (let t11 of e10.getAll()) r10.set(t11);
          let n10 = [], i10 = /* @__PURE__ */ new Set(), a10 = () => {
            let e11 = eo.workAsyncStorageInstance.getStore();
            if (e11 && (e11.pathWasRevalidated = 1), n10 = r10.getAll().filter((e12) => i10.has(e12.name)), t10) {
              let e12 = [];
              for (let t11 of n10) {
                let r11 = new q.ResponseCookies(new Headers());
                r11.set(t11), e12.push(r11.toString());
              }
              t10(e12);
            }
          }, o10 = new Proxy(r10, { get(e11, t11, r11) {
            switch (t11) {
              case ec:
                return n10;
              case "delete":
                return function(...t12) {
                  i10.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.delete(...t12), o10;
                  } finally {
                    a10();
                  }
                };
              case "set":
                return function(...t12) {
                  i10.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.set(...t12), o10;
                  } finally {
                    a10();
                  }
                };
              default:
                return V.get(e11, t11, r11);
            }
          } });
          return o10;
        }
      }
      function ed(e10) {
        return "action" === e10.phase;
      }
      function ep(e10, t10) {
        if (!ed(e10)) throw new es();
      }
      var eh = ((iN = eh || {}).handleRequest = "BaseServer.handleRequest", iN.run = "BaseServer.run", iN.pipe = "BaseServer.pipe", iN.getStaticHTML = "BaseServer.getStaticHTML", iN.render = "BaseServer.render", iN.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", iN.renderToResponse = "BaseServer.renderToResponse", iN.renderToHTML = "BaseServer.renderToHTML", iN.renderError = "BaseServer.renderError", iN.renderErrorToResponse = "BaseServer.renderErrorToResponse", iN.renderErrorToHTML = "BaseServer.renderErrorToHTML", iN.render404 = "BaseServer.render404", iN), ef = ((iU = ef || {}).loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", iU.loadComponents = "LoadComponents.loadComponents", iU), eg = ((iD = eg || {}).getRequestHandler = "NextServer.getRequestHandler", iD.getRequestHandlerWithMetadata = "NextServer.getRequestHandlerWithMetadata", iD.getServer = "NextServer.getServer", iD.getServerRequestHandler = "NextServer.getServerRequestHandler", iD.createServer = "createServer.createServer", iD), em = ((ij = em || {}).compression = "NextNodeServer.compression", ij.getBuildId = "NextNodeServer.getBuildId", ij.createComponentTree = "NextNodeServer.createComponentTree", ij.clientComponentLoading = "NextNodeServer.clientComponentLoading", ij.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", ij.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", ij.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", ij.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", ij.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", ij.sendRenderResult = "NextNodeServer.sendRenderResult", ij.proxyRequest = "NextNodeServer.proxyRequest", ij.runApi = "NextNodeServer.runApi", ij.render = "NextNodeServer.render", ij.renderHTML = "NextNodeServer.renderHTML", ij.imageOptimizer = "NextNodeServer.imageOptimizer", ij.getPagePath = "NextNodeServer.getPagePath", ij.getRoutesManifest = "NextNodeServer.getRoutesManifest", ij.findPageComponents = "NextNodeServer.findPageComponents", ij.getFontManifest = "NextNodeServer.getFontManifest", ij.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", ij.getRequestHandler = "NextNodeServer.getRequestHandler", ij.renderToHTML = "NextNodeServer.renderToHTML", ij.renderError = "NextNodeServer.renderError", ij.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", ij.render404 = "NextNodeServer.render404", ij.startResponse = "NextNodeServer.startResponse", ij.route = "route", ij.onProxyReq = "onProxyReq", ij.apiResolver = "apiResolver", ij.internalFetch = "internalFetch", ij), ey = ((iM = ey || {}).startServer = "startServer.startServer", iM), eb = ((i$ = eb || {}).getServerSideProps = "Render.getServerSideProps", i$.getStaticProps = "Render.getStaticProps", i$.renderToString = "Render.renderToString", i$.renderDocument = "Render.renderDocument", i$.createBodyResult = "Render.createBodyResult", i$), ew = ((iL = ew || {}).renderToString = "AppRender.renderToString", iL.renderToReadableStream = "AppRender.renderToReadableStream", iL.getBodyResult = "AppRender.getBodyResult", iL.fetch = "AppRender.fetch", iL), ev = ((iH = ev || {}).executeRoute = "Router.executeRoute", iH), e_ = ((iW = e_ || {}).runHandler = "Node.runHandler", iW), eE = ((iK = eE || {}).runHandler = "AppRouteRouteHandlers.runHandler", iK), eS = ((iB = eS || {}).generateMetadata = "ResolveMetadata.generateMetadata", iB.generateViewport = "ResolveMetadata.generateViewport", iB), ex = ((iq = ex || {}).execute = "Middleware.execute", iq);
      let ek = /* @__PURE__ */ new Set(["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"]), eT = /* @__PURE__ */ new Set(["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"]);
      function eA(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let eR = process.env.NEXT_OTEL_PERFORMANCE_PREFIX, { context: eC, propagation: eP, trace: eO, SpanStatusCode: eI, SpanKind: eN, ROOT_CONTEXT: eU } = t = e.r(59110);
      class eD extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let ej = (e10, t10) => {
        "object" == typeof t10 && null !== t10 && t10 instanceof eD && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && (e10.recordException(t10), e10.setAttribute("error.type", t10.name)), e10.setStatus({ code: eI.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, eM = /* @__PURE__ */ new Map(), e$ = t.createContextKey("next.rootSpanId"), eL = 0, eH = { set(e10, t10, r10) {
        e10.push({ key: t10, value: r10 });
      } }, eW = (l = new class e {
        getTracerInstance() {
          return eO.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return eC;
        }
        getTracePropagationData() {
          let e10 = eC.active(), t10 = [];
          return eP.inject(e10, t10, eH), t10;
        }
        getActiveScopeSpan() {
          return eO.getSpan(null == eC ? void 0 : eC.active());
        }
        withPropagatedContext(e10, t10, r10, n10 = false) {
          let i10 = eC.active();
          if (n10) {
            let n11 = eP.extract(eU, e10, r10);
            if (eO.getSpanContext(n11)) return eC.with(n11, t10);
            let a11 = eP.extract(i10, e10, r10);
            return eC.with(a11, t10);
          }
          if (eO.getSpanContext(i10)) return t10();
          let a10 = eP.extract(i10, e10, r10);
          return eC.with(a10, t10);
        }
        trace(...e10) {
          let [t10, r10, n10] = e10, { fn: i10, options: a10 } = "function" == typeof r10 ? { fn: r10, options: {} } : { fn: n10, options: { ...r10 } }, o10 = a10.spanName ?? t10;
          if (!ek.has(t10) && "1" !== process.env.NEXT_OTEL_VERBOSE || a10.hideSpan) return i10();
          let s10 = this.getSpanContext((null == a10 ? void 0 : a10.parentSpan) ?? this.getActiveScopeSpan());
          s10 || (s10 = (null == eC ? void 0 : eC.active()) ?? eU);
          let l2 = s10.getValue(e$), c2 = "number" != typeof l2 || !eM.has(l2), u2 = eL++;
          return a10.attributes = { "next.span_name": o10, "next.span_type": t10, ...a10.attributes }, eC.with(s10.setValue(e$, u2), () => this.getTracerInstance().startActiveSpan(o10, a10, (e11) => {
            let r11;
            eR && t10 && eT.has(t10) && (r11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0);
            let n11 = false, o11 = () => {
              !n11 && (n11 = true, eM.delete(u2), r11 && performance.measure(`${eR}:next-${(t10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: r11, end: performance.now() }));
            };
            if (c2 && eM.set(u2, new Map(Object.entries(a10.attributes ?? {}))), i10.length > 1) try {
              return i10(e11, (t11) => ej(e11, t11));
            } catch (t11) {
              throw ej(e11, t11), t11;
            } finally {
              o11();
            }
            try {
              let t11 = i10(e11);
              if (eA(t11)) return t11.then((t12) => (e11.end(), t12)).catch((t12) => {
                throw ej(e11, t12), t12;
              }).finally(o11);
              return e11.end(), o11(), t11;
            } catch (t11) {
              throw ej(e11, t11), o11(), t11;
            }
          }));
        }
        wrap(...e10) {
          let t10 = this, [r10, n10, i10] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return ek.has(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = n10;
            "function" == typeof e11 && "function" == typeof i10 && (e11 = e11.apply(this, arguments));
            let a10 = arguments.length - 1, o10 = arguments[a10];
            if ("function" != typeof o10) return t10.trace(r10, e11, () => i10.apply(this, arguments));
            {
              let n11 = t10.getContext().bind(eC.active(), o10);
              return t10.trace(r10, e11, (e12, t11) => (arguments[a10] = function(e13) {
                return null == t11 || t11(e13), n11.apply(this, arguments);
              }, i10.apply(this, arguments)));
            }
          } : i10;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, n10 = this.getSpanContext((null == r10 ? void 0 : r10.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t10, r10, n10);
        }
        getSpanContext(e10) {
          return e10 ? eO.setSpan(eC.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = eC.active().getValue(e$);
          return eM.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r10 = eC.active().getValue(e$), n10 = eM.get(r10);
          n10 && !n10.has(e10) && n10.set(e10, t10);
        }
        withSpan(e10, t10) {
          let r10 = eO.setSpan(eC.active(), e10);
          return eC.with(r10, t10);
        }
      }(), () => l), eK = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(eK);
      class eB {
        constructor(e10, t10, r10, n10) {
          var i10;
          const a10 = e10 && function(e11, t11) {
            let r11 = ea.from(e11.headers);
            return { isOnDemandRevalidate: r11.get(w) === t11.previewModeId, revalidateOnlyGenerated: r11.has("x-prerender-revalidate-if-generated") };
          }(t10, e10).isOnDemandRevalidate, o10 = null == (i10 = r10.get(eK)) ? void 0 : i10.value;
          this._isEnabled = !!(!a10 && o10 && e10 && o10 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = n10;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: eK, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: eK, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      function eq(e10, t10) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r10 = e10.headers["x-middleware-set-cookie"], n10 = new Headers();
          for (let e11 of k(r10)) n10.append("set-cookie", e11);
          for (let e11 of new q.ResponseCookies(n10).getAll()) t10.set(e11);
        }
      }
      var eF = e.i(53835), eJ = e.i(9939), eJ = eJ, eV = e.i(99734), ez = e.i(25753), eo = eo, eG = e.i(51615);
      process.env.NEXT_PRIVATE_DEBUG_CACHE, Symbol.for("@next/cache-handlers");
      let eX = Symbol.for("@next/cache-handlers-map"), eY = Symbol.for("@next/cache-handlers-set"), eQ = globalThis;
      function eZ() {
        if (eQ[eX]) return eQ[eX].entries();
      }
      async function e0(e10, t10) {
        if (!e10) return t10();
        let r10 = e1(e10);
        try {
          return await t10();
        } finally {
          var n10, i10, a10, o10;
          let t11, s10, l2, c2, u2 = (n10 = r10, i10 = e1(e10), t11 = new Set(n10.pendingRevalidatedTags.map((e11) => {
            let t12 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return `${e11.tag}:${t12}`;
          })), s10 = new Set(n10.pendingRevalidateWrites), { pendingRevalidatedTags: i10.pendingRevalidatedTags.filter((e11) => {
            let r11 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return !t11.has(`${e11.tag}:${r11}`);
          }), pendingRevalidates: Object.fromEntries(Object.entries(i10.pendingRevalidates).filter(([e11]) => !(e11 in n10.pendingRevalidates))), pendingRevalidateWrites: i10.pendingRevalidateWrites.filter((e11) => !s10.has(e11)) });
          await (a10 = e10, l2 = [], (c2 = (null == (o10 = u2) ? void 0 : o10.pendingRevalidatedTags) ?? a10.pendingRevalidatedTags ?? []).length > 0 && l2.push(e2(c2, a10.incrementalCache, a10)), l2.push(...Object.values((null == o10 ? void 0 : o10.pendingRevalidates) ?? a10.pendingRevalidates ?? {})), l2.push(...(null == o10 ? void 0 : o10.pendingRevalidateWrites) ?? a10.pendingRevalidateWrites ?? []), 0 !== l2.length && Promise.all(l2).then(() => void 0));
        }
      }
      function e1(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? [...e10.pendingRevalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function e2(e10, t10, r10) {
        if (0 === e10.length) return;
        let n10 = function() {
          if (eQ[eY]) return eQ[eY].values();
        }(), i10 = [], a10 = /* @__PURE__ */ new Map();
        for (let t11 of e10) {
          let e11, r11 = t11.profile;
          for (let [t12] of a10) if ("string" == typeof t12 && "string" == typeof r11 && t12 === r11 || "object" == typeof t12 && "object" == typeof r11 && JSON.stringify(t12) === JSON.stringify(r11) || t12 === r11) {
            e11 = t12;
            break;
          }
          let n11 = e11 || r11;
          a10.has(n11) || a10.set(n11, []), a10.get(n11).push(t11.tag);
        }
        for (let [e11, s10] of a10) {
          let a11;
          if (e11) {
            let t11;
            if ("object" == typeof e11) t11 = e11;
            else if ("string" == typeof e11) {
              var o10;
              if (!(t11 = null == r10 || null == (o10 = r10.cacheLifeProfiles) ? void 0 : o10[e11])) throw Object.defineProperty(Error(`Invalid profile provided "${e11}" must be configured under cacheLife in next.config or be "max"`), "__NEXT_ERROR_CODE", { value: "E873", enumerable: false, configurable: true });
            }
            t11 && (a11 = { expire: t11.expire });
          }
          for (let t11 of n10 || []) e11 ? i10.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, s10, a11)) : i10.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, s10));
          t10 && i10.push(t10.revalidateTag(s10, a11));
        }
        await Promise.all(i10);
      }
      var e3 = e.i(90044), eJ = eJ;
      let e4 = (0, e3.createAsyncLocalStorage)();
      class e5 {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r10 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r10, this.callbackQueue = new eV.default(), this.callbackQueue.pause();
        }
        after(e10) {
          if (eA(e10)) this.waitUntil || e6(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" == typeof e10) this.addCallback(e10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addCallback(e10) {
          this.waitUntil || e6();
          let t10 = eJ.workUnitAsyncStorageInstance.getStore();
          t10 && this.workUnitStores.add(t10);
          let r10 = e4.getStore(), n10 = r10 ? r10.rootTaskSpawnPhase : null == t10 ? void 0 : t10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let i10 = (0, e3.bindSnapshot)(async () => {
            try {
              await e4.run({ rootTaskSpawnPhase: n10 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          });
          this.callbackQueue.add(i10);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let e11 of this.workUnitStores) e11.phase = "after";
          let e10 = eo.workAsyncStorageInstance.getStore();
          if (!e10) throw Object.defineProperty(new ez.InvariantError("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return e0(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(Object.defineProperty(new ez.InvariantError("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function e6() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function e8(e10) {
        let t10, r10 = { then: (n10, i10) => (t10 || (t10 = Promise.resolve(e10())), t10.then((e11) => {
          r10.value = e11;
        }).catch(() => {
        }), t10.then(n10, i10)) };
        return r10;
      }
      var eo = eo;
      class e9 {
        onClose(e10) {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", { value: "E365", enumerable: false, configurable: true });
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", { value: "E229", enumerable: false, configurable: true });
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function e7() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let te = Symbol.for("@next/request-context");
      async function tt(e10, t10, r10) {
        let n10 = /* @__PURE__ */ new Set();
        for (let t11 of ((e11) => {
          let t12 = ["/layout"];
          if (e11.startsWith("/")) {
            let r11 = e11.split("/");
            for (let e12 = 1; e12 < r11.length + 1; e12++) {
              let n11 = r11.slice(0, e12).join("/");
              n11 && (n11.endsWith("/page") || n11.endsWith("/route") || (n11 = `${n11}${!n11.endsWith("/") ? "/" : ""}layout`), t12.push(n11));
            }
          }
          return t12;
        })(e10)) t11 = `${S}${t11}`, n10.add(t11);
        if (t10 && (!r10 || 0 === r10.size)) {
          let e11 = `${S}${t10}`;
          n10.add(e11);
        }
        n10.has(`${S}/`) && n10.add(`${S}/index`), n10.has(`${S}/index`) && n10.add(`${S}/`);
        let i10 = Array.from(n10);
        return { tags: i10, expirationsByCacheKind: function(e11) {
          let t11 = /* @__PURE__ */ new Map(), r11 = eZ();
          if (r11) for (let [n11, i11] of r11) "getExpiration" in i11 && t11.set(n11, e8(async () => i11.getExpiration(e11)));
          return t11;
        }(i10) };
      }
      let tr = Symbol.for("NextInternalRequestMeta");
      class tn extends J {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new m({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new m({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new m({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      let ti = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, ta = (e10, t10) => eW().withPropagatedContext(e10.headers, t10, ti), to = false;
      async function ts(t10) {
        var r10, n10, i10, a10, o10;
        let s10, l2, c2, u2, d2;
        !function() {
          if (!to && (to = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: t11, wrapRequestHandler: r11 } = e.r(94165);
            t11(), ta = r11(ta);
          }
        }(), await f();
        let p2 = void 0 !== globalThis.__BUILD_MANIFEST;
        t10.request.url = t10.request.url.replace(/\.rsc($|\?)/, "$1");
        let h2 = t10.bypassNextUrl ? new URL(t10.request.url) : new B(t10.request.url, { headers: t10.request.headers, nextConfig: t10.request.nextConfig });
        for (let e10 of [...h2.searchParams.keys()]) {
          let t11 = h2.searchParams.getAll(e10), r11 = function(e11) {
            for (let t12 of ["nxtP", "nxtI"]) if (e11 !== t12 && e11.startsWith(t12)) return e11.substring(t12.length);
            return null;
          }(e10);
          if (r11) {
            for (let e11 of (h2.searchParams.delete(r11), t11)) h2.searchParams.append(r11, e11);
            h2.searchParams.delete(e10);
          }
        }
        let g2 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in h2 && (g2 = h2.buildId || "", h2.buildId = "");
        let m2 = function(e10) {
          let t11 = new Headers();
          for (let [r11, n11] of Object.entries(e10)) for (let e11 of Array.isArray(n11) ? n11 : [n11]) void 0 !== e11 && ("number" == typeof e11 && (e11 = e11.toString()), t11.append(r11, e11));
          return t11;
        }(t10.request.headers), y2 = m2.has("x-nextjs-data"), b2 = "1" === m2.get("rsc");
        y2 && "/index" === h2.pathname && (h2.pathname = "/");
        let w2 = /* @__PURE__ */ new Map();
        if (!p2) for (let e10 of ee) {
          let t11 = m2.get(e10);
          null !== t11 && (w2.set(e10, t11), m2.delete(e10));
        }
        let v2 = h2.searchParams.get(et), _2 = new tn({ page: t10.page, input: ((u2 = (c2 = "string" == typeof h2) ? new URL(h2) : h2).searchParams.delete(et), c2 ? u2.toString() : u2).toString(), init: { body: t10.request.body, headers: m2, method: t10.request.method, nextConfig: t10.request.nextConfig, signal: t10.request.signal } });
        t10.request.requestMeta && (o10 = t10.request.requestMeta, _2[tr] = o10), y2 && Object.defineProperty(_2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && t10.IncrementalCache && (globalThis.__incrementalCache = new t10.IncrementalCache({ CurCacheHandler: t10.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: t10.request.headers, getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: e7() }) }));
        let E2 = t10.request.waitUntil ?? (null == (r10 = null == (d2 = globalThis[te]) ? void 0 : d2.get()) ? void 0 : r10.waitUntil), S2 = new I({ request: _2, page: t10.page, context: E2 ? { waitUntil: E2 } : void 0 });
        if ((s10 = await ta(_2, () => {
          if ("/middleware" === t10.page || "/src/middleware" === t10.page || "/proxy" === t10.page || "/src/proxy" === t10.page) {
            let e10 = S2.waitUntil.bind(S2), r11 = new e9();
            return eW().trace(ex.execute, { spanName: `middleware ${_2.method}`, attributes: { "http.target": _2.nextUrl.pathname, "http.method": _2.method } }, async () => {
              try {
                var n11, i11, a11, o11, s11, c3;
                let u3 = e7(), d3 = await tt("/", _2.nextUrl.pathname, null), p3 = (s11 = _2.nextUrl, c3 = (e11) => {
                  l2 = e11;
                }, function(e11, t11, r12, n12, i12, a12, o12, s12, l3, c4) {
                  function u4(e12) {
                    r12 && r12.setHeader("Set-Cookie", e12);
                  }
                  let d4 = {};
                  return { type: "request", phase: e11, implicitTags: a12, url: { pathname: n12.pathname, search: n12.search ?? "" }, rootParams: i12, get headers() {
                    return d4.headers || (d4.headers = function(e12) {
                      let t12 = ea.from(e12);
                      for (let e13 of ee) t12.delete(e13);
                      return ea.seal(t12);
                    }(t11.headers)), d4.headers;
                  }, get cookies() {
                    if (!d4.cookies) {
                      let e12 = new q.RequestCookies(ea.from(t11.headers));
                      eq(t11, e12), d4.cookies = el.seal(e12);
                    }
                    return d4.cookies;
                  }, set cookies(value) {
                    d4.cookies = value;
                  }, get mutableCookies() {
                    if (!d4.mutableCookies) {
                      var p4, h4;
                      let e12, n13 = (p4 = t11.headers, h4 = o12 || (r12 ? u4 : void 0), e12 = new q.RequestCookies(ea.from(p4)), eu.wrap(e12, h4));
                      eq(t11, n13), d4.mutableCookies = n13;
                    }
                    return d4.mutableCookies;
                  }, get userspaceMutableCookies() {
                    if (!d4.userspaceMutableCookies) {
                      var f2;
                      let e12;
                      f2 = this, d4.userspaceMutableCookies = e12 = new Proxy(f2.mutableCookies, { get(t12, r13, n13) {
                        switch (r13) {
                          case "delete":
                            return function(...r14) {
                              return ep(f2, "cookies().delete"), t12.delete(...r14), e12;
                            };
                          case "set":
                            return function(...r14) {
                              return ep(f2, "cookies().set"), t12.set(...r14), e12;
                            };
                          default:
                            return V.get(t12, r13, n13);
                        }
                      } });
                    }
                    return d4.userspaceMutableCookies;
                  }, get draftMode() {
                    return d4.draftMode || (d4.draftMode = new eB(s12, t11, this.cookies, this.mutableCookies)), d4.draftMode;
                  }, renderResumeDataCache: null, isHmrRefresh: l3, serverComponentsHmrCache: c4 || globalThis.__serverComponentsHmrCache, fallbackParams: null };
                }("action", _2, void 0, s11, {}, d3, c3, u3, false, void 0)), h3 = function({ page: e11, renderOpts: t11, isPrefetchRequest: r12, buildId: n12, deploymentId: i12, previouslyRevalidatedTags: a12, nonce: o12 }) {
                  let s12 = !t11.shouldWaitOnAllReady && !t11.supportsDynamicResponse && !t11.isDraftMode && !t11.isPossibleServerAction, l3 = s12 && (!!process.env.NEXT_DEBUG_BUILD || "1" === process.env.NEXT_SSG_FETCH_METRICS), c4 = { isStaticGeneration: s12, page: e11, route: en(e11), incrementalCache: t11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: t11.cacheLifeProfiles, isBuildTimePrerendering: t11.isBuildTimePrerendering, fetchCache: t11.fetchCache, isOnDemandRevalidate: t11.isOnDemandRevalidate, isDraftMode: t11.isDraftMode, isPrefetchRequest: r12, buildId: n12, deploymentId: i12, reactLoadableManifest: (null == t11 ? void 0 : t11.reactLoadableManifest) || {}, assetPrefix: (null == t11 ? void 0 : t11.assetPrefix) || "", nonce: o12, afterContext: function(e12) {
                    let { waitUntil: t12, onClose: r13, onAfterTaskError: n13 } = e12;
                    return new e5({ waitUntil: t12, onClose: r13, onTaskError: n13 });
                  }(t11), cacheComponentsEnabled: t11.cacheComponents, previouslyRevalidatedTags: a12, refreshTagsByCacheKind: function() {
                    let e12 = /* @__PURE__ */ new Map(), t12 = eZ();
                    if (t12) for (let [r13, n13] of t12) "refreshTags" in n13 && e12.set(r13, e8(async () => n13.refreshTags()));
                    return e12;
                  }(), runInCleanSnapshot: (0, e3.createSnapshot)(), shouldTrackFetchMetrics: l3, reactServerErrorsByDigest: /* @__PURE__ */ new Map() };
                  return t11.store = c4, c4;
                }({ page: "/", renderOpts: { cacheLifeProfiles: null == (i11 = t10.request.nextConfig) || null == (n11 = i11.experimental) ? void 0 : n11.cacheLife, cacheComponents: false, experimental: { isRoutePPREnabled: false, authInterrupts: !!(null == (o11 = t10.request.nextConfig) || null == (a11 = o11.experimental) ? void 0 : a11.authInterrupts) }, supportsDynamicResponse: true, waitUntil: e10, onClose: r11.onClose.bind(r11), onAfterTaskError: void 0 }, isPrefetchRequest: "1" === _2.headers.get(Z), buildId: g2 ?? "", deploymentId: false, previouslyRevalidatedTags: [] });
                return await eo.workAsyncStorageInstance.run(h3, () => eJ.workUnitAsyncStorageInstance.run(p3, t10.handler, _2, S2));
              } finally {
                setTimeout(() => {
                  r11.dispatchClose();
                }, 0);
              }
            });
          }
          return t10.handler(_2, S2);
        })) && !(s10 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        s10 && l2 && s10.headers.set("set-cookie", l2);
        let x2 = null == s10 ? void 0 : s10.headers.get("x-middleware-rewrite");
        if (s10 && x2 && (b2 || !p2)) {
          let e10 = new B(x2, { forceLocale: true, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          p2 || e10.host !== _2.nextUrl.host || (e10.buildId = g2 || e10.buildId, s10.headers.set("x-middleware-rewrite", String(e10)));
          let { url: r11, isRelative: o11 } = Q(e10.toString(), h2.toString());
          !p2 && y2 && s10.headers.set("x-nextjs-rewrite", r11);
          let l3 = !o11 && (null == (a10 = t10.request.nextConfig) || null == (i10 = a10.experimental) || null == (n10 = i10.clientParamParsingOrigins) ? void 0 : n10.some((t11) => new RegExp(t11).test(e10.origin)));
          b2 && (o11 || l3) && (h2.pathname !== e10.pathname && s10.headers.set("x-nextjs-rewritten-path", e10.pathname), h2.search !== e10.search && s10.headers.set("x-nextjs-rewritten-query", e10.search.slice(1)));
        }
        if (s10 && x2 && b2 && v2) {
          let e10 = new URL(x2);
          e10.searchParams.has(et) || (e10.searchParams.set(et, v2), s10.headers.set("x-middleware-rewrite", e10.toString()));
        }
        let k2 = null == s10 ? void 0 : s10.headers.get("Location");
        if (s10 && k2 && !p2) {
          let e10 = new B(k2, { forceLocale: false, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          s10 = new Response(s10.body, s10), e10.host === h2.host && (e10.buildId = g2 || e10.buildId, s10.headers.set("Location", Q(e10, h2).url)), y2 && (s10.headers.delete("Location"), s10.headers.set("x-nextjs-redirect", Q(e10.toString(), h2.toString()).url));
        }
        let T2 = s10 || Y.next(), A2 = T2.headers.get("x-middleware-override-headers"), R2 = [];
        if (A2) {
          for (let [e10, t11] of w2) T2.headers.set(`x-middleware-request-${e10}`, t11), R2.push(e10);
          R2.length > 0 && T2.headers.set("x-middleware-override-headers", A2 + "," + R2.join(","));
        }
        return { response: T2, waitUntil: ("internal" === S2[P].kind ? Promise.all(S2[P].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: _2.fetchMetrics };
      }
      class tl {
        constructor() {
          let e10, t10;
          this.promise = new Promise((r10, n10) => {
            e10 = r10, t10 = n10;
          }), this.resolve = e10, this.reject = t10;
        }
      }
      class tc {
        constructor(e10, t10, r10) {
          this.prev = null, this.next = null, this.key = e10, this.data = t10, this.size = r10;
        }
      }
      class tu {
        constructor() {
          this.prev = null, this.next = null;
        }
      }
      class td {
        constructor(e10, t10, r10) {
          this.cache = /* @__PURE__ */ new Map(), this.totalSize = 0, this.maxSize = e10, this.calculateSize = t10, this.onEvict = r10, this.head = new tu(), this.tail = new tu(), this.head.next = this.tail, this.tail.prev = this.head;
        }
        addToHead(e10) {
          e10.prev = this.head, e10.next = this.head.next, this.head.next.prev = e10, this.head.next = e10;
        }
        removeNode(e10) {
          e10.prev.next = e10.next, e10.next.prev = e10.prev;
        }
        moveToHead(e10) {
          this.removeNode(e10), this.addToHead(e10);
        }
        removeTail() {
          let e10 = this.tail.prev;
          return this.removeNode(e10), e10;
        }
        set(e10, t10) {
          let r10 = (null == this.calculateSize ? void 0 : this.calculateSize.call(this, t10)) ?? 1;
          if (r10 <= 0) throw Object.defineProperty(Error(`LRUCache: calculateSize returned ${r10}, but size must be > 0. Items with size 0 would never be evicted, causing unbounded cache growth.`), "__NEXT_ERROR_CODE", { value: "E1045", enumerable: false, configurable: true });
          if (r10 > this.maxSize) return console.warn("Single item size exceeds maxSize"), false;
          let n10 = this.cache.get(e10);
          if (n10) n10.data = t10, this.totalSize = this.totalSize - n10.size + r10, n10.size = r10, this.moveToHead(n10);
          else {
            let n11 = new tc(e10, t10, r10);
            this.cache.set(e10, n11), this.addToHead(n11), this.totalSize += r10;
          }
          for (; this.totalSize > this.maxSize && this.cache.size > 0; ) {
            let e11 = this.removeTail();
            this.cache.delete(e11.key), this.totalSize -= e11.size, null == this.onEvict || this.onEvict.call(this, e11.key, e11.data);
          }
          return true;
        }
        has(e10) {
          return this.cache.has(e10);
        }
        get(e10) {
          let t10 = this.cache.get(e10);
          if (t10) return this.moveToHead(t10), t10.data;
        }
        *[Symbol.iterator]() {
          let e10 = this.head.next;
          for (; e10 && e10 !== this.tail; ) {
            let t10 = e10;
            yield [t10.key, t10.data], e10 = e10.next;
          }
        }
        remove(e10) {
          let t10 = this.cache.get(e10);
          t10 && (this.removeNode(t10), this.cache.delete(e10), this.totalSize -= t10.size);
        }
        get size() {
          return this.cache.size;
        }
        get currentSize() {
          return this.totalSize;
        }
      }
      let { env: tp, stdout: th } = (null == (iV = globalThis) ? void 0 : iV.process) ?? {}, tf = tp && !tp.NO_COLOR && (tp.FORCE_COLOR || (null == th ? void 0 : th.isTTY) && !tp.CI && "dumb" !== tp.TERM), tg = (e10, t10, r10, n10) => {
        let i10 = e10.substring(0, n10) + r10, a10 = e10.substring(n10 + t10.length), o10 = a10.indexOf(t10);
        return ~o10 ? i10 + tg(a10, t10, r10, o10) : i10 + a10;
      }, tm = (e10, t10, r10 = e10) => tf ? (n10) => {
        let i10 = "" + n10, a10 = i10.indexOf(t10, e10.length);
        return ~a10 ? e10 + tg(i10, t10, r10, a10) + t10 : e10 + i10 + t10;
      } : String, ty = tm("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m");
      tm("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"), tm("\x1B[3m", "\x1B[23m"), tm("\x1B[4m", "\x1B[24m"), tm("\x1B[7m", "\x1B[27m"), tm("\x1B[8m", "\x1B[28m"), tm("\x1B[9m", "\x1B[29m"), tm("\x1B[30m", "\x1B[39m");
      let tb = tm("\x1B[31m", "\x1B[39m"), tw = tm("\x1B[32m", "\x1B[39m"), tv = tm("\x1B[33m", "\x1B[39m");
      tm("\x1B[34m", "\x1B[39m");
      let t_ = tm("\x1B[35m", "\x1B[39m");
      tm("\x1B[38;2;173;127;168m", "\x1B[39m"), tm("\x1B[36m", "\x1B[39m");
      let tE = tm("\x1B[37m", "\x1B[39m");
      tm("\x1B[90m", "\x1B[39m"), tm("\x1B[40m", "\x1B[49m"), tm("\x1B[41m", "\x1B[49m"), tm("\x1B[42m", "\x1B[49m"), tm("\x1B[43m", "\x1B[49m"), tm("\x1B[44m", "\x1B[49m"), tm("\x1B[45m", "\x1B[49m"), tm("\x1B[46m", "\x1B[49m"), tm("\x1B[47m", "\x1B[49m"), tE(ty("\u25CB")), tb(ty("\u2A2F")), tv(ty("\u26A0")), tE(ty(" ")), tw(ty("\u2713")), t_(ty("\xBB")), new td(1e4, (e10) => e10.length), new td(1e4, (e10) => e10.length);
      var tS = ((iF = {}).APP_PAGE = "APP_PAGE", iF.APP_ROUTE = "APP_ROUTE", iF.PAGES = "PAGES", iF.FETCH = "FETCH", iF.REDIRECT = "REDIRECT", iF.IMAGE = "IMAGE", iF), tx = ((iJ = {}).APP_PAGE = "APP_PAGE", iJ.APP_ROUTE = "APP_ROUTE", iJ.PAGES = "PAGES", iJ.FETCH = "FETCH", iJ.IMAGE = "IMAGE", iJ);
      function tk() {
      }
      new TextEncoder();
      let tT = new TextEncoder();
      function tA(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(tT.encode(e10)), t10.close();
        } });
      }
      function tR(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(e10), t10.close();
        } });
      }
      async function tC(e10, t10) {
        let r10 = new TextDecoder("utf-8", { fatal: true }), n10 = "";
        for await (let i10 of e10) {
          if (null == t10 ? void 0 : t10.aborted) return n10;
          n10 += r10.decode(i10, { stream: true });
        }
        return n10 + r10.decode();
      }
      let tP = "ResponseAborted";
      class tO extends Error {
        constructor(...e10) {
          super(...e10), this.name = tP;
        }
      }
      let tI = 0, tN = 0, tU = 0;
      function tD(e10) {
        return (null == e10 ? void 0 : e10.name) === "AbortError" || (null == e10 ? void 0 : e10.name) === tP;
      }
      async function tj(e10, t10, r10) {
        try {
          let n10, { errored: i10, destroyed: a10 } = t10;
          if (i10 || a10) return;
          let o10 = (n10 = new AbortController(), t10.once("close", () => {
            t10.writableFinished || n10.abort(new tO());
          }), n10), s10 = function(e11, t11) {
            let r11 = false, n11 = new tl();
            function i11() {
              n11.resolve();
            }
            e11.on("drain", i11), e11.once("close", () => {
              e11.off("drain", i11), n11.resolve();
            });
            let a11 = new tl();
            return e11.once("finish", () => {
              a11.resolve();
            }), new WritableStream({ write: async (t12) => {
              if (!r11) {
                if (r11 = true, "performance" in globalThis && process.env.NEXT_OTEL_PERFORMANCE_PREFIX) {
                  let e12 = function(e13 = {}) {
                    let t13 = 0 === tI ? void 0 : { clientComponentLoadStart: tI, clientComponentLoadTimes: tN, clientComponentLoadCount: tU };
                    return e13.reset && (tI = 0, tN = 0, tU = 0), t13;
                  }();
                  e12 && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`, { start: e12.clientComponentLoadStart, end: e12.clientComponentLoadStart + e12.clientComponentLoadTimes });
                }
                e11.flushHeaders(), eW().trace(em.startResponse, { spanName: "start response" }, () => void 0);
              }
              try {
                let r12 = e11.write(t12);
                "flush" in e11 && "function" == typeof e11.flush && e11.flush(), r12 || (await n11.promise, n11 = new tl());
              } catch (t13) {
                throw e11.end(), Object.defineProperty(Error("failed to write chunk to response", { cause: t13 }), "__NEXT_ERROR_CODE", { value: "E321", enumerable: false, configurable: true });
              }
            }, abort: (t12) => {
              e11.writableFinished || e11.destroy(t12);
            }, close: async () => {
              if (t11 && await t11, !e11.writableFinished) return e11.end(), a11.promise;
            } });
          }(t10, r10);
          await e10.pipeTo(s10, { signal: o10.signal });
        } catch (e11) {
          if (tD(e11)) return;
          throw Object.defineProperty(Error("failed to pipe response", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E180", enumerable: false, configurable: true });
        }
      }
      class tM {
        static #e = this.EMPTY = new tM(null, { metadata: {}, contentType: null });
        static fromStatic(e10, t10) {
          return new tM(e10, { metadata: {}, contentType: t10 });
        }
        constructor(e10, { contentType: t10, waitUntil: r10, metadata: n10 }) {
          this.response = e10, this.contentType = t10, this.metadata = n10, this.waitUntil = r10;
        }
        assignMetadata(e10) {
          Object.assign(this.metadata, e10);
        }
        get isNull() {
          return null === this.response;
        }
        get isDynamic() {
          return "string" != typeof this.response;
        }
        toUnchunkedString(e10 = false) {
          if (null === this.response) return "";
          if ("string" != typeof this.response) {
            if (!e10) throw Object.defineProperty(new ez.InvariantError("dynamic responses cannot be unchunked. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E732", enumerable: false, configurable: true });
            return tC(this.readable);
          }
          return this.response;
        }
        get readable() {
          return null === this.response ? new ReadableStream({ start(e10) {
            e10.close();
          } }) : "string" == typeof this.response ? tA(this.response) : eG.Buffer.isBuffer(this.response) ? tR(this.response) : Array.isArray(this.response) ? function(...e10) {
            if (0 === e10.length) return new ReadableStream({ start(e11) {
              e11.close();
            } });
            if (1 === e10.length) return e10[0];
            let { readable: t10, writable: r10 } = new TransformStream(), n10 = e10[0].pipeTo(r10, { preventClose: true }), i10 = 1;
            for (; i10 < e10.length - 1; i10++) {
              let t11 = e10[i10];
              n10 = n10.then(() => t11.pipeTo(r10, { preventClose: true }));
            }
            let a10 = e10[i10];
            return (n10 = n10.then(() => a10.pipeTo(r10))).catch(tk), t10;
          }(...this.response) : this.response;
        }
        coerce() {
          return null === this.response ? [] : "string" == typeof this.response ? [tA(this.response)] : Array.isArray(this.response) ? this.response : eG.Buffer.isBuffer(this.response) ? [tR(this.response)] : [this.response];
        }
        pipeThrough(e10) {
          this.response = this.readable.pipeThrough(e10);
        }
        unshift(e10) {
          this.response = this.coerce(), this.response.unshift(e10);
        }
        push(e10) {
          this.response = this.coerce(), this.response.push(e10);
        }
        async pipeTo(e10) {
          try {
            await this.readable.pipeTo(e10, { preventClose: true }), this.waitUntil && await this.waitUntil, await e10.close();
          } catch (t10) {
            if (tD(t10)) return void await e10.abort(t10);
            throw t10;
          }
        }
        async pipeToNodeResponse(e10) {
          await tj(this.readable, e10, this.waitUntil);
        }
      }
      function t$(e10, t10) {
        if (!e10) return t10;
        let r10 = parseInt(e10, 10);
        return Number.isFinite(r10) && r10 > 0 ? r10 : t10;
      }
      t$(process.env.NEXT_PRIVATE_RESPONSE_CACHE_TTL, 1e4), t$(process.env.NEXT_PRIVATE_RESPONSE_CACHE_MAX_SIZE, 150);
      var tL = e.i(68886);
      let tH = /* @__PURE__ */ new Map(), tW = (e10, t10) => {
        for (let r10 of e10) {
          let e11 = tH.get(r10), n10 = null == e11 ? void 0 : e11.expired;
          if ("number" == typeof n10 && n10 <= Date.now() && n10 > t10) return true;
        }
        return false;
      }, tK = (e10, t10) => {
        for (let r10 of e10) {
          let e11 = tH.get(r10), n10 = (null == e11 ? void 0 : e11.stale) ?? 0;
          if ("number" == typeof n10 && n10 > t10) return true;
        }
        return false;
      };
      class tB {
        constructor(e10) {
          this.fs = e10, this.tasks = [];
        }
        findOrCreateTask(e10) {
          for (let t11 of this.tasks) if (t11[0] === e10) return t11;
          let t10 = this.fs.mkdir(e10);
          t10.catch(() => {
          });
          let r10 = [e10, t10, []];
          return this.tasks.push(r10), r10;
        }
        append(e10, t10) {
          let r10 = this.findOrCreateTask(tL.default.dirname(e10)), n10 = r10[1].then(() => this.fs.writeFile(e10, t10));
          n10.catch(() => {
          }), r10[2].push(n10);
        }
        wait() {
          return Promise.all(this.tasks.flatMap((e10) => e10[2]));
        }
      }
      function tq(e10) {
        return (null == e10 ? void 0 : e10.length) || 0;
      }
      class tF {
        static #e = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        constructor(e10) {
          this.fs = e10.fs, this.flushToDisk = e10.flushToDisk, this.serverDistDir = e10.serverDistDir, this.revalidatedTags = e10.revalidatedTags, e10.maxMemoryCacheSize ? tF.memoryCache ? tF.debug && console.log("FileSystemCache: memory store already initialized") : (tF.debug && console.log("FileSystemCache: using memory store for fetch cache"), tF.memoryCache = function(e11) {
            return r || (r = new td(e11, function({ value: e12 }) {
              var t10, r10;
              if (!e12) return 25;
              if (e12.kind === tS.REDIRECT) return JSON.stringify(e12.props).length;
              if (e12.kind === tS.IMAGE) throw Object.defineProperty(Error("invariant image should not be incremental-cache"), "__NEXT_ERROR_CODE", { value: "E501", enumerable: false, configurable: true });
              if (e12.kind === tS.FETCH) return JSON.stringify(e12.data || "").length;
              if (e12.kind === tS.APP_ROUTE) return e12.body.length;
              return e12.kind === tS.APP_PAGE ? Math.max(1, e12.html.length + tq(e12.rscData) + ((null == (r10 = e12.postponed) ? void 0 : r10.length) || 0) + function(e13) {
                if (!e13) return 0;
                let t11 = 0;
                for (let [r11, n10] of e13) t11 += r11.length + tq(n10);
                return t11;
              }(e12.segmentData)) : e12.html.length + ((null == (t10 = JSON.stringify(e12.pageData)) ? void 0 : t10.length) || 0);
            })), r;
          }(e10.maxMemoryCacheSize)) : tF.debug && console.log("FileSystemCache: not using memory store for fetch cache");
        }
        resetRequestCache() {
        }
        async revalidateTag(e10, t10) {
          if (e10 = "string" == typeof e10 ? [e10] : e10, tF.debug && console.log("FileSystemCache: revalidateTag", e10, t10), 0 === e10.length) return;
          let r10 = Date.now();
          for (let n10 of e10) {
            let e11 = tH.get(n10) || {};
            if (t10) {
              let i10 = { ...e11 };
              i10.stale = r10, void 0 !== t10.expire && (i10.expired = r10 + 1e3 * t10.expire), tH.set(n10, i10);
            } else tH.set(n10, { ...e11, expired: r10 });
          }
        }
        async get(...e10) {
          var t10, r10, n10, i10, a10, o10;
          let [s10, l2] = e10, { kind: c2 } = l2, u2 = null == (t10 = tF.memoryCache) ? void 0 : t10.get(s10);
          if (tF.debug && (c2 === tx.FETCH ? console.log("FileSystemCache: get", s10, l2.tags, c2, !!u2) : console.log("FileSystemCache: get", s10, c2, !!u2)), (null == u2 || null == (r10 = u2.value) ? void 0 : r10.kind) === tS.APP_PAGE || (null == u2 || null == (n10 = u2.value) ? void 0 : n10.kind) === tS.APP_ROUTE || (null == u2 || null == (i10 = u2.value) ? void 0 : i10.kind) === tS.PAGES) {
            let e11 = null == (o10 = u2.value.headers) ? void 0 : o10[_];
            if ("string" == typeof e11) {
              let t11 = e11.split(",");
              if (t11.length > 0 && tW(t11, u2.lastModified)) return tF.debug && console.log("FileSystemCache: expired tags", t11), null;
            }
          } else if ((null == u2 || null == (a10 = u2.value) ? void 0 : a10.kind) === tS.FETCH) {
            let e11 = l2.kind === tx.FETCH ? [...l2.tags || [], ...l2.softTags || []] : [];
            if (e11.some((e12) => this.revalidatedTags.includes(e12))) return tF.debug && console.log("FileSystemCache: was revalidated", e11), null;
            if (tW(e11, u2.lastModified)) return tF.debug && console.log("FileSystemCache: expired tags", e11), null;
          }
          return u2 ?? null;
        }
        async set(e10, t10, r10) {
          var n10;
          if (null == (n10 = tF.memoryCache) || n10.set(e10, { value: t10, lastModified: Date.now() }), tF.debug && console.log("FileSystemCache: set", e10), !this.flushToDisk || !t10) return;
          let i10 = new tB(this.fs);
          if (t10.kind === tS.APP_ROUTE) {
            let r11 = this.getFilePath(`${e10}.body`, tx.APP_ROUTE);
            i10.append(r11, t10.body);
            let n11 = { headers: t10.headers, status: t10.status, postponed: void 0, segmentPaths: void 0, prefetchHints: void 0 };
            i10.append(r11.replace(/\.body$/, v), JSON.stringify(n11, null, 2));
          } else if (t10.kind === tS.PAGES || t10.kind === tS.APP_PAGE) {
            let n11 = t10.kind === tS.APP_PAGE, a10 = this.getFilePath(`${e10}.html`, n11 ? tx.APP_PAGE : tx.PAGES);
            if (i10.append(a10, t10.html), r10.fetchCache || r10.isFallback || r10.isRoutePPREnabled || i10.append(this.getFilePath(`${e10}${n11 ? ".rsc" : ".json"}`, n11 ? tx.APP_PAGE : tx.PAGES), n11 ? t10.rscData : JSON.stringify(t10.pageData)), (null == t10 ? void 0 : t10.kind) === tS.APP_PAGE) {
              let e11;
              if (t10.segmentData) {
                e11 = [];
                let r12 = a10.replace(/\.html$/, ".segments");
                for (let [n12, a11] of t10.segmentData) {
                  e11.push(n12);
                  let t11 = r12 + n12 + ".segment.rsc";
                  i10.append(t11, a11);
                }
              }
              let r11 = { headers: t10.headers, status: t10.status, postponed: t10.postponed, segmentPaths: e11, prefetchHints: void 0 };
              i10.append(a10.replace(/\.html$/, v), JSON.stringify(r11));
            }
          } else if (t10.kind === tS.FETCH) {
            let n11 = this.getFilePath(e10, tx.FETCH);
            i10.append(n11, JSON.stringify({ ...t10, tags: r10.fetchCache ? r10.tags : [] }));
          }
          await i10.wait();
        }
        getFilePath(e10, t10) {
          switch (t10) {
            case tx.FETCH:
              return tL.default.join(this.serverDistDir, "..", "cache", "fetch-cache", e10);
            case tx.PAGES:
              return tL.default.join(this.serverDistDir, "pages", e10);
            case tx.IMAGE:
            case tx.APP_PAGE:
            case tx.APP_ROUTE:
              return tL.default.join(this.serverDistDir, "app", e10);
            default:
              throw Object.defineProperty(Error(`Unexpected file path kind: ${t10}`), "__NEXT_ERROR_CODE", { value: "E479", enumerable: false, configurable: true });
          }
        }
      }
      let tJ = ["(..)(..)", "(.)", "(..)", "(...)"], tV = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/, tz = /\/\[[^/]+\](?=\/|$)/;
      function tG(e10) {
        return e10.replace(/(?:\/index)?\/?$/, "") || "/";
      }
      class tX {
        static #e = this.cacheControls = /* @__PURE__ */ new Map();
        constructor(e10) {
          this.prerenderManifest = e10;
        }
        get(e10) {
          let t10 = tX.cacheControls.get(e10);
          if (t10) return t10;
          let r10 = this.prerenderManifest.routes[e10];
          if (r10) {
            let { initialRevalidateSeconds: e11, initialExpireSeconds: t11 } = r10;
            if (void 0 !== e11) return { revalidate: e11, expire: t11 };
          }
          let n10 = this.prerenderManifest.dynamicRoutes[e10];
          if (n10) {
            let { fallbackRevalidate: e11, fallbackExpire: t11 } = n10;
            if (void 0 !== e11) return { revalidate: e11, expire: t11 };
          }
        }
        set(e10, t10) {
          tX.cacheControls.set(e10, t10);
        }
        clear() {
          tX.cacheControls.clear();
        }
      }
      var eJ = eJ;
      e.i(67914);
      var eo = eo;
      class tY {
        static #e = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        constructor({ fs: e10, dev: t10, flushToDisk: r10, minimalMode: n10, serverDistDir: i10, requestHeaders: a10, maxMemoryCacheSize: o10, getPrerenderManifest: s10, fetchCacheKeyPrefix: l2, CurCacheHandler: c2, allowedRevalidateHeaderKeys: u2 }) {
          var d2, p2, h2, f2;
          this.locks = /* @__PURE__ */ new Map(), this.hasCustomCacheHandler = !!c2;
          const g2 = Symbol.for("@next/cache-handlers"), m2 = globalThis;
          if (c2) tY.debug && console.log("IncrementalCache: using custom cache handler", c2.name);
          else {
            const t11 = m2[g2];
            (null == t11 ? void 0 : t11.FetchCache) ? (c2 = t11.FetchCache, tY.debug && console.log("IncrementalCache: using global FetchCache cache handler")) : e10 && i10 && (tY.debug && console.log("IncrementalCache: using filesystem cache handler"), c2 = tF);
          }
          process.env.__NEXT_TEST_MAX_ISR_CACHE && (o10 = parseInt(process.env.__NEXT_TEST_MAX_ISR_CACHE, 10)), this.dev = t10, this.disableForTestmode = "true" === process.env.NEXT_PRIVATE_TEST_PROXY, this.minimalMode = n10, this.requestHeaders = a10, this.allowedRevalidateHeaderKeys = u2, this.prerenderManifest = s10(), this.cacheControls = new tX(this.prerenderManifest), this.fetchCacheKeyPrefix = l2;
          let y2 = [];
          a10[w] === (null == (p2 = this.prerenderManifest) || null == (d2 = p2.preview) ? void 0 : d2.previewModeId) && (this.isOnDemandRevalidate = true), n10 && (y2 = this.revalidatedTags = function(e11, t11) {
            return "string" == typeof e11[E] && e11["x-next-revalidate-tag-token"] === t11 ? e11[E].split(",") : [];
          }(a10, null == (f2 = this.prerenderManifest) || null == (h2 = f2.preview) ? void 0 : h2.previewModeId)), c2 && (this.cacheHandler = new c2({ dev: t10, fs: e10, flushToDisk: r10, serverDistDir: i10, revalidatedTags: y2, maxMemoryCacheSize: o10, _requestHeaders: a10, fetchCacheKeyPrefix: l2 }));
        }
        calculateRevalidate(e10, t10, r10, n10) {
          if (r10) return Math.floor(performance.timeOrigin + performance.now() - 1e3);
          let i10 = this.cacheControls.get(tG(e10)), a10 = i10 ? i10.revalidate : !n10 && 1;
          return "number" == typeof a10 ? 1e3 * a10 + t10 : a10;
        }
        _getPathname(e10, t10) {
          return t10 ? e10 : /^\/index(\/|$)/.test(e10) && !function(e11, t11 = true) {
            return (void 0 !== e11.split("/").find((e12) => tJ.find((t12) => e12.startsWith(t12))) && (e11 = function(e12) {
              let t12, r10, n10;
              for (let i10 of e12.split("/")) if (r10 = tJ.find((e13) => i10.startsWith(e13))) {
                [t12, n10] = e12.split(r10, 2);
                break;
              }
              if (!t12 || !r10 || !n10) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`), "__NEXT_ERROR_CODE", { value: "E269", enumerable: false, configurable: true });
              switch (t12 = en(t12), r10) {
                case "(.)":
                  n10 = "/" === t12 ? `/${n10}` : t12 + "/" + n10;
                  break;
                case "(..)":
                  if ("/" === t12) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Cannot use (..) marker at the root level, use (.) instead.`), "__NEXT_ERROR_CODE", { value: "E207", enumerable: false, configurable: true });
                  n10 = t12.split("/").slice(0, -1).concat(n10).join("/");
                  break;
                case "(...)":
                  n10 = "/" + n10;
                  break;
                case "(..)(..)":
                  let i10 = t12.split("/");
                  if (i10.length <= 2) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Cannot use (..)(..) marker at the root level or one level up.`), "__NEXT_ERROR_CODE", { value: "E486", enumerable: false, configurable: true });
                  n10 = i10.slice(0, -2).concat(n10).join("/");
                  break;
                default:
                  throw Object.defineProperty(Error("Invariant: unexpected marker"), "__NEXT_ERROR_CODE", { value: "E112", enumerable: false, configurable: true });
              }
              return { interceptingRoute: t12, interceptedRoute: n10 };
            }(e11).interceptedRoute), t11) ? tz.test(e11) : tV.test(e11);
          }(e10) ? `/index${e10}` : "/" === e10 ? "/index" : er(e10);
        }
        resetRequestCache() {
          var e10, t10;
          null == (t10 = this.cacheHandler) || null == (e10 = t10.resetRequestCache) || e10.call(t10);
        }
        async lock(e10) {
          for (; ; ) {
            let t11 = this.locks.get(e10);
            if (tY.debug && console.log("IncrementalCache: lock get", e10, !!t11), !t11) break;
            await t11;
          }
          let { resolve: t10, promise: r10 } = new tl();
          return tY.debug && console.log("IncrementalCache: successfully locked", e10), this.locks.set(e10, r10), () => {
            t10(), this.locks.delete(e10);
          };
        }
        async revalidateTag(e10, t10) {
          var r10;
          return null == (r10 = this.cacheHandler) ? void 0 : r10.revalidateTag(e10, t10);
        }
        async generateCacheKey(e10, t10 = {}) {
          let r10 = [], n10 = new TextEncoder(), i10 = new TextDecoder();
          if (t10.body) if (t10.body instanceof Uint8Array) r10.push(i10.decode(t10.body)), t10._ogBody = t10.body;
          else if ("function" == typeof t10.body.getReader) {
            let e11 = t10.body, a11 = [];
            try {
              await e11.pipeTo(new WritableStream({ write(e12) {
                "string" == typeof e12 ? (a11.push(n10.encode(e12)), r10.push(e12)) : (a11.push(e12), r10.push(i10.decode(e12, { stream: true })));
              } })), r10.push(i10.decode());
              let o11 = a11.reduce((e12, t11) => e12 + t11.length, 0), s11 = new Uint8Array(o11), l2 = 0;
              for (let e12 of a11) s11.set(e12, l2), l2 += e12.length;
              t10._ogBody = s11;
            } catch (e12) {
              console.error("Problem reading body", e12);
            }
          } else if ("function" == typeof t10.body.keys) {
            let e11 = t10.body;
            for (let n11 of (t10._ogBody = t10.body, /* @__PURE__ */ new Set([...e11.keys()]))) {
              let t11 = e11.getAll(n11);
              r10.push(`${n11}=${(await Promise.all(t11.map(async (e12) => "string" == typeof e12 ? e12 : await e12.text()))).join(",")}`);
            }
          } else if ("function" == typeof t10.body.arrayBuffer) {
            let e11 = t10.body, n11 = await e11.arrayBuffer();
            r10.push(await e11.text()), t10._ogBody = new Blob([n11], { type: e11.type });
          } else "string" == typeof t10.body && (r10.push(t10.body), t10._ogBody = t10.body);
          let a10 = "function" == typeof (t10.headers || {}).keys ? Object.fromEntries(t10.headers) : Object.assign({}, t10.headers);
          "traceparent" in a10 && delete a10.traceparent, "tracestate" in a10 && delete a10.tracestate;
          let o10 = JSON.stringify(["v3", this.fetchCacheKeyPrefix || "", e10, t10.method, a10, t10.mode, t10.redirect, t10.credentials, t10.referrer, t10.referrerPolicy, t10.integrity, t10.cache, r10]);
          {
            var s10;
            let e11 = n10.encode(o10);
            return s10 = await crypto.subtle.digest("SHA-256", e11), Array.prototype.map.call(new Uint8Array(s10), (e12) => e12.toString(16).padStart(2, "0")).join("");
          }
        }
        async get(e10, t10) {
          var r10, n10, i10, a10, o10, s10, l2;
          let c2, u2;
          if (t10.kind === tx.FETCH) {
            let r11 = eJ.workUnitAsyncStorageInstance.getStore(), n11 = r11 ? (0, eF.getRenderResumeDataCache)(r11) : null;
            if (n11) {
              let r12 = n11.fetch.get(e10);
              if ((null == r12 ? void 0 : r12.kind) === tS.FETCH) {
                let n12 = eo.workAsyncStorageInstance.getStore();
                if (![...t10.tags || [], ...t10.softTags || []].some((e11) => {
                  var t11, r13;
                  return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == n12 || null == (r13 = n12.pendingRevalidatedTags) ? void 0 : r13.some((t12) => t12.tag === e11));
                })) return tY.debug && console.log("IncrementalCache: rdc:hit", e10), { isStale: false, value: r12 };
                tY.debug && console.log("IncrementalCache: rdc:revalidated-tag", e10);
              } else tY.debug && console.log("IncrementalCache: rdc:miss", e10);
            } else tY.debug && console.log("IncrementalCache: rdc:no-resume-data");
          }
          if (this.disableForTestmode || this.dev && (t10.kind !== tx.FETCH || "no-cache" === this.requestHeaders["cache-control"])) return null;
          e10 = this._getPathname(e10, t10.kind === tx.FETCH);
          let d2 = await (null == (r10 = this.cacheHandler) ? void 0 : r10.get(e10, t10));
          if (t10.kind === tx.FETCH) {
            if (!d2) return null;
            if ((null == (i10 = d2.value) ? void 0 : i10.kind) !== tS.FETCH) throw Object.defineProperty(new ez.InvariantError(`Expected cached value for cache key ${JSON.stringify(e10)} to be a "FETCH" kind, got ${JSON.stringify(null == (a10 = d2.value) ? void 0 : a10.kind)} instead.`), "__NEXT_ERROR_CODE", { value: "E653", enumerable: false, configurable: true });
            let r11 = eo.workAsyncStorageInstance.getStore(), n11 = [...t10.tags || [], ...t10.softTags || []];
            if (n11.some((e11) => {
              var t11, n12;
              return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == r11 || null == (n12 = r11.pendingRevalidatedTags) ? void 0 : n12.some((t12) => t12.tag === e11));
            })) return tY.debug && console.log("IncrementalCache: expired tag", e10), null;
            let o11 = eJ.workUnitAsyncStorageInstance.getStore();
            if (o11) {
              let t11 = (0, eF.getPrerenderResumeDataCache)(o11);
              t11 && (tY.debug && console.log("IncrementalCache: rdc:set", e10), t11.fetch.set(e10, d2.value));
            }
            let s11 = t10.revalidate || d2.value.revalidate, l3 = (performance.timeOrigin + performance.now() - (d2.lastModified || 0)) / 1e3 > s11, c3 = d2.value.data;
            return tW(n11, d2.lastModified) ? null : (tK(n11, d2.lastModified) && (l3 = true), { isStale: l3, value: { kind: tS.FETCH, data: c3, revalidate: s11 } });
          }
          if ((null == d2 || null == (n10 = d2.value) ? void 0 : n10.kind) === tS.FETCH) throw Object.defineProperty(new ez.InvariantError(`Expected cached value for cache key ${JSON.stringify(e10)} not to be a ${JSON.stringify(t10.kind)} kind, got "FETCH" instead.`), "__NEXT_ERROR_CODE", { value: "E652", enumerable: false, configurable: true });
          let p2 = null, { isFallback: h2 } = t10, f2 = this.cacheControls.get(tG(e10));
          if ((null == d2 ? void 0 : d2.lastModified) === -1) c2 = -1, u2 = -31536e6;
          else {
            let r11 = performance.timeOrigin + performance.now(), n11 = (null == d2 ? void 0 : d2.lastModified) || r11;
            if (void 0 === (c2 = false !== (u2 = this.calculateRevalidate(e10, n11, this.dev ?? false, t10.isFallback)) && u2 < r11 || void 0) && ((null == d2 || null == (o10 = d2.value) ? void 0 : o10.kind) === tS.APP_PAGE || (null == d2 || null == (s10 = d2.value) ? void 0 : s10.kind) === tS.APP_ROUTE)) {
              let e11 = null == (l2 = d2.value.headers) ? void 0 : l2[_];
              if ("string" == typeof e11) {
                let t11 = e11.split(",");
                t11.length > 0 && (tW(t11, n11) ? c2 = -1 : tK(t11, n11) && (c2 = true));
              }
            }
          }
          return d2 && (p2 = { isStale: c2, cacheControl: f2, revalidateAfter: u2, value: d2.value, isFallback: h2 }), !d2 && this.prerenderManifest.notFoundRoutes.includes(e10) && (p2 = { isStale: c2, value: null, cacheControl: f2, revalidateAfter: u2, isFallback: h2 }, this.set(e10, p2.value, { ...t10, cacheControl: f2 })), p2;
        }
        async set(e10, t10, r10) {
          if ((null == t10 ? void 0 : t10.kind) === tS.FETCH) {
            let r11 = eJ.workUnitAsyncStorageInstance.getStore(), n11 = r11 ? (0, eF.getPrerenderResumeDataCache)(r11) : null;
            n11 && (tY.debug && console.log("IncrementalCache: rdc:set", e10), n11.fetch.set(e10, t10));
          }
          if (this.disableForTestmode || this.dev && !r10.fetchCache) return;
          e10 = this._getPathname(e10, r10.fetchCache);
          let n10 = JSON.stringify(t10).length;
          if (r10.fetchCache && n10 > 2097152 && !this.hasCustomCacheHandler && !r10.isImplicitBuildTimeCache) {
            let t11 = `Failed to set Next.js data cache for ${r10.fetchUrl || e10}, items over 2MB can not be cached (${n10} bytes)`;
            if (this.dev) throw Object.defineProperty(Error(t11), "__NEXT_ERROR_CODE", { value: "E1003", enumerable: false, configurable: true });
            console.warn(t11);
            return;
          }
          try {
            var i10;
            !r10.fetchCache && r10.cacheControl && this.cacheControls.set(tG(e10), r10.cacheControl), await (null == (i10 = this.cacheHandler) ? void 0 : i10.set(e10, t10, r10));
          } catch (t11) {
            console.warn("Failed to update prerender cache for", e10, t11);
          }
        }
      }
      var tQ = function(e10, t10, r10, n10, i10) {
        if ("m" === n10) throw TypeError("Private method is not writable");
        if ("a" === n10 && !i10) throw TypeError("Private accessor was defined without a setter");
        if ("function" == typeof t10 ? e10 !== t10 || !i10 : !t10.has(e10)) throw TypeError("Cannot write private member to an object whose class did not declare it");
        return "a" === n10 ? i10.call(e10, r10) : i10 ? i10.value = r10 : t10.set(e10, r10), r10;
      }, tZ = function(e10, t10, r10, n10) {
        if ("a" === r10 && !n10) throw TypeError("Private accessor was defined without a getter");
        if ("function" == typeof t10 ? e10 !== t10 || !n10 : !t10.has(e10)) throw TypeError("Cannot read private member from an object whose class did not declare it");
        return "m" === r10 ? n10 : "a" === r10 ? n10.call(e10) : n10 ? n10.value : t10.get(e10);
      };
      function t0(e10) {
        let t10 = e10 ? "__Secure-" : "";
        return { sessionToken: { name: `${t10}authjs.session-token`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10 } }, callbackUrl: { name: `${t10}authjs.callback-url`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10 } }, csrfToken: { name: `${e10 ? "__Host-" : ""}authjs.csrf-token`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10 } }, pkceCodeVerifier: { name: `${t10}authjs.pkce.code_verifier`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10, maxAge: 900 } }, state: { name: `${t10}authjs.state`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10, maxAge: 900 } }, nonce: { name: `${t10}authjs.nonce`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10 } }, webauthnChallenge: { name: `${t10}authjs.challenge`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10, maxAge: 900 } } };
      }
      class t1 {
        constructor(e10, t10, r10) {
          if (iz.add(this), iG.set(this, {}), iX.set(this, void 0), iY.set(this, void 0), tQ(this, iY, r10, "f"), tQ(this, iX, e10, "f"), !t10) return;
          const { name: n10 } = e10;
          for (const [e11, r11] of Object.entries(t10)) e11.startsWith(n10) && r11 && (tZ(this, iG, "f")[e11] = r11);
        }
        get value() {
          return Object.keys(tZ(this, iG, "f")).sort((e10, t10) => parseInt(e10.split(".").pop() || "0") - parseInt(t10.split(".").pop() || "0")).map((e10) => tZ(this, iG, "f")[e10]).join("");
        }
        chunk(e10, t10) {
          let r10 = tZ(this, iz, "m", iZ).call(this);
          for (let n10 of tZ(this, iz, "m", iQ).call(this, { name: tZ(this, iX, "f").name, value: e10, options: { ...tZ(this, iX, "f").options, ...t10 } })) r10[n10.name] = n10;
          return Object.values(r10);
        }
        clean() {
          return Object.values(tZ(this, iz, "m", iZ).call(this));
        }
      }
      iG = /* @__PURE__ */ new WeakMap(), iX = /* @__PURE__ */ new WeakMap(), iY = /* @__PURE__ */ new WeakMap(), iz = /* @__PURE__ */ new WeakSet(), iQ = function(e10) {
        let t10 = Math.ceil(e10.value.length / 3936);
        if (1 === t10) return tZ(this, iG, "f")[e10.name] = e10.value, [e10];
        let r10 = [];
        for (let n10 = 0; n10 < t10; n10++) {
          let t11 = `${e10.name}.${n10}`, i10 = e10.value.substr(3936 * n10, 3936);
          r10.push({ ...e10, name: t11, value: i10 }), tZ(this, iG, "f")[t11] = i10;
        }
        return tZ(this, iY, "f").debug("CHUNKING_SESSION_COOKIE", { message: "Session cookie exceeds allowed 4096 bytes.", emptyCookieSize: 160, valueSize: e10.value.length, chunks: r10.map((e11) => e11.value.length + 160) }), r10;
      }, iZ = function() {
        let e10 = {};
        for (let t10 in tZ(this, iG, "f")) delete tZ(this, iG, "f")?.[t10], e10[t10] = { name: t10, value: "", options: { ...tZ(this, iX, "f").options, maxAge: 0 } };
        return e10;
      };
      class t2 extends Error {
        constructor(e10, t10) {
          e10 instanceof Error ? super(void 0, { cause: { err: e10, ...e10.cause, ...t10 } }) : "string" == typeof e10 ? (t10 instanceof Error && (t10 = { err: t10, ...t10.cause }), super(e10, t10)) : super(void 0, e10), this.name = this.constructor.name, this.type = this.constructor.type ?? "AuthError", this.kind = this.constructor.kind ?? "error", Error.captureStackTrace?.(this, this.constructor);
          const r10 = `https://errors.authjs.dev#${this.type.toLowerCase()}`;
          this.message += `${this.message ? ". " : ""}Read more at ${r10}`;
        }
      }
      class t3 extends t2 {
      }
      t3.kind = "signIn";
      class t4 extends t2 {
      }
      t4.type = "AdapterError";
      class t5 extends t2 {
      }
      t5.type = "AccessDenied";
      class t6 extends t2 {
      }
      t6.type = "CallbackRouteError";
      class t8 extends t2 {
      }
      t8.type = "ErrorPageLoop";
      class t9 extends t2 {
      }
      t9.type = "EventError";
      class t7 extends t2 {
      }
      t7.type = "InvalidCallbackUrl";
      class re extends t3 {
        constructor() {
          super(...arguments), this.code = "credentials";
        }
      }
      re.type = "CredentialsSignin";
      class rt extends t2 {
      }
      rt.type = "InvalidEndpoints";
      class rr extends t2 {
      }
      rr.type = "InvalidCheck";
      class rn extends t2 {
      }
      rn.type = "JWTSessionError";
      class ri extends t2 {
      }
      ri.type = "MissingAdapter";
      class ra extends t2 {
      }
      ra.type = "MissingAdapterMethods";
      class ro extends t2 {
      }
      ro.type = "MissingAuthorize";
      class rs extends t2 {
      }
      rs.type = "MissingSecret";
      class rl extends t3 {
      }
      rl.type = "OAuthAccountNotLinked";
      class rc extends t3 {
      }
      rc.type = "OAuthCallbackError";
      class ru extends t2 {
      }
      ru.type = "OAuthProfileParseError";
      class rd extends t2 {
      }
      rd.type = "SessionTokenError";
      class rp extends t2 {
      }
      rp.type = "SignOutError";
      class rh extends t2 {
      }
      rh.type = "UnknownAction";
      class rf extends t2 {
      }
      rf.type = "UnsupportedStrategy";
      class rg extends t2 {
      }
      rg.type = "InvalidProvider";
      class rm extends t2 {
      }
      rm.type = "UntrustedHost";
      class ry extends t2 {
      }
      ry.type = "Verification";
      class rb extends t3 {
      }
      rb.type = "MissingCSRF";
      let rw = /* @__PURE__ */ new Set(["CredentialsSignin", "OAuthAccountNotLinked", "OAuthCallbackError", "AccessDenied", "Verification", "MissingCSRF", "AccountNotLinked", "WebAuthnVerificationError"]);
      class rv extends t2 {
      }
      rv.type = "DuplicateConditionalUI";
      class r_ extends t2 {
      }
      r_.type = "MissingWebAuthnAutocomplete";
      class rE extends t2 {
      }
      rE.type = "WebAuthnVerificationError";
      class rS extends t3 {
      }
      rS.type = "AccountNotLinked";
      class rx extends t2 {
      }
      rx.type = "ExperimentalFeatureNotEnabled";
      let rk = false;
      function rT(e10, t10) {
        try {
          return /^https?:/.test(new URL(e10, e10.startsWith("/") ? t10 : void 0).protocol);
        } catch {
          return false;
        }
      }
      let rA = false, rR = false, rC = false, rP = ["createVerificationToken", "useVerificationToken", "getUserByEmail"], rO = ["createUser", "getUser", "getUserByEmail", "getUserByAccount", "updateUser", "linkAccount", "createSession", "getSessionAndUser", "updateSession", "deleteSession"], rI = ["createUser", "getUser", "linkAccount", "getAccount", "getAuthenticator", "createAuthenticator", "listAuthenticatorsByUserId", "updateAuthenticatorCounter"], rN = async (e10, t10, r10, n10, i10) => {
        let { crypto: { subtle: a10 } } = (() => {
          if ("u" > typeof globalThis) return globalThis;
          if ("u" > typeof self) return self;
          throw Error("unable to locate global object");
        })();
        return new Uint8Array(await a10.deriveBits({ name: "HKDF", hash: `SHA-${e10.substr(3)}`, salt: r10, info: n10 }, await a10.importKey("raw", t10, "HKDF", false, ["deriveBits"]), i10 << 3));
      };
      function rU(e10, t10) {
        if ("string" == typeof e10) return new TextEncoder().encode(e10);
        if (!(e10 instanceof Uint8Array)) throw TypeError(`"${t10}"" must be an instance of Uint8Array or a string`);
        return e10;
      }
      async function rD(e10, t10, r10, n10, i10) {
        return rN(function(e11) {
          switch (e11) {
            case "sha256":
            case "sha384":
            case "sha512":
            case "sha1":
              return e11;
            default:
              throw TypeError('unsupported "digest" value');
          }
        }(e10), function(e11) {
          let t11 = rU(e11, "ikm");
          if (!t11.byteLength) throw TypeError('"ikm" must be at least one byte in length');
          return t11;
        }(t10), rU(r10, "salt"), function(e11) {
          let t11 = rU(e11, "info");
          if (t11.byteLength > 1024) throw TypeError('"info" must not contain more than 1024 bytes');
          return t11;
        }(n10), function(e11, t11) {
          if ("number" != typeof e11 || !Number.isInteger(e11) || e11 < 1) throw TypeError('"keylen" must be a positive integer');
          if (e11 > 255 * (parseInt(t11.substr(3), 10) >> 3 || 20)) throw TypeError('"keylen" too large');
          return e11;
        }(i10, e10));
      }
      let rj = crypto, rM = async (e10, t10) => {
        let r10 = `SHA-${e10.slice(-3)}`;
        return new Uint8Array(await rj.subtle.digest(r10, t10));
      }, r$ = new TextEncoder(), rL = new TextDecoder();
      function rH(...e10) {
        let t10 = new Uint8Array(e10.reduce((e11, { length: t11 }) => e11 + t11, 0)), r10 = 0;
        for (let n10 of e10) t10.set(n10, r10), r10 += n10.length;
        return t10;
      }
      function rW(e10, t10, r10) {
        if (t10 < 0 || t10 >= 4294967296) throw RangeError(`value must be >= 0 and <= ${4294967296 - 1}. Received ${t10}`);
        e10.set([t10 >>> 24, t10 >>> 16, t10 >>> 8, 255 & t10], r10);
      }
      function rK(e10) {
        let t10 = Math.floor(e10 / 4294967296), r10 = new Uint8Array(8);
        return rW(r10, t10, 0), rW(r10, e10 % 4294967296, 4), r10;
      }
      function rB(e10) {
        let t10 = new Uint8Array(4);
        return rW(t10, e10), t10;
      }
      function rq(e10) {
        return rH(rB(e10.length), e10);
      }
      async function rF(e10, t10, r10) {
        let n10 = Math.ceil((t10 >> 3) / 32), i10 = new Uint8Array(32 * n10);
        for (let t11 = 0; t11 < n10; t11++) {
          let n11 = new Uint8Array(4 + e10.length + r10.length);
          n11.set(rB(t11 + 1)), n11.set(e10, 4), n11.set(r10, 4 + e10.length), i10.set(await rM("sha256", n11), 32 * t11);
        }
        return i10.slice(0, t10 >> 3);
      }
      let rJ = (e10) => ((e11) => {
        let t10 = e11;
        "string" == typeof t10 && (t10 = r$.encode(t10));
        let r10 = [];
        for (let e12 = 0; e12 < t10.length; e12 += 32768) r10.push(String.fromCharCode.apply(null, t10.subarray(e12, e12 + 32768)));
        return btoa(r10.join(""));
      })(e10).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"), rV = (e10) => {
        let t10 = e10;
        t10 instanceof Uint8Array && (t10 = rL.decode(t10)), t10 = t10.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
        try {
          var r10 = t10;
          let e11 = atob(r10), n10 = new Uint8Array(e11.length);
          for (let t11 = 0; t11 < e11.length; t11++) n10[t11] = e11.charCodeAt(t11);
          return n10;
        } catch {
          throw TypeError("The input to be decoded is not correctly encoded.");
        }
      }, rz = Symbol();
      class rG extends Error {
        constructor(e10, t10) {
          super(e10, t10), this.code = "ERR_JOSE_GENERIC", this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      rG.code = "ERR_JOSE_GENERIC";
      class rX extends rG {
        constructor(e10, t10, r10 = "unspecified", n10 = "unspecified") {
          super(e10, { cause: { claim: r10, reason: n10, payload: t10 } }), this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED", this.claim = r10, this.reason = n10, this.payload = t10;
        }
      }
      rX.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
      class rY extends rG {
        constructor(e10, t10, r10 = "unspecified", n10 = "unspecified") {
          super(e10, { cause: { claim: r10, reason: n10, payload: t10 } }), this.code = "ERR_JWT_EXPIRED", this.claim = r10, this.reason = n10, this.payload = t10;
        }
      }
      rY.code = "ERR_JWT_EXPIRED";
      class rQ extends rG {
        constructor() {
          super(...arguments), this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
        }
      }
      rQ.code = "ERR_JOSE_ALG_NOT_ALLOWED";
      class rZ extends rG {
        constructor() {
          super(...arguments), this.code = "ERR_JOSE_NOT_SUPPORTED";
        }
      }
      rZ.code = "ERR_JOSE_NOT_SUPPORTED";
      class r0 extends rG {
        constructor(e10 = "decryption operation failed", t10) {
          super(e10, t10), this.code = "ERR_JWE_DECRYPTION_FAILED";
        }
      }
      r0.code = "ERR_JWE_DECRYPTION_FAILED";
      class r1 extends rG {
        constructor() {
          super(...arguments), this.code = "ERR_JWE_INVALID";
        }
      }
      r1.code = "ERR_JWE_INVALID";
      class r2 extends rG {
        constructor() {
          super(...arguments), this.code = "ERR_JWT_INVALID";
        }
      }
      r2.code = "ERR_JWT_INVALID";
      class r3 extends rG {
        constructor() {
          super(...arguments), this.code = "ERR_JWK_INVALID";
        }
      }
      r3.code = "ERR_JWK_INVALID";
      let r4 = rj.getRandomValues.bind(rj);
      function r5(e10) {
        switch (e10) {
          case "A128GCM":
          case "A128GCMKW":
          case "A192GCM":
          case "A192GCMKW":
          case "A256GCM":
          case "A256GCMKW":
            return 96;
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return 128;
          default:
            throw new rZ(`Unsupported JWE Algorithm: ${e10}`);
        }
      }
      let r6 = (e10, t10) => {
        if (t10.length << 3 !== r5(e10)) throw new r1("Invalid Initialization Vector length");
      }, r8 = (e10, t10) => {
        let r10 = e10.byteLength << 3;
        if (r10 !== t10) throw new r1(`Invalid Content Encryption Key length. Expected ${t10} bits, got ${r10} bits`);
      };
      function r9(e10, t10 = "algorithm.name") {
        return TypeError(`CryptoKey does not support this operation, its ${t10} must be ${e10}`);
      }
      function r7(e10, t10) {
        return e10.name === t10;
      }
      function ne(e10, t10, ...r10) {
        switch (t10) {
          case "A128GCM":
          case "A192GCM":
          case "A256GCM": {
            if (!r7(e10.algorithm, "AES-GCM")) throw r9("AES-GCM");
            let r11 = parseInt(t10.slice(1, 4), 10);
            if (e10.algorithm.length !== r11) throw r9(r11, "algorithm.length");
            break;
          }
          case "A128KW":
          case "A192KW":
          case "A256KW": {
            if (!r7(e10.algorithm, "AES-KW")) throw r9("AES-KW");
            let r11 = parseInt(t10.slice(1, 4), 10);
            if (e10.algorithm.length !== r11) throw r9(r11, "algorithm.length");
            break;
          }
          case "ECDH":
            switch (e10.algorithm.name) {
              case "ECDH":
              case "X25519":
              case "X448":
                break;
              default:
                throw r9("ECDH, X25519, or X448");
            }
            break;
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW":
            if (!r7(e10.algorithm, "PBKDF2")) throw r9("PBKDF2");
            break;
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512": {
            if (!r7(e10.algorithm, "RSA-OAEP")) throw r9("RSA-OAEP");
            let r11 = parseInt(t10.slice(9), 10) || 1;
            if (parseInt(e10.algorithm.hash.name.slice(4), 10) !== r11) throw r9(`SHA-${r11}`, "algorithm.hash");
            break;
          }
          default:
            throw TypeError("CryptoKey does not support this operation");
        }
        if (r10.length && !r10.some((t11) => e10.usages.includes(t11))) {
          let e11 = "CryptoKey does not support this operation, its usages must include ";
          if (r10.length > 2) {
            let t11 = r10.pop();
            e11 += `one of ${r10.join(", ")}, or ${t11}.`;
          } else 2 === r10.length ? e11 += `one of ${r10[0]} or ${r10[1]}.` : e11 += `${r10[0]}.`;
          throw TypeError(e11);
        }
      }
      function nt(e10, t10, ...r10) {
        if ((r10 = r10.filter(Boolean)).length > 2) {
          let t11 = r10.pop();
          e10 += `one of type ${r10.join(", ")}, or ${t11}.`;
        } else 2 === r10.length ? e10 += `one of type ${r10[0]} or ${r10[1]}.` : e10 += `of type ${r10[0]}.`;
        return null == t10 ? e10 += ` Received ${t10}` : "function" == typeof t10 && t10.name ? e10 += ` Received function ${t10.name}` : "object" == typeof t10 && null != t10 && t10.constructor?.name && (e10 += ` Received an instance of ${t10.constructor.name}`), e10;
      }
      let nr = (e10, ...t10) => nt("Key must be ", e10, ...t10);
      function nn(e10, t10, ...r10) {
        return nt(`Key for the ${e10} algorithm must be `, t10, ...r10);
      }
      let ni = (e10) => e10 instanceof CryptoKey || e10?.[Symbol.toStringTag] === "KeyObject", na = ["CryptoKey"];
      async function no(e10, t10, r10, n10, i10) {
        if (!(r10 instanceof Uint8Array)) throw TypeError(nr(r10, "Uint8Array"));
        let a10 = parseInt(e10.slice(1, 4), 10), o10 = await rj.subtle.importKey("raw", r10.subarray(a10 >> 3), "AES-CBC", false, ["encrypt"]), s10 = await rj.subtle.importKey("raw", r10.subarray(0, a10 >> 3), { hash: `SHA-${a10 << 1}`, name: "HMAC" }, false, ["sign"]), l2 = new Uint8Array(await rj.subtle.encrypt({ iv: n10, name: "AES-CBC" }, o10, t10)), c2 = rH(i10, n10, l2, rK(i10.length << 3));
        return { ciphertext: l2, tag: new Uint8Array((await rj.subtle.sign("HMAC", s10, c2)).slice(0, a10 >> 3)), iv: n10 };
      }
      async function ns(e10, t10, r10, n10, i10) {
        let a10;
        r10 instanceof Uint8Array ? a10 = await rj.subtle.importKey("raw", r10, "AES-GCM", false, ["encrypt"]) : (ne(r10, e10, "encrypt"), a10 = r10);
        let o10 = new Uint8Array(await rj.subtle.encrypt({ additionalData: i10, iv: n10, name: "AES-GCM", tagLength: 128 }, a10, t10)), s10 = o10.slice(-16);
        return { ciphertext: o10.slice(0, -16), tag: s10, iv: n10 };
      }
      let nl = async (e10, t10, r10, n10, i10) => {
        if (!(r10 instanceof CryptoKey) && !(r10 instanceof Uint8Array)) throw TypeError(nr(r10, ...na, "Uint8Array"));
        switch (n10 ? r6(e10, n10) : n10 = r4(new Uint8Array(r5(e10) >> 3)), e10) {
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return r10 instanceof Uint8Array && r8(r10, parseInt(e10.slice(-3), 10)), no(e10, t10, r10, n10, i10);
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            return r10 instanceof Uint8Array && r8(r10, parseInt(e10.slice(1, 4), 10)), ns(e10, t10, r10, n10, i10);
          default:
            throw new rZ("Unsupported JWE Content Encryption Algorithm");
        }
      }, nc = [{ hash: "SHA-256", name: "HMAC" }, true, ["sign"]];
      function nu(e10, t10) {
        if (e10.algorithm.length !== parseInt(t10.slice(1, 4), 10)) throw TypeError(`Invalid key size for alg: ${t10}`);
      }
      function nd(e10, t10, r10) {
        if (e10 instanceof CryptoKey) return ne(e10, t10, r10), e10;
        if (e10 instanceof Uint8Array) return rj.subtle.importKey("raw", e10, "AES-KW", true, [r10]);
        throw TypeError(nr(e10, ...na, "Uint8Array"));
      }
      let np = async (e10, t10, r10) => {
        let n10 = await nd(t10, e10, "wrapKey");
        nu(n10, e10);
        let i10 = await rj.subtle.importKey("raw", r10, ...nc);
        return new Uint8Array(await rj.subtle.wrapKey("raw", i10, n10, "AES-KW"));
      }, nh = async (e10, t10, r10) => {
        let n10 = await nd(t10, e10, "unwrapKey");
        nu(n10, e10);
        let i10 = await rj.subtle.unwrapKey("raw", r10, n10, "AES-KW", ...nc);
        return new Uint8Array(await rj.subtle.exportKey("raw", i10));
      };
      async function nf(e10, t10, r10, n10, i10 = new Uint8Array(0), a10 = new Uint8Array(0)) {
        let o10;
        if (!(e10 instanceof CryptoKey)) throw TypeError(nr(e10, ...na));
        if (ne(e10, "ECDH"), !(t10 instanceof CryptoKey)) throw TypeError(nr(t10, ...na));
        ne(t10, "ECDH", "deriveBits");
        let s10 = rH(rq(r$.encode(r10)), rq(i10), rq(a10), rB(n10));
        return o10 = "X25519" === e10.algorithm.name ? 256 : "X448" === e10.algorithm.name ? 448 : Math.ceil(parseInt(e10.algorithm.namedCurve.substr(-3), 10) / 8) << 3, rF(new Uint8Array(await rj.subtle.deriveBits({ name: e10.algorithm.name, public: e10 }, t10, o10)), n10, s10);
      }
      async function ng(e10) {
        if (!(e10 instanceof CryptoKey)) throw TypeError(nr(e10, ...na));
        return rj.subtle.generateKey(e10.algorithm, true, ["deriveBits"]);
      }
      function nm(e10) {
        if (!(e10 instanceof CryptoKey)) throw TypeError(nr(e10, ...na));
        return ["P-256", "P-384", "P-521"].includes(e10.algorithm.namedCurve) || "X25519" === e10.algorithm.name || "X448" === e10.algorithm.name;
      }
      async function ny(e10, t10, r10, n10) {
        if (!(e10 instanceof Uint8Array) || e10.length < 8) throw new r1("PBES2 Salt Input must be 8 or more octets");
        let i10 = rH(r$.encode(t10), new Uint8Array([0]), e10), a10 = parseInt(t10.slice(13, 16), 10), o10 = { hash: `SHA-${t10.slice(8, 11)}`, iterations: r10, name: "PBKDF2", salt: i10 }, s10 = await function(e11, t11) {
          if (e11 instanceof Uint8Array) return rj.subtle.importKey("raw", e11, "PBKDF2", false, ["deriveBits"]);
          if (e11 instanceof CryptoKey) return ne(e11, t11, "deriveBits", "deriveKey"), e11;
          throw TypeError(nr(e11, ...na, "Uint8Array"));
        }(n10, t10);
        if (s10.usages.includes("deriveBits")) return new Uint8Array(await rj.subtle.deriveBits(o10, s10, a10));
        if (s10.usages.includes("deriveKey")) return rj.subtle.deriveKey(o10, s10, { length: a10, name: "AES-KW" }, false, ["wrapKey", "unwrapKey"]);
        throw TypeError('PBKDF2 key "usages" must include "deriveBits" or "deriveKey"');
      }
      let nb = async (e10, t10, r10, n10 = 2048, i10 = r4(new Uint8Array(16))) => {
        let a10 = await ny(i10, e10, n10, t10);
        return { encryptedKey: await np(e10.slice(-6), a10, r10), p2c: n10, p2s: rJ(i10) };
      }, nw = async (e10, t10, r10, n10, i10) => {
        let a10 = await ny(i10, e10, n10, t10);
        return nh(e10.slice(-6), a10, r10);
      };
      function nv(e10) {
        switch (e10) {
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            return "RSA-OAEP";
          default:
            throw new rZ(`alg ${e10} is not supported either by JOSE or your javascript runtime`);
        }
      }
      let n_ = (e10, t10) => {
        if (e10.startsWith("RS") || e10.startsWith("PS")) {
          let { modulusLength: r10 } = t10.algorithm;
          if ("number" != typeof r10 || r10 < 2048) throw TypeError(`${e10} requires key modulusLength to be 2048 bits or larger`);
        }
      }, nE = async (e10, t10, r10) => {
        if (!(t10 instanceof CryptoKey)) throw TypeError(nr(t10, ...na));
        if (ne(t10, e10, "encrypt", "wrapKey"), n_(e10, t10), t10.usages.includes("encrypt")) return new Uint8Array(await rj.subtle.encrypt(nv(e10), t10, r10));
        if (t10.usages.includes("wrapKey")) {
          let n10 = await rj.subtle.importKey("raw", r10, ...nc);
          return new Uint8Array(await rj.subtle.wrapKey("raw", n10, t10, nv(e10)));
        }
        throw TypeError('RSA-OAEP key "usages" must include "encrypt" or "wrapKey" for this operation');
      }, nS = async (e10, t10, r10) => {
        if (!(t10 instanceof CryptoKey)) throw TypeError(nr(t10, ...na));
        if (ne(t10, e10, "decrypt", "unwrapKey"), n_(e10, t10), t10.usages.includes("decrypt")) return new Uint8Array(await rj.subtle.decrypt(nv(e10), t10, r10));
        if (t10.usages.includes("unwrapKey")) {
          let n10 = await rj.subtle.unwrapKey("raw", r10, t10, nv(e10), ...nc);
          return new Uint8Array(await rj.subtle.exportKey("raw", n10));
        }
        throw TypeError('RSA-OAEP key "usages" must include "decrypt" or "unwrapKey" for this operation');
      };
      function nx(e10) {
        if ("object" != typeof e10 || null === e10 || "[object Object]" !== Object.prototype.toString.call(e10)) return false;
        if (null === Object.getPrototypeOf(e10)) return true;
        let t10 = e10;
        for (; null !== Object.getPrototypeOf(t10); ) t10 = Object.getPrototypeOf(t10);
        return Object.getPrototypeOf(e10) === t10;
      }
      function nk(e10) {
        return nx(e10) && "string" == typeof e10.kty;
      }
      let nT = async (e10) => {
        if (!e10.alg) throw TypeError('"alg" argument is required when "jwk.alg" is not present');
        let { algorithm: t10, keyUsages: r10 } = function(e11) {
          let t11, r11;
          switch (e11.kty) {
            case "RSA":
              switch (e11.alg) {
                case "PS256":
                case "PS384":
                case "PS512":
                  t11 = { name: "RSA-PSS", hash: `SHA-${e11.alg.slice(-3)}` }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RS256":
                case "RS384":
                case "RS512":
                  t11 = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${e11.alg.slice(-3)}` }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RSA-OAEP":
                case "RSA-OAEP-256":
                case "RSA-OAEP-384":
                case "RSA-OAEP-512":
                  t11 = { name: "RSA-OAEP", hash: `SHA-${parseInt(e11.alg.slice(-3), 10) || 1}` }, r11 = e11.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
                  break;
                default:
                  throw new rZ('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            case "EC":
              switch (e11.alg) {
                case "ES256":
                  t11 = { name: "ECDSA", namedCurve: "P-256" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ES384":
                  t11 = { name: "ECDSA", namedCurve: "P-384" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ES512":
                  t11 = { name: "ECDSA", namedCurve: "P-521" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t11 = { name: "ECDH", namedCurve: e11.crv }, r11 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new rZ('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            case "OKP":
              switch (e11.alg) {
                case "Ed25519":
                  t11 = { name: "Ed25519" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "EdDSA":
                  t11 = { name: e11.crv }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t11 = { name: e11.crv }, r11 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new rZ('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            default:
              throw new rZ('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
          }
          return { algorithm: t11, keyUsages: r11 };
        }(e10), n10 = [t10, e10.ext ?? false, e10.key_ops ?? r10], i10 = { ...e10 };
        return delete i10.alg, delete i10.use, rj.subtle.importKey("jwk", i10, ...n10);
      }, nA = (e10) => e10?.[Symbol.toStringTag] === "KeyObject", nR = async (e10, t10, r10, n10, i10 = false) => {
        let a10 = e10.get(t10);
        if (a10?.[n10]) return a10[n10];
        let o10 = await nT({ ...r10, alg: n10 });
        return i10 && Object.freeze(t10), a10 ? a10[n10] = o10 : e10.set(t10, { [n10]: o10 }), o10;
      }, nC = (e10, t10) => {
        if (nA(e10)) {
          let r10 = e10.export({ format: "jwk" });
          return (delete r10.d, delete r10.dp, delete r10.dq, delete r10.p, delete r10.q, delete r10.qi, r10.k) ? rV(r10.k) : (i || (i = /* @__PURE__ */ new WeakMap()), nR(i, e10, r10, t10));
        }
        return nk(e10) ? e10.k ? rV(e10.k) : (i || (i = /* @__PURE__ */ new WeakMap()), nR(i, e10, e10, t10, true)) : e10;
      }, nP = (e10, t10) => {
        if (nA(e10)) {
          let r10 = e10.export({ format: "jwk" });
          return r10.k ? rV(r10.k) : (n || (n = /* @__PURE__ */ new WeakMap()), nR(n, e10, r10, t10));
        }
        return nk(e10) ? e10.k ? rV(e10.k) : (n || (n = /* @__PURE__ */ new WeakMap()), nR(n, e10, e10, t10, true)) : e10;
      };
      function nO(e10) {
        switch (e10) {
          case "A128GCM":
            return 128;
          case "A192GCM":
            return 192;
          case "A256GCM":
          case "A128CBC-HS256":
            return 256;
          case "A192CBC-HS384":
            return 384;
          case "A256CBC-HS512":
            return 512;
          default:
            throw new rZ(`Unsupported JWE Algorithm: ${e10}`);
        }
      }
      let nI = (e10) => r4(new Uint8Array(nO(e10) >> 3)), nN = async (e10) => {
        if (e10 instanceof Uint8Array) return { kty: "oct", k: rJ(e10) };
        if (!(e10 instanceof CryptoKey)) throw TypeError(nr(e10, ...na, "Uint8Array"));
        if (!e10.extractable) throw TypeError("non-extractable CryptoKey cannot be exported as a JWK");
        let { ext: t10, key_ops: r10, alg: n10, use: i10, ...a10 } = await rj.subtle.exportKey("jwk", e10);
        return a10;
      };
      async function nU(e10) {
        return nN(e10);
      }
      let nD = (e10) => e10?.[Symbol.toStringTag], nj = (e10, t10, r10) => {
        if (void 0 !== t10.use && "sig" !== t10.use) throw TypeError("Invalid key for this operation, when present its use must be sig");
        if (void 0 !== t10.key_ops && t10.key_ops.includes?.(r10) !== true) throw TypeError(`Invalid key for this operation, when present its key_ops must include ${r10}`);
        if (void 0 !== t10.alg && t10.alg !== e10) throw TypeError(`Invalid key for this operation, when present its alg must be ${e10}`);
        return true;
      };
      function nM(e10, t10, r10, n10) {
        t10.startsWith("HS") || "dir" === t10 || t10.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(t10) ? ((e11, t11, r11, n11) => {
          if (!(t11 instanceof Uint8Array)) {
            if (n11 && nk(t11)) {
              if (nk(t11) && "oct" === t11.kty && "string" == typeof t11.k && nj(e11, t11, r11)) return;
              throw TypeError('JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present');
            }
            if (!ni(t11)) throw TypeError(nn(e11, t11, ...na, "Uint8Array", n11 ? "JSON Web Key" : null));
            if ("secret" !== t11.type) throw TypeError(`${nD(t11)} instances for symmetric algorithms must be of type "secret"`);
          }
        })(t10, r10, n10, e10) : ((e11, t11, r11, n11) => {
          if (n11 && nk(t11)) switch (r11) {
            case "sign":
              if ("oct" !== t11.kty && "string" == typeof t11.d && nj(e11, t11, r11)) return;
              throw TypeError("JSON Web Key for this operation be a private JWK");
            case "verify":
              if ("oct" !== t11.kty && void 0 === t11.d && nj(e11, t11, r11)) return;
              throw TypeError("JSON Web Key for this operation be a public JWK");
          }
          if (!ni(t11)) throw TypeError(nn(e11, t11, ...na, n11 ? "JSON Web Key" : null));
          if ("secret" === t11.type) throw TypeError(`${nD(t11)} instances for asymmetric algorithms must not be of type "secret"`);
          if ("sign" === r11 && "public" === t11.type) throw TypeError(`${nD(t11)} instances for asymmetric algorithm signing must be of type "private"`);
          if ("decrypt" === r11 && "public" === t11.type) throw TypeError(`${nD(t11)} instances for asymmetric algorithm decryption must be of type "private"`);
          if (t11.algorithm && "verify" === r11 && "private" === t11.type) throw TypeError(`${nD(t11)} instances for asymmetric algorithm verifying must be of type "public"`);
          if (t11.algorithm && "encrypt" === r11 && "private" === t11.type) throw TypeError(`${nD(t11)} instances for asymmetric algorithm encryption must be of type "public"`);
        })(t10, r10, n10, e10);
      }
      let n$ = nM.bind(void 0, false);
      async function nL(e10, t10, r10, n10, i10, a10) {
        let o10, s10;
        if (!(t10 instanceof Uint8Array)) throw TypeError(nr(t10, "Uint8Array"));
        let l2 = parseInt(e10.slice(1, 4), 10), c2 = await rj.subtle.importKey("raw", t10.subarray(l2 >> 3), "AES-CBC", false, ["decrypt"]), u2 = await rj.subtle.importKey("raw", t10.subarray(0, l2 >> 3), { hash: `SHA-${l2 << 1}`, name: "HMAC" }, false, ["sign"]), d2 = rH(a10, n10, r10, rK(a10.length << 3)), p2 = new Uint8Array((await rj.subtle.sign("HMAC", u2, d2)).slice(0, l2 >> 3));
        try {
          o10 = ((e11, t11) => {
            if (!(e11 instanceof Uint8Array)) throw TypeError("First argument must be a buffer");
            if (!(t11 instanceof Uint8Array)) throw TypeError("Second argument must be a buffer");
            if (e11.length !== t11.length) throw TypeError("Input buffers must have the same length");
            let r11 = e11.length, n11 = 0, i11 = -1;
            for (; ++i11 < r11; ) n11 |= e11[i11] ^ t11[i11];
            return 0 === n11;
          })(i10, p2);
        } catch {
        }
        if (!o10) throw new r0();
        try {
          s10 = new Uint8Array(await rj.subtle.decrypt({ iv: n10, name: "AES-CBC" }, c2, r10));
        } catch {
        }
        if (!s10) throw new r0();
        return s10;
      }
      async function nH(e10, t10, r10, n10, i10, a10) {
        let o10;
        t10 instanceof Uint8Array ? o10 = await rj.subtle.importKey("raw", t10, "AES-GCM", false, ["decrypt"]) : (ne(t10, e10, "decrypt"), o10 = t10);
        try {
          return new Uint8Array(await rj.subtle.decrypt({ additionalData: a10, iv: n10, name: "AES-GCM", tagLength: 128 }, o10, rH(r10, i10)));
        } catch {
          throw new r0();
        }
      }
      nM.bind(void 0, true);
      let nW = async (e10, t10, r10, n10, i10, a10) => {
        if (!(t10 instanceof CryptoKey) && !(t10 instanceof Uint8Array)) throw TypeError(nr(t10, ...na, "Uint8Array"));
        if (!n10) throw new r1("JWE Initialization Vector missing");
        if (!i10) throw new r1("JWE Authentication Tag missing");
        switch (r6(e10, n10), e10) {
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return t10 instanceof Uint8Array && r8(t10, parseInt(e10.slice(-3), 10)), nL(e10, t10, r10, n10, i10, a10);
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            return t10 instanceof Uint8Array && r8(t10, parseInt(e10.slice(1, 4), 10)), nH(e10, t10, r10, n10, i10, a10);
          default:
            throw new rZ("Unsupported JWE Content Encryption Algorithm");
        }
      };
      async function nK(e10, t10, r10, n10) {
        let i10 = e10.slice(0, 7), a10 = await nl(i10, r10, t10, n10, new Uint8Array(0));
        return { encryptedKey: a10.ciphertext, iv: rJ(a10.iv), tag: rJ(a10.tag) };
      }
      async function nB(e10, t10, r10, n10, i10) {
        return nW(e10.slice(0, 7), t10, r10, n10, i10, new Uint8Array(0));
      }
      async function nq(e10, t10, r10, n10, i10 = {}) {
        let a10, o10, s10;
        switch (n$(e10, r10, "encrypt"), r10 = await nC?.(r10, e10) || r10, e10) {
          case "dir":
            s10 = r10;
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            if (!nm(r10)) throw new rZ("ECDH with the provided key is not allowed or not supported by your javascript runtime");
            let { apu: l2, apv: c2 } = i10, { epk: u2 } = i10;
            u2 || (u2 = (await ng(r10)).privateKey);
            let { x: d2, y: p2, crv: h2, kty: f2 } = await nU(u2), g2 = await nf(r10, u2, "ECDH-ES" === e10 ? t10 : e10, "ECDH-ES" === e10 ? nO(t10) : parseInt(e10.slice(-5, -2), 10), l2, c2);
            if (o10 = { epk: { x: d2, crv: h2, kty: f2 } }, "EC" === f2 && (o10.epk.y = p2), l2 && (o10.apu = rJ(l2)), c2 && (o10.apv = rJ(c2)), "ECDH-ES" === e10) {
              s10 = g2;
              break;
            }
            s10 = n10 || nI(t10);
            let m2 = e10.slice(-6);
            a10 = await np(m2, g2, s10);
            break;
          }
          case "RSA1_5":
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            s10 = n10 || nI(t10), a10 = await nE(e10, r10, s10);
            break;
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW": {
            s10 = n10 || nI(t10);
            let { p2c: l2, p2s: c2 } = i10;
            ({ encryptedKey: a10, ...o10 } = await nb(e10, r10, s10, l2, c2));
            break;
          }
          case "A128KW":
          case "A192KW":
          case "A256KW":
            s10 = n10 || nI(t10), a10 = await np(e10, r10, s10);
            break;
          case "A128GCMKW":
          case "A192GCMKW":
          case "A256GCMKW": {
            s10 = n10 || nI(t10);
            let { iv: l2 } = i10;
            ({ encryptedKey: a10, ...o10 } = await nK(e10, r10, s10, l2));
            break;
          }
          default:
            throw new rZ('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
        return { cek: s10, encryptedKey: a10, parameters: o10 };
      }
      let nF = (...e10) => {
        let t10, r10 = e10.filter(Boolean);
        if (0 === r10.length || 1 === r10.length) return true;
        for (let e11 of r10) {
          let r11 = Object.keys(e11);
          if (!t10 || 0 === t10.size) {
            t10 = new Set(r11);
            continue;
          }
          for (let e12 of r11) {
            if (t10.has(e12)) return false;
            t10.add(e12);
          }
        }
        return true;
      }, nJ = function(e10, t10, r10, n10, i10) {
        let a10;
        if (void 0 !== i10.crit && n10?.crit === void 0) throw new e10('"crit" (Critical) Header Parameter MUST be integrity protected');
        if (!n10 || void 0 === n10.crit) return /* @__PURE__ */ new Set();
        if (!Array.isArray(n10.crit) || 0 === n10.crit.length || n10.crit.some((e11) => "string" != typeof e11 || 0 === e11.length)) throw new e10('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
        for (let o10 of (a10 = void 0 !== r10 ? new Map([...Object.entries(r10), ...t10.entries()]) : t10, n10.crit)) {
          if (!a10.has(o10)) throw new rZ(`Extension Header Parameter "${o10}" is not recognized`);
          if (void 0 === i10[o10]) throw new e10(`Extension Header Parameter "${o10}" is missing`);
          if (a10.get(o10) && void 0 === n10[o10]) throw new e10(`Extension Header Parameter "${o10}" MUST be integrity protected`);
        }
        return new Set(n10.crit);
      };
      class nV {
        constructor(e10) {
          if (!(e10 instanceof Uint8Array)) throw TypeError("plaintext must be an instance of Uint8Array");
          this._plaintext = e10;
        }
        setKeyManagementParameters(e10) {
          if (this._keyManagementParameters) throw TypeError("setKeyManagementParameters can only be called once");
          return this._keyManagementParameters = e10, this;
        }
        setProtectedHeader(e10) {
          if (this._protectedHeader) throw TypeError("setProtectedHeader can only be called once");
          return this._protectedHeader = e10, this;
        }
        setSharedUnprotectedHeader(e10) {
          if (this._sharedUnprotectedHeader) throw TypeError("setSharedUnprotectedHeader can only be called once");
          return this._sharedUnprotectedHeader = e10, this;
        }
        setUnprotectedHeader(e10) {
          if (this._unprotectedHeader) throw TypeError("setUnprotectedHeader can only be called once");
          return this._unprotectedHeader = e10, this;
        }
        setAdditionalAuthenticatedData(e10) {
          return this._aad = e10, this;
        }
        setContentEncryptionKey(e10) {
          if (this._cek) throw TypeError("setContentEncryptionKey can only be called once");
          return this._cek = e10, this;
        }
        setInitializationVector(e10) {
          if (this._iv) throw TypeError("setInitializationVector can only be called once");
          return this._iv = e10, this;
        }
        async encrypt(e10, t10) {
          let r10, n10, i10, a10, o10;
          if (!this._protectedHeader && !this._unprotectedHeader && !this._sharedUnprotectedHeader) throw new r1("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
          if (!nF(this._protectedHeader, this._unprotectedHeader, this._sharedUnprotectedHeader)) throw new r1("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
          let s10 = { ...this._protectedHeader, ...this._unprotectedHeader, ...this._sharedUnprotectedHeader };
          if (nJ(r1, /* @__PURE__ */ new Map(), t10?.crit, this._protectedHeader, s10), void 0 !== s10.zip) throw new rZ('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
          let { alg: l2, enc: c2 } = s10;
          if ("string" != typeof l2 || !l2) throw new r1('JWE "alg" (Algorithm) Header Parameter missing or invalid');
          if ("string" != typeof c2 || !c2) throw new r1('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
          if (this._cek && ("dir" === l2 || "ECDH-ES" === l2)) throw TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${l2}`);
          {
            let i11;
            ({ cek: n10, encryptedKey: r10, parameters: i11 } = await nq(l2, c2, e10, this._cek, this._keyManagementParameters)), i11 && (t10 && rz in t10 ? this._unprotectedHeader ? this._unprotectedHeader = { ...this._unprotectedHeader, ...i11 } : this.setUnprotectedHeader(i11) : this._protectedHeader ? this._protectedHeader = { ...this._protectedHeader, ...i11 } : this.setProtectedHeader(i11));
          }
          a10 = this._protectedHeader ? r$.encode(rJ(JSON.stringify(this._protectedHeader))) : r$.encode(""), this._aad ? (o10 = rJ(this._aad), i10 = rH(a10, r$.encode("."), r$.encode(o10))) : i10 = a10;
          let { ciphertext: u2, tag: d2, iv: p2 } = await nl(c2, this._plaintext, n10, this._iv, i10), h2 = { ciphertext: rJ(u2) };
          return p2 && (h2.iv = rJ(p2)), d2 && (h2.tag = rJ(d2)), r10 && (h2.encrypted_key = rJ(r10)), o10 && (h2.aad = o10), this._protectedHeader && (h2.protected = rL.decode(a10)), this._sharedUnprotectedHeader && (h2.unprotected = this._sharedUnprotectedHeader), this._unprotectedHeader && (h2.header = this._unprotectedHeader), h2;
        }
      }
      class nz {
        constructor(e10) {
          this._flattened = new nV(e10);
        }
        setContentEncryptionKey(e10) {
          return this._flattened.setContentEncryptionKey(e10), this;
        }
        setInitializationVector(e10) {
          return this._flattened.setInitializationVector(e10), this;
        }
        setProtectedHeader(e10) {
          return this._flattened.setProtectedHeader(e10), this;
        }
        setKeyManagementParameters(e10) {
          return this._flattened.setKeyManagementParameters(e10), this;
        }
        async encrypt(e10, t10) {
          let r10 = await this._flattened.encrypt(e10, t10);
          return [r10.protected, r10.encrypted_key, r10.iv, r10.ciphertext, r10.tag].join(".");
        }
      }
      let nG = (e10) => Math.floor(e10.getTime() / 1e3), nX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i, nY = (e10) => {
        let t10, r10 = nX.exec(e10);
        if (!r10 || r10[4] && r10[1]) throw TypeError("Invalid time period format");
        let n10 = parseFloat(r10[2]);
        switch (r10[3].toLowerCase()) {
          case "sec":
          case "secs":
          case "second":
          case "seconds":
          case "s":
            t10 = Math.round(n10);
            break;
          case "minute":
          case "minutes":
          case "min":
          case "mins":
          case "m":
            t10 = Math.round(60 * n10);
            break;
          case "hour":
          case "hours":
          case "hr":
          case "hrs":
          case "h":
            t10 = Math.round(3600 * n10);
            break;
          case "day":
          case "days":
          case "d":
            t10 = Math.round(86400 * n10);
            break;
          case "week":
          case "weeks":
          case "w":
            t10 = Math.round(604800 * n10);
            break;
          default:
            t10 = Math.round(31557600 * n10);
        }
        return "-" === r10[1] || "ago" === r10[4] ? -t10 : t10;
      };
      function nQ(e10, t10) {
        if (!Number.isFinite(t10)) throw TypeError(`Invalid ${e10} input`);
        return t10;
      }
      class nZ {
        constructor(e10 = {}) {
          if (!nx(e10)) throw TypeError("JWT Claims Set MUST be an object");
          this._payload = e10;
        }
        setIssuer(e10) {
          return this._payload = { ...this._payload, iss: e10 }, this;
        }
        setSubject(e10) {
          return this._payload = { ...this._payload, sub: e10 }, this;
        }
        setAudience(e10) {
          return this._payload = { ...this._payload, aud: e10 }, this;
        }
        setJti(e10) {
          return this._payload = { ...this._payload, jti: e10 }, this;
        }
        setNotBefore(e10) {
          return "number" == typeof e10 ? this._payload = { ...this._payload, nbf: nQ("setNotBefore", e10) } : e10 instanceof Date ? this._payload = { ...this._payload, nbf: nQ("setNotBefore", nG(e10)) } : this._payload = { ...this._payload, nbf: nG(/* @__PURE__ */ new Date()) + nY(e10) }, this;
        }
        setExpirationTime(e10) {
          return "number" == typeof e10 ? this._payload = { ...this._payload, exp: nQ("setExpirationTime", e10) } : e10 instanceof Date ? this._payload = { ...this._payload, exp: nQ("setExpirationTime", nG(e10)) } : this._payload = { ...this._payload, exp: nG(/* @__PURE__ */ new Date()) + nY(e10) }, this;
        }
        setIssuedAt(e10) {
          return void 0 === e10 ? this._payload = { ...this._payload, iat: nG(/* @__PURE__ */ new Date()) } : e10 instanceof Date ? this._payload = { ...this._payload, iat: nQ("setIssuedAt", nG(e10)) } : "string" == typeof e10 ? this._payload = { ...this._payload, iat: nQ("setIssuedAt", nG(/* @__PURE__ */ new Date()) + nY(e10)) } : this._payload = { ...this._payload, iat: nQ("setIssuedAt", e10) }, this;
        }
      }
      class n0 extends nZ {
        setProtectedHeader(e10) {
          if (this._protectedHeader) throw TypeError("setProtectedHeader can only be called once");
          return this._protectedHeader = e10, this;
        }
        setKeyManagementParameters(e10) {
          if (this._keyManagementParameters) throw TypeError("setKeyManagementParameters can only be called once");
          return this._keyManagementParameters = e10, this;
        }
        setContentEncryptionKey(e10) {
          if (this._cek) throw TypeError("setContentEncryptionKey can only be called once");
          return this._cek = e10, this;
        }
        setInitializationVector(e10) {
          if (this._iv) throw TypeError("setInitializationVector can only be called once");
          return this._iv = e10, this;
        }
        replicateIssuerAsHeader() {
          return this._replicateIssuerAsHeader = true, this;
        }
        replicateSubjectAsHeader() {
          return this._replicateSubjectAsHeader = true, this;
        }
        replicateAudienceAsHeader() {
          return this._replicateAudienceAsHeader = true, this;
        }
        async encrypt(e10, t10) {
          let r10 = new nz(r$.encode(JSON.stringify(this._payload)));
          return this._replicateIssuerAsHeader && (this._protectedHeader = { ...this._protectedHeader, iss: this._payload.iss }), this._replicateSubjectAsHeader && (this._protectedHeader = { ...this._protectedHeader, sub: this._payload.sub }), this._replicateAudienceAsHeader && (this._protectedHeader = { ...this._protectedHeader, aud: this._payload.aud }), r10.setProtectedHeader(this._protectedHeader), this._iv && r10.setInitializationVector(this._iv), this._cek && r10.setContentEncryptionKey(this._cek), this._keyManagementParameters && r10.setKeyManagementParameters(this._keyManagementParameters), r10.encrypt(e10, t10);
        }
      }
      e.s(["decode", 0, rV, "encode", 0, rJ], 20638);
      var n1 = e.i(20638), n1 = n1;
      let n2 = (e10, t10) => {
        if ("string" != typeof e10 || !e10) throw new r3(`${t10} missing or invalid`);
      };
      async function n3(e10, t10) {
        let r10;
        if (!nx(e10)) throw TypeError("JWK must be an object");
        if (t10 ?? (t10 = "sha256"), "sha256" !== t10 && "sha384" !== t10 && "sha512" !== t10) throw TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
        switch (e10.kty) {
          case "EC":
            n2(e10.crv, '"crv" (Curve) Parameter'), n2(e10.x, '"x" (X Coordinate) Parameter'), n2(e10.y, '"y" (Y Coordinate) Parameter'), r10 = { crv: e10.crv, kty: e10.kty, x: e10.x, y: e10.y };
            break;
          case "OKP":
            n2(e10.crv, '"crv" (Subtype of Key Pair) Parameter'), n2(e10.x, '"x" (Public Key) Parameter'), r10 = { crv: e10.crv, kty: e10.kty, x: e10.x };
            break;
          case "RSA":
            n2(e10.e, '"e" (Exponent) Parameter'), n2(e10.n, '"n" (Modulus) Parameter'), r10 = { e: e10.e, kty: e10.kty, n: e10.n };
            break;
          case "oct":
            n2(e10.k, '"k" (Key Value) Parameter'), r10 = { k: e10.k, kty: e10.kty };
            break;
          default:
            throw new rZ('"kty" (Key Type) Parameter missing or unsupported');
        }
        let n10 = r$.encode(JSON.stringify(r10));
        return rJ(await rM(t10, n10));
      }
      async function n4(e10, t10) {
        if (!nx(e10)) throw TypeError("JWK must be an object");
        switch (t10 || (t10 = e10.alg), e10.kty) {
          case "oct":
            if ("string" != typeof e10.k || !e10.k) throw TypeError('missing "k" (Key Value) Parameter value');
            return rV(e10.k);
          case "RSA":
            if ("oth" in e10 && void 0 !== e10.oth) throw new rZ('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
          case "EC":
          case "OKP":
            return nT({ ...e10, alg: t10 });
          default:
            throw new rZ('Unsupported "kty" (Key Type) Parameter value');
        }
      }
      async function n5(e10, t10, r10, n10, i10) {
        switch (n$(e10, t10, "decrypt"), t10 = await nP?.(t10, e10) || t10, e10) {
          case "dir":
            if (void 0 !== r10) throw new r1("Encountered unexpected JWE Encrypted Key");
            return t10;
          case "ECDH-ES":
            if (void 0 !== r10) throw new r1("Encountered unexpected JWE Encrypted Key");
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            let i11, a10;
            if (!nx(n10.epk)) throw new r1('JOSE Header "epk" (Ephemeral Public Key) missing or invalid');
            if (!nm(t10)) throw new rZ("ECDH with the provided key is not allowed or not supported by your javascript runtime");
            let o10 = await n4(n10.epk, e10);
            if (void 0 !== n10.apu) {
              if ("string" != typeof n10.apu) throw new r1('JOSE Header "apu" (Agreement PartyUInfo) invalid');
              try {
                i11 = rV(n10.apu);
              } catch {
                throw new r1("Failed to base64url decode the apu");
              }
            }
            if (void 0 !== n10.apv) {
              if ("string" != typeof n10.apv) throw new r1('JOSE Header "apv" (Agreement PartyVInfo) invalid');
              try {
                a10 = rV(n10.apv);
              } catch {
                throw new r1("Failed to base64url decode the apv");
              }
            }
            let s10 = await nf(o10, t10, "ECDH-ES" === e10 ? n10.enc : e10, "ECDH-ES" === e10 ? nO(n10.enc) : parseInt(e10.slice(-5, -2), 10), i11, a10);
            if ("ECDH-ES" === e10) return s10;
            if (void 0 === r10) throw new r1("JWE Encrypted Key missing");
            return nh(e10.slice(-6), s10, r10);
          }
          case "RSA1_5":
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            if (void 0 === r10) throw new r1("JWE Encrypted Key missing");
            return nS(e10, t10, r10);
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW": {
            let a10;
            if (void 0 === r10) throw new r1("JWE Encrypted Key missing");
            if ("number" != typeof n10.p2c) throw new r1('JOSE Header "p2c" (PBES2 Count) missing or invalid');
            let o10 = i10?.maxPBES2Count || 1e4;
            if (n10.p2c > o10) throw new r1('JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds');
            if ("string" != typeof n10.p2s) throw new r1('JOSE Header "p2s" (PBES2 Salt) missing or invalid');
            try {
              a10 = rV(n10.p2s);
            } catch {
              throw new r1("Failed to base64url decode the p2s");
            }
            return nw(e10, t10, r10, n10.p2c, a10);
          }
          case "A128KW":
          case "A192KW":
          case "A256KW":
            if (void 0 === r10) throw new r1("JWE Encrypted Key missing");
            return nh(e10, t10, r10);
          case "A128GCMKW":
          case "A192GCMKW":
          case "A256GCMKW": {
            let i11, a10;
            if (void 0 === r10) throw new r1("JWE Encrypted Key missing");
            if ("string" != typeof n10.iv) throw new r1('JOSE Header "iv" (Initialization Vector) missing or invalid');
            if ("string" != typeof n10.tag) throw new r1('JOSE Header "tag" (Authentication Tag) missing or invalid');
            try {
              i11 = rV(n10.iv);
            } catch {
              throw new r1("Failed to base64url decode the iv");
            }
            try {
              a10 = rV(n10.tag);
            } catch {
              throw new r1("Failed to base64url decode the tag");
            }
            return nB(e10, t10, r10, i11, a10);
          }
          default:
            throw new rZ('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
      }
      let n6 = (e10, t10) => {
        if (void 0 !== t10 && (!Array.isArray(t10) || t10.some((e11) => "string" != typeof e11))) throw TypeError(`"${e10}" option must be an array of strings`);
        if (t10) return new Set(t10);
      };
      async function n8(e10, t10, r10) {
        let n10, i10, a10, o10, s10, l2, c2;
        if (!nx(e10)) throw new r1("Flattened JWE must be an object");
        if (void 0 === e10.protected && void 0 === e10.header && void 0 === e10.unprotected) throw new r1("JOSE Header missing");
        if (void 0 !== e10.iv && "string" != typeof e10.iv) throw new r1("JWE Initialization Vector incorrect type");
        if ("string" != typeof e10.ciphertext) throw new r1("JWE Ciphertext missing or incorrect type");
        if (void 0 !== e10.tag && "string" != typeof e10.tag) throw new r1("JWE Authentication Tag incorrect type");
        if (void 0 !== e10.protected && "string" != typeof e10.protected) throw new r1("JWE Protected Header incorrect type");
        if (void 0 !== e10.encrypted_key && "string" != typeof e10.encrypted_key) throw new r1("JWE Encrypted Key incorrect type");
        if (void 0 !== e10.aad && "string" != typeof e10.aad) throw new r1("JWE AAD incorrect type");
        if (void 0 !== e10.header && !nx(e10.header)) throw new r1("JWE Shared Unprotected Header incorrect type");
        if (void 0 !== e10.unprotected && !nx(e10.unprotected)) throw new r1("JWE Per-Recipient Unprotected Header incorrect type");
        if (e10.protected) try {
          let t11 = rV(e10.protected);
          n10 = JSON.parse(rL.decode(t11));
        } catch {
          throw new r1("JWE Protected Header is invalid");
        }
        if (!nF(n10, e10.header, e10.unprotected)) throw new r1("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
        let u2 = { ...n10, ...e10.header, ...e10.unprotected };
        if (nJ(r1, /* @__PURE__ */ new Map(), r10?.crit, n10, u2), void 0 !== u2.zip) throw new rZ('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
        let { alg: d2, enc: p2 } = u2;
        if ("string" != typeof d2 || !d2) throw new r1("missing JWE Algorithm (alg) in JWE Header");
        if ("string" != typeof p2 || !p2) throw new r1("missing JWE Encryption Algorithm (enc) in JWE Header");
        let h2 = r10 && n6("keyManagementAlgorithms", r10.keyManagementAlgorithms), f2 = r10 && n6("contentEncryptionAlgorithms", r10.contentEncryptionAlgorithms);
        if (h2 && !h2.has(d2) || !h2 && d2.startsWith("PBES2")) throw new rQ('"alg" (Algorithm) Header Parameter value not allowed');
        if (f2 && !f2.has(p2)) throw new rQ('"enc" (Encryption Algorithm) Header Parameter value not allowed');
        if (void 0 !== e10.encrypted_key) try {
          i10 = rV(e10.encrypted_key);
        } catch {
          throw new r1("Failed to base64url decode the encrypted_key");
        }
        let g2 = false;
        "function" == typeof t10 && (t10 = await t10(n10, e10), g2 = true);
        try {
          a10 = await n5(d2, t10, i10, u2, r10);
        } catch (e11) {
          if (e11 instanceof TypeError || e11 instanceof r1 || e11 instanceof rZ) throw e11;
          a10 = nI(p2);
        }
        if (void 0 !== e10.iv) try {
          o10 = rV(e10.iv);
        } catch {
          throw new r1("Failed to base64url decode the iv");
        }
        if (void 0 !== e10.tag) try {
          s10 = rV(e10.tag);
        } catch {
          throw new r1("Failed to base64url decode the tag");
        }
        let m2 = r$.encode(e10.protected ?? "");
        l2 = void 0 !== e10.aad ? rH(m2, r$.encode("."), r$.encode(e10.aad)) : m2;
        try {
          c2 = rV(e10.ciphertext);
        } catch {
          throw new r1("Failed to base64url decode the ciphertext");
        }
        let y2 = { plaintext: await nW(p2, a10, c2, o10, s10, l2) };
        if (void 0 !== e10.protected && (y2.protectedHeader = n10), void 0 !== e10.aad) try {
          y2.additionalAuthenticatedData = rV(e10.aad);
        } catch {
          throw new r1("Failed to base64url decode the aad");
        }
        return (void 0 !== e10.unprotected && (y2.sharedUnprotectedHeader = e10.unprotected), void 0 !== e10.header && (y2.unprotectedHeader = e10.header), g2) ? { ...y2, key: t10 } : y2;
      }
      async function n9(e10, t10, r10) {
        if (e10 instanceof Uint8Array && (e10 = rL.decode(e10)), "string" != typeof e10) throw new r1("Compact JWE must be a string or Uint8Array");
        let { 0: n10, 1: i10, 2: a10, 3: o10, 4: s10, length: l2 } = e10.split(".");
        if (5 !== l2) throw new r1("Invalid Compact JWE");
        let c2 = await n8({ ciphertext: o10, iv: a10 || void 0, protected: n10, tag: s10 || void 0, encrypted_key: i10 || void 0 }, t10, r10), u2 = { plaintext: c2.plaintext, protectedHeader: c2.protectedHeader };
        return "function" == typeof t10 ? { ...u2, key: c2.key } : u2;
      }
      let n7 = (e10) => e10.toLowerCase().replace(/^application\//, "");
      async function ie(e10, t10, r10) {
        let n10 = await n9(e10, t10, r10), i10 = ((e11, t11, r11 = {}) => {
          var n11, i11;
          let a11, o11;
          try {
            a11 = JSON.parse(rL.decode(t11));
          } catch {
          }
          if (!nx(a11)) throw new r2("JWT Claims Set must be a top-level JSON object");
          let { typ: s10 } = r11;
          if (s10 && ("string" != typeof e11.typ || n7(e11.typ) !== n7(s10))) throw new rX('unexpected "typ" JWT header value', a11, "typ", "check_failed");
          let { requiredClaims: l2 = [], issuer: c2, subject: u2, audience: d2, maxTokenAge: p2 } = r11, h2 = [...l2];
          for (let e12 of (void 0 !== p2 && h2.push("iat"), void 0 !== d2 && h2.push("aud"), void 0 !== u2 && h2.push("sub"), void 0 !== c2 && h2.push("iss"), new Set(h2.reverse()))) if (!(e12 in a11)) throw new rX(`missing required "${e12}" claim`, a11, e12, "missing");
          if (c2 && !(Array.isArray(c2) ? c2 : [c2]).includes(a11.iss)) throw new rX('unexpected "iss" claim value', a11, "iss", "check_failed");
          if (u2 && a11.sub !== u2) throw new rX('unexpected "sub" claim value', a11, "sub", "check_failed");
          if (d2 && (n11 = a11.aud, i11 = "string" == typeof d2 ? [d2] : d2, "string" == typeof n11 ? !i11.includes(n11) : !(Array.isArray(n11) && i11.some(Set.prototype.has.bind(new Set(n11)))))) throw new rX('unexpected "aud" claim value', a11, "aud", "check_failed");
          switch (typeof r11.clockTolerance) {
            case "string":
              o11 = nY(r11.clockTolerance);
              break;
            case "number":
              o11 = r11.clockTolerance;
              break;
            case "undefined":
              o11 = 0;
              break;
            default:
              throw TypeError("Invalid clockTolerance option type");
          }
          let { currentDate: f2 } = r11, g2 = nG(f2 || /* @__PURE__ */ new Date());
          if ((void 0 !== a11.iat || p2) && "number" != typeof a11.iat) throw new rX('"iat" claim must be a number', a11, "iat", "invalid");
          if (void 0 !== a11.nbf) {
            if ("number" != typeof a11.nbf) throw new rX('"nbf" claim must be a number', a11, "nbf", "invalid");
            if (a11.nbf > g2 + o11) throw new rX('"nbf" claim timestamp check failed', a11, "nbf", "check_failed");
          }
          if (void 0 !== a11.exp) {
            if ("number" != typeof a11.exp) throw new rX('"exp" claim must be a number', a11, "exp", "invalid");
            if (a11.exp <= g2 - o11) throw new rY('"exp" claim timestamp check failed', a11, "exp", "check_failed");
          }
          if (p2) {
            let e12 = g2 - a11.iat;
            if (e12 - o11 > ("number" == typeof p2 ? p2 : nY(p2))) throw new rY('"iat" claim timestamp check failed (too far in the past)', a11, "iat", "check_failed");
            if (e12 < 0 - o11) throw new rX('"iat" claim timestamp check failed (it should be in the past)', a11, "iat", "check_failed");
          }
          return a11;
        })(n10.protectedHeader, n10.plaintext, r10), { protectedHeader: a10 } = n10;
        if (void 0 !== a10.iss && a10.iss !== i10.iss) throw new rX('replicated "iss" claim header parameter mismatch', i10, "iss", "mismatch");
        if (void 0 !== a10.sub && a10.sub !== i10.sub) throw new rX('replicated "sub" claim header parameter mismatch', i10, "sub", "mismatch");
        if (void 0 !== a10.aud && JSON.stringify(a10.aud) !== JSON.stringify(i10.aud)) throw new rX('replicated "aud" claim header parameter mismatch', i10, "aud", "mismatch");
        let o10 = { payload: i10, protectedHeader: a10 };
        return "function" == typeof t10 ? { ...o10, key: n10.key } : o10;
      }
      var it = e.i(48086);
      let ir = "A256CBC-HS512";
      async function ii(e10) {
        let { token: t10 = {}, secret: r10, maxAge: n10 = 2592e3, salt: i10 } = e10, a10 = Array.isArray(r10) ? r10 : [r10], o10 = await io(ir, a10[0], i10), s10 = await n3({ kty: "oct", k: n1.encode(o10) }, `sha${o10.byteLength << 3}`);
        return await new n0(t10).setProtectedHeader({ alg: "dir", enc: ir, kid: s10 }).setIssuedAt().setExpirationTime((Date.now() / 1e3 | 0) + n10).setJti(crypto.randomUUID()).encrypt(o10);
      }
      async function ia(e10) {
        let { token: t10, secret: r10, salt: n10 } = e10, i10 = Array.isArray(r10) ? r10 : [r10];
        if (!t10) return null;
        let { payload: a10 } = await ie(t10, async ({ kid: e11, enc: t11 }) => {
          for (let r11 of i10) {
            let i11 = await io(t11, r11, n10);
            if (void 0 === e11 || e11 === await n3({ kty: "oct", k: n1.encode(i11) }, `sha${i11.byteLength << 3}`)) return i11;
          }
          throw Error("no matching decryption secret");
        }, { clockTolerance: 15, keyManagementAlgorithms: ["dir"], contentEncryptionAlgorithms: [ir, "A256GCM"] });
        return a10;
      }
      async function io(e10, t10, r10) {
        let n10;
        switch (e10) {
          case "A256CBC-HS512":
            n10 = 64;
            break;
          case "A256GCM":
            n10 = 32;
            break;
          default:
            throw Error("Unsupported JWT Content Encryption Algorithm");
        }
        return await rD("sha256", t10, r10, `Auth.js Generated Encryption Key (${r10})`, n10);
      }
      async function is({ options: e10, paramValue: t10, cookieValue: r10 }) {
        let { url: n10, callbacks: i10 } = e10, a10 = n10.origin;
        return t10 ? a10 = await i10.redirect({ url: t10, baseUrl: n10.origin }) : r10 && (a10 = await i10.redirect({ url: r10, baseUrl: n10.origin })), { callbackUrl: a10, callbackUrlCookie: a10 !== r10 ? a10 : void 0 };
      }
      let il = "\x1B[31m", ic = "\x1B[0m", iu = { error(e10) {
        let t10 = e10 instanceof t2 ? e10.type : e10.name;
        if (console.error(`${il}[auth][error]${ic} ${t10}: ${e10.message}`), e10.cause && "object" == typeof e10.cause && "err" in e10.cause && e10.cause.err instanceof Error) {
          let { err: t11, ...r10 } = e10.cause;
          console.error(`${il}[auth][cause]${ic}:`, t11.stack), r10 && console.error(`${il}[auth][details]${ic}:`, JSON.stringify(r10, null, 2));
        } else e10.stack && console.error(e10.stack.replace(/.*/, "").substring(1));
      }, warn(e10) {
        let t10 = `https://warnings.authjs.dev#${e10}`;
        console.warn(`\x1B[33m[auth][warn][${e10}]${ic}`, `Read more: ${t10}`);
      }, debug(e10, t10) {
        console.log(`\x1B[90m[auth][debug]:${ic} ${e10}`, JSON.stringify(t10, null, 2));
      } };
      function id(e10) {
        let t10 = { ...iu };
        return e10.debug || (t10.debug = () => {
        }), e10.logger?.error && (t10.error = e10.logger.error), e10.logger?.warn && (t10.warn = e10.logger.warn), e10.logger?.debug && (t10.debug = e10.logger.debug), e10.logger ?? (e10.logger = t10), t10;
      }
      let ip = ["providers", "session", "csrf", "signin", "signout", "callback", "verify-request", "error", "webauthn-options"];
      async function ih(e10) {
        if (!("body" in e10) || !e10.body || "POST" !== e10.method) return;
        let t10 = e10.headers.get("content-type");
        return t10?.includes("application/json") ? await e10.json() : t10?.includes("application/x-www-form-urlencoded") ? Object.fromEntries(new URLSearchParams(await e10.text())) : void 0;
      }
      async function ig(e10, t10) {
        try {
          if ("GET" !== e10.method && "POST" !== e10.method) throw new rh("Only GET and POST requests are supported");
          t10.basePath ?? (t10.basePath = "/auth");
          let r10 = new URL(e10.url), { action: n10, providerId: i10 } = function(e11, t11) {
            let r11 = e11.match(RegExp(`^${t11}(.+)`));
            if (null === r11) throw new rh(`Cannot parse action at ${e11}`);
            let n11 = r11.at(-1).replace(/^\//, "").split("/").filter(Boolean);
            if (1 !== n11.length && 2 !== n11.length) throw new rh(`Cannot parse action at ${e11}`);
            let [i11, a10] = n11;
            if (!ip.includes(i11) || a10 && !["signin", "callback", "webauthn-options"].includes(i11)) throw new rh(`Cannot parse action at ${e11}`);
            return { action: i11, providerId: a10 };
          }(r10.pathname, t10.basePath);
          return { url: r10, action: n10, providerId: i10, method: e10.method, headers: Object.fromEntries(e10.headers), body: e10.body ? await ih(e10) : void 0, cookies: (0, it.parse)(e10.headers.get("cookie") ?? "") ?? {}, error: r10.searchParams.get("error") ?? void 0, query: Object.fromEntries(r10.searchParams) };
        } catch (n10) {
          let r10 = id(t10);
          r10.error(n10), r10.debug("request", e10);
        }
      }
      function im(e10) {
        let t10 = new Headers(e10.headers);
        e10.cookies?.forEach((e11) => {
          let { name: r11, value: n11, options: i10 } = e11, a10 = (0, it.serialize)(r11, n11, i10);
          t10.has("Set-Cookie") ? t10.append("Set-Cookie", a10) : t10.set("Set-Cookie", a10);
        });
        let r10 = e10.body;
        "application/json" === t10.get("content-type") ? r10 = JSON.stringify(e10.body) : "application/x-www-form-urlencoded" === t10.get("content-type") && (r10 = new URLSearchParams(e10.body).toString());
        let n10 = new Response(r10, { headers: t10, status: e10.redirect ? 302 : e10.status ?? 200 });
        return e10.redirect && n10.headers.set("Location", e10.redirect), n10;
      }
      async function iy(e10) {
        let t10 = new TextEncoder().encode(e10);
        return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", t10))).map((e11) => e11.toString(16).padStart(2, "0")).join("").toString();
      }
      function ib(e10) {
        return Array.from(crypto.getRandomValues(new Uint8Array(e10))).reduce((e11, t10) => e11 + ("0" + t10.toString(16)).slice(-2), "");
      }
      async function iw({ options: e10, cookieValue: t10, isPost: r10, bodyValue: n10 }) {
        if (t10) {
          let [i11, a11] = t10.split("|");
          if (a11 === await iy(`${i11}${e10.secret}`)) return { csrfTokenVerified: r10 && i11 === n10, csrfToken: i11 };
        }
        let i10 = ib(32), a10 = await iy(`${i10}${e10.secret}`);
        return { cookie: `${i10}|${a10}`, csrfToken: i10 };
      }
      function iv(e10, t10) {
        if (!t10) throw new rb(`CSRF token was missing during an action ${e10}`);
      }
      function i_(e10) {
        return null !== e10 && "object" == typeof e10;
      }
      function iE(e10, ...t10) {
        if (!t10.length) return e10;
        let r10 = t10.shift();
        if (i_(e10) && i_(r10)) for (let t11 in r10) i_(r10[t11]) ? (i_(e10[t11]) || (e10[t11] = Array.isArray(r10[t11]) ? [] : {}), iE(e10[t11], r10[t11])) : void 0 !== r10[t11] && (e10[t11] = r10[t11]);
        return iE(e10, ...t10);
      }
      let iS = Symbol("skip-csrf-check"), ix = Symbol("return-type-raw"), ik = Symbol("custom-fetch"), iT = Symbol("conform-internal"), iA = (e10) => iC({ id: e10.sub ?? e10.id ?? crypto.randomUUID(), name: e10.name ?? e10.nickname ?? e10.preferred_username, email: e10.email, image: e10.picture }), iR = (e10) => iC({ access_token: e10.access_token, id_token: e10.id_token, refresh_token: e10.refresh_token, expires_at: e10.expires_at, scope: e10.scope, token_type: e10.token_type, session_state: e10.session_state });
      function iC(e10) {
        let t10 = {};
        for (let [r10, n10] of Object.entries(e10)) void 0 !== n10 && (t10[r10] = n10);
        return t10;
      }
      function iP(e10, t10) {
        if (!e10 && t10) return;
        if ("string" == typeof e10) return { url: new URL(e10) };
        let r10 = new URL(e10?.url ?? "https://authjs.dev");
        if (e10?.params != null) for (let [t11, n10] of Object.entries(e10.params)) "claims" === t11 && (n10 = JSON.stringify(n10)), r10.searchParams.set(t11, String(n10));
        return { url: r10, request: e10?.request, conform: e10?.conform, ...e10?.clientPrivateKey ? { clientPrivateKey: e10?.clientPrivateKey } : null };
      }
      let iO = { signIn: () => true, redirect: ({ url: e10, baseUrl: t10 }) => e10.startsWith("/") ? `${t10}${e10}` : new URL(e10).origin === t10 ? e10 : t10, session: ({ session: e10 }) => ({ user: { name: e10.user?.name, email: e10.user?.email, image: e10.user?.image }, expires: e10.expires?.toISOString?.() ?? e10.expires }), jwt: ({ token: e10 }) => e10 };
      async function iI({ authOptions: e10, providerId: t10, action: r10, url: n10, cookies: i10, callbackUrl: a10, csrfToken: o10, csrfDisabled: s10, isPost: l2 }) {
        var c2, u2;
        let d2 = id(e10), { providers: p2, provider: h2 } = function(e11) {
          let { providerId: t11, config: r11 } = e11, n11 = new URL(r11.basePath ?? "/auth", e11.url.origin), i11 = r11.providers.map((e12) => {
            let t12 = "function" == typeof e12 ? e12() : e12, { options: i12, ...a11 } = t12, o11 = i12?.id ?? a11.id, s11 = iE(a11, i12, { signinUrl: `${n11}/signin/${o11}`, callbackUrl: `${n11}/callback/${o11}` });
            if ("oauth" === t12.type || "oidc" === t12.type) {
              var l3;
              let e13, t13, n12, a12;
              s11.redirectProxyUrl ?? (s11.redirectProxyUrl = i12?.redirectProxyUrl ?? r11.redirectProxyUrl);
              let o12 = ((l3 = s11).issuer && (l3.wellKnown ?? (l3.wellKnown = `${l3.issuer}/.well-known/openid-configuration`)), (e13 = iP(l3.authorization, l3.issuer)) && !e13.url?.searchParams.has("scope") && e13.url.searchParams.set("scope", "openid profile email"), t13 = iP(l3.token, l3.issuer), n12 = iP(l3.userinfo, l3.issuer), a12 = l3.checks ?? ["pkce"], l3.redirectProxyUrl && (a12.includes("state") || a12.push("state"), l3.redirectProxyUrl = `${l3.redirectProxyUrl}/callback/${l3.id}`), { ...l3, authorization: e13, token: t13, checks: a12, userinfo: n12, profile: l3.profile ?? iA, account: l3.account ?? iR });
              return o12.authorization?.url.searchParams.get("response_mode") === "form_post" && delete o12.redirectProxyUrl, o12[ik] ?? (o12[ik] = i12?.[ik]), o12;
            }
            return s11;
          });
          return { providers: i11, provider: i11.find(({ id: e12 }) => e12 === t11) };
        }({ url: n10, providerId: t10, config: e10 }), f2 = false;
        if ((h2?.type === "oauth" || h2?.type === "oidc") && h2.redirectProxyUrl) try {
          f2 = new URL(h2.redirectProxyUrl).origin === n10.origin;
        } catch {
          throw TypeError(`redirectProxyUrl must be a valid URL. Received: ${h2.redirectProxyUrl}`);
        }
        let g2 = { debug: false, pages: {}, theme: { colorScheme: "auto", logo: "", brandColor: "", buttonText: "" }, ...e10, url: n10, action: r10, provider: h2, cookies: iE(t0(e10.useSecureCookies ?? "https:" === n10.protocol), e10.cookies), providers: p2, session: { strategy: e10.adapter ? "database" : "jwt", maxAge: 2592e3, updateAge: 86400, generateSessionToken: () => crypto.randomUUID(), ...e10.session }, jwt: { secret: e10.secret, maxAge: e10.session?.maxAge ?? 2592e3, encode: ii, decode: ia, ...e10.jwt }, events: (c2 = e10.events ?? {}, u2 = d2, Object.keys(c2).reduce((e11, t11) => (e11[t11] = async (...e12) => {
          try {
            let r11 = c2[t11];
            return await r11(...e12);
          } catch (e13) {
            u2.error(new t9(e13));
          }
        }, e11), {})), adapter: function(e11, t11) {
          if (e11) return Object.keys(e11).reduce((r11, n11) => (r11[n11] = async (...r12) => {
            try {
              t11.debug(`adapter_${n11}`, { args: r12 });
              let i11 = e11[n11];
              return await i11(...r12);
            } catch (r13) {
              let e12 = new t4(r13);
              throw t11.error(e12), e12;
            }
          }, r11), {});
        }(e10.adapter, d2), callbacks: { ...iO, ...e10.callbacks }, logger: d2, callbackUrl: n10.origin, isOnRedirectProxy: f2, experimental: { ...e10.experimental } }, m2 = [];
        if (s10) g2.csrfTokenVerified = true;
        else {
          let { csrfToken: e11, cookie: t11, csrfTokenVerified: r11 } = await iw({ options: g2, cookieValue: i10?.[g2.cookies.csrfToken.name], isPost: l2, bodyValue: o10 });
          g2.csrfToken = e11, g2.csrfTokenVerified = r11, t11 && m2.push({ name: g2.cookies.csrfToken.name, value: t11, options: g2.cookies.csrfToken.options });
        }
        let { callbackUrl: y2, callbackUrlCookie: b2 } = await is({ options: g2, cookieValue: i10?.[g2.cookies.callbackUrl.name], paramValue: a10 });
        return g2.callbackUrl = y2, b2 && m2.push({ name: g2.cookies.callbackUrl.name, value: b2, options: g2.cookies.callbackUrl.options }), { options: g2, cookies: m2 };
      }
      var iN, iU, iD, ij, iM, i$, iL, iH, iW, iK, iB, iq, iF, iJ, iV, iz, iG, iX, iY, iQ, iZ, i0, i1, i2, i3, i4, i5 = {}, i6 = [], i8 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
      function i9(e10, t10) {
        for (var r10 in t10) e10[r10] = t10[r10];
        return e10;
      }
      function i7(e10) {
        var t10 = e10.parentNode;
        t10 && t10.removeChild(e10);
      }
      function ae(e10, t10, r10, n10, i10) {
        var a10 = { type: e10, props: t10, key: r10, ref: n10, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == i10 ? ++i2 : i10 };
        return null == i10 && null != i1.vnode && i1.vnode(a10), a10;
      }
      function at(e10) {
        return e10.children;
      }
      function ar(e10, t10) {
        this.props = e10, this.context = t10;
      }
      function an(e10, t10) {
        if (null == t10) return e10.__ ? an(e10.__, e10.__.__k.indexOf(e10) + 1) : null;
        for (var r10; t10 < e10.__k.length; t10++) if (null != (r10 = e10.__k[t10]) && null != r10.__e) return r10.__e;
        return "function" == typeof e10.type ? an(e10) : null;
      }
      function ai(e10) {
        (!e10.__d && (e10.__d = true) && i3.push(e10) && !aa.__r++ || i4 !== i1.debounceRendering) && ((i4 = i1.debounceRendering) || setTimeout)(aa);
      }
      function aa() {
        for (var e10; aa.__r = i3.length; ) e10 = i3.sort(function(e11, t10) {
          return e11.__v.__b - t10.__v.__b;
        }), i3 = [], e10.some(function(e11) {
          var t10, r10, n10, i10, a10;
          e11.__d && (i10 = (n10 = e11.__v).__e, (a10 = e11.__P) && (t10 = [], (r10 = i9({}, n10)).__v = n10.__v + 1, ap(a10, n10, r10, e11.__n, void 0 !== a10.ownerSVGElement, null != n10.__h ? [i10] : null, t10, null == i10 ? an(n10) : i10, n10.__h), function(e12, t11) {
            i1.__c && i1.__c(t11, e12), e12.some(function(t12) {
              try {
                e12 = t12.__h, t12.__h = [], e12.some(function(e13) {
                  e13.call(t12);
                });
              } catch (e13) {
                i1.__e(e13, t12.__v);
              }
            });
          }(t10, n10), n10.__e != i10 && function e12(t11) {
            var r11, n11;
            if (null != (t11 = t11.__) && null != t11.__c) {
              for (t11.__e = t11.__c.base = null, r11 = 0; r11 < t11.__k.length; r11++) if (null != (n11 = t11.__k[r11]) && null != n11.__e) {
                t11.__e = t11.__c.base = n11.__e;
                break;
              }
              return e12(t11);
            }
          }(n10)));
        });
      }
      function ao(e10, t10, r10, n10, i10, a10, o10, s10, l2, c2) {
        var u2, d2, p2, h2, f2, g2, m2, y2 = n10 && n10.__k || i6, b2 = y2.length;
        for (r10.__k = [], u2 = 0; u2 < t10.length; u2++) if (null != (h2 = r10.__k[u2] = null == (h2 = t10[u2]) || "boolean" == typeof h2 ? null : "string" == typeof h2 || "number" == typeof h2 || "bigint" == typeof h2 ? ae(null, h2, null, null, h2) : Array.isArray(h2) ? ae(at, { children: h2 }, null, null, null) : h2.__b > 0 ? ae(h2.type, h2.props, h2.key, h2.ref ? h2.ref : null, h2.__v) : h2)) {
          if (h2.__ = r10, h2.__b = r10.__b + 1, null === (p2 = y2[u2]) || p2 && h2.key == p2.key && h2.type === p2.type) y2[u2] = void 0;
          else for (d2 = 0; d2 < b2; d2++) {
            if ((p2 = y2[d2]) && h2.key == p2.key && h2.type === p2.type) {
              y2[d2] = void 0;
              break;
            }
            p2 = null;
          }
          ap(e10, h2, p2 = p2 || i5, i10, a10, o10, s10, l2, c2), f2 = h2.__e, (d2 = h2.ref) && p2.ref != d2 && (m2 || (m2 = []), p2.ref && m2.push(p2.ref, null, h2), m2.push(d2, h2.__c || f2, h2)), null != f2 ? (null == g2 && (g2 = f2), "function" == typeof h2.type && h2.__k === p2.__k ? h2.__d = l2 = function e11(t11, r11, n11) {
            for (var i11, a11 = t11.__k, o11 = 0; a11 && o11 < a11.length; o11++) (i11 = a11[o11]) && (i11.__ = t11, r11 = "function" == typeof i11.type ? e11(i11, r11, n11) : as(n11, i11, i11, a11, i11.__e, r11));
            return r11;
          }(h2, l2, e10) : l2 = as(e10, h2, p2, y2, f2, l2), "function" == typeof r10.type && (r10.__d = l2)) : l2 && p2.__e == l2 && l2.parentNode != e10 && (l2 = an(p2));
        }
        for (r10.__e = g2, u2 = b2; u2--; ) null != y2[u2] && function e11(t11, r11, n11) {
          var i11, a11;
          if (i1.unmount && i1.unmount(t11), (i11 = t11.ref) && (i11.current && i11.current !== t11.__e || ah(i11, null, r11)), null != (i11 = t11.__c)) {
            if (i11.componentWillUnmount) try {
              i11.componentWillUnmount();
            } catch (e12) {
              i1.__e(e12, r11);
            }
            i11.base = i11.__P = null, t11.__c = void 0;
          }
          if (i11 = t11.__k) for (a11 = 0; a11 < i11.length; a11++) i11[a11] && e11(i11[a11], r11, n11 || "function" != typeof t11.type);
          n11 || null == t11.__e || i7(t11.__e), t11.__ = t11.__e = t11.__d = void 0;
        }(y2[u2], y2[u2]);
        if (m2) for (u2 = 0; u2 < m2.length; u2++) ah(m2[u2], m2[++u2], m2[++u2]);
      }
      function as(e10, t10, r10, n10, i10, a10) {
        var o10, s10, l2;
        if (void 0 !== t10.__d) o10 = t10.__d, t10.__d = void 0;
        else if (null == r10 || i10 != a10 || null == i10.parentNode) e: if (null == a10 || a10.parentNode !== e10) e10.appendChild(i10), o10 = null;
        else {
          for (s10 = a10, l2 = 0; (s10 = s10.nextSibling) && l2 < n10.length; l2 += 1) if (s10 == i10) break e;
          e10.insertBefore(i10, a10), o10 = a10;
        }
        return void 0 !== o10 ? o10 : i10.nextSibling;
      }
      function al(e10, t10, r10) {
        "-" === t10[0] ? e10.setProperty(t10, r10) : e10[t10] = null == r10 ? "" : "number" != typeof r10 || i8.test(t10) ? r10 : r10 + "px";
      }
      function ac(e10, t10, r10, n10, i10) {
        var a10;
        e: if ("style" === t10) if ("string" == typeof r10) e10.style.cssText = r10;
        else {
          if ("string" == typeof n10 && (e10.style.cssText = n10 = ""), n10) for (t10 in n10) r10 && t10 in r10 || al(e10.style, t10, "");
          if (r10) for (t10 in r10) n10 && r10[t10] === n10[t10] || al(e10.style, t10, r10[t10]);
        }
        else if ("o" === t10[0] && "n" === t10[1]) a10 = t10 !== (t10 = t10.replace(/Capture$/, "")), t10 = t10.toLowerCase() in e10 ? t10.toLowerCase().slice(2) : t10.slice(2), e10.l || (e10.l = {}), e10.l[t10 + a10] = r10, r10 ? n10 || e10.addEventListener(t10, a10 ? ad : au, a10) : e10.removeEventListener(t10, a10 ? ad : au, a10);
        else if ("dangerouslySetInnerHTML" !== t10) {
          if (i10) t10 = t10.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
          else if ("href" !== t10 && "list" !== t10 && "form" !== t10 && "tabIndex" !== t10 && "download" !== t10 && t10 in e10) try {
            e10[t10] = null == r10 ? "" : r10;
            break e;
          } catch (e11) {
          }
          "function" == typeof r10 || (null == r10 || false === r10 && -1 == t10.indexOf("-") ? e10.removeAttribute(t10) : e10.setAttribute(t10, r10));
        }
      }
      function au(e10) {
        this.l[e10.type + false](i1.event ? i1.event(e10) : e10);
      }
      function ad(e10) {
        this.l[e10.type + true](i1.event ? i1.event(e10) : e10);
      }
      function ap(e10, t10, r10, n10, i10, a10, o10, s10, l2) {
        var c2, u2, d2, p2, h2, f2, g2, m2, y2, b2, w2, v2, _2, E2, S2, x2 = t10.type;
        if (void 0 !== t10.constructor) return null;
        null != r10.__h && (l2 = r10.__h, s10 = t10.__e = r10.__e, t10.__h = null, a10 = [s10]), (c2 = i1.__b) && c2(t10);
        try {
          e: if ("function" == typeof x2) {
            if (m2 = t10.props, y2 = (c2 = x2.contextType) && n10[c2.__c], b2 = c2 ? y2 ? y2.props.value : c2.__ : n10, r10.__c ? g2 = (u2 = t10.__c = r10.__c).__ = u2.__E : ("prototype" in x2 && x2.prototype.render ? t10.__c = u2 = new x2(m2, b2) : (t10.__c = u2 = new ar(m2, b2), u2.constructor = x2, u2.render = af), y2 && y2.sub(u2), u2.props = m2, u2.state || (u2.state = {}), u2.context = b2, u2.__n = n10, d2 = u2.__d = true, u2.__h = [], u2._sb = []), null == u2.__s && (u2.__s = u2.state), null != x2.getDerivedStateFromProps && (u2.__s == u2.state && (u2.__s = i9({}, u2.__s)), i9(u2.__s, x2.getDerivedStateFromProps(m2, u2.__s))), p2 = u2.props, h2 = u2.state, d2) null == x2.getDerivedStateFromProps && null != u2.componentWillMount && u2.componentWillMount(), null != u2.componentDidMount && u2.__h.push(u2.componentDidMount);
            else {
              if (null == x2.getDerivedStateFromProps && m2 !== p2 && null != u2.componentWillReceiveProps && u2.componentWillReceiveProps(m2, b2), !u2.__e && null != u2.shouldComponentUpdate && false === u2.shouldComponentUpdate(m2, u2.__s, b2) || t10.__v === r10.__v) {
                for (u2.props = m2, u2.state = u2.__s, t10.__v !== r10.__v && (u2.__d = false), u2.__v = t10, t10.__e = r10.__e, t10.__k = r10.__k, t10.__k.forEach(function(e11) {
                  e11 && (e11.__ = t10);
                }), w2 = 0; w2 < u2._sb.length; w2++) u2.__h.push(u2._sb[w2]);
                u2._sb = [], u2.__h.length && o10.push(u2);
                break e;
              }
              null != u2.componentWillUpdate && u2.componentWillUpdate(m2, u2.__s, b2), null != u2.componentDidUpdate && u2.__h.push(function() {
                u2.componentDidUpdate(p2, h2, f2);
              });
            }
            if (u2.context = b2, u2.props = m2, u2.__v = t10, u2.__P = e10, v2 = i1.__r, _2 = 0, "prototype" in x2 && x2.prototype.render) {
              for (u2.state = u2.__s, u2.__d = false, v2 && v2(t10), c2 = u2.render(u2.props, u2.state, u2.context), E2 = 0; E2 < u2._sb.length; E2++) u2.__h.push(u2._sb[E2]);
              u2._sb = [];
            } else do
              u2.__d = false, v2 && v2(t10), c2 = u2.render(u2.props, u2.state, u2.context), u2.state = u2.__s;
            while (u2.__d && ++_2 < 25);
            u2.state = u2.__s, null != u2.getChildContext && (n10 = i9(i9({}, n10), u2.getChildContext())), d2 || null == u2.getSnapshotBeforeUpdate || (f2 = u2.getSnapshotBeforeUpdate(p2, h2)), S2 = null != c2 && c2.type === at && null == c2.key ? c2.props.children : c2, ao(e10, Array.isArray(S2) ? S2 : [S2], t10, r10, n10, i10, a10, o10, s10, l2), u2.base = t10.__e, t10.__h = null, u2.__h.length && o10.push(u2), g2 && (u2.__E = u2.__ = null), u2.__e = false;
          } else null == a10 && t10.__v === r10.__v ? (t10.__k = r10.__k, t10.__e = r10.__e) : t10.__e = function(e11, t11, r11, n11, i11, a11, o11, s11) {
            var l3, c3, u3, d3 = r11.props, p3 = t11.props, h3 = t11.type, f3 = 0;
            if ("svg" === h3 && (i11 = true), null != a11) {
              for (; f3 < a11.length; f3++) if ((l3 = a11[f3]) && "setAttribute" in l3 == !!h3 && (h3 ? l3.localName === h3 : 3 === l3.nodeType)) {
                e11 = l3, a11[f3] = null;
                break;
              }
            }
            if (null == e11) {
              if (null === h3) return document.createTextNode(p3);
              e11 = i11 ? document.createElementNS("http://www.w3.org/2000/svg", h3) : document.createElement(h3, p3.is && p3), a11 = null, s11 = false;
            }
            if (null === h3) d3 === p3 || s11 && e11.data === p3 || (e11.data = p3);
            else {
              if (a11 = a11 && i0.call(e11.childNodes), c3 = (d3 = r11.props || i5).dangerouslySetInnerHTML, u3 = p3.dangerouslySetInnerHTML, !s11) {
                if (null != a11) for (d3 = {}, f3 = 0; f3 < e11.attributes.length; f3++) d3[e11.attributes[f3].name] = e11.attributes[f3].value;
                (u3 || c3) && (u3 && (c3 && u3.__html == c3.__html || u3.__html === e11.innerHTML) || (e11.innerHTML = u3 && u3.__html || ""));
              }
              if (function(e12, t12, r12, n12, i12) {
                var a12;
                for (a12 in r12) "children" === a12 || "key" === a12 || a12 in t12 || ac(e12, a12, null, r12[a12], n12);
                for (a12 in t12) i12 && "function" != typeof t12[a12] || "children" === a12 || "key" === a12 || "value" === a12 || "checked" === a12 || r12[a12] === t12[a12] || ac(e12, a12, t12[a12], r12[a12], n12);
              }(e11, p3, d3, i11, s11), u3) t11.__k = [];
              else if (ao(e11, Array.isArray(f3 = t11.props.children) ? f3 : [f3], t11, r11, n11, i11 && "foreignObject" !== h3, a11, o11, a11 ? a11[0] : r11.__k && an(r11, 0), s11), null != a11) for (f3 = a11.length; f3--; ) null != a11[f3] && i7(a11[f3]);
              s11 || ("value" in p3 && void 0 !== (f3 = p3.value) && (f3 !== e11.value || "progress" === h3 && !f3 || "option" === h3 && f3 !== d3.value) && ac(e11, "value", f3, d3.value, false), "checked" in p3 && void 0 !== (f3 = p3.checked) && f3 !== e11.checked && ac(e11, "checked", f3, d3.checked, false));
            }
            return e11;
          }(r10.__e, t10, r10, n10, i10, a10, o10, l2);
          (c2 = i1.diffed) && c2(t10);
        } catch (e11) {
          t10.__v = null, (l2 || null != a10) && (t10.__e = s10, t10.__h = !!l2, a10[a10.indexOf(s10)] = null), i1.__e(e11, t10, r10);
        }
      }
      function ah(e10, t10, r10) {
        try {
          "function" == typeof e10 ? e10(t10) : e10.current = t10;
        } catch (e11) {
          i1.__e(e11, r10);
        }
      }
      function af(e10, t10, r10) {
        return this.constructor(e10, r10);
      }
      i0 = i6.slice, i1 = { __e: function(e10, t10, r10, n10) {
        for (var i10, a10, o10; t10 = t10.__; ) if ((i10 = t10.__c) && !i10.__) try {
          if ((a10 = i10.constructor) && null != a10.getDerivedStateFromError && (i10.setState(a10.getDerivedStateFromError(e10)), o10 = i10.__d), null != i10.componentDidCatch && (i10.componentDidCatch(e10, n10 || {}), o10 = i10.__d), o10) return i10.__E = i10;
        } catch (t11) {
          e10 = t11;
        }
        throw e10;
      } }, i2 = 0, ar.prototype.setState = function(e10, t10) {
        var r10;
        r10 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = i9({}, this.state), "function" == typeof e10 && (e10 = e10(i9({}, r10), this.props)), e10 && i9(r10, e10), null != e10 && this.__v && (t10 && this._sb.push(t10), ai(this));
      }, ar.prototype.forceUpdate = function(e10) {
        this.__v && (this.__e = true, e10 && this.__h.push(e10), ai(this));
      }, ar.prototype.render = at, i3 = [], aa.__r = 0;
      var ag = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i, am = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/, ay = /[\s\n\\/='"\0<>]/, ab = /^xlink:?./, aw = /["&<]/;
      function av(e10) {
        if (false === aw.test(e10 += "")) return e10;
        for (var t10 = 0, r10 = 0, n10 = "", i10 = ""; r10 < e10.length; r10++) {
          switch (e10.charCodeAt(r10)) {
            case 34:
              i10 = "&quot;";
              break;
            case 38:
              i10 = "&amp;";
              break;
            case 60:
              i10 = "&lt;";
              break;
            default:
              continue;
          }
          r10 !== t10 && (n10 += e10.slice(t10, r10)), n10 += i10, t10 = r10 + 1;
        }
        return r10 !== t10 && (n10 += e10.slice(t10, r10)), n10;
      }
      var a_ = function(e10, t10) {
        return String(e10).replace(/(\n+)/g, "$1" + (t10 || "	"));
      }, aE = function(e10, t10, r10) {
        return String(e10).length > (t10 || 40) || !r10 && -1 !== String(e10).indexOf("\n") || -1 !== String(e10).indexOf("<");
      }, aS = {}, ax = /([A-Z])/g;
      function ak(e10) {
        var t10 = "";
        for (var r10 in e10) {
          var n10 = e10[r10];
          null != n10 && "" !== n10 && (t10 && (t10 += " "), t10 += "-" == r10[0] ? r10 : aS[r10] || (aS[r10] = r10.replace(ax, "-$1").toLowerCase()), t10 = "number" == typeof n10 && false === ag.test(r10) ? t10 + ": " + n10 + "px;" : t10 + ": " + n10 + ";");
        }
        return t10 || void 0;
      }
      function aT(e10, t10) {
        return Array.isArray(t10) ? t10.reduce(aT, e10) : null != t10 && false !== t10 && e10.push(t10), e10;
      }
      function aA() {
        this.__d = true;
      }
      function aR(e10, t10) {
        return { __v: e10, context: t10, props: e10.props, setState: aA, forceUpdate: aA, __d: true, __h: [] };
      }
      function aC(e10, t10) {
        var r10 = e10.contextType, n10 = r10 && t10[r10.__c];
        return null != r10 ? n10 ? n10.props.value : r10.__ : t10;
      }
      var aP = [], aO = { shallow: true };
      aN.render = aN;
      var aI = [];
      function aN(e10, t10, r10) {
        t10 = t10 || {};
        var n10, i10 = i1.__s;
        return i1.__s = true, n10 = r10 && (r10.pretty || r10.voidElements || r10.sortAttributes || r10.shallow || r10.allAttributes || r10.xml || r10.attributeHook) ? function e11(t11, r11, n11, i11, a10, o10) {
          if (null == t11 || "boolean" == typeof t11) return "";
          if ("object" != typeof t11) return av(t11);
          var s10 = n11.pretty, l2 = s10 && "string" == typeof s10 ? s10 : "	";
          if (Array.isArray(t11)) {
            for (var c2 = "", u2 = 0; u2 < t11.length; u2++) s10 && u2 > 0 && (c2 += "\n"), c2 += e11(t11[u2], r11, n11, i11, a10, o10);
            return c2;
          }
          var d2, p2 = t11.type, h2 = t11.props, f2 = false;
          if ("function" == typeof p2) {
            if (f2 = true, !n11.shallow || !i11 && false !== n11.renderRootComponent) {
              if (p2 === at) {
                var g2 = [];
                return aT(g2, t11.props.children), e11(g2, r11, n11, false !== n11.shallowHighOrder, a10, o10);
              }
              var m2, y2 = t11.__c = aR(t11, r11);
              i1.__b && i1.__b(t11);
              var b2 = i1.__r;
              if (p2.prototype && "function" == typeof p2.prototype.render) {
                var w2 = aC(p2, r11);
                (y2 = t11.__c = new p2(h2, w2)).__v = t11, y2._dirty = y2.__d = true, y2.props = h2, null == y2.state && (y2.state = {}), null == y2._nextState && null == y2.__s && (y2._nextState = y2.__s = y2.state), y2.context = w2, p2.getDerivedStateFromProps ? y2.state = Object.assign({}, y2.state, p2.getDerivedStateFromProps(y2.props, y2.state)) : y2.componentWillMount && (y2.componentWillMount(), y2.state = y2._nextState !== y2.state ? y2._nextState : y2.__s !== y2.state ? y2.__s : y2.state), b2 && b2(t11), m2 = y2.render(y2.props, y2.state, y2.context);
              } else for (var v2 = aC(p2, r11), _2 = 0; y2.__d && _2++ < 25; ) y2.__d = false, b2 && b2(t11), m2 = p2.call(t11.__c, h2, v2);
              return y2.getChildContext && (r11 = Object.assign({}, r11, y2.getChildContext())), i1.diffed && i1.diffed(t11), e11(m2, r11, n11, false !== n11.shallowHighOrder, a10, o10);
            }
            p2 = (d2 = p2).displayName || d2 !== Function && d2.name || function(e12) {
              var t12 = (Function.prototype.toString.call(e12).match(/^\s*function\s+([^( ]+)/) || "")[1];
              if (!t12) {
                for (var r12 = -1, n12 = aP.length; n12--; ) if (aP[n12] === e12) {
                  r12 = n12;
                  break;
                }
                r12 < 0 && (r12 = aP.push(e12) - 1), t12 = "UnnamedComponent" + r12;
              }
              return t12;
            }(d2);
          }
          var E2, S2, x2 = "<" + p2;
          if (h2) {
            var k2 = Object.keys(h2);
            n11 && true === n11.sortAttributes && k2.sort();
            for (var T2 = 0; T2 < k2.length; T2++) {
              var A2 = k2[T2], R2 = h2[A2];
              if ("children" !== A2) {
                if (!ay.test(A2) && (n11 && n11.allAttributes || "key" !== A2 && "ref" !== A2 && "__self" !== A2 && "__source" !== A2)) {
                  if ("defaultValue" === A2) A2 = "value";
                  else if ("defaultChecked" === A2) A2 = "checked";
                  else if ("defaultSelected" === A2) A2 = "selected";
                  else if ("className" === A2) {
                    if (void 0 !== h2.class) continue;
                    A2 = "class";
                  } else a10 && ab.test(A2) && (A2 = A2.toLowerCase().replace(/^xlink:?/, "xlink:"));
                  if ("htmlFor" === A2) {
                    if (h2.for) continue;
                    A2 = "for";
                  }
                  "style" === A2 && R2 && "object" == typeof R2 && (R2 = ak(R2)), "a" === A2[0] && "r" === A2[1] && "boolean" == typeof R2 && (R2 = String(R2));
                  var C2 = n11.attributeHook && n11.attributeHook(A2, R2, r11, n11, f2);
                  if (C2 || "" === C2) x2 += C2;
                  else if ("dangerouslySetInnerHTML" === A2) S2 = R2 && R2.__html;
                  else if ("textarea" === p2 && "value" === A2) E2 = R2;
                  else if ((R2 || 0 === R2 || "" === R2) && "function" != typeof R2) {
                    if (!(true !== R2 && "" !== R2 || (R2 = A2, n11 && n11.xml))) {
                      x2 = x2 + " " + A2;
                      continue;
                    }
                    if ("value" === A2) {
                      if ("select" === p2) {
                        o10 = R2;
                        continue;
                      }
                      "option" === p2 && o10 == R2 && void 0 === h2.selected && (x2 += " selected");
                    }
                    x2 = x2 + " " + A2 + '="' + av(R2) + '"';
                  }
                }
              } else E2 = R2;
            }
          }
          if (s10) {
            var P2 = x2.replace(/\n\s*/, " ");
            P2 === x2 || ~P2.indexOf("\n") ? s10 && ~x2.indexOf("\n") && (x2 += "\n") : x2 = P2;
          }
          if (x2 += ">", ay.test(p2)) throw Error(p2 + " is not a valid HTML tag name in " + x2);
          var O2, I2 = am.test(p2) || n11.voidElements && n11.voidElements.test(p2), N2 = [];
          if (S2) s10 && aE(S2) && (S2 = "\n" + l2 + a_(S2, l2)), x2 += S2;
          else if (null != E2 && aT(O2 = [], E2).length) {
            for (var U2 = s10 && ~x2.indexOf("\n"), D2 = false, j2 = 0; j2 < O2.length; j2++) {
              var M2 = O2[j2];
              if (null != M2 && false !== M2) {
                var $2 = e11(M2, r11, n11, true, "svg" === p2 || "foreignObject" !== p2 && a10, o10);
                if (s10 && !U2 && aE($2) && (U2 = true), $2) if (s10) {
                  var L2 = $2.length > 0 && "<" != $2[0];
                  D2 && L2 ? N2[N2.length - 1] += $2 : N2.push($2), D2 = L2;
                } else N2.push($2);
              }
            }
            if (s10 && U2) for (var H2 = N2.length; H2--; ) N2[H2] = "\n" + l2 + a_(N2[H2], l2);
          }
          if (N2.length || S2) x2 += N2.join("");
          else if (n11 && n11.xml) return x2.substring(0, x2.length - 1) + " />";
          return !I2 || O2 || S2 ? (s10 && ~x2.indexOf("\n") && (x2 += "\n"), x2 = x2 + "</" + p2 + ">") : x2 = x2.replace(/>$/, " />"), x2;
        }(e10, t10, r10) : function e11(t11, r11, n11, i11) {
          if (null == t11 || true === t11 || false === t11 || "" === t11) return "";
          if ("object" != typeof t11) return av(t11);
          if (aU(t11)) {
            for (var a10 = "", o10 = 0; o10 < t11.length; o10++) a10 += e11(t11[o10], r11, n11, i11);
            return a10;
          }
          i1.__b && i1.__b(t11);
          var s10 = t11.type, l2 = t11.props;
          if ("function" == typeof s10) {
            if (s10 === at) return e11(t11.props.children, r11, n11, i11);
            var c2, u2, d2, p2, h2, f2 = s10.prototype && "function" == typeof s10.prototype.render ? (c2 = r11, d2 = aC(u2 = t11.type, c2), p2 = new u2(t11.props, d2), t11.__c = p2, p2.__v = t11, p2.__d = true, p2.props = t11.props, null == p2.state && (p2.state = {}), null == p2.__s && (p2.__s = p2.state), p2.context = d2, u2.getDerivedStateFromProps ? p2.state = aD({}, p2.state, u2.getDerivedStateFromProps(p2.props, p2.state)) : p2.componentWillMount && (p2.componentWillMount(), p2.state = p2.__s !== p2.state ? p2.__s : p2.state), (h2 = i1.__r) && h2(t11), p2.render(p2.props, p2.state, p2.context)) : function(e12, t12) {
              var r12, n12 = aR(e12, t12), i12 = aC(e12.type, t12);
              e12.__c = n12;
              for (var a11 = i1.__r, o11 = 0; n12.__d && o11++ < 25; ) n12.__d = false, a11 && a11(e12), r12 = e12.type.call(n12, e12.props, i12);
              return r12;
            }(t11, r11), g2 = t11.__c;
            g2.getChildContext && (r11 = aD({}, r11, g2.getChildContext()));
            var m2 = e11(f2, r11, n11, i11);
            return i1.diffed && i1.diffed(t11), m2;
          }
          var y2, b2, w2 = "<";
          if (w2 += s10, l2) for (var v2 in y2 = l2.children, l2) {
            var _2, E2, S2, x2 = l2[v2];
            if (!("key" === v2 || "ref" === v2 || "__self" === v2 || "__source" === v2 || "children" === v2 || "className" === v2 && "class" in l2 || "htmlFor" === v2 && "for" in l2 || ay.test(v2))) {
              if (E2 = v2 = "className" === (_2 = v2) ? "class" : "htmlFor" === _2 ? "for" : "defaultValue" === _2 ? "value" : "defaultChecked" === _2 ? "checked" : "defaultSelected" === _2 ? "selected" : n11 && ab.test(_2) ? _2.toLowerCase().replace(/^xlink:?/, "xlink:") : _2, S2 = x2, x2 = "style" === E2 && null != S2 && "object" == typeof S2 ? ak(S2) : "a" === E2[0] && "r" === E2[1] && "boolean" == typeof S2 ? String(S2) : S2, "dangerouslySetInnerHTML" === v2) b2 = x2 && x2.__html;
              else if ("textarea" === s10 && "value" === v2) y2 = x2;
              else if ((x2 || 0 === x2 || "" === x2) && "function" != typeof x2) {
                if (true === x2 || "" === x2) {
                  x2 = v2, w2 = w2 + " " + v2;
                  continue;
                }
                if ("value" === v2) {
                  if ("select" === s10) {
                    i11 = x2;
                    continue;
                  }
                  "option" !== s10 || i11 != x2 || "selected" in l2 || (w2 += " selected");
                }
                w2 = w2 + " " + v2 + '="' + av(x2) + '"';
              }
            }
          }
          var k2 = w2;
          if (w2 += ">", ay.test(s10)) throw Error(s10 + " is not a valid HTML tag name in " + w2);
          var T2 = "", A2 = false;
          if (b2) T2 += b2, A2 = true;
          else if ("string" == typeof y2) T2 += av(y2), A2 = true;
          else if (aU(y2)) for (var R2 = 0; R2 < y2.length; R2++) {
            var C2 = y2[R2];
            if (null != C2 && false !== C2) {
              var P2 = e11(C2, r11, "svg" === s10 || "foreignObject" !== s10 && n11, i11);
              P2 && (T2 += P2, A2 = true);
            }
          }
          else if (null != y2 && false !== y2 && true !== y2) {
            var O2 = e11(y2, r11, "svg" === s10 || "foreignObject" !== s10 && n11, i11);
            O2 && (T2 += O2, A2 = true);
          }
          if (i1.diffed && i1.diffed(t11), A2) w2 += T2;
          else if (am.test(s10)) return k2 + " />";
          return w2 + "</" + s10 + ">";
        }(e10, t10, false, void 0), i1.__c && i1.__c(e10, aI), i1.__s = i10, aI.length = 0, n10;
      }
      var aU = Array.isArray, aD = Object.assign;
      aN.shallowRender = function(e10, t10) {
        return aN(e10, t10, aO);
      };
      var aj = 0;
      function aM(e10, t10, r10, n10, i10) {
        var a10, o10, s10 = {};
        for (o10 in t10) "ref" == o10 ? a10 = t10[o10] : s10[o10] = t10[o10];
        var l2 = { type: e10, props: s10, key: r10, ref: a10, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --aj, __source: i10, __self: n10 };
        if ("function" == typeof e10 && (a10 = e10.defaultProps)) for (o10 in a10) void 0 === s10[o10] && (s10[o10] = a10[o10]);
        return i1.vnode && i1.vnode(l2), l2;
      }
      async function a$(e10, t10) {
        let r10 = window.SimpleWebAuthnBrowser;
        async function n10(r11) {
          let n11 = new URL(`${e10}/webauthn-options/${t10}`);
          r11 && n11.searchParams.append("action", r11), a10().forEach((e11) => {
            n11.searchParams.append(e11.name, e11.value);
          });
          let i11 = await fetch(n11);
          return i11.ok ? i11.json() : void console.error("Failed to fetch options", i11);
        }
        function i10() {
          let e11 = `#${t10}-form`, r11 = document.querySelector(e11);
          if (!r11) throw Error(`Form '${e11}' not found`);
          return r11;
        }
        function a10() {
          return Array.from(i10().querySelectorAll("input[data-form-field]"));
        }
        async function o10(e11, t11) {
          let r11 = i10();
          if (e11) {
            let t12 = document.createElement("input");
            t12.type = "hidden", t12.name = "action", t12.value = e11, r11.appendChild(t12);
          }
          if (t11) {
            let e12 = document.createElement("input");
            e12.type = "hidden", e12.name = "data", e12.value = JSON.stringify(t11), r11.appendChild(e12);
          }
          return r11.submit();
        }
        async function s10(e11, t11) {
          let n11 = await r10.startAuthentication(e11, t11);
          return await o10("authenticate", n11);
        }
        async function l2(e11) {
          a10().forEach((e12) => {
            if (e12.required && !e12.value) throw Error(`Missing required field: ${e12.name}`);
          });
          let t11 = await r10.startRegistration(e11);
          return await o10("register", t11);
        }
        async function c2() {
          if (!r10.browserSupportsWebAuthnAutofill()) return;
          let e11 = await n10("authenticate");
          if (!e11) return void console.error("Failed to fetch option for autofill authentication");
          try {
            await s10(e11.options, true);
          } catch (e12) {
            console.error(e12);
          }
        }
        (async function() {
          let e11 = i10();
          if (!r10.browserSupportsWebAuthn()) {
            e11.style.display = "none";
            return;
          }
          e11 && e11.addEventListener("submit", async (e12) => {
            e12.preventDefault();
            let t11 = await n10(void 0);
            if (!t11) return void console.error("Failed to fetch options for form submission");
            if ("authenticate" === t11.action) try {
              await s10(t11.options, false);
            } catch (e13) {
              console.error(e13);
            }
            else if ("register" === t11.action) try {
              await l2(t11.options);
            } catch (e13) {
              console.error(e13);
            }
          });
        })(), c2();
      }
      let aL = { default: "Unable to sign in.", Signin: "Try signing in with a different account.", OAuthSignin: "Try signing in with a different account.", OAuthCallbackError: "Try signing in with a different account.", OAuthCreateAccount: "Try signing in with a different account.", EmailCreateAccount: "Try signing in with a different account.", Callback: "Try signing in with a different account.", OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally.", EmailSignin: "The e-mail could not be sent.", CredentialsSignin: "Sign in failed. Check the details you provided are correct.", SessionRequired: "Please sign in to access this page." }, aH = `:root {
  --border-width: 1px;
  --border-radius: 0.5rem;
  --color-error: #c94b4b;
  --color-info: #157efb;
  --color-info-hover: #0f6ddb;
  --color-info-text: #fff;
}

.__next-auth-theme-auto,
.__next-auth-theme-light {
  --color-background: #ececec;
  --color-background-hover: rgba(236, 236, 236, 0.8);
  --color-background-card: #fff;
  --color-text: #000;
  --color-primary: #444;
  --color-control-border: #bbb;
  --color-button-active-background: #f9f9f9;
  --color-button-active-border: #aaa;
  --color-separator: #ccc;
}

.__next-auth-theme-dark {
  --color-background: #161b22;
  --color-background-hover: rgba(22, 27, 34, 0.8);
  --color-background-card: #0d1117;
  --color-text: #fff;
  --color-primary: #ccc;
  --color-control-border: #555;
  --color-button-active-background: #060606;
  --color-button-active-border: #666;
  --color-separator: #444;
}

@media (prefers-color-scheme: dark) {
  .__next-auth-theme-auto {
    --color-background: #161b22;
    --color-background-hover: rgba(22, 27, 34, 0.8);
    --color-background-card: #0d1117;
    --color-text: #fff;
    --color-primary: #ccc;
    --color-control-border: #555;
    --color-button-active-background: #060606;
    --color-button-active-border: #666;
    --color-separator: #444;
  }

  button,
  a.button {
    color: var(--provider-dark-color, var(--color-primary)) !important;
    background-color: var(
      --provider-dark-bg,
      var(--color-background)
    ) !important;
  }

    :is(button,a.button):hover {
      background-color: var(
        --provider-dark-bg-hover,
        var(--color-background-hover)
      ) !important;
    }

    :is(button,a.button) span {
      color: var(--provider-dark-bg) !important;
    }
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-background);
  margin: 0;
  padding: 0;
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji";
}

h1 {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  font-weight: 400;
  color: var(--color-text);
}

p {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  color: var(--color-text);
}

form {
  margin: 0;
  padding: 0;
}

label {
  font-weight: 500;
  text-align: left;
  margin-bottom: 0.25rem;
  display: block;
  color: var(--color-text);
}

input[type] {
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  border: var(--border-width) solid var(--color-control-border);
  background: var(--color-background-card);
  font-size: 1rem;
  border-radius: var(--border-radius);
  color: var(--color-text);
}

p {
  font-size: 1.1rem;
  line-height: 2rem;
}

a.button {
  text-decoration: none;
  line-height: 1rem;
}

a.button:link,
  a.button:visited {
    background-color: var(--color-background);
    color: var(--color-primary);
  }

button,
a.button {
  padding: 0.75rem 1rem;
  color: var(--provider-color, var(--color-primary));
  background-color: var(--provider-bg, var(--color-background));
  border: 1px solid #00000031;
  font-size: 0.9rem;
  height: 50px;
  border-radius: var(--border-radius);
  transition: background-color 250ms ease-in-out;
  font-weight: 300;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:is(button,a.button):hover {
    background-color: var(--provider-bg-hover, var(--color-background-hover));
    cursor: pointer;
  }

:is(button,a.button):active {
    cursor: pointer;
  }

:is(button,a.button) span {
    color: #fff;
  }

#submitButton {
  color: var(--button-text-color, var(--color-info-text));
  background-color: var(--brand-color, var(--color-info));
  width: 100%;
}

#submitButton:hover {
    background-color: var(
      --button-hover-bg,
      var(--color-info-hover)
    ) !important;
  }

a.site {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 1rem;
  line-height: 2rem;
}

a.site:hover {
    text-decoration: underline;
  }

.page {
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page > div {
    text-align: center;
  }

.error a.button {
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: 0.5rem;
  }

.error .message {
    margin-bottom: 1.5rem;
  }

.signin input[type="text"] {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

.signin hr {
    display: block;
    border: 0;
    border-top: 1px solid var(--color-separator);
    margin: 2rem auto 1rem auto;
    overflow: visible;
  }

.signin hr::before {
      content: "or";
      background: var(--color-background-card);
      color: #888;
      padding: 0 0.4rem;
      position: relative;
      top: -0.7rem;
    }

.signin .error {
    background: #f5f5f5;
    font-weight: 500;
    border-radius: 0.3rem;
    background: var(--color-error);
  }

.signin .error p {
      text-align: left;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      line-height: 1.2rem;
      color: var(--color-info-text);
    }

.signin > div,
  .signin form {
    display: block;
  }

.signin > div input[type], .signin form input[type] {
      margin-bottom: 0.5rem;
    }

.signin > div button, .signin form button {
      width: 100%;
    }

.signin .provider + .provider {
    margin-top: 1rem;
  }

.logo {
  display: inline-block;
  max-width: 150px;
  margin: 1.25rem 0;
  max-height: 70px;
}

.card {
  background-color: var(--color-background-card);
  border-radius: 1rem;
  padding: 1.25rem 2rem;
}

.card .header {
    color: var(--color-primary);
  }

.card input[type]::-moz-placeholder {
    color: color-mix(
      in srgb,
      var(--color-text) 20%,
      var(--color-button-active-background)
    );
  }

.card input[type]::placeholder {
    color: color-mix(
      in srgb,
      var(--color-text) 20%,
      var(--color-button-active-background)
    );
  }

.card input[type] {
    background: color-mix(in srgb, var(--color-background-card) 95%, black);
  }

.section-header {
  color: var(--color-text);
}

@media screen and (min-width: 450px) {
  .card {
    margin: 2rem 0;
    width: 368px;
  }
}

@media screen and (max-width: 450px) {
  .card {
    margin: 1rem 0;
    width: 343px;
  }
}
`;
      function aW({ html: e10, title: t10, status: r10, cookies: n10, theme: i10, headTags: a10 }) {
        return { cookies: n10, status: r10, headers: { "Content-Type": "text/html" }, body: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${aH}</style><title>${t10}</title>${a10 ?? ""}</head><body class="__next-auth-theme-${i10?.colorScheme ?? "auto"}"><div class="page">${aN(e10)}</div></body></html>` };
      }
      function aK(e10) {
        let { url: t10, theme: r10, query: n10, cookies: i10, pages: a10, providers: o10 } = e10;
        return { csrf: (e11, t11, r11) => e11 ? (t11.logger.warn("csrf-disabled"), r11.push({ name: t11.cookies.csrfToken.name, value: "", options: { ...t11.cookies.csrfToken.options, maxAge: 0 } }), { status: 404, cookies: r11 }) : { headers: { "Content-Type": "application/json" }, body: { csrfToken: t11.csrfToken }, cookies: r11 }, providers: (e11) => ({ headers: { "Content-Type": "application/json" }, body: e11.reduce((e12, { id: t11, name: r11, type: n11, signinUrl: i11, callbackUrl: a11 }) => (e12[t11] = { id: t11, name: r11, type: n11, signinUrl: i11, callbackUrl: a11 }, e12), {}) }), signin(t11, s10) {
          if (t11) throw new rh("Unsupported action");
          if (a10?.signIn) {
            let t12 = `${a10.signIn}${a10.signIn.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: e10.callbackUrl ?? "/" })}`;
            return s10 && (t12 = `${t12}&${new URLSearchParams({ error: s10 })}`), { redirect: t12, cookies: i10 };
          }
          let l2 = o10?.find((e11) => "webauthn" === e11.type && e11.enableConditionalUI && !!e11.simpleWebAuthnBrowserVersion), c2 = "";
          if (l2) {
            let { simpleWebAuthnBrowserVersion: e11 } = l2;
            c2 = `<script src="https://unpkg.com/@simplewebauthn/browser@${e11}/dist/bundle/index.umd.min.js" crossorigin="anonymous"></script>`;
          }
          return aW({ cookies: i10, theme: r10, html: function(e11) {
            let { csrfToken: t12, providers: r11 = [], callbackUrl: n11, theme: i11, email: a11, error: o11 } = e11;
            "u" > typeof document && i11?.brandColor && document.documentElement.style.setProperty("--brand-color", i11.brandColor), "u" > typeof document && i11?.buttonText && document.documentElement.style.setProperty("--button-text-color", i11.buttonText);
            let s11 = o11 && (aL[o11] ?? aL.default), l3 = r11.find((e12) => "webauthn" === e12.type && e12.enableConditionalUI)?.id;
            return aM("div", { className: "signin", children: [i11?.brandColor && aM("style", { dangerouslySetInnerHTML: { __html: `:root {--brand-color: ${i11.brandColor}}` } }), i11?.buttonText && aM("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --button-text-color: ${i11.buttonText}
        }
      ` } }), aM("div", { className: "card", children: [s11 && aM("div", { className: "error", children: aM("p", { children: s11 }) }), i11?.logo && aM("img", { src: i11.logo, alt: "Logo", className: "logo" }), r11.map((e12, i12) => {
              let o12, s12, l4;
              ("oauth" === e12.type || "oidc" === e12.type) && ({ bg: o12 = "#fff", brandColor: s12, logo: l4 = `https://authjs.dev/img/providers/${e12.id}.svg` } = e12.style ?? {});
              let c3 = s12 ?? o12 ?? "#fff";
              return aM("div", { className: "provider", children: ["oauth" === e12.type || "oidc" === e12.type ? aM("form", { action: e12.signinUrl, method: "POST", children: [aM("input", { type: "hidden", name: "csrfToken", value: t12 }), n11 && aM("input", { type: "hidden", name: "callbackUrl", value: n11 }), aM("button", { type: "submit", className: "button", style: { "--provider-bg": "#fff", "--provider-bg-hover": `color-mix(in srgb, ${c3} 30%, #fff)`, "--provider-dark-bg": "#161b22", "--provider-dark-bg-hover": `color-mix(in srgb, ${c3} 30%, #000)` }, tabIndex: 0, children: [aM("span", { style: { filter: "invert(1) grayscale(1) brightness(1.3) contrast(9000)", "mix-blend-mode": "luminosity", opacity: 0.95 }, children: ["Sign in with ", e12.name] }), l4 && aM("img", { loading: "lazy", height: 24, src: l4 })] })] }) : null, ("email" === e12.type || "credentials" === e12.type || "webauthn" === e12.type) && i12 > 0 && "email" !== r11[i12 - 1].type && "credentials" !== r11[i12 - 1].type && "webauthn" !== r11[i12 - 1].type && aM("hr", {}), "email" === e12.type && aM("form", { action: e12.signinUrl, method: "POST", children: [aM("input", { type: "hidden", name: "csrfToken", value: t12 }), aM("label", { className: "section-header", htmlFor: `input-email-for-${e12.id}-provider`, children: "Email" }), aM("input", { id: `input-email-for-${e12.id}-provider`, autoFocus: true, type: "email", name: "email", value: a11, placeholder: "email@example.com", required: true }), aM("button", { id: "submitButton", type: "submit", tabIndex: 0, children: ["Sign in with ", e12.name] })] }), "credentials" === e12.type && aM("form", { action: e12.callbackUrl, method: "POST", children: [aM("input", { type: "hidden", name: "csrfToken", value: t12 }), Object.keys(e12.credentials).map((t13) => aM("div", { children: [aM("label", { className: "section-header", htmlFor: `input-${t13}-for-${e12.id}-provider`, children: e12.credentials[t13].label ?? t13 }), aM("input", { name: t13, id: `input-${t13}-for-${e12.id}-provider`, type: e12.credentials[t13].type ?? "text", placeholder: e12.credentials[t13].placeholder ?? "", ...e12.credentials[t13] })] }, `input-group-${e12.id}`)), aM("button", { id: "submitButton", type: "submit", tabIndex: 0, children: ["Sign in with ", e12.name] })] }), "webauthn" === e12.type && aM("form", { action: e12.callbackUrl, method: "POST", id: `${e12.id}-form`, children: [aM("input", { type: "hidden", name: "csrfToken", value: t12 }), Object.keys(e12.formFields).map((t13) => aM("div", { children: [aM("label", { className: "section-header", htmlFor: `input-${t13}-for-${e12.id}-provider`, children: e12.formFields[t13].label ?? t13 }), aM("input", { name: t13, "data-form-field": true, id: `input-${t13}-for-${e12.id}-provider`, type: e12.formFields[t13].type ?? "text", placeholder: e12.formFields[t13].placeholder ?? "", ...e12.formFields[t13] })] }, `input-group-${e12.id}`)), aM("button", { id: `submitButton-${e12.id}`, type: "submit", tabIndex: 0, children: ["Sign in with ", e12.name] })] }), ("email" === e12.type || "credentials" === e12.type || "webauthn" === e12.type) && i12 + 1 < r11.length && aM("hr", {})] }, e12.id);
            })] }), l3 && aM(at, { children: aM("script", { dangerouslySetInnerHTML: { __html: `
const currentURL = window.location.href;
const authURL = currentURL.substring(0, currentURL.lastIndexOf('/'));
(${a$})(authURL, "${l3}");
` } }) })] });
          }({ csrfToken: e10.csrfToken, providers: e10.providers?.filter((e11) => ["email", "oauth", "oidc"].includes(e11.type) || "credentials" === e11.type && e11.credentials || "webauthn" === e11.type && e11.formFields || false), callbackUrl: e10.callbackUrl, theme: e10.theme, error: s10, ...n10 }), title: "Sign In", headTags: c2 });
        }, signout: () => a10?.signOut ? { redirect: a10.signOut, cookies: i10 } : aW({ cookies: i10, theme: r10, html: function(e11) {
          let { url: t11, csrfToken: r11, theme: n11 } = e11;
          return aM("div", { className: "signout", children: [n11?.brandColor && aM("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --brand-color: ${n11.brandColor}
        }
      ` } }), n11?.buttonText && aM("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --button-text-color: ${n11.buttonText}
        }
      ` } }), aM("div", { className: "card", children: [n11?.logo && aM("img", { src: n11.logo, alt: "Logo", className: "logo" }), aM("h1", { children: "Signout" }), aM("p", { children: "Are you sure you want to sign out?" }), aM("form", { action: t11?.toString(), method: "POST", children: [aM("input", { type: "hidden", name: "csrfToken", value: r11 }), aM("button", { id: "submitButton", type: "submit", children: "Sign out" })] })] })] });
        }({ csrfToken: e10.csrfToken, url: t10, theme: r10 }), title: "Sign Out" }), verifyRequest: (e11) => a10?.verifyRequest ? { redirect: a10.verifyRequest, cookies: i10 } : aW({ cookies: i10, theme: r10, html: function(e12) {
          let { url: t11, theme: r11 } = e12;
          return aM("div", { className: "verify-request", children: [r11.brandColor && aM("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --brand-color: ${r11.brandColor}
        }
      ` } }), aM("div", { className: "card", children: [r11.logo && aM("img", { src: r11.logo, alt: "Logo", className: "logo" }), aM("h1", { children: "Check your email" }), aM("p", { children: "A sign in link has been sent to your email address." }), aM("p", { children: aM("a", { className: "site", href: t11.origin, children: t11.host }) })] })] });
        }({ url: t10, theme: r10, ...e11 }), title: "Verify Request" }), error: (e11) => a10?.error ? { redirect: `${a10.error}${a10.error.includes("?") ? "&" : "?"}error=${e11}`, cookies: i10 } : aW({ cookies: i10, theme: r10, ...function(e12) {
          let { url: t11, error: r11 = "default", theme: n11 } = e12, i11 = `${t11}/signin`, a11 = { default: { status: 200, heading: "Error", message: aM("p", { children: aM("a", { className: "site", href: t11?.origin, children: t11?.host }) }) }, Configuration: { status: 500, heading: "Server error", message: aM("div", { children: [aM("p", { children: "There is a problem with the server configuration." }), aM("p", { children: "Check the server logs for more information." })] }) }, AccessDenied: { status: 403, heading: "Access Denied", message: aM("div", { children: [aM("p", { children: "You do not have permission to sign in." }), aM("p", { children: aM("a", { className: "button", href: i11, children: "Sign in" }) })] }) }, Verification: { status: 403, heading: "Unable to sign in", message: aM("div", { children: [aM("p", { children: "The sign in link is no longer valid." }), aM("p", { children: "It may have been used already or it may have expired." })] }), signin: aM("a", { className: "button", href: i11, children: "Sign in" }) } }, { status: o11, heading: s10, message: l2, signin: c2 } = a11[r11] ?? a11.default;
          return { status: o11, html: aM("div", { className: "error", children: [n11?.brandColor && aM("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --brand-color: ${n11?.brandColor}
        }
      ` } }), aM("div", { className: "card", children: [n11?.logo && aM("img", { src: n11?.logo, alt: "Logo", className: "logo" }), aM("h1", { children: s10 }), aM("div", { className: "message", children: l2 }), c2] })] }) };
        }({ url: t10, theme: r10, error: e11 }), title: "Error" }) };
      }
      function aB(e10, t10 = Date.now()) {
        return new Date(t10 + 1e3 * e10);
      }
      async function aq(e10, t10, r10, n10) {
        if (!r10?.providerAccountId || !r10.type) throw Error("Missing or invalid provider account");
        if (!["email", "oauth", "oidc", "webauthn"].includes(r10.type)) throw Error("Provider not supported");
        let { adapter: i10, jwt: a10, events: o10, session: { strategy: s10, generateSessionToken: l2 } } = n10;
        if (!i10) return { user: t10, account: r10 };
        let c2 = r10, { createUser: u2, updateUser: d2, getUser: p2, getUserByAccount: h2, getUserByEmail: f2, linkAccount: g2, createSession: m2, getSessionAndUser: y2, deleteSession: b2 } = i10, w2 = null, v2 = null, _2 = false, E2 = "jwt" === s10;
        if (e10) if (E2) try {
          let t11 = n10.cookies.sessionToken.name;
          (w2 = await a10.decode({ ...a10, token: e10, salt: t11 })) && "sub" in w2 && w2.sub && (v2 = await p2(w2.sub));
        } catch {
        }
        else {
          let t11 = await y2(e10);
          t11 && (w2 = t11.session, v2 = t11.user);
        }
        if ("email" === c2.type) {
          let r11 = await f2(t10.email);
          return r11 ? (v2?.id !== r11.id && !E2 && e10 && await b2(e10), v2 = await d2({ id: r11.id, emailVerified: /* @__PURE__ */ new Date() }), await o10.updateUser?.({ user: v2 })) : (v2 = await u2({ ...t10, emailVerified: /* @__PURE__ */ new Date() }), await o10.createUser?.({ user: v2 }), _2 = true), { session: w2 = E2 ? {} : await m2({ sessionToken: l2(), userId: v2.id, expires: aB(n10.session.maxAge) }), user: v2, isNewUser: _2 };
        }
        if ("webauthn" === c2.type) {
          let e11 = await h2({ providerAccountId: c2.providerAccountId, provider: c2.provider });
          if (e11) {
            if (v2) {
              if (e11.id === v2.id) {
                let e12 = { ...c2, userId: v2.id };
                return { session: w2, user: v2, isNewUser: _2, account: e12 };
              }
              throw new rS("The account is already associated with another user", { provider: c2.provider });
            }
            w2 = E2 ? {} : await m2({ sessionToken: l2(), userId: e11.id, expires: aB(n10.session.maxAge) });
            let t11 = { ...c2, userId: e11.id };
            return { session: w2, user: e11, isNewUser: _2, account: t11 };
          }
          {
            if (v2) {
              await g2({ ...c2, userId: v2.id }), await o10.linkAccount?.({ user: v2, account: c2, profile: t10 });
              let e13 = { ...c2, userId: v2.id };
              return { session: w2, user: v2, isNewUser: _2, account: e13 };
            }
            if (t10.email ? await f2(t10.email) : null) throw new rS("Another account already exists with the same e-mail address", { provider: c2.provider });
            v2 = await u2({ ...t10 }), await o10.createUser?.({ user: v2 }), await g2({ ...c2, userId: v2.id }), await o10.linkAccount?.({ user: v2, account: c2, profile: t10 }), w2 = E2 ? {} : await m2({ sessionToken: l2(), userId: v2.id, expires: aB(n10.session.maxAge) });
            let e12 = { ...c2, userId: v2.id };
            return { session: w2, user: v2, isNewUser: true, account: e12 };
          }
        }
        let S2 = await h2({ providerAccountId: c2.providerAccountId, provider: c2.provider });
        if (S2) {
          if (v2) {
            if (S2.id === v2.id) return { session: w2, user: v2, isNewUser: _2 };
            throw new rl("The account is already associated with another user", { provider: c2.provider });
          }
          return { session: w2 = E2 ? {} : await m2({ sessionToken: l2(), userId: S2.id, expires: aB(n10.session.maxAge) }), user: S2, isNewUser: _2 };
        }
        {
          let { provider: e11 } = n10, { type: r11, provider: i11, providerAccountId: a11, userId: s11, ...d3 } = c2;
          if (c2 = Object.assign(e11.account(d3) ?? {}, { providerAccountId: a11, provider: i11, type: r11, userId: s11 }), v2) return await g2({ ...c2, userId: v2.id }), await o10.linkAccount?.({ user: v2, account: c2, profile: t10 }), { session: w2, user: v2, isNewUser: _2 };
          let p3 = t10.email ? await f2(t10.email) : null;
          if (p3) {
            let e12 = n10.provider;
            if (e12?.allowDangerousEmailAccountLinking) v2 = p3, _2 = false;
            else throw new rl("Another account already exists with the same e-mail address", { provider: c2.provider });
          } else v2 = await u2({ ...t10, emailVerified: null }), _2 = true;
          return await o10.createUser?.({ user: v2 }), await g2({ ...c2, userId: v2.id }), await o10.linkAccount?.({ user: v2, account: c2, profile: t10 }), { session: w2 = E2 ? {} : await m2({ sessionToken: l2(), userId: v2.id, expires: aB(n10.session.maxAge) }), user: v2, isNewUser: _2 };
        }
      }
      function aF(e10, t10) {
        if (null == e10) return false;
        try {
          return e10 instanceof t10 || Object.getPrototypeOf(e10)[Symbol.toStringTag] === t10.prototype[Symbol.toStringTag];
        } catch {
          return false;
        }
      }
      ("u" < typeof navigator || !navigator.userAgent?.startsWith?.("Mozilla/5.0 ")) && (a = "oauth4webapi/v3.8.6");
      let aJ = "ERR_INVALID_ARG_VALUE", aV = "ERR_INVALID_ARG_TYPE";
      function az(e10, t10, r10) {
        let n10 = TypeError(e10, { cause: r10 });
        return Object.assign(n10, { code: t10 }), n10;
      }
      let aG = Symbol(), aX = Symbol(), aY = Symbol(), aQ = Symbol(), aZ = Symbol(), a0 = Symbol();
      Symbol();
      let a1 = new TextEncoder(), a2 = new TextDecoder();
      function a3(e10) {
        return "string" == typeof e10 ? a1.encode(e10) : a2.decode(e10);
      }
      function a4(e10) {
        return "string" == typeof e10 ? s(e10) : o(e10);
      }
      o = Uint8Array.prototype.toBase64 ? (e10) => (e10 instanceof ArrayBuffer && (e10 = new Uint8Array(e10)), e10.toBase64({ alphabet: "base64url", omitPadding: true })) : (e10) => {
        e10 instanceof ArrayBuffer && (e10 = new Uint8Array(e10));
        let t10 = [];
        for (let r10 = 0; r10 < e10.byteLength; r10 += 32768) t10.push(String.fromCharCode.apply(null, e10.subarray(r10, r10 + 32768)));
        return btoa(t10.join("")).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }, s = Uint8Array.fromBase64 ? (e10) => {
        try {
          return Uint8Array.fromBase64(e10, { alphabet: "base64url" });
        } catch (e11) {
          throw az("The input to be decoded is not correctly encoded.", aJ, e11);
        }
      } : (e10) => {
        try {
          let t10 = atob(e10.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "")), r10 = new Uint8Array(t10.length);
          for (let e11 = 0; e11 < t10.length; e11++) r10[e11] = t10.charCodeAt(e11);
          return r10;
        } catch (e11) {
          throw az("The input to be decoded is not correctly encoded.", aJ, e11);
        }
      };
      class a5 extends Error {
        code;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = o6, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class a6 extends Error {
        code;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, t10?.code && (this.code = t10?.code), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      function a8(e10, t10, r10) {
        return new a6(e10, { code: t10, cause: r10 });
      }
      function a9(e10) {
        return !(null === e10 || "object" != typeof e10 || Array.isArray(e10));
      }
      function a7(e10) {
        aF(e10, Headers) && (e10 = Object.fromEntries(e10.entries()));
        let t10 = new Headers(e10 ?? {});
        if (a && !t10.has("user-agent") && t10.set("user-agent", a), t10.has("authorization")) throw az('"options.headers" must not include the "authorization" header name', aJ);
        return t10;
      }
      function oe(e10, t10) {
        if (void 0 !== t10) {
          if ("function" == typeof t10 && (t10 = t10(e10.href)), !(t10 instanceof AbortSignal)) throw az('"options.signal" must return or be an instance of AbortSignal', aV);
          return t10;
        }
      }
      function ot(e10) {
        return e10.includes("//") ? e10.replace("//", "/") : e10;
      }
      async function or(e10, t10, r10, n10) {
        if (!(e10 instanceof URL)) throw az(`"${t10}" must be an instance of URL`, aV);
        ob(e10, n10?.[aG] !== true);
        let i10 = r10(new URL(e10.href)), a10 = a7(n10?.headers);
        return a10.set("accept", "application/json"), (n10?.[aQ] || fetch)(i10.href, { body: void 0, headers: Object.fromEntries(a10.entries()), method: "GET", redirect: "manual", signal: oe(i10, n10?.signal) });
      }
      async function on(e10, t10) {
        return or(e10, "issuerIdentifier", (e11) => {
          switch (t10?.algorithm) {
            case void 0:
            case "oidc":
              e11.pathname = ot(`${e11.pathname}/.well-known/openid-configuration`);
              break;
            case "oauth2":
              !function(e12, t11, r10 = false) {
                "/" === e12.pathname ? e12.pathname = t11 : e12.pathname = ot(`${t11}/${r10 ? e12.pathname : e12.pathname.replace(/(\/)$/, "")}`);
              }(e11, ".well-known/oauth-authorization-server");
              break;
            default:
              throw az('"options.algorithm" must be "oidc" (default), or "oauth2"', aJ);
          }
          return e11;
        }, t10);
      }
      function oi(e10, t10, r10, n10, i10) {
        try {
          if ("number" != typeof e10 || !Number.isFinite(e10)) throw az(`${r10} must be a number`, aV, i10);
          if (e10 > 0) return;
          if (t10) {
            if (0 !== e10) throw az(`${r10} must be a non-negative number`, aJ, i10);
            return;
          }
          throw az(`${r10} must be a positive number`, aJ, i10);
        } catch (e11) {
          if (n10) throw a8(e11.message, n10, i10);
          throw e11;
        }
      }
      function oa(e10, t10, r10, n10) {
        try {
          if ("string" != typeof e10) throw az(`${t10} must be a string`, aV, n10);
          if (0 === e10.length) throw az(`${t10} must not be empty`, aJ, n10);
        } catch (e11) {
          if (r10) throw a8(e11.message, r10, n10);
          throw e11;
        }
      }
      async function oo(e10, t10) {
        if (!(e10 instanceof URL) && e10 !== sb) throw az('"expectedIssuerIdentifier" must be an instance of URL', aV);
        if (!aF(t10, Response)) throw az('"response" must be an instance of Response', aV);
        if (200 !== t10.status) throw a8('"response" is not a conform Authorization Server Metadata response (unexpected HTTP status code)', sr, t10);
        su(t10);
        let r10 = await sy(t10);
        if (oa(r10.issuer, '"response" body "issuer" property', se, { body: r10 }), e10 !== sb && new URL(r10.issuer).href !== e10.href) throw a8('"response" body "issuer" property does not match the expected value', ss, { expected: e10.href, body: r10, attribute: "issuer" });
        return r10;
      }
      function os(e10) {
        var t10 = e10, r10 = "application/json";
        if (oD(t10) !== r10) throw function(e11, ...t11) {
          let r11 = '"response" content-type must be ';
          if (t11.length > 2) {
            let e12 = t11.pop();
            r11 += `${t11.join(", ")}, or ${e12}`;
          } else 2 === t11.length ? r11 += `${t11[0]} or ${t11[1]}` : r11 += t11[0];
          return a8(r11, st, e11);
        }(t10, r10);
      }
      function ol() {
        return a4(crypto.getRandomValues(new Uint8Array(32)));
      }
      async function oc(e10) {
        return oa(e10, "codeVerifier"), a4(await crypto.subtle.digest("SHA-256", a3(e10)));
      }
      function ou(e10) {
        let t10 = e10?.[aX];
        return "number" == typeof t10 && Number.isFinite(t10) ? t10 : 0;
      }
      function od(e10) {
        let t10 = e10?.[aY];
        return "number" == typeof t10 && Number.isFinite(t10) && -1 !== Math.sign(t10) ? t10 : 30;
      }
      function op() {
        return Math.floor(Date.now() / 1e3);
      }
      function oh(e10) {
        if ("object" != typeof e10 || null === e10) throw az('"as" must be an object', aV);
        oa(e10.issuer, '"as.issuer"');
      }
      function of(e10) {
        if ("object" != typeof e10 || null === e10) throw az('"client" must be an object', aV);
        oa(e10.client_id, '"client.client_id"');
      }
      function og(e10, t10) {
        let r10 = op() + ou(t10);
        return { jti: ol(), aud: e10.issuer, exp: r10 + 60, iat: r10, nbf: r10, iss: t10.client_id, sub: t10.client_id };
      }
      async function om(e10, t10, r10) {
        if (!r10.usages.includes("sign")) throw az('CryptoKey instances used for signing assertions must include "sign" in their "usages"', aJ);
        let n10 = `${a4(a3(JSON.stringify(e10)))}.${a4(a3(JSON.stringify(t10)))}`, i10 = a4(await crypto.subtle.sign(function(e11) {
          switch (e11.algorithm.name) {
            case "ECDSA":
              return { name: e11.algorithm.name, hash: function(e12) {
                let { algorithm: t11 } = e12;
                switch (t11.namedCurve) {
                  case "P-256":
                    return "SHA-256";
                  case "P-384":
                    return "SHA-384";
                  case "P-521":
                    return "SHA-512";
                  default:
                    throw new a5("unsupported ECDSA namedCurve", { cause: e12 });
                }
              }(e11) };
            case "RSA-PSS":
              switch (sd(e11), e11.algorithm.hash.name) {
                case "SHA-256":
                case "SHA-384":
                case "SHA-512":
                  return { name: e11.algorithm.name, saltLength: parseInt(e11.algorithm.hash.name.slice(-3), 10) >> 3 };
                default:
                  throw new a5("unsupported RSA-PSS hash name", { cause: e11 });
              }
            case "RSASSA-PKCS1-v1_5":
              return sd(e11), e11.algorithm.name;
            case "ML-DSA-44":
            case "ML-DSA-65":
            case "ML-DSA-87":
            case "Ed25519":
              return e11.algorithm.name;
          }
          throw new a5("unsupported CryptoKey algorithm name", { cause: e11 });
        }(r10), r10, a3(n10)));
        return `${n10}.${i10}`;
      }
      let oy = URL.parse ? (e10, t10) => URL.parse(e10, t10) : (e10, t10) => {
        try {
          return new URL(e10, t10);
        } catch {
          return null;
        }
      };
      function ob(e10, t10) {
        if (t10 && "https:" !== e10.protocol) throw a8("only requests to HTTPS are allowed", sn, e10);
        if ("https:" !== e10.protocol && "http:" !== e10.protocol) throw a8("only HTTP and HTTPS requests are allowed", si, e10);
      }
      function ow(e10, t10, r10, n10) {
        let i10;
        if ("string" != typeof e10 || !(i10 = oy(e10))) throw a8(`authorization server metadata does not contain a valid ${r10 ? `"as.mtls_endpoint_aliases.${t10}"` : `"as.${t10}"`}`, void 0 === e10 ? sl : sc, { attribute: r10 ? `mtls_endpoint_aliases.${t10}` : t10 });
        return ob(i10, n10), i10;
      }
      function ov(e10, t10, r10, n10) {
        return r10 && e10.mtls_endpoint_aliases && t10 in e10.mtls_endpoint_aliases ? ow(e10.mtls_endpoint_aliases[t10], t10, r10, n10) : ow(e10[t10], t10, r10, n10);
      }
      class o_ extends Error {
        cause;
        code;
        error;
        status;
        error_description;
        response;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = o5, this.cause = t10.cause, this.error = t10.cause.error, this.status = t10.response.status, this.error_description = t10.cause.error_description, Object.defineProperty(this, "response", { enumerable: false, value: t10.response }), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class oE extends Error {
        cause;
        code;
        error;
        error_description;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = o8, this.cause = t10.cause, this.error = t10.cause.get("error"), this.error_description = t10.cause.get("error_description") ?? void 0, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class oS extends Error {
        cause;
        code;
        response;
        status;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = o4, this.cause = t10.cause, this.status = t10.response.status, this.response = t10.response, Object.defineProperty(this, "response", { enumerable: false }), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      let ox = "[a-zA-Z0-9!#$%&\\'\\*\\+\\-\\.\\^_`\\|~]+", ok = RegExp("^[,\\s]*(" + ox + ")"), oT = RegExp("^[,\\s]*(" + ox + ')\\s*=\\s*"((?:[^"\\\\]|\\\\[\\s\\S])*)"[,\\s]*(.*)'), oA = RegExp("^[,\\s]*" + ("(" + ox + ")\\s*=\\s*(") + ox + ")[,\\s]*(.*)"), oR = RegExp("^([a-zA-Z0-9\\-\\._\\~\\+\\/]+={0,2})(?:$|[,\\s])(.*)");
      async function oC(e10) {
        if (e10.status > 399 && e10.status < 500) {
          su(e10), os(e10);
          try {
            let t10 = await e10.clone().json();
            if (a9(t10) && "string" == typeof t10.error && t10.error.length) return t10;
          } catch {
          }
        }
      }
      async function oP(e10, t10, r10) {
        if (e10.status !== t10) {
          let t11;
          if (oB(e10), t11 = await oC(e10)) throw await e10.body?.cancel(), new o_("server responded with an error in the response body", { cause: t11, response: e10 });
          throw a8(`"response" is not a conform ${r10} response (unexpected HTTP status code)`, sr, e10);
        }
      }
      function oO(e10) {
        if (!oz.has(e10)) throw az('"options.DPoP" is not a valid DPoPHandle', aJ);
      }
      async function oI(e10, t10, r10, n10, i10, a10) {
        if (oa(e10, '"accessToken"'), !(r10 instanceof URL)) throw az('"url" must be an instance of URL', aV);
        ob(r10, a10?.[aG] !== true), n10 = a7(n10), a10?.DPoP && (oO(a10.DPoP), await a10.DPoP.addProof(r10, n10, t10.toUpperCase(), e10)), n10.set("authorization", `${n10.has("dpop") ? "DPoP" : "Bearer"} ${e10}`);
        let o10 = await (a10?.[aQ] || fetch)(r10.href, { duplex: aF(i10, ReadableStream) ? "half" : void 0, body: i10, headers: Object.fromEntries(n10.entries()), method: t10, redirect: "manual", signal: oe(r10, a10?.signal) });
        return a10?.DPoP?.cacheNonce(o10, r10), o10;
      }
      async function oN(e10, t10, r10, n10) {
        oh(e10), of(t10);
        let i10 = ov(e10, "userinfo_endpoint", t10.use_mtls_endpoint_aliases, n10?.[aG] !== true), a10 = a7(n10?.headers);
        return t10.userinfo_signed_response_alg ? a10.set("accept", "application/jwt") : (a10.set("accept", "application/json"), a10.append("accept", "application/jwt")), oI(r10, "GET", i10, a10, null, { ...n10, [aX]: ou(t10) });
      }
      let oU = Symbol();
      function oD(e10) {
        return e10.headers.get("content-type")?.split(";")[0];
      }
      async function oj(e10, t10, r10, n10, i10) {
        let a10;
        if (oh(e10), of(t10), !aF(n10, Response)) throw az('"response" must be an instance of Response', aV);
        if (oB(n10), 200 !== n10.status) throw a8('"response" is not a conform UserInfo Endpoint response (unexpected HTTP status code)', sr, n10);
        if (su(n10), "application/jwt" === oD(n10)) {
          let { claims: r11, jwt: o10 } = await sp(await n10.text(), sh.bind(void 0, t10.userinfo_signed_response_alg, e10.userinfo_signing_alg_values_supported, void 0), ou(t10), od(t10), i10?.[a0]).then(oq.bind(void 0, t10.client_id)).then(oJ.bind(void 0, e10));
          oH.set(n10, o10), a10 = r11;
        } else {
          if (t10.userinfo_signed_response_alg) throw a8("JWT UserInfo Response expected", o9, n10);
          a10 = await sy(n10);
        }
        if (oa(a10.sub, '"response" body "sub" property', se, { body: a10 }), r10 === oU) ;
        else if (oa(r10, '"expectedSubject"'), a10.sub !== r10) throw a8('unexpected "response" body "sub" property value', ss, { expected: r10, body: a10, attribute: "sub" });
        return a10;
      }
      async function oM(e10, t10, r10, n10, i10, a10, o10) {
        return await r10(e10, t10, i10, a10), a10.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), (o10?.[aQ] || fetch)(n10.href, { body: i10, headers: Object.fromEntries(a10.entries()), method: "POST", redirect: "manual", signal: oe(n10, o10?.signal) });
      }
      async function o$(e10, t10, r10, n10, i10, a10) {
        let o10 = ov(e10, "token_endpoint", t10.use_mtls_endpoint_aliases, a10?.[aG] !== true);
        i10.set("grant_type", n10);
        let s10 = a7(a10?.headers);
        s10.set("accept", "application/json"), a10?.DPoP !== void 0 && (oO(a10.DPoP), await a10.DPoP.addProof(o10, s10, "POST"));
        let l2 = await oM(e10, t10, r10, o10, i10, s10, a10);
        return a10?.DPoP?.cacheNonce(l2, o10), l2;
      }
      let oL = /* @__PURE__ */ new WeakMap(), oH = /* @__PURE__ */ new WeakMap();
      function oW(e10) {
        if (!e10.id_token) return;
        let t10 = oL.get(e10);
        if (!t10) throw az('"ref" was already garbage collected or did not resolve from the proper sources', aJ);
        return t10;
      }
      async function oK(e10, t10, r10, n10, i10, a10) {
        if (oh(e10), of(t10), !aF(r10, Response)) throw az('"response" must be an instance of Response', aV);
        await oP(r10, 200, "Token Endpoint"), su(r10);
        let o10 = await sy(r10);
        if (oa(o10.access_token, '"response" body "access_token" property', se, { body: o10 }), oa(o10.token_type, '"response" body "token_type" property', se, { body: o10 }), o10.token_type = o10.token_type.toLowerCase(), void 0 !== o10.expires_in) {
          let e11 = "number" != typeof o10.expires_in ? parseFloat(o10.expires_in) : o10.expires_in;
          oi(e11, true, '"response" body "expires_in" property', se, { body: o10 }), o10.expires_in = e11;
        }
        if (void 0 !== o10.refresh_token && oa(o10.refresh_token, '"response" body "refresh_token" property', se, { body: o10 }), void 0 !== o10.scope && "string" != typeof o10.scope) throw a8('"response" body "scope" property must be a string', se, { body: o10 });
        if (void 0 !== o10.id_token) {
          oa(o10.id_token, '"response" body "id_token" property', se, { body: o10 });
          let a11 = ["aud", "exp", "iat", "iss", "sub"];
          true === t10.require_auth_time && a11.push("auth_time"), void 0 !== t10.default_max_age && (oi(t10.default_max_age, true, '"client.default_max_age"'), a11.push("auth_time")), n10?.length && a11.push(...n10);
          let { claims: s10, jwt: l2 } = await sp(o10.id_token, sh.bind(void 0, t10.id_token_signed_response_alg, e10.id_token_signing_alg_values_supported, "RS256"), ou(t10), od(t10), i10).then(oQ.bind(void 0, a11)).then(oV.bind(void 0, e10)).then(oF.bind(void 0, t10.client_id));
          if (Array.isArray(s10.aud) && 1 !== s10.aud.length) {
            if (void 0 === s10.azp) throw a8('ID Token "aud" (audience) claim includes additional untrusted audiences', so, { claims: s10, claim: "aud" });
            if (s10.azp !== t10.client_id) throw a8('unexpected ID Token "azp" (authorized party) claim value', so, { expected: t10.client_id, claims: s10, claim: "azp" });
          }
          void 0 !== s10.auth_time && oi(s10.auth_time, true, 'ID Token "auth_time" (authentication time)', se, { claims: s10 }), oH.set(r10, l2), oL.set(o10, s10);
        }
        if (a10?.[o10.token_type] !== void 0) a10[o10.token_type](r10, o10);
        else if ("dpop" !== o10.token_type && "bearer" !== o10.token_type) throw new a5("unsupported `token_type` value", { cause: { body: o10 } });
        return o10;
      }
      function oB(e10) {
        let t10;
        if (t10 = function(e11) {
          if (!aF(e11, Response)) throw az('"response" must be an instance of Response', aV);
          let t11 = e11.headers.get("www-authenticate");
          if (null === t11) return;
          let r10 = [], n10 = t11;
          for (; n10; ) {
            let e12, t12 = n10.match(ok), i10 = t12?.["1"].toLowerCase();
            if (!i10) return;
            let a10 = n10.substring(t12[0].length);
            if (a10 && !a10.match(/^[\s,]/)) return;
            let o10 = a10.match(/^\s+(.*)$/), s10 = !!o10;
            n10 = o10 ? o10[1] : void 0;
            let l2 = {};
            if (s10) for (; n10; ) {
              let r11, i11;
              if (t12 = n10.match(oT)) {
                if ([, r11, i11, n10] = t12, i11.includes("\\")) try {
                  i11 = JSON.parse(`"${i11}"`);
                } catch {
                }
                l2[r11.toLowerCase()] = i11;
                continue;
              }
              if (t12 = n10.match(oA)) {
                [, r11, i11, n10] = t12, l2[r11.toLowerCase()] = i11;
                continue;
              }
              if (t12 = n10.match(oR)) {
                if (Object.keys(l2).length) break;
                [, e12, n10] = t12;
                break;
              }
              return;
            }
            else n10 = a10 || void 0;
            let c2 = { scheme: i10, parameters: l2 };
            e12 && (c2.token68 = e12), r10.push(c2);
          }
          if (r10.length) return r10;
        }(e10)) throw new oS("server responded with a challenge in the WWW-Authenticate HTTP Header", { cause: t10, response: e10 });
      }
      function oq(e10, t10) {
        return void 0 !== t10.claims.aud ? oF(e10, t10) : t10;
      }
      function oF(e10, t10) {
        if (Array.isArray(t10.claims.aud)) {
          if (!t10.claims.aud.includes(e10)) throw a8('unexpected JWT "aud" (audience) claim value', so, { expected: e10, claims: t10.claims, claim: "aud" });
        } else if (t10.claims.aud !== e10) throw a8('unexpected JWT "aud" (audience) claim value', so, { expected: e10, claims: t10.claims, claim: "aud" });
        return t10;
      }
      function oJ(e10, t10) {
        return void 0 !== t10.claims.iss ? oV(e10, t10) : t10;
      }
      function oV(e10, t10) {
        let r10 = e10[sw]?.(t10) ?? e10.issuer;
        if (t10.claims.iss !== r10) throw a8('unexpected JWT "iss" (issuer) claim value', so, { expected: r10, claims: t10.claims, claim: "iss" });
        return t10;
      }
      let oz = /* @__PURE__ */ new WeakSet(), oG = Symbol();
      async function oX(e10, t10, r10, n10, i10, a10, o10) {
        if (oh(e10), of(t10), !oz.has(n10)) throw az('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()', aJ);
        oa(i10, '"redirectUri"');
        let s10 = sf(n10, "code");
        if (!s10) throw a8('no authorization code in "callbackParameters"', se);
        let l2 = new URLSearchParams(o10?.additionalParameters);
        return l2.set("redirect_uri", i10), l2.set("code", s10), a10 !== oG && (oa(a10, '"codeVerifier"'), l2.set("code_verifier", a10)), o$(e10, t10, r10, "authorization_code", l2, o10);
      }
      let oY = { aud: "audience", c_hash: "code hash", client_id: "client id", exp: "expiration time", iat: "issued at", iss: "issuer", jti: "jwt id", nonce: "nonce", s_hash: "state hash", sub: "subject", ath: "access token hash", htm: "http method", htu: "http uri", cnf: "confirmation", auth_time: "authentication time" };
      function oQ(e10, t10) {
        for (let r10 of e10) if (void 0 === t10.claims[r10]) throw a8(`JWT "${r10}" (${oY[r10]}) claim missing`, se, { claims: t10.claims });
        return t10;
      }
      let oZ = Symbol(), o0 = Symbol();
      async function o1(e10, t10, r10, n10) {
        return "string" == typeof n10?.expectedNonce || "number" == typeof n10?.maxAge || n10?.requireIdToken ? o2(e10, t10, r10, n10.expectedNonce, n10.maxAge, n10[a0], n10.recognizedTokenTypes) : o3(e10, t10, r10, n10?.[a0], n10?.recognizedTokenTypes);
      }
      async function o2(e10, t10, r10, n10, i10, a10, o10) {
        let s10 = [];
        switch (n10) {
          case void 0:
            n10 = oZ;
            break;
          case oZ:
            break;
          default:
            oa(n10, '"expectedNonce" argument'), s10.push("nonce");
        }
        switch (i10 ??= t10.default_max_age) {
          case void 0:
            i10 = o0;
            break;
          case o0:
            break;
          default:
            oi(i10, true, '"maxAge" argument'), s10.push("auth_time");
        }
        let l2 = await oK(e10, t10, r10, s10, a10, o10);
        oa(l2.id_token, '"response" body "id_token" property', se, { body: l2 });
        let c2 = oW(l2);
        if (i10 !== o0) {
          let e11 = op() + ou(t10), r11 = od(t10);
          if (c2.auth_time + i10 < e11 - r11) throw a8("too much time has elapsed since the last End-User authentication", sa, { claims: c2, now: e11, tolerance: r11, claim: "auth_time" });
        }
        if (n10 === oZ) {
          if (void 0 !== c2.nonce) throw a8('unexpected ID Token "nonce" claim value', so, { expected: void 0, claims: c2, claim: "nonce" });
        } else if (c2.nonce !== n10) throw a8('unexpected ID Token "nonce" claim value', so, { expected: n10, claims: c2, claim: "nonce" });
        return l2;
      }
      async function o3(e10, t10, r10, n10, i10) {
        let a10 = await oK(e10, t10, r10, void 0, n10, i10), o10 = oW(a10);
        if (o10) {
          if (void 0 !== t10.default_max_age) {
            oi(t10.default_max_age, true, '"client.default_max_age"');
            let e11 = op() + ou(t10), r11 = od(t10);
            if (o10.auth_time + t10.default_max_age < e11 - r11) throw a8("too much time has elapsed since the last End-User authentication", sa, { claims: o10, now: e11, tolerance: r11, claim: "auth_time" });
          }
          if (void 0 !== o10.nonce) throw a8('unexpected ID Token "nonce" claim value', so, { expected: void 0, claims: o10, claim: "nonce" });
        }
        return a10;
      }
      let o4 = "OAUTH_WWW_AUTHENTICATE_CHALLENGE", o5 = "OAUTH_RESPONSE_BODY_ERROR", o6 = "OAUTH_UNSUPPORTED_OPERATION", o8 = "OAUTH_AUTHORIZATION_RESPONSE_ERROR", o9 = "OAUTH_JWT_USERINFO_EXPECTED", o7 = "OAUTH_PARSE_ERROR", se = "OAUTH_INVALID_RESPONSE", st = "OAUTH_RESPONSE_IS_NOT_JSON", sr = "OAUTH_RESPONSE_IS_NOT_CONFORM", sn = "OAUTH_HTTP_REQUEST_FORBIDDEN", si = "OAUTH_REQUEST_PROTOCOL_FORBIDDEN", sa = "OAUTH_JWT_TIMESTAMP_CHECK_FAILED", so = "OAUTH_JWT_CLAIM_COMPARISON_FAILED", ss = "OAUTH_JSON_ATTRIBUTE_COMPARISON_FAILED", sl = "OAUTH_MISSING_SERVER_METADATA", sc = "OAUTH_INVALID_SERVER_METADATA";
      function su(e10) {
        if (e10.bodyUsed) throw az('"response" body has been used already', aJ);
      }
      function sd(e10) {
        let { algorithm: t10 } = e10;
        if ("number" != typeof t10.modulusLength || t10.modulusLength < 2048) throw new a5(`unsupported ${t10.name} modulusLength`, { cause: e10 });
      }
      async function sp(e10, t10, r10, n10, i10) {
        let a10, o10, { 0: s10, 1: l2, length: c2 } = e10.split(".");
        if (5 === c2) if (void 0 !== i10) e10 = await i10(e10), { 0: s10, 1: l2, length: c2 } = e10.split(".");
        else throw new a5("JWE decryption is not configured", { cause: e10 });
        if (3 !== c2) throw a8("Invalid JWT", se, e10);
        try {
          a10 = JSON.parse(a3(a4(s10)));
        } catch (e11) {
          throw a8("failed to parse JWT Header body as base64url encoded JSON", o7, e11);
        }
        if (!a9(a10)) throw a8("JWT Header must be a top level object", se, e10);
        if (t10(a10), void 0 !== a10.crit) throw new a5('no JWT "crit" header parameter extensions are supported', { cause: { header: a10 } });
        try {
          o10 = JSON.parse(a3(a4(l2)));
        } catch (e11) {
          throw a8("failed to parse JWT Payload body as base64url encoded JSON", o7, e11);
        }
        if (!a9(o10)) throw a8("JWT Payload must be a top level object", se, e10);
        let u2 = op() + r10;
        if (void 0 !== o10.exp) {
          if ("number" != typeof o10.exp) throw a8('unexpected JWT "exp" (expiration time) claim type', se, { claims: o10 });
          if (o10.exp <= u2 - n10) throw a8('unexpected JWT "exp" (expiration time) claim value, expiration is past current timestamp', sa, { claims: o10, now: u2, tolerance: n10, claim: "exp" });
        }
        if (void 0 !== o10.iat && "number" != typeof o10.iat) throw a8('unexpected JWT "iat" (issued at) claim type', se, { claims: o10 });
        if (void 0 !== o10.iss && "string" != typeof o10.iss) throw a8('unexpected JWT "iss" (issuer) claim type', se, { claims: o10 });
        if (void 0 !== o10.nbf) {
          if ("number" != typeof o10.nbf) throw a8('unexpected JWT "nbf" (not before) claim type', se, { claims: o10 });
          if (o10.nbf > u2 + n10) throw a8('unexpected JWT "nbf" (not before) claim value', sa, { claims: o10, now: u2, tolerance: n10, claim: "nbf" });
        }
        if (void 0 !== o10.aud && "string" != typeof o10.aud && !Array.isArray(o10.aud)) throw a8('unexpected JWT "aud" (audience) claim type', se, { claims: o10 });
        return { header: a10, claims: o10, jwt: e10 };
      }
      function sh(e10, t10, r10, n10) {
        if (void 0 !== e10) {
          if ("string" == typeof e10 ? n10.alg !== e10 : !e10.includes(n10.alg)) throw a8('unexpected JWT "alg" header parameter', se, { header: n10, expected: e10, reason: "client configuration" });
          return;
        }
        if (Array.isArray(t10)) {
          if (!t10.includes(n10.alg)) throw a8('unexpected JWT "alg" header parameter', se, { header: n10, expected: t10, reason: "authorization server metadata" });
          return;
        }
        if (void 0 !== r10) {
          if ("string" == typeof r10 ? n10.alg !== r10 : "function" == typeof r10 ? !r10(n10.alg) : !r10.includes(n10.alg)) throw a8('unexpected JWT "alg" header parameter', se, { header: n10, expected: r10, reason: "default value" });
          return;
        }
        throw a8('missing client or server configuration to verify used JWT "alg" header parameter', void 0, { client: e10, issuer: t10, fallback: r10 });
      }
      function sf(e10, t10) {
        let { 0: r10, length: n10 } = e10.getAll(t10);
        if (n10 > 1) throw a8(`"${t10}" parameter must be provided only once`, se);
        return r10;
      }
      let sg = Symbol(), sm = Symbol();
      async function sy(e10, t10 = os) {
        let r10;
        try {
          r10 = await e10.json();
        } catch (r11) {
          throw t10(e10), a8('failed to parse "response" body as JSON', o7, r11);
        }
        if (!a9(r10)) throw a8('"response" body must be a top level object', se, { body: r10 });
        return r10;
      }
      let sb = Symbol(), sw = Symbol();
      async function sv(e10, t10, r10) {
        let { cookies: n10, logger: i10 } = r10, a10 = n10[e10], o10 = /* @__PURE__ */ new Date();
        o10.setTime(o10.getTime() + 9e5), i10.debug(`CREATE_${e10.toUpperCase()}`, { name: a10.name, payload: t10, COOKIE_TTL: 900, expires: o10 });
        let s10 = await ii({ ...r10.jwt, maxAge: 900, token: { value: t10 }, salt: a10.name }), l2 = { ...a10.options, expires: o10 };
        return { name: a10.name, value: s10, options: l2 };
      }
      async function s_(e10, t10, r10) {
        try {
          let { logger: n10, cookies: i10, jwt: a10 } = r10;
          if (n10.debug(`PARSE_${e10.toUpperCase()}`, { cookie: t10 }), !t10) throw new rr(`${e10} cookie was missing`);
          let o10 = await ia({ ...a10, token: t10, salt: i10[e10].name });
          if (o10?.value) return o10.value;
          throw Error("Invalid cookie");
        } catch (t11) {
          throw new rr(`${e10} value could not be parsed`, { cause: t11 });
        }
      }
      function sE(e10, t10, r10) {
        let { logger: n10, cookies: i10 } = t10, a10 = i10[e10];
        n10.debug(`CLEAR_${e10.toUpperCase()}`, { cookie: a10 }), r10.push({ name: a10.name, value: "", options: { ...i10[e10].options, maxAge: 0 } });
      }
      function sS(e10, t10) {
        return async function(r10, n10, i10) {
          let { provider: a10, logger: o10 } = i10;
          if (!a10?.checks?.includes(e10)) return;
          let s10 = r10?.[i10.cookies[t10].name];
          o10.debug(`USE_${t10.toUpperCase()}`, { value: s10 });
          let l2 = await s_(t10, s10, i10);
          return sE(t10, i10, n10), l2;
        };
      }
      let sx = { async create(e10) {
        let t10 = ol(), r10 = await oc(t10);
        return { cookie: await sv("pkceCodeVerifier", t10, e10), value: r10 };
      }, use: sS("pkce", "pkceCodeVerifier") }, sk = "encodedState", sT = { async create(e10, t10) {
        let { provider: r10 } = e10;
        if (!r10.checks.includes("state")) {
          if (t10) throw new rr("State data was provided but the provider is not configured to use state");
          return;
        }
        let n10 = { origin: t10, random: ol() }, i10 = await ii({ secret: e10.jwt.secret, token: n10, salt: sk, maxAge: 900 });
        return { cookie: await sv("state", i10, e10), value: i10 };
      }, use: sS("state", "state"), async decode(e10, t10) {
        try {
          t10.logger.debug("DECODE_STATE", { state: e10 });
          let r10 = await ia({ secret: t10.jwt.secret, token: e10, salt: sk });
          if (r10) return r10;
          throw Error("Invalid state");
        } catch (e11) {
          throw new rr("State could not be decoded", { cause: e11 });
        }
      } }, sA = { async create(e10) {
        if (!e10.provider.checks.includes("nonce")) return;
        let t10 = ol();
        return { cookie: await sv("nonce", t10, e10), value: t10 };
      }, use: sS("nonce", "nonce") }, sR = "encodedWebauthnChallenge", sC = { create: async (e10, t10, r10) => ({ cookie: await sv("webauthnChallenge", await ii({ secret: e10.jwt.secret, token: { challenge: t10, registerData: r10 }, salt: sR, maxAge: 900 }), e10) }), async use(e10, t10, r10) {
        let n10 = t10?.[e10.cookies.webauthnChallenge.name], i10 = await s_("webauthnChallenge", n10, e10), a10 = await ia({ secret: e10.jwt.secret, token: i10, salt: sR });
        if (sE("webauthnChallenge", e10, r10), !a10) throw new rr("WebAuthn challenge was missing");
        return a10;
      } };
      function sP(e10) {
        return encodeURIComponent(e10).replace(/%20/g, "+");
      }
      async function sO(e10, t10, r10) {
        var n10, i10;
        let a10, o10, s10, l2, c2, { logger: u2, provider: d2 } = r10, { token: p2, userinfo: h2 } = d2;
        if (p2?.url && "authjs.dev" !== p2.url.host || h2?.url && "authjs.dev" !== h2.url.host) a10 = { issuer: d2.issuer ?? "https://authjs.dev", token_endpoint: p2?.url.toString(), userinfo_endpoint: h2?.url.toString() };
        else {
          let e11 = new URL(d2.issuer), t11 = await on(e11, { [aG]: true, [aQ]: d2[ik] });
          if (!(a10 = await oo(e11, t11)).token_endpoint) throw TypeError("TODO: Authorization server did not provide a token endpoint.");
          if (!a10.userinfo_endpoint) throw TypeError("TODO: Authorization server did not provide a userinfo endpoint.");
        }
        let f2 = { client_id: d2.clientId, ...d2.client };
        switch (f2.token_endpoint_auth_method) {
          case void 0:
          case "client_secret_basic":
            o10 = (e11, t11, r11, n11) => {
              var i11, a11;
              let o11, s11, l3;
              n11.set("authorization", (i11 = d2.clientId, a11 = d2.clientSecret, o11 = sP(i11), s11 = sP(a11), l3 = btoa(`${o11}:${s11}`), `Basic ${l3}`));
            };
            break;
          case "client_secret_post":
            oa(n10 = d2.clientSecret, '"clientSecret"'), o10 = (e11, t11, r11, i11) => {
              r11.set("client_id", t11.client_id), r11.set("client_secret", n10);
            };
            break;
          case "client_secret_jwt":
            oa(i10 = d2.clientSecret, '"clientSecret"'), c2 = void 0, o10 = async (e11, t11, r11, n11) => {
              l2 ||= await crypto.subtle.importKey("raw", a3(i10), { hash: "SHA-256", name: "HMAC" }, false, ["sign"]);
              let a11 = { alg: "HS256" }, o11 = og(e11, t11);
              c2?.(a11, o11);
              let s11 = `${a4(a3(JSON.stringify(a11)))}.${a4(a3(JSON.stringify(o11)))}`, u3 = await crypto.subtle.sign(l2.algorithm, l2, a3(s11));
              r11.set("client_id", t11.client_id), r11.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), r11.set("client_assertion", `${s11}.${a4(new Uint8Array(u3))}`);
            };
            break;
          case "private_key_jwt":
            o10 = function(e11, t11) {
              let { key: r11, kid: n11 } = e11 instanceof CryptoKey ? { key: e11 } : e11?.key instanceof CryptoKey ? (void 0 !== e11.kid && oa(e11.kid, '"kid"'), { key: e11.key, kid: e11.kid }) : {};
              var i11 = '"clientPrivateKey.key"';
              if (!(r11 instanceof CryptoKey)) throw az(`${i11} must be a CryptoKey`, aV);
              if ("private" !== r11.type) throw az(`${i11} must be a private CryptoKey`, aJ);
              return async (e12, i12, a11, o11) => {
                let s11 = { alg: function(e13) {
                  switch (e13.algorithm.name) {
                    case "RSA-PSS":
                      switch (e13.algorithm.hash.name) {
                        case "SHA-256":
                          return "PS256";
                        case "SHA-384":
                          return "PS384";
                        case "SHA-512":
                          return "PS512";
                        default:
                          throw new a5("unsupported RsaHashedKeyAlgorithm hash name", { cause: e13 });
                      }
                    case "RSASSA-PKCS1-v1_5":
                      switch (e13.algorithm.hash.name) {
                        case "SHA-256":
                          return "RS256";
                        case "SHA-384":
                          return "RS384";
                        case "SHA-512":
                          return "RS512";
                        default:
                          throw new a5("unsupported RsaHashedKeyAlgorithm hash name", { cause: e13 });
                      }
                    case "ECDSA":
                      switch (e13.algorithm.namedCurve) {
                        case "P-256":
                          return "ES256";
                        case "P-384":
                          return "ES384";
                        case "P-521":
                          return "ES512";
                        default:
                          throw new a5("unsupported EcKeyAlgorithm namedCurve", { cause: e13 });
                      }
                    case "Ed25519":
                    case "ML-DSA-44":
                    case "ML-DSA-65":
                    case "ML-DSA-87":
                      return e13.algorithm.name;
                    case "EdDSA":
                      return "Ed25519";
                    default:
                      throw new a5("unsupported CryptoKey algorithm name", { cause: e13 });
                  }
                }(r11), kid: n11 }, l3 = og(e12, i12);
                t11?.[aZ]?.(s11, l3), a11.set("client_id", i12.client_id), a11.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), a11.set("client_assertion", await om(s11, l3, r11));
              };
            }(d2.token.clientPrivateKey, { [aZ](e11, t11) {
              t11.aud = [a10.issuer, a10.token_endpoint];
            } });
            break;
          case "none":
            o10 = (e11, t11, r11, n11) => {
              r11.set("client_id", t11.client_id);
            };
            break;
          default:
            throw Error("unsupported client authentication method");
        }
        let g2 = [], m2 = await sT.use(t10, g2, r10);
        try {
          s10 = function(e11, t11, r11, n11) {
            var i11;
            if (oh(e11), of(t11), r11 instanceof URL && (r11 = r11.searchParams), !(r11 instanceof URLSearchParams)) throw az('"parameters" must be an instance of URLSearchParams, or URL', aV);
            if (sf(r11, "response")) throw a8('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()', se, { parameters: r11 });
            let a11 = sf(r11, "iss"), o11 = sf(r11, "state");
            if (!a11 && e11.authorization_response_iss_parameter_supported) throw a8('response parameter "iss" (issuer) missing', se, { parameters: r11 });
            if (a11 && a11 !== e11.issuer) throw a8('unexpected "iss" (issuer) response parameter value', se, { expected: e11.issuer, parameters: r11 });
            switch (n11) {
              case void 0:
              case sm:
                if (void 0 !== o11) throw a8('unexpected "state" response parameter encountered', se, { expected: void 0, parameters: r11 });
                break;
              case sg:
                break;
              default:
                if (oa(n11, '"expectedState" argument'), o11 !== n11) throw a8(void 0 === o11 ? 'response parameter "state" missing' : 'unexpected "state" response parameter value', se, { expected: n11, parameters: r11 });
            }
            if (sf(r11, "error")) throw new oE("authorization response from the server is an error", { cause: r11 });
            let s11 = sf(r11, "id_token"), l3 = sf(r11, "token");
            if (void 0 !== s11 || void 0 !== l3) throw new a5("implicit and hybrid flows are not supported");
            return i11 = new URLSearchParams(r11), oz.add(i11), i11;
          }(a10, f2, new URLSearchParams(e10), d2.checks.includes("state") ? m2 : sg);
        } catch (e11) {
          if (e11 instanceof oE) {
            let t11 = { providerId: d2.id, ...Object.fromEntries(e11.cause.entries()) };
            throw u2.debug("OAuthCallbackError", t11), new rc("OAuth Provider returned an error", t11);
          }
          throw e11;
        }
        let y2 = await sx.use(t10, g2, r10), b2 = d2.callbackUrl;
        !r10.isOnRedirectProxy && d2.redirectProxyUrl && (b2 = d2.redirectProxyUrl);
        let w2 = await oX(a10, f2, o10, s10, b2, y2 ?? "decoy", { [aG]: true, [aQ]: (...e11) => (d2.checks.includes("pkce") || e11[1].body.delete("code_verifier"), (d2[ik] ?? fetch)(...e11)) });
        d2.token?.conform && (w2 = await d2.token.conform(w2.clone()) ?? w2);
        let v2 = {}, _2 = "oidc" === d2.type;
        if (d2[iT]) switch (d2.id) {
          case "microsoft-entra-id":
          case "azure-ad": {
            let { tid: e11 } = function(e12) {
              let t11, r11;
              if ("string" != typeof e12) throw new r2("JWTs must use Compact JWS serialization, JWT must be a string");
              let { 1: n11, length: i11 } = e12.split(".");
              if (5 === i11) throw new r2("Only JWTs using Compact JWS serialization can be decoded");
              if (3 !== i11) throw new r2("Invalid JWT");
              if (!n11) throw new r2("JWTs must contain a payload");
              try {
                t11 = rV(n11);
              } catch {
                throw new r2("Failed to base64url decode the payload");
              }
              try {
                r11 = JSON.parse(rL.decode(t11));
              } catch {
                throw new r2("Failed to parse the decoded payload as JSON");
              }
              if (!nx(r11)) throw new r2("Invalid JWT Claims Set");
              return r11;
            }((await w2.clone().json()).id_token);
            if ("string" == typeof e11) {
              let t11 = a10.issuer?.match(/microsoftonline\.com\/(\w+)\/v2\.0/)?.[1] ?? "common", r11 = new URL(a10.issuer.replace(t11, e11)), n11 = await on(r11, { [aQ]: d2[ik] });
              a10 = await oo(r11, n11);
            }
          }
        }
        let E2 = await o1(a10, f2, w2, { expectedNonce: await sA.use(t10, g2, r10), requireIdToken: _2 });
        if (_2) {
          let t11 = oW(E2);
          if (v2 = t11, d2[iT] && "apple" === d2.id) try {
            v2.user = JSON.parse(e10?.user);
          } catch {
          }
          if (false === d2.idToken) {
            let e11 = await oN(a10, f2, E2.access_token, { [aQ]: d2[ik], [aG]: true });
            v2 = await oj(a10, f2, t11.sub, e11);
          }
        } else if (h2?.request) {
          let e11 = await h2.request({ tokens: E2, provider: d2 });
          e11 instanceof Object && (v2 = e11);
        } else if (h2?.url) {
          let e11 = await oN(a10, f2, E2.access_token, { [aQ]: d2[ik] });
          v2 = await e11.json();
        } else throw TypeError("No userinfo endpoint configured");
        return E2.expires_in && (E2.expires_at = Math.floor(Date.now() / 1e3) + Number(E2.expires_in)), { ...await sI(v2, d2, E2, u2), profile: v2, cookies: g2 };
      }
      async function sI(e10, t10, r10, n10) {
        try {
          let n11 = await t10.profile(e10, r10);
          return { user: { ...n11, id: crypto.randomUUID(), email: n11.email?.toLowerCase() }, account: { ...r10, provider: t10.id, type: t10.type, providerAccountId: n11.id ?? crypto.randomUUID() } };
        } catch (r11) {
          n10.debug("getProfile error details", e10), n10.error(new ru(r11, { provider: t10.id }));
        }
      }
      async function sN(e10, t10, r10, n10) {
        let i10 = await s$(e10, t10, r10), { cookie: a10 } = await sC.create(e10, i10.challenge, r10);
        return { status: 200, cookies: [...n10 ?? [], a10], body: { action: "register", options: i10 }, headers: { "Content-Type": "application/json" } };
      }
      async function sU(e10, t10, r10, n10) {
        let i10 = await sM(e10, t10, r10), { cookie: a10 } = await sC.create(e10, i10.challenge);
        return { status: 200, cookies: [...n10 ?? [], a10], body: { action: "authenticate", options: i10 }, headers: { "Content-Type": "application/json" } };
      }
      async function sD(e10, t10, r10) {
        let n10, { adapter: i10, provider: a10 } = e10, o10 = t10.body && "string" == typeof t10.body.data ? JSON.parse(t10.body.data) : void 0;
        if (!o10 || "object" != typeof o10 || !("id" in o10) || "string" != typeof o10.id) throw new t2("Invalid WebAuthn Authentication response");
        let s10 = sW(sH(o10.id)), l2 = await i10.getAuthenticator(s10);
        if (!l2) throw new t2(`WebAuthn authenticator not found in database: ${JSON.stringify({ credentialID: s10 })}`);
        let { challenge: c2 } = await sC.use(e10, t10.cookies, r10);
        try {
          var u2;
          let r11 = a10.getRelayingParty(e10, t10);
          n10 = await a10.simpleWebAuthn.verifyAuthenticationResponse({ ...a10.verifyAuthenticationOptions, expectedChallenge: c2, response: o10, authenticator: { ...u2 = l2, credentialDeviceType: u2.credentialDeviceType, transports: sK(u2.transports), credentialID: sH(u2.credentialID), credentialPublicKey: sH(u2.credentialPublicKey) }, expectedOrigin: r11.origin, expectedRPID: r11.id });
        } catch (e11) {
          throw new rE(e11);
        }
        let { verified: d2, authenticationInfo: p2 } = n10;
        if (!d2) throw new rE("WebAuthn authentication response could not be verified");
        try {
          let { newCounter: e11 } = p2;
          await i10.updateAuthenticatorCounter(l2.credentialID, e11);
        } catch (e11) {
          throw new t4(`Failed to update authenticator counter. This may cause future authentication attempts to fail. ${JSON.stringify({ credentialID: s10, oldCounter: l2.counter, newCounter: p2.newCounter })}`, e11);
        }
        let h2 = await i10.getAccount(l2.providerAccountId, a10.id);
        if (!h2) throw new t2(`WebAuthn account not found in database: ${JSON.stringify({ credentialID: s10, providerAccountId: l2.providerAccountId })}`);
        let f2 = await i10.getUser(h2.userId);
        if (!f2) throw new t2(`WebAuthn user not found in database: ${JSON.stringify({ credentialID: s10, providerAccountId: l2.providerAccountId, userID: h2.userId })}`);
        return { account: h2, user: f2 };
      }
      async function sj(e10, t10, r10) {
        var n10;
        let i10, { provider: a10 } = e10, o10 = t10.body && "string" == typeof t10.body.data ? JSON.parse(t10.body.data) : void 0;
        if (!o10 || "object" != typeof o10 || !("id" in o10) || "string" != typeof o10.id) throw new t2("Invalid WebAuthn Registration response");
        let { challenge: s10, registerData: l2 } = await sC.use(e10, t10.cookies, r10);
        if (!l2) throw new t2("Missing user registration data in WebAuthn challenge cookie");
        try {
          let r11 = a10.getRelayingParty(e10, t10);
          i10 = await a10.simpleWebAuthn.verifyRegistrationResponse({ ...a10.verifyRegistrationOptions, expectedChallenge: s10, response: o10, expectedOrigin: r11.origin, expectedRPID: r11.id });
        } catch (e11) {
          throw new rE(e11);
        }
        if (!i10.verified || !i10.registrationInfo) throw new rE("WebAuthn registration response could not be verified");
        let c2 = { providerAccountId: sW(i10.registrationInfo.credentialID), provider: e10.provider.id, type: a10.type }, u2 = { providerAccountId: c2.providerAccountId, counter: i10.registrationInfo.counter, credentialID: sW(i10.registrationInfo.credentialID), credentialPublicKey: sW(i10.registrationInfo.credentialPublicKey), credentialBackedUp: i10.registrationInfo.credentialBackedUp, credentialDeviceType: i10.registrationInfo.credentialDeviceType, transports: (n10 = o10.response.transports, n10?.join(",")) };
        return { user: l2, account: c2, authenticator: u2 };
      }
      async function sM(e10, t10, r10) {
        let { provider: n10, adapter: i10 } = e10, a10 = r10 && r10.id ? await i10.listAuthenticatorsByUserId(r10.id) : null, o10 = n10.getRelayingParty(e10, t10);
        return await n10.simpleWebAuthn.generateAuthenticationOptions({ ...n10.authenticationOptions, rpID: o10.id, allowCredentials: a10?.map((e11) => ({ id: sH(e11.credentialID), type: "public-key", transports: sK(e11.transports) })) });
      }
      async function s$(e10, t10, r10) {
        let { provider: n10, adapter: i10 } = e10, a10 = r10.id ? await i10.listAuthenticatorsByUserId(r10.id) : null, o10 = ib(32), s10 = n10.getRelayingParty(e10, t10);
        return await n10.simpleWebAuthn.generateRegistrationOptions({ ...n10.registrationOptions, userID: o10, userName: r10.email, userDisplayName: r10.name ?? void 0, rpID: s10.id, rpName: s10.name, excludeCredentials: a10?.map((e11) => ({ id: sH(e11.credentialID), type: "public-key", transports: sK(e11.transports) })) });
      }
      function sL(e10) {
        let { provider: t10, adapter: r10 } = e10;
        if (!r10) throw new ri("An adapter is required for the WebAuthn provider");
        if (!t10 || "webauthn" !== t10.type) throw new rg("Provider must be WebAuthn");
        return { ...e10, provider: t10, adapter: r10 };
      }
      function sH(e10) {
        return new Uint8Array(eG.Buffer.from(e10, "base64"));
      }
      function sW(e10) {
        return eG.Buffer.from(e10).toString("base64");
      }
      function sK(e10) {
        return e10 ? e10.split(",") : void 0;
      }
      async function sB(e10, t10, r10, n10) {
        if (!t10.provider) throw new rg("Callback route called without provider");
        let { query: i10, body: a10, method: o10, headers: s10 } = e10, { provider: l2, adapter: c2, url: u2, callbackUrl: d2, pages: p2, jwt: h2, events: f2, callbacks: g2, session: { strategy: m2, maxAge: y2 }, logger: b2 } = t10, w2 = "jwt" === m2;
        try {
          if ("oauth" === l2.type || "oidc" === l2.type) {
            let o11, s11 = l2.authorization?.url.searchParams.get("response_mode") === "form_post" ? a10 : i10;
            if (t10.isOnRedirectProxy && s11?.state) {
              let e11 = await sT.decode(s11.state, t10);
              if (e11?.origin && new URL(e11.origin).origin !== t10.url.origin) {
                let t11 = `${e11.origin}?${new URLSearchParams(s11)}`;
                return b2.debug("Proxy redirecting to", t11), { redirect: t11, cookies: n10 };
              }
            }
            let m3 = await sO(s11, e10.cookies, t10);
            m3.cookies.length && n10.push(...m3.cookies), b2.debug("authorization result", m3);
            let { user: v2, account: _2, profile: E2 } = m3;
            if (!v2 || !_2 || !E2) return { redirect: `${u2}/signin`, cookies: n10 };
            if (c2) {
              let { getUserByAccount: e11 } = c2;
              o11 = await e11({ providerAccountId: _2.providerAccountId, provider: l2.id });
            }
            let S2 = await sq({ user: o11 ?? v2, account: _2, profile: E2 }, t10);
            if (S2) return { redirect: S2, cookies: n10 };
            let { user: x2, session: k2, isNewUser: T2 } = await aq(r10.value, v2, _2, t10);
            if (w2) {
              let e11 = { name: x2.name, email: x2.email, picture: x2.image, sub: x2.id?.toString() }, i11 = await g2.jwt({ token: e11, user: x2, account: _2, profile: E2, isNewUser: T2, trigger: T2 ? "signUp" : "signIn" });
              if (null === i11) n10.push(...r10.clean());
              else {
                let e12 = t10.cookies.sessionToken.name, a11 = await h2.encode({ ...h2, token: i11, salt: e12 }), o12 = /* @__PURE__ */ new Date();
                o12.setTime(o12.getTime() + 1e3 * y2);
                let s12 = r10.chunk(a11, { expires: o12 });
                n10.push(...s12);
              }
            } else n10.push({ name: t10.cookies.sessionToken.name, value: k2.sessionToken, options: { ...t10.cookies.sessionToken.options, expires: k2.expires } });
            if (await f2.signIn?.({ user: x2, account: _2, profile: E2, isNewUser: T2 }), T2 && p2.newUser) return { redirect: `${p2.newUser}${p2.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: d2 })}`, cookies: n10 };
            return { redirect: d2, cookies: n10 };
          }
          if ("email" === l2.type) {
            let e11 = i10?.token, a11 = i10?.email;
            if (!e11) {
              let t11 = TypeError("Missing token. The sign-in URL was manually opened without token or the link was not sent correctly in the email.", { cause: { hasToken: !!e11 } });
              throw t11.name = "Configuration", t11;
            }
            let o11 = l2.secret ?? t10.secret, s11 = await c2.useVerificationToken({ identifier: a11, token: await iy(`${e11}${o11}`) }), u3 = !!s11, m3 = u3 && s11.expires.valueOf() < Date.now();
            if (!u3 || m3 || a11 && s11.identifier !== a11) throw new ry({ hasInvite: u3, expired: m3 });
            let { identifier: b3 } = s11, v2 = await c2.getUserByEmail(b3) ?? { id: crypto.randomUUID(), email: b3, emailVerified: null }, _2 = { providerAccountId: v2.email, userId: v2.id, type: "email", provider: l2.id }, E2 = await sq({ user: v2, account: _2 }, t10);
            if (E2) return { redirect: E2, cookies: n10 };
            let { user: S2, session: x2, isNewUser: k2 } = await aq(r10.value, v2, _2, t10);
            if (w2) {
              let e12 = { name: S2.name, email: S2.email, picture: S2.image, sub: S2.id?.toString() }, i11 = await g2.jwt({ token: e12, user: S2, account: _2, isNewUser: k2, trigger: k2 ? "signUp" : "signIn" });
              if (null === i11) n10.push(...r10.clean());
              else {
                let e13 = t10.cookies.sessionToken.name, a12 = await h2.encode({ ...h2, token: i11, salt: e13 }), o12 = /* @__PURE__ */ new Date();
                o12.setTime(o12.getTime() + 1e3 * y2);
                let s12 = r10.chunk(a12, { expires: o12 });
                n10.push(...s12);
              }
            } else n10.push({ name: t10.cookies.sessionToken.name, value: x2.sessionToken, options: { ...t10.cookies.sessionToken.options, expires: x2.expires } });
            if (await f2.signIn?.({ user: S2, account: _2, isNewUser: k2 }), k2 && p2.newUser) return { redirect: `${p2.newUser}${p2.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: d2 })}`, cookies: n10 };
            return { redirect: d2, cookies: n10 };
          }
          if ("credentials" === l2.type && "POST" === o10) {
            let e11 = a10 ?? {};
            Object.entries(i10 ?? {}).forEach(([e12, t11]) => u2.searchParams.set(e12, t11));
            let c3 = await l2.authorize(e11, new Request(u2, { headers: s10, method: o10, body: JSON.stringify(a10) }));
            if (c3) c3.id = c3.id?.toString() ?? crypto.randomUUID();
            else throw new re();
            let p3 = { providerAccountId: c3.id, type: "credentials", provider: l2.id }, m3 = await sq({ user: c3, account: p3, credentials: e11 }, t10);
            if (m3) return { redirect: m3, cookies: n10 };
            let b3 = { name: c3.name, email: c3.email, picture: c3.image, sub: c3.id }, w3 = await g2.jwt({ token: b3, user: c3, account: p3, isNewUser: false, trigger: "signIn" });
            if (null === w3) n10.push(...r10.clean());
            else {
              let e12 = t10.cookies.sessionToken.name, i11 = await h2.encode({ ...h2, token: w3, salt: e12 }), a11 = /* @__PURE__ */ new Date();
              a11.setTime(a11.getTime() + 1e3 * y2);
              let o11 = r10.chunk(i11, { expires: a11 });
              n10.push(...o11);
            }
            return await f2.signIn?.({ user: c3, account: p3 }), { redirect: d2, cookies: n10 };
          } else if ("webauthn" === l2.type && "POST" === o10) {
            let i11, a11, o11, s11 = e10.body?.action;
            if ("string" != typeof s11 || "authenticate" !== s11 && "register" !== s11) throw new t2("Invalid action parameter");
            let l3 = sL(t10);
            switch (s11) {
              case "authenticate": {
                let t11 = await sD(l3, e10, n10);
                i11 = t11.user, a11 = t11.account;
                break;
              }
              case "register": {
                let r11 = await sj(t10, e10, n10);
                i11 = r11.user, a11 = r11.account, o11 = r11.authenticator;
              }
            }
            await sq({ user: i11, account: a11 }, t10);
            let { user: c3, isNewUser: u3, session: m3, account: b3 } = await aq(r10.value, i11, a11, t10);
            if (!b3) throw new t2("Error creating or finding account");
            if (o11 && c3.id && await l3.adapter.createAuthenticator({ ...o11, userId: c3.id }), w2) {
              let e11 = { name: c3.name, email: c3.email, picture: c3.image, sub: c3.id?.toString() }, i12 = await g2.jwt({ token: e11, user: c3, account: b3, isNewUser: u3, trigger: u3 ? "signUp" : "signIn" });
              if (null === i12) n10.push(...r10.clean());
              else {
                let e12 = t10.cookies.sessionToken.name, a12 = await h2.encode({ ...h2, token: i12, salt: e12 }), o12 = /* @__PURE__ */ new Date();
                o12.setTime(o12.getTime() + 1e3 * y2);
                let s12 = r10.chunk(a12, { expires: o12 });
                n10.push(...s12);
              }
            } else n10.push({ name: t10.cookies.sessionToken.name, value: m3.sessionToken, options: { ...t10.cookies.sessionToken.options, expires: m3.expires } });
            if (await f2.signIn?.({ user: c3, account: b3, isNewUser: u3 }), u3 && p2.newUser) return { redirect: `${p2.newUser}${p2.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: d2 })}`, cookies: n10 };
            return { redirect: d2, cookies: n10 };
          }
          throw new rg(`Callback for provider type (${l2.type}) is not supported`);
        } catch (t11) {
          if (t11 instanceof t2) throw t11;
          let e11 = new t6(t11, { provider: l2.id });
          throw b2.debug("callback route error details", { method: o10, query: i10, body: a10 }), e11;
        }
      }
      async function sq(e10, t10) {
        let r10, { signIn: n10, redirect: i10 } = t10.callbacks;
        try {
          r10 = await n10(e10);
        } catch (e11) {
          if (e11 instanceof t2) throw e11;
          throw new t5(e11);
        }
        if (!r10) throw new t5("AccessDenied");
        if ("string" == typeof r10) return await i10({ url: r10, baseUrl: t10.url.origin });
      }
      async function sF(e10, t10, r10, n10, i10) {
        let { adapter: a10, jwt: o10, events: s10, callbacks: l2, logger: c2, session: { strategy: u2, maxAge: d2 } } = e10, p2 = { body: null, headers: { "Content-Type": "application/json" }, cookies: r10 }, h2 = t10.value;
        if (!h2) return p2;
        if ("jwt" === u2) {
          try {
            let r11 = e10.cookies.sessionToken.name, a11 = await o10.decode({ ...o10, token: h2, salt: r11 });
            if (!a11) throw Error("Invalid JWT");
            let c3 = await l2.jwt({ token: a11, ...n10 && { trigger: "update" }, session: i10 }), u3 = aB(d2);
            if (null !== c3) {
              let e11 = { user: { name: c3.name, email: c3.email, image: c3.picture }, expires: u3.toISOString() }, n11 = await l2.session({ session: e11, token: c3 });
              p2.body = n11;
              let i11 = await o10.encode({ ...o10, token: c3, salt: r11 }), a12 = t10.chunk(i11, { expires: u3 });
              p2.cookies?.push(...a12), await s10.session?.({ session: n11, token: c3 });
            } else p2.cookies?.push(...t10.clean());
          } catch (e11) {
            c2.error(new rn(e11)), p2.cookies?.push(...t10.clean());
          }
          return p2;
        }
        try {
          let { getSessionAndUser: r11, deleteSession: o11, updateSession: c3 } = a10, u3 = await r11(h2);
          if (u3 && u3.session.expires.valueOf() < Date.now() && (await o11(h2), u3 = null), u3) {
            let { user: t11, session: r12 } = u3, a11 = e10.session.updateAge, o12 = r12.expires.valueOf() - 1e3 * d2 + 1e3 * a11, f2 = aB(d2);
            o12 <= Date.now() && await c3({ sessionToken: h2, expires: f2 });
            let g2 = await l2.session({ session: { ...r12, user: t11 }, user: t11, newSession: i10, ...n10 ? { trigger: "update" } : {} });
            p2.body = g2, p2.cookies?.push({ name: e10.cookies.sessionToken.name, value: h2, options: { ...e10.cookies.sessionToken.options, expires: f2 } }), await s10.session?.({ session: g2 });
          } else h2 && p2.cookies?.push(...t10.clean());
        } catch (e11) {
          c2.error(new rd(e11));
        }
        return p2;
      }
      async function sJ(e10, t10) {
        let r10, n10, { logger: i10, provider: a10 } = t10, o10 = a10.authorization?.url;
        if (!o10 || "authjs.dev" === o10.host) {
          let e11 = new URL(a10.issuer), t11 = await on(e11, { [aQ]: a10[ik], [aG]: true }), r11 = await oo(e11, t11);
          if (!r11.authorization_endpoint) throw TypeError("Authorization server did not provide an authorization endpoint.");
          o10 = new URL(r11.authorization_endpoint);
        }
        let s10 = o10.searchParams, l2 = a10.callbackUrl;
        !t10.isOnRedirectProxy && a10.redirectProxyUrl && (l2 = a10.redirectProxyUrl, n10 = a10.callbackUrl, i10.debug("using redirect proxy", { redirect_uri: l2, data: n10 }));
        let c2 = Object.assign({ response_type: "code", client_id: a10.clientId, redirect_uri: l2, ...a10.authorization?.params }, Object.fromEntries(a10.authorization?.url.searchParams ?? []), e10);
        for (let e11 in c2) s10.set(e11, c2[e11]);
        let u2 = [];
        a10.authorization?.url.searchParams.get("response_mode") === "form_post" && (t10.cookies.state.options.sameSite = "none", t10.cookies.state.options.secure = true, t10.cookies.nonce.options.sameSite = "none", t10.cookies.nonce.options.secure = true);
        let d2 = await sT.create(t10, n10);
        if (d2 && (s10.set("state", d2.value), u2.push(d2.cookie)), a10.checks?.includes("pkce")) if (r10 && !r10.code_challenge_methods_supported?.includes("S256")) "oidc" === a10.type && (a10.checks = ["nonce"]);
        else {
          let { value: e11, cookie: r11 } = await sx.create(t10);
          s10.set("code_challenge", e11), s10.set("code_challenge_method", "S256"), u2.push(r11);
        }
        let p2 = await sA.create(t10);
        return p2 && (s10.set("nonce", p2.value), u2.push(p2.cookie)), "oidc" !== a10.type || o10.searchParams.has("scope") || o10.searchParams.set("scope", "openid profile email"), i10.debug("authorization url is ready", { url: o10, cookies: u2, provider: a10 }), { redirect: o10.toString(), cookies: u2 };
      }
      async function sV(e10, t10) {
        let r10, { body: n10 } = e10, { provider: i10, callbacks: a10, adapter: o10 } = t10, s10 = (i10.normalizeIdentifier ?? function(e11) {
          if (!e11) throw Error("Missing email from request body.");
          let [t11, r11] = e11.toLowerCase().trim().split("@");
          return r11 = r11.split(",")[0], `${t11}@${r11}`;
        })(n10?.email), l2 = { id: crypto.randomUUID(), email: s10, emailVerified: null }, c2 = await o10.getUserByEmail(s10) ?? l2, u2 = { providerAccountId: s10, userId: c2.id, type: "email", provider: i10.id };
        try {
          r10 = await a10.signIn({ user: c2, account: u2, email: { verificationRequest: true } });
        } catch (e11) {
          throw new t5(e11);
        }
        if (!r10) throw new t5("AccessDenied");
        if ("string" == typeof r10) return { redirect: await a10.redirect({ url: r10, baseUrl: t10.url.origin }) };
        let { callbackUrl: d2, theme: p2 } = t10, h2 = await i10.generateVerificationToken?.() ?? ib(32), f2 = new Date(Date.now() + (i10.maxAge ?? 86400) * 1e3), g2 = i10.secret ?? t10.secret, m2 = new URL(t10.basePath, t10.url.origin), y2 = i10.sendVerificationRequest({ identifier: s10, token: h2, expires: f2, url: `${m2}/callback/${i10.id}?${new URLSearchParams({ callbackUrl: d2, token: h2, email: s10 })}`, provider: i10, theme: p2, request: new Request(e10.url, { headers: e10.headers, method: e10.method, body: "POST" === e10.method ? JSON.stringify(e10.body ?? {}) : void 0 }) }), b2 = o10.createVerificationToken?.({ identifier: s10, token: await iy(`${h2}${g2}`), expires: f2 });
        return await Promise.all([y2, b2]), { redirect: `${m2}/verify-request?${new URLSearchParams({ provider: i10.id, type: i10.type })}` };
      }
      async function sz(e10, t10, r10) {
        let n10 = `${r10.url.origin}${r10.basePath}/signin`;
        if (!r10.provider) return { redirect: n10, cookies: t10 };
        switch (r10.provider.type) {
          case "oauth":
          case "oidc": {
            let { redirect: n11, cookies: i10 } = await sJ(e10.query, r10);
            return i10 && t10.push(...i10), { redirect: n11, cookies: t10 };
          }
          case "email":
            return { ...await sV(e10, r10), cookies: t10 };
          default:
            return { redirect: n10, cookies: t10 };
        }
      }
      async function sG(e10, t10, r10) {
        let { jwt: n10, events: i10, callbackUrl: a10, logger: o10, session: s10 } = r10, l2 = t10.value;
        if (!l2) return { redirect: a10, cookies: e10 };
        try {
          if ("jwt" === s10.strategy) {
            let e11 = r10.cookies.sessionToken.name, t11 = await n10.decode({ ...n10, token: l2, salt: e11 });
            await i10.signOut?.({ token: t11 });
          } else {
            let e11 = await r10.adapter?.deleteSession(l2);
            await i10.signOut?.({ session: e11 });
          }
        } catch (e11) {
          o10.error(new rp(e11));
        }
        return e10.push(...t10.clean()), { redirect: a10, cookies: e10 };
      }
      async function sX(e10, t10) {
        let { adapter: r10, jwt: n10, session: { strategy: i10 } } = e10, a10 = t10.value;
        if (!a10) return null;
        if ("jwt" === i10) {
          let t11 = e10.cookies.sessionToken.name, r11 = await n10.decode({ ...n10, token: a10, salt: t11 });
          if (r11 && r11.sub) return { id: r11.sub, name: r11.name, email: r11.email, image: r11.picture };
        } else {
          let e11 = await r10?.getSessionAndUser(a10);
          if (e11) return e11.user;
        }
        return null;
      }
      async function sY(e10, t10, r10, n10) {
        let i10 = sL(t10), { provider: a10 } = i10, { action: o10 } = e10.query ?? {};
        if ("register" !== o10 && "authenticate" !== o10 && void 0 !== o10) return { status: 400, body: { error: "Invalid action" }, cookies: n10, headers: { "Content-Type": "application/json" } };
        let s10 = await sX(t10, r10), l2 = s10 ? { user: s10, exists: true } : await a10.getUserInfo(t10, e10), c2 = l2?.user;
        switch (function(e11, t11, r11) {
          let { user: n11, exists: i11 = false } = r11 ?? {};
          switch (e11) {
            case "authenticate":
              return "authenticate";
            case "register":
              if (n11 && t11 === i11) return "register";
              break;
            case void 0:
              if (!t11) if (!n11) return "authenticate";
              else if (i11) return "authenticate";
              else return "register";
          }
          return null;
        }(o10, !!s10, l2)) {
          case "authenticate":
            return sU(i10, e10, c2, n10);
          case "register":
            if ("string" == typeof c2?.email) return sN(i10, e10, c2, n10);
            break;
          default:
            return { status: 400, body: { error: "Invalid request" }, cookies: n10, headers: { "Content-Type": "application/json" } };
        }
      }
      async function sQ(e10, t10) {
        let { action: r10, providerId: n10, error: i10, method: a10 } = e10, o10 = t10.skipCSRFCheck === iS, { options: s10, cookies: l2 } = await iI({ authOptions: t10, action: r10, providerId: n10, url: e10.url, callbackUrl: e10.body?.callbackUrl ?? e10.query?.callbackUrl, csrfToken: e10.body?.csrfToken, cookies: e10.cookies, isPost: "POST" === a10, csrfDisabled: o10 }), c2 = new t1(s10.cookies.sessionToken, e10.cookies, s10.logger);
        if ("GET" === a10) {
          let t11 = aK({ ...s10, query: e10.query, cookies: l2 });
          switch (r10) {
            case "callback":
              return await sB(e10, s10, c2, l2);
            case "csrf":
              return t11.csrf(o10, s10, l2);
            case "error":
              return t11.error(i10);
            case "providers":
              return t11.providers(s10.providers);
            case "session":
              return await sF(s10, c2, l2);
            case "signin":
              return t11.signin(n10, i10);
            case "signout":
              return t11.signout();
            case "verify-request":
              return t11.verifyRequest();
            case "webauthn-options":
              return await sY(e10, s10, c2, l2);
          }
        } else {
          let { csrfTokenVerified: t11 } = s10;
          switch (r10) {
            case "callback":
              return "credentials" === s10.provider.type && iv(r10, t11), await sB(e10, s10, c2, l2);
            case "session":
              return iv(r10, t11), await sF(s10, c2, l2, true, e10.body?.data);
            case "signin":
              return iv(r10, t11), await sz(e10, l2, s10);
            case "signout":
              return iv(r10, t11), await sG(l2, c2, s10);
          }
        }
        throw new rh(`Cannot handle action: ${r10}`);
      }
      function sZ(e10, t10, r10, n10, i10) {
        let a10, o10 = i10?.basePath, s10 = n10.AUTH_URL ?? n10.NEXTAUTH_URL;
        if (s10) a10 = new URL(s10), o10 && "/" !== o10 && "/" !== a10.pathname && (a10.pathname !== o10 && id(i10).warn("env-url-basepath-mismatch"), a10.pathname = "/");
        else {
          let e11 = r10.get("x-forwarded-host") ?? r10.get("host"), n11 = r10.get("x-forwarded-proto") ?? t10 ?? "https", i11 = n11.endsWith(":") ? n11 : n11 + ":";
          a10 = new URL(`${i11}//${e11}`);
        }
        let l2 = a10.toString().replace(/\/$/, "");
        if (o10) {
          let t11 = o10?.replace(/(^\/|\/$)/g, "") ?? "";
          return new URL(`${l2}/${t11}/${e10}`);
        }
        return new URL(`${l2}/${e10}`);
      }
      async function s0(e10, t10) {
        let r10 = id(t10), n10 = await ig(e10, t10);
        if (!n10) return Response.json("Bad request.", { status: 400 });
        let i10 = function(e11, t11) {
          let { url: r11 } = e11, n11 = [];
          if (!rk && t11.debug && n11.push("debug-enabled"), !t11.trustHost) return new rm(`Host must be trusted. URL was: ${e11.url}`);
          if (!t11.secret?.length) return new rs("Please define a `secret`");
          let i11 = e11.query?.callbackUrl;
          if (i11 && !rT(i11, r11.origin)) return new t7(`Invalid callback URL. Received: ${i11}`);
          let { callbackUrl: a11 } = t0(t11.useSecureCookies ?? "https:" === r11.protocol), o11 = e11.cookies?.[t11.cookies?.callbackUrl?.name ?? a11.name];
          if (o11 && !rT(o11, r11.origin)) return new t7(`Invalid callback URL. Received: ${o11}`);
          let s10 = false;
          for (let e12 of t11.providers) {
            let t12 = "function" == typeof e12 ? e12() : e12;
            if (("oauth" === t12.type || "oidc" === t12.type) && !(t12.issuer ?? t12.options?.issuer)) {
              let e13, { authorization: r12, token: n12, userinfo: i12 } = t12;
              if ("string" == typeof r12 || r12?.url ? "string" == typeof n12 || n12?.url ? "string" == typeof i12 || i12?.url || (e13 = "userinfo") : e13 = "token" : e13 = "authorization", e13) return new rt(`Provider "${t12.id}" is missing both \`issuer\` and \`${e13}\` endpoint config. At least one of them is required`);
            }
            if ("credentials" === t12.type) rA = true;
            else if ("email" === t12.type) rR = true;
            else if ("webauthn" === t12.type) {
              var l2;
              if (rC = true, t12.simpleWebAuthnBrowserVersion && (l2 = t12.simpleWebAuthnBrowserVersion, !/^v\d+(?:\.\d+){0,2}$/.test(l2))) return new t2(`Invalid provider config for "${t12.id}": simpleWebAuthnBrowserVersion "${t12.simpleWebAuthnBrowserVersion}" must be a valid semver string.`);
              if (t12.enableConditionalUI) {
                if (s10) return new rv("Multiple webauthn providers have 'enableConditionalUI' set to True. Only one provider can have this option enabled at a time");
                if (s10 = true, !Object.values(t12.formFields).some((e13) => e13.autocomplete && e13.autocomplete.toString().indexOf("webauthn") > -1)) return new r_(`Provider "${t12.id}" has 'enableConditionalUI' set to True, but none of its formFields have 'webauthn' in their autocomplete param`);
              }
            }
          }
          if (rA) {
            let e12 = t11.session?.strategy === "database", r12 = !t11.providers.some((e13) => "credentials" !== ("function" == typeof e13 ? e13() : e13).type);
            if (e12 && r12) return new rf("Signing in with credentials only supported if JWT strategy is enabled");
            if (t11.providers.some((e13) => {
              let t12 = "function" == typeof e13 ? e13() : e13;
              return "credentials" === t12.type && !t12.authorize;
            })) return new ro("Must define an authorize() handler to use credentials authentication provider");
          }
          let { adapter: c2, session: u2 } = t11, d2 = [];
          if (rR || u2?.strategy === "database" || !u2?.strategy && c2) if (rR) {
            if (!c2) return new ri("Email login requires an adapter");
            d2.push(...rP);
          } else {
            if (!c2) return new ri("Database session requires an adapter");
            d2.push(...rO);
          }
          if (rC) {
            if (!t11.experimental?.enableWebAuthn) return new rx("WebAuthn is an experimental feature. To enable it, set `experimental.enableWebAuthn` to `true` in your config");
            if (n11.push("experimental-webauthn"), !c2) return new ri("WebAuthn requires an adapter");
            d2.push(...rI);
          }
          if (c2) {
            let e12 = d2.filter((e13) => !(e13 in c2));
            if (e12.length) return new ra(`Required adapter methods were missing: ${e12.join(", ")}`);
          }
          return rk || (rk = true), n11;
        }(n10, t10);
        if (Array.isArray(i10)) i10.forEach(r10.warn);
        else if (i10) {
          if (r10.error(i10), !(/* @__PURE__ */ new Set(["signin", "signout", "error", "verify-request"])).has(n10.action) || "GET" !== n10.method) return Response.json({ message: "There was a problem with the server configuration. Check the server logs for more information." }, { status: 500 });
          let { pages: e11, theme: a11 } = t10, o11 = e11?.error && n10.url.searchParams.get("callbackUrl")?.startsWith(e11.error);
          if (!e11?.error || o11) return o11 && r10.error(new t8(`The error page ${e11?.error} should not require authentication`)), im(aK({ theme: a11 }).error("Configuration"));
          let s10 = `${n10.url.origin}${e11.error}?error=Configuration`;
          return Response.redirect(s10);
        }
        let a10 = e10.headers?.has("X-Auth-Return-Redirect"), o10 = t10.raw === ix;
        try {
          let e11 = await sQ(n10, t10);
          if (o10) return e11;
          let r11 = im(e11), i11 = r11.headers.get("Location");
          if (!a10 || !i11) return r11;
          return Response.json({ url: i11 }, { headers: r11.headers });
        } catch (d2) {
          r10.error(d2);
          let i11 = d2 instanceof t2;
          if (i11 && o10 && !a10) throw d2;
          if ("POST" === e10.method && "session" === n10.action) return Response.json(null, { status: 400 });
          let s10 = new URLSearchParams({ error: d2 instanceof t2 && rw.has(d2.type) ? d2.type : "Configuration" });
          d2 instanceof re && s10.set("code", d2.code);
          let l2 = i11 && d2.kind || "error", c2 = t10.pages?.[l2] ?? `${t10.basePath}/${l2.toLowerCase()}`, u2 = `${n10.url.origin}${c2}?${s10}`;
          if (a10) return Response.json({ url: u2 });
          return Response.redirect(u2);
        }
      }
      e.i(64445);
      var s1 = e.i(63072);
      function s2() {
        let e10 = e4.getStore();
        return (null == e10 ? void 0 : e10.rootTaskSpawnPhase) === "action";
      }
      function s3(e10) {
        let t10 = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
        if (!t10) return e10;
        let { origin: r10 } = new URL(t10), { href: n10, origin: i10 } = e10.nextUrl;
        return new J(n10.replace(i10, r10), e10);
      }
      function s4(e10) {
        try {
          e10.secret ?? (e10.secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET);
          let t10 = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
          if (!t10) return;
          let { pathname: r10 } = new URL(t10);
          if ("/" === r10) return;
          e10.basePath || (e10.basePath = r10);
        } catch {
        } finally {
          e10.basePath || (e10.basePath = "/api/auth"), function(e11, t10, r10 = false) {
            try {
              let n10 = e11.AUTH_URL;
              n10 && (t10.basePath ? r10 || id(t10).warn("env-url-basepath-redundant") : t10.basePath = new URL(n10).pathname);
            } catch {
            } finally {
              t10.basePath ?? (t10.basePath = "/auth");
            }
            if (!t10.secret?.length) {
              t10.secret = [];
              let r11 = e11.AUTH_SECRET;
              for (let n10 of (r11 && t10.secret.push(r11), [1, 2, 3])) {
                let r12 = e11[`AUTH_SECRET_${n10}`];
                r12 && t10.secret.unshift(r12);
              }
            }
            t10.redirectProxyUrl ?? (t10.redirectProxyUrl = e11.AUTH_REDIRECT_PROXY_URL), t10.trustHost ?? (t10.trustHost = !!(e11.AUTH_URL ?? e11.AUTH_TRUST_HOST ?? e11.VERCEL ?? e11.CF_PAGES ?? "production" !== e11.NODE_ENV)), t10.providers = t10.providers.map((t11) => {
              let { id: r11 } = "function" == typeof t11 ? t11({}) : t11, n10 = r11.toUpperCase().replace(/-/g, "_"), i10 = e11[`AUTH_${n10}_ID`], a10 = e11[`AUTH_${n10}_SECRET`], o10 = e11[`AUTH_${n10}_ISSUER`], s10 = e11[`AUTH_${n10}_KEY`], l2 = "function" == typeof t11 ? t11({ clientId: i10, clientSecret: a10, issuer: o10, apiKey: s10 }) : t11;
              return "oauth" === l2.type || "oidc" === l2.type ? (l2.clientId ?? (l2.clientId = i10), l2.clientSecret ?? (l2.clientSecret = a10), l2.issuer ?? (l2.issuer = o10)) : "email" === l2.type && (l2.apiKey ?? (l2.apiKey = s10)), l2;
            });
          }(process.env, e10, true);
        }
      }
      var eo = eo, eJ = eJ;
      class s5 extends Error {
        constructor(...e10) {
          super(...e10), this.code = "NEXT_STATIC_GEN_BAILOUT";
        }
      }
      var s6 = e.i(51564), s8 = e.i(40049);
      let s9 = { current: null }, s7 = "function" == typeof s8.cache ? s8.cache : (e10) => e10, le = console.warn;
      function lt(e10) {
        return function(...t10) {
          le(e10(...t10));
        };
      }
      function lr() {
        let e10 = "cookies", t10 = eo.workAsyncStorageInstance.getStore(), r10 = eJ.workUnitAsyncStorageInstance.getStore();
        if (t10) {
          if (r10 && "after" === r10.phase && !s2()) throw Object.defineProperty(Error(`Route ${t10.route} used \`cookies()\` inside \`after()\`. This is not supported. If you need this data inside an \`after()\` callback, use \`cookies()\` outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E843", enumerable: false, configurable: true });
          if (t10.forceStatic) return li(el.seal(new q.RequestCookies(new Headers({}))));
          if (t10.dynamicShouldError) throw Object.defineProperty(new s5(`Route ${t10.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`cookies()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E849", enumerable: false, configurable: true });
          if (r10) switch (r10.type) {
            case "cache":
              let a10 = Object.defineProperty(Error(`Route ${t10.route} used \`cookies()\` inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`cookies()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E831", enumerable: false, configurable: true });
              throw Error.captureStackTrace(a10, lr), t10.invalidDynamicUsageError ??= a10, a10;
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${t10.route} used \`cookies()\` inside a function cached with \`unstable_cache()\`. Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`cookies()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E846", enumerable: false, configurable: true });
            case "generate-static-params":
              throw Object.defineProperty(Error(`Route ${t10.route} used \`cookies()\` inside \`generateStaticParams\`. This is not supported because \`generateStaticParams\` runs at build time without an HTTP request. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E1123", enumerable: false, configurable: true });
            case "prerender":
              var n10 = t10, i10 = r10;
              let o10 = ln.get(i10);
              if (o10) return o10;
              let s10 = (0, s6.makeHangingPromise)(i10.renderSignal, n10.route, "`cookies()`");
              return ln.set(i10, s10), s10;
            case "prerender-client":
            case "validation-client":
              let l2 = "`cookies`";
              throw Object.defineProperty(new ez.InvariantError(`${l2} must not be used within a Client Component. Next.js should be preventing ${l2} from being included in Client Components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E1037", enumerable: false, configurable: true });
            case "prerender-ppr":
              return (0, s1.postponeWithTracking)(t10.route, e10, r10.dynamicTracking);
            case "prerender-legacy":
              return (0, s1.throwToInterruptStaticGeneration)(e10, t10, r10);
            case "prerender-runtime":
              return (0, s6.delayUntilRuntimeStage)(r10, li(r10.cookies));
            case "private-cache":
              return li(r10.cookies);
            case "request":
              let c2;
              if ((0, s1.trackDynamicDataInDynamicRender)(r10), c2 = ed(r10) ? r10.userspaceMutableCookies : r10.cookies, !r10.asyncApiPromises) return li(c2);
              {
                let e11 = (0, eF.isInEarlyRenderStage)(r10);
                if (c2 === r10.mutableCookies) return e11 ? r10.asyncApiPromises.earlyMutableCookies : r10.asyncApiPromises.mutableCookies;
                return e11 ? r10.asyncApiPromises.earlyCookies : r10.asyncApiPromises.cookies;
              }
          }
        }
        (0, eF.throwForMissingRequestStore)(e10);
      }
      s7((e10) => {
        try {
          le(s9.current);
        } finally {
          s9.current = null;
        }
      }), e.i(38174);
      let ln = /* @__PURE__ */ new WeakMap();
      function li(e10) {
        let t10 = ln.get(e10);
        if (t10) return t10;
        let r10 = Promise.resolve(e10);
        return ln.set(e10, r10), r10;
      }
      lt(function(e10, t10) {
        let r10 = e10 ? `Route "${e10}" ` : "This route ";
        return Object.defineProperty(Error(`${r10}used ${t10}. \`cookies()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E830", enumerable: false, configurable: true });
      });
      var eo = eo, eJ = eJ;
      function la() {
        let e10 = "headers", t10 = eo.workAsyncStorageInstance.getStore(), r10 = eJ.workUnitAsyncStorageInstance.getStore();
        if (t10) {
          if (r10 && "after" === r10.phase && !s2()) throw Object.defineProperty(Error(`Route ${t10.route} used \`headers()\` inside \`after()\`. This is not supported. If you need this data inside an \`after()\` callback, use \`headers()\` outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E839", enumerable: false, configurable: true });
          if (t10.forceStatic) return ls(ea.seal(new Headers({})));
          if (r10) switch (r10.type) {
            case "cache": {
              let e11 = Object.defineProperty(Error(`Route ${t10.route} used \`headers()\` inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`headers()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E833", enumerable: false, configurable: true });
              throw Error.captureStackTrace(e11, la), t10.invalidDynamicUsageError ??= e11, e11;
            }
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${t10.route} used \`headers()\` inside a function cached with \`unstable_cache()\`. Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`headers()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E838", enumerable: false, configurable: true });
            case "generate-static-params":
              throw Object.defineProperty(Error(`Route ${t10.route} used \`headers()\` inside \`generateStaticParams\`. This is not supported because \`generateStaticParams\` runs at build time without an HTTP request. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E1134", enumerable: false, configurable: true });
          }
          if (t10.dynamicShouldError) throw Object.defineProperty(new s5(`Route ${t10.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E828", enumerable: false, configurable: true });
          if (r10) switch (r10.type) {
            case "prerender":
              var n10 = t10, i10 = r10;
              let a10 = lo.get(i10);
              if (a10) return a10;
              let o10 = (0, s6.makeHangingPromise)(i10.renderSignal, n10.route, "`headers()`");
              return lo.set(i10, o10), o10;
            case "prerender-client":
            case "validation-client":
              let s10 = "`headers`";
              throw Object.defineProperty(new ez.InvariantError(`${s10} must not be used within a client component. Next.js should be preventing ${s10} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E1017", enumerable: false, configurable: true });
            case "prerender-ppr":
              return (0, s1.postponeWithTracking)(t10.route, e10, r10.dynamicTracking);
            case "prerender-legacy":
              return (0, s1.throwToInterruptStaticGeneration)(e10, t10, r10);
            case "prerender-runtime":
              return (0, s6.delayUntilRuntimeStage)(r10, ls(r10.headers));
            case "private-cache":
              return ls(r10.headers);
            case "request":
              if ((0, s1.trackDynamicDataInDynamicRender)(r10), r10.asyncApiPromises) return (0, eF.isInEarlyRenderStage)(r10) ? r10.asyncApiPromises.earlyHeaders : r10.asyncApiPromises.headers;
              return ls(r10.headers);
          }
        }
        (0, eF.throwForMissingRequestStore)(e10);
      }
      let lo = /* @__PURE__ */ new WeakMap();
      function ls(e10) {
        let t10 = lo.get(e10);
        if (t10) return t10;
        let r10 = Promise.resolve(e10);
        return lo.set(e10, r10), r10;
      }
      lt(function(e10, t10) {
        let r10 = e10 ? `Route "${e10}" ` : "This route ";
        return Object.defineProperty(Error(`${r10}used ${t10}. \`headers()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E836", enumerable: false, configurable: true });
      });
      var eo = eo, eJ = eJ;
      async function ll(e10, t10) {
        return s0(new Request(sZ("session", e10.get("x-forwarded-proto"), e10, process.env, t10), { headers: { cookie: e10.get("cookie") ?? "" } }), { ...t10, callbacks: { ...t10.callbacks, async session(...e11) {
          let r10 = await t10.callbacks?.session?.(...e11) ?? { ...e11[0].session, expires: e11[0].session.expires?.toISOString?.() ?? e11[0].session.expires };
          return { user: e11[0].user ?? e11[0].token, ...r10 };
        } } });
      }
      function lc(e10) {
        return "function" == typeof e10;
      }
      function lu(e10, t10) {
        return "function" == typeof e10 ? async (...r10) => {
          if (!r10.length) {
            let r11 = await la(), n11 = await e10(void 0);
            return t10?.(n11), ll(r11, n11).then((e11) => e11.json());
          }
          if (r10[0] instanceof Request) {
            let n11 = r10[0], i11 = r10[1], a11 = await e10(n11);
            return t10?.(a11), ld([n11, i11], a11);
          }
          if (lc(r10[0])) {
            let n11 = r10[0];
            return async (...r11) => {
              let i11 = await e10(r11[0]);
              return t10?.(i11), ld(r11, i11, n11);
            };
          }
          let n10 = "req" in r10[0] ? r10[0].req : r10[0], i10 = "res" in r10[0] ? r10[0].res : r10[1], a10 = await e10(n10);
          return t10?.(a10), ll(new Headers(n10.headers), a10).then(async (e11) => {
            let t11 = await e11.json();
            for (let t12 of e11.headers.getSetCookie()) "headers" in i10 ? i10.headers.append("set-cookie", t12) : i10.appendHeader("set-cookie", t12);
            return t11;
          });
        } : (...t11) => {
          if (!t11.length) return Promise.resolve(la()).then((t12) => ll(t12, e10).then((e11) => e11.json()));
          if (t11[0] instanceof Request) return ld([t11[0], t11[1]], e10);
          if (lc(t11[0])) {
            let r11 = t11[0];
            return async (...t12) => ld(t12, e10, r11).then((e11) => e11);
          }
          let r10 = "req" in t11[0] ? t11[0].req : t11[0], n10 = "res" in t11[0] ? t11[0].res : t11[1];
          return ll(new Headers(r10.headers), e10).then(async (e11) => {
            let t12 = await e11.json();
            for (let t13 of e11.headers.getSetCookie()) "headers" in n10 ? n10.headers.append("set-cookie", t13) : n10.appendHeader("set-cookie", t13);
            return t12;
          });
        };
      }
      async function ld(e10, t10, r10) {
        let n10 = s3(e10[0]), i10 = await ll(n10.headers, t10), a10 = await i10.json(), o10 = true;
        t10.callbacks?.authorized && (o10 = await t10.callbacks.authorized({ request: n10, auth: a10 }));
        let s10 = Y.next?.();
        if (o10 instanceof Response) {
          var l2, c2, u2;
          let e11, r11;
          s10 = o10;
          let i11 = o10.headers.get("Location"), { pathname: a11 } = n10.nextUrl;
          i11 && (l2 = a11, c2 = new URL(i11).pathname, u2 = t10, e11 = c2.replace(`${l2}/`, ""), r11 = Object.values(u2.pages ?? {}), (lp.has(e11) || r11.includes(c2)) && c2 === l2) && (o10 = true);
        } else if (r10) n10.auth = a10, s10 = await r10(n10, e10[1]) ?? Y.next();
        else if (!o10) {
          let e11 = t10.pages?.signIn ?? `${t10.basePath}/signin`;
          if (n10.nextUrl.pathname !== e11) {
            let t11 = n10.nextUrl.clone();
            t11.pathname = e11, t11.searchParams.set("callbackUrl", n10.nextUrl.href), s10 = Y.redirect(t11);
          }
        }
        let d2 = new Response(s10?.body, s10);
        for (let e11 of i10.headers.getSetCookie()) d2.headers.append("set-cookie", e11);
        return d2;
      }
      e.i(18368), /* @__PURE__ */ new WeakMap(), lt(function(e10, t10) {
        let r10 = e10 ? `Route "${e10}" ` : "This route ";
        return Object.defineProperty(Error(`${r10}used ${t10}. \`draftMode()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E835", enumerable: false, configurable: true });
      });
      let lp = /* @__PURE__ */ new Set(["providers", "session", "csrf", "signin", "signout", "callback", "verify-request", "error"]);
      URLSearchParams;
      var lh = e.i(16852), lf = e.i(75982);
      let lg = e.r(91375).actionAsyncStorage;
      function lm(e10, t10) {
        throw function(e11, t11, r10 = lh.RedirectStatusCode.TemporaryRedirect) {
          let n10 = Object.defineProperty(Error(lf.REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          return n10.digest = `${lf.REDIRECT_ERROR_CODE};${t11};${e11};${r10};`, n10;
        }(e10, t10 ??= lg?.getStore()?.isAction ? "push" : "replace", lh.RedirectStatusCode.TemporaryRedirect);
      }
      async function ly(e10, t10 = {}, r10, n10) {
        let i10 = new Headers(await la()), { redirect: a10 = true, redirectTo: o10, ...s10 } = t10 instanceof FormData ? Object.fromEntries(t10) : t10, l2 = o10?.toString() ?? i10.get("Referer") ?? "/", c2 = sZ("signin", i10.get("x-forwarded-proto"), i10, process.env, n10);
        if (!e10) return c2.searchParams.append("callbackUrl", l2), a10 && lm(c2.toString()), c2.toString();
        let u2 = `${c2}/${e10}?${new URLSearchParams(r10)}`, d2 = {};
        for (let t11 of n10.providers) {
          let { options: r11, ...n11 } = "function" == typeof t11 ? t11() : t11, i11 = r11?.id ?? n11.id;
          if (i11 === e10) {
            d2 = { id: i11, type: r11?.type ?? n11.type };
            break;
          }
        }
        if (!d2.id) {
          let e11 = `${c2}?${new URLSearchParams({ callbackUrl: l2 })}`;
          return a10 && lm(e11), e11;
        }
        "credentials" === d2.type && (u2 = u2.replace("signin", "callback")), i10.set("Content-Type", "application/x-www-form-urlencoded");
        let p2 = new Request(u2, { method: "POST", headers: i10, body: new URLSearchParams({ ...s10, callbackUrl: l2 }) }), h2 = await s0(p2, { ...n10, raw: ix, skipCSRFCheck: iS }), f2 = await lr();
        for (let e11 of h2?.cookies ?? []) f2.set(e11.name, e11.value, e11.options);
        let g2 = (h2 instanceof Response ? h2.headers.get("Location") : h2.redirect) ?? u2;
        return a10 ? lm(g2) : g2;
      }
      async function lb(e10, t10) {
        let r10 = new Headers(await la());
        r10.set("Content-Type", "application/x-www-form-urlencoded");
        let n10 = sZ("signout", r10.get("x-forwarded-proto"), r10, process.env, t10), i10 = new URLSearchParams({ callbackUrl: e10?.redirectTo ?? r10.get("Referer") ?? "/" }), a10 = new Request(n10, { method: "POST", headers: r10, body: i10 }), o10 = await s0(a10, { ...t10, raw: ix, skipCSRFCheck: iS }), s10 = await lr();
        for (let e11 of o10?.cookies ?? []) s10.set(e11.name, e11.value, e11.options);
        return e10?.redirect ?? true ? lm(o10.redirect) : o10;
      }
      async function lw(e10, t10) {
        let r10 = new Headers(await la());
        r10.set("Content-Type", "application/json");
        let n10 = new Request(sZ("session", r10.get("x-forwarded-proto"), r10, process.env, t10), { method: "POST", headers: r10, body: JSON.stringify({ data: e10 }) }), i10 = await s0(n10, { ...t10, raw: ix, skipCSRFCheck: iS }), a10 = await lr();
        for (let e11 of i10?.cookies ?? []) a10.set(e11.name, e11.value, e11.options);
        return i10.body;
      }
      e.r(82748).unstable_rethrow;
      let { auth: lv } = function(e10) {
        if ("function" == typeof e10) {
          let t11 = async (t12) => {
            let r10 = await e10(t12);
            return s4(r10), s0(s3(t12), r10);
          };
          return { handlers: { GET: t11, POST: t11 }, auth: lu(e10, (e11) => s4(e11)), signIn: async (t12, r10, n10) => {
            let i10 = await e10(void 0);
            return s4(i10), ly(t12, r10, n10, i10);
          }, signOut: async (t12) => {
            let r10 = await e10(void 0);
            return s4(r10), lb(t12, r10);
          }, unstable_update: async (t12) => {
            let r10 = await e10(void 0);
            return s4(r10), lw(t12, r10);
          } };
        }
        s4(e10);
        let t10 = (t11) => s0(s3(t11), e10);
        return { handlers: { GET: t10, POST: t10 }, auth: lu(e10), signIn: (t11, r10, n10) => ly(t11, r10, n10, e10), signOut: (t11) => lb(t11, e10), unstable_update: (t11) => lw(t11, e10) };
      }({ session: { strategy: "jwt" }, pages: { signIn: "/login", error: "/login" }, providers: [], callbacks: { jwt: async ({ token: e10, user: t10 }) => (t10 && (e10.id = t10.id, e10.role = t10.role || "user"), e10), session: async ({ session: e10, token: t10 }) => (e10.user && (e10.user.id = t10.id, e10.user.role = t10.role), e10) } }), l_ = lv((e10) => {
        let t10 = !!e10.auth, { nextUrl: r10 } = e10;
        if ("/login" === r10.pathname || "/register" === r10.pathname) return t10 ? Response.redirect(new URL("/", r10)) : void 0;
        if (!t10) {
          let e11 = r10.pathname;
          r10.search && (e11 += r10.search);
          let t11 = encodeURIComponent(e11);
          return Response.redirect(new URL(`/login?callbackUrl=${t11}`, r10));
        }
      });
      e.s(["config", 0, { matcher: ["/wallet/:path*", "/favorites/:path*", "/login", "/register"] }, "default", 0, l_], 99446);
      let lE = { ...e.i(99446) }, lS = "/middleware", lx = lE.middleware || lE.default;
      if ("function" != typeof lx) throw new class extends Error {
        constructor(e10) {
          super(e10), this.stack = "";
        }
      }(`The Middleware file "${lS}" must export a function named \`middleware\` or a default function.`);
      let lk = (e10) => ts({ ...e10, IncrementalCache: tY, incrementalCacheHandler: null, page: lS, handler: async (...e11) => {
        try {
          return await lx(...e11);
        } catch (i10) {
          let t10 = e11[0], r10 = new URL(t10.url), n10 = r10.pathname + r10.search;
          throw await p(i10, { path: n10, method: t10.method, headers: Object.fromEntries(t10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/proxy", routeType: "proxy", revalidateReason: void 0 }), i10;
        }
      } });
      async function lT(e10, t10) {
        let r10 = await lk({ request: { url: e10.url, method: e10.method, headers: T(e10.headers), nextConfig: { basePath: "", i18n: "", trailingSlash: false, experimental: { cacheLife: { default: { stale: 300, revalidate: 900, expire: 4294967294 }, seconds: { stale: 30, revalidate: 1, expire: 60 }, minutes: { stale: 300, revalidate: 60, expire: 3600 }, hours: { stale: 300, revalidate: 3600, expire: 86400 }, days: { stale: 300, revalidate: 86400, expire: 604800 }, weeks: { stale: 300, revalidate: 604800, expire: 2592e3 }, max: { stale: 300, revalidate: 2592e3, expire: 31536e3 } }, authInterrupts: false, clientParamParsingOrigins: [] } }, page: { name: lS }, body: "GET" !== e10.method && "HEAD" !== e10.method ? e10.body ?? void 0 : void 0, waitUntil: t10.waitUntil, requestMeta: t10.requestMeta, signal: t10.signal || new AbortController().signal } });
        return null == t10.waitUntil || t10.waitUntil.call(t10, r10.waitUntil), r10.response;
      }
      e.s(["default", 0, lk, "handler", 0, lT], 42738);
    }]);
  }
});

// .next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0pbt_ut.js
var require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_0pbt_ut = __commonJS({
  ".next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0pbt_ut.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0pbt_ut.js", { otherChunks: ["chunks/[root-of-the-server]__0fq~heb._.js", "chunks/node_modules_0e~bjuu._.js"], runtimeModuleIds: [38022] }]), (() => {
      let e;
      if (!Array.isArray(globalThis.TURBOPACK)) return;
      let t = ["NEXT_DEPLOYMENT_ID", "NEXT_CLIENT_ASSET_SUFFIX"];
      var r, n = ((r = n || {})[r.Runtime = 0] = "Runtime", r[r.Parent = 1] = "Parent", r[r.Update = 2] = "Update", r);
      let o = /* @__PURE__ */ new WeakMap();
      function u(e2, t2) {
        this.m = e2, this.e = t2;
      }
      let l = u.prototype, i = Object.prototype.hasOwnProperty, a = "u" > typeof Symbol && Symbol.toStringTag;
      function s(e2, t2, r2) {
        i.call(e2, t2) || Object.defineProperty(e2, t2, r2);
      }
      function c(e2, t2) {
        let r2 = e2[t2];
        return r2 || (r2 = f(t2), e2[t2] = r2), r2;
      }
      function f(e2) {
        return { exports: {}, error: void 0, id: e2, namespaceObject: void 0 };
      }
      function h(e2, t2) {
        s(e2, "__esModule", { value: true }), a && s(e2, a, { value: "Module" });
        let r2 = 0;
        for (; r2 < t2.length; ) {
          let n2 = t2[r2++], o2 = t2[r2++];
          if ("number" == typeof o2) if (0 === o2) s(e2, n2, { value: t2[r2++], enumerable: true, writable: false });
          else throw Error(`unexpected tag: ${o2}`);
          else "function" == typeof t2[r2] ? s(e2, n2, { get: o2, set: t2[r2++], enumerable: true }) : s(e2, n2, { get: o2, enumerable: true });
        }
        Object.seal(e2);
      }
      function d(e2, t2) {
        (null != t2 ? c(this.c, t2) : this.m).exports = e2;
      }
      l.s = function(e2, t2) {
        let r2, n2;
        null != t2 ? n2 = (r2 = c(this.c, t2)).exports : (r2 = this.m, n2 = this.e), r2.namespaceObject = n2, h(n2, e2);
      }, l.j = function(e2, t2) {
        var r2, n2;
        let u2, l2, a2;
        null != t2 ? l2 = (u2 = c(this.c, t2)).exports : (u2 = this.m, l2 = this.e);
        let s2 = (r2 = u2, n2 = l2, (a2 = o.get(r2)) || (o.set(r2, a2 = []), r2.exports = r2.namespaceObject = new Proxy(n2, { get(e3, t3) {
          if (i.call(e3, t3) || "default" === t3 || "__esModule" === t3) return Reflect.get(e3, t3);
          for (let e4 of a2) {
            let r3 = Reflect.get(e4, t3);
            if (void 0 !== r3) return r3;
          }
        }, ownKeys(e3) {
          let t3 = Reflect.ownKeys(e3);
          for (let e4 of a2) for (let r3 of Reflect.ownKeys(e4)) "default" === r3 || t3.includes(r3) || t3.push(r3);
          return t3;
        } })), a2);
        "object" == typeof e2 && null !== e2 && s2.push(e2);
      }, l.v = d, l.n = function(e2, t2) {
        let r2;
        (r2 = null != t2 ? c(this.c, t2) : this.m).exports = r2.namespaceObject = e2;
      };
      let p = Object.getPrototypeOf ? (e2) => Object.getPrototypeOf(e2) : (e2) => e2.__proto__, m = [null, p({}), p([]), p(p)];
      function b(e2, t2, r2) {
        let n2 = [], o2 = -1;
        for (let t3 = e2; ("object" == typeof t3 || "function" == typeof t3) && !m.includes(t3); t3 = p(t3)) for (let r3 of Object.getOwnPropertyNames(t3)) n2.push(r3, /* @__PURE__ */ function(e3, t4) {
          return () => e3[t4];
        }(e2, r3)), -1 === o2 && "default" === r3 && (o2 = n2.length - 1);
        return r2 && o2 >= 0 || (o2 >= 0 ? n2.splice(o2, 1, 0, e2) : n2.push("default", 0, e2)), h(t2, n2), t2;
      }
      function y(e2) {
        return "function" == typeof e2 ? function(...t2) {
          return e2.apply(this, t2);
        } : /* @__PURE__ */ Object.create(null);
      }
      function g(e2) {
        let t2 = K(e2, this.m);
        if (t2.namespaceObject) return t2.namespaceObject;
        let r2 = t2.exports;
        return t2.namespaceObject = b(r2, y(r2), r2 && r2.__esModule);
      }
      function w(e2) {
        let t2 = e2.indexOf("#");
        -1 !== t2 && (e2 = e2.substring(0, t2));
        let r2 = e2.indexOf("?");
        return -1 !== r2 && (e2 = e2.substring(0, r2)), e2;
      }
      function O(e2) {
        return "string" == typeof e2 ? e2 : e2.path;
      }
      function _() {
        let e2, t2;
        return { promise: new Promise((r2, n2) => {
          t2 = n2, e2 = r2;
        }), resolve: e2, reject: t2 };
      }
      l.i = g, l.A = function(e2) {
        return this.r(e2)(g.bind(this));
      }, l.t = "function" == typeof __require ? __require : function() {
        throw Error("Unexpected use of runtime require");
      }, l.r = function(e2) {
        return K(e2, this.m).exports;
      }, l.f = function(e2) {
        function t2(t3) {
          if (t3 = w(t3), i.call(e2, t3)) return e2[t3].module();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }
        return t2.keys = () => Object.keys(e2), t2.resolve = (t3) => {
          if (t3 = w(t3), i.call(e2, t3)) return e2[t3].id();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }, t2.import = async (e3) => await t2(e3), t2;
      };
      let k = Symbol("turbopack queues"), j = Symbol("turbopack exports"), C = Symbol("turbopack error");
      function P(e2) {
        e2 && 1 !== e2.status && (e2.status = 1, e2.forEach((e3) => e3.queueCount--), e2.forEach((e3) => e3.queueCount-- ? e3.queueCount++ : e3()));
      }
      l.a = function(e2, t2) {
        let r2 = this.m, n2 = t2 ? Object.assign([], { status: -1 }) : void 0, o2 = /* @__PURE__ */ new Set(), { resolve: u2, reject: l2, promise: i2 } = _(), a2 = Object.assign(i2, { [j]: r2.exports, [k]: (e3) => {
          n2 && e3(n2), o2.forEach(e3), a2.catch(() => {
          });
        } }), s2 = { get: () => a2, set(e3) {
          e3 !== a2 && (a2[j] = e3);
        } };
        Object.defineProperty(r2, "exports", s2), Object.defineProperty(r2, "namespaceObject", s2), e2(function(e3) {
          let t3 = e3.map((e4) => {
            if (null !== e4 && "object" == typeof e4) {
              if (k in e4) return e4;
              if (null != e4 && "object" == typeof e4 && "then" in e4 && "function" == typeof e4.then) {
                let t4 = Object.assign([], { status: 0 }), r4 = { [j]: {}, [k]: (e5) => e5(t4) };
                return e4.then((e5) => {
                  r4[j] = e5, P(t4);
                }, (e5) => {
                  r4[C] = e5, P(t4);
                }), r4;
              }
            }
            return { [j]: e4, [k]: () => {
            } };
          }), r3 = () => t3.map((e4) => {
            if (e4[C]) throw e4[C];
            return e4[j];
          }), { promise: u3, resolve: l3 } = _(), i3 = Object.assign(() => l3(r3), { queueCount: 0 });
          function a3(e4) {
            e4 !== n2 && !o2.has(e4) && (o2.add(e4), e4 && 0 === e4.status && (i3.queueCount++, e4.push(i3)));
          }
          return t3.map((e4) => e4[k](a3)), i3.queueCount ? u3 : r3();
        }, function(e3) {
          e3 ? l2(a2[C] = e3) : u2(a2[j]), P(n2);
        }), n2 && -1 === n2.status && (n2.status = 0);
      };
      let v = function(e2) {
        let t2 = new URL(e2, "x:/"), r2 = {};
        for (let e3 in t2) r2[e3] = t2[e3];
        for (let t3 in r2.href = e2, r2.pathname = e2.replace(/[?#].*/, ""), r2.origin = r2.protocol = "", r2.toString = r2.toJSON = (...t4) => e2, r2) Object.defineProperty(this, t3, { enumerable: true, configurable: true, value: r2[t3] });
      };
      function E(e2, t2) {
        throw Error(`Invariant: ${t2(e2)}`);
      }
      v.prototype = URL.prototype, l.U = v, l.z = function(e2) {
        throw Error("dynamic usage of require is not supported");
      }, l.g = globalThis;
      let U = u.prototype, R = /* @__PURE__ */ new Map();
      l.M = R;
      let M = /* @__PURE__ */ new Map(), $ = /* @__PURE__ */ new Map();
      async function x(e2, t2, r2) {
        let n2;
        if ("string" == typeof r2) return q(e2, t2, A(r2));
        let o2 = r2.included || [], u2 = o2.map((e3) => !!R.has(e3) || M.get(e3));
        if (u2.length > 0 && u2.every((e3) => e3)) return void await Promise.all(u2);
        let l2 = r2.moduleChunks || [], i2 = l2.map((e3) => $.get(e3)).filter((e3) => e3);
        if (i2.length > 0) {
          if (i2.length === l2.length) return void await Promise.all(i2);
          let r3 = /* @__PURE__ */ new Set();
          for (let e3 of l2) $.has(e3) || r3.add(e3);
          for (let n3 of r3) {
            let r4 = q(e2, t2, A(n3));
            $.set(n3, r4), i2.push(r4);
          }
          n2 = Promise.all(i2);
        } else {
          for (let o3 of (n2 = q(e2, t2, A(r2.path)), l2)) $.has(o3) || $.set(o3, n2);
        }
        for (let e3 of o2) M.has(e3) || M.set(e3, n2);
        await n2;
      }
      U.l = function(e2) {
        return x(n.Parent, this.m.id, e2);
      };
      let T = Promise.resolve(void 0), S = /* @__PURE__ */ new WeakMap();
      function q(t2, r2, o2) {
        let u2 = e.loadChunkCached(t2, o2), l2 = S.get(u2);
        if (void 0 === l2) {
          let e2 = S.set.bind(S, u2, T);
          l2 = u2.then(e2).catch((e3) => {
            let u3;
            switch (t2) {
              case n.Runtime:
                u3 = `as a runtime dependency of chunk ${r2}`;
                break;
              case n.Parent:
                u3 = `from module ${r2}`;
                break;
              case n.Update:
                u3 = "from an HMR update";
                break;
              default:
                E(t2, (e4) => `Unknown source type: ${e4}`);
            }
            let l3 = Error(`Failed to load chunk ${o2} ${u3}${e3 ? `: ${e3}` : ""}`, e3 ? { cause: e3 } : void 0);
            throw l3.name = "ChunkLoadError", l3;
          }), S.set(u2, l2);
        }
        return l2;
      }
      function A(e2) {
        return `${e2.split("/").map((e3) => encodeURIComponent(e3)).join("/")}`;
      }
      U.L = function(e2) {
        return q(n.Parent, this.m.id, e2);
      }, U.R = function(e2) {
        let t2 = this.r(e2);
        return t2?.default ?? t2;
      }, U.P = function(e2) {
        return `/ROOT/${e2 ?? ""}`;
      }, U.q = function(e2, t2) {
        d.call(this, `${e2}`, t2);
      }, U.b = function(e2, r2, n2, o2) {
        let u2 = "SharedWorker" === e2.name, l2 = [n2.map((e3) => A(e3)).reverse(), ""];
        for (let e3 of t) l2.push(globalThis[e3]);
        let i2 = new URL(A(r2), location.origin), a2 = JSON.stringify(l2);
        return u2 ? i2.searchParams.set("params", a2) : i2.hash = "#params=" + encodeURIComponent(a2), new e2(i2, o2 ? { ...o2, type: void 0 } : void 0);
      };
      let N = /\.js(?:\?[^#]*)?(?:#.*)?$/;
      l.w = function(t2, r2, o2) {
        return e.loadWebAssembly(n.Parent, this.m.id, t2, r2, o2);
      }, l.u = function(t2, r2) {
        return e.loadWebAssemblyModule(n.Parent, this.m.id, t2, r2);
      };
      let I = {};
      l.c = I;
      let K = (e2, t2) => {
        let r2 = I[e2];
        if (r2) {
          if (r2.error) throw r2.error;
          return r2;
        }
        return L(e2, n.Parent, t2.id);
      };
      function L(e2, t2, r2) {
        let n2 = R.get(e2);
        if ("function" != typeof n2) throw Error(function(e3, t3, r3) {
          let n3;
          switch (t3) {
            case 0:
              n3 = `as a runtime entry of chunk ${r3}`;
              break;
            case 1:
              n3 = `because it was required from module ${r3}`;
              break;
            case 2:
              n3 = "because of an HMR update";
              break;
            default:
              E(t3, (e4) => `Unknown source type: ${e4}`);
          }
          return `Module ${e3} was instantiated ${n3}, but the module factory is not available.`;
        }(e2, t2, r2));
        let o2 = f(e2), l2 = o2.exports;
        I[e2] = o2;
        let i2 = new u(o2, l2);
        try {
          n2(i2, o2, l2);
        } catch (e3) {
          throw o2.error = e3, e3;
        }
        return o2.namespaceObject && o2.exports !== o2.namespaceObject && b(o2.exports, o2.namespaceObject), o2;
      }
      function W(t2) {
        let r2, n2 = function(e2) {
          if ("string" == typeof e2) return e2;
          if (e2) return { src: e2.getAttribute("src") };
          if ("u" > typeof TURBOPACK_NEXT_CHUNK_URLS) return { src: TURBOPACK_NEXT_CHUNK_URLS.pop() };
          throw Error("chunk path empty but not in a worker");
        }(t2[0]);
        return 2 === t2.length ? r2 = t2[1] : (r2 = void 0, !function(e2, t3) {
          let r3 = 1;
          for (; r3 < e2.length; ) {
            let n3, o2 = r3 + 1;
            for (; o2 < e2.length && "function" != typeof e2[o2]; ) o2++;
            if (o2 === e2.length) throw Error("malformed chunk format, expected a factory function");
            let u2 = e2[o2];
            for (let u3 = r3; u3 < o2; u3++) {
              let r4 = e2[u3], o3 = t3.get(r4);
              if (o3) {
                n3 = o3;
                break;
              }
            }
            let l2 = n3 ?? u2, i2 = false;
            for (let n4 = r3; n4 < o2; n4++) {
              let r4 = e2[n4];
              t3.has(r4) || (i2 || (l2 === u2 && Object.defineProperty(u2, "name", { value: "module evaluation" }), i2 = true), t3.set(r4, l2));
            }
            r3 = o2 + 1;
          }
        }(t2, R)), e.registerChunk(n2, r2);
      }
      function B(e2, t2, r2 = false) {
        let n2;
        try {
          n2 = t2();
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return !r2 || n2.__esModule ? n2 : b(n2, y(n2), true);
      }
      l.y = async function(e2) {
        let t2;
        try {
          t2 = await import(e2);
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return t2 && t2.__esModule && t2.default && "default" in t2.default ? b(t2.default, y(t2), true) : t2;
      }, B.resolve = (e2, t2) => __require.resolve(e2, t2), l.x = B, e = { registerChunk(e2, t2) {
        let r2 = function(e3) {
          if ("string" == typeof e3) return e3;
          let t3 = decodeURIComponent(e3.src.replace(/[?#].*$/, ""));
          return t3.startsWith("") ? t3.slice(0) : t3;
        }(e2);
        F.add(r2), function(e3) {
          let t3 = D.get(e3);
          if (null != t3) {
            for (let r3 of t3) r3.requiredChunks.delete(e3), 0 === r3.requiredChunks.size && X(r3.runtimeModuleIds, r3.chunkPath);
            D.delete(e3);
          }
        }(r2), null != t2 && (0 === t2.otherChunks.length ? X(t2.runtimeModuleIds, r2) : function(e3, t3, r3) {
          let n2 = /* @__PURE__ */ new Set(), o2 = { runtimeModuleIds: r3, chunkPath: e3, requiredChunks: n2 };
          for (let e4 of t3) {
            let t4 = O(e4);
            if (F.has(t4)) continue;
            n2.add(t4);
            let r4 = D.get(t4);
            null == r4 && (r4 = /* @__PURE__ */ new Set(), D.set(t4, r4)), r4.add(o2);
          }
          0 === o2.requiredChunks.size && X(o2.runtimeModuleIds, o2.chunkPath);
        }(r2, t2.otherChunks.filter((e3) => {
          var t3;
          return t3 = O(e3), N.test(t3);
        }), t2.runtimeModuleIds));
      }, loadChunkCached(e2, t2) {
        throw Error("chunk loading is not supported");
      }, async loadWebAssembly(e2, t2, r2, n2, o2) {
        let u2 = await H(r2, n2);
        return await WebAssembly.instantiate(u2, o2);
      }, loadWebAssemblyModule: async (e2, t2, r2, n2) => H(r2, n2) };
      let F = /* @__PURE__ */ new Set(), D = /* @__PURE__ */ new Map();
      function X(e2, t2) {
        for (let r2 of e2) !function(e3, t3) {
          let r3 = I[t3];
          if (r3) {
            if (r3.error) throw r3.error;
            return;
          }
          L(t3, n.Runtime, e3);
        }(t2, r2);
      }
      async function H(e2, t2) {
        let r2;
        try {
          r2 = t2();
        } catch (e3) {
        }
        if (!r2) throw Error(`dynamically loading WebAssembly is not supported in this runtime as global was not injected for chunk '${e2}'`);
        return r2;
      }
      let z = globalThis.TURBOPACK;
      globalThis.TURBOPACK = { push: W }, z.forEach(W);
    })();
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/wallet(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/favorites(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/login(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/register(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$"] }];
    require_root_of_the_server_0fq_heb();
    require_node_modules_0e_bjuu();
    require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_0pbt_ut();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/requestCache.js
var RequestCache = class {
  _caches = /* @__PURE__ */ new Map();
  /**
   * Returns the Map registered under `key`.
   * If no Map exists yet for that key, a new empty Map is created, stored, and returned.
   * Repeated calls with the same key always return the **same** Map instance.
   */
  getOrCreate(key) {
    let cache = this._caches.get(key);
    if (!cache) {
      cache = /* @__PURE__ */ new Map();
      this._caches.set(key, cache);
    }
    return cache;
  }
};

// node_modules/@opennextjs/aws/dist/utils/promise.js
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set(),
    requestCache: new RequestCache()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "typescript": { "ignoreBuildErrors": false }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 14400, "formats": ["image/webp"], "maximumRedirects": 3, "maximumResponseBody": 5e7, "dangerouslyAllowLocalIP": false, "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "localPatterns": [{ "pathname": "**", "search": "" }], "remotePatterns": [], "qualities": [75], "unoptimized": false, "customCacheHandler": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": { "serverFunctions": true, "browserToTerminal": "warn" }, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/home/jagroop/PERSONAL/NEXT JS ADULT/velvet-call", "cacheComponents": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 31536e3 } }, "cacheHandlers": {}, "experimental": { "appNewScrollHandler": false, "useSkewCookie": false, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "cachedNavigations": false, "partialFallbacks": false, "dynamicOnHover": false, "varyParams": false, "prefetchInlining": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "proxyPrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 11, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptSkipMetadata": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "strictRouteTypes": false, "viewTransition": false, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": false, "staleTimes": { "dynamic": 0, "static": 300 }, "reactDebugChannel": true, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "transitionIndicator": false, "gestureTransition": false, "inlineCss": false, "useCache": false, "globalNotFound": false, "browserDebugInfoInTerminal": "warn", "lockDistDir": true, "proxyClientMaxBodySize": 10485760, "hideLogsAfterAbort": false, "mcpServer": true, "turbopackFileSystemCacheForDev": true, "turbopackFileSystemCacheForBuild": false, "turbopackInferModuleSideEffects": true, "turbopackPluginRuntimeStrategy": "childProcesses", "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts", "turbopack": { "root": "/home/jagroop/PERSONAL/NEXT JS ADULT/velvet-call" }, "distDirRoot": ".next" };
var BuildId = "PRA4ChWL485mspWJnDb0z";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "priority": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_global-error", "regex": "^/_global\\-error(?:/)?$", "routeKeys": {}, "namedRegex": "^/_global\\-error(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/api/auth/signup", "regex": "^/api/auth/signup(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/signup(?:/)?$" }, { "page": "/api/categories", "regex": "^/api/categories(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/categories(?:/)?$" }, { "page": "/api/favorites", "regex": "^/api/favorites(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/favorites(?:/)?$" }, { "page": "/api/girls", "regex": "^/api/girls(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/girls(?:/)?$" }, { "page": "/api/girls/online", "regex": "^/api/girls/online(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/girls/online(?:/)?$" }, { "page": "/api/girls/trending", "regex": "^/api/girls/trending(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/girls/trending(?:/)?$" }, { "page": "/api/healthz", "regex": "^/api/healthz(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/healthz(?:/)?$" }, { "page": "/api/photos", "regex": "^/api/photos(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/photos(?:/)?$" }, { "page": "/api/stats", "regex": "^/api/stats(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/stats(?:/)?$" }, { "page": "/api/tips", "regex": "^/api/tips(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/tips(?:/)?$" }, { "page": "/api/videos", "regex": "^/api/videos(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/videos(?:/)?$" }, { "page": "/api/wallet", "regex": "^/api/wallet(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/wallet(?:/)?$" }, { "page": "/api/wallet/topup", "regex": "^/api/wallet/topup(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/wallet/topup(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/favorites", "regex": "^/favorites(?:/)?$", "routeKeys": {}, "namedRegex": "^/favorites(?:/)?$" }, { "page": "/girls", "regex": "^/girls(?:/)?$", "routeKeys": {}, "namedRegex": "^/girls(?:/)?$" }, { "page": "/live", "regex": "^/live(?:/)?$", "routeKeys": {}, "namedRegex": "^/live(?:/)?$" }, { "page": "/login", "regex": "^/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/login(?:/)?$" }, { "page": "/photos", "regex": "^/photos(?:/)?$", "routeKeys": {}, "namedRegex": "^/photos(?:/)?$" }, { "page": "/register", "regex": "^/register(?:/)?$", "routeKeys": {}, "namedRegex": "^/register(?:/)?$" }, { "page": "/videos", "regex": "^/videos(?:/)?$", "routeKeys": {}, "namedRegex": "^/videos(?:/)?$" }, { "page": "/wallet", "regex": "^/wallet(?:/)?$", "routeKeys": {}, "namedRegex": "^/wallet(?:/)?$" }], "dynamic": [{ "page": "/api/auth/[...nextauth]", "regex": "^/api/auth/(.+?)(?:/)?$", "routeKeys": { "nxtPnextauth": "nxtPnextauth" }, "namedRegex": "^/api/auth/(?<nxtPnextauth>.+?)(?:/)?$" }, { "page": "/api/chat/[girlId]", "regex": "^/api/chat/([^/]+?)(?:/)?$", "routeKeys": { "nxtPgirlId": "nxtPgirlId" }, "namedRegex": "^/api/chat/(?<nxtPgirlId>[^/]+?)(?:/)?$" }, { "page": "/api/favorites/[girlId]", "regex": "^/api/favorites/([^/]+?)(?:/)?$", "routeKeys": { "nxtPgirlId": "nxtPgirlId" }, "namedRegex": "^/api/favorites/(?<nxtPgirlId>[^/]+?)(?:/)?$" }, { "page": "/api/girls/[id]", "regex": "^/api/girls/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/girls/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/api/girls/[id]/photos", "regex": "^/api/girls/([^/]+?)/photos(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/girls/(?<nxtPid>[^/]+?)/photos(?:/)?$" }, { "page": "/api/girls/[id]/videos", "regex": "^/api/girls/([^/]+?)/videos(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/girls/(?<nxtPid>[^/]+?)/videos(?:/)?$" }, { "page": "/girls/[id]", "regex": "^/girls/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/girls/(?<nxtPid>[^/]+?)(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/", "dataRoute": "/index.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_global-error": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_global-error", "dataRoute": "/_global-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_not-found": { "initialStatus": 404, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_not-found", "dataRoute": "/_not-found.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/favorites": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favorites", "dataRoute": "/favorites.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/girls": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/girls", "dataRoute": "/girls.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/live": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/live", "dataRoute": "/live.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/login": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/login", "dataRoute": "/login.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/photos": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/photos", "dataRoute": "/photos.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/register": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/register", "dataRoute": "/register.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/videos": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/videos", "dataRoute": "/videos.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/wallet": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/wallet", "dataRoute": "/wallet.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "8264538c1d0379b2f1a34ebffe667e2b", "previewModeSigningKey": "b95d4b6fe50343867ccc3951d901cc62cc5426aebf09456f45d84f770223dd30", "previewModeEncryptionKey": "73895f9a64ea39848b2b3922a11ff70caebe539564bddd0530cb23f568b9e9be" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge/chunks/[root-of-the-server]__0fq~heb._.js", "server/edge/chunks/node_modules_0e~bjuu._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0pbt_ut.js"], "name": "middleware", "page": "/", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0pbt_ut.js", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/wallet(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/wallet/:path*" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/favorites(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/favorites/:path*" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/login(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/login" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/register(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/register" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "PRA4ChWL485mspWJnDb0z", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "SgLch4hWNYcON1llNPc7xKQ3JEThAtJQ+AHo+rZtbec=", "__NEXT_PREVIEW_MODE_ID": "8264538c1d0379b2f1a34ebffe667e2b", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "73895f9a64ea39848b2b3922a11ff70caebe539564bddd0530cb23f568b9e9be", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "b95d4b6fe50343867ccc3951d901cc62cc5426aebf09456f45d84f770223dd30" } } }, "sortedMiddleware": ["/"], "functions": { "/api/auth/[...nextauth]/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/auth/[...nextauth]/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_auth_[___nextauth]_route_actions_0fm8nbe.js", "server/edge/chunks/[root-of-the-server]__0-s8u~v._.js", "server/edge/chunks/_00lffzm._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0u6ti4r.js"], "name": "app/api/auth/[...nextauth]/route", "page": "/api/auth/[...nextauth]/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0u6ti4r.js", "matchers": [{ "regexp": "^/api/auth/(?P<nxtPnextauth>.+?)(?:/)?$", "originalSource": "/api/auth/[...nextauth]" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "PRA4ChWL485mspWJnDb0z", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "SgLch4hWNYcON1llNPc7xKQ3JEThAtJQ+AHo+rZtbec=", "__NEXT_PREVIEW_MODE_ID": "8264538c1d0379b2f1a34ebffe667e2b", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "73895f9a64ea39848b2b3922a11ff70caebe539564bddd0530cb23f568b9e9be", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "b95d4b6fe50343867ccc3951d901cc62cc5426aebf09456f45d84f770223dd30" } } } };
var AppPathRoutesManifest = { "/_global-error/page": "/_global-error", "/_not-found/page": "/_not-found", "/api/auth/[...nextauth]/route": "/api/auth/[...nextauth]", "/api/auth/signup/route": "/api/auth/signup", "/api/categories/route": "/api/categories", "/api/chat/[girlId]/route": "/api/chat/[girlId]", "/api/favorites/[girlId]/route": "/api/favorites/[girlId]", "/api/favorites/route": "/api/favorites", "/api/girls/[id]/photos/route": "/api/girls/[id]/photos", "/api/girls/[id]/route": "/api/girls/[id]", "/api/girls/[id]/videos/route": "/api/girls/[id]/videos", "/api/girls/online/route": "/api/girls/online", "/api/girls/route": "/api/girls", "/api/girls/trending/route": "/api/girls/trending", "/api/healthz/route": "/api/healthz", "/api/photos/route": "/api/photos", "/api/stats/route": "/api/stats", "/api/tips/route": "/api/tips", "/api/videos/route": "/api/videos", "/api/wallet/route": "/api/wallet", "/api/wallet/topup/route": "/api/wallet/topup", "/favicon.ico/route": "/favicon.ico", "/favorites/page": "/favorites", "/girls/[id]/page": "/girls/[id]", "/girls/page": "/girls", "/live/page": "/live", "/login/page": "/login", "/page": "/", "/photos/page": "/photos", "/register/page": "/register", "/videos/page": "/videos", "/wallet/page": "/wallet" };
var FunctionsConfigManifest = { "version": 1, "functions": { "/api/auth/[...nextauth]": {} } };
var PagesManifest = { "/404": "pages/404.html", "/500": "pages/500.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.OPEN_NEXT_BUILD_ID = NextConfig.deploymentId ?? BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream3 } from "node:stream/web";

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    const nextUrl = constructNextUrl(internalEvent.url, `/${detectedLocale}${NextConfig.trailingSlash ? "/" : ""}`);
    const queryString = convertToQueryString(internalEvent.query);
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: `${nextUrl}${queryString}`
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream3({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location2, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location2)) {
    return location2;
  }
  const locationURL = new URL(location2);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/semver.js
function compareSemver(v1, operator, v2) {
  let versionDiff = 0;
  if (v1 === "latest") {
    versionDiff = 1;
  } else {
    if (/^[^\d]/.test(v1)) {
      v1 = v1.substring(1);
    }
    if (/^[^\d]/.test(v2)) {
      v2 = v2.substring(1);
    }
    const [major1, minor1 = 0, patch1 = 0] = v1.split(".").map(Number);
    const [major2, minor2 = 0, patch2 = 0] = v2.split(".").map(Number);
    if (Number.isNaN(major1) || Number.isNaN(major2)) {
      throw new Error("The major version is required.");
    }
    if (major1 !== major2) {
      versionDiff = major1 - major2;
    } else if (minor1 !== minor2) {
      versionDiff = minor1 - minor2;
    } else if (patch1 !== patch2) {
      versionDiff = patch1 - patch2;
    }
  }
  switch (operator) {
    case "=":
      return versionDiff === 0;
    case ">=":
      return versionDiff >= 0;
    case "<=":
      return versionDiff <= 0;
    case ">":
      return versionDiff > 0;
    case "<":
      return versionDiff < 0;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

// node_modules/@opennextjs/aws/dist/utils/cache.js
async function isStale(key, tags, lastModified) {
  if (!compareSemver(globalThis.nextVersion, ">=", "16.0.0")) {
    return false;
  }
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.isStale?.(tags, lastModified) ?? false;
  }
  return await globalThis.tagCache.isStale?.(key, lastModified) ?? false;
}
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
    delete value.meta?.headers?.["x-next-cache-tags"];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified, isStaleFromTagCache = false) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  const isSSG = finalRevalidate === CACHE_ONE_YEAR;
  const remainingTtl = Math.max(finalRevalidate - age, 1);
  const isStaleFromTime = !isSSG && remainingTtl === 1;
  const isStale2 = isStaleFromTime || isStaleFromTagCache;
  if (!isSSG || isStaleFromTagCache) {
    const sMaxAge = isStaleFromTagCache ? 1 : remainingTtl;
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate,
      isStaleFromTagCache
    });
    if (isStale2) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale2 ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  try {
    const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
    const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {}) && !NextConfig.experimental?.prefetchInlining;
    const body = isSegmentResponse ? cachedValue.segmentData[segmentHeader] : cachedValue.rsc;
    return {
      body,
      additionalHeaders: isSegmentResponse ? { [NEXT_PRERENDER_HEADER]: "1", [NEXT_POSTPONED_HEADER]: "2" } : {}
    };
  } catch (e) {
    error("Error while getting body for app router from cache:", e);
    return { body: cachedValue.rsc, additionalHeaders: {} };
  }
}
async function generateResult(event, localizedPath, cachedValue, lastModified, isStaleFromTagCache = false) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = event.headers.rsc === "1";
    if (isDataRequest) {
      const { body: appRouterBody, additionalHeaders: appHeaders } = getBodyForAppRouter(event, cachedValue);
      body = appRouterBody;
      additionalHeaders = appHeaders;
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified, isStaleFromTagCache);
  return {
    type: "core",
    // Sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    // Also set the status code to the rewriteStatusCode if defined
    // This can happen in handleMiddleware in routingHandler.
    // `NextResponse.rewrite(url, { status: xxx})
    // The rewrite status code should take precedence over the cached one
    statusCode: event.rewriteStatusCode ?? cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER,
      ...additionalHeaders
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath ?? "/") || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      const tags = getTagsFromValue(cachedData.value);
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const _isStale = cachedData.shouldBypassTagCache ? false : await isStale(localizedPath, tags, cachedData.lastModified ?? Date.now());
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified, _isStale);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: event.rewriteStatusCode ?? cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !(event.query.__nextDataReq === "1") && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
var NEXT_INTERNAL_HEADERS = [
  "x-middleware-rewrite",
  "x-middleware-redirect",
  "x-middleware-set-cookie",
  "x-middleware-skip",
  "x-middleware-override-headers",
  "x-middleware-next",
  "x-now-route-matches",
  "x-matched-path",
  "x-nextjs-data",
  "x-next-resume-state-length"
];
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      const lowerCaseKey = key.toLowerCase();
      if (lowerCaseKey.startsWith(INTERNAL_HEADER_PREFIX) || lowerCaseKey.startsWith(MIDDLEWARE_HEADER_PREFIX) || NEXT_INTERNAL_HEADERS.includes(lowerCaseKey)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
