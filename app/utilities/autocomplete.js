function autocomplete(input, latInput, lngInput) {
  if (!input) return;
  console.log(input);
  const dropdown = new google.maps.places.Autocomplete(input);
}

export default autocomplete;