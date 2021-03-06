<!-- The following YAML bit is needed by the docs system to publish the samples online. Uncomment/Update it when the samples can be published publically -->

## <!--

page_type: sample
languages:

- javascript
  products:

# NOTE: You MUST use valid product slugs from the docs.microsoft.com taxonomy

# in this array. Please check to make sure that the items you enter into this

# list are valid! For example, "azure-template" is NOT a valid product slug

# and is provided here as an example only.

- azure
- azure-template

# For urlFragment, use the base name of the package (not including the namespace)

# and append "-typescript" or "-javascript"

## urlFragment: template-javascript

-->

# Azure Template client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Template in some common scenarios.

| **File Name**                                         | **Description**                                                            |
| ----------------------------------------------------- | -------------------------------------------------------------------------- |
| [getConfigurationSetting.js][getconfigurationsetting] | Demonstrates the use of a ConfigurationClient to retrieve a setting value. |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

You need [an Azure subscription][freesub] to run these sample programs. Samples retrieve credentials to access the endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node getConfigurationSetting.js
```

Alternatively, run a single sample with the correct environment variables set (step 3 is not required if you do this), for example (cross-platform):

```bash
npx cross-env ENDPOINT="<endpoint>" API_KEY="<api key>" node getConfigurationSetting.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[getconfigurationsetting]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/template/template/samples/javascript/getConfigurationSetting.js
[apiref]: https://docs.microsoft.com/javascript/api
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/template/template/README.md
