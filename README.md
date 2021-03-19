# no-drift
Reduced drift timeouts and intervals

Inspired by [driftless](https://github.com/dbkaplun/driftless)

## Usage

```javascript
const {
    setNoDriftTimeout,
    setNoDriftInterval,
    clearNoDrift
} = require('no-drift');

//------------------
// similar usage to setTimeout and setInterval

setNoDriftTimeout(() => {
    console.log('Hello world 1');
});

setNoDriftTimeout(() => {
    console.log('Hello world 2');
}, 1000);

setNoDriftTimeout((a, b, c) => {
    console.log(a, b, c);
}, 1000, '1', '2', '3');

setNoDriftInterval(() => {
    console.log('Hello world 3');
}, 1000);

//------------------
// clearing nodrift

const id = setNoDriftTimeout(() => {
    console.log('clear');
}, 1000);

clearNoDrift(id);
```

## Formulas for timeout times:

_r_ = rate

_t_ = final time


### Time left

__recursive formula__

_d_<sub>0</sub> = _t_

_d_<sub>n</sub> = (1 - _r_)_d_<sub>n-1</sub>

__closed formula__

_d_<sub>n</sub> = _t_(1 - _r_)<sup>n</sup>


### Current time

__closed formula__

_c_<sub>n</sub> = _t_(1 - (1 - _r_)<sup>n</sup>)


### Current wait time

__closed formula__

_w_<sub>n</sub> = _tr_(1 - _r_)<sup>n</sup>
