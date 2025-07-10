import runtime from "./Runtime.mjs";
import MutMap from "./MutMap.mjs";
import Predef from "./Predef.mjs";
let Examples1;
(class Examples {
  static {
    Examples1 = Examples;
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17;
    this.examples = MutMap.empty;
    tmp = new globalThis.RegExp("^(?://\\u2502.*|(?://\\s*)?:.*)$\n", "gm");
    this.diffTestPattern = tmp;
    tmp1 = Examples.removeDiffTests("// The identity function.\nx => x\n\n// Applications of identity function.\n(x => x)(())\n\n(x => x)(y => y)\n\n(x => x)(y => y)(())\n\n(x => x)((y => y)(()))\n");
    tmp2 = MutMap.insert("identity.mls", {
    "name": "Identity", "source": tmp1
    });
    tmp3 = Predef.pipeInto(Examples.examples, tmp2);
    tmp4 = Examples.removeDiffTests("// Applying self-application with the identity function, and then applied with a unit.\n// The result is a unit.\n(x => x(x))(y => y)(())\n\n// Deferred diverging term, which is just a function type.\nthunk => (x => x(x))(y => y(y))\n\n// Diverging term applied, which never returns anything.\n// Type inference yields a type variable with no upper/lower bounds,\n// so the set of inferred weak types is empty.\n(x => x(x))(y => y(y))(())\n\n");
    tmp5 = MutMap.insert("self-app.mls", {
    "name": "Self-Application", "source": tmp4
    });
    tmp6 = Predef.pipeInto(Examples.examples, tmp5);
    tmp7 = Examples.removeDiffTests("// Applying the unit with a unit.\n// It is stuck with C-Err.\n()( () )\n\n// Same, but as an argument to the identity, which is also stuck.\n(x => x)( ()( () ))\n\n// Thunk for applying the unit with a unit.\n// Because the inner stuck term is not actually evaluated,\n// this term is not really stuck, and we can infer a weak-type.\nthunk => ()( () )\n\n");
    tmp8 = MutMap.insert("stuck.mls", {
    "name": "Stuck Terms", "source": tmp7
    });
    tmp9 = Predef.pipeInto(Examples.examples, tmp8);
    tmp10 = Examples.removeDiffTests("// Approximation via cond, which is using the `if` syntax here.\n// The inferred weak type can be either an identity function or a unit.\n// Note that while the identity function type shown in inferred weak types is\n// not quantified using forall, we do not have any bounds for the type variable,\n// so it is in fact polymorphic.\nif (()) then (x => x) else ()\n\n\n// Function application where the parameter can have different types due to approximation.\n// The result can also have different types.\nlet c = if (()) then (x => x) else ()\n(y => y)(c)\n");
    tmp11 = MutMap.insert("cond.mls", {
    "name": "Cond Approximation", "source": tmp10
    });
    tmp12 = Predef.pipeInto(Examples.examples, tmp11);
    tmp13 = Examples.removeDiffTests("// Simple recursion example, which uses lambda encoding of Booleans, list,\n// and the y-combinator for recursion.\n// Note that this is rather simple (O(n) in the size of the program), so we have enough\n// marks to infer the precise result.\nlet\n  tru = a => b => a\n  fals = a => b => b\n  mkpair = a => b => c => c(a)(b)\n  nil = fals\n  head = p => p(tru)\n  tail = p => p(fals)\n  isEmpty = p => p(x => y => z => fals)(tru)\n  fix = f => (x => f(x(x)))(x => f(x(x)))\n  concatImpl = f => l1 => l2 => isEmpty(l1)(l2)( mkpair(head(l1))(f(tail(l1)(l2))) )\n  concat = fix(concatImpl)\nhead(concat(mkpair(2)(mkpair(1)(nil)))(mkpair(3)(nil)))\n\n");
    tmp14 = MutMap.insert("rec1.mls", {
    "name": "Recursion Example 1", "source": tmp13
    });
    tmp15 = Predef.pipeInto(Examples.examples, tmp14);
    tmp16 = Examples.removeDiffTests("// Another recursion example that uses lambda encoding of natural numbers\n// and exponentiation.\n// This triggers the C-Forall2 rule to perform approximation because\n// the trace is a lot more complex and we do not have enough precision budget\n// for full evaluation in the constraint solving.\nlet\n  tru = a => b => a\n  fals = a => b => b\n  mkpair = a => b => c => c(a)(b)\n  head = p => p(tru)\n  succ = n => f => x => f(n(f)(x))\n  mult = m => n => f => x => m(n(f))(x)\n  exp = b => n => n(b)\n  zero = f => x => x\n  two = succ(succ(zero))\n  four = mult(two)(two)\n  addFront = ls => mkpair(1)(ls)\nhead(exp(four)(four)(addFront)(fals))\n\n");
    tmp17 = MutMap.insert("rec2.mls", {
    "name": "Recursion Example 2", "source": tmp16
    });
    Predef.pipeInto(Examples.examples, tmp17)
  }
  static removeDiffTests(source) {
    let tmp;
    tmp = source.replaceAll(Examples.diffTestPattern, "");
    return runtime.safeCall(tmp.trim())
  }
  static toString() { return "Examples"; }
});
let Examples = Examples1; export default Examples;
