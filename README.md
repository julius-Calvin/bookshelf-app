Of course, here is the updated documentation for your `README.md` file with the new query parameter features added to the "Get All Books" endpoint.

-----

# Project Submission: Bookshelf API

## Project Summary

This project aims to build an HTTP API for a Bookshelf application. This API must handle basic CRUD (Create, Read, Update, Delete) operations for book data, including saving, displaying, modifying, and deleting books.

-----

## 1\. Environment Configuration

### **Application Port**

  - The application must run on port **9000**.
  - If port 9000 is unavailable in the local development environment, another port may be used during development. However, the port must be changed back to **9000** for the final submission.

### **Execution Command**

  - The application must be runnable via the command:

    ```bash
    npm run start
    ```

  - The `start` script in the `package.json` file must be configured to run the server directly with Node.js, not with `nodemon`.

    **Example `package.json`:**

    ```json
    {
      "name": "submission",
      "scripts": {
        "start": "node src/server.js",
        "start-dev": "nodemon src/server.js"
      }
    }
    ```

-----

## 2\. API Endpoint Specifications

The following is a detailed breakdown of the endpoints that the API must provide.

### **Save a Book**

  - **Endpoint:** `POST /books`
  - **Description:** Adds a new book entity to the collection.
  - **Request Body:**
    ```json
    {
      "name": "string",
      "year": "number",
      "author": "string",
      "summary": "string",
      "publisher": "string",
      "pageCount": "number",
      "readPage": "number",
      "reading": "boolean"
    }
    ```
  - **Server-Side Book Object Structure:**
    In addition to the data from the request body, the book object stored on the server must have the following additional properties:
      - `id` (string): A unique ID for each book. It is recommended to use `nanoid@3`.
      - `finished` (boolean): The reading status of the book, which is `true` if `pageCount` equals `readPage`.
      - `insertedAt` (string): The date and time the book was added, in ISO 8601 format.
      - `updatedAt` (string): The date and time the book was last updated, in ISO 8601 format.
  - **Conditions and Responses:**
      - **Success (Code 201):** If the book is successfully added.
        ```json
        {
          "status": "success",
          "message": "Buku berhasil ditambahkan",
          "data": {
            "bookId": "generated-book-id"
          }
        }
        ```
      - **Failure - Name is Missing (Code 400):** If the `name` property is not included.
        ```json
        {
          "status": "fail",
          "message": "Gagal menambahkan buku. Mohon isi nama buku"
        }
        ```
      - **Failure - `readPage` Exceeds `pageCount` (Code 400):**
        ```json
        {
          "status": "fail",
          "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        }
        ```

-----

### **Get All Books**

  - **Endpoint:** `GET /books`
  - **Description:** Returns a list of all stored books. It also supports filtering via query parameters.
  - **Query Parameters (Optional):**
      - **`?name`**: Filters books to only include those whose names contain the given string (non-case sensitive).
          - *Example: `/books?name=dicoding`*
      - **`?reading`**: Filters books based on their reading status.
          - `0`: Returns books that are **not** currently being read (`reading: false`).
          - `1`: Returns books that **are** currently being read (`reading: true`).
          - *Example: `/books?reading=0`*
      - **`?finished`**: Filters books based on whether they are finished.
          - `0`: Returns books that are **not finished** (`finished: false`).
          - `1`: Returns books that **are finished** (`finished: true`).
          - *Example: `/books?finished=1`*
  - **Conditions and Responses:**
      - **Success (Code 200):** Returns a list of books. Each book object in the array will only contain `id`, `name`, and `publisher`.
        ```json
        {
          "status": "success",
          "data": {
            "books": [
              {
                "id": "book-id-1",
                "name": "Nama Buku 1",
                "publisher": "Penerbit 1"
              }
            ]
          }
        }
        ```
      - If no books exist or match the filter, the `books` property will be an empty array.

-----

### **Get Book Details**

  - **Endpoint:** `GET /books/{bookId}`
  - **Description:** Returns the complete details of a book based on its `id`.
  - **Conditions and Responses:**
      - **Success (Code 200):** If a book with the corresponding `id` is found.
        ```json
        {
          "status": "success",
          "data": {
            "book": {
              "id": "aWZBUW3JN_VBE-9I",
              "name": "Buku A Revisi",
              "year": 2011,
              "author": "Jane Doe",
              "summary": "Lorem Dolor sit Amet",
              "publisher": "Dicoding",
              "pageCount": 200,
              "readPage": 26,
              "finished": false,
              "reading": false,
              "insertedAt": "2021-03-05T06:14:28.930Z",
              "updatedAt": "2021-03-05T06:14:30.718Z"
            }
          }
        }
        ```
      - **Failure - ID Not Found (Code 404):**
        ```json
        {
          "status": "fail",
          "message": "Buku tidak ditemukan"
        }
        ```

-----

### **Update Book Data**

  - **Endpoint:** `PUT /books/{bookId}`
  - **Description:** Updates an existing book's data based on its `id`.
  - **Request Body:** Same as `POST /books`.
  - **Conditions and Responses:**
      - **Success (Code 200):** If the book is successfully updated.
        ```json
        {
          "status": "success",
          "message": "Buku berhasil diperbarui"
        }
        ```
      - **Failure - Name is Missing (Code 400):**
        ```json
        {
          "status": "fail",
          "message": "Gagal memperbarui buku. Mohon isi nama buku"
        }
        ```
      - **Failure - `readPage` Exceeds `pageCount` (Code 400):**
        ```json
        {
          "status": "fail",
          "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        }
        ```
      - **Failure - ID Not Found (Code 404):**
        ```json
        {
          "status": "fail",
          "message": "Gagal memperbarui buku. Id tidak ditemukan"
        }
        ```

-----

### **Delete a Book**

  - **Endpoint:** `DELETE /books/{bookId}`
  - **Description:** Deletes a book from the collection based on its `id`.
  - **Conditions and Responses:**
      - **Success (Code 200):** If the book is successfully deleted.
        ```json
        {
          "status": "success",
          "message": "Buku berhasil dihapus"
        }
        ```
      - **Failure - ID Not Found (Code 404):**
        ```json
        {
          "status": "fail",
          "message": "Buku gagal dihapus. Id tidak ditemukan"
        }
        ```
