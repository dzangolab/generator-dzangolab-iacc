import {
    Config,
    StackReferenceOutputDetails
} from "@pulumi/pulumi";
import * as fs from "fs";

export const getConfig = async () => {
    const stackConfig = new Config();

    const keyFolder = stackConfig.get("key-folder") || "../ssh-keys";
    const keyNames: [string] = stackConfig.requireObject("key-names");

    let publicKeys: { [key: string]: string } = {};

    for (const name of keyNames) {
        const path = `${keyFolder}/${name}.pub` as unknown as string;

        const publicKey = fs.readFileSync(
            path,
            {
                encoding: "utf-8",
            }
        );

        publicKeys[path] = publicKey;
    }

    return {
        protect: stackConfig.getBoolean("protect"),
        publicKeys,
        retainOnDelete: stackConfig.getBoolean("retainOnDelete"),
    };
};

function getValue<T>(input: StackReferenceOutputDetails, defaultValue?: T): T {
    if (input && input.value) {
        return <T>input.value!;
    }

    if (input && input.secretValue) {
        return <T>input.secretValue!;
    }

    if (!defaultValue) {
        throw new Error("A value is required");
    }

    return defaultValue;
}