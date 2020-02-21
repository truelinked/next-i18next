
import { addSubpath } from '../../src/utils'

describe('subpathIsPresent utility function', () => {
  const subpath = 'german'

  it('test 1', () => {
    expect(addSubpath("/", subpath)).toBe("/german")
  })

  it('test 2', () => {
    expect(addSubpath("/product", subpath)).toBe("/product/german")
  })

  it('test 2', () => {
    expect(addSubpath("/product/", subpath)).toBe("/product/german")
  })

})
