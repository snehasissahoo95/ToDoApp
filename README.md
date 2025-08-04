# TodoApp

A Todo application built with ASP.NET Core and Angular. This app supports creating, updating, retrieving, and deleting todo items in a thread-safe in-memory store using `ConcurrentDictionary`.

## Features

- Add new todo items
- Update existing todo items
- List all todo items
- Delete a todo item by ID
- Delete all todo items for a specific date
- Thread-safe operations using `ConcurrentDictionary`

## Tech Stack

- C#
- ASP.NET Core
- .NET 8+
- In-memory data storage using `ConcurrentDictionary`
- NUnit for testing
- Angular

## Client Side

Run `ng serve --proxy-config src/proxy.conf.js` for a development run. Navigate to `http://localhost:4200/`. 

## Server Side

Run `dotnet run --launch-profile https` for a dev server. Navigate to ''

## Unit Test
