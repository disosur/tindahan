import * as aws from '@pulumi/aws'
import * as pulumi from '@pulumi/pulumi'

export function createEC2Service(
  serviceName: string,
  index: number,
  vpc: aws.ec2.DefaultVpc,
  sg: aws.ec2.SecurityGroup,
  dbInstance: aws.rds.Instance
) {
  const ami = aws.ec2.getAmiOutput({
    filters: [
      { name: 'name', values: ['ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*'] },
    ],
    mostRecent: true,
    owners: ['099720109477'], // Canonical
  })

  const keyName = new aws.ec2.KeyPair(`${serviceName}-key`, {
    publicKey: 'ssh-rsa AAAA...' // add your SSH public key here
  })

  const instance = new aws.ec2.Instance(`${serviceName}-instance`, {
    ami: ami.id,
    instanceType: 't3.micro',
    keyName: keyName.keyName,
    vpcSecurityGroupIds: [sg.id],
    subnetId: vpc.publicSubnetIds[index % vpc.publicSubnetIds.length],
    userData: pulumi.interpolate`
      #!/bin/bash
      sudo apt update
      sudo apt install -y docker.io
      docker run -d \
        -e DATABASE_URL=postgres://user:pass1234@${dbInstance.endpoint}:5432/${serviceName}_db \
        -p 3000:3000 your-docker-image-for-${serviceName}
    `,
  })

  return instance
}
