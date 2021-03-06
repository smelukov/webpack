declare module "*.json";

// Deprecated NodeJS API usages in Webpack
declare namespace NodeJS {
	interface Process {
		binding(internalModule: string): any;
	}
}

// TODO remove when https://github.com/DefinitelyTyped/DefinitelyTyped/pull/38753 is merged
declare module "util" {
	function deprecate<T extends Function>(
		fn: T,
		message: string,
		code?: string
	): T;
}

declare module "neo-async" {
	interface QueueObject<T, E> {
		push(item: T): void;
		drain: () => void;
		error: (err: E) => void;
	}

	export interface Dictionary<T> {
		[key: string]: T;
	}
	export type IterableCollection<T> = T[] | Iterable<T> | Dictionary<T>;

	export interface ErrorCallback<T> {
		(err?: T): void;
	}
	export interface AsyncBooleanResultCallback<E> {
		(err?: E, truthValue?: boolean): void;
	}
	export interface AsyncResultCallback<T, E> {
		(err?: E, result?: T): void;
	}
	export interface AsyncResultArrayCallback<T, E> {
		(err?: E, results?: Array<T | undefined>): void;
	}
	export interface AsyncResultObjectCallback<T, E> {
		(err: E | undefined, results: Dictionary<T | undefined>): void;
	}

	export interface AsyncFunction<T, E> {
		(callback: (err?: E, result?: T) => void): void;
	}
	export interface AsyncFunctionEx<T, E> {
		(callback: (err?: E, ...results: T[]) => void): void;
	}
	export interface AsyncIterator<T, E> {
		(item: T, callback: ErrorCallback<E>): void;
	}
	export interface AsyncForEachOfIterator<T, E> {
		(item: T, key: number | string, callback: ErrorCallback<E>): void;
	}
	export interface AsyncResultIterator<T, R, E> {
		(item: T, callback: AsyncResultCallback<R, E>): void;
	}
	export interface AsyncMemoIterator<T, R, E> {
		(memo: R | undefined, item: T, callback: AsyncResultCallback<R, E>): void;
	}
	export interface AsyncBooleanIterator<T, E> {
		(item: T, callback: AsyncBooleanResultCallback<E>): void;
	}

	export interface AsyncWorker<T, E> {
		(task: T, callback: ErrorCallback<E>): void;
	}
	export interface AsyncVoidFunction<E> {
		(callback: ErrorCallback<E>): void;
	}

	export type AsyncAutoTasks<R extends Dictionary<any>, E> = {
		[K in keyof R]: AsyncAutoTask<R[K], R, E>;
	};
	export type AsyncAutoTask<R1, R extends Dictionary<any>, E> =
		| AsyncAutoTaskFunctionWithoutDependencies<R1, E>
		| (keyof R | AsyncAutoTaskFunction<R1, R, E>)[];
	export interface AsyncAutoTaskFunctionWithoutDependencies<R1, E> {
		(cb: AsyncResultCallback<R1, E> | ErrorCallback<E>): void;
	}
	export interface AsyncAutoTaskFunction<R1, R extends Dictionary<any>, E> {
		(results: R, cb: AsyncResultCallback<R1, E> | ErrorCallback<E>): void;
	}

	export function each<T, E>(
		arr: IterableCollection<T>,
		iterator: AsyncIterator<T, E>,
		callback?: ErrorCallback<E>
	): void;

	export function eachLimit<T, E>(
		arr: IterableCollection<T>,
		limit: number,
		iterator: AsyncIterator<T, E>,
		callback?: ErrorCallback<E>
	): void;

	export function map<T, R, E>(
		arr: T[] | IterableIterator<T>,
		iterator: AsyncResultIterator<T, R, E>,
		callback?: AsyncResultArrayCallback<R, E>
	): void;
	export function map<T, R, E>(
		arr: Dictionary<T>,
		iterator: AsyncResultIterator<T, R, E>,
		callback?: AsyncResultArrayCallback<R, E>
	): void;

	export function parallel<T, E>(
		tasks: Array<AsyncFunction<T, E>>,
		callback?: AsyncResultArrayCallback<T, E>
	): void;
	export function parallel<T, E>(
		tasks: Dictionary<AsyncFunction<T, E>>,
		callback?: AsyncResultObjectCallback<T, E>
	): void;

	export function queue<T, E>(
		worker: AsyncFunction<T, E>,
		concurrency?: number
	): QueueObject<T, E>;

	export const forEach: typeof each;
	export const forEachLimit: typeof eachLimit;
}

// There are no typings for @webassemblyjs/ast
declare module "@webassemblyjs/ast" {
	export function traverse(
		ast: any,
		visitor: {
			ModuleImport?: (p: NodePath<ModuleImport>) => void;
			ModuleExport?: (p: NodePath<ModuleExport>) => void;
			Start?: (p: NodePath<Start>) => void;
			Global?: (p: NodePath<Global>) => void;
		}
	): void;
	export class NodePath<T> {
		node: T;
	}
	export class Node {}
	export class Identifier extends Node {
		value: string;
	}
	export class Start extends Node {
		index: Identifier;
	}
	export class ModuleImportDescription {
		type: string;
		valtype?: string;
		id?: Identifier;
		signature?: Signature;
	}
	export class ModuleImport extends Node {
		module: string;
		descr: ModuleImportDescription;
		name: string;
	}
	export class ModuleExport extends Node {
		name: string;
		descr: ModuleExportDescr;
	}
	type Index = Identifier | NumberLiteral;
	export class ModuleExportDescr extends Node {
		type: string;
		exportType: string;
		id: Index;
	}
	export class NumberLiteral extends Node {
		value: number;
		raw: string;
	}
	export class FloatLiteral extends Node {}
	export class GlobalType extends Node {
		valtype: string;
	}
	export class Global extends Node {
		init: Instruction[];
		globalType: GlobalType;
	}
	export class FuncParam extends Node {
		valtype: string;
	}
	export class Instruction extends Node {
		id: string;
		args: NumberLiteral[];
	}
	export class CallInstruction extends Instruction {}
	export class ObjectInstruction extends Instruction {}
	export class Func extends Node {
		signature: Signature;
	}
	export class Signature {
		type: "Signature";
		params: FuncParam[];
		results: string[];
	}
	export class TypeInstruction extends Node {}
	export class IndexInFuncSection extends Node {}
	export function indexLiteral(index: number): Index;
	export function numberLiteralFromRaw(num: number): NumberLiteral;
	export function floatLiteral(
		value: number,
		nan?: boolean,
		inf?: boolean,
		raw?: string
	): FloatLiteral;
	export function global(globalType: string, nodes: Node[]): Global;
	export function identifier(indentifier: string): Identifier;
	export function funcParam(valType: string, id: Identifier): FuncParam;
	export function instruction(inst: string, args?: Node[]): Instruction;
	export function callInstruction(funcIndex: Index): CallInstruction;
	export function objectInstruction(
		kind: string,
		type: string,
		init: Node[]
	): ObjectInstruction;
	export function signature(params: FuncParam[], results: string[]): Signature;
	export function func(initFuncId, signature: Signature, funcBody): Func;
	export function typeInstruction(
		id: Identifier,
		functype: Signature
	): TypeInstruction;
	export function indexInFuncSection(index: Index): IndexInFuncSection;
	export function moduleExport(
		identifier: string,
		descr: ModuleExportDescr
	): ModuleExport;
	export function moduleExportDescr(
		type: string,
		index: Index
	): ModuleExportDescr;

	export function getSectionMetadata(ast: any, section: string);
	export class FuncSignature {
		args: string[];
		result: string[];
	}

	// Node matcher
	export function isGlobalType(n: Node): boolean;
	export function isTable(n: Node): boolean;
	export function isMemory(n: Node): boolean;
	export function isFuncImportDescr(n: Node): boolean;
}

declare module "webpack-sources" {
	type MapOptions = { columns?: boolean; module?: boolean };

	export abstract class Source {
		size(): number;

		map(options?: MapOptions): Object;

		sourceAndMap(
			options?: MapOptions
		): {
			source: string | Buffer;
			map: Object;
		};

		updateHash(hash: import("./lib/util/Hash")): void;

		source(): string | Buffer;

		buffer(): Buffer;
	}

	export class RawSource extends Source {
		constructor(source: string | Buffer, convertToString?: boolean);

		isBuffer(): boolean;
	}

	export class OriginalSource extends Source {
		constructor(source: string | Buffer, name: string);

		getName(): string;
	}

	export class ReplaceSource extends Source {
		constructor(source: Source, name?: string);

		replace(start: number, end: number, newValue: string, name?: string): void;
		insert(pos: number, newValue: string, name?: string): void;

		getName(): string;
		original(): string;
		getReplacements(): {
			start: number;
			end: number;
			content: string;
			insertIndex: number;
			name: string;
		}[];
	}

	export class SourceMapSource extends Source {
		constructor(
			source: string | Buffer,
			name: string,
			sourceMap: Object | string | Buffer,
			originalSource?: string | Buffer,
			innerSourceMap?: Object | string | Buffer
		);

		getArgsAsBuffers(): [
			Buffer,
			string,
			Buffer,
			Buffer | undefined,
			Buffer | undefined
		];
	}

	export class ConcatSource extends Source {
		constructor(...args: (string | Source)[]);

		getChildren(): Source[];

		add(item: string | Source): void;
		addAllSkipOptimizing(items: Source[]): void;
	}

	export class PrefixSource extends Source {
		constructor(prefix: string, source: string | Source);

		original(): Source;
		getPrefix(): string;
	}

	export class CachedSource extends Source {
		constructor(source: Source, cachedData?: any);

		original(): Source;
		getCachedData(): any;
	}

	export class SizeOnlySource extends Source {
		constructor(size: number);
	}
}

declare module "enhanced-resolve" {
	type ResolveFunction = (
		path: string,
		request: string,
		resolveContext: ResolveContext,
		callback: (
			err?: NodeJS.ErrnoException,
			result?: string,
			additionalInfo?: Object
		) => void
	) => void;

	export function create(options: any): ResolveFunction;

	interface ResolveContext {
		log?: (message: string) => void;
		fileDependencies?: Set<string>;
		contextDependencies?: Set<string>;
		missingDependencies?: Set<string>;
		stack?: Set<string>;
	}

	export class Resolver {
		resolve(
			context: Object,
			path: string,
			request: string,
			resolveContext: ResolveContext,
			callback: (
				err?: NodeJS.ErrnoException,
				result?: string,
				additionalInfo?: Object
			) => void
		): void;
	}

	export class ResolverFactory {
		static createResolver(options: TODO): Resolver;
	}
}

// This "hack" is needed because typescript doesn't support recursive type definitions
// It's referenced from "ruleSet-conditions" in schemas/WebpackOptions.json
interface RuleSetConditionsRecursive
	extends Array<import("./declarations/WebpackOptions").RuleSetCondition> {}
interface RuleSetConditionsAbsoluteRecursive
	extends Array<
		import("./declarations/WebpackOptions").RuleSetConditionAbsolute
	> {}

/**
 * Global variable declarations
 * @todo Once this issue is resolved, remove these globals and add JSDoc onsite instead
 * https://github.com/Microsoft/TypeScript/issues/15626
 */
declare const $moduleCache$;
declare let $getFullHash$;
declare const $interceptModuleExecution$;
declare const $hmrDownloadManifest$;
declare let $hmrDownloadUpdateHandlers$;
declare let $hmrModuleData$;
declare const $options$;
declare const $updateModuleFactories$;
declare const $updateRuntimeModules$;
declare const $moduleFactories$;
declare const $onError$;
declare const $publicPath$;
declare const __webpack_require__;
declare const $hotChunkFilename$;
declare const $hotMainFilename$;
declare namespace WebAssembly {}
declare const importScripts;
declare const $crossOriginLoading$;
declare const chunkId;

type TODO = any;
