import EventEmitter from 'events'

const _emitter = new EventEmitter();
_emitter.setMaxListeners(0); // unlimit listener

/*
fire event: child -> parent (props)
parent -> child (ref)
cả hai (emitter)
*/

export const emitter = _emitter;