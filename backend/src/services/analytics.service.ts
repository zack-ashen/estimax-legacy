import { Analytics } from "@segment/analytics-node";
import { IPropertyManager } from "../models/propertyManager.model";
import { IVendor } from "../models/vendor.model";

const analytics = new Analytics({
  writeKey: process.env.SEGMENT_WRITE_KEY!,
  disable: process.env.ENV === "dev",
});

export const signUpEvent = (uid: string, user: IVendor | IPropertyManager) => {
  analytics.identify({
    userId: uid,
  });

  analytics.track({
    userId: uid,
    event: "User signed up",
    properties: {
      method: "Standard Form",
    },
  });
};

export const signInEvent = (uid: string, user: IVendor | IPropertyManager) => {
  analytics.identify({
    userId: uid,
  });

  analytics.track({
    userId: uid,
    event: "User signed in",
    properties: {
      method: "Standard Form",
    },
  });
};

export const signOutEvent = (uid: string) => {
  analytics.track({
    userId: uid,
    event: "User signed out",
  });
};
