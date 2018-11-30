class API {
  constructor(url, resource) {
    this.baseUrl = url
    this.resourcePath = "/" + resource
  }

  request(url, type, data) {
    let request = {}
    switch(type) {
      case 'POST':
      request = {
        method: type,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      }
      break
      case 'PATCH':
      request = {
        method: type,
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      }
      break
      case 'DELETE':
      request = {
        method: type
      }
      break
      default:
      request = {
        method: 'GET'
      }
    }
    return fetch(url, request)
      .then(resp => resp.json())
  }
  
  all() {
    return this.request(this.baseUrl + this.resourcePath)
  }

  get(dataToGet) {
    return this.request(this.baseUrl + this.resourcePath + "/" + dataToGet)
  }

  create(dataToCreate) {
    return this.request(this.baseUrl + this.resourcePath, 'POST', dataToCreate)
  }

  update(dataToUpdate, attrToUpdate) {
    return this.request(this.baseUrl + this.resourcePath + "/" + dataToUpdate, 'PATCH', attrToUpdate)
  }

  delete(dataToDelete) {
    return this.request(this.baseUrl + this.resourcePath + "/" + dataToDelete, 'DELETE')
  }
}
