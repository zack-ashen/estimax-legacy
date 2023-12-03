interface CancelApiObject {
  [key: string]: {
    handleRequestCancellation: () => AbortController;
  };
}

export function defineCancelApiObject(
  apiObject: Record<string, any>
): CancelApiObject {
  const cancelApiObject: CancelApiObject = {};

  Object.getOwnPropertyNames(apiObject).forEach((apiPropertyName) => {
    const cancellationControllerObject = {
      controller: undefined as AbortController | undefined,
    };

    cancelApiObject[apiPropertyName] = {
      handleRequestCancellation: (): AbortController => {
        if (cancellationControllerObject.controller) {
          cancellationControllerObject.controller.abort();
        }

        cancellationControllerObject.controller = new AbortController();
        return cancellationControllerObject.controller;
      },
    };
  });

  return cancelApiObject;
}
