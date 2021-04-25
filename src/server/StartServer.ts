import { server } from "./CreateServer";

export const start = (port) => server.listen(port, () => {
    console.log(`Local server listening on port ${port}`);
    console.log(`Local server URL: http://localhost:${port}`);
});
