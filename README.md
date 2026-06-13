# vms-packager

A build script that packages VM specifications into versioned `.vms` files, pulling the version and name directly from each VM's `.cfg` file.

## Project Structure

```
|-specification/
|-----rwi/
|     |-ootb_rwi/        (folder)
|     |-ootb_rwi.cfg
|-----ipc/
|     |-ootb_ipc/        (folder)
|     |-ootb_ipc.cfg
|-releases/
|-----vms/               (output — generated on build)
|-scripts/
|-----build-vms.js
```

## Output

Running the build produces versioned `.vms` files in `releases/vms/`, e.g. `OOTB_IPC_V1.0.vms`. The version and name are read directly from the `<version>` and `<name>` tags in each `.cfg` file.

## Prerequisites

- Node.js

## Getting Started

```bash
npm install
npm run build:vms
```

## Adding a New VMS

1. Add the folder and `.cfg` under `specification/`
2. Add an entry to the `VMS` array in `scripts/build-vms.js`
3. Run `npm run build:vms`

## Dependencies

This project uses [adm-zip](https://github.com/cthackers/adm-zip) for zip file creation — a pure JavaScript zip implementation with no native dependencies.

Per [Snyk's security report](https://security.snyk.io/package/npm/adm-zip), the latest version (`0.5.17`) has no known vulnerabilities. It scores 85/100 on package health with healthy maintenance and ~12.3M weekly downloads. Two historical vulnerabilities exist in older versions, so always keep it pinned to the latest.

> **Recommended:** pin the exact version in `package.json` to avoid unintentional upgrades pulling in a vulnerable release.

```json
"dependencies": {
  "adm-zip": "0.5.17"
}
```

## Versioning

Bump the `<version>` tag in the relevant `.cfg` file before building — the output filename will reflect the new version automatically.


https://github.com/user-attachments/assets/5f0844aa-2f76-489b-b9f3-5952ed48de5b

