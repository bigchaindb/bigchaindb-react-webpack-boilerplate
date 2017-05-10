export const BDB_SERVER_URL = process.env.BDB_SERVER_URL;

console.log(process.env);
export const BDB_API_PATH = `${BDB_SERVER_URL}/api/v1/`;

export default {
    BDB_API_PATH,
};
