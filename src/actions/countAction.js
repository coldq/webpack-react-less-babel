import {Count_INC,Count_DEC} from '../constants';

export function Add() {
    return {
        type:Count_INC
    };
}
export function Inc() {
    return {
        type:Count_DEC
    };
}