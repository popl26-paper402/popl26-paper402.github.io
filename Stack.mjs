import runtime from "./Runtime.mjs";
import Predef from "./Predef.mjs";
let Stack1;
(class Stack {
  static {
    Stack1 = Stack;
    this.Cons = function Cons(head1, tail1) {
      return new Cons.class(head1, tail1);
    };
    this.Cons.class = class Cons {
      constructor(head, tail) {
        this.head = head;
        this.tail = tail;
      }
      toString() { return "Cons(" + runtime.render(this.head) + ", " + runtime.render(this.tail) + ")"; }
    };
    const Nil$class = class Nil {
      constructor() {}
      toString() { return "Nil"; }
    };
    this.Nil = new Nil$class;
    this.Nil.class = Nil$class;
  }
  static isEmpty(xs) {
    if (xs instanceof Stack.Nil.class) {
      return true
    } else {
      return false
    }
  } 
  static reverseAndAppend(xs1, tail) {
    let param0, param1, h, t, tmp;
    if (xs1 instanceof Stack.Cons.class) {
      param0 = xs1.head;
      param1 = xs1.tail;
      h = param0;
      t = param1;
      tmp = Stack.Cons(h, tail);
      return Stack.reverseAndAppend(t, tmp)
    } else if (xs1 instanceof Stack.Nil.class) {
      return tail
    } else {
      throw new globalThis.Error("match error");
    }
  } 
  static reverse(xs2) {
    return Stack.reverseAndAppend(xs2, Stack.Nil)
  } 
  static fromArray(arr) {
    let ls, i, len, scrut, tmp, tmp1, tmp2, tmp3;
    ls = Stack.Nil;
    i = 0;
    len = arr.length;
    tmp4: while (true) {
      scrut = i < len;
      if (scrut === true) {
        tmp = runtime.safeCall(arr.at(i));
        tmp1 = Stack.Cons(tmp, ls);
        ls = tmp1;
        tmp2 = i + 1;
        i = tmp2;
        tmp3 = runtime.Unit;
        continue tmp4;
      } else {
        tmp3 = runtime.Unit;
      }
      break;
    }
    return ls
  } 
  static toReverseArray(xs3) {
    let arr1, i, param0, param1, h, t, tmp, tmp1;
    arr1 = [];
    i = 0;
    tmp2: while (true) {
      if (xs3 instanceof Stack.Cons.class) {
        param0 = xs3.head;
        param1 = xs3.tail;
        h = param0;
        t = param1;
        tmp = runtime.safeCall(arr1.push(h));
        xs3 = t;
        tmp1 = runtime.Unit;
        continue tmp2;
      } else {
        tmp1 = runtime.Unit;
      }
      break;
    }
    return arr1
  } 
  static zip(...xss) {
    let go, tmp, tmp1;
    go = function go(heads, tails) {
      let lambda;
      lambda = (undefined, function (caseScrut) {
        let param0, param1, h, t, param01, param11, h2, t2, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11;
        if (caseScrut instanceof Stack.Cons.class) {
          param0 = caseScrut.head;
          param1 = caseScrut.tail;
          h = param0;
          t = param1;
          if (h instanceof Stack.Cons.class) {
            param01 = h.head;
            param11 = h.tail;
            h2 = param01;
            t2 = param11;
            tmp2 = Stack.Cons(h2, heads);
            tmp3 = Stack.Cons(t2, tails);
            tmp4 = go(tmp2, tmp3);
            return runtime.safeCall(tmp4(t))
          } else if (h instanceof Stack.Nil.class) {
            tmp5 = go(heads, tails);
            return runtime.safeCall(tmp5(t))
          } else {
            throw new globalThis.Error("match error");
          }
        } else if (caseScrut instanceof Stack.Nil.class) {
          if (heads instanceof Stack.Nil.class) {
            if (tails instanceof Stack.Nil.class) {
              tmp6 = true;
            } else {
              tmp6 = false;
            }
            tmp7 = runtime.safeCall(Predef.assert(tmp6));
            return (tmp7 , Stack.Nil)
          } else {
            tmp8 = Stack.toReverseArray(heads);
            tmp9 = go(Stack.Nil, Stack.Nil);
            tmp10 = Stack.reverse(tails);
            tmp11 = runtime.safeCall(tmp9(tmp10));
            return Stack.Cons(tmp8, tmp11)
          }
        } else {
          throw new globalThis.Error("match error");
        }
      });
      return lambda
    };
    tmp = go(Stack.Nil, Stack.Nil);
    tmp1 = Stack.fromArray(xss);
    return runtime.safeCall(tmp(tmp1))
  } 
  static concat(xs4, ys) {
    let param0, param1, head$_, tail$_, result, current, rest, param01, param11, head, tail1, next, tmp, tmp1, tmp2;
    if (ys instanceof Stack.Nil.class) {
      return xs4
    } else {
      if (xs4 instanceof Stack.Nil.class) {
        return ys
      } else if (xs4 instanceof Stack.Cons.class) {
        param0 = xs4.head;
        param1 = xs4.tail;
        head$_ = param0;
        tail$_ = param1;
        tmp = Stack.Cons(head$_, ys);
        result = tmp;
        current = result;
        rest = tail$_;
        tmp3: while (true) {
          if (rest instanceof Stack.Cons.class) {
            param01 = rest.head;
            param11 = rest.tail;
            head = param01;
            tail1 = param11;
            tmp1 = Stack.Cons(head, ys);
            next = tmp1;
            current.tail = next;
            current = next;
            rest = tail1;
            tmp2 = runtime.Unit;
            continue tmp3;
          } else {
            tmp2 = runtime.Unit;
          }
          break;
        }
        return result
      } else {
        throw new globalThis.Error("match error");
      }
    }
  } 
  static append(xs5, y) {
    let tmp;
    tmp = Stack.Cons(y, Stack.Nil);
    return Stack.concat(xs5, tmp)
  } 
  static filter(xs6, f) {
    let param0, param1, head, tail1, scrut, tmp;
    if (xs6 instanceof Stack.Cons.class) {
      param0 = xs6.head;
      param1 = xs6.tail;
      head = param0;
      tail1 = param1;
      scrut = runtime.safeCall(f(head));
      if (scrut === true) {
        tmp = Stack.filter(tail1, f);
        return Stack.Cons(head, tmp)
      } else {
        return Stack.filter(tail1, f)
      }
    } else if (xs6 instanceof Stack.Nil.class) {
      return Stack.Nil
    } else {
      throw new globalThis.Error("match error");
    }
  }
  static toString() { return "Stack"; }
});
let Stack = Stack1; export default Stack;
