---
title: C Compiler
# Old site wording, unchanged (legacy Imperial.tsx:106).
summary: In this project, I implemented a C compiler in C++ using Flex and Bison. The compiler supported a subset of C, including functions, structs, arrays, pointers, and basic arithmetic.
description: A C-to-MIPS compiler built with Flex, Bison and an object-oriented AST in C++.
tier: featured
order: 12
hue: 300
icon: code
tags: [software]
dates:
  start: '2023'
status: complete
context: university
team:
  size: 2
  role: "-"
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

In this project, I implemented a C compiler in C++ using Flex and Bison. The compiler supported a subset of C, including functions, structs, arrays, pointers, and basic arithmetic. The compiler compiled C code into MIPS assembly, which could then be run on a MIPS simulator.

The parser builds an object-oriented abstract syntax tree in C++.

## The problem

Take C source and produce correct MIPS assembly for a defined language subset, passing a test suite of C programs, with a design that could grow feature by feature.

## What I did

- Lexer in Flex and grammar in Bison, producing an AST of C++ classes.
- Code generation for functions, structs, arrays, pointers and basic arithmetic.
- [[CHECK: register allocation / stack frame approach; how scoping and symbol tables were handled; pass rate on the test suite]]

