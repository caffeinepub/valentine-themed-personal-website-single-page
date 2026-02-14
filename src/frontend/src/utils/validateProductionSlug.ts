/**
 * Validates a production slug for deployment.
 * 
 * @param slug - The slug to validate
 * @returns An object with `valid` boolean and `error` message (empty if valid)
 */
export function validateProductionSlug(slug: string | undefined): {
  valid: boolean;
  error: string;
} {
  if (!slug || slug.trim() === '') {
    return {
      valid: false,
      error: 'Production slug is required. It must be 5–50 characters and contain only letters, numbers, and hyphens.',
    };
  }

  const trimmedSlug = slug.trim();

  // Check length
  if (trimmedSlug.length < 5 || trimmedSlug.length > 50) {
    return {
      valid: false,
      error: 'Production slug must be 5–50 characters and contain only letters, numbers, and hyphens.',
    };
  }

  // Check allowed characters (letters, numbers, hyphens only)
  const validPattern = /^[a-zA-Z0-9-]+$/;
  if (!validPattern.test(trimmedSlug)) {
    return {
      valid: false,
      error: 'Production slug must be 5–50 characters and contain only letters, numbers, and hyphens.',
    };
  }

  return {
    valid: true,
    error: '',
  };
}
