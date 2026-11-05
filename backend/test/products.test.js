import test from 'node:test';
import assert from 'node:assert';
import { PRODUCTS, LOOKBOOK_ITEMS, PROMOS } from '../src/data/products.js';

test('Products dataset is populated', () => {
  assert.ok(Array.isArray(PRODUCTS), 'PRODUCTS should be an array');
  assert.strictEqual(PRODUCTS.length, 12, 'Expected 12 curated streetwear products');
});

test('Every product has required e-commerce properties', () => {
  for (const product of PRODUCTS) {
    assert.ok(product.id, `Product missing id: ${JSON.stringify(product)}`);
    assert.ok(product.name, `Product missing name: ${product.id}`);
    assert.ok(product.price > 0, `Product price must be greater than 0: ${product.id}`);
    assert.ok(product.category, `Product missing category: ${product.id}`);
    assert.ok(product.vibe, `Product missing vibe: ${product.id}`);
    assert.ok(Array.isArray(product.images) && product.images.length > 0, `Product missing images: ${product.id}`);
    assert.ok(Array.isArray(product.sizes) && product.sizes.length > 0, `Product missing sizes: ${product.id}`);
  }
});

test('Promo codes are valid and properly structured', () => {
  assert.ok(PROMOS.NOCAP, 'NOCAP promo must exist');
  assert.strictEqual(PROMOS.NOCAP.discountPercent, 20, 'NOCAP should give 20% discount');
  assert.ok(PROMOS.GENZ10, 'GENZ10 promo must exist');
});

test('Lookbook has valid community creator fits', () => {
  assert.ok(Array.isArray(LOOKBOOK_ITEMS), 'LOOKBOOK_ITEMS should be an array');
  assert.ok(LOOKBOOK_ITEMS.length > 0, 'LOOKBOOK_ITEMS should not be empty');
  for (const item of LOOKBOOK_ITEMS) {
    assert.ok(item.handle.startsWith('@'), 'Creator handle must start with @');
    assert.ok(item.taggedProductIds.length > 0, 'Must have tagged products');
  }
});
