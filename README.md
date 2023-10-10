# Fetch interceptor


Implements interceptors for requests and response from a fetch request.

## Usage

```typescript
const request = new FetchInterceptor();

// create a request interceptor
// example usage: maybe you want to modify headers before the request is sent
request.useRequestInterceptor((url, config) => {
  console.log("Intercepted request to: ", url)
  return [url, config];
});

// create response interceptor
// example usage: transform data to camelCase or error handling
request.useResponseInterceptor(async (response) => {
  if (!response.ok ) {
    throw new Error("Network response was not ok");
  }

  const data = await response.clone().json();
  let modifiedData;
  if (Array.isArray(data)) {
    modifiedData = data.map(x => ({title: x.title, intercepted: "xxxx"}))
  } else {
     modifiedData = {title: data.title, intercepted: "xxxx"}
  }
 
  const modifiedResponse = new Response(JSON.stringify(modifiedData), {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });

  
  console.log('Intercepted and modified response');
  return modifiedResponse;
});


request.fetch('https://jsonplaceholder.typicode.com/todos/2')
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(error => console.log('Fetch Error', error));
```


