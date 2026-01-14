interface FormatNameProps {
  firstName?: string;
  lastName?: string;
}

function formatName(person: FormatNameProps): string {
  if (!person) return '';

  const name = `${person.firstName} ${person.lastName}`;

  return name;
}

export default formatName;
