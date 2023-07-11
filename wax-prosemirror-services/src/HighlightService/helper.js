export function getNearestNodeOfSelectedText(selector) {
    // Get the selected text
    const selectedText = window.getSelection().toString();
  
    if (selectedText) {
      // Get the range of the selection
      const range = window.getSelection().getRangeAt(0);
  
      // Get the common ancestor node of the selection
      const commonAncestorNode = range.commonAncestorContainer;
  
      // Traverse up the DOM tree to find the nearest element node matching the selector
      let nearestElementNode = commonAncestorNode.nodeType === Node.ELEMENT_NODE
        ? commonAncestorNode
        : commonAncestorNode.parentNode;
  
      while (nearestElementNode && !nearestElementNode.matches(selector)) {
        nearestElementNode = nearestElementNode.closest(selector);
      }
  
      // Return the nearest element node matching the selector
      return nearestElementNode;
    }
  
    return null;
  }