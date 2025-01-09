// Copyright © 2022-2023 Password Generator. All rights reserved.
// SPDX-License-Identifier: Apache-2.0 OR MIT

// Importing the randomNumber utility for generating random numbers.
import { randomNumber } from "../utils/randomNumber.js";
// Importing the readFile function from fs/promises for reading files.
import { readFile } from "fs/promises";
// Importing the toTitleCase function for converting strings to title case.
import { toTitleCase } from "../utils/toTitleCase/toTitleCase.js";
// Importing the clipboardy module for clipboard operations.
import clipboardy from "clipboardy";
import { fileURLToPath } from "url";

/**
 * Generate a memorable password using random words from a dictionary.
 *
 * @param {Object} options - Configuration options for password generation.
 * @param {number} options.iteration - The number of words to use.
 * @param {string} options.separator - The separator between words.
 * @return {Promise<string>} The generated password.
 */
// Main function to generate a memorable password.
// It takes an options object with iteration and separator configurations.
export const generatePassword = async(options = {}) => {
  console.log("\nStarting memorable password generation...");

  try {
    // Set default values
    const iteration = options.iteration || 3;
    const separator = options.separator || "-";

    console.log("Configuration:", { iteration, separator });

    // Reading the dictionary file
    console.log("Loading dictionary...");
    const dictionary = JSON.parse(
      await readFile(new URL("../dictionaries/common.json", import.meta.url), {
        encoding: "utf8",
      }),
    );
    console.log(`Dictionary loaded with ${dictionary.entries.length} words`);

    if (iteration < 1) {
      throw new RangeError("The iteration argument must be a positive integer");
    }

    console.log("\nGenerating memorable password...");
    // Generate the memorable part of the password
    const memorable = Array.from({ length: iteration }, (_, index) => {
      const word = dictionary.entries[randomNumber(dictionary.entries.length)];
      const titleCased = toTitleCase(word);
      console.log(`Word ${index + 1}: ${titleCased}`);
      return titleCased;
    });

    // Join the words with separator
    const password = memorable.join(separator).replace(/ /g, "");

    console.log("\nPassword Generation Complete:");
    console.log(`- Words used: ${iteration}`);
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
    const key = args[i].replace("-", "");
    const value = args[i + 1];
    data[key] = value;
  }

  (async() => {
    try {
      console.log("\nStarting password generation process...");
      console.log("Parsed arguments:", data);

      const generatedPassword = await generatePassword({
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
