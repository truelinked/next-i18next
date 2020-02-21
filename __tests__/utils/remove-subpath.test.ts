import { removeSubpath } from '../../src/utils'

describe('subpathFromLng utility function', () => {
  const subpath = '/de'

  it('root', () => {
    expect(removeSubpath('/' + subpath, subpath)).toBe('')
  })

  it('returns unchanged string if subpath is not present', () => {
    expect(removeSubpath('/product', subpath)).toBe('/product')
  })

  it('removes subpath if present', () => {
    expect(removeSubpath('/de/product', subpath)).toBe('/de/product')
  })

  it('removes subpath if present', () => {
    expect(removeSubpath('/product/de', subpath)).toBe('/product')
  })

  it('is agnostic of trailing slash on subpath if present', () => {
    expect(removeSubpath('/de/product/', subpath)).toBe('/de/product/')
  })

  it('is agnostic of trailing slash on subpath if present', () => {
    expect(removeSubpath('/product/de/', subpath)).toBe('/product/')
  })

  it('retains query string on subpath if present', () => {
    expect(removeSubpath('/de/product?hello=world', subpath)).toBe('/de/product?hello=world')
  })

  it('retains query string on subpath if present', () => {
    expect(removeSubpath('/product/de?hello=world', subpath)).toBe('/product?hello=world')
  })

  it('removes only the first occurrence if present', () => {
    expect(removeSubpath('/de/de/product', subpath)).toBe('/de/de/product')
  })

  it('removes only the first occurrence if present', () => {
    expect(removeSubpath('/product/de/de', subpath)).toBe('/product/de')
  })

  it('removes only the first occurrence if present', () => {
    expect(removeSubpath('/product/de/de/', subpath)).toBe('/product/de/')
  })

})
