// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CanonicalCode } from "@opentelemetry/api";
import { createSpan } from "../tracing";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ArtifactsClient } from "../artifactsClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  PipelineResource,
  PipelineGetPipelinesByWorkspaceResponse,
  PipelineCreateOrUpdatePipelineOptionalParams,
  PipelineCreateOrUpdatePipelineResponse,
  PipelineGetPipelineOptionalParams,
  PipelineGetPipelineResponse,
  ArtifactRenameRequest,
  PipelineCreatePipelineRunOptionalParams,
  PipelineCreatePipelineRunResponse,
  PipelineGetPipelinesByWorkspaceNextResponse
} from "../models";

/** Class representing a Pipeline. */
export class Pipeline {
  private readonly client: ArtifactsClient;

  /**
   * Initialize a new instance of the class Pipeline class.
   * @param client Reference to the service client
   */
  constructor(client: ArtifactsClient) {
    this.client = client;
  }

  /**
   * Lists pipelines.
   * @param options The options parameters.
   */
  public listPipelinesByWorkspace(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<PipelineResource> {
    const iter = this.getPipelinesByWorkspacePagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.getPipelinesByWorkspacePagingPage(options);
      }
    };
  }

  private async *getPipelinesByWorkspacePagingPage(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<PipelineResource[]> {
    let result = await this._getPipelinesByWorkspace(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._getPipelinesByWorkspaceNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *getPipelinesByWorkspacePagingAll(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<PipelineResource> {
    for await (const page of this.getPipelinesByWorkspacePagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Lists pipelines.
   * @param options The options parameters.
   */
  private async _getPipelinesByWorkspace(
    options?: coreHttp.OperationOptions
  ): Promise<PipelineGetPipelinesByWorkspaceResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-_getPipelinesByWorkspace",
      options
    );
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getPipelinesByWorkspaceOperationSpec
      );
      return result as PipelineGetPipelinesByWorkspaceResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Creates or updates a pipeline.
   * @param pipelineName The pipeline name.
   * @param pipeline Pipeline resource definition.
   * @param options The options parameters.
   */
  async createOrUpdatePipeline(
    pipelineName: string,
    pipeline: PipelineResource,
    options?: PipelineCreateOrUpdatePipelineOptionalParams
  ): Promise<LROPoller<PipelineCreateOrUpdatePipelineResponse>> {
    const { span, updatedOptions } = createSpan("ArtifactsClient-createOrUpdatePipeline", options);
    const operationArguments: coreHttp.OperationArguments = {
      pipelineName,
      pipeline,
      options: this.getOperationOptions(updatedOptions, "undefined")
    };
    const sendOperation = async (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as PipelineCreateOrUpdatePipelineResponse;
      } catch (error) {
        span.setStatus({
          code: CanonicalCode.UNKNOWN,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      createOrUpdatePipelineOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: createOrUpdatePipelineOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Gets a pipeline.
   * @param pipelineName The pipeline name.
   * @param options The options parameters.
   */
  async getPipeline(
    pipelineName: string,
    options?: PipelineGetPipelineOptionalParams
  ): Promise<PipelineGetPipelineResponse> {
    const { span, updatedOptions } = createSpan("ArtifactsClient-getPipeline", options);
    const operationArguments: coreHttp.OperationArguments = {
      pipelineName,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getPipelineOperationSpec
      );
      return result as PipelineGetPipelineResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes a pipeline.
   * @param pipelineName The pipeline name.
   * @param options The options parameters.
   */
  async deletePipeline(
    pipelineName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const { span, updatedOptions } = createSpan("ArtifactsClient-deletePipeline", options);
    const operationArguments: coreHttp.OperationArguments = {
      pipelineName,
      options: this.getOperationOptions(updatedOptions, "undefined")
    };
    const sendOperation = async (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as coreHttp.RestResponse;
      } catch (error) {
        span.setStatus({
          code: CanonicalCode.UNKNOWN,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      deletePipelineOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: deletePipelineOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Renames a pipeline.
   * @param pipelineName The pipeline name.
   * @param request proposed new name.
   * @param options The options parameters.
   */
  async renamePipeline(
    pipelineName: string,
    request: ArtifactRenameRequest,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const { span, updatedOptions } = createSpan("ArtifactsClient-renamePipeline", options);
    const operationArguments: coreHttp.OperationArguments = {
      pipelineName,
      request,
      options: this.getOperationOptions(updatedOptions, "undefined")
    };
    const sendOperation = async (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as coreHttp.RestResponse;
      } catch (error) {
        span.setStatus({
          code: CanonicalCode.UNKNOWN,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      renamePipelineOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: renamePipelineOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Creates a run of a pipeline.
   * @param pipelineName The pipeline name.
   * @param options The options parameters.
   */
  async createPipelineRun(
    pipelineName: string,
    options?: PipelineCreatePipelineRunOptionalParams
  ): Promise<PipelineCreatePipelineRunResponse> {
    const { span, updatedOptions } = createSpan("ArtifactsClient-createPipelineRun", options);
    const operationArguments: coreHttp.OperationArguments = {
      pipelineName,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        createPipelineRunOperationSpec
      );
      return result as PipelineCreatePipelineRunResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * GetPipelinesByWorkspaceNext
   * @param nextLink The nextLink from the previous successful call to the GetPipelinesByWorkspace
   *                 method.
   * @param options The options parameters.
   */
  private async _getPipelinesByWorkspaceNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<PipelineGetPipelinesByWorkspaceNextResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-_getPipelinesByWorkspaceNext",
      options
    );
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getPipelinesByWorkspaceNextOperationSpec
      );
      return result as PipelineGetPipelinesByWorkspaceNextResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  private getOperationOptions<TOptions extends coreHttp.OperationOptions>(
    options: TOptions | undefined,
    finalStateVia?: string
  ): coreHttp.RequestOptionsBase {
    const operationOptions: coreHttp.OperationOptions = options || {};
    operationOptions.requestOptions = {
      ...operationOptions.requestOptions,
      shouldDeserialize: shouldDeserializeLRO(finalStateVia)
    };
    return coreHttp.operationOptionsToRequestOptionsBase(operationOptions);
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getPipelinesByWorkspaceOperationSpec: coreHttp.OperationSpec = {
  path: "/pipelines",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PipelineListResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdatePipelineOperationSpec: coreHttp.OperationSpec = {
  path: "/pipelines/{pipelineName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.PipelineResource
    },
    201: {
      bodyMapper: Mappers.PipelineResource
    },
    202: {
      bodyMapper: Mappers.PipelineResource
    },
    204: {
      bodyMapper: Mappers.PipelineResource
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.pipeline,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.pipelineName],
  headerParameters: [Parameters.accept, Parameters.contentType, Parameters.ifMatch],
  mediaType: "json",
  serializer
};
const getPipelineOperationSpec: coreHttp.OperationSpec = {
  path: "/pipelines/{pipelineName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PipelineResource
    },
    304: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.pipelineName],
  headerParameters: [Parameters.accept, Parameters.ifNoneMatch],
  serializer
};
const deletePipelineOperationSpec: coreHttp.OperationSpec = {
  path: "/pipelines/{pipelineName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.pipelineName],
  headerParameters: [Parameters.accept],
  serializer
};
const renamePipelineOperationSpec: coreHttp.OperationSpec = {
  path: "/pipelines/{pipelineName}/rename",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.request,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.pipelineName],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const createPipelineRunOperationSpec: coreHttp.OperationSpec = {
  path: "/pipelines/{pipelineName}/createRun",
  httpMethod: "POST",
  responses: {
    202: {
      bodyMapper: Mappers.CreateRunResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.parameters,
  queryParameters: [
    Parameters.apiVersion,
    Parameters.referencePipelineRunId,
    Parameters.isRecovery,
    Parameters.startActivityName
  ],
  urlParameters: [Parameters.endpoint, Parameters.pipelineName],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getPipelinesByWorkspaceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PipelineListResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};
