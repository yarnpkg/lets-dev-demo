# Let's Dev: A Package Manager

> This project has been created to showcase the [article of the same name ](https://yarnpkg.com/blog/2017/07/11/lets-dev-a-package-manager/). It is not an alternate package manager, and we do not plan to support it in the future.

## Installation

```
$> git clone git@github.com:yarnpkg/lets-dev-demo
$> cd lets-dev-demo
$> yarn
```

## Usage

```
babel-node index.js [package.json parent directory] [node_modules parent directory]
```

- If missing, the `package.json` parent directory will default to `.`
- If missing, the `node_modules` parent directory will default to the `package.json` parent directory

## Demo

For demo sake, the following command can be used:

```
$> yarn install-self
```

The demo will then install its own dependencies inside a temporary `node_modules` folder, then delete the old one, then move the new one in its final location. You can execute this command as much time as you want: the demo is able to install itself flawlessly!

## License (BSD 2-Clause)

> Copyright © 2016-present, Yarn Contributors. All rights reserved.
>
> Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
>
>  * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
>
> * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
>
> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
