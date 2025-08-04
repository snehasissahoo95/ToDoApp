# TodoApp

A Todo application built with ASP.NET Core and Angular. This app supports creating, updating, retrieving, and deleting todo items in a thread-safe in-memory store using `ConcurrentDictionary`.

## Features

- Add new todo items within the allowed range (not past, not beyond 1 year).
- Update existing todo items
- List all todo items
- Delete a todo item by ID
- Delete all todo items for a specific date

## Tech Stack

- C#
- ASP.NET Core
- .NET 8+
- In-memory data storage using `ConcurrentDictionary`
- NUnit for testing
- Angular

## Prerequisite

Install .NET SDK 8 or later

git clone https://github.com/snehasissahoo95/ToDoApp.git
cd TodoApp

Install Node.js & npm

## Client Side
Navigate to Frontend Folder

cd todoapp.client

Install Angular CLI (if not installed)
Run `npm install -g @angular/cli`

Install Frontend Dependencies
Run `npm install`

Run `ng serve --proxy-config src/proxy.conf.js` for a development run. Navigate to `http://localhost:4200/`. 

## Server Side
Navigate to Backend Folder
cd TodoApp.Server

Run `dotnet run --launch-profile https` for a dev server. Navigate to 'https://localhost:7291/swagger/index.html'

## Unit Test

Run `dotnet test`
