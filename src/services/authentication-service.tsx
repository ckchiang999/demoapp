import { environment } from "../environments/environment";
import { User } from "../models/authentication/user";

export const authenticate = async (
  username: string,
  password: string,
): Promise<User | null> => {
  const baseUrl = environment.baseApUrl;
  const formBody = `username=${encodeURIComponent(
    username,
  )}&password=${encodeURIComponent(password)}`;
  const requestHeaders = new Headers();
  requestHeaders.set(
    "Content-Type",
    "application/x-www-form-urlencoded;charset=UTF-8",
  );
  requestHeaders.set("Accept", "*/*");
  try {
    let returnValue: any = {};
    if (environment.production) {
      const response = await fetch(`${baseUrl}/api/account/authenticate`, {
        method: "POST",
        headers: requestHeaders,
        body: formBody,
      });
      returnValue = await response.json();
    } else {
      await new Promise(resolve => setTimeout(resolve, 5000)); // simulate 5 seconds
      returnValue = {
        Id: 1,
        Name: "Joseph Joestar",
        UserName: username,
        EmailAddress: `${username}@test.com`,
        Roles: ["admin"],
      };
    }
    console.info(`authenticate response: ${JSON.stringify(returnValue)}`);
    return {
      id: returnValue.Id,
      name: returnValue.Name,
      userName: returnValue.UserName,
      emailAddress: returnValue.EmailAddress,
      roles: returnValue.Roles,
    } as User;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};
