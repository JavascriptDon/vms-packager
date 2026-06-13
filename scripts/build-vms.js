const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

const VMS = [
  { folder: 'specification/rwi/ootb_rwi', config: 'specification/rwi/ootb_rwi.cfg' },
  { folder: 'specification/ipc/ootb_ipc', config: 'specification/ipc/ootb_ipc.cfg' }
];

function parseConfig(cfgPath) {
  const content = fs.readFileSync(cfgPath, 'utf-8');
  const versionMatch = content.match(/<version>([\d.]+)<\/version>/);
  const nameMatch = content.match(/<name>(.*?)<\/name>/);
  return {
    version: versionMatch ? versionMatch[1] : 'unknown',
    name: nameMatch ? nameMatch[1].toUpperCase().replace(/\s+/g, '_') : 'VM'
  };
}

function zipVM(vm) {
  const { version, name } = parseConfig(vm.config);
  const filename = `${name}_V${version}.vms`;

  const outputDir = 'releases/vms';
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const zip = new AdmZip();
  zip.addLocalFolder(vm.folder, name);
  zip.addLocalFile(vm.config, '', `${name}.cfg`);
  zip.writeZip(path.join(outputDir, filename));

  console.log(`✓ ${filename}`);
}

try {
  VMS.forEach(zipVM);
  console.log('Done');
} catch (err) {
  console.error(err);
  process.exit(1);
}