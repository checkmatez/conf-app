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
  InputArgError: { // root type
    argName: string; // String!
    message: string; // String!
  }
  Mutation: {};
  Query: {};
  SignupError: { // root type
    argErrors: NexusGenRootTypes['InputArgError'][]; // [InputArgError!]!
    code: string; // String!
    message: string; // String!
  }
  SignupResult: { // root type
    accessToken: string; // String!
    refreshToken: string; // String!
    user: NexusGenRootTypes['User']; // User!
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
  InputError: NexusGenRootTypes['SignupError'];
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  SignupResponse: NexusGenRootTypes['SignupError'] | NexusGenRootTypes['SignupResult'];
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
}

export interface NexusGenFieldTypes {
  InputArgError: { // field return type
    argName: string; // String!
    message: string; // String!
  }
  Mutation: { // field return type
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
  SignupResult: { // field return type
    accessToken: string; // String!
    refreshToken: string; // String!
    user: NexusGenRootTypes['User']; // User!
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
    signup: { // args
      email?: string | null; // String
      password: string; // String!
      username: string; // String!
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
  SignupResponse: "SignupError" | "SignupResult"
  InputError: "SignupError"
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "InputArgError" | "Mutation" | "Query" | "SignupError" | "SignupResult" | "User" | "UsersResult";

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = "InputError";

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = "SignupResponse";

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