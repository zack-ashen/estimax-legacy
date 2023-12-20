import swaggerJSDoc, { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
      title: "Estimax API",
      version: "1.0.0",
      description: "API documentation",
    },
  },
  apis: ["./src/api/routes/*.routes.ts"], // Paths to the files containing your route definitions and JSDoc comments
};

export default swaggerJSDoc(options);
