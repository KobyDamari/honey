export const debounce = (fn, time) => {
    let timeout;
    console.log(fn);
    debugger;
    return function () {
        const functionCall = () => fn.apply(this, arguments);

        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
    }
}
