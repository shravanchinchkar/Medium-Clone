
export function getInitialLetters(name: string): string {
  // Split the name by spaces
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    // If there's only one name, return the first character
    return parts[0].charAt(0).toUpperCase();
  } else if (parts.length >= 2) {
    // If there are multiple names, get the first and last name's initials
    const firstInitial = parts[0].charAt(0).toUpperCase();
    const lastInitial = parts[parts.length - 1].charAt(0).toUpperCase();
    // console.log(`Cooked Initailas are: ${firstInitial} ${lastInitial}`)
    return `${firstInitial}${lastInitial}`;
  }
  return "";
}
