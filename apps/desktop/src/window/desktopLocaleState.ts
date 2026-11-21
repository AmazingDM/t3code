let currentDesktopIsZh = false;

export function getDesktopIsZh(): boolean {
  return currentDesktopIsZh;
}

export function setDesktopIsZh(value: boolean): void {
  currentDesktopIsZh = value;
}
