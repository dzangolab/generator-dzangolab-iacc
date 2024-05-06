import chalk from "chalk";

import PulumiGenerator from "../pulumi/index.js";

export default class AWSS3Generator extends PulumiGenerator {
  constructor(args, opts) {
    super(args, opts);

    this.displayName = "AWS S3";
    this.name = "aws-s3";
  }

  async prompting() {
    this.props = await this.prompt([
      {
        default: this._getDefaultProjectName(),
        message: "Enter the name of the pulumi project",
        name: "projectName",
        type: "input",
      }
    ]);
  };

  writing() {
    const message = `Generating IaC code for ${this.displayName}`;
    this.log(`${chalk.green(message)}`);

    this.fs.copyTpl(
      this.templatePath(this.name),
      this.destinationPath(this._getFolderName()),
      this.props,
      null,
      { globOptions: { dot: true } },
    );
  };
}