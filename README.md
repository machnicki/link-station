# Best link station
I have done challenge in 3 stages. [Third stage](#fullstack-serverless-solution) is final solution, ready to review.

In [first stage](#algorithm) I was looking for optimal algorithm (https://jsfiddle.net/h4des/ptfu9v02/1/), in [second stage](#client-application) I have built Single Page Application with better organized code and some unit tests (https://codesandbox.io/s/flamboyant-oskar-iy5mr) and in [third stage](#fullstack-serverless-solution) (which is final solution and part of this repo) I have split logic between frontend and backend, introduced classes in place of function based logic + add built scripts and deployment into AWS cloud (http://link-station.s3-website.eu-north-1.amazonaws.com).

Each step is described below. 

There are some areas which I could improve if would have more time (mentioned in [What could be done next](#what-could-be-done-next)). 


## Algorithm
https://jsfiddle.net/h4des/ptfu9v02/1/

In my solution I am making only one iteration through stations data - `O(N) complexity` and keeping reference only to best station - optimal for memory (`O(1)`).

This link is just for better understanding how my algorithm works. I have organized it and build proper architecture for applications in examples below.

### What I would improve in algorithm based on different scenarios
- A lot of data to loop through - it this scenario I would split data into chunks - find highest power in each chunk in parallel and compare them (similar to merge sort algorithm). Size of chunks would depend on environment - for client / monolith app I would split into 4 chunks (or optimal number of threads). In serverless approach I would build event driven solution and split data into chunks based on optimal number of data in chunk.
- A lot of requests with the same body - it this scenario I would provide caching layer (functions memoization).

## Client application
https://codesandbox.io/s/flamboyant-oskar-iy5mr?file=/src/linkStation/findBestLinkStation.ts

Whole logic is on the client side. On the left menu you can checkout between files. On right you should be able to see browser view and tests.

## Fullstack serverless solution
http://link-station.s3-website.eu-north-1.amazonaws.com

Application in this repo. This is final solution, ready to review.

Link station logic has been moved from client to serverless API. I have introduced 2 classes: `LinkStation` and `Device`.

You can also run it locally.

### Project structure and workflow
There are 2 separate applications - React frontend in `client` folder, and serverless backend in `api` folder.

Thanks to yarn workspaces client can import some code (types definitions) from api.

#### React app
Main component is `app.tsx` where is defined list of devices as coordinates to test. After click on element, client will make GET request to API in format `{API_BASE_URL}/best-link-station?coordinates=${X},${Y}` and render response on the right side of the list (`results.tsx`).

#### Serverless app
API codes structure is split into 4 directories:
```
handlers - Serverless wrappers for services
services - invoke logic to deliver response for requested data (controller layer)
models - LinkStation and Device classes
utils - generic code which can be reused in other places
```

### Run locally
Run `yarn` in main directory. Next in 2 separate terminals run: 
```
cd api
yarn start
```
and
```
cd client
yarn start
```
Your browser should open http://localhost:3000 with backend running on port 4000.

### Deploy
Both projects have `yarn deploy` scripts. You should be able to deploy API into another AWS account if you have set AWS credentials locally. To deploy client you will need create S3 bucket as static page server (in AWS console) and change some hardcoded data (`API_URL` in client/src/config.tsx and `3BucketName` in client/deploy.js).

Client is build and deploy to S3, API is deployed as CloudFormation stack (Serverless framework). 

## What could be done next
  * Increase test coverage
  * Caching layer for API service
  * Handle large sets of data (event driven, parallel requests)
  * and more - happy to talk at next stage


