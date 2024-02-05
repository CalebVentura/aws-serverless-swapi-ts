module.exports.handler = async (event) => {
  const URI_BASE_SWAPI = "https://swapi.dev/api/";
  const resource = event.pathParameters?.resource;

  const data: any[] = [];
  let paged = 0;
  let nextResource = `${URI_BASE_SWAPI}/${resource}`;

  while (paged === 0) {
    const response = await fetch(nextResource);
    const dataResource: any = await response.json();
    data.push(...dataResource.results);
    if (dataResource.next) {
      nextResource = dataResource.next;
    } else {
      paged = 1;
    }
  }

  return {
    status: 200,
    message: "Datos de SWAPI extraidos correctamente",
    data,
  };
};
