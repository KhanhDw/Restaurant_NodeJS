// scripts/generate-cert.ts
import fs from "fs";
import path from "path";
import forge from "node-forge";

const CERT_DIR = path.join(__dirname, "../certs");
const certPath = path.join(CERT_DIR, "cert.pem");
const keyPath = path.join(CERT_DIR, "key.pem");

if (!fs.existsSync(CERT_DIR)) fs.mkdirSync(CERT_DIR);

if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
    console.log("✅ Certificate already exists.");
    process.exit(0);
}

const keys = forge.pki.rsa.generateKeyPair(2048);
const cert = forge.pki.createCertificate();

cert.publicKey = keys.publicKey;
cert.serialNumber = "01";
cert.validity.notBefore = new Date();
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

const attrs = [
    { name: "commonName", value: "localhost" },
    { name: "countryName", value: "VN" },
    { name: "organizationName", value: "Dev Team" },
];

cert.setSubject(attrs);
cert.setIssuer(attrs);
cert.setExtensions([{ name: "basicConstraints", cA: true }]);

cert.sign(keys.privateKey, forge.md.sha256.create());

fs.writeFileSync(certPath, forge.pki.certificateToPem(cert));
fs.writeFileSync(keyPath, forge.pki.privateKeyToPem(keys.privateKey));

console.log("✅ HTTPS certificate created successfully.");
