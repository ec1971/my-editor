import {Plugin} from "prosemirror-state";
import {Decoration, DecorationSet} from "prosemirror-view";

function lintDeco({doc, selection}) {
    /*
    let decos = []
    console.log(selection)
    
    if(selection){
        let pos = selection.$cursor.pos;
        console.log(pos)
        decos.push(Decoration.widget(pos,  lintIcon()));
        console.log(decos)

    }
    let sets = DecorationSet.create(doc, decos)
    console.log(sets)
    */
    return undefined;
  }
  
  function lintIcon() {
    let icon = document.createElement("span");
    icon.className = "lint-icon";
    icon.textContent = 'noop';
    return icon;
  }


export const suggestionPlugin = new Plugin({
    state: {
      init(_, state) { return lintDeco(state) },
      apply(tr, oldState, newState) { return tr.docChanged ? lintDeco(newState): oldState }
      
    },
    props: {
      decorations(state) { return this.getState(state) },
    }
    
  })