---
title: C Compiler
# Old site wording, unchanged (legacy Imperial.tsx:106).
summary: In this project, I implemented a C compiler in C++ using Flex and Bison. The compiler supported a subset of C, including functions, structs, arrays, pointers, and basic arithmetic.
tier: featured
order: 6
hue: 300
icon: code
tags: [software]
dates:
  start: '[[CHECK: year]]'
status: complete
context: University project
team:
  size: 1
  note: '[[CHECK: solo or pair?]]'
tech:
  - C++
  - Flex
  - Bison
  - MIPS
links: []
cover:
  type: image
  src: ../../assets/projects/c-compiler/bison-grammar.jpg
  alt: Bison grammar rules for functions, parameters, statements and if/else, each building a node of the C++ syntax tree
  caption: Part of the Bison grammar; each rule constructs an AST node.
gallery:
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: screenshot of the Flex lexer rules, without editor blame annotations]]'
    caption: Lexer rules in Flex.
    todo: Re-capture the lexer screenshot with GitLens blame annotations hidden (the existing one shows them)
---

## Overview

A compiler that translates C into MIPS assembly, using Flex and Bison for parsing and an object-oriented abstract syntax tree in C++. It supports a subset of C including functions, structs, arrays, pointers and basic arithmetic; the output runs on a MIPS simulator.

<!-- Stub: the full body is in docs/content-plan.md §5.2.5 and is added in Phase 4.
     [[TODO: a short C input and its generated MIPS output, as text, for a side-by-side code block]] -->
