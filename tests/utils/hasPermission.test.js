import { hasAllPermissions, hasAnyPermissions, hasPermission } from '~/utils/hasPermission'

window.dplan = {
  permissions: {
    myPermission: true,
    notMyPermission: false,
    someOtherPermission: true,
    andICanAccessEverything: true,
    youShallNotPass: false
  }
}

describe.each([
  { permission: 'myPermission', result: true },
  { permission: undefined, result: false },
  { permission: null, result: false },
  { permission: 'notIntheList', result: false },
  { permission: ['myPermission'], result: true },
  { permission: ['myPermission', 'someOtherPermission'], result: false },
])('hasPermission - check access rights for one permission', ({ permission, result }) => {
  test(`returns ${result} for testcase with prop ${permission}`, () => {
    expect(hasPermission(permission)).toBe(result)
  })
})

describe.each([
  { permission: ['myPermission', 'notHere', 'andNothingHere'], result: true },
  { permission: ['myPermission', 'andICanAccessEverything', 'someOtherPermission'], result: true },
  { permission: ['youShallNotPass', 'notMyPermission'], result: false },
])('hasPermission - check any access rights', ({ permission, result }) => {
  test(`returns '${result}' for testcase with prop '${permission}'`, () => {
    expect(hasAnyPermissions(permission)).toBe(result)
  })
})

describe.each([
  { permission: null, result: 'error' },
  { permission: undefined, result: 'error' },
])('hasPermission - check any access rights', ({ permission }) => {
  test(`returns 'Error' for testcase with '${permission}'`, () => {
    expect(() => hasAnyPermissions(permission)).toThrowError('Typeof "permissions" is not an Array')
  })
})

describe.each([
  { permission: ['myPermission', 'notHere', 'andNothingHere'], result: false },
  { permission: ['myPermission', 'andICanAccessEverything', 'someOtherPermission'], result: true },
  { permission: ['youShallNotPass', 'notMyPermission'], result: false },
])('hasPermission - check all access rights', ({ permission, result }) => {
  test(`returns '${result}' for testcase with prop '${permission}'`, () => {
    expect(hasAllPermissions(permission)).toBe(result)
  })
})

describe.each([
  { permission: null, result: 'error' },
  { permission: undefined, result: 'error' },
])('hasPermission - check all access rights', ({ permission }) => {
  test(`returns 'Error' for testcase with '${permission}'`, () => {
    expect(() => hasAllPermissions(permission)).toThrowError('Typeof "permissions" is not an Array')
  })
})
