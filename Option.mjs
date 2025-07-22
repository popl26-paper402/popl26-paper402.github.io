import runtime from "./Runtime.mjs";
import Predef from "./Predef.mjs";
let Option1;
(class Option {
  static {
    Option1 = Option;
    this.Some = function Some(value1) {
      return new Some.class(value1);
    };
    this.Some.class = class Some {
      constructor(value) {
        this.value = value;
      }
      toString() { return "Some(" + runtime.render(this.value) + ")"; }
    };
    const None$class = class None {
      constructor() {}
      toString() { return "None"; }
    };
    this.None = new None$class;
    this.None.class = None$class;
    this.Both = function Both(fst1, snd1) {
      return new Both.class(fst1, snd1);
    };
    this.Both.class = class Both {
      constructor(fst, snd) {
        this.fst = fst;
        this.snd = snd;
      }
      toString() { return "Both(" + runtime.render(this.fst) + ", " + runtime.render(this.snd) + ")"; }
    };
    (class unsafe {
      static {
        Option.unsafe = unsafe;
      }
      static get(opt) {
        let param0, value;
        if (opt instanceof Option.Some.class) {
          param0 = opt.value;
          value = param0;
          return value
        } else if (opt instanceof Option.None.class) {
          throw globalThis.Error("None.get");
        } else {
          throw new globalThis.Error("match error");
        }
      }
      static toString() { return "unsafe"; }
    });
  }
  static isDefined(x) {
    if (x instanceof Option.Some.class) {
      return true
    } else if (x instanceof Option.None.class) {
      return false
    } else {
      throw new globalThis.Error("match error");
    }
  } 
  static getOrElse(opt, default1) {
    let param0, value;
    if (opt instanceof Option.Some.class) {
      param0 = opt.value;
      value = param0;
      return value
    } else if (opt instanceof Option.None.class) {
      return default1
    } else {
      throw new globalThis.Error("match error");
    }
  } 
  static flatMap(opt1, f) {
    let param0, value;
    if (opt1 instanceof Option.Some.class) {
      param0 = opt1.value;
      value = param0;
      return runtime.safeCall(f(value))
    } else if (opt1 instanceof Option.None.class) {
      return Option.None
    } else {
      throw new globalThis.Error("match error");
    }
  }
  static toString() { return "Option"; }
});
let Option = Option1; export default Option;
