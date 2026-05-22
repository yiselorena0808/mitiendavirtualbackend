import betterSqlite from 'better-sqlite3'

const db = betterSqlite('tmp/db.sqlite3')

// Update Products
const products = db.prepare("SELECT id, image_url FROM products WHERE image_url LIKE '%/api/uploads/%'").all()
const updateProduct = db.prepare('UPDATE products SET image_url = ? WHERE id = ?')

for (const p of products) {
  const newUrl = p.image_url.replace('/api/uploads/', '/uploads/')
  updateProduct.run(newUrl, p.id)
}
console.log(`Updated ${products.length} products.`)

// Update Stores (logo_url and banner_url)
const stores = db.prepare("SELECT id, logo_url, banner_url FROM stores WHERE logo_url LIKE '%/api/uploads/%' OR banner_url LIKE '%/api/uploads/%'").all()
const updateStore = db.prepare('UPDATE stores SET logo_url = ?, banner_url = ? WHERE id = ?')

for (const s of stores) {
  const newLogo = s.logo_url ? s.logo_url.replace('/api/uploads/', '/uploads/') : null
  const newBanner = s.banner_url ? s.banner_url.replace('/api/uploads/', '/uploads/') : null
  updateStore.run(newLogo, newBanner, s.id)
}
console.log(`Updated ${stores.length} stores.`)

db.close()
