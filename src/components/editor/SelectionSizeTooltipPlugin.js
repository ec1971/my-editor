import {Plugin} from "prosemirror-state"

export const selectionSizePlugin = new Plugin({
  view(editorView) { return new SelectionSizeTooltip(editorView) }
})


class SelectionSizeTooltip {
    constructor(view) {
      this.tooltip = document.createElement("span")
      this.tooltip.className = "tooltip"
      this.tooltip.textContent = 'testing content'
      view.dom.parentNode.appendChild(this.tooltip)
  
      this.update(view, null)
    }
  
    update(view, lastState) {
      let state = view.state
      // Don't do anything if the document/selection didn't change
      /*
      if (lastState && lastState.doc.eq(state.doc) &&
          lastState.selection.eq(state.selection)) return
  
      // Hide the tooltip if the selection is empty
      /*
      if (state.selection.empty) {
        this.tooltip.style.display = "none"
        return
      }
      */
  
      // Otherwise, reposition it and update its content
      this.tooltip.style.display = ""
      let {from, to} = state.selection
      let pos = state.selection.$cursor.pos;
      if(pos == 1) {
        this.tooltip.style.display = "none"
        return

      }
      // These are in screen coordinates
//      let start = view.coordsAtPos(from), end = view.coordsAtPos(to)
      let start = view.coordsAtPos(pos), end = start + 3;
      console.log(start.left)

      // The box in which the tooltip is positioned, to use as base
      let box = this.tooltip.offsetParent.getBoundingClientRect()
      // Find a center-ish x position from the selection endpoints (when
      // crossing lines, end may be more to the left)
      let left = start.left 
      this.tooltip.style.left = (start.left - box.left) + "px"
      this.tooltip.style.bottom = (box.bottom - start.bottom - 2) + "px"
      this.tooltip.textContent = `this is a dummy suggestion... the idea is to show that it's possible to mimic the visual effect of gmail style smart compose`
    }
  
    destroy() { this.tooltip.remove() }
  }