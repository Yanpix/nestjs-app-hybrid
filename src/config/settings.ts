export default {
    appHost: process.env.APP_HOST,
    appPort: process.env.APP_PORT || 3002,
    microservicePort: process.env.MICROSERVICE_PORT || 3003,
    secret: process.env.SESSION_SECRET,
    encryptionKey: process.env.ENCRYPTION_KEY,
    sendGridApiKey: process.env.SENDGRID_API_KEY,
    appVariables: {
        PDF: {
            preffix: 'KW'
        }
    }
};
