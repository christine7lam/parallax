/**
 * Created by sp5050 on 4/1/17.
 * @flow
 */


'use strict';


/**
 * Get a text description of the component that can be used to identify it
 * in error messages.
 * @return {string} The name or null.
 * @internal
 */
export function getName(_this) {

    if (_this) {
        const type = _this._currentElement && _this._currentElement.type;
        const constructor = _this._instance && _this._instance.constructor || _this.__proto__ && _this.__proto__.constructor;

        if (type && type.displayName) {
            return type.displayName;
        }

        if (constructor && constructor.displayName) {
            return constructor.displayName;
        }

        if (type && type.name) {
            return type.name;
        }

        if (constructor && constructor.name) {
            return constructor.name;
        }
        return "UnknownComponentName";
    }
    return "UnknownComponentName_this_is_null";
}

