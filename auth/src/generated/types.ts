/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenRootTypes {
  AuthResult: { // root type
    accessToken: string; // String!
    refreshToken: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  GenerateTokensError: { // root type
    argErrors: NexusGenRootTypes['InputArgError'][]; // [InputArgError!]!
    code: string; // String!
    message: string; // String!
  }
  InputArgError: { // root type
    argName: string; // String!
    message: string; // String!
  }
  LoginError: { // root type
    argErrors: NexusGenRootTypes['InputArgError'][]; // [InputArgError!]!
    code: string; // String!
    message: string; // String!
  }
  Mutation: {};
  Query: {};
  SignupError: { // root type
    argErrors: NexusGenRootTypes['InputArgError'][]; // [InputArgError!]!
    code: string; // String!
    message: string; // String!
  }
  User: { // root type
    avatarUrl?: string | null; // String
    email?: string | null; // String
    githubProfileUrl?: string | null; // String
    id: string; // ID!
    username: string; // String!
  }
  UsersResult: { // root type
    nodes: NexusGenRootTypes['User'][]; // [User!]!
    total: number; // Int!
  }
  InputError: NexusGenRootTypes['GenerateTokensError'] | NexusGenRootTypes['LoginError'] | NexusGenRootTypes['SignupError'];
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  GenerateTokensResponse: NexusGenRootTypes['AuthResult'] | NexusGenRootTypes['GenerateTokensError'];
  LoginResponse: NexusGenRootTypes['AuthResult'] | NexusGenRootTypes['LoginError'];
  SignupResponse: NexusGenRootTypes['AuthResult'] | NexusGenRootTypes['SignupError'];
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
}

export interface NexusGenFieldTypes {
  AuthResult: { // field return type
    accessToken: string; // String!
    refreshToken: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  GenerateTokensError: { // field return type
    argErrors: NexusGenRootTypes['InputArgError'][]; // [InputArgError!]!
    code: string; // String!
    message: string; // String!
  }
  InputArgError: { // field return type
    argName: string; // String!
    message: string; // String!
  }
  LoginError: { // field return type
    argErrors: NexusGenRootTypes['InputArgError'][]; // [InputArgError!]!
    code: string; // String!
    message: string; // String!
  }
  Mutation: { // field return type
    generateTokens: NexusGenRootTypes['GenerateTokensResponse']; // GenerateTokensResponse!
    login: NexusGenRootTypes['LoginResponse']; // LoginResponse!
    signup: NexusGenRootTypes['SignupResponse']; // SignupResponse!
  }
  Query: { // field return type
    serviceDescription: string; // String!
    users: NexusGenRootTypes['UsersResult']; // UsersResult!
  }
  SignupError: { // field return type
    argErrors: NexusGenRootTypes['InputArgError'][]; // [InputArgError!]!
    code: string; // String!
    message: string; // String!
  }
  User: { // field return type
    avatarUrl: string | null; // String
    email: string | null; // String
    githubProfileUrl: string | null; // String
    id: string; // ID!
    username: string; // String!
  }
  UsersResult: { // field return type
    nodes: NexusGenRootTypes['User'][]; // [User!]!
    total: number; // Int!
  }
  InputError: { // field return type
    argErrors: NexusGenRootTypes['InputArgError'][]; // [InputArgError!]!
    code: string; // String!
    message: string; // String!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    generateTokens: { // args
      refreshToken: string; // String!
    }
    login: { // args
      password: string; // String!
      username: string; // String!
    }
    signup: { // args
      email?: string | null; // String
      password: string; // String!
      username: string; // String!
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
  GenerateTokensResponse: "AuthResult" | "GenerateTokensError"
  LoginResponse: "AuthResult" | "LoginError"
  SignupResponse: "AuthResult" | "SignupError"
  InputError: "GenerateTokensError" | "LoginError" | "SignupError"
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "AuthResult" | "GenerateTokensError" | "InputArgError" | "LoginError" | "Mutation" | "Query" | "SignupError" | "User" | "UsersResult";

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = "InputError";

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = "GenerateTokensResponse" | "LoginResponse" | "SignupResponse";

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}