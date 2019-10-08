export default {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    s3buckets: {
        data: process.env.DATA_BUCKET,
        invoices: process.env.INVOICES_BUCKET
    }
};
