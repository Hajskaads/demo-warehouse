# Warehouse Software Assignment

## Hipothesis

The solution is based on the hipothesis that the articles can be shared by different products, so they are not all packed up and stored together in a box to form up one product, but stored separatedly and packed up together when a product is bought. This makes the articles interchangeably by the products, which I believe is more efficient in terms of product availability, altough probably harder in terms of logistics and management.

This hipothesis is also probably harder to implement in a warehouse software than the alternative, and given the nature of the task of be a skill test, I decided to follow this approach.

## Technologies used

I used [Next.js](https://nextjs.org/) as the main technology. The reason behind this choice is that it is designed to be a full-stack solution, the front end in React and the backend APIs built on top of Node.js, with some extra features running on top of both. Next.js also provides a clear guideline on project and file system structure wich is easier to pick up and follow by a team, achieving a coherent approach. Given the short deadline is was also faster to implement since both front are back-end are in the same project.

I used [Primsa] as ORM and [Postgress] as Database. Given the relational connection between products and articles in a warehouse I found a relational-DB approach to be a better choice than a non-SQL Database.

The project is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project structure

The projects follows the new Next13 design guideline. Every page in the project file architecture under the folder "app" represents a url endpoint with the same path. This means that app/page.tsx corresponds to to the relative url "/", and app/articles/page.tsx would correspond to "/articles".

The project uses the new server components, where only the interactive parts of the webapp are client components, in order to boost performance and decrease bundle size.

The APIs are in route.ts files, where the previous logic holds true here too. app/api/articles/route.ts represents the endpoint "/api/articles".

There is a components folder where components, with which pages are made of, are located. They follow the same logic of file structure, where subcomponents that are part of parent components are stored in a subfolder of the parent component.

The lib folder where utility functions are stored. The test folder there is where functions used in testing are stored.

**tests** is where all test-related code is stored.

data is where the proposed json files are stored.

prisma is where all prisma related files are stored.

public represents the public folder to which the fronted has access to.

specs is a folder with the same file structure than the code, where code files are replaced by Markdown files with the tec specs of every file.

A PostgresSQL DB has been created for the project, its .env access variables provided along in the .env file at root level. The DB will be deleted after the assigment's completion.

## Getting Started

First, install all the required dependencies:

```bash
yarn
```

Secondly, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Main Features

The main screen provides a navbar and and a table with all the available stock. The default stock is the provided by the JSON files. A delete button is shown in every list item so products can be deleted this way.

If the plus button at the right most part of the navbar is clicked on, a Dialog will open to let you choose a file to upload. This file should be a JSON file, with the name "inventory", or "products", and the data structure must be identical to the json files provided in the assignment, either inventory or products, in order to update the database correctly with new data.

A button to restore the original DB is shown at the center of the navbar. If clicked all tables in the DB will be deleted and will be populated with the original data provided by the JSON files. This makes it easy to reset the DB after playing around importing new JSON inventories and products to test and push the boundaries of the code.

## TODO List for future updates

### High priority

- Implement authentication and authorization mechanisms
- In case the APIs are not supossed to be accessible from third parties, implement a CORS same origin policy.
- Testing: while a function to test the product stock from JSON files has been created, due to time constraints no testing has been implemented yet.
- Review the current-state app security and implement any other security measures deemed neccessary. Not many attention has been paid to security due to time constraints.
- Implement number constraints, at DB level or by a Prisma validator (only implemented in the API logic for now), in:

  - products.contains_article: 'amount_of' > 0.
  - articles.stock >= 0 | articles.stock > 0.
  - Possible implementation: When deleting articles, if the stock gets to 0 delete the article.

For MySQL the table should be Unsigned int, but for postgresql a CHECK (amount_of > 0) is needed. To implement

### Medium priority

- Empty stock UI issue: When the stock is empty the UI may show a product with stock 0 or not show it at all in the list. the response upon empty stock should be consistent in all cases.
- Error handling: Show some beautiful UI in error handling instead of alerts, to indicate that API calls run successfully or failed.

### Low priority: polishing updates

- Implement deleting more than one product in the front-end. Already implemented in the API.
- List element Fallback, high XS to SM range (phablet/small tablet size). The fallback is set to a higher height since in mobile mode the product names will break into two lines. However since the moment they get back to one line to the screen breakpoint SM they will be quite high with respect to the element they are replacing, resulting in a high CLS when the data is loaded. This behaviour could be redesigned.

### Considerations for Another Iteration

- Implement authentication and authorization mechanisms if the warehouse software requires user roles and permissions.
- Testing
- Improve error handling and validation to provide informative error messages and handle edge cases.
- Add pagination or filtering options for large inventories or product lists.
- Enhance the UI/UX with additional features such as search functionality, sorting options, or visual indicators for low stock items.
- Containerize the application using Docker for easy deployment and scalability.
