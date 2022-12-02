export const util = {
    getRandomString(prefix, length){
        let randomString = (length) => [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
        let randomizedPart = (randomString(length)).toString();
        return (`${prefix}${randomizedPart}`).toString();
    }
}