const generic = async () => {
  const URI_BASE_SWAPI = 'https://swapi.dev/api/'
  const resources = ['films', 'people', 'planets', 'species', 'starships', 'vehicles']
  const resource = resources[5]

  const data = []
  let paged = 0
  let nextResource = ''
  nextResource = `${URI_BASE_SWAPI}/${resource}`
  while (paged === 0) {
    const response = await fetch(nextResource)
    const dataResource = await response.json()
    data.push(...dataResource.results)
    if (dataResource.next) {
      nextResource = dataResource.next
    } else {
      paged = 1
    }
  }

  return {
    statusCode: 200,
    data,
  };
};

(async () => {
  const res = await generic()
  console.log(res.data.length)
  // console.log(res)
})()