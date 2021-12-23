import { ParseResult } from "@babel/parser";
import type {File} from '@babel/types';

export type AST = ParseResult<File>;
