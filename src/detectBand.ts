import noble, { state } from 'noble';
import { exec } from 'child_process';
import { stderr } from 'process';
import dotenv from 'dotenv';

dotenv.config();

const XpcConnect = require('xpc-connect');

const MAC_ADDRESS = process.env.DEVICE_MAC_ADDRESS ?? '';
console.log(`MAC_ADDRESS: ${MAC_ADDRESS}`);

const serviceName = "com.example.XPC-Calc-Engine"

const xpc = new XpcConnect(serviceName);

xpc.on('error', (err: Error) => {
  console.error("XPC Error:", err);
});

xpc.on('event', (event: any) => {
  console.log("XPC Event:", event);
});

xpc.sendMessage({ command: 'start' });

noble.on('stateChange', (state) => state === 'poweredOn' ? noble.startScanning() : noble.stopScanning());

noble.on('discover', (peripheral) => {
  if (peripheral.address === MAC_ADDRESS.toLowerCase()) {
    console.log("Mi Band detected");
    wakeNova();
    noble.stopScanning();
  }
});

const wakeNova = () => {
  exec('caffeinate -u -t 1', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`Standard Output: ${stdout}`)
    console.log(`Standard Error: ${stderr}`)
  })
}