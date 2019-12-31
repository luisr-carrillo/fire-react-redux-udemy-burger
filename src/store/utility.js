export const updatedObject = (oldObject, updatedProps) => {
    return {
        ...oldObject,
        ...updatedProps
    };
};