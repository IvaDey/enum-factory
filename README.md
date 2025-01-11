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

**Enum Factory** – is a small, zero-dependencies library for creating flexible, extensible and type-safe class-based enums in TypeScript. It overcomes the limitations of native enums and adds features like extensibility, strict type safety, and more.

Typescript enums are nice, but they have some problems:

- No way to detect that it's an enum – neither as type, neither in runtime
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

State.Idle === Status.New // get ts error, but true in runtime
```

### Quick example

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

State.Idle === Status.New // get ts error and false in runtime
```

### Installation

```shell
npm install @ivadey/enum-factory
# or
yarn add @ivadey/enum-factory
```

### Features

#### Main advantages and features:
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

#### Drawbacks

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
  
  foo: 'bar', // get ts error as 'foo' is not part of Status enum
}
```
- Tough most of the time it works fine, in some cases need to explicitly call valueOf/toString/toJSON. For example console.log will print not that you may expect (as it's not part of EcmaScript):
```typescript
import EnumFactory, { EnumKeysType } from '@ivadey/enum-factory';

const SomeEnum = EnumFactory.create('some-enum', { Foo: 'bar', Num: 12 } as const);

console.log(SomeEnum.Foo) // => Enum { [Symbol(some-enum)]: 'some-enum' }
console.log(SomeEnum.Foo.valueOf()) // => 'bar'
console.log(SomeEnum.Foo.valueOf()) // => 12
console.log(SomeEnum.Foo.toString()) // => '12'
```

### Usage


### API Documentation


### Contributing

Contributions are welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for details.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
