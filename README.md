react-backbone
==============
Connect [React](http://facebook.github.io/react/) to [React](http://facebook.github.io/react/) using a suite of focused mixins.

React mixins have the ability to add very tight integration between Backbone.Views with React components.

Most other projects of this nature just provide a single mixin which caused the React component to refresh if the associated model or collection has changed.  This project goes *much* further by isolating many different functions into unique plugins giving the developer the ability to include only the appropriate behaviors to their components.

A set of low level input components which are model-aware are included as well.  These components allow you so simply supply a ```ref``` and ```model``` property to show the correct value.

Since this project uses [jhudson8/react-mixin-manager](https://github.com/jhudson8/react-mixin-manager), a few or all of these mixins can be grouped together so they can be treated as a single mixin.  In addition, they can be easily referenced using their alias:

```
React.createClass({
  mixins: ['modelChangeAware']
})
```

[View the fancydocs](http://jhudson8.github.io/fancydocs/index.html#project/jhudson8/react-backbone)


Dependencies
--------------
* [React](http://facebook.github.io/react/)
* [Backbone](http://backbonejs.org/)
* [jhudson8/react-mixin-manager](https://github.com/jhudson8/react-mixin-manager) (>= 0.6.0, optional)
* [jhudson8/backbone-async-event](https://github.com/jhudson8/backbone-async-event) (optional)
* [jhudson8/react-events](https://github.com/jhudson8/react-events) (>= 0.4.1, optional)


API: Input Components
-------------
Low level backbone model-aware input components are provided.  These will

* set the appropriate value if the model and (ref or key) property are defined
* work with modelPopulate mixin to populate the attributes with the correct UI value

This simple example shows how to use these components to get and set the model appropriately

```
    var Text = Backbone.input.Text;
    var TextArea = Backbone.input.TextArea;
    var Select = Backbone.input.Select;
    var CheckBox = Backbone.input.CheckBox;
    var RadioGroup = Backbone.input.RadioGroup;

    module.exports = React.createClass({
      mixins: ['modelPopulate'],

      getDefaultProps: function() {
        var model = new Backbone.Model({
          isBoy: true,
          firstName: 'John',
          lastName: 'Doe',
          hairColor: 'blonde',
          eyeColor: 'brown'
        });
        return {
          model: model
        };
      },

      render: function() {

        // the "getModel" method exists because the "modelPopulate" depends on the "modelAware" mixin which contains this method
        var model = this.getModel();

        return (
          <form onSubmit={this.onSubmit}>
            Name:
            <Text ref="name" model={model}/>
            <br/>

            Summary:
            <TextArea ref="summary" model={model}/>
            <br/>

            Accept Terms and Conditions?:
            <CheckBox ref="acceptTOC" model={model}/>
            <br/>

            Hair Color:
            <Select ref="hairColor" model={model}>
              <option value="black">black</option>
              <option value="blonde">blonde</option>
              <option value="brown">brown</option>
            </Select>
            <br/>

            Eye Color:
            <RadioGroup ref="eyeColor" model={model}>
              <input type="radio" name="eyeColor" value="blue"/> blue
              <input type="radio" name="eyeColor" value="brown"/> brown
              <input type="radio" name="eyeColor" value="green"/> green
            </RadioGroup>
            <br/>

            <button>Submit</button>
          </form>
        );
      },

      onSubmit: function(event) {
        event.preventDefault();
        var model = this.getModel();

        // the "modelPopulate" method exists because we included the "modelPopulate" mixin
        this.modelPopulate(function(model) {
          // if this callback fires, all inputs (identified with a ref) set the appropriate values on the model,
          // and the model validation passed
          console.log(model);
        });
      }
    });
```

*note: these components can still be set (will override model values) just like their wrapped components (```value``` and ```defaultValue```) and all other properties will be pushed through as well```

### Backbone.input

#### Text ()
A model-aware component that is a very light wrapper around *React.DOM.input*.  The *type* attribute is *text* by default but will be overridden if the *type* property is defined.  This component will initialize with the correct default value from the provided model as well as participate in the *modelPopulate* mixin.

Nested content is N/A.

##### Example

```
    var Text = Backbone.input.Text;
    ...
    // assuming a model attribute "age" exists
    <Text type="number" ref="age" model={model}/>
```

#### TextArea
A model-aware component that is a very light wrapper around *React.DOM.textarea*.  This component will initialize with the correct default value from the provided model as well as participate in the *modelPopulate* mixin.

##### Example
```
    var TextArea = Backbone.input.TextArea;
    ...
    // assuming a model attribute "description" exists
    <TextArea type="number" ref="description" model={model}/>
```

#### CheckBox
A model-aware component that is a very light wrapper around *React.DOM.input* (type=checkbox).  This component will initialize with the correct default value from the provided model as well as participate in the *modelPopulate* mixin.  The *value* property is not required (true/false) will be used but if the *value* property is specified, that value will be set on the model in the checked case.

##### Example
```
    var CheckBox = Backbone.input.CheckBox;
    ...
    // assuming a model attribute "acceptTermsOfService" exists
    <CheckBox ref="acceptTermsOfService" model={model}/>
```

#### Select
A model-aware component that is a very light wrapper around *React.DOM.select*.  This component will initialize with the correct default value from the provided model as well as participate in the *modelPopulate* mixin.

##### Example
```
    var Select = Backbone.input.Select;
    ...
    // assuming a model attribute "eyeColor" exists
    <Select ref="eyeColor" model={model}>
      <option value="blue">blue</option>
      <option value="green">green</option>
      <option value="brown">brown</option>
    </Select>
```

#### RadioGroup
A model-aware component that should contain one or *React.DOM.input* (type=radio).  This component will initialize with the correct default value from the provided model as well as participate in the *modelPopulate* mixin.

*note: this component does not create the radio buttons for you - it is only a wrapper for nested content provided by you to expose the functions necessary for getting and setting model values.*

##### Example
```
    var RadioGroup = Backbone.input.RadioGroup;
    ...
    // assuming a model attribute "eyeColor" exists
    <RadioGroup ref="eyeColor" model={model}>
      <input type="radio" value="blue"/> blue
      <input type="radio" value="green"> green
      <input type="radio" value="brown"> brown
    </RadioGroup>
```


API: Mixins
--------------
These mixins can be referenced by their alias (see mixin examples) because they are registered using [jhudson8/react-mixin-manager](https://github.com/jhudson8/react-mixin-manager).


### modelAware

Utility methods which allows other mixins to depend on ```getModel``` and ```setModel``` methods.  This provides an single overridable mixin should you have non-standard model population requirements.

#### getModel()
*return the model associated with the current React component.*

The model can be set using the ```model``` property or by explicitely calling ```setModel```.

##### Examples

```
    React.createClass({
      mixins: ['modelAware']
    });
    ...
    <MyClass ref="myClass" model={model} key="foo"/>
    ...
    var model = this.refs.myClass.getModel();
```

#### setModel(model)
* ***model***: the Backbone model to set

Associate the model with the current React component which can be retrieved using ```getModel```


### modelValueAware
*depends on modelAware*

Utility methods to get and set the model value for a specific attribute key.  This can be used by input components for example so the model attribute key can be abstracted away.

The ```key``` or ```ref``` attribute are used to specify the model key.  In addition, the component using this mixin can supply the key (see examples).

##### Examples

*allow the parent to set the "key" or "ref" model key attribute using the *key* or *ref* property
```
    var MyComponent = React.createClass({
      mixins: ['modelValueAware']
    });
    ...
    new MyComponent({ref: 'foo'});

```

*allow the component to provide the model key attribute*
```
    var MyComponent = React.createClass({
      mixins: ['modelValueAware("foo")']
    });
```

#### getModelValue()

*returns the value from the model bound to the current React component (see ```modelAware```) using the appropriate attribute key (see ```modelValueAware```).*


#### setModelValue(value)
* ***value***: the model value to set

*returns true if the model was set successfully and false otherwise*

Set the value on the model bound to the current React component (see ```modelAware```) using the appropriate attribute key (see ```modelValueAware```).


### modelPopulate
*depends on modelAware*

Utility mixin used to iterate child components and have their associated model value be set on the parent component model.

#### modelPopulate (componentArray[, callback, options]) (callback[, options])
* componentArray: the array of components to iterate.  If falsy, all child components that contain a ```ref``` attribute will be used
* callback: the callback that will be executed ***only if*** the model passed validation when the attributes were set.  If provided, the model will be set automatically.
* options: the model set options (Backbone.Model.set options parameter)

*returns the attribute values*

Iterate child (or provided) components and have each component set it's ***UI*** input value on the model attributes.
Components will only participate in model population if they implement ***getUIModelValue*** to return the value that should be set on the model.

The difference between ***getModelValue*** and ***getUIModelValue*** is

* ***getModelValue*** is an abstraction so a component can get it's own model value without knowning how it is retrieved
* ***getUIModelValue*** is a method used by external components to see what value has been set in the UI exposed by the component

##### Examples

```
    // use this.refs automatically to get the components that will populate the model
    this.modelPopulate(function(model) {
      // assuming the model validation passed, this callback will be executed
    });

    // or for more control
    var attributes = this.modelPopulate();

    // or for even more control
    var attributes = this.modelPopulate(specificComponentsToCheck);
```


### modelEventAware
*depends on modelAware*

Utility mixin to expose managed model binding functions which are cleaned up when the component is unmounted.

This can also be achieved using declarative events with [jhudson8/react-events](https://github.com/jhudson8/react-events)

##### Example
```
    var MyClass React.createClass({
      mixins: ['modelEventAware'],
      getInitialState: function() {
        this.modelOn('change', this.onChange);
        return null;
      },
      onChange: function() { ... }
    });
```

#### modelOn(eventName, callback[, context])
* ***eventName***: the event name
* ***callback***: the event callback function
* ***context***: the callback context

Equivalent to Backbone.Events.on but will be unbound when the component is unmounted.


#### modelOnce(eventName, callback[, context])
* ***eventName***: the event name
* ***callback***: the event callback function
* ***context***: the callback context

Equivalent to Backbone.Events.once but will be unbound when the component is unmounted.


#### modelOff(eventName, callback[, context])
* ***eventName***: the event name
* ***callback***: the event callback function
* ***context***: the callback context

Equivalent to Backbone.Events.off for events registered using this mixin.


### modelIndexErrors
Utility mixin to allow components to handle model validation error responses (used by the ```modelValidator``` mixin)

#### modelIndexErrors(errors)
* ***errors***: errors returned from the Backbone.Model.set ```invalid``` event

*return errors in the format of ```{ field1Key: errorMessage, field2Key: errorMessage, ... }```*

The expected input of the error object is ```[{field1Key: message}, {field2Key: message}, ...]```


### modelValidator
*depends on modelAware*

#### modelValidate(attributes, options)
* ***attributes***: the model attributes
* ***options***: the set options

*return the response from the model's validate method*

Call the associated model's validate method


### modelInvalidAware
*depends on modelEventAware, modelIndexErrors*

Allow components to be aware of field specific validation errors.

Listen for attribute specific model ```invalid``` events.  When these occur, normalize the error payload using the ```modelIndexErrors``` method from the ```modelIndexErrors``` mixin and set the components ```error``` state attribute with the normalized error value.

##### Example

```
    var MyClass React.createClass({
      mixins: ['modelInvalidAware'],
      render: function() {
        var error = this.state.error;
        if (error) {
          return 'Error: ' + error;
        } else {
          return 'No error';
        }
      }
    });
```


### modelChangeAware
*depends on modelEventAware*

Will force a render if the associated model has changed.  The "change" events are for models or collections and include

* change
* reset
* add
* remove
* sort

If you want to force a render only on specific model events, see *modelUpdateOn*.


### modelUpdateOn
*depends on modelEventAware*

Listen to a specific event (or array of events).  When this event is fired, the component will be force updated.  The events to listen for are defined as the ```updateOn``` component property which can be an array or array of strings.  In addition, the declaring component can define the keys using parameters (see examples);

##### Examples

*when a parent component provides the event name(s) as the ```updateOn``` parameter*
```
    var MyComponent = React.createClass({
      mixins: ['modelUpdateOn'],
      ...
    });
    ...
    new MyComponent({updateOn: 'foo'});
    // or
    new MyComponent({updateOn: ['foo', 'bar']});
```

* when the child/declaring component provides the event name(s) as mixin parameters*
```
    var MyComponent = React.createClass({
      mixins: ['modelUpdateOn("foo", "bar")'],
      ...
    });
```


### modelLoadOn
*depends on [jhudson8/backbone-async-event](https://github.com/jhudson8/backbone-async-event)*

Gives any comonent the ability to listen to a specific async event(s).

See the docs in [jhudson8/backbone-async-event](https://github.com/jhudson8/backbone-async-event) for more details on the async events.

When this event is fired, the state attribute ```loading``` will be set to ```true```.  state.loading will be set to false when the async event is complete.

Use the ```loadOn``` property to define the specific async event name to bind to.  In addition, the declaring component can define the event names using parameters (see examples).

##### Examples

*when a parent component provides the event names as the ```modelLoadOn``` parameter*
```
    var MyComponent = React.createClass({
      mixins: ['modelLoadOn'],
      render: function() {
        if (this.state.loading) {
          ...
        } else {
          ...
        }
      }
    });
    ...
    new MyComponent({loadOn: 'read'});
    // or
    new MyComponent({updateOn: ['read', 'update']});
```

*when a child/declaring component provides the event names as mixin parameters*
```
    var MyComponent = React.createClass({
      mixins: ['modelUpdateOn("read", "update")'],
      ...
    });
```


### modelAsyncAware
*depends on [jhudson8/backbone-async-event](https://github.com/jhudson8/backbone-async-event)*

Gives any comonent the ability to listen to ***all*** async events.

See the docs in [jhudson8/backbone-async-event](https://github.com/jhudson8/backbone-async-event) for more details on the async events.

When ***any*** async event is fired, the state attribute ```loading``` will be set to ```true```.  state.loading will be set to false when the async event is complete.

```
    render: function() {
      if (this.state.loading) {
        // return something if we are loading
      } else {
        // return something if we are not loading
      }
    }
```


Sections
--------

### Installation
* Browser: include *react-backbone[.min].js* after the listed dependencies
* CommonJS: ```require('react-backbone')(require('react'), require('backbone'));```


### Declaritive Model Event

In addition to providing mixins which give Backbone awareness to React components, declaritive model events are made available similar to the ```events``` hash in Backbone.View.

Model events can be defined using the ```model:``` prefix.

For example, by including the ```events``` mixin, you can do this:

```
    React.createClass({
      mixins: ['events'],
      events: {
        'model:some-event': 'onSomeEvent',
        // will bind to a specific model set as "foo" on this.props or this.refs
        'model[foo]:some-event': 'onFooSomeEvent'
      },
      ...
    });
```
In addition, Backbone.Events methods can be used on your component so your component allowing it to trigger events.

This requires [react-events](https://github.com/jhudson8/react-events) to be included.


### Event Callback Wrappers

The following event callback wrappers are implemented (see [react-events](https://github.com/jhudson8/react-events)  for more details)

* memoize
* delay
* defer
* throttle
* debounce
* once

For example
```
    events: {
      '*throttle(300):window:resize': 'forceUpdate'
    }
```

