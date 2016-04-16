export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';
export const GET = 'GET';

export function constructRequest(state, urlPath, method, body){
  if (/^\//.test(urlPath)) {urlPath = urlPath.substr(1);}
  var opts = {
      method:method || GET,
      headers:{['sessionkey'] : state.auth.sessionKey,
               ['accept'] : 'application/json'}
  };

  if (body){
      opts.body = JSON.stringify(body);
      opts.headers['content-type'] = 'application/json'
  }
  return new Request(`http://crale.ddns.net:3000/${urlPath}`, opts);
}

export function checkStatus (response) {
  if (response.status === 200 || response.status === 204 || response.status === 304) {
    return response;
  } else {
  	var error = new Error(response.status); 
    error.response = response;
    throw error;
  }
}
export function checkAccepted (response) {
  if (response.status == 202) {
    return response;
  } else {
  	var error = new Error(response.status); 
    error.response = response;
    throw error;
  }
}

export function checkCreated (response) {
  if (response.status == 201 || response.status == 204) {
    return response;
  } else {
  	var error = new Error(response.status);
    error.response = response;
    throw error;
  }
}

export function parseBody (response) {
   return response.json();
}