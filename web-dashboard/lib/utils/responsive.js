export function isMobile(width) {
  return width < 850;
}

export function isTablet(width) {
  return width >= 850 && width < 1100;
}

export function isDesktop(width) {
  return width >= 1100;
}
