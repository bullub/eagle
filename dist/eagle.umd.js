(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(global.Eagle = factory(global.$));
}(this, (function ($) { 'use strict';

	$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var runtime = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	!(function(global) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = module.exports;

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  runtime.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  runtime.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        if (delegate.iterator.return) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined;
	      }

	      return ContinueSentinel;
	    }
	  };
	})(
	  // In sloppy mode, unbound `this` refers to the global object, fallback to
	  // Function constructor if we're in global strict mode. That is sadly a form
	  // of indirect eval which violates Content Security Policy.
	  (function() { return this })() || Function("return this")()
	);
	});

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g = (function() { return this })() || Function("return this")();

	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;

	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;

	var runtimeModule = runtime;

	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  try {
	    delete g.regeneratorRuntime;
	  } catch(e) {
	    g.regeneratorRuntime = undefined;
	  }
	}

	var regenerator = runtimeModule;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	var asyncToGenerator = function (fn) {
	  return function () {
	    var gen = fn.apply(this, arguments);
	    return new Promise(function (resolve, reject) {
	      function step(key, arg) {
	        try {
	          var info = gen[key](arg);
	          var value = info.value;
	        } catch (error) {
	          reject(error);
	          return;
	        }

	        if (info.done) {
	          resolve(value);
	        } else {
	          return Promise.resolve(value).then(function (value) {
	            step("next", value);
	          }, function (err) {
	            step("throw", err);
	          });
	        }
	      }

	      return step("next");
	    });
	  };
	};

	var slice = Array.prototype.slice;

	//私有方法，绑定页面上，当前Eagle管辖区域中，有ID的元素到当前的Eagle实例
	function bindHasIdEl() {
	  var self = this,
	      hasIdEls = self.$root.find('*[id]');

	  hasIdEls.each(function (idx, elem) {
	    var $el = $(elem),
	        id = $el.attr('id');

	    self['$' + id.replace(/-(.)/g, function (str, $1) {
	      return $1.toUpperCase();
	    })] = $el;
	  });
	}

	/**
	 * 代码管理的根类
	 * @param rootElement
	 * @constructor
	 */
	function Eagle() {
	  var rootElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

	  var self = this,
	      $root = void 0,
	      events = self.events,
	      eventHandlers = self.eventHandlers,

	  //表达式中的第一个空格
	  _start = void 0,

	  //拿到表达式中的事件名
	  _event = void 0,

	  //拿到表达式中的选择器
	  _selector = void 0;

	  function proxy(handler) {
	    return function (event) {
	      try {
	        if (this.tagName.toUpperCase() !== 'INPUT') {
	          //不是INPUT调用关闭键盘的方法
	          Eagle.hideKeyBoard();
	        }
	      } catch (e) {
	        //ignore this
	      }
	      handler.call(self, event, $(this));
	    };
	  }

	  //初始化根节点
	  $root = self.$root = $(rootElement);
	  //处理声明式事件绑定
	  for (var expression in events) {
	    //表达式中的第一个空格
	    _start = expression.indexOf(' ');
	    //拿到表达式中的事件名
	    _event = expression.substring(0, _start);
	    //拿到表达式中的选择器
	    _selector = expression.slice(_start - expression.length + 1);

	    $root.delegate(_selector, _event, proxy(eventHandlers[events[expression]]));
	  }

	  bindHasIdEl.call(this);
	}

	Eagle.hideKeyBoard = function () {
	  document.activeElement.blur();
	};

	/**
	 * 实现继承
	 * @param subClassProto 子类的原型及构造函数
	 * @returns {Function} 子类的构造函数
	 */
	Eagle.extend = function extend(subClassProto) {
	  var ParentClass = this;
	  //每个子类都必须有自己的构造函数，且子类的构造函数中都必须调用父类的构造函数
	  if (!subClassProto || !subClassProto.hasOwnProperty('constructor') || typeof subClassProto.constructor !== 'function') {
	    throw new Error('No constructor find in sub class, please check your code!');
	  }
	  //拿到子类的构造函数
	  var SubClassConstructor = subClassProto.constructor;
	  //从子类原型链上删掉构造器字段
	  delete subClassProto.constructor;

	  var innerStructs = ['events', 'eventHandlers', 'responseHandlers'];
	  var localProto = '__proto__';

	  for (var i = 0, len = innerStructs.length; i < len; i++) {
	    if (!(innerStructs[i] in subClassProto)) {
	      subClassProto[innerStructs[i]] = {};
	    }
	  }

	  //格式化子类的原型链
	  for (var key in subClassProto) {

	    //如果说当前的key是一个内部结构依赖的对象，则设置当前的该对象继承原对象
	    if (~innerStructs.indexOf(key)) {
	      subClassProto[key][localProto] = ParentClass.prototype[key];
	    }

	    if (!subClassProto[key] || !subClassProto[key].value) {
	      subClassProto[key] = {
	        value: subClassProto[key],
	        enumerable: true,
	        writable: true,
	        configurable: true
	      };
	    }
	  }

	  //实现原型继承
	  SubClassConstructor.prototype = Object.create(ParentClass.prototype, subClassProto);

	  //  _Parent主要用于子类直接调用父类构造器，实现参数继承
	  // 子类不能通过任何方式去修改父类的构造器，父类的构造器在子类中也不可枚举
	  SubClassConstructor._Parent = function (self, _args) {
	    var args = slice.call(_args);
	    ParentClass.apply(self, args);
	  };

	  //子类的extend方法直接使用父类的
	  SubClassConstructor.extend = extend;

	  Object.defineProperties(SubClassConstructor.prototype, {
	    // 重写子类的原型构造器指向，方便调试查看类继承结构
	    constructor: {
	      value: SubClassConstructor,
	      configurable: false
	    },
	    //_super指向父类的原型链，子类不能通过任何方式去修改父类的原型链，父类的原型链在子类中也不可枚举
	    _super: {
	      value: ParentClass.prototype,
	      configurable: false
	    }
	  });

	  return SubClassConstructor;
	};

	//定义Eagle的共有默认属性和方法
	Eagle.prototype = {
	  constructor: Eagle,
	  events: {},
	  eventHandlers: {
	    //内置时间处理器，阻止冒泡
	    stopPropagation: function stopPropagation(e) {
	      e.stopPropagation();
	    },
	    //内置事件处理器，阻止默认行为
	    preventDefault: function preventDefault(e) {
	      e.preventDefault();
	    },
	    //内置事件处理器，阻止默认行为并阻止冒泡
	    stopAndPrevent: function stopAndPrevent(e) {
	      e.stopPropagation();
	      e.preventDefault();
	    }
	  },
	  responseHandlers: {}
	};

	var requestFilterChain = [];
	var responseFilterChain = [];

	//定义中止当前请求或响应的常量
	Eagle.ABORT = false;
	//定义请求和响应跳过后续过滤器的常量
	Eagle.SKIP_FILTERS = true;
	//定义正常继续执行后续过滤器的常量
	Eagle.CONTINUE = undefined;

	/**
	 * 给request组件添加请求过滤器
	 * @param {Function} filter 过滤器函数
	 *                          入参: {Object} 格式
	 *                          {
	 *                              //serviceName和apiName是只读属性，修改无效
	 *                              serviceName: {String} 服务名
	 *                              apiName: {String} 接口名
	 *                              //options中的内容可以修改(比如添加头，添加默认上送的数据，修改请求方式等等等等)
	 *                              options: {Object} 请求发送时的最后的参数
	 *                          }
	 *                          该函数返回值可选{Boolean|undefined}
	 *                          true: 中断整个过滤链;
	 *                          false: 中断整个过程(不发送请求)
	 *                          undefined: 继续执行下一个过滤器
	 */
	Eagle.addRequestFilter = function addPrevInterceptor(filter) {
	  requestFilterChain.push(filter);
	};

	/**
	 * 给request组件添加响应过滤器
	 * @param {Function} filter 过滤器函数
	 *                          入参: {Object} 格式
	 *                          {
	   *                              serviceName: {String} 服务名
	   *                              apiName: {String} 接口名
	   *                              options: {Object} 请求发送时的最后的参数
	   *                              xhr: {jq.XHR} 请求发送代理对象
	   *                              //下面这些参数是过滤器可以赋的传出参数，该参数会在请求响应处理器中使用
	   *                              resp: {*} 默认值 undefined
	   *                              status: {Number} 默认值 undefined
	   *                              headers: {Object} 默认值 undefined
	   *                          }
	 *                          该函数返回值可选{Boolean|undefined}
	 *                          true: 中断整个过滤链;
	 *                          false: 中断整个过程(不调用回调)
	 *                          undefined: 继续执行下一个过滤器
	 */
	Eagle.addResponseFilter = function (filter) {
	  responseFilterChain.push(filter);
	};

	/**
	 * 根据服务名和api名，以及运行时参数，获取请求的URL地址
	 * @param {String} serviceName  服务名
	 * @param {String} apiName  接口名
	 * @param {Object} options  请求参数
	 * @returns {String} 补充完参数后的URL
	 */
	Eagle.getURL = function getURL(serviceName, apiName, options) {

	  if (!global.CONFIG || !CONFIG.SERVICES || !CONFIG.SERVICES[serviceName]) {
	    throw new Error('The serviceName [' + serviceName + '] not defined in your config, please check your config!');
	  }

	  var url = CONFIG.SERVICES[serviceName].API[apiName];

	  if (!url) {
	    throw new Error('The apiName not defined in your service [' + serviceName + '], please check your config.');
	  }

	  var params = options.params;
	  var queries = options.query;

	  if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
	    for (var pKey in options) {
	      url = url.replace(new RegExp('\[\:\*\]' + pKey), options[pKey]);
	    }
	  }

	  if ((typeof queries === 'undefined' ? 'undefined' : _typeof(queries)) === 'object') {
	    url += decodeURIComponent($.param(queries));
	  } else if (typeof queries === 'string') {
	    url += queries;
	  }

	  return CONFIG.SERVICES[serviceName].BASE_URL + url;
	};

	/**
	 * 应用过滤器链
	 * @param filterChain {Array<Function>} 过滤器链
	 * @param options {Object} 传入到过滤器中的参数
	 * @returns {boolean}
	 *          false 中断当前过程(如果的请求，则中断当前请求，如果是响应，则不调用回调)
	 */
	function applyFilterChain(filterChain, options) {
	  var execResult = void 0;
	  for (var i = 0, len = filterChain.length; i < len; i++) {
	    execResult = filterChain[i].call(this, options);
	    //中断过程，并返回
	    if (false === execResult) {
	      return false;
	    }
	    //中断继续执行过滤器链
	    if (true === execResult) {
	      break;
	    }
	  }
	}

	/**
	 * 发送请求
	 * @param serviceName {String} 服务名，用于在配置中，将后台服务配置模块化，方便接口管理
	 * @param apiName {String} 接口名，全局唯一，该字段对应的URL从window.CONFIG.SERVICES中获取，因此使用该框架，在全局必然会又一个CONFIG对象，否则会报错
	 * @param options {Object} 请求参数，格式如下
	 *      {
	 *          type: {String} 请求发送的http方法，可选值 GET,POST,PUT,DELETE,OPTIONS,HEAD,TRACE等
	 *          headers: {Object} http头信息
	 *          params: {Object} 路径变量，填充apiName对应的url中存在的路径变量
	 *          query: {Object} 对应请求路径的query string,也就是路径问好后需要带上的参数，自动序列化并加到路径后面
	 *          body: {Object} 对应的http请求体，body根据请求发送时的Content-Type进行序列化，具体序列化方式，参考HTTP标准
	 *          timeout: {Number} 请求超时毫秒数
	 *          handler: {String} 请求完成后的回调，字符串代表Eagle实例中的requestHandlers中函数的key
	 *            回调参数列表:
	 *            respBody: {Object|String} 根据响应头中的Content-Type对响应体进行解析，模式尝试使用json方式
	 *            status: {Number} http响应状态码，0表示请求未发送成功，往往表示客户端网络未连接
	 *            headers: {Object} 所有能成功获取的响应头(某些跨域情况下，以及某些头是不能直接获取的)
	 *      }
	 */
	Eagle.prototype.request = function () {
	  var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(serviceName, apiName, options) {
	    var _this = this;

	    return regenerator.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            return _context.abrupt('return', new Promise(function (resolve, reject) {
	              var self = _this;
	              var _body = null;
	              if (options.body instanceof FormData) {
	                _body = options.body;
	                options.processData = false;
	                options.contentType = false;
	              }

	              //深拷贝一下参数
	              options = JSON.parse(JSON.stringify(options));

	              if (_body !== null) {
	                options.body = _body;
	              }

	              //根据服务名，接口名获取当前发送请求的地址
	              options.url = Eagle.getURL(serviceName, apiName, options);

	              //首先应用请求发送前的过滤器链，如果过滤器链执行过程中返回了false，则该请求被中断，不再发送
	              if (false === applyFilterChain.call(self, requestFilterChain, {
	                serviceName: serviceName,
	                apiName: apiName,
	                options: options
	              })) {
	                console.warn('请求在请求过滤器链中被中断, 请处理您的代码！');
	                resolve(null);
	                return;
	              }

	              if (options.body instanceof FormData) {
	                delete (options.headers || {})['Content-Type'];
	              }

	              //预处理
	              function handlerResp(xhr) {
	                var filterOption = {
	                  serviceName: serviceName,
	                  apiName: apiName,
	                  options: options,
	                  xhr: xhr,
	                  response: getResponse(xhr),
	                  status: getStatus(xhr),
	                  headers: getHeaders(xhr)
	                };

	                //如果过滤器链返回了false, 那么直接返回空响应
	                if (false === applyFilterChain.call(self, responseFilterChain, filterOption)) {
	                  console.warn('响应过滤器链拦截了您的相应！');
	                  resolve(null);
	                  return;
	                }

	                // 响应请求
	                resolve({
	                  data: filterOption.response,
	                  status: filterOption.status,
	                  headers: filterOption.headers,
	                  request: filterOption.options
	                });
	              }

	              options.success = function (resp, status, xhr) {
	                handlerResp(xhr);
	              };

	              options.error = function (xhr, error) {
	                handlerResp(xhr);
	              };

	              options.data = options.body;

	              $.ajax(options);
	            }));

	          case 1:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  function request(_x2, _x3, _x4) {
	    return _ref.apply(this, arguments);
	  }

	  return request;
	}();

	function getResponse(xhr) {
	  var response = xhr.responseText;
	  try {
	    response = JSON.parse(response);
	  } catch (e) {
	    //ignore this
	  }

	  return response;
	}

	function getStatus(xhr) {
	  return xhr.status;
	}

	function getHeaders(xhr) {
	  var headerTexts = xhr.getAllResponseHeaders().split('\n');
	  var headers = {},
	      textItem = void 0;
	  for (var i = 0, len = headerTexts.length; i < len; i++) {
	    textItem = headerTexts[i].match(/([^:]+):\s*(.+)/);
	    if (!!textItem) {
	      headers[textItem[1]] = textItem[2];
	    }
	  }
	  return headers;
	}

	return Eagle;

})));
//# sourceMappingURL=eagle.umd.js.map
