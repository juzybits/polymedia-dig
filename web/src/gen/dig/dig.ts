/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';
import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import * as object from './deps/sui/object.js';
import * as table from './deps/sui/table.js';

const $moduleName = '@local-pkg/dig::dig';
export const Hole = new MoveStruct({ name: `${$moduleName}::Hole`, fields: {
        id: object.UID,
        distance: bcs.u64(),
        progress: bcs.u64(),
        users: table.Table
    } });
export interface NewArguments {
    distance: RawTransactionArgument<number | bigint>;
}
export interface NewOptions {
    package?: string;
    arguments: NewArguments | [
        distance: RawTransactionArgument<number | bigint>
    ];
}
export function _new(options: NewOptions) {
    const packageAddress = options.package ?? '@local-pkg/dig';
    const argumentsTypes = [
        'u64'
    ] satisfies string[];
    const parameterNames = ["distance"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'dig',
        function: 'new',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface IdArguments {
    hole: RawTransactionArgument<string>;
}
export interface IdOptions {
    package?: string;
    arguments: IdArguments | [
        hole: RawTransactionArgument<string>
    ];
}
export function id(options: IdOptions) {
    const packageAddress = options.package ?? '@local-pkg/dig';
    const argumentsTypes = [
        `${packageAddress}::dig::Hole`
    ] satisfies string[];
    const parameterNames = ["hole"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'dig',
        function: 'id',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface DistanceArguments {
    hole: RawTransactionArgument<string>;
}
export interface DistanceOptions {
    package?: string;
    arguments: DistanceArguments | [
        hole: RawTransactionArgument<string>
    ];
}
export function distance(options: DistanceOptions) {
    const packageAddress = options.package ?? '@local-pkg/dig';
    const argumentsTypes = [
        `${packageAddress}::dig::Hole`
    ] satisfies string[];
    const parameterNames = ["hole"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'dig',
        function: 'distance',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ProgressArguments {
    hole: RawTransactionArgument<string>;
}
export interface ProgressOptions {
    package?: string;
    arguments: ProgressArguments | [
        hole: RawTransactionArgument<string>
    ];
}
export function progress(options: ProgressOptions) {
    const packageAddress = options.package ?? '@local-pkg/dig';
    const argumentsTypes = [
        `${packageAddress}::dig::Hole`
    ] satisfies string[];
    const parameterNames = ["hole"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'dig',
        function: 'progress',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface UsersArguments {
    hole: RawTransactionArgument<string>;
}
export interface UsersOptions {
    package?: string;
    arguments: UsersArguments | [
        hole: RawTransactionArgument<string>
    ];
}
export function users(options: UsersOptions) {
    const packageAddress = options.package ?? '@local-pkg/dig';
    const argumentsTypes = [
        `${packageAddress}::dig::Hole`
    ] satisfies string[];
    const parameterNames = ["hole"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'dig',
        function: 'users',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface UserDigsArguments {
    hole: RawTransactionArgument<string>;
    user: RawTransactionArgument<string>;
}
export interface UserDigsOptions {
    package?: string;
    arguments: UserDigsArguments | [
        hole: RawTransactionArgument<string>,
        user: RawTransactionArgument<string>
    ];
}
export function userDigs(options: UserDigsOptions) {
    const packageAddress = options.package ?? '@local-pkg/dig';
    const argumentsTypes = [
        `${packageAddress}::dig::Hole`,
        'address'
    ] satisfies string[];
    const parameterNames = ["hole", "user"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'dig',
        function: 'user_digs',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}