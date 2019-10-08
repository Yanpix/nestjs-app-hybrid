import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from 'nestjs-config';

@Injectable()
export class S3Service {
    private s3: AWS.S3;

    /**
     * Connect to Amazon AWS
     */
    constructor(
        private readonly config: ConfigService
    ) {
        AWS.config.update({
            accessKeyId: this.config.get('amazon-aws.accessKeyId'),
            secretAccessKey: this.config.get('amazon-aws.secretAccessKey')
        });
        this.s3 = new AWS.S3();
    };

    /**
     * Save file
     * @param binaryFile file Buffer
     * @param bucket bucket name
     * @param fileName file name
     */
    async addFile(binaryFile: Buffer, bucket: string, fileName: string): Promise<AWS.S3.Types.PutObjectOutput> {
        return new Promise((resolve, reject) => {
            this.s3.putObject({
                Body: binaryFile,
                Bucket: bucket,
                Key: fileName,
            }, function (err, data) {
                if (err) {
                    reject(err.message);
                }
                resolve(data);
            });
        });
    }

    /**
     * Get file from @bucket where @filename
     * @param bucket bucket name
     * @param fileName file name
     */
    async getFile(bucket: string, fileName: string): Promise<AWS.S3.Types.GetObjectOutput> {
        return new Promise((resolve, reject) => {
            this.s3.getObject({ Bucket: bucket, Key: fileName }, function (err, data) {
                if (err) {
                    reject(err.message);
                }
                resolve(data);
            });
        });
    }

}
