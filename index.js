#!/usr/bin/env node

// Copyright © 2022-2023 Password Generator. All rights reserved.
// SPDX-License-Identifier: Apache-2.0 OR MIT

// Import the PasswordGenerator instead of redeclaring it
import { PasswordGenerator } from "./src/bin/password-generator.js";

// Default configuration
const defaultConfig = {
  type: "base64",
  length: 12,
  iteration: 1,
  separator: "-"
};

// Show usage information
const showUsage = () => {
  console.log("\nPassword Generator Usage:");
  console.log("  node . -t <type> -l <length> -i <iteration> -s <separator>\n");
  console.log("Options:");
  console.log("  -t, --type       Password type (random, memorable, strong)");
  console.log("  -l, --length     Password length (default: 12)");
  console.log("  -i, --iteration  Number of passwords to generate (default: 1)");
  console.log("  -s, --separator  Word separator for memorable passwords (default: -)");
  console.log("\nExample:");
  console.log("  node . -t strong -l 16 -i 3 -s -\n");
};

// Parse command line arguments
const args = process.argv.slice(2);
if (args.includes("-h") || args.includes("--help")) {
  showUsage();
  process.exit(0);
}

// Execute the password generator
(async() => {
  try {
    console.log("Attempting to generate password with config:", defaultConfig);
    const password = await PasswordGenerator(defaultConfig);
    if (!password) {
      throw new Error("No password was generated");
    }
    console.log("\nGenerated Password:", password, "\n");
  } catch (error) {
    console.error("\nError Details:");
    console.error("- Message:", error.message);
    console.error("- Stack:", error.stack);
    console.error("\nTrying to use configuration:", defaultConfig);
    console.error("\nFor help, use: node . --help\n");
    process.exit(1);
  }
})();

// Export 'PasswordGenerator' as the default export of this module.
export default PasswordGenerator;
