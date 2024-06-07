import * as cdk from "aws-cdk-lib";
import {
  aws_cloudfront as cloudfront,
  aws_s3 as s3,
  aws_s3_deployment as s3deploy,
  aws_iam as iam,
} from "aws-cdk-lib";
import { Construct } from "constructs";

export class CdkDeploymentStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(
      this,
      "SolidadosStoreCloudfrontOAI",
      {
        comment: "OAI for SolidadosStoreCloudfront",
      }
    );

    const solidadosStoreBucket = new s3.Bucket(this, "SolidadosStoreBucket", {
      bucketName: "solidados-store-bucket",
      websiteIndexDocument: "index.html",
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      versioned: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    solidadosStoreBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [solidadosStoreBucket.arnForObjects("*")],
        principals: [
          new iam.CanonicalUserPrincipal(
            cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );

    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "SolidadosCloudfrontDistribution",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: solidadosStoreBucket,
              originAccessIdentity: cloudfrontOAI,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
      }
    );

    new s3deploy.BucketDeployment(this, "SolidadosBucketDeployment", {
      sources: [s3deploy.Source.asset("../dist")],
      destinationBucket: solidadosStoreBucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}
