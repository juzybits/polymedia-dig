/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

import { bcs } from '@mysten/sui/bcs';
import type { Transaction } from '@mysten/sui/transactions';
import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import * as object from './deps/sui/object.js';
import * as table from './deps/sui/table.js';

const $moduleName = '@local-pkg/hole_certificate::hole_certificate';
export const HoleCertificate = new MoveStruct({ name: `${$moduleName}::HoleCertificate`, fields: {
        id: object.UID,
        digger: bcs.Address,
        meters: bcs.u64(),
        title: bcs.string(),
        remark: bcs.string(),
        moles: bcs.u8(),
        productivity: bcs.u8(),
        regret: bcs.u8(),
        shovels: bcs.u8(),
        therapy: bcs.u8()
    } });
export const CertificateRegistry = new MoveStruct({ name: `${$moduleName}::CertificateRegistry`, fields: {
        id: object.UID,
        certs: table.Table
    } });
export const HOLE_CERTIFICATE = new MoveStruct({ name: `${$moduleName}::HOLE_CERTIFICATE`, fields: {
        dummy_field: bcs.bool()
    } });
export interface IdArguments {
    c: RawTransactionArgument<string>;
}
export interface IdOptions {
    package?: string;
    arguments: IdArguments | [
        c: RawTransactionArgument<string>
    ];
}
export function id(options: IdOptions) {
    const packageAddress = options.package ?? '@local-pkg/hole_certificate';
    const argumentsTypes = [
        `${packageAddress}::hole_certificate::HoleCertificate`
    ] satisfies string[];
    const parameterNames = ["c"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'hole_certificate',
        function: 'id',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface DiggerArguments {
    c: RawTransactionArgument<string>;
}
export interface DiggerOptions {
    package?: string;
    arguments: DiggerArguments | [
        c: RawTransactionArgument<string>
    ];
}
export function digger(options: DiggerOptions) {
    const packageAddress = options.package ?? '@local-pkg/hole_certificate';
    const argumentsTypes = [
        `${packageAddress}::hole_certificate::HoleCertificate`
    ] satisfies string[];
    const parameterNames = ["c"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'hole_certificate',
        function: 'digger',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface MetersArguments {
    c: RawTransactionArgument<string>;
}
export interface MetersOptions {
    package?: string;
    arguments: MetersArguments | [
        c: RawTransactionArgument<string>
    ];
}
export function meters(options: MetersOptions) {
    const packageAddress = options.package ?? '@local-pkg/hole_certificate';
    const argumentsTypes = [
        `${packageAddress}::hole_certificate::HoleCertificate`
    ] satisfies string[];
    const parameterNames = ["c"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'hole_certificate',
        function: 'meters',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface TitleArguments {
    c: RawTransactionArgument<string>;
}
export interface TitleOptions {
    package?: string;
    arguments: TitleArguments | [
        c: RawTransactionArgument<string>
    ];
}
export function title(options: TitleOptions) {
    const packageAddress = options.package ?? '@local-pkg/hole_certificate';
    const argumentsTypes = [
        `${packageAddress}::hole_certificate::HoleCertificate`
    ] satisfies string[];
    const parameterNames = ["c"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'hole_certificate',
        function: 'title',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface RemarkArguments {
    c: RawTransactionArgument<string>;
}
export interface RemarkOptions {
    package?: string;
    arguments: RemarkArguments | [
        c: RawTransactionArgument<string>
    ];
}
export function remark(options: RemarkOptions) {
    const packageAddress = options.package ?? '@local-pkg/hole_certificate';
    const argumentsTypes = [
        `${packageAddress}::hole_certificate::HoleCertificate`
    ] satisfies string[];
    const parameterNames = ["c"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'hole_certificate',
        function: 'remark',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface MolesArguments {
    c: RawTransactionArgument<string>;
}
export interface MolesOptions {
    package?: string;
    arguments: MolesArguments | [
        c: RawTransactionArgument<string>
    ];
}
export function moles(options: MolesOptions) {
    const packageAddress = options.package ?? '@local-pkg/hole_certificate';
    const argumentsTypes = [
        `${packageAddress}::hole_certificate::HoleCertificate`
    ] satisfies string[];
    const parameterNames = ["c"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'hole_certificate',
        function: 'moles',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ProductivityArguments {
    c: RawTransactionArgument<string>;
}
export interface ProductivityOptions {
    package?: string;
    arguments: ProductivityArguments | [
        c: RawTransactionArgument<string>
    ];
}
export function productivity(options: ProductivityOptions) {
    const packageAddress = options.package ?? '@local-pkg/hole_certificate';
    const argumentsTypes = [
        `${packageAddress}::hole_certificate::HoleCertificate`
    ] satisfies string[];
    const parameterNames = ["c"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'hole_certificate',
        function: 'productivity',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface RegretArguments {
    c: RawTransactionArgument<string>;
}
export interface RegretOptions {
    package?: string;
    arguments: RegretArguments | [
        c: RawTransactionArgument<string>
    ];
}
export function regret(options: RegretOptions) {
    const packageAddress = options.package ?? '@local-pkg/hole_certificate';
    const argumentsTypes = [
        `${packageAddress}::hole_certificate::HoleCertificate`
    ] satisfies string[];
    const parameterNames = ["c"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'hole_certificate',
        function: 'regret',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ShovelsArguments {
    c: RawTransactionArgument<string>;
}
export interface ShovelsOptions {
    package?: string;
    arguments: ShovelsArguments | [
        c: RawTransactionArgument<string>
    ];
}
export function shovels(options: ShovelsOptions) {
    const packageAddress = options.package ?? '@local-pkg/hole_certificate';
    const argumentsTypes = [
        `${packageAddress}::hole_certificate::HoleCertificate`
    ] satisfies string[];
    const parameterNames = ["c"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'hole_certificate',
        function: 'shovels',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface TherapyArguments {
    c: RawTransactionArgument<string>;
}
export interface TherapyOptions {
    package?: string;
    arguments: TherapyArguments | [
        c: RawTransactionArgument<string>
    ];
}
export function therapy(options: TherapyOptions) {
    const packageAddress = options.package ?? '@local-pkg/hole_certificate';
    const argumentsTypes = [
        `${packageAddress}::hole_certificate::HoleCertificate`
    ] satisfies string[];
    const parameterNames = ["c"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'hole_certificate',
        function: 'therapy',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface CertsArguments {
    r: RawTransactionArgument<string>;
}
export interface CertsOptions {
    package?: string;
    arguments: CertsArguments | [
        r: RawTransactionArgument<string>
    ];
}
export function certs(options: CertsOptions) {
    const packageAddress = options.package ?? '@local-pkg/hole_certificate';
    const argumentsTypes = [
        `${packageAddress}::hole_certificate::CertificateRegistry`
    ] satisfies string[];
    const parameterNames = ["r"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'hole_certificate',
        function: 'certs',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface MintArguments {
    hole: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
}
export interface MintOptions {
    package?: string;
    arguments: MintArguments | [
        hole: RawTransactionArgument<string>,
        registry: RawTransactionArgument<string>
    ];
}
export function mint(options: MintOptions) {
    const packageAddress = options.package ?? '@local-pkg/hole_certificate';
    const argumentsTypes = [
        `${packageAddress}::dig::Hole`,
        `${packageAddress}::hole_certificate::CertificateRegistry`,
        '0x0000000000000000000000000000000000000000000000000000000000000002::random::Random'
    ] satisfies string[];
    const parameterNames = ["hole", "registry"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'hole_certificate',
        function: 'mint',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}