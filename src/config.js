const LOCAL_HOST = 'http://localhost:3000';

export default {
    server: {
        host: process.env.API_HOST || LOCAL_HOST,
    }
}
