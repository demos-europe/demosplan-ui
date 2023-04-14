/**
 * Used in js/vue context to check for exposedPermissions
 * For one Permission
 *
 * @param permission String
 *
 * @return {boolean}
 */
function hasPermission (permission) {
  return !!dplan.permissions[permission]
}

/**
 * Used in js/vue context to check for exposedPermissions
 * Check if at least one permission is exposed and true
 *
 * @param permissions Array
 *
 * @return {boolean}
 */
function hasAnyPermissions (permissions) {
  if (Array.isArray(permissions) === false) {
    throw new Error('Typeof "permissions" is not an Array')
  }
  return permissions.some(el => !!dplan.permissions[el])
}

/**
 * Used in js/vue context to check for exposedPermissions
 * Check if at all permissions are exposed and true
 *
 * @param permissions Array
 *
 * @return {boolean}
 */
function hasAllPermissions (permissions) {
  if (Array.isArray(permissions) === false) {
    throw new Error('Typeof "permissions" is not an Array')
  }
  return permissions.every(el => !!dplan.permissions[el])
}

export { hasPermission, hasAllPermissions, hasAnyPermissions }
