# spy-react

&#128679; modules are unpublished

Spy is a monitoring library for react applications.

## Planned Features
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
