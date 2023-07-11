export function clearSelection() {
    if (window.getSelection) {
        // Get the current selection
        var selection = window.getSelection();

        // Check if there is any selection
        if (selection.rangeCount > 0) {
            // Clear the selection
            selection.removeAllRanges();
        }
    }
}