## v1.0.5 - February 2, 2025

### Fixes

- make enum internal prop 'value' private only via typescript access modifiers **[(19f9ef5)](19f9ef56137b91483e9fd65f594972fd45a596ef)**<br />
> Making it real private with # cause error in some cases (deep cloning and using in eval for example)

<hr />

## v1.0.4 - February 2, 2025

### Features

- expose enum name by overriding internal Enum class name via defining getter **[(f92cd8a)](f92cd8a392fc8fccf5666011784a7019ee885e8d)**

<hr />

## v1.0.3 - February 2, 2025

### Fixes

- fix package.json **[(f8b919d)](f8b919d78c461f6f5a68f146fcb5de1038d7dc89)**

<hr />

## v1.0.2 - February 2, 2025

### Fixes

- fix extension **[(9c2b769)](9c2b769ebb840669341181af10594b8069bccaa0)**

<hr />

## v1.0.1 - February 2, 2025<br />![breaking-change](https://img.shields.io/badge/%E2%9A%A1%EF%B8%8F%20breaking--changes-red)

### ci

- update GitHub actions "checkout" and "setup-node" to the lates **[(daa006d)](daa006d79978e6731358c62b5b32ec31f718550f)**
- init CI **[(01ca7f5)](01ca7f555132cdf9cb6f35e70a4e94050fcaf5b1)**

### Merge pull request #1 from IvaDey/ci

-  **[(938c27b)](938c27b08998fcf21b2dde8ce2552bd9c7feb191)**<br />
> ci: init CI

### Fixes

- fix types **[(562067c)](562067c09f7ac1cf12f2c9297be1da984575ed35)**
- include commitlint config to tsconfig **[(8fe67e5)](8fe67e5894c6b6e9897fb4a77327d5276f76483c)**

### wip

- docs **[(63efb92)](63efb9218694a0bc8caa70ebfeab056b540584f0)**

### Merge pull request #2 from IvaDey/docs

-  **[(53d567a)](53d567af8f14011d6929fc7f83da6142cb1e0838)**<br />
> Docs [skip ci]

### Features

- set package type to "module" **[(d02dd10)](d02dd10328a23af6c8801ab17aac87dd276ba01d)**
- add utility type to use created enums as index signature **[(2c1102a)](2c1102aabe06653e0a75894f1578558b8debd569)**

### Documentation

- fix example after review **[(7b54cbf)](7b54cbf58f36240de2efa5c7700d0cf8cf79801f)**
- readme and CONTRIBUTING.md **[(91a2b9e)](91a2b9ec232c125b054167dc9372f332563718cf)**
- add test workflow status badge [skip ci] **[(455a4f4)](455a4f46e96faaa04c83a1cb4862fe7922e5b77a)**
- add link to issues page for issues badge [skip ci] **[(f198ace)](f198ace1885e7adb8cc101ef0ba0e975fa5b89c8)**
- added coverage badge in README.md **[(d58f753)](d58f753d56a5206c03e28512a8a1c9e7fc33778a)**

### Tests

- add test for case with used enum values as object keys **[(13383c6)](13383c6a09d33ae1f2da7b8d56270c3dce411eb7)**
- add test for new utility type EnumKeysType **[(822ed6b)](822ed6bd69385fb5f5d53bbd5f88f48ab0c23277)**

### Ops

- copy readme.md to dist after building **[(da97005)](da970056e69138d126ae300cf0bea14223008ae5)**

### Chore

- add links to repository in package.json **[(15ce3a1)](15ce3a16126062dfdd1ace61024e5920fefff718)**