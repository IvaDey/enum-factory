<p style="text-align: center" align="center">
 <img src="https://i.postimg.cc/HnHxn1Sd/Enum-factory-logo.png" height="120" alt="Enum Factory logo"/>
</p>

<h1 style="text-align: center" align="center">Enum Factory</h1>

<div style="text-align: center" align="center">

![Version](https://img.shields.io/npm/v/@ivadey/enum-factory)
![TypeScript](https://img.shields.io/npm/types/@ivadey/enum-factory)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](./LICENSE)
[![Open Issues](https://img.shields.io/github/issues/IvaDey/enum-factory)](https://github.com/IvaDey/enum-factory/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](CONTRIBUTING.md)
![Tests status](https://img.shields.io/github/actions/workflow/status/ivadey/enum-factory/test.yml?label=tests)
![Coverage](https://img.shields.io/codecov/c/github/IvaDey/enum-factory)

</div>

**Enum Factory** – is a small, zero-dependency library for creating flexible, extensible and type-safe class-based enums in TypeScript. It overcomes the limitations of native enums and adds features like extensibility, strict type safety.

TypeScript enums are nice, but they have some problems:

- No way to detect that it's an enum – neither as a type nor at runtime
- No way to just extend enum and preserve typings
- Not typesafe in runtime
```typescript
enum State {
  Idle,
  Running
}
enum Status {
  New,
  Saved
}

State.Idle === Status.New // get a TypeScript error, but true in runtime
```

## Quick example

```typescript
import EnumFactory from '@ivadey/enum-factory';

const State = EnumFactory.create('state', {
  Idle: 0,
  Running: 1
});
const Status = EnumFactory.create('states', {
  New: 0,
  Saved: 1
});

State.Idle === Status.New // get a TypeScript error and false in runtime
```

## Installation

```shell
npm install @ivadey/enum-factory
# or
yarn add @ivadey/enum-factory
```

## Features

### Main advantages and features:
- Can be used in all cases in which can be used native typescript enums
- Extensible and type-safe enums even in runtime
- Class-based implementation for advanced functionality
- Works seamlessly with TypeScript
- Easy-to-use factory API
- Compatible with `Object.keys()`, `Object.values()` and `Object.entries` in additional to own methods
- Serializable
- Available for work with primitives:
```typescript
import EnumFactory from '@ivadey/enum-factory';

const Status = EnumFactory.create('states', {
  New: 0,
  Saved: 1
});

State.Idle === 0 // => false
State.Idle == 0 // => true
State.Idle === State.fromValue(0) // => true
```

### Drawbacks

According to how typescript processing types some extra definitions required for some cases:

- Type must be explicitly defined to be used:
```typescript
import EnumFactory, { EnumType } from '@ivadey/enum-factory';

const Status = EnumFactory.create('states', {
  New: 0,
  Saved: 1
});
type Status = EnumType<typeof Status>; // required to use Status as type

const status: Status = Status.New; // ok
```
- Keys types must be explicitly defined to be used as index signature
```typescript
import EnumFactory, { EnumKeysType } from '@ivadey/enum-factory';

const Status = EnumFactory.create('states', {
  New: 0,
  Saved: 1
} as const); // defintion must be marked as const to resolve literal values

const statusNames: { [key in EnumKeysType<Status>]: string; } = {
  [Status.New]: 'Draft',
  [Status.Saved]: 'Saved',
  
  foo: 'bar', // get a TypeScript error as 'foo' is not part of Status enum
}
```
- Although most of the time it works fine, in some cases need to explicitly call valueOf/toString/toJSON. For example console.log will print not that you may expect (as it's not part of EcmaScript):
```typescript
import EnumFactory, { EnumKeysType } from '@ivadey/enum-factory';

const SomeEnum = EnumFactory.create('some-enum', { Foo: 'bar', Num: 12 } as const);

console.log(SomeEnum.Foo) // => Enum { [Symbol(some-enum)]: 'some-enum' }
console.log(SomeEnum.Foo.valueOf()) // => 'bar'
console.log(SomeEnum.Num.valueOf()) // => 12
console.log(SomeEnum.Num.toString()) // => '12'
```

## Usage

```typescript
import EnumFactory, { EnumType, EnumKeysType } from '@ivadey/enum-factory';

const State = EnumFactory.create('state', {
  Idle: 'idle',
  Active: 'active',
} as const);
type State = EnumType<typeof State>;

const print = (state: State) => {
  switch (state) {
    case State.Idle: console.log(State.Idle.valueOf()); break;
    case State.Active: console.log(State.Active.valueOf()); break;

    default: console.log('Unknown state');
  }
};

print(State.Idle); // => 'idle'
print(State.Active); // => 'active'
console.log(State.keys()); // => ['Idle', 'Active']
console.log(Object.keys(State)); // => ['Idle', 'Active']

const obj: { [key in EnumKeysType<typeof State>]: string } = {
  [State.Idle]: '', // ok
  [State.Active]: '', // ok
  idle: '', // ok
  active: '', // ok
  unknown: '', // not ok, getting a TypeScript error
};
```

## API Documentation

### EnumFactory

The EnumFactory class is the main entry point for creating advanced enumerations with extended functionality. Below is a breakdown of its methods and their purpose:

#### EnumFactory.create

##### Signature:

```typescript
static create<TDefinition extends EnumDefinition, TEnumName extends string>(
    name: TEnumName,
    definition: TDefinition
): ClassEnum<TDefinition, keyof TDefinition, TEnumName>
```

##### Description:

Creates a new enumeration with the given name and definition.
- Ensures all enum values are unique.
- Prevents redefinition of an enum with the same name.

Parameters:
- name (string): The unique name of the enumeration.
- definition (object): Key-value pairs where keys are enum members and values are strings or numbers.

##### Returns:
A class representing the created enum with various utility methods.

**Example:**

```typescript
const Colors = EnumFactory.create('Colors', {
RED: 'red',
GREEN: 'green',
BLUE: 'blue',
});
```

### Enum Methods

Enums created via EnumFactory include the following static methods:

#### .fromValue(value)

Retrieves an enum member by its value. Will return undefined if given value is not part of the enum.

**Example:**

```typescript
const red = Colors.fromValue('red');
```

#### .values()

Returns all enum members as an array.

**Example:**

```typescript
const allColors = Colors.values(); // [Colors.RED, Colors.GREEN, Colors.BLUE]
```

#### .keys()

Returns all enum keys as an array.

**Example:**

```typescript
const colorKeys = Colors.keys(); // ['RED', 'GREEN', 'BLUE']
```

#### .entries()

Returns an array of [key, value] pairs for the enum.

**Example:**

```typescript
const colorEntries = Colors.entries(); // [['RED', Colors.RED], ['GREEN', Colors.GREEN], ...]
```

#### .cloneAndExtend(name, definition)

Creates a new enumeration by extending the current enum with additional members.

**Example:**

```typescript
const ExtendedColors = Colors.cloneAndExtend('ExtendedColors', {
  YELLOW: 'yellow',
});
```

### Enum Member Methods

Enum members have the following methods:

#### .valueOf()

Returns the value associated with the enum member.

**Example:**

```typescript
Colors.RED.valueOf(); // 'red'
```

**Note:** return type will be either literal, either value type depends on definition was passed as const or not:

```typescript
const WithLiteralValue = EnumFactory.create('with-literal', { Red: 'red' } as const);
const WithJustTypeValue = EnumFactory.create('with-type', { Red: 'red' });

ReturnType<typeof WithLiteralValue.valueOf> // 'red'
ReturnType<typeof WithJustTypeValue.valueOf> // string
```

#### .toString()

Returns the value of the enum member as a string.

**Example:**

```typescript
Colors.RED.toString(); // 'red'
```

#### .toJSON()

Returns the JSON representation of the enum member (its value).

**Example:**

```typescript
JSON.stringify(Colors.RED); // '"red"'
```

### Type Utilities

EnumFactory provides TypeScript utilities for working with enums:

#### EnumType<TClassEnum>

Extracts the type of all enum members.

**Example:**

```typescript
type ColorsType = EnumType<typeof Colors>; // Colors.RED | Colors.GREEN | Colors.BLUE
```

#### EnumKeysType<TClassEnum>

Extracts a union type of valid keys for index signatures, including both enum member references and their values.

**Example:**

```typescript
type ColorsKeysType = EnumKeysType<typeof Colors>; // 'red' | 'green' | 'blue'
```

### Notes
- Enum values must be unique.
- Attempting to create an enum with the same name will throw an error.
- Once initialized, no new enum members can be added without using cloneAndExtend.

## Contributing

Contributions are welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
