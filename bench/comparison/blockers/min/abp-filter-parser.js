'use strict'

var elementTypes = ['script', 'image', 'stylesheet', 'object', 'xmlhttprequest', 'object-subrequest', 'subdocument', 'ping', 'websocket', 'webrtc', 'document', 'elemhide', 'generichide', 'genericblock', 'popup', 'other']

var separatorCharacters = ':?/=^'

/**
 * Finds the first separator character in the input string
 */
function findFirstSeparatorChar (input, startPos) {
  for (var i = startPos, len = input.length; i < len; i++) {
    if (separatorCharacters.indexOf(input[i]) !== -1) {
      return i
    }
  }
  return -1
}

/**
 * Obtains the domain index of the input filter line
 */
function getDomainIndex (input) {
  var index = input.indexOf(':') + 1
  while (input[index] === '/') {
    index++
  }
  return index
}

function getUrlHost (input) {
  var domainIndexStart = getDomainIndex(input)
  var domainIndexEnd = findFirstSeparatorChar(input, domainIndexStart)
  if (domainIndexEnd === -1) {
    domainIndexEnd = input.length
  }
  return input.substring(domainIndexStart, domainIndexEnd)
}

function isSameOriginHost (baseContextHost, testHost) {
  if (testHost.slice(-baseContextHost.length) === baseContextHost) {
    var c = testHost[testHost.length - baseContextHost.length - 1]
    return c === '.' || c === undefined
  } else {
    return false
  }
}

/**
 * Parses the domain string and fills in options.
 */

function parseDomains (input, options) {
  var domains = input.split('|')
  var matchDomains = []
  var skipDomains = []
  for (var i = 0; i < domains.length; i++) {
    if (domains[i][0] === '~') {
      skipDomains.push(domains[i].substring(1))
    } else {
      matchDomains.push(domains[i])
    }
  }
  if (matchDomains.length !== 0) {
    options.domains = matchDomains
  }
  if (skipDomains.length !== 0) {
    options.skipDomains = skipDomains
  }
}

/**
 * Parses options from the passed in input string
 */

function parseOptions (input) {
  var output = {}
  var hasValidOptions = false

  input.split(',').forEach(function (option) {
    if (option.startsWith('domain=')) {
      var domainString = option.split('=')[1].trim()
      parseDomains(domainString, output)
      hasValidOptions = true
    } else {

      // the option is an element type to skip
      if (option[0] === '~' && elementTypes.indexOf(option.substring(1)) !== -1) {
        output.skipElementType = option.substring(1)
        hasValidOptions = true

      // the option is an element type to match
      } else if (elementTypes.indexOf(option) !== -1) {
        output.elementType = option
        hasValidOptions = true
      }

      if (option === 'third-party') {
        output.thirdParty = true
        hasValidOptions = true
      }

      if (option === '~third-party') {
        output.notThirdParty = true
        hasValidOptions = true
      }
    }
  })

  if (hasValidOptions) {
    return output
  } else {
    return null
  }
}

/* creates a trie */

function Trie () {
  this.data = {}
}

/* adds a string to the trie */
Trie.prototype.add = function (string, stringData) {
  var data = this.data

  for (var i = 0, len = string.length; i < len; i++) {
    var char = string[i]

    if (!data[char]) {
      data[char] = {}
    }

    data = data[char]
  }
  if (data._d) {
    data._d.push(stringData)
  } else {
    data._d = [stringData]
  }
}

/* adds a string to the trie in reverse order */
Trie.prototype.addReverse = function (string, stringData) {
  var data = this.data

  for (var i = string.length - 1; i >= 0; i--) {
    var char = string[i]

    if (!data[char]) {
      data[char] = {}
    }

    data = data[char]
  }
  if (data._d) {
    data._d.push(stringData)
  } else {
    data._d = [stringData]
  }
}

/* finds all strings added to the trie that are a substring of the input string */
Trie.prototype.getSubstringsOf = function (string) {
  var root = this.data
  var substrings = []
  // loop through each character in the string

  outer: for (var i = 0; i < string.length; i++) {
    var data = root[string[i]]
    if (!data) {
      continue
    }
    if (data._d) {
      substrings = substrings.concat(data._d)
    }
    for (var x = i + 1; x < string.length; x++) {
      var char = string[x]
      if (data[char]) {
        data = data[char]
        if (data._d) {
          substrings = substrings.concat(data._d)
        }
      } else {
        continue outer
      }
    }
  }

  return substrings
}

/* find all strings added to the trie that are located at the beginning of the input string */
Trie.prototype.getStartingSubstringsOf = function (string) {
  var substrings = []
  // loop through each character in the string

  var data = this.data[string[0]]
  if (!data) {
    return substrings
  }
  for (var i = 1; i < string.length; i++) {
    data = data[string[i]]
    if (!data) {
      break
    }
    if (data._d) {
      substrings = substrings.concat(data._d)
    }
  }

  return substrings
}

/* finds all strings within the trie that are located at the end of the input string.
only works if all strings have been added to the trie with addReverse () */
Trie.prototype.getEndingSubstringsOfReversed = function (string) {
  var substrings = []
  // loop through each character in the string

  var data = this.data[string[string.length - 1]]
  if (!data) {
    return substrings
  }
  for (var i = string.length - 2; i >= 0; i--) {
    data = data[string[i]]
    if (!data) {
      break
    }
    if (data._d) {
      substrings = substrings.concat(data._d)
    }
  }

  return substrings
}

function parseFilter (input, parsedFilterData) {
  input = input.trim()

  var len = input.length

  // Check for comment or nothing
  if (len === 0) {
    return false
  }

  // Check for comments
  if (input[0] === '[' || input[0] === '!') {
    return false
  }

  var beginIndex = 0

  // Check for exception instead of filter
  if (input[0] === '@' && input[1] === '@') {
    parsedFilterData.isException = true
    beginIndex = 2
  }

  // Check for element hiding rules
  var index = input.indexOf('#', beginIndex)
  if (index !== -1 && (input[index + 1] === '#' || input[index + 1] === '@' || input[index + 1] === '?')) {
    return false
  }

  // Check for options, regex can have options too so check this before regex
  index = input.lastIndexOf('$')
  if (index !== -1) {
    var options = parseOptions(input.substring(index + 1))
    if (options) {
      // if there are no valid options, we shouldn't do any of this, because the $ sign can also be part of the main filter part
      // example: https://github.com/easylist/easylist/commit/1bcf25d782de073764bf122a8dffec785434d8cc
      parsedFilterData.options = options
      // Get rid of the trailing options for the rest of the parsing
      input = input.substring(0, index)
      len = index
    }
  }

  // Check for a regex
  if (input[beginIndex] === '/' && input[len - 1] === '/' && beginIndex !== len - 1) {
    parsedFilterData.data = input.slice(beginIndex + 1, -1)
    parsedFilterData.regex = new RegExp(parsedFilterData.data)
    return true
  }

  // Check if there's some kind of anchoring
  if (input[beginIndex] === '|') {
    // Check for an anchored domain name
    if (input[beginIndex + 1] === '|') {
      parsedFilterData.hostAnchored = true
      var indexOfSep = findFirstSeparatorChar(input, beginIndex + 1)
      if (indexOfSep === -1) {
        indexOfSep = len
      }
      beginIndex += 2
      parsedFilterData.host = input.substring(beginIndex, indexOfSep)
      parsedFilterData.data = input.substring(beginIndex)
    } else {
      parsedFilterData.leftAnchored = true
      beginIndex++
      parsedFilterData.data = input.substring(beginIndex)
    }
  }
  if (input[len - 1] === '|') {
    parsedFilterData.rightAnchored = true
    input = input.substring(0, len - 1)
    parsedFilterData.data = input.substring(beginIndex)
  }

  // for nonAnchoredString and wildcard filters

  if (!parsedFilterData.data) {
    if (input.indexOf('*') === -1) {
      parsedFilterData.data = input.substring(beginIndex)
    } else {
      parsedFilterData.wildcardMatchParts = input.split('*')
    }
  }

  return true
}

/**
 * Similar to str1.indexOf(filter, startingPos) but with
 * extra consideration to some ABP filter rules like ^.
 */
var filterArrCache = {}
function indexOfFilter (input, filter, startingPos) {
  if (filter.indexOf('^') == -1) { // no separator characters, no need to do the rest of the parsing
    return input.indexOf(filter, startingPos)
  }
  if (filterArrCache[filter]) {
    var filterParts = filterArrCache[filter]
  } else {
    var filterParts = filter.split('^')
    filterArrCache[filter] = filterParts
  }
  var index = startingPos,
    beginIndex = -1,
    prefixedSeparatorChar = false

  var f = 0
  var part

  for (var f = 0; f < filterParts.length; f++) {
    part = filterParts[f]

    if (part === '') {
      prefixedSeparatorChar = true
      continue
    }

    index = input.indexOf(part, index)
    if (index === -1) {
      return -1
    }
    if (beginIndex === -1) {
      beginIndex = index
    }

    if (prefixedSeparatorChar) {
      if (separatorCharacters.indexOf(input[index - 1]) === -1) {
        return -1
      }
    }
    // If we are in an in between filterPart
    if (f + 1 < filterParts.length &&
      // and we have some chars left in the input past the last filter match
      input.length > index + part.length) {
      if (separatorCharacters.indexOf(input[index + part.length]) === -1) {
        return -1
      }
    }

    prefixedSeparatorChar = false
  }
  return beginIndex
}

// Determines if there's a match based on the options, this doesn't
// mean that the filter rule shoudl be accepted, just that the filter rule
// should be considered given the current context.
// By specifying context params, you can filter out the number of rules which are
// considered.
function matchOptions (filterOptions, input, contextParams, currentHost) {
  if (!filterOptions) {
    return true
  }
  if (filterOptions.elementType !== contextParams.elementType && filterOptions.elementType !== undefined) {
    return false
  }
  if (filterOptions.skipElementType === contextParams.elementType && filterOptions.skipElementType !== undefined) {
    return false
  }

  // Domain option check
  if (contextParams.domain !== undefined) {
    if (filterOptions.domains || filterOptions.skipDomains || filterOptions.thirdParty || filterOptions.notThirdParty) {
      if (filterOptions.thirdParty && contextParams.domain === currentHost) {
        return false
      }

      if (filterOptions.notThirdParty && contextParams.domain !== currentHost) {
        return false
      }

      if (filterOptions.skipDomains && filterOptions.skipDomains.indexOf(contextParams.domain) !== -1) {
        return false
      }

      if (filterOptions.domains && filterOptions.domains.indexOf(contextParams.domain) === -1) {
        return false
      }
    }
  } else if (filterOptions.domains || filterOptions.skipDomains) {
    return false
  }

  return true
}

/**
 * Parses the set of filter rules and fills in parserData
 * @param input filter rules
 * @param parserData out parameter which will be filled
 *   with the filters, exceptionFilters and htmlRuleFilters.
 */

function parse (input, parserData, callback, options = {}) {
  var arrayFilterCategories = ['regex', 'bothAnchored']
  var objectFilterCategories = ['hostAnchored']
  var trieFilterCategories = ['nonAnchoredString', 'leftAnchored', 'rightAnchored', 'wildcard']

  parserData.exceptionFilters = parserData.exceptionFilters || {}

  for (var i = 0; i < arrayFilterCategories.length; i++) {
    parserData[arrayFilterCategories[i]] = parserData[arrayFilterCategories[i]] || []
    parserData.exceptionFilters[arrayFilterCategories[i]] = parserData.exceptionFilters[arrayFilterCategories[i]] || []
  }

  for (var i = 0; i < objectFilterCategories.length; i++) {
    parserData[objectFilterCategories[i]] = parserData[objectFilterCategories[i]] || {}
    parserData.exceptionFilters[objectFilterCategories[i]] = parserData.exceptionFilters[objectFilterCategories[i]] || {}
  }

  for (var i = 0; i < trieFilterCategories.length; i++) {
    parserData[trieFilterCategories[i]] = parserData[trieFilterCategories[i]] || new Trie()
    parserData.exceptionFilters[trieFilterCategories[i]] = parserData.exceptionFilters[trieFilterCategories[i]] || new Trie()
  }

  var filters = input.split('\n')

  function processChunk (start, end) {
    for (var i = start, len = end; i < len; i++) {
      var filter = filters[i]
      if (!filter) {
        continue
      }

      var parsedFilterData = {}

      var object

      if (parseFilter(filter, parsedFilterData)) {
        if (parsedFilterData.isException) {
          object = parserData.exceptionFilters
        } else {
          object = parserData
        }

        // add the filters to the appropriate category
        if (parsedFilterData.leftAnchored) {
          if (parsedFilterData.rightAnchored) {
            object.bothAnchored.push(parsedFilterData)
          } else {
            object.leftAnchored.add(parsedFilterData.data, parsedFilterData.options)
          }
        } else if (parsedFilterData.rightAnchored) {
          object.rightAnchored.addReverse(parsedFilterData.data, parsedFilterData.options)
        } else if (parsedFilterData.hostAnchored) {
          /* add the filters to the object based on the last 6 characters of their domain.
            Domains can be just 5 characters long: the TLD is at least 2 characters,
            the . character adds one more character, and the domain name must be at least two
            characters long. However, slicing the last 6 characters of a 5-character string
            will give us the 5 available characters; we can then check for both a
            5-character and a 6-character match in matchesFilters. By storing the last
            characters in an object, we can skip checking whether every filter's domain
            is from the same origin as the URL we are checking. Instead, we can just get
            the last characters of the URL to check, get the filters stored in that
            property of the object, and then check if the complete domains match.
           */
          var ending = parsedFilterData.host.slice(-6)

          if (object.hostAnchored[ending]) {
            object.hostAnchored[ending].push(parsedFilterData)
          } else {
            object.hostAnchored[ending] = [parsedFilterData]
          }
        } else if (parsedFilterData.wildcardMatchParts) {
          var wildcardToken = parsedFilterData.wildcardMatchParts[0].split('^')[0].substring(0, 10)
          if (wildcardToken.length < 4) {
            var wildcardToken2 = parsedFilterData.wildcardMatchParts[1].split('^')[0].substring(0, 10)
            if (wildcardToken2 && wildcardToken2.length > wildcardToken.length) {
              wildcardToken = wildcardToken2
            }
          }
          if (wildcardToken) {
            object.wildcard.add(wildcardToken, parsedFilterData)
          } else {
            object.wildcard.add('', parsedFilterData)
          }
        } else if (parsedFilterData.regex) {
          object.regex.push(parsedFilterData)
        } else {
          object.nonAnchoredString.add(parsedFilterData.data.split('^')[0], parsedFilterData)
        }
      }
    }
  }

  if (options.async === false) {
    processChunk(0, filters.length)
    parserData.initialized = true
  } else {
    /* parse filters in chunks to prevent the main process from freezing */

    var filtersLength = filters.length
    var lastFilterIdx = 0
    var nextChunkSize = 1500
    var targetMsPerChunk = 12

    function nextChunk () {
      var t1 = Date.now()
      processChunk(lastFilterIdx, lastFilterIdx + nextChunkSize)
      var t2 = Date.now()

      lastFilterIdx += nextChunkSize

      if (t2 - t1 !== 0) {
        nextChunkSize = Math.round(nextChunkSize / ((t2 - t1) / targetMsPerChunk))
      }

      if (lastFilterIdx < filtersLength) {
        setTimeout(nextChunk, 16)
      } else {
        parserData.initialized = true

        if (callback) {
          callback()
        }
      }
    }

    nextChunk()
  }
}

function matchesFilters (filters, input, contextParams) {
  var currentHost = getUrlHost(input)

  var i, len, filter

  // check if the string matches a left anchored filter

  var leftAnchoredMatches = filters.leftAnchored.getStartingSubstringsOf(input)
  if (leftAnchoredMatches.length !== 0) {
    var len = leftAnchoredMatches.length
    for (i = 0; i < len; i++) {
      if (matchOptions(leftAnchoredMatches[i], input, contextParams, currentHost)) {
        return true
      }
    }
  }

  // check if the string matches a right anchored filter

  var rightAnchoredMatches = filters.rightAnchored.getEndingSubstringsOfReversed(input)
  if (rightAnchoredMatches.length !== 0) {
    var len = rightAnchoredMatches.length
    for (i = 0; i < len; i++) {
      if (matchOptions(rightAnchoredMatches[i], input, contextParams, currentHost)) {
        return true
      }
    }
  }

  // check if the string matches a filter with both anchors

  for (i = 0, len = filters.bothAnchored.length; i < len; i++) {
    if (filters.bothAnchored[i].data === input && matchOptions(filters.bothAnchored[i].options, input, contextParams, currentHost)) {
      // console.log(filter, 3)

      return true
    }
  }

  // get all of the host anchored filters with the same domain ending as the current domain
  var hostFiltersLong = filters.hostAnchored[currentHost.slice(-6)]
  var hostFiltersShort = filters.hostAnchored[currentHost.slice(-5)]

  var hostFiltersToCheck = []
  if (hostFiltersLong) {
    hostFiltersToCheck = hostFiltersToCheck.concat(hostFiltersLong)
  }
  if (hostFiltersShort) {
    hostFiltersToCheck = hostFiltersToCheck.concat(hostFiltersShort)
  }

  if (hostFiltersToCheck) {
    // check if the string matches a domain name anchored filter

    for (i = 0, len = hostFiltersToCheck.length; i < len; i++) {
      filter = hostFiltersToCheck[i]

      if (isSameOriginHost(filter.host, currentHost) && indexOfFilter(input, filter.data) !== -1 && matchOptions(filter.options, input, contextParams, currentHost)) {
        // console.log(filter, 4)

        return true
      }
    }
  }

  // check if the string matches a string filter

  var nonAnchoredStringMatches = filters.nonAnchoredString.getSubstringsOf(input)

  if (nonAnchoredStringMatches.length !== 0) {
    var len = nonAnchoredStringMatches.length

    for (var i = 0; i < len; i++) {
      if (indexOfFilter(input, nonAnchoredStringMatches[i].data, 0) !== -1 && matchOptions(nonAnchoredStringMatches[i].options, input, contextParams, currentHost)) {
        // console.log(nonAnchoredStringMatches[i], 5)
        return true
      }
    }
  }

  // check if the string matches a wildcard filter

  var wildcardMatches = filters.wildcard.getSubstringsOf(input)

  if (wildcardMatches.length !== 0) {
    outer: for (i = 0, len = wildcardMatches.length; i < len; i++) {
      filter = wildcardMatches[i]

      // most filters won't match on the first part, so there is no point in entering the loop
      if (indexOfFilter(input, filter.wildcardMatchParts[0], 0) === -1) {
        continue outer
      }

      let index = 0
      for (let part of filter.wildcardMatchParts) {
        let newIndex = indexOfFilter(input, part, index)
        if (newIndex === -1) {
          continue outer
        }
        index = newIndex + part.length
      }

      if (matchOptions(filter.options, input, contextParams, currentHost)) {
        // console.log(filter, 7)
        return true
      }
    }
  }

  // no filters matched

  return false
}

function matches (filters, input, contextParams) {
  if (!filters.initialized) {
    return false
  }
  if (matchesFilters(filters, input, contextParams) && !matchesFilters(filters.exceptionFilters, input, contextParams)) {
    return true
  }
  return false
}

exports.parse = parse
exports.matchesFilters = matchesFilters
exports.matches = matches
exports.getUrlHost = getUrlHost
exports.isSameOriginHost = isSameOriginHost
