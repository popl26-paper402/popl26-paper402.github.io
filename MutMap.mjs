import runtime from "./Runtime.mjs";
import Option from "./Option.mjs";
import Predef from "./Predef.mjs";
let MutMap2;
(class MutMap {
  static {
    MutMap2 = MutMap;
    this.MutMap = function MutMap(underlying1) {
      return new MutMap.class(underlying1);
    };
    this.MutMap.class = class MutMap1 {
      constructor(underlying) {
        let lambda;
        this.underlying = underlying;
        const this$MutMap = this;
        lambda = (undefined, function () {
          return runtime.safeCall(this$MutMap.underlying[globalThis.Symbol.iterator]())
        });
        this[globalThis.Symbol.iterator] = lambda;
        runtime.Unit
      }
      toString() { return "MutMap(" + runtime.render(this.underlying) + ")"; }
    };
  }
  static get(key) {
    return (m) => {
      let scrut, tmp;
      scrut = runtime.safeCall(m.underlying.has(key));
      if (scrut === true) {
        tmp = runtime.safeCall(m.underlying.get(key));
        return runtime.safeCall(Option.Some(tmp))
      } else {
        return Option.None
      }
    }
  } 
  static insert(key1, value) {
    return (m) => {
      let tmp;
      tmp = m.underlying.set(key1, value);
      return runtime.Unit
    }
  } 
  static updateWith(key2) {
    return (op) => {
      return (m) => {
        let scrut, param0, value1, tmp, tmp1;
        tmp = MutMap.get(key2);
        tmp1 = Predef.pipeInto(m, tmp);
        scrut = runtime.safeCall(op(tmp1));
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          value1 = param0;
          return m.underlying.set(key2, value1)
        } else if (scrut instanceof Option.None.class) {
          return runtime.safeCall(m.underlying.delete(key2))
        } else {
          throw new globalThis.Error("match error");
        }
      }
    }
  } 
  static keysIterator(m) {
    return runtime.safeCall(m.underlying.keys())
  } 
  static valuesIterator(m1) {
    return runtime.safeCall(m1.underlying.values())
  } 
  static values(m2) {
    let tmp;
    tmp = runtime.safeCall(m2.underlying.values());
    return runtime.safeCall(globalThis.Array.from(tmp))
  } 
  static toMap(entries) {
    let m3, i, length, scrut, tmp, tmp1, tmp2, tmp3, tmp4;
    m3 = MutMap.empty;
    i = 0;
    length = entries.length;
    tmp5: while (true) {
      scrut = i < length;
      if (scrut === true) {
        tmp = runtime.safeCall(entries.at(i));
        tmp1 = MutMap.insert(...tmp);
        tmp2 = Predef.pipeInto(m3, tmp1);
        tmp3 = i + 1;
        i = tmp3;
        tmp4 = runtime.Unit;
        continue tmp5;
      } else {
        tmp4 = runtime.Unit;
      }
      break;
    }
    return m3
  } 
  static get empty() {
    let tmp;
    tmp = new globalThis.Map();
    return new MutMap.MutMap.class(tmp);
  }
  static toString() { return "MutMap"; }
});
let MutMap = MutMap2; export default MutMap;
