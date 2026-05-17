const KEY = 'anime_items'

export function getItems() {
  return JSON.parse(localStorage.getItem(KEY) || '[]')
}

export function saveItems(items) {
  localStorage.setItem(KEY, JSON.stringify(items))
}
