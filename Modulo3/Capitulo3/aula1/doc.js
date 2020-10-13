export const swaggerDocument = {
  swagger: '2.0',
  info: {
    description: 'My bank API .',
    version: '1.0.0',
    title: 'Bank API',
  },
  host: 'localhost:3000',
  tags: [
    {
      name: 'account',
      description: 'Account management',
    },
  ],
  schemes: ['https', 'http'],
  paths: {
    '/account': {
      get: {
        tags: ['account'],
        summary: 'Gets the existing accounts registered on the Bank database.',
        description:
          'Gets the existing accounts registered on the Bank database.',
        produces: ['application/json'],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Account',
              },
            },
          },
          400: {
            description: 'Error occurred',
          },
        },
      },
      post: {
        tags: ['account'],
        summary: 'Creates a new account',
        description:
          'Creates a new account upon receiving the required parameters',
        consumes: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Account object',
            required: true,
            schema: {
              $ref: '#/definitions/Account',
            },
          },
        ],
        responses: {
          200: {
            description: 'Account created',
          },
          400: {
            description: 'Error occurred',
          },
        },
      },
    },
  },
  definitions: {
    Account: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'JP',
        },
        balance: {
          type: 'integer',
          example: 750.55,
        },
      },
    },
  },
};
