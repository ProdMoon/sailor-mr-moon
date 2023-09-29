export default function copyObject(obj) {
    return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
}