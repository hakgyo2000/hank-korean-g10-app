// electron-builder afterSign hook.
// We have no paid Apple Developer ID, so real code signing is skipped
// (CSC_IDENTITY_AUTO_DISCOVERY=false). But Squirrel.Mac (electron-updater's
// macOS backend) still validates that the downloaded update was signed by
// the SAME identity as the currently-installed app before applying it.
//
// Ad-hoc signing (`--sign -`) doesn't work here: every ad-hoc signature is
// tied to that exact binary's hash, so it's never "the same identity" across
// two different builds, and Squirrel.Mac rejects the update with
// "code failed to satisfy specified code requirement(s)".
//
// A local self-signed code-signing certificate ("Hank Korean App Dev
// Signing", generated once and imported into this Mac's login keychain —
// see feedback-hank-korean-gotchas memory) provides a STABLE identity: every
// build signed with it satisfies the same designated requirement, so
// Squirrel.Mac accepts the update. This does NOT need to be trusted by
// Gatekeeper/Apple — codesign only needs the certificate+key to sign, and
// Squirrel.Mac's check is pure signature verification, not a trust chain
// check. Only this machine needs the certificate; end users' Macs need
// nothing extra.
const { execFileSync } = require('child_process');
const path = require('path');

module.exports = async function (context) {
  const appPath = path.join(context.appOutDir, `${context.packager.appInfo.productFilename}.app`);
  execFileSync('codesign', ['--force', '--deep', '--sign', 'Hank Korean App Dev Signing', appPath]);
  console.log('[afterSign] signed with Hank Korean App Dev Signing:', appPath);
};
