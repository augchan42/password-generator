// Copyright © 2022-2023 Password Generator. All rights reserved.
// SPDX-License-Identifier: Apache-2.0 OR MIT

import { exec } from "child_process";
import clipboardy from "clipboardy";
import { fileURLToPath } from "url";

/**
 * Generates a strong password of a specified length using OpenSSL.
 *
 * @param {number} length - The desired length of the password.
 * @return {Promise<string>} A promise that resolves to the generated password.
 */
export const strongPassword = (length) => {
  console.log(`\nAttempting to generate strong password of length: ${length}`);

  return new Promise((resolve, reject) => {
    console.log("Executing OpenSSL command...");

    exec("openssl rand -base64 256", (err, stdout, stderr) => {
      if (err) {
        console.error("\nOpenSSL Error:");
        console.error("- Command failed:", err.message);
        console.error("- stderr:", stderr);
        return reject(err);
      }

      console.log("OpenSSL command executed successfully");

      // Extract a string of the specified length from the base64 output
      const strong = stdout.toString().match(new RegExp(`.{1,${length}}`, "g"));

      if (!strong || !strong[0]) {
        console.error("\nPassword Generation Error:");
        console.error("- Raw output:", stdout);
        console.error("- Matched array:", strong);
        return reject(new Error("Failed to generate valid password string"));
      }

      console.log(`Successfully generated password chunk of length ${strong[0].length}`);
      resolve(strong[0]);
    });
  });
};

/**
 * Asynchronously generates a strong password based on the provided options.
 *
 * @param {Object} options - Configuration options for password generation.
 * @param {number} options.length - The length of each password chunk.
 * @param {number} options.iteration - The number of password chunks.
 * @param {string} options.separator - The separator between password chunks.
 * @return {Promise<string>} A promise that resolves to the generated password.
 */
export const generatePassword = async(options = {}) => {
  const length = options.length || 12;
  const iteration = options.iteration || 1;
  const separator = options.separator || "-";

  console.log("\nPassword Generation Started:");
  console.log("Configuration:", { length, iteration, separator });

  try {
    let passwordChunks = [];
    for (let i = 0; i < iteration; i++) {
      console.log(`\nGenerating chunk ${i + 1} of ${iteration}...`);
      const chunk = await strongPassword(length);
      passwordChunks.push(chunk);
      console.log(`Chunk ${i + 1} generated successfully`);
    }

    const finalPassword = passwordChunks.join(separator);
    console.log("\nPassword Generation Complete:");
    console.log(`- Number of chunks: ${passwordChunks.length}`);
    console.log(`- Total length: ${finalPassword.length}`);

    return finalPassword;
  } catch (error) {
    console.error("\nPassword Generation Failed:");
    console.error("- Error:", error.message);
    console.error("- Stack:", error.stack);
    throw error;
  }
};

// Only run CLI portion if this file is being executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const data = {};

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace("-", "");
    const value = args[i + 1];
    data[key] = value;
  }

  (async() => {
    try {
      console.log("\nStarting password generation process...");
      console.log("Parsed arguments:", data);

      const generatedPassword = await generatePassword({
        length: parseInt(data.l, 10),
        iteration: parseInt(data.i, 10),
        separator: data.s,
      });

      console.log("\nCopying password to clipboard...");
      await clipboardy.write(generatedPassword);
      console.log("Password copied successfully");

      console.log(`\nGenerated Password: ${generatedPassword}`);
    } catch (error) {
      console.error("\nFatal Error:");
      console.error("- Message:", error.message);
      console.error("- Stack:", error.stack);
    }
  })();
}

export default generatePassword;
