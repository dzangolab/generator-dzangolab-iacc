# AWS Instance profile

Provisions an AWS Instance profile.

## Requirements

* node >= 20.0.0
* [pulumi >= 3](https://www.pulumi.com/docs/install/)
* An AWS account
* An AWS profile
* An existing devops repo

## Usage

* Cd into the `aws-instance-profile` folder.

* Install dependencies 

```
npm install
```

* Set the AWS_PROFILE environment variable

```
export AWS_PROFILE=XXXXXX
```

* Set the default organization 

```bash
pulumi org set-default {your organization}
```

* Initialize and select the appropriate stack

```bash
pulumi stack init [staging|production]
```

* Update the stack config `Pulimi.[staging|production].yaml` with the appropriate values for your project.

* Run `pulumi up`

### To destroy resources:

```
pulumi destroy
```

## Resources provisioned

### AWS IAM instance profileECR Repositories

1 AWS IAM instance profile is provisioned.

## Configuration settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| images  | string[] | | The names of the repositories to be provisioned |
| protect | boolean | false | Protect resources from accidental deletion |
| retainOnDelete | boolean | false | Retain resources when destroyed |
