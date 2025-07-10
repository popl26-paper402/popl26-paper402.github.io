import runtime from "./Runtime.mjs";
import Str from "./Str.mjs";
import Iter from "./Iter.mjs";
import XML from "./XML.mjs";
import Option from "./Option.mjs";
import Runtime from "./Runtime.mjs";
import Predef from "./Predef.mjs";
import MutMap from "./MutMap.mjs";
import Examples from "./Examples.mjs";
import MLscript from "./MLscript.mjs";
let Main1;
(class Main {
  static #query;
  static #editor;
  static #selector;
  static #parseButton;
  static #outputPanel;
  static #compileTimeReport;
  static #indentRegex;
  static #errorDisplayStyle;
  static {
    Main1 = Main;
    let tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, lambda, lambda1, lambda2, lambda3;
    tmp = runtime.safeCall(globalThis.document.querySelector.bind(globalThis.document));
    Main.#query = tmp;
    tmp1 = runtime.safeCall(Main.#query("#editor"));
    Main.#editor = tmp1;
    tmp2 = runtime.safeCall(Main.#query("select#example"));
    Main.#selector = tmp2;
    tmp3 = runtime.safeCall(Main.#query("button#parse"));
    Main.#parseButton = tmp3;
    tmp4 = runtime.safeCall(Main.#query("#output"));
    Main.#outputPanel = tmp4;
    tmp5 = runtime.safeCall(Main.#query(".compile-time-report"));
    Main.#compileTimeReport = tmp5;
    (class tabs {
      static {
        Main.tabs = tabs;
        (class parser {
          static {
            tabs.parser = parser;
            let tmp17, tmp18, tmp19, tmp20;
            tmp17 = runtime.safeCall(Main.#query("#tab-parser"));
            this.el = tmp17;
            tmp18 = runtime.safeCall(parser.el.querySelector("code.traces"));
            this.traces = tmp18;
            tmp19 = runtime.safeCall(parser.el.querySelector("div.trees"));
            this.trees = tmp19;
            tmp20 = runtime.safeCall(parser.el.querySelector("#show-traces"));
            this.showTraces = tmp20;
            const diagnostics$class = class diagnostics {
              constructor() {
                let tmp21, tmp22, tmp23;
                tmp21 = runtime.safeCall(parser.el.querySelector(".diagnostics"));
                this.elem = tmp21;
                tmp22 = runtime.safeCall(this.elem.querySelector(".output"));
                this.output = tmp22;
                tmp23 = runtime.safeCall(this.elem.querySelector(".text"));
                this.text = tmp23;
              }
              toString() { return "diagnostics"; }
            };
            this.diagnostics = new diagnostics$class;
            this.diagnostics.class = diagnostics$class;
          }
          static toString() { return "parser"; }
        });
        (class elaborator {
          static {
            tabs.elaborator = elaborator;
            let tmp17, tmp18, tmp19, tmp20;
            tmp17 = runtime.safeCall(Main.#query("#tab-elaborator"));
            this.el = tmp17;
            tmp18 = runtime.safeCall(elaborator.el.querySelector("code.traces"));
            this.traces = tmp18;
            tmp19 = runtime.safeCall(elaborator.el.querySelector("div.tree"));
            this.tree = tmp19;
            tmp20 = runtime.safeCall(elaborator.el.querySelector("#show-traces"));
            this.showTraces = tmp20;
            const diagnostics$class = class diagnostics1 {
              constructor() {
                let tmp21, tmp22, tmp23;
                tmp21 = runtime.safeCall(elaborator.el.querySelector(".diagnostics"));
                this.elem = tmp21;
                tmp22 = runtime.safeCall(this.elem.querySelector(".output"));
                this.output = tmp22;
                tmp23 = runtime.safeCall(this.elem.querySelector(".text"));
                this.text = tmp23;
              }
              toString() { return "diagnostics"; }
            };
            this.diagnostics = new diagnostics$class;
            this.diagnostics.class = diagnostics$class;
          }
          static toString() { return "elaborator"; }
        });
        (class resolver {
          static {
            tabs.resolver = resolver;
            let tmp17, tmp18, tmp19, tmp20;
            tmp17 = runtime.safeCall(Main.#query("#tab-resolver"));
            this.el = tmp17;
            tmp18 = runtime.safeCall(resolver.el.querySelector("code.traces"));
            this.traces = tmp18;
            tmp19 = runtime.safeCall(resolver.el.querySelector("div.tree"));
            this.tree = tmp19;
            tmp20 = runtime.safeCall(resolver.el.querySelector("#show-traces"));
            this.showTraces = tmp20;
            const diagnostics$class = class diagnostics2 {
              constructor() {
                let tmp21, tmp22, tmp23;
                tmp21 = runtime.safeCall(resolver.el.querySelector(".diagnostics"));
                this.elem = tmp21;
                tmp22 = runtime.safeCall(this.elem.querySelector(".output"));
                this.output = tmp22;
                tmp23 = runtime.safeCall(this.elem.querySelector(".text"));
                this.text = tmp23;
              }
              toString() { return "diagnostics"; }
            };
            this.diagnostics = new diagnostics$class;
            this.diagnostics.class = diagnostics$class;
          }
          static toString() { return "resolver"; }
        });
        (class typer {
          static {
            tabs.typer = typer;
            let tmp17, tmp18, tmp19;
            tmp17 = runtime.safeCall(Main.#query("#tab-typer"));
            this.el = tmp17;
            tmp18 = runtime.safeCall(typer.el.querySelector("div.results"));
            this.results = tmp18;
            tmp19 = runtime.safeCall(typer.el.querySelector("#show-traces"));
            this.showTraces = tmp19;
            const diagnostics$class = class diagnostics3 {
              constructor() {
                let tmp20, tmp21, tmp22;
                tmp20 = runtime.safeCall(typer.el.querySelector(".diagnostics"));
                this.elem = tmp20;
                tmp21 = runtime.safeCall(this.elem.querySelector(".output"));
                this.output = tmp21;
                tmp22 = runtime.safeCall(this.elem.querySelector(".text"));
                this.text = tmp22;
              }
              toString() { return "diagnostics"; }
            };
            this.diagnostics = new diagnostics$class;
            this.diagnostics.class = diagnostics$class;
          }
          static toString() { return "typer"; }
        });
      }
      static toString() { return "tabs"; }
    });
    lambda = (undefined, function (caseScrut) {
      let first1, first0, key, example, option, scrut, tmp17, tmp18;
      if (globalThis.Array.isArray(caseScrut) && caseScrut.length === 2) {
        first0 = caseScrut[0];
        first1 = caseScrut[1];
        key = first0;
        example = first1;
        tmp17 = runtime.safeCall(globalThis.document.createElement("option"));
        option = tmp17;
        option.value = key;
        option.textContent = example.name;
        tmp18 = runtime.safeCall(Main.#selector.appendChild(option));
        scrut = Main.#editor.value;
        if (scrut === "") {
          Main.#editor.value = example.source;
          return runtime.Unit
        } else {
          return runtime.Unit
        }
      } else {
        throw new globalThis.Error("match error");
      }
    });
    tmp6 = lambda;
    tmp7 = Iter.each(Examples.examples, tmp6);
    lambda1 = (undefined, function (event) {
      let scrut, start, end, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22;
      scrut = event.key;
      if (scrut === "Tab") {
        tmp17 = runtime.safeCall(event.preventDefault());
        start = Main.#editor.selectionStart;
        end = Main.#editor.selectionEnd;
        tmp18 = Main.#editor.value.substring(0, start);
        tmp19 = tmp18 + "  ";
        tmp20 = runtime.safeCall(Main.#editor.value.substring(end));
        tmp21 = tmp19 + tmp20;
        Main.#editor.value = tmp21;
        tmp22 = start + 2;
        Main.#editor.selectionEnd = tmp22;
        Main.#editor.selectionStart = Main.#editor.selectionEnd;
        return runtime.Unit
      } else {
        return runtime.Unit
      }
    });
    tmp8 = lambda1;
    tmp9 = Main.#editor.addEventListener("keydown", tmp8);
    lambda2 = (undefined, function (event) {
      let scrut, param0, example, tmp17, tmp18, tmp19;
      tmp17 = MutMap.get(Main.#selector.value);
      scrut = Predef.pipeInto(Examples.examples, tmp17);
      if (scrut instanceof Option.Some.class) {
        param0 = scrut.value;
        example = param0;
        Main.#editor.value = example.source;
        return runtime.Unit
      } else if (scrut instanceof Option.None.class) {
        tmp18 = "Example \"" + Main.#selector.value;
        tmp19 = tmp18 + "\" not found";
        throw new globalThis.Error(tmp19);
      } else {
        return runtime.Unit
      }
    });
    tmp10 = lambda2;
    tmp11 = Main.#selector.addEventListener("change", tmp10);
    tmp12 = new globalThis.RegExp("^\\s*$", "m");
    this.blankLinePattern = tmp12;
    tmp13 = new globalThis.RegExp("^\\s*//.*$", "m");
    this.commentLinePattern = tmp13;
    lambda3 = (undefined, function (event) {
      let tmp17, tmp18, lambda4, lambda5;
      lambda4 = (undefined, function () {
        let startTime, blocks, res, parser1, elaborator1, resolver1, elapsedSeconds, problematicStages, scrut, scrut1, scrut2, scrut3, scrut4, allDiagnostics, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, lambda6;
        tmp19 = runtime.safeCall(globalThis.Date.now());
        startTime = tmp19;
        tmp20 = Main.splitTestBlocks(Main.#editor.value);
        blocks = tmp20;
        tmp21 = runtime.safeCall(globalThis.console.log(blocks));
        parser1 = Main.tabs.parser.showTraces.checked;
        elaborator1 = Main.tabs.elaborator.showTraces.checked;
        resolver1 = Main.tabs.resolver.showTraces.checked;
        tmp22 = MLscript.compile(blocks, {
        "traces": {
          "parser": parser1, "elaborator": elaborator1, "resolver": resolver1
          }
        });
        res = tmp22;
        tmp23 = runtime.safeCall(globalThis.Date.now());
        tmp24 = tmp23 - startTime;
        tmp25 = tmp24 / 1000;
        tmp26 = runtime.safeCall(tmp25.toPrecision(3));
        elapsedSeconds = tmp26;
        tmp27 = "Compilation took " + elapsedSeconds;
        tmp28 = tmp27 + " seconds.";
        tmp29 = runtime.safeCall(globalThis.console.log(tmp28));
        tmp30 = runtime.safeCall(globalThis.console.log(res));
        problematicStages = [];
        scrut = res.lexer.diagnostics.length > 0;
        if (scrut === true) {
          tmp31 = runtime.safeCall(problematicStages.push("lexer"));
        } else {
          tmp31 = runtime.Unit;
        }
        scrut1 = res.parser.diagnostics.length > 0;
        if (scrut1 === true) {
          tmp32 = runtime.safeCall(problematicStages.push("parser"));
        } else {
          tmp32 = runtime.Unit;
        }
        scrut2 = res.elaborator.diagnostics.length > 0;
        if (scrut2 === true) {
          tmp33 = runtime.safeCall(problematicStages.push("elaborator"));
        } else {
          tmp33 = runtime.Unit;
        }
        scrut3 = res.resolver.diagnostics.length > 0;
        if (scrut3 === true) {
          tmp34 = runtime.safeCall(problematicStages.push("resolver"));
        } else {
          tmp34 = runtime.Unit;
        }
        scrut4 = res.typer.diagnostics.length > 0;
        if (scrut4 === true) {
          tmp35 = runtime.safeCall(problematicStages.push("typer"));
        } else {
          tmp35 = runtime.Unit;
        }
        lambda6 = (undefined, function (result) {
          let tmp39, tmp40, tmp41, tmp42, tmp43, tmp44;
          tmp39 = "<div class=\"source\"><pre><code>" + result.source;
          tmp40 = tmp39 + "</code></pre></div>\n";
          tmp41 = tmp40 + "<div class=\"output\">";
          tmp42 = tmp41 + result.result;
          tmp43 = tmp42 + "</div>\n";
          tmp44 = tmp43 + "</div>";
          return "<div class=\"typer-result\">\n" + tmp44
        });
        tmp36 = lambda6;
        tmp37 = Iter.mapping(res.typer.results, tmp36);
        tmp38 = Iter.joined(tmp37, "");
        Main.tabs.typer.results.innerHTML = tmp38;
        allDiagnostics = [
          ...res.lexer.diagnostics,
          ...res.parser.diagnostics,
          ...res.elaborator.diagnostics,
          ...res.resolver.diagnostics,
          ...res.typer.diagnostics
        ];
        return Main.showDiagnostics(Main.tabs.typer.diagnostics, allDiagnostics, problematicStages)
      });
      tmp17 = lambda4;
      lambda5 = (undefined, function (error) {
        let errorDisplay, tmp19, tmp20, tmp21;
        tmp19 = runtime.safeCall(globalThis.console.log(error));
        tmp20 = runtime.safeCall(globalThis.document.createElement("error-display"));
        errorDisplay = tmp20;
        tmp21 = runtime.safeCall(errorDisplay.setError(error));
        return runtime.safeCall(Main.#outputPanel.appendChild(errorDisplay))
      });
      tmp18 = lambda5;
      return Runtime.try_catch(tmp17, tmp18)
    });
    tmp14 = Main.#parseButton.addEventListener("click", lambda3);
    tmp15 = new globalThis.RegExp("^(\\s*)");
    Main.#indentRegex = tmp15;
    Main.#errorDisplayStyle = "\n.error-container {\n  background-color: #fdd;\n  padding: 0.375rem 0.75rem 0.5rem;\n  font-family: var(--monospace);\n  color: #991b1bff;\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.error-message {\n  margin: 0;\n  font-weight: bold;\n  font-size: 1.125rem;\n}\n.stack-trace {\n  font-size: 0.875rem;\n  margin: 0;\n  list-style-type: none;\n  padding-left: 0.5rem;\n}";
    this.CollapsibleTree = class CollapsibleTree extends globalThis.HTMLElement {
      constructor() {
        super();
      }
      connectedCallback() {
        let rawText, treeData, treeElement, tmp17, tmp18;
        rawText = this.textContent;
        this.textContent = "";
        tmp17 = Main.parseIndentedText(rawText);
        treeData = tmp17;
        tmp18 = this.createDetailsTree(treeData, 0);
        treeElement = tmp18;
        return runtime.safeCall(this.appendChild(treeElement))
      } 
      createDetailsTree(nodes, depth) {
        let fragment, tmp17, tmp18, tmp19, lambda4;
        tmp17 = runtime.safeCall(globalThis.document.createDocumentFragment());
        fragment = tmp17;
        const this$CollapsibleTree = this;
        lambda4 = (undefined, function (node) {
          let details, scrut, summary, scrut1, rule, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29;
          tmp20 = runtime.safeCall(globalThis.document.createElement("details"));
          details = tmp20;
          scrut = depth < 4;
          if (scrut === true) {
            tmp21 = details.setAttribute("open", "");
          } else {
            tmp21 = runtime.Unit;
          }
          tmp22 = runtime.safeCall(globalThis.document.createElement("summary"));
          summary = tmp22;
          summary.textContent = node.text;
          tmp23 = runtime.safeCall(details.appendChild(summary));
          scrut1 = node.children.length > 0;
          if (scrut1 === true) {
            tmp24 = depth + 1;
            tmp25 = this$CollapsibleTree.createDetailsTree(node.children, tmp24);
            tmp26 = runtime.safeCall(details.appendChild(tmp25));
          } else {
            tmp26 = details.setAttribute("leaf", "");
          }
          tmp27 = runtime.safeCall(fragment.appendChild(details));
          tmp28 = runtime.safeCall(globalThis.document.createElement("rule"));
          rule = tmp28;
          tmp29 = runtime.safeCall(rule.classList.add("rule"));
          return runtime.safeCall(fragment.appendChild(rule))
        });
        tmp18 = lambda4;
        tmp19 = Iter.each(nodes, tmp18);
        return fragment
      }
      toString() { return "CollapsibleTree"; }
    };
    tmp16 = globalThis.customElements.define("collapsible-tree", Main.CollapsibleTree);
    this.ErrorDisplay = class ErrorDisplay extends globalThis.HTMLElement {
      #_error;
      constructor() {
        super();
        let tmp17;
        tmp17 = runtime.safeCall(this.attachShadow({
        "mode": "open"
        }));
        this.#_error = Option.None;
      }
      connectedCallback() {
        return runtime.safeCall(this.render())
      } 
      setError(value) {
        let tmp17;
        tmp17 = runtime.safeCall(Option.Some(value));
        this.#_error = tmp17;
        return runtime.safeCall(this.render())
      } 
      render() {
        let scrut, param0, error, stackLines, scrut1, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, lambda4;
        scrut = this.#_error;
        if (scrut instanceof Option.Some.class) {
          param0 = scrut.value;
          error = param0;
          tmp17 = runtime.safeCall(error.stack.split("\n"));
          stackLines = tmp17;
          scrut1 = runtime.safeCall(stackLines[0].startsWith(error.name));
          if (scrut1 === true) {
            tmp18 = runtime.safeCall(stackLines.shift());
          } else {
            tmp18 = runtime.Unit;
          }
          tmp19 = XML.elem("div", {
          "class": "error-container"
          });
          tmp20 = XML.elem("h3", {
          "class": "error-message"
          });
          tmp21 = error.name + ": ";
          tmp22 = tmp21 + error.message;
          tmp23 = runtime.safeCall(tmp20(tmp22));
          tmp24 = XML.elem("ul", {
          "class": "stack-trace"
          });
          lambda4 = (undefined, function (line) {
            let tmp32, tmp33;
            tmp32 = XML.elem("li");
            tmp33 = runtime.safeCall(line.trim());
            return runtime.safeCall(tmp32(tmp33))
          });
          tmp25 = lambda4;
          tmp26 = Iter.mapping(stackLines, tmp25);
          tmp27 = Iter.joined(tmp26, "");
          tmp28 = runtime.safeCall(tmp24(tmp27));
          tmp29 = XML.elem("style");
          tmp30 = runtime.safeCall(tmp29(Main.#errorDisplayStyle));
          tmp31 = runtime.safeCall(tmp19(tmp23, tmp28, tmp30));
          this.shadowRoot.innerHTML = tmp31;
          return runtime.Unit
        } else {
          return runtime.Unit
        }
      }
      toString() { return "ErrorDisplay"; }
    };
    globalThis.customElements.define("error-display", Main.ErrorDisplay)
  }
  static showDiagnostics(elems, diagnostics4, problematicStages) {
    let scrut, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7;
    if (globalThis.Array.isArray(diagnostics4) && diagnostics4.length === 0) {
      if (globalThis.Array.isArray(problematicStages) && problematicStages.length === 0) {
        elems.output.innerHTML = "";
        elems.text.innerHTML = "<span>Everything went smoothly, without any problems.</span>";
        return runtime.Unit
      } else {
        elems.output.innerHTML = "";
        tmp = "<span>There is no issue with typing, " + "but there are problems in: ";
        scrut = problematicStages.length > 1;
        if (scrut === true) {
          tmp1 = "s";
        } else {
          tmp1 = "";
        }
        tmp2 = tmp + tmp1;
        tmp3 = tmp2 + ": ";
        tmp4 = Iter.joined(problematicStages, ", ");
        tmp5 = tmp3 + tmp4;
        tmp6 = tmp5 + ".</span>";
        elems.text.innerHTML = tmp6;
        return runtime.Unit
      }
    } else {
      tmp7 = runtime.safeCall(diagnostics4.join("\n"));
      elems.output.innerHTML = tmp7;
      elems.text.innerHTML = "";
      return runtime.Unit
    }
  } 
  static addCollapsibleTree(element, tree) {
    let collapsibleTree, tmp;
    tmp = runtime.safeCall(globalThis.document.createElement("collapsible-tree"));
    collapsibleTree = tmp;
    collapsibleTree.textContent = tree;
    return runtime.safeCall(element.appendChild(collapsibleTree))
  } 
  static splitTestBlocks(text) {
    let blocks, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, lambda, lambda1, lambda2;
    blocks = [
      []
    ];
    tmp = runtime.safeCall(text.split("\n"));
    lambda = (undefined, function (line, index, _) {
      let scrut, scrut1, tmp6, tmp7;
      scrut = runtime.safeCall(Main.blankLinePattern.test(line));
      if (scrut === true) {
        tmp6 = blocks.length - 1;
        scrut1 = blocks[tmp6].length > 0;
        if (scrut1 === true) {
          return runtime.safeCall(blocks.push([]))
        } else {
          return runtime.Unit
        }
      } else {
        tmp7 = blocks.length - 1;
        return runtime.safeCall(blocks[tmp7].push([
          line,
          index
        ]))
      }
    });
    tmp1 = lambda;
    tmp2 = runtime.safeCall(tmp.forEach(tmp1));
    lambda1 = (undefined, function (block) {
      let tmp6, lambda3;
      lambda3 = (undefined, function (line, _, _1) {
        let tmp7, tmp8;
        tmp7 = runtime.safeCall(Main.commentLinePattern.test(line));
        tmp8 = runtime.safeCall(Main.blankLinePattern.test(line));
        return tmp7 || tmp8
      });
      tmp6 = runtime.safeCall(block.every(lambda3));
      return Predef.not(tmp6)
    });
    tmp3 = Iter.filtering(blocks, lambda1);
    lambda2 = (undefined, function (block) {
      let lines, firstLineIndex, tmp6, tmp7, lambda3;
      lambda3 = (undefined, function (line, _, _1) {
        return line[0]
      });
      tmp6 = runtime.safeCall(block.map(lambda3));
      lines = tmp6;
      firstLineIndex = block[0][1];
      tmp7 = runtime.safeCall(lines.join("\n"));
      return [
        firstLineIndex,
        tmp7
      ]
    });
    tmp4 = lambda2;
    tmp5 = Iter.mapping(tmp3, tmp4);
    return Iter.toArray(tmp5)
  } 
  static parseIndentedText(text1) {
    let root, text2, children, stack, node, indent, tmp, tmp1, tmp2, tmp3, tmp4, lambda, lambda1;
    text2 = "";
    children = [];
    root = {
    "text": text2, "children": children
    };
    node = root;
    tmp = - 1;
    indent = tmp;
    stack = [
      {
      "node": node, "indent": indent
      }
    ];
    tmp1 = runtime.safeCall(text1.split("\n"));
    lambda = (undefined, function (line) {
      let tmp5;
      tmp5 = runtime.safeCall(line.trim());
      return tmp5.length > 0
    });
    tmp2 = Iter.filtering(tmp1, lambda);
    lambda1 = (undefined, function (line) {
      let indent1, text3, scrut, newNode, text4, children1, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10;
      tmp5 = runtime.safeCall(line.match(Main.#indentRegex));
      indent1 = tmp5[1].length;
      tmp6 = runtime.safeCall(line.substring(indent1));
      text3 = tmp6;
      tmp11: while (true) {
        tmp7 = stack.length - 1;
        scrut = indent1 <= stack[tmp7].indent;
        if (scrut === true) {
          tmp8 = runtime.safeCall(stack.pop());
          continue tmp11;
        } else {
          tmp8 = runtime.Unit;
        }
        break;
      }
      text4 = text3;
      children1 = [];
      newNode = {
      "text": text4, "children": children1
      };
      tmp9 = stack.length - 1;
      tmp10 = runtime.safeCall(stack[tmp9].node.children.push(newNode));
      return runtime.safeCall(stack.push({
      "node": newNode, "indent": indent1
      }))
    });
    tmp3 = lambda1;
    tmp4 = Iter.each(tmp2, tmp3);
    return root.children
  }
  static toString() { return "Main"; }
});