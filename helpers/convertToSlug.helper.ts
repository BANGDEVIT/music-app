import unidecode from 'unidecode';

export const convertToSlug = (text : string): string =>{
  const slug = unidecode(text).toLowerCase().replace(/\s+/g, '-');
  console.log(slug);
  return slug;
}