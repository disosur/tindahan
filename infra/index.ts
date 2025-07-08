import * as aws from '@pulumi/aws'
import * as pulumi from '@pulumi/pulumi'
import { createEC2Service } from './ec2-service'

const config = new pulumi.Config()

const vpc = new aws.ec2.DefaultVpc('default-vpc', {})
const sg = new aws.ec2.SecurityGroup('service-sg', {
  vpcId: vpc.id,
  ingress: [
    { protocol: 'tcp', fromPort: 22, toPort: 22, cidrBlocks: ['0.0.0.0/0'] }, // SSH
    { protocol: 'tcp', fromPort: 3000, toPort: 3012, cidrBlocks: ['0.0.0.0/0'] }, // Service ports
    { protocol: 'tcp', fromPort: 5432, toPort: 5432, cidrBlocks: ['0.0.0.0/0'] }, // RDS
  ],
  egress: [
    { protocol: '-1', fromPort: 0, toPort: 0, cidrBlocks: ['0.0.0.0/0'] }
  ],
})

// RDS Instance
const dbSubnetGroup = new aws.rds.SubnetGroup('db-subnet-group', {
  subnetIds: vpc.publicSubnetIds,
})

const dbInstance = new aws.rds.Instance('main-db', {
  instanceClass: 'db.t3.micro',
  allocatedStorage: 20,
  engine: 'postgres',
  engineVersion: '16.2',
  name: 'maindb',
  username: 'user',
  password: 'pass1234',
  skipFinalSnapshot: true,
  publiclyAccessible: true,
  dbSubnetGroupName: dbSubnetGroup.name,
  vpcSecurityGroupIds: [sg.id],
})

// Launch one EC2 instance per service
const services = ['users', 'orders', 'products'] // extend this as needed

const instances = services.map((name, i) =>
  createEC2Service(name, i, vpc, sg, dbInstance)
)
