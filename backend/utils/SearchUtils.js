/**
 * Simple search function to filter items based on a search term.
 * @param {Array} items - Array of items to search through.
 * @param {string} term - Search term.
 * @returns {Array} Filtered items that match the search term.
 */


export function searchItems(items, term) {
    if (!term) return items;
  
    // Convert search term to lower case for case-insensitive matching
    const lowerCaseTerm = term.toLowerCase();
  
    // Filter items that include the search term
    return items.filter((item) =>
      item.toLowerCase().includes(lowerCaseTerm)
    );
  }
  