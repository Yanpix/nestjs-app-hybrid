export class ArrayHelper {
    /**
     * Generate range between 2 numbers
     * @param start min value 
     * @param end max value
     */
    static range(start, end) {
        return Array.from({ length: ((end + 1) - start) }, (v, k) => k + start);
    }

    /**
     * Calculate sum in array for specific property
     * @param items Iterated object
     * @param prop property that will be summed
     */
    static sum<T, K extends keyof T>(items: T[], prop: K) {
        return items.reduce((a, b) => {
            return Number(a) + Number(b[prop]);
        }, 0);
    };

    /**
     * Calculate sum of Objects with same keys
     * @param objs
     * @return Object with same properties and calculated values
     */
    static sumObjectsByKey(...objs) {
        return objs.reduce((a, b) => {
            for (let k in b) {
                if (b.hasOwnProperty(k))
                    a[k] = (a[k] || 0) + b[k];
            }
            return a;
        }, {});
    }

}