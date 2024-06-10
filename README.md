# AuraSync

AuraSync is a project developed by StarkLab for synchronizing data with external devices.

## Introduction

AuraSync facilitates the communication between your application and external devices, such as the Mi Band, through XPC (Cross-Process Communication) services. This allows your application to perform various tasks, such as detecting device presence and initiating actions based on device events.

## Installation

To install AuraSync, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd AuraSync
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

To use AuraSync in your project, follow these steps:

1. Import the necessary modules:

   ```javascript
   import noble from 'noble';
   import { exec } from 'child_process';
   const XpcConnect = require('xpc-connect');
   ```

2. Initialize the XPC connection:

   ```javascript
   const serviceName = "com.example.XPC-Calc-Engine";
   const xpc = new XpcConnect(serviceName);
   ```

   Replace `"com.example.XPC-Calc-Engine"` with your desired XPC service name.

3. Handle XPC events:

   ```javascript
   xpc.on('error', (err: Error) => {
     console.error("XPC Error:", err);
   });

   xpc.on('event', (event: any) => {
     console.log("XPC Event:", event);
   });
   ```

4. Start scanning for devices:

   ```javascript
   noble.on('stateChange', (state) => state === 'poweredOn' ? noble.startScanning() : noble.stopScanning());

   noble.on('discover', (peripheral) => {
     // Your device detection logic here
   });
   ```

5. Execute actions based on device events:

   ```javascript
   const wakeNova = () => {
     exec('caffeinate -u -t 1', (error, stdout, stderr) => {
       // Your action execution logic here
     });
   };
   ```

6. Run your application:

   ```bash
   npm start
   ```

## License

This project is currently not licensed. It is part of StarkLab projects and is under control of StarkLab. Any use, modification, or redistribution is subject to StarkLab's policies.