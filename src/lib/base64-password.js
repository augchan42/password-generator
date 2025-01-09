// Copyright © 2022-2023 Password Generator. All rights reserved.
// SPDX-License-Identifier: Apache-2.0 OR MIT

import { randomBytes } from "crypto";
import clipboardy from "clipboardy";
import { fileURLToPath } from "url";

export const generateRandomUrlSafeBase64String = (length) => {
  console.log(`Generating random URL-safe base64 string of length: ${length}`);
  return randomBytes(length)
    .toString("base64")
    .replace(/\+/g, "-") // Replace + with -
    .replace(/\//g, "_") // Replace / with _
    .replace(/=+$/, ""); // Remove padding
};

/**
 * Generates a random base64 string of the specified length.
 *
 * @param {number} length The length of the base64 string to generate.
 * @return {string} The generated base64 string.
 */
export const generateRandomBase64String = (length) => {
  console.log(`Generating random base64 string of length: ${length}`);
  return randomBytes(length).toString("base64");
};

/**
 * Splits a base64 string into substrings of the specified length.
 *
 * @param {string} base64String The base64 string to split.
 * @param {number} length The length of each substring.
 * @return {Array<string>} The array of substrings.
 */
export const splitBase64String = (base64String, length) => {
  console.log(`Splitting base64 string into chunks of length: ${length}`);
  const substrings = base64String.match(new RegExp(`.{1,${length}}`, "g"));
  return substrings || [];
};

/**
 * Generates a password using random Base64 characters with the specified configuration.
 *
 * @param {Object} options - Configuration options for password generation.
 * @param {number} options.length - The length of each password chunk.
 * @param {number} options.iteration - The number of password chunks.
 * @param {string} options.separator - The separator between password chunks.
 * @return {string} The generated password.
 */
export const generatePassword = async(options = {}) => {
  console.log("\nStarting URL-safe base64 password generation...");

  try {
    // Set default values
    const length = options.length || 12;
    const iteration = options.iteration || 1;
    const separator = options.separator || "-";

    console.log("Configuration:", { length, iteration, separator });

    // Generate URL-safe base64 string
    const base64String = generateRandomUrlSafeBase64String(length * iteration);
    console.log("URL-safe base64 string generated successfully");

    // Split into substrings
    const substrings = splitBase64String(base64String, length);
    console.log(`Generated ${substrings.length} password chunks`);

    // Join with separator
    const password = substrings.slice(0, iteration).join(separator);

    console.log("\nPassword Generation Complete:");
    console.log(`- Number of chunks: ${iteration}`);
    console.log(`- Chunk length: ${length}`);
    console.log(`- Separator: "${separator}"`);
    console.log(`- Total length: ${password.length}`);

    return password;
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
    const key = args[i].replace(/^--?/, "");
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
      process.exit(1);
    }
  })();
}

export default generatePassword;
