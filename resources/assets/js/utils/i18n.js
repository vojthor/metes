let messages = {};
let defaultLocale = "cs";
let locale = defaultLocale;

/**
 * Set messages source.
 *
 * @param newMessages {object} The messages source.
 *
 * @return void
 */
export function setMessages(newMessages) {
  messages = newMessages;
}

/**
 * Set the current locale.
 *
 * @param newLocale {string} The locale to set.
 *
 * @return void
 */
export function setLocale(newLocale) {
  locale = newLocale;
}

/**
 * Get the current locale.
 *
 * @return {string} The current locale.
 */
export function getLocale() {
  return locale || defaultLocale;
}

/**
 * Returns a translation message.
 *
 * @param key {string} The key of the message.
 * @param replacements {object} The replacements to be done in the message.
 *
 * @return {string} The translation message, if not found the given key.
 */
export function trans(key, replacements = {}) {
  if (!has(key)) {
    return key;
  }

  var message = _getMessage(key, replacements);
  if (message === null) {
    return key;
  }

  if (replacements) {
    message = _applyReplacements(message, replacements);
  }

  return message;
}

/**
 * Returns true if the key is defined on the messages source.
 *
 * @param key {string} The key of the message.
 *
 * @return {boolean} true if the given key is defined on the messages source, otherwise false.
 */
export function has(key) {
  if (typeof key !== 'string' || !messages) {
    return false;
  }
  return _getMessage(key) !== null;
}

/**
 * Gets the plural or singular form of the message specified based on an integer value.
 *
 * @param key {string} The key of the message.
 * @param count {integer} The number of elements.
 * @param replacements {object} The replacements to be done in the message.
 *
 * @return {string} The translation message according to an integer value.
 */
export function choice(key, count, replacements) {
  // Set default values for parameters replace and locale
  replacements = typeof replacements !== 'undefined' ? replacements : {};

  // The count must be replaced if found in the message
  replacements['count'] = count;

  // Message to get the plural or singular
  var message = trans(key, replacements);

  // Check if message is not null or undefined
  if (message === null || message === undefined) {
    return message;
  }

  // Separate the plural from the singular, if any
  var messageParts = message.split('|');

  // Get the explicit rules, If any
  var explicitRules = [];
  var regex = /{\d+}\s(.+)|\[\d+,\d+\]\s(.+)|\[\d+,Inf\]\s(.+)/;

  for (var i = 0; i < messageParts.length; i++) {
    messageParts[i] = messageParts[i].trim();

    if (regex.test(messageParts[i])) {
      var messageSpaceSplit = messageParts[i].split(/\s/);
      explicitRules.push(messageSpaceSplit.shift());
      messageParts[i] = messageSpaceSplit.join(' ');
    }
  }

  // Check if there's only one message
  if (messageParts.length === 1) {
    // Nothing to do here
    return message;
  }

  // Check the explicit rules
  for (var i = 0; i < explicitRules.length; i++) {
    if (_testInterval(count, explicitRules[i])) {
      return messageParts[i];
    }
  }

  // Standard rules
  if (count > 1) {
    return messageParts[1];
  } else {
    return messageParts[0];
  }
}

/**
 * Parse a message key into components.
 *
 * @param key {string} The message key to parse.
 *
 * @return {object} A key object with source and entries properties.
 */
function _parseKey(key) {
  if (typeof key !== 'string') {
    return null;
  }
  var segments = key.split('.');
  return {
    source: getLocale() + '.' + segments[0],
    entries: segments.slice(1)
  };
}

/**
 * Returns a translation message. Use `trans()` method instead, this methods assumes the key exists.
 *
 * @param key {string} The key of the message.
 *
 * @return {string|null} The translation message for the given key.
 */
function _getMessage(key) {
  key = _parseKey(key);

  // Ensure message source exists.
  if (messages[key.source] === undefined) {
    return null;
  }

  // Get message text.
  var message = messages[key.source];
  while (key.entries.length && (message = message[key.entries.shift()]));

  if (typeof message !== 'string') {
    return null;
  }

  return message;
}

/**
 * Apply replacements to a string message containing placeholders.
 *
 * @param message {string} The text message.
 * @param replacements {object} The replacements to be done in the message.
 *
 * @return {string} The string message with replacements applied.
 */
function _applyReplacements(message, replacements) {
  for (var replace in replacements) {
    if (replacements.hasOwnProperty(replace)) {
      message = message.split(':' + replace).join(replacements[replace]);
    }
  }
  return message;
}

/**
 * Checks if the given `count` is within the interval defined by the {string} `interval`
 *
 * @param  count {int}  The amount of items.
 * @param  interval {string}    The interval to be compared with the count.
 * @return {boolean}    Returns true if count is within interval; false otherwise.
 */
function _testInterval(count, interval) {
  /**
   * From the Symfony\Component\Translation\Interval Docs
   *
   * Tests if a given number belongs to a given math interval.
   * An interval can represent a finite set of numbers: {1,2,3,4}
   * An interval can represent numbers between two numbers: [1, +Inf] ]-1,2[
   * The left delimiter can be [ (inclusive) or ] (exclusive).
   * The right delimiter can be [ (exclusive) or ] (inclusive).
   * Beside numbers, you can use -Inf and +Inf for the infinite.
   */

  return false;
}