# spy-react

&#128679; modules are unpublished

Spy is a monitoring library for react applications.

## Features
* lifecycle event monitoring
* custom methods triggered by dom events
* heat map
* performance metrics

## spyOpts

SpyOptions (spyOpts) is a configuration class that initializes a Websocket
connection between your application and spy-node.

Add the spyOpts decorator to a component at the root of your application.
``` js
  @spyOpts({ ...config })
  class App extends Component {
    ...
  }
```

## spy
Monitor all instances of a react component by adding a `@spy` annotation.
``` js
  @spy
  class Compy extends Component {
    ...
  }
```

## example usage

&#128679; modules are unpublished
g
1. install spy-node
``` js
  npm install spy-node -g
```

2. install spy-react
``` js
  npm install spy-react --save-dev
```
3. run spy-node default port is 8082
``` js
spy-node
```
4. add the spyOpts decorator to the root of your application
5. add spy decorators to class components you to monitor
6. run your application in development mode
